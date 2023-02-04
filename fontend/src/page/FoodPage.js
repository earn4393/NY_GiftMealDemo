import React from 'react'
import { Link } from "react-router-dom";
import Handheld from '../Handheld';
import './StylePage.css'

// Food Page 

const FoodPage = () => {
    return (
        <div className='WrapperPage'>
            <div className='LayoutPage'>
                <div className='Title'>Meal</div>
                <div className='Divider' />
                <Handheld state="food" />
                <div className='Divider' />
                <div className='returnHome'>
                </div>
            </div>
        </div>
    )

}

export default FoodPage