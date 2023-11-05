const paginateData = (items, currentPage) => {
  //items for page
  const itemsPerPage = 20;

  //items current page
  const sliceEnd = currentPage * itemsPerPage;
  const sliceStart = sliceEnd - itemsPerPage;
  const itemsIncurrentPage = items.slice(sliceStart, sliceEnd);
  items.slice(sliceStart, sliceEnd);

  //last page
  const lastpage = Math.ceil(items.length / itemsPerPage);

  //current block
  const pagesPerBlock = 5;
  const actualBlock = Math.ceil(currentPage / pagesPerBlock);

  //pages to show in block
  const pagesInCurrentBlock = [];
  const maxPage = actualBlock * pagesPerBlock;
  const minPage = maxPage - pagesPerBlock + 1;
  for (let i = minPage; i <= maxPage; i++) {
    if (i <= lastpage) {
      pagesInCurrentBlock.push(i);
    }
  }
  return {
    itemsIncurrentPage,
    pagesInCurrentBlock,
    lastpage,
  };
};

export { paginateData };
