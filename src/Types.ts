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
  //   views: string;
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

/// Выше пересмотреть старые стили


export interface VideosOrChannelsItem {
    kind: string;
    etag: string;
    id: string;
    snippet: Snippet;
    contentDetails: ContentDetails;
    statistics: { viewCount: string; likeCount: string; subscriberCount: string };
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

  export interface VideosOrChannels {
    etag: string;
    kind: string;
    items: VideosOrChannelsItem[];
    pageInfo: {
      resultsPerPage: number;
      totalResults: number;
    };
  }

  export interface SearchVideosItem {
    etag: string;
    kind: string;
    id: {
        kind: string
        videoId: string
    }
    snippet: Snippet
  }

  export interface ChannelsDataResponse extends VideosOrChannels {

  }

  export interface SearchVideosResponse {
    etag: string;
    kind: string;
    items: SearchVideosItem[];
    pageInfo: {
      resultsPerPage: number;
      totalResults: number;
    };
    regionCode: string
    nextPageToken: string
  }

  export interface SearchParams {
    pageToken: string;
    searchTerm: string;
  }

  export interface DetailChannelInfo {
    videoId:     string;
    title:       string;
    description: string;
    thumbnail:   string;
    link:        string;
    duration:    string;
    videoAge:    string;
    channelInfo: ChannelInfo;
}

export interface ChannelInfo {
    id:    string;
    image: string;
    name:  string;
}
