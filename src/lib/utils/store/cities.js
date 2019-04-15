export const sortCitiesByLikes = likes => (first, second) => {
  const firstLike = likes.find(like => like.id === first.id);
  const secondLike = likes.find(like => like.id === second.id);

  if (!firstLike && !secondLike) {
    const firstName = String(first.name).toLowerCase();
    const secondName = second.name.toLowerCase();

    return firstName.localeCompare(secondName);
  } if (firstLike && secondLike) {
    return secondLike.likedAt - firstLike.likedAt;
  }
  return firstLike ? -1 : 1;
};

export const indexOfLike = (likes, cityId) => {
  for (let index = 0; index < likes.length; index += 1) {
    if (likes[index].id === cityId) {
      return index;
    }
  }

  return -1;
};
