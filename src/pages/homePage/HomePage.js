import React from 'react'
// import Header from '../../components/header/Header'
import Header from '../../components/header/Header'

const HomePage = ({ currentAccount }) => {
    return (
        <div>
            <Header />
            How Far { currentAccount }
        </div>
    )
}

export default HomePage
