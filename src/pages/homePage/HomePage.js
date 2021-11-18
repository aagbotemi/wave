import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import abi from "../../artifacts/contracts/WavePortal.sol/WavePortal.json"
import Header from './../../components/header/Header'
import Hero from './../../components/hero/Hero'
import Profile from '../../assets/images/profile.svg'
import Footer from '../../components/footer/Footer'

import './homePage.css'


const HomePage = ({ currentAccount }) => {

    const [allWaves, setAllWaves] = useState([]);
    /*const [messageModal, setMessageModal] = useState({
        show: false, // initial values set to false and null
        index: null,
    })*/

    const contractAddress = "0x7da3A27D423aCad77C52e4353788D11c60a81fdA";

    const contractABI = abi.abi;

    /* const openMessageModal = (index) => {
        setMessageModal({
        show: true,
        index,
        });


        console.log('Open the Modal', index)
    }

    const closeMessageModal = (e) => {

        e.stopPropagation();
        setMessageModal({
        show: false,
        id: null
        });
    } */

    const getAllWaves = async () => {
        const { ethereum } = window;
        try {
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

                /*
                * Call the getAllWaves method from your Smart Contract
                */
                const waves = await wavePortalContract.getAllWaves();

                /*
                * We only need address, timestamp, and message in our UI so let's
                * pick those out
                */
                const wavesCleaned = waves.map(wave => {
                return {
                    address: wave.waver,
                    timestamp: new Date(wave.timestamp * 1000),
                    message: wave.message,
                };
                });

                /*
                * Store our data in React State
                */
                setAllWaves(wavesCleaned);
            } else {
                console.log("Ethereum object doesn't exist!")
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllWaves();
    }, [])
  
    return (
        <div>
            <Header />

            <Hero 
                currentAccount={currentAccount} 
                contractAddress={contractAddress} 
                contractABI={contractABI} 
            />

            <main>
                <div className={'main-header d-flex items-center justify-between'}>
                    <div className={'wave-length'}>{allWaves.length}</div>
                    <div className={'title'}> Waves </div>
                    <div> {" "} </div>
                </div>
                <div className={'message-container'}>
                    {allWaves.map((wave, index) => {
                        return (
                            <div /*onClick={() => openMessageModal(index)}*/ key={index} className={'message-list cursor-pointer'}>
                                <div className={'d-flex items-center justify-between'}>
                                    <div className={'d-flex items-center'}>
                                        <img src={Profile} alt={'profile'} width={'30px'} />
                                        <div className={'ml-4'}>
                                            <div className={'address'}>{wave.address}</div>
                                            <div className={'message'}>{wave.message}</div>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className={'date-time'}>{wave.timestamp.toLocaleDateString()} - {wave.timestamp.toLocaleTimeString()}</div>
                            </div>
                        )
                    })}
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default HomePage
