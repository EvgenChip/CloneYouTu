import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import axios from "axios";
import { YOUTUBE_API_URL } from "../../utils/constants";
import { HomePageVideos } from "../../Types";
import { parseData } from "../../utils/parseData";

const API_KEY = process.env.REACT_APP_API_KEY;

const instance = axios.create({
  baseURL: YOUTUBE_API_URL,
});

export const getHomePageVideo = createAsyncThunk(
  "mainApp/GetHomePageVideo",
  async (pageType: "startPage" | "nextPage", { getState }) => {
    const {
      mainApp: { nextPageToken: nextPageTokenFromState, videos },
    } = getState() as RootState;

    const pageTypes = {
      startPage: "",
      nextPage: `pageToken=${nextPageTokenFromState}`,
    };

    const {
      data: { items, nextPageToken },
    } = await axios.get(
      `${YOUTUBE_API_URL}/search?maxResults=20&q="reactjs projects"&key=${API_KEY}&part=snippet&type=video&${pageTypes[pageType]}`
    );

    // const params = {
    //   maxResult: 20,
    //   q: "reactjs projects",
    //   key: API_KEY,
    //   part: "snippet",
    //   type: "video",

    //   pageToken: isNext ? nextPageTokenFromState : "",
    // };

    // const {
    //   data: { items, nextPageToken },
    // } = await instance.get(`search`, {
    //   params,
    // });

    const videoIds: string[] = [];
    const channelIds: string[] = [];
    items.forEach(
      (item: { snippet: { channelId: string }; id: { videoId: string } }) => {
        channelIds.push(item.snippet.channelId);
        videoIds.push(item.id.videoId);
      }
    );

    const {
      data: { items: channelsData },
    } = await instance.get(`channels`, {
      params: {
        part: "snippet,contentDetails",
        id: `${channelIds}`,
        key: API_KEY,
      },
    });
    console.log("channelsData", channelsData);

    const {
      data: { items: videosData },
    } = await instance.get(`videos`, {
      params: {
        part: "contentDetails,statistics",
        id: `${videoIds}`,
        key: API_KEY,
      },
    });

    const parsedData: HomePageVideos[] = await parseData(
      items,
      channelsData,
      videoIds,
      channelIds,
      videosData
    );
    return { parsedData: [...videos, ...parsedData], nextPageToken };
  }
);
