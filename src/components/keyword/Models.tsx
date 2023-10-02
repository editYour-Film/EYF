import { videos } from "@/components/data/videos";
import { H1 } from "../_shared/typography/H1";
import { VideoCatalog, VideoFilter } from "../_shared/video/VideoCatalog";
import routes from "@/routes";

export const Models = () => {
  return (
    <div>
      <VideoFilter
        filterSearch={true}
        filterTag={true}
        filterType={true}
        backLink={routes.HOME}
      />

      <VideoCatalog
        videoCatalog={{
          title: "YOUTUBE",
          videos: videos,
        }}
        isCarousel={false}
        className="mt-8"
      />
    </div>
  );
};
