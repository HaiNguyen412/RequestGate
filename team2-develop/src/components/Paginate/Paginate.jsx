import React, { useEffect, useState } from "react";
const numberPages = (total, perPage) => {
  if (total && perPage) return Math.ceil(total / perPage);
  return null;
};

function Paginate({
  perPage,
  currentPage,
  total,
  prevPage,
  nextPage,
  page,
  setPage,
}) {
  const [numberOfPages, setNumberOfPages] = useState(() =>
    numberPages(total, perPage)
  );
  useEffect(() => {
    setNumberOfPages(() => numberPages(total, perPage));
  }, [total, perPage]);

  const handleChangePage = (pageNumber) => {
    setPage(pageNumber);
  };
  return (
    <>
      {page > 0 && (
        <div className="my-5 w-full">
          <div className="mx-auto w-3/4 flex flex-wrap justify-center">
            {prevPage && (
              <div
                onClick={() => handleChangePage(currentPage - 1)}
                className="cursor-pointer z-10 bg-white text-indigo-600 relative inline-flex items-center px-2 py-1 border text-sm font-medium"
              >
                {"<"}
              </div>
            )}
            {numberPages &&
              [...Array(numberOfPages).keys()].map((countPage, index) => (
                <div
                  key={index++}
                  onClick={() => handleChangePage(countPage + 1)}
                  className={`${
                    currentPage === countPage + 1
                      ? "bg-indigo-600 text-white"
                      : " text-indigo-600"
                  } cursor-pointer z-10 bg-white relative inline-flex items-center px-2 py-1 border text-sm font-medium`}
                >
                  {countPage + 1}
                </div>
              ))}
            {nextPage && (
              <div
                onClick={() => handleChangePage(currentPage + 1)}
                className="cursor-pointer z-10 bg-white text-indigo-600 relative inline-flex items-center px-2 py-1 border text-sm font-medium"
              >
                {">"}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Paginate;
