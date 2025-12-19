import { MAX_COMMENT, MIN_COMMENT, TEXT_COMMENT } from "../constants/constants";
import { getNewComment } from "./getNewComment";
import { getRandomInteger } from "../utils/randomInteger";

export function getCommentsArray() {
  const commentsAmount = getRandomInteger(MIN_COMMENT, MAX_COMMENT);

  return Array.from({ length: commentsAmount }, () => {
    const textIndex = getRandomInteger(0, TEXT_COMMENT.length - 1);

    return getNewComment(TEXT_COMMENT[textIndex]);
  });
}
