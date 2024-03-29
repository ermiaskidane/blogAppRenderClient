import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { login } from '../../../store/actions/userActions'
import axios from 'axios'
import './AddBlog.scss'

const AddBlog = ({ history }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [file, setFile] = useState('')
  // const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [markdown, setMarkdown] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  // const uploadFileHandler = async (e) => {
  //     console.log(e.target.files)
  //     const file = e.target.files[0]
  //     const formData = new FormData()
  //     formData.append('image', file)
  //     setUploading(true)

  //     if(userInfo) {
  //       try {
  //         const config = {
  //           headers: {
  //             'Content-Type': 'multipart/form-data',
  //           },
  //         }

  //         const { data } = await axios.post('/api/upload', formData, config)

  //         setImage(data)
  //         setUploading(false)
  //       } catch (error) {
  //         console.error(error)
  //         setUploading(false)
  //       }
  //     } else {
  //       history.push("/sign-in")
  //     }
  //   }

  // const uploadFileHandler = async (e) => {
  //   console.log(e.target.files)
  //   const file = e.target.files[0]
  //   const formData = new FormData()
  //   formData.append('file', file)
  //   formData.append('upload_preset', 'upload')
  //   setUploading(true)

  //   if (userInfo) {
  //     try {
  //       const uploadRes = await axios.post(
  //         `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/image/upload`,
  //         formData
  //       )

  //       const { url } = uploadRes.data

  //       const config = {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       }

  //       const { data } = await axios.post(
  //         'https://blogappserver-nay2.onrender.com/api/upload',
  //         url,
  //         config
  //       )

  //       setImage(data)
  //       setUploading(false)
  //     } catch (error) {
  //       console.error(error)
  //       setUploading(false)
  //     }
  //   } else {
  //     history.push('/sign-in')
  //   }
  // }

  const submitHandler = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'upload')
    setUploading(true)

    if (userInfo) {
      try {
        // send the image to cloudinary then to backend
        const uploadRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/image/upload`,
          formData
        )

        const { url } = uploadRes.data

        const data = { author, title, url, description, markdown }
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        const articleData = async () => {
          const blogPost = await axios.post('/api/articles', data, config)
          return blogPost
        }

        articleData()
        history.push('/')
        setUploading(false)
      } catch (err) {
        console.error(error)
        setUploading(false)
      }
    } else {
      history.push('/sign-in')
    }
  }

  return (
    <div className='form'>
      <h1>New Article</h1>
      <form onSubmit={submitHandler} id='form-products'>
        <div className='form__fields'>
          <input
            type='text'
            name='name'
            id='name'
            onChange={(e) => setAuthor(e.target.value)}
            className='form-control'
            placeholder='Author name'
            required
          />

          <input
            type='text'
            name='title'
            id='title'
            onChange={(e) => setTitle(e.target.value)}
            className='form-control'
            placeholder='enter the title'
            required
          />

          <input
            type='file'
            name='image'
            id='image'
            // onChange={uploadFileHandler}
            onChange={(e) => setFile(e.target.files[0])}
            className='form-control'
            placeholder='enter the img url'
            required
          />
          <textarea
            name='description'
            id='description'
            onChange={(e) => setDescription(e.target.value)}
            className='form-control'
            placeholder='write the description'
            required
          ></textarea>
          <textarea
            name='markdown'
            id='markdown'
            onChange={(e) => setMarkdown(e.target.value)}
            className='form-control'
            placeholder='write the markdown'
            required
          ></textarea>
        </div>
        <NavLink to='/'>cancle</NavLink>
        <button type='submit' className='form__btn'>
          Save
        </button>
      </form>
    </div>
  )
}

export default AddBlog
