import { convertRawViews, timesVideo } from "./";

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

export const parseDataVideoDetails = (item: DataItem, detail: any) => {
  const channelImage = detail.snippet.thumbnails.default.url;
  const subscriberCount = detail.statistics.subscriberCount;

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
