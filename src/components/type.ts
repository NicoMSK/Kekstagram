export type Comment = {
  id: string;
  author: {
    avatarComment: string;
    nameComment: string;
  };
  textComment: string;
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
