
const SubEditor = ({ params }: { params: { clientId: string } }) => {
  
  const pcid = params.clientId
  
  return (
    <div>{ pcid }</div>
  )
}

export default SubEditor;