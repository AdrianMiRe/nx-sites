
const SubscriptionDetails = ({ params }: { params: { subscription: string } }) => {
  
  const psub = params.subscription
  
  return (
    <div>{ psub }</div>
  )
}

export default SubscriptionDetails;