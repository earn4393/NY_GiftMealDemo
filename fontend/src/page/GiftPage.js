import React from 'react'
import { Link } from "react-router-dom";
import Handheld from '../Handheld';
import './StylePage.css'

// Gift Pahe
const GiftPage = () => {
    return (
        <div className='WrapperPage'>
            <div className='LayoutPage'>
                <div className='Title'>Gift</div>
                <div className='Divider' />
                <Handheld state="gift" />
                <div className='Divider' />
                <div className='returnHome'>
                </div>
            </div>
        </div>
    )

}

export default GiftPage