
const QuoteDetails = ({ params }: { params: { quote: string } }) => {
  
  const pQuote = params.quote
  
  return (
    <div>{ pQuote }</div>
  )
}

export default QuoteDetails;