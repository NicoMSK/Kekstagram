export type Comment = {
  id: string;
  author: {
    avatarImg: string;
    name: string;
  };
  text: string;
};

export type Post = {
  id: string;
  url: string;
  avatarImg: string;
  name: string;
  description: string;
  likeAmount: number;
  likeChecked: boolean;
  comments: Comment[];
};
