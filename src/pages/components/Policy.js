import { FaTimes } from 'react-icons/fa'

const Policy = ({ policy, onDelete, onToggle }) => {
  return (
    <div className={`policy ${policy.reminder ? 
    'reminder': ''}`} 
    onDoubleClick={() => onToggle(policy.id)}>
      <h3>
        {policy.id} <FaTimes style={{ 
            color: 'red', cursor: 'pointer'}} 
            onClick={() => onDelete(policy.id)}/>
        </h3>
      <p><b style={{marginRight:'40px'}}>Email: </b>{policy.email}</p>
      <p><b style={{marginRight:'16px'}}>Duration: </b> {policy.duration}</p>
      <p><b style={{marginRight:'46px'}}>Date: </b>{policy.date}</p>
      <p><b style={{marginRight:'10px'}}>Phone No: </b>{policy.phoneNo}</p>
      <p><b style={{marginRight:'38px'}}>Name: </b>{policy.name}</p>
      <p><b style={{marginRight:'46px'}}>Price: </b>{policy.price}</p>
    </div>
  )
}

export default Policy

