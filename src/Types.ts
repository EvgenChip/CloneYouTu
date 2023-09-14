export interface InitialState {
  videos: HomePageVideos[];
  currentPlaying: CurrentPlaying | null;
  searchTerm: string;
  searchResults: [];
  nextPageToken: string | null;
  recommendedVideos: RecommendedVideos[];
}

export interface HomePageVideos {
  videoId: string;
  title: string;
  description: string;
  link: string;
  thumbnail: string;
  duration: string;
  views: string;
  videoAge: string;
  channelInfo: {
    id: string;
    image: string;
    name: string;
  };
}

export interface CurrentPlaying {
  videoId: string;
  title: string;
  description: string;
  views: string;
  likes: string;
  age: string;
  channelInfo: {
    id: string;
    image: string;
    name: string;
    subscribers: string;
  };
}

export interface RecommendedVideos {
  videoId: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  videoAge: string;
  channelInfo: {
    id: string;
    name: string;
  };
}

export interface Item {
  snippet: {
    title: string;
    thumbnails: { medium: { url: string } };
    publishedAt: Date;
    channelTitle: string;
    channelId: string;
  };
  contentDetails: { upload: { videoId: string } };
}
