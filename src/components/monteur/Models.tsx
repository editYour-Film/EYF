import { videos } from "@/components/data/videos";
import { VideoCatalog, VideoFilter } from "../_shared/video/VideoCatalog";

export const Models = () => {
  return (
    <div className="mt-10 md:mt-20">
      <VideoCatalog
        videoCatalog={{
          title: "DISPONIBLE DÈS DEMAIN",
          videos: videos,
        }}
        isCarousel={false}
        className="mt-8"
      />

      <VideoCatalog
        videoCatalog={{
          title: "MOBILE",
          videos: videos.filter((x) => x.isMobile),
        }}
        isMobile
        isCarousel={false}
        className="mt-8"
      />

      <VideoCatalog
        videoCatalog={{
          title: "DOCUMENTAIRE",
          videos: videos,
        }}
        isCarousel={false}
        className="mt-8"
      />
    </div>
  );
};
