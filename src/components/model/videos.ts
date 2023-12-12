export type Video = {
  id: number;
  title: string;
  madeBy: string;
  path: string;
  thumbnail: string;
  type: string;
  isMobile: boolean;
  profilePath: string;
  duration?: string;
};

export type VideoListSection = {
  title?: string;
  videos: Video[];
};
