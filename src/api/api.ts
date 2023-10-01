import { YOUTUBE_API_URL } from "../utils/constants";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.REACT_APP_API_KEY;

export interface YouTubeVideoItem {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  contentDetails: ContentDetails;
}

export interface ContentDetails {
  duration: string;
  dimension: string;
  definition: string;
  caption: string;
  licensedContent: boolean;
  contentRating: ContentRating;
  projection: string;
}

export interface ContentRating {}

export interface Snippet {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: Localized;
  defaultAudioLanguage: string;
}

export interface Localized {
  title: string;
  description: string;
}

export interface Thumbnails {
  default: ThumbnailsDefault;
  medium: ThumbnailsDefault;
  high: ThumbnailsDefault;
  standard: ThumbnailsDefault;
}

export interface ThumbnailsDefault {
  url: string;
  width: number;
  height: number;
}

export interface YouTubeVideos {
  etag: string;
  kind: string;
  items: YouTubeVideoItem[];
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
}

const youtubeApi = createApi({
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
      transformResponse: (response: YouTubeVideos) => response.items[0],
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
      transformResponse: (response: {
        etag: string;
        kind: string;
        pageInfo: {
          totalResults: number;
          resultsPerPage: number;
        };
      }) => response.items?.[0],
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
    }),
    getSearchVideos: builder.query({
      query: ({ pageToken, searchTerm }) => {
        const req: any = {
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
      //   merge: (currentCache, newItems) => {
      //     currentCache.items.push(...newItems.items);
      //   },
      //   forceRefetch({ currentArg, previousArg }) {
      //     console.log({ currentArg, previousArg });
      //     return currentArg !== previousArg;
      //   },
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
