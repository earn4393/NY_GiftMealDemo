import React from 'react'
import Handheld from '../Handheld';
import './StylePage.css'

// Food Page 

const FoodPage = () => {
    return (
        <div className="snowflakes-container" >
            <div className="green-background">
                <div className='title'>Meal</div>
                <Handheld state="food" />
            </div>
        </div>
    )

}

export default FoodPage