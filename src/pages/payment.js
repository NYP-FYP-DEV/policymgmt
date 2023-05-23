import {useEffect, useState} from 'react'
import Header from './components/Header'
import Payments from './components/Payments'
import AddPayment from './components/AddPayment'
import './policies.css';
import {getAllPolicies, retrieveDateWithAddress} from "../utils/web3Helpers";
import {paymentStorage} from "../utils/constants";
import PaymentIcon from 'react-payment-icons';

const PaymentNav = () => {
	const[showAddPayment, setShowAddPayment] = useState (false)
	const [payments, setPayments] = useState([])
	
	// Add payment
	const addPayment = (payment) => {
	  // const id = Math.floor(Math.random() * 
	  // 10000) + 1
	  //
	  // const newPayment = { id, ...payment }
	  // setPayments([...payments, newPayment])
		refreshPayments()
		setShowAddPayment(false)
	}
	
	useEffect(() => {
		refreshPayments()
	}, [])
	
	const refreshPayments = () => {  // refreshPayments function is a scan from the contract, get all transactions occurred and sieve out related policies
		getAllPolicies()
			.then(result => {

				return Promise.all(result.map(found => {
					return retrieveDateWithAddress(found.a.value)
						.then(date => {
							const checklist = [...Array(3).keys()]
							return Promise.all(checklist.map(c => {
								return paymentStorage
									.checkForSpecificAddress(c, date.toString(), found.a.value)
									.then(paymentResult => {
										if (paymentResult === found.a.value) {
											return {
												id: found.policyID.value,
												price: found.price.value,
												paymentStatus: c // payment status 0 = unpaid, 1 = paid, 2 = overdue
											}
										}
									})
								}))
							})
						.then(allResults => allResults.find(x => !!x))
						})
				)
			})
			.then(final => {
				setPayments(final.filter(x => !!x).map(found => ({id: found.id, price: found.price, paymentStatus: found.paymentStatus})))
			})
			.catch(e => {
				console.error(e)
			})
	}
  
	// Delete payment
	const deletePayment = (id) => {
	  setPayments(payments.filter((payment) => payment.id !== id))
	}

	// Toggle Reminder
	const toggleReminder = (id) => {
		setPayments(payments.map((payment) => payment.id === id
		? {...payment, reminder: !payment.reminder}: payment
		)
		)
	  }

	  return (
		<div className='container'>
		  <Header title='MAKE PAYMENT' onAdd={() => setShowAddPayment
		(!showAddPayment)} showAdd={showAddPayment}/>
		<img className='family' src="./insurance4.png" alt="family" style={{maxWidth: "680px", marginLeft:"5px"}}/>
		<br></br>
		 <PaymentIcon
			id="visa"
			style={{ margin: 5, width: 50 }}
			className="payment-icon"
		/>
		<PaymentIcon
			id="mastercard"
			style={{ margin: 5, width: 50 }}
			className="payment-icon"
		/>
		<PaymentIcon
			id="amex"
			style={{ margin: 5, width: 50 }}
			className="payment-icon"
		/>
		<PaymentIcon
			id="paypal"
			style={{ margin: 5, width: 50 }}
			className="payment-icon"
		/><br></br>
		<b style={{marginLeft:"10px", color:"blue"}}>UNPAID = 0 | PAID = 1</b>
		{showAddPayment && <AddPayment onAdd={addPayment}/>}
		{payments.length > 0 ? ( <Payments payments={payments} 
		onDelete=
		{deletePayment} onToggle={toggleReminder}/>
		): (
		'No payments To Show'
	  )}
		</div>
	  )
		}

export default PaymentNav;
