import { YOUTUBE_API_URL } from "../utils/constants";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  VideosOrChannels,
  SearchParams,
  SearchVideosResponse,
  ChannelsDataResponse,
} from "../Types";

const API_KEY = process.env.REACT_APP_API_KEY;

const youtubeApi = createApi({
  reducerPath: "youtube/api",
  baseQuery: fetchBaseQuery({
    baseUrl: YOUTUBE_API_URL,
  }),
  endpoints: (builder) => ({
    getVideoDetails: builder.query({
      query: (videoId: string) => ({
        url: "/videos",
        params: {
          key: API_KEY,
          part: "snippet,statistics",
          type: "video",
          id: videoId,
        },
      }),
      transformResponse: (response: VideosOrChannels) => response.items[0],
    }),
    getChannelDetails: builder.query({
      query: (channelId: string) => ({
        url: "/channels",
        params: {
          part: "snippet,statistics",
          id: channelId,
          key: API_KEY,
        },
      }),
      transformResponse: (response: VideosOrChannels) => response.items?.[0],
    }),
    getChannelsData: builder.query<ChannelsDataResponse, string[]>({
      query: (channelIds) => ({
        url: "/channels",
        params: {
          part: "snippet,contentDetails",
          id: channelIds,
          key: API_KEY,
        },
      }),
    }),
    getContentDetails: builder.query<ChannelsDataResponse, string[]>({
      query: (videoIds: string[]) => ({
        url: "/videos",
        params: {
          part: "snippet,contentDetails",
          id: videoIds,
          key: API_KEY,
        },
      }),
    }),
    getSearchVideos: builder.query<SearchVideosResponse, SearchParams>({
      query: ({ pageToken, searchTerm }) => {
        const req: {
          url: string;
          params: {
            key: string;
            part: string;
            type: string;
            maxResults: number;
            q?: string;
            pageToken?: string;
          };
        } = {
          url: "/search",
          params: {
            key: API_KEY,
            part: "snippet",
            type: "video",
            maxResults: 20,
          },
        };

        if (searchTerm) {
          req.params.q = searchTerm;
        }

        if (pageToken) {
          req.params.pageToken = pageToken;
        }

        return req;
      },
      serializeQueryArgs: (params) => {
        const { queryArgs, endpointName } = params;
        return `${endpointName}/${queryArgs.searchTerm}`;
      },
    }),
  }),
});

export const {
  useGetVideoDetailsQuery,
  useGetChannelDetailsQuery,
  useGetSearchVideosQuery,
  useGetChannelsDataQuery,
  useGetContentDetailsQuery,
  middleware,
  reducer,
  reducerPath,
} = youtubeApi;
