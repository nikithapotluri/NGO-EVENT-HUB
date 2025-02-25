import React from 'react'
import { FaRegAddressCard } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { IoMdContact } from "react-icons/io";
import { MdOutlineAttachEmail } from "react-icons/md";
import './Footer.css'
function Footer() {
  return (
    <div className='d-flex  flex-wrap justify-content-around  text-center text-white p-5 fs-4 random' style={{}}>
      <div>
        <p className='text-center text-info display-4'><FaRegAddressCard/></p>
          <p>NGO Event Hub</p>
          <p>
          <CiLocationOn className='me-2'/>Vijaywada</p>
      </div>
      <div>
        <p className='text-center text-info display-4'><MdOutlineAttachEmail  /></p>
          <p>ngoeventhub@gmail.com</p>
          <p>
          <IoMdContact className='me-2'/>9398842555</p>
      </div>
    </div>
  )
}
export default Footer
