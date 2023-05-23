import React from 'react'

import { FaTimes } from 'react-icons/fa'

const Payment = ({ payment, onDelete, onToggle }) => {
  return (
    <div className={`payment ${payment.reminder ? 
    'reminder': ''}`} 
    onDoubleClick={() => onToggle(payment.id)}>
      <h3>
        {payment.id} <FaTimes style={{ 
            color: 'red', cursor: 'pointer'}} 
            onClick={() => onDelete(payment.id)}/>
        </h3>
      <p><b style={{marginRight:'40px'}}>Price of Policy: </b>{payment.price}</p>
        <p><b style={{marginRight:'25px'}}>Payment Status: </b>{payment.paymentStatus}</p>
    </div>
  )
}

export default Payment
