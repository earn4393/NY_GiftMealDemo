import React from 'react'
import Handheld from '../Handheld';
import './StylePage.css'

// Gift Pahe
const GiftPage = () => {
    return (
        <div className="snowflakes-container" >
            <div className="green-background">
                <div className='title'>Gift</div>
                <Handheld state="gift" />
            </div>
        </div>
    )

}

export default GiftPage