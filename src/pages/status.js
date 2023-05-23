import {useState} from 'react'
import Header from './components/Header'
import RetrievePaymentStatus from './components/RetrievePaymentStatus'
import './policies.css';
import {getAllPolicies, retrieveDateWithAddress} from "../utils/web3Helpers";
import {paymentStorage} from "../utils/constants";
import Payment from "./components/Payment";

const RetrieveStatusNav = () => {
	const[showRetrievePaymentStatus, setShowRetrievePaymentStatus] = useState(false)
	const [payment, setPayment] = useState({})

	function checkPayment({id}) {
		getAllPolicies()
			.then(result => {

				const found = result.find(a => a.policyID.value === id)

				return retrieveDateWithAddress(found.a.value)
					.then(date => {
						const checklist = [...Array(3).keys()]
						return Promise.all(checklist.map(c => {
							return paymentStorage
								.checkForSpecificAddress(c, date.toString(), found.a.value)
								.then(paymentResult => {
									if (paymentResult === found.a.value) {
										console.log("The payment status for Smart Contract policy id", found.policyID.value, "is ", c);
										return {
											id: found.policyID.value,
											price: found.price.value,
											paymentStatus: c // payment status 0 = unpaid, 1 = paid, 2 = overdue
										}
									}
								})
							}))
						})
					})
					.then(allResults => allResults.find(x => !!x))
			.then(found => {
				if (found)
				{
					setPayment({id: found.id, price: found.price, paymentStatus: found.paymentStatus})
				}
			})
			.catch(e => {
				console.error(e)
			})
	}
  
	return (
	  <div className='container'>
		{/* <Button1/> */}
		<Header title ="RETRIEVE PAYMENT STATUS"
		onAdd={() => setShowRetrievePaymentStatus
		(!showRetrievePaymentStatus)} showAdd={showRetrievePaymentStatus}/>
		<img className='family' src="./insurance2.jpg" alt="family" style={{width: "680px", height: "400px", marginLeft:"5px"}}/>
		<br></br><br></br>
		{showRetrievePaymentStatus && <RetrievePaymentStatus onAdd={checkPayment}/>}
		{payment && Object.keys(payment).length > 0 ? ( <Payment payment={payment}/>
		): (
		'No payment found'
	  )}
	  </div>
	)
  
  }
  
  
  export default RetrieveStatusNav
