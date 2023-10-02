export type Video = {
  id: string;
  title: string;
  madeBy: string;
  path: string;
  thumbnail: string;
  type: string;
  isMobile: boolean;
  profilePath: string;
};
export type VideoListSection = {
  title?: string;
  videos: Video[];
};
