import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import abi from "../../artifacts/contracts/WavePortal.sol/WavePortal.json"
import Header from './../../components/header/Header'
import Hero from './../../components/hero/Hero'
import './homePage.css'


const HomePage = ({ currentAccount }) => {
    
  
    return (
        <div>
            <Header />

            <Hero currentAccount={currentAccount} />
            
        </div>
    )
}

export default HomePage
