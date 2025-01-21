
const CancellationDetails = ({ params }: { params: { subscription: string } }) => {
  
  const pSub = params.subscription
  
  return (
    <div>{ pSub }</div>
  )
}

export default CancellationDetails;