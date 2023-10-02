import { videos } from "@/components/data/videos";
import { H1 } from "../_shared/typography/H1";
import { VideoCatalog, VideoFilter } from "../_shared/video/VideoCatalog";

export const Models = () => {
  return (
    <div className="mt-10 md:mt-20 bg-pattern">
      <H1 className="text-center max-w-lg mx-auto">
        NOUS AVONS LE MODÈLE QU’IL VOUS FAUT.
      </H1>

      <VideoFilter
        filterSearch={true}
        filterTag={true}
        filterType={true}
        className="mt-12"
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
