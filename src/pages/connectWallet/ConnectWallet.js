import React from 'react'
import './connectWallet.css'
import Loading from '../../components/loader/Loading'

const ConnectWallet = ({ connectWallet, loadingWallet }) => {
    return (
        <section className={"connect-wallet d-flex"}>
            <div className={"connect-wallet-left d-flex justify-center items-center vh-100"}>
              <div className={"connect-wallet-left-content"}>
                  Wave <img src="https://raw.githubusercontent.com/iampavangandhi/iampavangandhi/master/gifs/Hi.gif" width="70px" />
                {/*👋*/}
                <div className={'d-lg-none'}>
                  <button disabled={loadingWallet} className="cursor-pointer" onClick={connectWallet}>

                    {loadingWallet ?  <Loading /> : 'Connect Wallet 💳'}
                  </button>
                </div>
              </div>
            </div>
            <div className={"connect-wallet-right d-none d-lg-block justify-center items-center"}>
              <button disabled={loadingWallet} className="cursor-pointer" onClick={connectWallet}>

                {loadingWallet ? <Loading /> : 'Connect Wallet 💳'}
              </button>
            </div>
          </section>
    )
}

export default ConnectWallet
