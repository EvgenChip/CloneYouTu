import { useAppSelector } from "../store/hooks";
import { parseData } from "../utils/parseData";
import { useMemo, useRef } from "react";
import { parseDataVideoDetails } from "../utils/parseDataVideoDetails";
import {
  useGetVideoDetailsQuery,
  useGetChannelDetailsQuery,
  useGetSearchVideosQuery,
  useGetChannelsDataQuery,
  useGetContentDetailsQuery,
} from "./api";

export const useAwesomeVideo = (id: string) => {
  const { data: item } = useGetVideoDetailsQuery(id);

  const channelId = item?.snippet?.channelId;
  const { data: details } = useGetChannelDetailsQuery(channelId, {
    skip: !channelId,
  });

  const res = useMemo(() => {
    if (details && item) {
      // @ts-ignore
      return parseDataVideoDetails(item, details);
    }

    return null;
  }, [details, item]);

  return res;
};

export const useAwesomeSearchVideo = (
  options: { ignoreSearch?: boolean } = {}
) => {
  const { ignoreSearch } = options;
  const searchTerm = useAppSelector((state) => state.mainApp.searchTerm);
  const pageToken = useAppSelector((state) => state.mainApp.nextPageToken);
  const requestParams = useMemo(() => {
    return { pageToken, searchTerm };
  }, [pageToken, searchTerm]);

  const searchRes: any = useGetSearchVideosQuery(requestParams, {
    skip: !ignoreSearch && !searchTerm,
    refetchOnMountOrArgChange: true,
  });

  const nextPageToken = searchRes.data?.nextPageToken;
  const items = searchRes.data?.items;

  const channelsAndVideosIds = useMemo(() => {
    const videoIds: string[] = [];
    const channelIds: string[] = [];

    if (!items) {
      return { videoIds, channelIds };
    }

    items?.forEach(
      (item: { snippet: { channelId: string }; id: { videoId: string } }) => {
        channelIds.push(item.snippet.channelId);
        videoIds.push(item.id.videoId);
      }
    );

    return { videoIds, channelIds };
  }, [items]);

  const channelsDataRes = useGetChannelsDataQuery(
    channelsAndVideosIds.channelIds,
    {
      skip: channelsAndVideosIds.channelIds.length === 0,
    }
  );

  const channelsData = channelsDataRes.data?.items;

  const contentDetails = useGetContentDetailsQuery(
    channelsAndVideosIds.videoIds,
    {
      skip: channelsAndVideosIds.videoIds.length === 0,
    }
  );
  const videoData = contentDetails.data?.items;

  const isError =
    searchRes.isError || channelsDataRes.isError || contentDetails.isError;
  const isLoading =
    searchRes.isFetching ||
    channelsDataRes.isFetching ||
    contentDetails.isFetching;

  const prevVideos = useRef([]);
  const transformSearchRes = useMemo(() => {
    if (
      !isError &&
      !isLoading &&
      items &&
      channelsData &&
      channelsAndVideosIds &&
      videoData
    ) {
      const data = parseData(items, channelsData, videoData);

      if (pageToken) {
        prevVideos.current = [...prevVideos.current, ...data];
      } else {
        prevVideos.current = [...data];
      }

      return {
        data: [...prevVideos.current],
        nextPageToken,
        isError,
        isLoading,
        refetch: searchRes.refetch,
      };
    }

    return {
      nextPageToken,
      data: [],
      isError,
      isLoading,
      refetch: searchRes.refetch,
    };
  }, [
    items,
    channelsData,
    videoData,
    pageToken,
    nextPageToken,
    channelsAndVideosIds,
    isError,
    isLoading,
    searchRes,
  ]);

  return transformSearchRes;
};
