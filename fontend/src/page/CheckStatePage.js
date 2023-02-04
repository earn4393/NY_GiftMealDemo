import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import './StylePage.css'

// Check Food & Gift Status employees 

const CheckStatePage = () => {
  const baseURL = 'http://10.201.128.66:3007'
  const [num, setNum] = useState(null)

  // give id to check food and gift state 
  function handleInput(e) {
    const id = e.target.value
    setNum(id)
    if (id !== null && id !== "" && id.toString().length == 6 && !isNaN(id)) {

      const data = { id: id }
      axios.post(baseURL + "/check-employee/", data).then((response) => {
        const food = response.data.food
        const gift = response.data.gift
        let state_food = ""
        let state_gift = ""

        if (gift == 'N') {
          state_gift = "คุณได้รับสิทธิของขวัญ"
        } else if (gift == 'Y') {
          state_gift = "คุณได้รับของขวัญเรียบร้อย"
        } else if (gift == null) {
          state_gift = "คุณไม่ได้รับสิทธิของขวัญ"
        }

        if (food == 'N') {
          state_food = "คุณได้รับสิทธิอาหาร"
        } else if (food == 'Y') {
          state_food = "คุณได้รับอาหารเรียบร้อย"
        } else if (food == null) {
          state_food = "คุณไม่ได้รับสิทธิอาหาร"
        }

        console.log(`gift : ${state_gift}  food: ${state_food}`)



        if (food !== "" && gift !== "") {
          Swal.fire({
            icon: 'success',
            title: state_gift + " \n" + state_food,
            showConfirmButton: true,
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: "รหัสพนักงานคุณไม่ถูกต้อง",
            showConfirmButton: true,

          })
        }
      })
    }
  }

  return (
    <div className='WrapperPage'>
      <div className='LayoutPage'>
        <div className='Title'>Check Status</div>
        <div className='Divider' />
        <div className='boxInput'>
          <input type="text" className='Input' inputMode="numeric" value={num} autoComplete="true" name="EMPLOYEE_NO" onChange={(e) => { handleInput(e) }} placeholder='รหัสพนักงาน' autoFocus="autofocus" />
        </div>
        <div className='Divider' />
      </div>
    </div>
  )

}

export default CheckStatePage