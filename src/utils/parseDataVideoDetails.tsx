import { useGetVideoDetailsQuery } from "../api/api";
import { YOUTUBE_API_URL } from "./constants";
import { convertRawViews } from "./convertRawViews";
import { timesVideo } from "./timesVideo";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

export const GetVideoDetail = (id: string) => {
  const res = useGetVideoDetailsQuery(id);
  const items = res.data.items;

  console.log("items", items[0]);
};

// const parseData = async (item: {
//   snippet: {
//     channelId: string;
//     title: string;
//     description: string;
//     publishedAt: Date;
//     channelTitle: string;
//   };
//   id: string;
//   statistics: { viewCount: string; likeCount: string };
// }) => {
//   const {
//     data: {
//       items: [
//         {
//           snippet: {
//             thumbnails: {
//               default: { url: channelImage },
//             },
//           },
//           statistics: { subscriberCount },
//         },
//       ],
//     },
//   } = await axios.get(
//     `${YOUTUBE_API_URL}/channels?part=snippet,statistics&id=${item.snippet.channelId}&key=${API_KEY}`
//   );

//   return {
//     videoId: item.id,
//     title: item.snippet.title,
//     description: item.snippet.description,
//     views: parseInt(item.statistics.viewCount).toLocaleString(),
//     likes: convertRawViews(item.statistics.likeCount),
//     age: timesVideo(new Date(item.snippet.publishedAt)),
//     channelInfo: {
//       id: item.snippet.channelId,
//       image: channelImage,
//       name: item.snippet.channelTitle,
//       subscribers: convertRawViews(subscriberCount, true),
//     },
//   };
// };
