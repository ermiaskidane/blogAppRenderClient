import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"
import "../AddBlog/AddBlog.scss"

const UpdateArticle = ({match, history}) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [markdown, setMarkdown] = useState("")

    const userLogin = useSelector((state) => state.userLogin)
    const { loading: userLoading, error, userInfo } = userLogin
    
    
    useEffect(() => {
        if(userInfo) {
            const editData = async () => {
                const { data } = await axios.get(`/api/articles/edit/${match.params.id}`)
                setTitle(data.title)
                setDescription(data.description)
                setMarkdown(data.markdown)
            }
    
            editData()
        } else {
            history.push("/sign-in")
        }
        
    }, [userInfo]) 

    const submitHandler = (e) => {
        e.preventDefault()
        const data = {title, description, markdown}
        const articleData = async () => {
            const blogPost = await axios.put(`/api/articles/${match.params.id}`, data)

            return blogPost
        }
        articleData()
        history.push("/")
    }
    return (
        <div className="form form--update">
            <h1>Update Article</h1>
            <form onSubmit={submitHandler} id="form-products">
                <div className="form__fields">
                    <input 
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control"
                    placeholder="enter the title"
                    required
                    />
                    <textarea 
                    name="description"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control"
                    placeholder="write the description"
                    required
                    ></textarea>
                    <textarea 
                    name="markdown"
                    id="markdown"
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    className="form-control"
                    placeholder="write the markdown"
                    required
                    ></textarea>
                </div>
                <NavLink to="/">
                    cancle
                </NavLink>
                <button type="submit" className="form__btn">Save</button>
            </form>
        </div>
    )
}

export default UpdateArticle
