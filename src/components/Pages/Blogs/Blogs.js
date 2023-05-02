import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

import Paginate from "../../Paginate/Paginate"
import axios from "axios"
import "./Blogs.scss"

const Blogs = ({ match}) => {

    const [blogs, setBlogs] = useState([])
    const [page, setPage] = useState()
    const [pages, setPages] = useState()

    const keyword = match.params.keyword || ""
 
    const pageNumber = match.params.pageNumber || ""

    const dispatch = useDispatch()
 
    const userLogin = useSelector((state) => state.userLogin)
    const { loading: userLoading, error, userInfo } = userLogin

    
    useEffect(() => {
        const getBlogs = async () => {
            const { data } = await axios.get(`/api/articles/divideAll?keyword=${keyword}&pageNumber=${pageNumber}`)

            setPage(data.page)
            setPages(data.pages)
            setBlogs(data.fetchedBlog)
        }

        getBlogs()
    }, [pageNumber, keyword])
     
    return (
      <div className='blogs'>
        <h1>All of the Blogs</h1>
        <div className='blogs__container'>
          <div className='blogs__wrapper'>
            {blogs.length !== 0 ? (
                <ul className='blogs__items'>
                {
                    blogs.map((b) => (
                     <React.Fragment key={b._id}>
                       <li className="blogs__item">
                         <Link className="blogs__item__link" to={`/blog/${b.slug}`}>
                             <figure className="blogs__item__pic-wrap" data-category="Adventure">
                                 <img src={b.image ? b.image :`${process.env.PUBLIC_URL}/images/img-9.jpg`} alt="Travel Image" className="blogs__item__img"/>
                             </figure>
                             </Link>
                             <div className="blogs__item__info">
                                 <h5 className="blogs__item__text">{b.description}</h5>
                                 
                             </div>
                       </li>  
                   </React.Fragment>
                    ))
                }
             </ul>
            ) : ( <h2 style={{color: "black", textAlign: "center", fontSize: "14px"}}> No Article Found</h2>)}
            

            <Paginate path="all" pages={pages} page={page} keyword={keyword ? keyword : ""}/>
          </div>
        </div>
      </div>
    );
  }
  
  export default Blogs;
