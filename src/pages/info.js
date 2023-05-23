import {useState} from 'react'
import Header from './components/Header'
import RetrieveClientPolicy from './components/RetrieveClientPolicy'
import './policies.css';
import {getAllPolicies} from "../utils/web3Helpers";
import Policy from "./components/Policy";

const RetrievePoliciesNav = () => {
	const [showRetrieveClientPolicy, setShowRetrieveClientPolicy] = useState(false)
	const [policy, setPolicy] = useState({})

	function getPolicy({id}) {
		getAllPolicies()
			.then(result => {
				const found = result
					.find(r => r.policyID.value === id)

				// This method transforms the data stored in the policy contract into the frontend compatible object
				if (found) {
					setPolicy({
						id: found.policyID.value,
						email: found.newMessage.value,
						duration: found.duration.value,
						date: found.date_of_policy.value,
						phoneNo: found.phone.value,
						name: found.name.value,
						price: found.price.value
					})
				}
			})
			.catch(e => {
				console.error(e)
			});
	}
  
	return (
	  <div className='container'>
		{/* <Button1/> */}
		<Header title ="RETRIEVE POLICY INFORMATION"
		onAdd={() => setShowRetrieveClientPolicy
		(!showRetrieveClientPolicy)} showAdd={showRetrieveClientPolicy}/>
		<img className='family' src="./insurance1.jpg" alt="family" style={{width: "680px", height: "400px", marginLeft:"5px"}}/>
		<br></br><br></br>
		
		{showRetrieveClientPolicy && <RetrieveClientPolicy onAdd={getPolicy}/>}
		{policy && Object.keys(policy).length > 0 ? ( <Policy policy={policy}/>
		): (
		'No policies To Show'
	  )}
	  </div>
	)
}
  
  
export default RetrievePoliciesNav
