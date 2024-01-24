import { modelType } from "../_context/EditorContext";

export type FormatsType =
  | "model 16/9 ème"
  | "model 9/16 ème"
  | "Carré"
  | "Mobile";
export const Formats: modelType[] = [
  "model 16/9 ème",
  "model 9/16 ème",
  "Carré",
  "Mobile",
];

export type VisibilityType = "public" | "private" | "unrepertoried";
export const Visibility: VisibilityType[] = [
  "public",
  "private",
  "unrepertoried",
];

export type WorkTimeType = "basic" | "medium" | "complex";
export type WorkTimeLabelType = "Basique" | "Moyen" | "Très compliqué";
export const Worktime: WorkTimeLabelType[] = [
  "Basique",
  "Moyen",
  "Très compliqué",
];
