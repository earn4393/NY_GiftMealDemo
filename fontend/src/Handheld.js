import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'


// update employees' gift or food state in database
const Handheld = (props) => {
  const state = props.state
  const baseURL = 'http://10.201.128.66:3007'
  const [num, setNum] = useState(null)

  // sent id to backend and update food and gift state from backend
  function handleInput(e) {
    const id = e.target.value
    setNum(id)
    if (id !== null && id !== "" && id.toString().length >= 6) {
      if (!isNaN(id) && id.toString().length == 6) {
        const data = { id: id }

        // sent id to backend  
        axios.post(baseURL + "/check-employee/", data).then((response) => {
          //  get food and gift state from backend
          const food = response.data.food
          const gift = response.data.gift
          const g_date = response.data.g_date
          const f_date = response.data.f_date

          if (state == 'gift') {
            if (gift == 'N') {
              //   update gift state 
              axios.put(baseURL + "/add-status-gift", data)

              Swal.fire({
                icon: 'success',
                title: `${id}\nยืนยันการรับของขวัญ`,
                showConfirmButton: false,
                timer: 1000

              }).then(() => {
                setNum("")
              })

            } else if (gift == 'Y') {
              Swal.fire({
                icon: 'warning',
                title: `${id}\nคุณได้รับของขวัญเรียบร้อยแล้ว\n${g_date}`,
                showConfirmButton: false,
                timer: 2000

              }).then(() => {
                setNum("")
              })

            } else if (gift == null) {
              Swal.fire({
                icon: 'error',
                title: `${id}\nคุณไม่ได้รับสิทธิของขวัญ`,
                showConfirmButton: false,
                timer: 1000

              }).then(() => {
                setNum("")
              })

            }
            else {
              Swal.fire({
                icon: 'error',
                title: 'รหัสพนักงานคุณไม่ถูกต้อง',
                showConfirmButton: false,
                timer: 1000

              }).then(() => {
                setNum("")
              })

            }

          } else {
            if (food == 'N') {
              //   update food state 
              axios.put(baseURL + "/add-status-food", data)
              Swal.fire({
                icon: 'success',
                title: `${id}\nยืนยันการรับอาหาร`,
                showConfirmButton: false,
                timer: 1000

              }).then(() => {
                setNum("")
              })

            } else if (food == 'Y') {
              Swal.fire({
                icon: 'warning',
                title: `${id}\nคุณได้รับอาหารเรียบร้อยแล้ว\n${f_date}`,
                showConfirmButton: false,
                timer: 2000

              }).then(() => {
                setNum("")
              })

            } else if (food == null) {
              Swal.fire({
                icon: 'error',
                title: `${id}\nคุณไม่ได้รับสิทธิอาหาร`,
                showConfirmButton: false,
                timer: 1000

              }).then(() => {
                setNum("")
              })

            } else {
              Swal.fire({
                icon: 'error',
                title: 'รหัสพนักงานคุณไม่ถูกต้อง',
                showConfirmButton: false,
                timer: 1000

              }).then(() => {
                setNum("")
              })

            }
          }

        });
      }
    }
  }

  return (
    <div className='boxInput'>
      <input className='Input' type="text" inputMode="numeric" value={num} autoComplete="true" name="EMPLOYEE_NO" onChange={(e) => { handleInput(e) }} placeholder='รหัสพนักงาน' autoFocus="autofocus" />
    </div>
  )

}

export default Handheld;