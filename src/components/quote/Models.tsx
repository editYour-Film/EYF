import { videos } from "@/components/data/videos";
import { VideoCatalog, VideoFilter } from "../_shared/video/VideoCatalog";
import routes from "@/routes";

export const Models = () => {
  return (
    <div>
      <VideoFilter
        filterSearch={true}
        filterTag={true}
        filterType={true}
        backLink={routes.QUOTE_STEP1}
      />

      <VideoCatalog
        videoCatalog={{
          title: "DISPONIBLE DÈS DEMAIN",
          videos: videos,
        }}
        className="mt-8"
      />

      <VideoCatalog
        videoCatalog={{
          title: "MOBILE",
          videos: videos.filter((x) => x.isMobile),
        }}
        isMobile
        className="mt-8"
      />

      <VideoCatalog
        videoCatalog={{
          title: "DOCUMENTAIRE",
          videos: videos,
        }}
        className="mt-8"
      />
    </div>
  );
};
