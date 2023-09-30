import { useEffect, useMemo, useState } from "react";
import { parseDataVideoDetais } from "./../store/reducers/getVideoDetails";
import { YOUTUBE_API_URL } from "../utils/constants";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toVideoDetails } from "./tronsformResponse";
import { useAppSelector } from "../store/hooks";
import { HomePageVideos } from "../Types";
import { parseData } from "../utils/parseData";
// ${YOUTUBE_API_URL}/channels?part=snippet,contentDetails&id=${channelIds.join(
//     ","
//   )}&key=${API_KEY}`
// );

// `/videos?key=${API_KEY}&part=snippet,statistics&type=video&id=${id}`),

const API_KEY = process.env.REACT_APP_API_KEY;

export const youtubeApi = createApi({
  reducerPath: "youtube/api",
  baseQuery: fetchBaseQuery({
    baseUrl: YOUTUBE_API_URL,
  }),
  endpoints: (builder) => ({
    getVideoDetails: builder.query({
      query: (id) => ({
        url: "/videos",
        params: {
          key: API_KEY,
          part: "snippet,statistics",
          type: "video",
          id: id,
        },
      }),
      transformResponse: (response: any) => response.items[0],
    }),
    getChannelDetails: builder.query({
      query: (el) => ({
        url: "/channels",
        params: {
          part: "snippet,statistics",
          id: el,
          key: API_KEY,
        },
      }),
      transformResponse: (response: any) => response.items?.[0],
    }),
    getChannelsData: builder.query({
      query: (channelIds) => ({
        url: "/channels",
        params: {
          part: "snippet,contentDetails",
          id: channelIds,
          key: API_KEY,
        },
      }),
      //   transformResponse: (response: any) => response.items?.[0],
    }),
    getContentDetails: builder.query({
      query: (videoIds) => ({
        url: "/videos",
        params: {
          part: "snippet,contentDetails",
          id: videoIds,
          key: API_KEY,
        },
      }),
      //   transformResponse: (response: any) => response.items?.[0],
    }),
    // `${YOUTUBE_API_URL}/search?q=${searchTerm}&key=${API_KEY}&part=snippet&type=video&${pageTypes[pageType]}`
    getSearchVideos: builder.query({
      query: ({ pageToken, searchTerm }) => {
        const req: any = {
          url: "/search",
          params: {
            q: searchTerm,
            key: API_KEY,
            part: "snippet",
            type: "video",
            ...(pageToken ? { pageToken } : {}),
          },
        };

        return req;
      },
      //   transformResponse: (response) => response,
    }),
  }),
});
// `${YOUTUBE_API_URL}/channels?part=snippet,statistics&id=${item.snippet.channelId}&key=${API_KEY}`

// if (isNext) {
//   req.pageToken = "sdfgdfsgsfg";
// }

// return req;

export const {
  useGetVideoDetailsQuery,
  useGetChannelDetailsQuery,
  useGetSearchVideosQuery,
  useGetChannelsDataQuery,
  useGetContentDetailsQuery,
} = youtubeApi;

export const useAwesomeVideo = (id: string) => {
  const { data: item } = useGetVideoDetailsQuery(id);

  console.log("ITEM", item);
  const channelId = item?.snippet?.channelId;
  const { data: details } = useGetChannelDetailsQuery(channelId, {
    skip: !channelId,
  });
  console.log("Details", details);
  const res = useMemo(() => {
    if (details && item) {
      return parseDataVideoDetais(item, details);
    }

    return null;
  }, [details, item]);

  return res;
};

export const useAwesomeSearchVideo = (pageToken: any) => {
  const searchTerm = useAppSelector((state) => state.mainApp.searchTerm);
  const requestParams = useMemo(() => {
    return { pageToken, searchTerm };
  }, [pageToken, searchTerm]);

  const searchRes: any = useGetSearchVideosQuery(requestParams, {
    skip: !searchTerm,
    refetchOnMountOrArgChange: true,
  });

  const nextPageToken = searchRes.data?.nextPageToken;
  const items = searchRes.data?.items;

  const videoIds: string[] = [];
  const channelIds: string[] = [];
  items?.forEach(
    (item: { snippet: { channelId: string }; id: { videoId: string } }) => {
      channelIds.push(item.snippet.channelId);
      videoIds.push(item.id.videoId);
    }
  );

  console.log("videoIds", videoIds);

  const chanelsDataRes = useGetChannelsDataQuery(channelIds, {
    skip: !channelIds,
  });

  const chanelsData = chanelsDataRes.data?.items;

  console.log("CHANELSDATARES", chanelsDataRes);

  const contentDetails = useGetContentDetailsQuery(videoIds, {
    skip: !videoIds,
  });
  const videoData = contentDetails.data?.items;

  console.log("CONTENTDETAILS", videoData);

  const transformSearchRes = useMemo(() => {
    if (items && chanelsData && videoIds && channelIds && videoData) {
      const data = parseData(
        items,
        chanelsData,
        videoIds,
        channelIds,
        videoData
      );

      return { data, nextPageToken };
    }

    return { nextPageToken, data: [] };
  }, [items, chanelsData, videoData, nextPageToken, videoIds, channelIds]);

  return transformSearchRes;
};

// const channelImage = data.items[0].snippet.thumbnails.default.url;
//   const subscriberCount = data.items[0].statistics.subscriberCount;
// `${YOUTUBE_API_URL}/channels?part=snippet,statistics&id=${item.snippet.channelId}&key=${API_KEY}`
