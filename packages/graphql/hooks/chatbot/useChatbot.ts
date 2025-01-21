import { useFormContext } from "react-hook-form"
import querySubstitution from "../../lib/querySubstitution";
import proxyCalls from "../../lib/proxyCalls";

const GET_PAYMENT_DETAIL = `
    query GetPaymentDetail { getPaymentDetail( consecutive_number: {subNumber}, is_recurrence: {isRecurrence}, email: {email} ) { is_paid message created_at }}
`

const useChatbot = () => {

  
  const methods = useFormContext();
  const { getValues } = methods;
  
  const onSubmit = async () => {
    
    const qValues = getValues();
    const variables = {
      subNumber: qValues.subscriptionNumber,
      isRecurrence: Boolean(qValues.isRecurrence),
      email: qValues.email
    }

    const getPaymentStatusQ = querySubstitution(GET_PAYMENT_DETAIL, variables)
    
    const { data, errors } = await proxyCalls (getPaymentStatusQ)

    if (data.getPaymentDetail !== null) {
      return {
        paid: data.getPaymentDetail.is_paid,
        message: data.getPaymentDetail.message
      }
    } else {
      return {
        paid: "NA",
        message: "No pudimos obtener información con los datos solicitados"
      }
    }
  }
  
  return {
    onSubmit
  }
}

export default useChatbot