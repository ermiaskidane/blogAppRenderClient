import React, { useState, useEffect } from "react"
import './App.scss';
import Navbar from "./components/Navbar/Navbar"
import Home from "./components/Pages/Home"
import AddBlog from "./components/Pages/AddBlog/AddBlog"
import UpdateArticle from "./components/Pages/Update/UpdateArticle"
import EditArticle from "./components/Pages/Update/EditArticle"
import AllBlogs from "./components/Pages/Blogs/Blogs"
import Blog from "./components/Pages/Blogs/Blog"
import SignIn from "./components/Pages/SignIn"
import SignUp from "./components/Pages/SignUp"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

const App = () => {
 
  return (
    <>
      <Router>
        <Navbar />
          <Switch>
            <Route path="/update/:id"  component={UpdateArticle}/>
            <Route path="/blogs/all"  component={AllBlogs} exact/>
            <Route path="/blogs/all/:pageNumber" component={AllBlogs} exact />
            <Route path="/blogs/search/:keyword" component={AllBlogs} exact />
            <Route path="/blog/:slug"  component={Blog}/>
            <Route path="/" exact  component={Home}/>
            <Route path="/products"  component={AddBlog}/>
            <Route path="/edit"  exact component={EditArticle}/>
            <Route path="/blogs/edit/:pageNumber" component={EditArticle} exact />
            <Route path="/sign-in"   component={SignIn}/>
            <Route path="/sign-up"   component={SignUp}/>
          </Switch>
      </Router>
    </>
  );
} 
 
export default App;
