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
};

export type FilterStatus = "default" | "random" | "discussed";

export type ButtonProps = {
  checkPressedButton: boolean;
  idButton: string;
  children: string;
};
