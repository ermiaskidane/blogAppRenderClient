import React, {useState, useEffect} from 'react'
import { NavLink } from "react-router-dom";
import moment from "moment"
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'

import Sprite from "../../../assets/images/sprite.svg";
import "./Blog.scss"

const Blog = ({match, history}) => {
    const [blog, setBlog] = useState({})
    const [allBlogs, setAllBlogs] = useState([])
    const [loading, setLoading] =useState(false)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    const dispatch = useDispatch()
 
    const userLogin = useSelector((state) => state.userLogin)
    const { loading: userLoading, error, userInfo } = userLogin

    
    useEffect(() => {
        const getBlog = async () => {
            const { data } = await axios.get(`/api/articles/read/${match.params.slug}`)
            setBlog(data)
        }

        getBlog()
    }, [match.params.slug])

    useEffect(() => {
        setLoading(true)
        const getBlogs = async () => {
            const { data } = await axios.get("/api/articles/all/")
            const customData = []
            for(let i=0; i<8; i++){
                customData.push(data[i])
            }
            setLoading(false)
            setAllBlogs(customData)
        }

        getBlogs()
    },[match.params.slug])

    return (
      <div className='blog'>
          <div className="blog__content">
            <div className="blog__content--side">
                <svg>
                  <use xlinkHref={`${Sprite}#icon-hand`} />
                </svg>
                <span>72k</span>
                <svg>
                  <use xlinkHref={`${Sprite}#icon-bubble`} />
                </svg>
                <span>74 </span>
                <svg>
                  <use xlinkHref={`${Sprite}#icon-bookmark`} />
                </svg>
            </div>
            <div className="blog__content--container">
                <div className="blog__content--category">
                    <h2>{blog.title}</h2> 
                    <p className="author">Author: {blog.author}</p>
                    <p className="created--time">{moment(blog.createdAt).utc().format("DD/MM/YY")}</p>
                    <div className="content--body">
                        <figure>
                            <img src={blog.image ? blog.image : `/images/img-3.jpg`} alt="passive income"/>
                        </figure>
                        <text cols='60' rows='8' style={{whiteSpace: "pre-wrap"}} >{blog.markdown}</text>
                        {/* <p>{blog.markdown}</p> */}
                    </div>
                    <div className="blog--comments">
                    </div>
                </div>
            </div>
            <div className="blog__content--more">
                <h2>More Of Articles</h2>
                <ul className="blog__content--lists">
                    {loading && <div>loading...</div>}
                    {allBlogs.map((blog) =>(
                        <li className="content__list"  key={blog._id}>
                            <NavLink to={`/blog/${blog.slug}`}>{blog.title}</NavLink>
                            <p>{blog.author ? blog.author : "Laura vanderkam"}</p>
                            <img src={blog.image ? blog.image : `/images/img-2.jpg`} alt="author"/>
                        </li>
                    ))}
              </ul>
            </div>
            <div className="blog__footer">
                <ul className="blog__footer--lists">
                    <li>Blogs</li>
                    <li>About</li>
                    <li>Helps</li>
                </ul>
            </div>
          </div>
      </div>
    );
  }
  
  export default Blog;


