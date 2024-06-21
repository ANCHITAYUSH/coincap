import React from 'react';
import { PaginationProps } from '../interfaces/PaginationProps';

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {pages.map((page) => (
            <li className="page-item">
            {page === currentPage ?
              <a 
                className="page-link disabled"
                key={page}
              >
                {page}
              </a> :
              <a 
                className="page-link hover-enabled"
                key={page}
                onClick={() => onPageChange(page)}
              >
                {page}
              </a>
            }
            </li>          
          ))}
        </ul>
      </nav> 
    </div>
  );
}

export default Pagination;
