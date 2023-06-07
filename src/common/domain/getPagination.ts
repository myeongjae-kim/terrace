export const getPagination = (pageOneIndexed: number, size: number) => {
  const pageZeroIndexed = pageOneIndexed - 1;
  const limit = size ? +size : 3; 
  const from = pageZeroIndexed ? pageZeroIndexed * limit : 0;
  const to = pageZeroIndexed ? from + size - 1 : size - 1;

  console.log("page, size", pageZeroIndexed, size);
  console.log("getPagination", { from, to });

  return { from, to };
};
