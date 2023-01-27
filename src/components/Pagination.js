import React from "react";

export default function Pagination(props) {
  const pageNumbers = []

  for(let i = 1; i <= Math.ceil(props.totalCards / props.cardsPerPage); i++) {
    pageNumbers.push(i)
  }

  function previous() {
    if (props.currentPage !== 1) {
      props.setCurrentPage(prevValue => prevValue - 1)
    }
  }

  function next() {
    if (props.currentPage !== pageNumbers.length) {
      props.setCurrentPage(prevValue => prevValue + 1)
    }
  }


  return(
    <div>
      <ul className="pagination justify-content-center">
        <li className="page-item pagination-elements">
          <a href="!#" onClick={previous} className="page-link">
            Previous
          </a>
        </li>
        {pageNumbers.map(number =>(
          <li className={`page-item pagination-elements ${props.currentPage === number ? `active` : ``}`}>
            <a onClick={() => props.paginate(number)} href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
        <li className="page-item pagination-elements">
          <a href="!#" onClick={next} className="page-link">
            Next
          </a>
        </li>
      </ul>
    </div>
  )
}
