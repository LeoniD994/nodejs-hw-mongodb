export const parseSortParams = (query) => {
  const { sortBy = 'name', sortOrder = 'asc' } = query;

  const validSortOrder = ['asc', 'desc'].includes(sortOrder)
    ? sortOrder
    : 'asc';
  const validSortBy = [
    'name',
    'phoneNumber',
    'email',
    'contactType',
    'isFavourite',
    'createdAt',
  ].includes(sortBy)
    ? sortBy
    : 'name';

  return {
    sortBy: validSortBy,
    sortOrder: validSortOrder,
  };
};
