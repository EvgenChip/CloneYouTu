import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { convertRawViews, timesVideo } from "../../utils";

import { YOUTUBE_API_URL } from "../../utils/constants";
import { useGetVideoDetailsQuery } from "../../api/api";

const API_KEY = process.env.REACT_APP_API_KEY;

type DataItem = {
  snippet: {
    channelId: string;
    title: string;
    description: string;
    publishedAt: Date;
    channelTitle: string;
  };
  id: string;
  statistics: { viewCount: string; likeCount: string };
};
// const channelImage = data.items[0].snippet.thumbnails.default.url;
//   const subscriberCount = data.items[0].statistics.subscriberCount;
export const parseDataVideoDetais = (item: DataItem, detail: any) => {
  const channelImage = detail.snippet.thumbnails.default.url;
  const subscriberCount = detail.statistics.subscriberCount;
  console.log("ITEM", item);

  return {
    videoId: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    views: parseInt(item.statistics.viewCount).toLocaleString(),
    likes: convertRawViews(item.statistics.likeCount),
    age: timesVideo(new Date(item.snippet.publishedAt)),
    channelInfo: {
      id: item.snippet.channelId,
      image: channelImage,
      name: item.snippet.channelTitle,
      subscribers: convertRawViews(subscriberCount, true),
    },
  };
};
