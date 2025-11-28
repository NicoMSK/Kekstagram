export type Comment = {
  author: {
    avatarImg: string;
    name: string;
  };
  text: string;
};

export type Post = {
  id: number;
  url: string;
  avatarImg: string;
  name: string;
  description: string;
  likeAmount: number;
  likeChecked: boolean;
  comments: Comment[];
};
