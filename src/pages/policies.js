import { useEffect, useState } from 'react'
import Header from './components/Header'
import Policies from './components/Policies'
import AddClientPolicy from './components/AddClientPolicy'
import './policies.css';
import { getAllPolicies } from "../utils/web3Helpers";
import { InfinitySpin } from 'react-loader-spinner'

const PoliciesNav = () => {
	const [showAddClientPolicy, setShowAddClientPolicy] = useState(false)
	const [policies, setPolicies] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		refreshPolicies();
	}, [])

	function refreshPolicies() {
		getAllPolicies()
			.then(result => {
				// This method transforms the data stored in the policy contract into the frontend compatible object

				const newPolicies = result.map(y => ({
					id: y.policyID.value,
					email: y.newMessage.value,
					duration: y.duration.value,
					date: y.date_of_policy.value,
					phoneNo: y.phone.value,
					name: y.name.value,
					price: y.price.value,
					address: y.a.value
				}));

				setPolicies(newPolicies)
			})
			.catch(e => {
				console.error(e)
			});


	}

	// Add policy
	const addClientPolicy = () => {
		refreshPolicies()
		setShowAddClientPolicy(false)
	}

	// Delete policy
	const deletePolicy = (id) => {
		setPolicies(policies.filter((policy) => policy.id !== id))
	}

	// Toggle Reminder
	const toggleReminder = (id) => {
		setPolicies(policies.map((policy) => policy.id === id
			? { ...policy, reminder: !policy.reminder } : policy
		)
		)
	}

	return (
		<div className='container'>
			{/* <Button1/> */}
			<Header title="CREATE CLIENT POLICY" onAdd={() => setShowAddClientPolicy
				(!showAddClientPolicy)} showAdd={showAddClientPolicy} />
			<img className='family' src="./insurance3.jpg" alt="family" style={{ maxWidth: "680px", marginLeft: "5px" }} />
			<br></br><br></br>
			<h2>CLIENT RECORDS</h2>
			{showAddClientPolicy && <AddClientPolicy onAdd={addClientPolicy} setLoading={setLoading} />}
			{policies.length > 0 ? (<Policies policies={policies}
				onDelete=
				{deletePolicy} onToggle={toggleReminder} />
			) : (
				'No policies To Show'
			)}
		
		</div>
	)

}


export default PoliciesNav
