
const ExtendedDeliveryDetails = ({ params }: { params: { subscription: string } }) => {
  
  const pSub = params.subscription
  
  return (
    <div>{ pSub }</div>
  )
}

export default ExtendedDeliveryDetails;