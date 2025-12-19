import { MAX_AVATAR, MIN_AVATAR, NAMES } from "../constants/constants";
import { getRandomInteger } from "../utils/randomInteger";

export function getNewComment(textComment: string) {
  const authorIndex = getRandomInteger(0, NAMES.length - 1);
  const avatarIndexComment = getRandomInteger(MIN_AVATAR, MAX_AVATAR);

  return {
    id: crypto.randomUUID(),
    author: {
      avatar: `src/img/avatar-${avatarIndexComment}.svg`,
      name: NAMES[authorIndex],
    },
    text: textComment,
  };
}
