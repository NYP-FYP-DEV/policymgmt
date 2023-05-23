import {useState} from 'react'
import {idMapper, paymentStorage, signer} from "../../utils/constants";
import {retrieveDateWithAddress} from "../../utils/web3Helpers";

const AddPayment = ({ onAdd }) =>{
  const [id, setID] = useState('')
  const [price, setPrice] = useState('')
  const [reminder, setReminder] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault()

        if (!id) {
            alert('Please add a policy')
            return
        }

        if (!price) {
            alert('Please add a price')
            return
        }

        console.log(id, price, reminder)

        // IdMapper is to get the policy id based on the transaction event address
        const viewID = await idMapper.getIdview(id);

        // This way of formatting is a convention used in the backend, where the date (DDMM) will be stored in the payment storage contract
        // I can't guess the rationale to include the policy date within the payment storage contract
        const formattedDate = await retrieveDateWithAddress(viewID)
        // The design of this part of code is not very good, this is due to the backend contract design does not expose any other suitable methods
        // The way to enquire the status of the payment is to loop through all possible payment status, and then remove their existing entry, and later store another entry on the new status
        // Finally, we will call the check method to ensure that the payment status has been stored
        // payment status 0 = unpaid, 1 = paid, 2 = overdue
        for (let i = 0; i < 3; i++) {
            const result = await paymentStorage.checkForSpecificAddress(i, formattedDate, viewID);
            if (result === viewID) {
                if (i === 0) {
                    const removal = await paymentStorage.removeAddressToChangeAddress(0, formattedDate, viewID, {gasLimit: 500000000, gasPrice: 0});
                    await removal.wait()
                    const newStorage = await paymentStorage.storeAddressByPaymentStatus(1, formattedDate, viewID, {gasLimit: 500000000, gasPrice: 0});
                    await newStorage.wait()
                    const result = await paymentStorage.checkForSpecificAddress(1, formattedDate, viewID);
                    console.log(result, "'s payment status has been updated from Unpaid(0) to Paid(1).");
                }
            }
        }

        onAdd({id, price, reminder})

        setID('')
        setPrice('')
        setReminder(false)
    }
    
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Policy ID</label>
        <input type='text' placeholder='Enter Policy ID you wish to make payment for'
        value={id} onChange={(e) => setID(e.target.value)}/>
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

      <input type='submit' value='Make Payment' className="btn btn-block"/>
    </form>
  )
}

export default AddPayment