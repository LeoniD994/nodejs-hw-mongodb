export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const validTypes = ['work', 'home', 'personal'];
  const parsedType = validTypes.includes(type) ? type : null;

  const parsedIsFavourite =
    isFavourite === 'true' ? true : isFavourite === 'false' ? false : null;

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
