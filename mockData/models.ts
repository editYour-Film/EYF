import { EditorVideo } from "@/components/dashboard/editor/_context/EditorContext";
import user from "./user.json";

const Models: EditorVideo[] = [
  {
    id: 1,
    video: "/video/top_video_5bc1b8a04f.webm",
    thumbnail: "/img/img.png",
    title: "Arakmaja - A Moroccan Surf Documentary",
    length: "10:05",
    model: "model 16/9 ème",
    resources: undefined,
    user_info: user.details,
    visibility: "public",
    copywrite: "Copywrite",
    worktime: "base",
    is_highlighted: false,
    description:
      "Arakmaja is a documentary about Morocco’s surfing culture.This journey introduces us to people and stories sharing one common thread: the genuine passion for the art of riding waves.A journey lived through Redouane’s surfing and through the words of pioneer Randolph Benzaquen and shapers Thierry Delbourg and Tarik Zrilida.Morocco has been, for the last half century, a mystical destination for generation of surfers. While in the last years mass surf tourism has exploded, small family businesses and passionate local surfers like the Regragui’s still embody the genuine essence of a young and vibrant surfing culture.Presented by The Surf TribeDirected by Gianluca FortunatoSounds:Armenian Dream - IntroBabylone - ZinaAssaf Ayalon - WordsNass El Ghiwane - Ah Ya OuineCarlos Maria Trindade & Nuno Canavarro - Blu TerraMaalem Mahmoud Guinia & Floating Points - Mimoum MarhabaRiccardo Marino - At Sunset",
    video_tags: [
      { name: "Tag1", id: 1 },
      { name: "Tag2", id: 2 },
    ],
  },
  {
    id: 2,
    video: "/video/top_video_5bc1b8a04f.webm",
    thumbnail: "/img/img2.png",
    title: "Vlog en indonésie",
    length: "10:05",
    model: "model 16/9 ème",
    resources: undefined,
    user_info: user.details,
    visibility: "private",
    copywrite: "Copywrite",
    worktime: "base",
    is_highlighted: false,
    description: "description",
    video_tags: [
      { name: "Tag1", id: 1 },
      { name: "Tag2", id: 2 },
    ],
  },
  {
    id: 1,
    video: "/video/top_video_5bc1b8a04f.webm",
    thumbnail: "/img/img3.png",
    title: "Vlog en indonésie",
    length: "10:05",
    model: "Mobile",
    resources: undefined,
    user_info: user.details,
    visibility: "public",
    copywrite: "Copywrite",
    worktime: "base",
    is_highlighted: false,
    description: "description",
    video_tags: [
      { name: "Tag1", id: 1 },
      { name: "Tag2", id: 2 },
    ],
  },
];

export { Models };
