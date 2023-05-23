import Policy from "./Policy"

const Policies = ({ policies, onDelete, onToggle }) => {
  return (
    <>
      {policies.map((policy) => (
      <Policy key={policy.id} 
      policy={policy}
      onDelete={onDelete} 
      onToggle={onToggle}
      />
      ))}
    </>
  )
}
export default Policies
