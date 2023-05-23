import { useState } from 'react'
import {policy, paymentStorage, idMapper, signer} from '../../utils/constants';
import {retrieveDateWithAddress, getLastCreatedPolicy} from "../../utils/web3Helpers";

const moment = require('moment');
const AddClientPolicy = ({ onAdd , setLoading}) =>{
  const [email, setEmail] = useState('')
  const [duration, setDuration] = useState('')
  const [date, setDate] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [name, setFullName] = useState('')
  const [price, setPrice] = useState('')
  const [reminder, setReminder] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (!email) {
            alert('Please add a policy')
            return
        }
        console.log(email, duration, date, phoneNo, name, price, reminder)

        const newPolicy = await policy.update(email, String(Date.now()), duration, date, phoneNo, name, price, moment().format('YYYY-MM-DD HH:mm:ss'))
        const receipt = await newPolicy.wait()
        const lastTransaction = await getLastCreatedPolicy(receipt.hash)
        // After the creation, we will be able to retrieve some information such as the transaction event address and policy id.
        const contractAddress = lastTransaction.a.value;
        const policyId = lastTransaction.policyID.value;

        // After the creation, set the mapping in idMapper contract so that we will be able to retrieve the transaction event address with the policyId later
        const mappingTransaction = await idMapper.setId(policyId, contractAddress);
        await mappingTransaction.wait()
        // This is just to confirm that the transaction event address has been stored correctly. 
        const address = await idMapper.getIdview(policyId);
        console.log(address, "has successfully been paired with", policyId, "for", contractAddress);

        // This is to retrieve a formatted date (DDMM), this is the convention defined in the backend to store in the payment contract.
        // No signs show that this information needs to be used with payment, not sure why is this stored together.
        const formattedDate = await retrieveDateWithAddress(contractAddress)
        console.log('formattedDate == ',formattedDate)
        // Payment is always created as 0 (unpaid) initially.
        const storageReceipt = await paymentStorage.storeAddressByPaymentStatus(0, formattedDate.toString(), contractAddress);
        await storageReceipt.wait()
        await paymentStorage.checkForSpecificAddress(0, formattedDate.toString(), contractAddress);
        console.log(contractAddress, "has successfully been stored in paymentStorage on payment status 0 unpaid");

        onAdd({email, duration, date, phoneNo, name, price, reminder})

        setEmail('')
        setDuration('')
        setDate('')
        setPhoneNo('')
        setFullName('')
        setPrice('')
        setReminder(false)
        setLoading(false)
    }
    
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Email Address</label>
        <input type='text' placeholder='Enter Email Address'
        value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>
      <div className="form-control">
        <label>Duration</label>
        <input type='text' placeholder='Enter Duration of Policy'
        value={duration} onChange={(e) => setDuration(e.target.value)}/>
      </div>
      <div className="form-control">
        <label>Date</label>
        <input type='date' placeholder='Enter Date of Policy'
        value={date} onChange={(e) => setDate(e.target.value)}/>
      </div>
      <div className="form-control">
        <label>Phone Number</label>
        <input type='text' placeholder='Enter Phone No.'
        value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)}/>  
      </div>
      <div className="form-control">
        <label>Full Name</label>
        <input type='text' placeholder='Enter Full Name'
        value={name} onChange={(e) => setFullName(e.target.value)}/>
      </div>
      <div className="form-control">
        <label>Price of Policy</label>
        <input type='text' placeholder='Enter Price of Policy'
        value={price} onChange={(e) => setPrice(e.target.value)}/>
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input 
        type='checkbox' 
        checked={reminder}
        value={reminder} 
        onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

      <input type='submit' value='Save Policy' className="btn btn-block"/>
    </form>
  )
}

export default AddClientPolicy
