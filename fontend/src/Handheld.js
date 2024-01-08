import React, { useState } from 'react'
import axios from './api/axios'
import Swal from 'sweetalert2'
import './page/StylePage.css'


// update employees' gift or food state in database
const Handheld = (props) => {
  const state = props.state
  const [num, setNum] = useState('')

  // sent id to backend and update food and gift state from backend
  const addState = async (id) => {
    // sent id to backend  
    axios.post("/check-employee", { id: id }).then((res) => {
      //  get food and gift state from backend
      var data = res.data

      if (data[state] === 'N') {
        axios.put("/add-status-" + state, { id: id }).then((res) => {
          if (res.data.code === 200) {
            Swal.fire({
              icon: 'success',
              title: `${id} ยืนยันรับของขวัญ`,
              showConfirmButton: false,
              timer: 1000,
              customClass: {
                title: 'my-swal-text-size'
              }
            }).then(() => {
              setNum("")
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: `${id} ทำการบันทึกใหม่อีกครั้ง`,
              showConfirmButton: false,
              timer: 1000,
              customClass: {
                title: 'my-swal-text-size'
              }

            }).then(() => {
              setNum("")
            })
          }
        })
      } else if (data[state] === 'Y') {
        Swal.fire({
          icon: 'warning',
          title: `${id} คุณได้รับของเรียบร้อยแล้ว ${state === 'gift' ? data.g_date : data.f_date}`,
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            title: 'my-swal-text-size'
          }
        }).then(() => {
          setNum("")
        })
      } else if (data[state] === null) {
        Swal.fire({
          icon: 'error',
          title: `${id} ไม่ได้รับสิทธิของขวัญ`,
          showConfirmButton: false,
          timer: 1000,
          customClass: {
            title: 'my-swal-text-size'
          }
        }).then(() => {
          setNum("")
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'รหัสพนักงานคุณไม่ถูกต้อง',
          showConfirmButton: false,
          timer: 1000,
          customClass: {
            title: 'my-swal-text-size'
          }
        }).then(() => {
          setNum("")
        })
      }
    });
  }


  const handleInput = (e) => {
    const id = e.target.value
    setNum(id)
    if (id !== "" && id.length === 6) {
      if (!isNaN(id)) {
        addState(id)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'รหัสพนักงานคุณไม่ถูกต้อง',
          showConfirmButton: false,
          timer: 1000,
          customClass: {
            title: 'my-swal-text-size'
          }
        }).then(
          setNum('')
        )
      }
    }
  }

  return (
    <input
      className='user-input'
      type="text"
      inputMode="numeric"
      value={num}
      autoComplete="true"
      name="EMPLOYEE_NO"
      onChange={(e) => { handleInput(e) }}
      placeholder='รหัสพนักงาน'
      autoFocus="autofocus" />
  )

}

export default Handheld;