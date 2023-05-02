import React, { useState } from 'react'
import {Button} from "../Button/Button"
import "./Search.scss"

const SearchInput = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/blogs/search/${keyword}`)
    } else {
      history.push('/blogs/all')
    }
  } 

  return (
    <form onSubmit={submitHandler} className="searchInput">
            <input 
            type="text"
            name="q"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search Articles..."
            className="searchInput--box"
            />

        <button type="submit" className="btn btn-primary">
          Search
        </button>
    </form>
  )
} 

export default SearchInput