import React from 'react'
import BackArrow from '../../assets/images/back-arrow.svg'
import Github from '../../assets/images/github.svg'
import LinkedIn from '../../assets/images/linkedin.svg'
import Twitter from '../../assets/images/twitter.svg'

import './aboutModal.css'

const AboutModal = ({ aboutModal, setAboutModal }) => {
    return (
        <>
            {aboutModal && (
            <div className={'about-modal '} style={{ color: 'black'}}>
              <div className={'d-flex items-center justify-between'}>

                <span
                    className={'cursor-pointer'}
                    onClick={e => setAboutModal(!aboutModal)}>
                  <img
                    src={BackArrow}
                    alt={'exit'}
                    width={'30px'}
                  />
                </span>

              </div>

              <div className={'about-container'}>
                {/*<div style={{flex: 5}}>
                  <img
                      src={Avatar}
                      alt={'avatar'}
                      width={'300rem'}
                  />

                  <div></div>
                  vb
                </div> */}
                <div className={'about-content text-center'}>
                  Hi! my name is Abiodun Awoyemi, I build pixel perfect and responsive user interfaces
                  using JavaScript technologies like ReactJS and VueJS. I recently started coding smart contracts
                  using solidity and this is my first projects on ethereum blockchain development.
                  <br />
                  <br />
                  <span>Wave</span> is my own version of WavePortal, a task from {" "}
                  <a href={'https://buildspace.so/'} target={'_blank'} rel={'noreferrer noopener'}>@buildspace</a> {" "}
                  for
                  learning blockchain using solidity and ethereum.
                </div>

              </div>

              <div className={'about-social'}>
                <a href={'https://www.linkedin.com/in/abiodun-awoyemi-1ab8b3165/'}
                   target={'_blank'}
                   rel={'noreferrer noopener'}
                   className={'linkedIn'}
                >
                  <img
                      src={LinkedIn}
                      alt={'linkedin'}
                      width={'20px'}
                  />
                </a>
                <a href={'https://github.com/aagbotemi'}
                   target={'_blank'}
                   rel={'noreferrer noopener'}
                >

                  <img
                      src={Github}
                      alt={'github'}
                      width={'20px'}
                  />
                </a>
                <a href={'https://twitter.com/_abiodunAwoyemi'}
                   target={'_blank'}
                   rel={'noreferrer noopener'}
                >

                  <img
                      src={Twitter}
                      alt={'twitter'}
                      width={'20px'}
                  />
                </a>
              </div>
            </div>
        )}
        </>
    )
}

export default AboutModal
