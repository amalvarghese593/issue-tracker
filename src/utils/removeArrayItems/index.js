export const removeArrayItems = (array, index, deleteCount = 1) => {
  const arr = [...array];
  arr.splice(index, deleteCount);
  return arr;
};
