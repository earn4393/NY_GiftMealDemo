import React, { useState } from 'react'
import axios from '../api/axios'
import Swal from 'sweetalert2'
import './StylePage.css'

// Check Food & Gift Status employees 

const CheckStatePage = () => {
  const [num, setNum] = useState('')

  // give id to check food and gift state 
  const checkID = async (id) => {
    axios.post("/check-employee", { id: id }).then((res) => {
      const gift = res.data.gift
      let g_date = res.data.g_date
      let text

      if (gift === null) {
        Swal.fire({
          icon: 'warning',
          title: `${id} คุณไม่มีสิทธิ์ของขวัญ`,
          showConfirmButton: true,
          customClass: {
            title: 'my-swal-text-size'
          }
        }).then(
          setNum('')
        )
      } else if (gift === '') {
        Swal.fire({
          icon: 'error',
          title: 'รหัสพนักงานคุณไม่ถูกต้อง',
          showConfirmButton: true,
          customClass: {
            title: 'my-swal-text-size'
          }
        }).then(
          setNum('')
        )
      } else {
        if (gift === 'N') {
          text = `${id} ยังไม่ได้รับของขวัญ`
          g_date = ''
        } else {
          text = `${id} ได้รับของขวัญแล้ว`
        }
        Swal.fire({
          icon: 'success',
          title: text + "<br/>" + g_date,
          showConfirmButton: true,
          customClass: {
            title: 'my-swal-text-size' // Your desired font size
          }
        }).then(
          setNum('')
        )
      }
    })

  }

  const handleInput = (e) => {
    const id = e.target.value
    setNum(id)
    if (id !== "" && id.length === 6) {
      if (!isNaN(id)) {
        checkID(id)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'รหัสพนักงานคุณไม่ถูกต้อง',
          showConfirmButton: true,
          customClass: {
            title: 'my-swal-text-size' // Your desired font size
          }
        }).then(
          setNum('')
        )
      }
    }
  }

  return (
    <div className="snowflakes-container" >
      <div className="green-background">
        <div className='title'>Check Status</div>
        <input
          type="text"
          className='user-input'
          inputMode="numeric"
          value={num}
          autoComplete="true"
          name="EMPLOYEE_NO"
          onChange={(e) => { handleInput(e) }}
          placeholder='รหัสพนักงาน'
          autoFocus="autofocus" />
      </div>
    </div>
  )

}

export default CheckStatePage