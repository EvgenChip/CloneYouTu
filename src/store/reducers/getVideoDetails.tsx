import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { convertRawViews, timesVideo } from "../../utils";

import { YOUTUBE_API_URL } from "../../utils/constants";

const API_KEY = process.env.REACT_APP_API_KEY;

export const getVideoDetails = createAsyncThunk(
  "mainApp/GetVideoDetails",
  async (id: string) => {
    const {
      data: { items },
    } = await axios.get(
      `${YOUTUBE_API_URL}/videos?key=${API_KEY}&part=snippet,statistics&type=video&id=${id}`
    );
    console.log("getid", id);
    return parseData(items[0]);
  }
);

const parseData = async (item: {
  snippet: {
    channelId: string;
    title: string;
    description: string;
    publishedAt: Date;
    channelTitle: string;
  };
  id: string;
  statistics: { viewCount: string; likeCount: string };
}) => {
  const {
    data: {
      items: [
        {
          snippet: {
            thumbnails: {
              default: { url: channelImage },
            },
          },
          statistics: { subscriberCount },
        },
      ],
    },
  } = await axios.get(
    `${YOUTUBE_API_URL}/channels?part=snippet,statistics&id=${item.snippet.channelId}&key=${API_KEY}`
  );

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
