export const NAMES = [
  "Иван",
  "Хуан Себастьян",
  "Мария",
  "Кристоф",
  "Виктор",
  "Юлия",
  "Люпита",
  "Игорь",
  "Николай",
  "Никита",
  "Михаил",
  "Макс",
  "Роман",
  "Матвей",
];

export const DESCRIPTION = [
  "Отличный пост! Автор проделал отличную работу, рекомендую всем ознакомиться.",
  "Очень интересно, продолжайте в том же духе!",
  "Согласна с мнением автора, это действительно важно.",
  "Отличная статья, спасибо за информацию!",
  "Интересный подход, я бы тоже так сделал(а).",
  "Не могу не согласиться, автор поднял важную тему.",
  "Очень познавательно, спасибо за статью!",
  "Отличная работа, автор заслуживает уважения.",
  "Интересный взгляд на проблему, стоит задуматься.",
  "Спасибо за статью, она заставила меня задуматься.",
  "Еще раз спасибо за статью, она заставила меня задуматься.",
];

export const TEXT_COMMENT = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!",
];

const MIN_COMMENT = 3;
const MAX_COMMENT = 25;
const MIN_AVATAR = 1;
const MAX_AVATAR = 6;

function getRandomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

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

export function getCommentsArray() {
  const commentsAmount = getRandomInteger(MIN_COMMENT, MAX_COMMENT);

  return Array.from({ length: commentsAmount }, () => {
    const textIndex = getRandomInteger(0, TEXT_COMMENT.length - 1);

    return getNewComment(TEXT_COMMENT[textIndex]);
  });
}

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
