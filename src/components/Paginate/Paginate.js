import React from 'react'
// import { Pagination } from 'react-bootstrap'
import { Link } from "react-router-dom"
import "./Paginate.scss"

const Paginate = ({ path, pages, page, keyword = '' }) => {
  return ( 
    pages > 1 && (
      <div className="pagination">
        {[...Array(pages).keys()].map((x) => (
          <Link
            key={x + 1}
            to={
               keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/blogs/${path}/${x + 1}`
            }
          >
            <p active={(x + 1 === page).toString()}>{x + 1}</p>
          </Link>
        ))}
      </div>
    )
  )
}

export default Paginate
