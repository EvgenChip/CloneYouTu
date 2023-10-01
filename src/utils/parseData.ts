import { parseVideoDuration, timesVideo } from "./index";
import {
  HomePageVideos,
  SearchVideosItem,
  VideosOrChannelsItem,
} from "../Types";

export const parseData = (
  items: SearchVideosItem[],
  channelsData: VideosOrChannelsItem[],
  videosData: VideosOrChannelsItem[]
) => {
  try {
    const channelsMap: Record<string, string> = {};

    channelsData.forEach((channel) => {
      channelsMap[channel.id] = channel.snippet.thumbnails.default.url;
    });

    const parsedData: HomePageVideos[] = [];
    items.forEach((item, index) => {
      const channelImage = channelsMap[item.snippet.channelId];

      if (channelImage)
        parsedData.push({
          videoId: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.medium.url,
          link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          duration:
            videosData[index] &&
            parseVideoDuration(videosData[index].contentDetails.duration),
          videoAge: timesVideo(new Date(item.snippet.publishedAt)),
          channelInfo: {
            id: item.snippet.channelId,
            image: channelImage || "",
            name: item.snippet.channelTitle,
          },
        });
    });

    return parsedData;
  } catch (err) {
    console.log(err);
  }
};
