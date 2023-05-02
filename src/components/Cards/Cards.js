import axios from 'axios'
import React, { useState, useEffect} from 'react'
import CardItem from "./CardItem"
import "./Cards.scss"
 
const Cards = () => {
  const [articleOne, setArticleOne] = useState([])
  const [articleTwo, setArticleTwo] = useState([])

  useEffect(() => {
    const getBlog = async () => {
      const { data } = await axios.get("/api/articles/all/")
      const customOne = []
      for(let i = 0; i < 2; i++){
        customOne.push(data[i])
      }
      setArticleOne(customOne)
    }

    getBlog()
  }, [])

  useEffect(() => {
    const getBlog = async () => {
      const { data } = await axios.get("/api/articles/all/")
      const customOne = []
      for(let i = 2; i < 5; i++){
        customOne.push(data[i])
      }
      setArticleTwo(customOne)
    }

    getBlog()
  }, []) 

    return (
      <div className='cards'>
        <h1>Check out these EPIC Destinations!</h1>
        <div className='cards__container'>
          <div className='cards__wrapper'>
          {articleOne.length !== 0 ? (
              <ul className='cards__items'> 
               {articleOne.map((blog) => (
                 <CardItem
                 key={blog._id}
                 src={blog.image}
                 text={blog.description}
                 label='Adventure'
                 path={`/blog/${blog.slug}`}
                 />
               ))}
              </ul>
          ): ( <h2 style={{color: "black", textAlign: "center", fontSize: "15px"}}> No Article Found</h2>)}

            {articleTwo.length !== 0 ? (
                <ul className='cards__items'>
                  {articleTwo.map((blog) => (
                    <CardItem
                    key={blog._id}
                    src={blog.image}
                    text={blog.description}
                    label='Mystery'
                    path={`/blog/${blog.slug}`}
                  />
                  ))}
              </ul>
            ) : (
              <h2 style={{color: "black", textAlign: "center", fontSize: "15px"}}> No Article Found</h2>
            ) }

          </div>
        </div>
      </div>
    );
  }
  
  export default Cards;
