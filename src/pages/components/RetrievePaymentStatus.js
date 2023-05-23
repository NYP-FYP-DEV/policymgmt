import { useState } from 'react'
import {policy, paymentStorage, idMapper, signer} from '../../utils/constants';
import {retrieveDateWithAddress} from "../../utils/web3Helpers";

const moment = require('moment');
const RetrievePaymentStatus = ({ onAdd }) =>{
  const [id, setID] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()

        if (!id) {
            alert('Please enter a valid Policy ID')
            return
        }
        console.log(id)

        onAdd({id})

        setID('')
    }
    
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Policy ID</label>
        <input type='text' placeholder='Enter Policy ID'
        value={id} onChange={(e) => setID(e.target.value)}/>
      </div>
      <input type='submit' value='Check Payment Status' className="btn btn-block"/>
    </form>
  )
}

export default RetrievePaymentStatus
