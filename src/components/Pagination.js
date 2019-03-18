import React from 'react';

const Pagination = ({ pageSize, currentPage, itemsCount, onPageClick }) => {
  const noOfPages = Math.ceil(itemsCount / pageSize);
  const pages = [];
  for (let i = 1; i <= noOfPages; i++) {
    pages.push(i);
  }
  if (pages.length === 1) return null;

  return (
    <nav className="pagination">
      <ul>
        {pages.map(page => (
          <li
            onClick={() => onPageClick(page)}
            className={currentPage === page ? 'selected-item' : ''}
          >
            {page}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
