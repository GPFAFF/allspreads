import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-items: center;
  border: 1px solid var(--grey);
  margin: 2rem 0;
  border-radius: 5px;
  text-align: center;
  & > * {
    padding: 1rem;
    flex: 1;
    border-right: 1px solid var(--grey);
    text-decoration: none;
    &[aria-current],
    &.current {
      color: var(--red);
    }
    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }
  @media (max-width: 800px) {
    .word {
      display: none;
    }
    font-size: 1.4rem;
  }
`;

export default function Pagination({
  pageSize,
  totalCount,
  currentPage,
  skip,
  base,
}) {
  console.log(base, skip);
  // make some variables
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;
  return (
    <PaginationStyles>
      <Link
        title="Prev Page"
        disabled={!hasPrevPage}
        to={prevPage}
      >
        ←
        <span className="word">Prev</span>
      </Link>
      {Array.from({ length: totalPages }).map((_, i) => {
        console.log(totalPages, i);
        return (
          <Link
            className={currentPage === 1 && i === 0 ? 'current' : ''}
            to={`${i > 0 ? i + 1 : ''}`}
            key={`page${i}`}
          >
            {i + 1}
          </Link>
        );
      })}
      <Link
        title="Next Page"
        disabled={!hasNextPage}
        to={`why/${nextPage}`}
      >
        <span className="word">Next</span>
        →
      </Link>
    </PaginationStyles>
  );
}
