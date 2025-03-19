export const generatePaginationNumbers = (
  currentPage: number,
  totalPage: number
) => {
  //si el numero de paginas total es 7 menos
  // vamos a mostrar todas las paginas sin puntos suspensivos
  if (totalPage <= 7) {
    return Array.from({ length: totalPage }, (_, i) => i + 1);
  }
  //si la pagina actual esta entre las 3 primeras paginas
  //   mostrar las tres primeras paginas, puntos suspensivos y la ultima pagina
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPage - 1, totalPage];
  }
  //   si la pagina actual esta entre las 3 ultimas paginas
  //     mostrar las 2 pagina, puntos suspensivos y las tres ultimas paginas
  if (currentPage > totalPage - 3) {
    return [1, 2, "...", totalPage - 2, totalPage - 1, totalPage];
  }
  //   si la pagina actual esta en otro lugar medio
  //     mostrar la primera pagina, puntos suspensivos y la pagina actual y vecinos

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPage,
  ];
};
