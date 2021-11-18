import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './hero.css'

const Hero = ({ currentAccount, contractAddress, contractABI }) => {
    const [loadingWave, setLoadingWave] = useState(false);
    const [message, setMessage] = useState("");
    const [waveCount, setWaveCount] = useState(0);
    const [modal, setModal] = useState(false);

    const openModal = () => {
        setModal(true);
    }

    toast.configure({
        autoClose: 7000,
        draggable: true,
    });


    const wave = async () => {
        // e.preventDefault();

        setLoadingWave(true);
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

                let count = await wavePortalContract.getTotalWaves();
                console.log("Retrieved total wave count...", count.toNumber());

                const waveTxn = await wavePortalContract.wave(message, { gasLimit: 300000 });
                console.log("Mining...", waveTxn.hash);

                await waveTxn.wait();
                console.log("Mined -- ", waveTxn.hash);

                count = await wavePortalContract.getTotalWaves();
                console.log("Retrieved total wave count...", count.toNumber());

                setLoadingWave(false);
                setModal(false)

                toast.dismiss();
                toast.success("Waved Successfully", {
                    position: "top-right",
                    pauseOnHover: true,
                    draggable: false,
                });
            } else {
                console.log("Ethereum object doesn't exist!");

                setLoadingWave(false);
                setModal(false)

                toast.dismiss();
                toast.error("Ethereum object doesn't exist!", {
                    position: "top-right",
                    pauseOnHover: true,
                    draggable: false,
                });
            }
        } catch (error) {
            console.log(error);
            
            setLoadingWave(false);
            setModal(false)

            toast.dismiss();
            toast.error(error.message, {
                position: "top-right",
                pauseOnHover: true,
                draggable: false,
            });
        }
    }

    const fetchWaveCount = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

                let count = await wavePortalContract.getTotalWaves();
                console.log("Retrieved total wave count...", count.toNumber());

                setWaveCount(count.toNumber());
            } else {
                console.log("Ethereum object doesn't exist!");
                toast.dismiss();
                toast.error("Ethereum object doesn't exist!", {
                    position: "top-right",
                    pauseOnHover: true,
                    draggable: false,
                });
            }
        } catch (error) {
            console.log(error)
            toast.dismiss();
            toast.error(error.message, {
                position: "top-right",
                pauseOnHover: true,
                draggable: false,
            });
        }
    }

    useEffect(() => {
        fetchWaveCount();
    }, [])

    return (
        <section className="hero">
            <div className={'hero-inner-container'}>
                <div>
                    <p style={{ fontSize: '25px', lineHeight: '2px'}}>
                    <span style={{ fontSize: '35px' }}>Hello, {' '}</span>
                    {currentAccount.substring(0, 6).concat('...')}{currentAccount.slice(0, 4)}
                    </p> <br />
                    <p>Wave at me and stand a chance to win free ether sent to your wallet. Connect your Ethereum wallet and wave at me.</p>
                    <p>I've been waved at {waveCount} times, join them!.</p>
                </div>

                <button
                    className={'open-modal d-none d-lg-block cursor-pointer'}
                    onClick={openModal}
                >Wave <span>👋</span></button>

                {modal && (
                    <div className={'modal-form form-lg d-none d-lg-block'}>
                        <div className={'d-flex items-center justify-between'}>
                            <h3 style={{ color: '#41415a'}}>
                                Drop a message if you'd like!
                            </h3>
                            <span className={'cursor-pointer'} onClick={e => setModal(!modal)}> ✖️</span>
                        </div>
                        <form>
                            <input
                                placeholder="Type a message"
                                autoFocus="autofocus"
                                onChange={e => setMessage(e.target.value)}
                            />
                            <button type="submit" disabled={loadingWave} className="cursor-pointer" onClick={wave}>
                                {loadingWave ? (
                                    <div className="spinner"></div>) : '👋'}
                            </button>
                        </form>
                    </div>
                )}
            </div>

            <form className={'form-sm d-lg-none'}>
                <input
                    placeholder="Type a message"
                    autoFocus="autofocus"
                    onChange={e => setMessage(e.target.value)}
                />
                <button type="submit" disabled={loadingWave} className="cursor-pointer" onClick={wave}>
                    {loadingWave ? (
                        <div className="spinner"></div>) : '👋'}
                </button>
            </form>
        </section>
    )
}

export default Hero
