import { MAX_AVATAR, MIN_AVATAR, NAMES } from "./constants";
import { getRandomInteger } from "./utils";

export function getNewComment(textComment: string) {
  const authorIndex = getRandomInteger(0, NAMES.length - 1);
  const avatarIndexComment = getRandomInteger(MIN_AVATAR, MAX_AVATAR);

  return {
    id: crypto.randomUUID(),
    author: {
      avatarComment: `src/img/avatar-${avatarIndexComment}.svg`,
      nameComment: NAMES[authorIndex],
    },
    textComment: textComment,
  };
}
