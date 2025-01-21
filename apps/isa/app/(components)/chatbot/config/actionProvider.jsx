// import { 
//   Children,
//   Dispatch,
//   ReactElement,
//   SetStateAction,
//   useCallback,
//   cloneElement
// } from 'react'
// import { useFormContext } from 'react-hook-form';
// import useChatbot from '@repo/graphql/hooks/chatbot/useChatbot';

// interface ApProps {
//   createChatBotMessage: ( text: string, options?: any ) => any,
//   setState: Dispatch<SetStateAction<any>>,
//   children: ReactElement
// }

// const ActionProvider = ({
//   createChatBotMessage,
//   setState,
//   children
// }: ApProps) => {

//   const { onSubmit } = useChatbot();
//   const methods = useFormContext();
//   const { setValue } = methods;
  
//   const handleSelection = () => {
//     const botMessage = createChatBotMessage(
//       '¿Tu suscripción es una recurrencia?',
//       {
//         widget: 'payment'
//       }
//     );

//     setState((prev: { messages: any; }) => ({
//       ...prev,
//       message: [...prev.messages, botMessage]
//     }));
//   }

//   const handleRecurrence = (isRecurrence: string) => {
//     setValue('isRecurrence', isRecurrence === 'si' ? true : false);

//     const botMessage = createChatBotMessage(
//       'Ingresa el número de suscripción o el email del cliente',
//     );

//     setState((prev: { messages: any; }) => ({
//       ...prev,
//       messages: [...prev.messages, botMessage]
//     }));
//   }

//   const handleQuery = async (q: string) => {
//     if (q.includes('@')) {
//       setValue('email', q)
//     } else {
//       setValue('subscriptionNumber', q)
//     }

//     const response = await onSubmit();

//     let botMessage = '';
    
//     switch(response.paid) {
//       case "1":
//         botMessage = createChatBotMessage(
//           'La suscripción está pagada.'
//         )
//         break;
//       case "2":
//         botMessage = createChatBotMessage(
//           `La suscripción no esta pagada.\n\n${response.message}`
//         )
//         break;
//       case "NA":
//         botMessage = createChatBotMessage(
//           `No pudimos encontrar una susripción con los datos ingresados`
//         )
//         break;
//     }
//     createChatBotMessage(
//       `La suscripción ${response.paid !== "1" ? 'no ': ''}está pagada.\n\n` + `${response.paid !== "1" ? 'El sistema de pagos arroja el siguiente error:\n' + response.message : '' }`
//     )
    
//     setState((prev: { messages: any; }) => ({
//       ...prev,
//       messages: [...prev.messages, botMessage]
//     }));

//     loop();
//   }

//   const loop = () => {
//     const botMessage = createChatBotMessage(
//       '¿Puedo ayudarte con otra consulta?',
//       {
//         delay: 1500,
//         widget: 'greeting'
//       }
//     )

//     setState((prev: { messages: any; }) => ({
//       ...prev,
//       messages: [...prev.messages, botMessage]
//     }))
//   }

//   return (
//     <div>
//       {Children.map(children, (child) => {
//         return cloneElement(child, {
//           actions: {
//             handleSelection,
//             handleRecurrence,
//             handleQuery,
//           },
//         });
//       })}
//     </div>
//   )
// }

// export default ActionProvider

import React from 'react';
import { useFormContext } from 'react-hook-form';
// import useChatbot from './hooks/useChatbot';
import useChatbot from '@repo/graphql/hooks/chatbot/useChatbot';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

  const { onSubmit } = useChatbot();
  
  const methods =  useFormContext();
  const { setValue } = methods;

  const handleSelection = () => {
    const botMessage = createChatBotMessage(
      '¿Tu suscripción es una recurrencia?',
      {
        widget: 'payment'
      }
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }

  const handleRecurrence = (isRecurrence) => {

    setValue('isRecurrence', isRecurrence === 'si' ? true : false);

    const botMessage = createChatBotMessage(
      'Ingresa el número de suscripción o el email del cliente',
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage]
    }));
  }

  const handleQuery = async (q) => {
    if (q.includes('@')) {
      setValue('email', q)
    } else {
      setValue('subscriptionNumber', q)
    }

    const response = await onSubmit();

    let botMessage = '';
    
    switch(response.paid) {
      case "1":
        botMessage = createChatBotMessage(
          'La suscripción está pagada.'
        )
        break;
      case "2":
        botMessage = createChatBotMessage(
          `La suscripción no esta pagada.\n\n${response.message}`
        )
        break;
      case "NA":
        botMessage = createChatBotMessage(
          `No pudimos encontrar una susripción con los datos ingresados`
        )
        break;
    }
    createChatBotMessage(
      `La suscripción ${response.paid !== "1" ? 'no ': ''}está pagada.\n\n` + `${response.paid !== "1" ? 'El sistema de pagos arroja el siguiente error:\n' + response.message : '' }`
    )
    
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage]
    }));

    loop();
  }

  const loop = () => {
    const botMessage = createChatBotMessage(
      '¿Puedo ayudarte con otra consulta?',
      {
        delay: 1500,
        widget: 'greeting'
      }
    )

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage]
    }))
  }

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleSelection,
            handleRecurrence,
            handleQuery,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;