import Payment from "./Payment"

const Payments = ({ payments, onDelete, onToggle }) => {
  return (
    <>
      {payments.map((payment) => (
      <Payment key={payment.id} 
      payment={payment}
      onDelete={onDelete} 
      onToggle={onToggle}
      />
      ))}
    </>
  )
}
export default Payments
