import React, {useState, useEffect } from "react";
import HeroSection from "../HeroSection/HeroSection"
import "../../App.scss"
import Cards from "../Cards/Cards"
import Footer from "../Footer/Footer"

const Home = () => {
    return (
        <>
         <HeroSection/>
         <Cards />
         <Footer />
        </>
    )
}

export default Home