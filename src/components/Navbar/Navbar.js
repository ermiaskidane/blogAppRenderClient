import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom"
import { Button } from '../Button/Button'
import SearchInput from "./Search"
import { logout } from "../../store/actions/userActions";
import "./Navbar.scss"

const Navbar = () => {

    const [click, setClick] = useState(false)
    const [button, setButton] = useState(true)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
 
    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(!click)

    const showButton = () => {
        if(window.innerWidth <= 960){
            // wont display the button tag
            setButton(false)
        } else {
            setButton(true)
        }
    } 

    useEffect(() => {
       showButton()
    }, [])

    window.addEventListener("resize", showButton)

    const logoutHandler = () => {
        // console.log("logout")
        dispatch(logout())
      }

    return (
        <>
           <nav className="navbar">
               <div className="navbar-container">
                   <Link to="/blogs/all" className="navbar-logo" onClick={closeMobileMenu}>
                       TRVL <i className="fab fa-typo3"/>
                   </Link>
                    <div className="searchBar">
                     <Route render={({history}) => <SearchInput  history={history} />} />
                    </div>
                   
                   <div className="menu-icon" onClick={handleClick}>
                       <i className={click ? "fas fa-times" : "fas fa-bars"} />
                   </div>
                   <ul className={click ? "nav-menu active": "nav-menu"}>
                       <li className="nav-item">
                       <Route render={({history}) => <SearchInput  history={history} />} />
                       </li>
                       <li className="nav-item">
                           <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                               Home
                           </Link>
                       </li> 
                       <li className="nav-item">
                           <Link to="/blogs/all" className="nav-links nav-userInfo" onClick={closeMobileMenu}>
                               Blogs
                           </Link>
                           <div className="nav-dropdown">
                                <Link to="/blogs/all">Blogs</Link>
                                {userInfo ? (
                                <Link to="/edit">Edit Blogs</Link>
                                ) : (
                                    <></>
                                )}
                                
                            </div>
                       </li>
                       <li className="nav-item">
                           <Link to="/products" className="nav-links" onClick={closeMobileMenu}>
                               Add Blog
                           </Link>
                       </li>
                       {userInfo ? (
                           <li className="nav-item">
                            <Link to="/" className="nav-links nav-userInfo" 
                            >
                                {userInfo.name}
                            </Link>
                            <div className="nav-dropdown-prof">
                                <p>Profile</p>
                                <p onClick={logoutHandler}>Logout</p>
                            </div>
                           </li>
                       ):(
                        <li className="nav-item">
                            <Link to="/sign-up" className="nav-links" onClick={closeMobileMenu}>
                                Sign up
                            </Link>
                       </li>
                       )}
                   </ul>
                </div>
            </nav> 
        </>
    )
} 

export default Navbar

