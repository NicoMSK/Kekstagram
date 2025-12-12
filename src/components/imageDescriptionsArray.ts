import { DESCRIPTION, MAX_AVATAR, MIN_AVATAR, NAMES } from "./constants";
import { getCommentsArray } from "./getCommentsArray";
import { getRandomInteger } from "./utils";

export const imageDescriptions = Array.from({ length: 25 }, (_, i) => {
  const postNumber = i + 1;
  const authorIndex = getRandomInteger(0, NAMES.length - 1);
  const avatarIndex = getRandomInteger(MIN_AVATAR, MAX_AVATAR);
  const descIndex = getRandomInteger(0, DESCRIPTION.length - 1);

  return {
    id: crypto.randomUUID(),
    heroImgUrl: `src/photos/${postNumber}.jpg`,
    authorAvatarPost: `src/img/avatar-${avatarIndex}.svg`,
    authorNamePost: NAMES[authorIndex],
    description: `${DESCRIPTION[descIndex]}`,
    likeAmount: Math.floor(Math.random() * 100) + 10,
    likeChecked: false,
    comments: getCommentsArray(),
  };
});
