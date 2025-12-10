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
