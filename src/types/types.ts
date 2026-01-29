import type { FilterValues, ScaleType } from "../components/UploadingNewImage";

export type Comment = {
  id: string;
  author: {
    avatar: string;
    name: string;
  };
  text: string;
};

export type Post = {
  id: string;
  heroImgUrl: string;
  authorAvatarPost: string;
  authorNamePost: string;
  description: string;
  likeAmount: number;
  likeChecked: boolean;
  comments: Comment[];
  scale: ScaleType;
  filter: FilterValues;
};

export type FilterStatus = "default" | "random" | "discussed";

export type ModalType = "openImage" | "upLoadImage";
export type ModalState = ModalType | null;
