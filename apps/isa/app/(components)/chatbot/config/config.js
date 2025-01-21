
import { createChatBotMessage } from 'react-chatbot-kit';
import Header from '@repo/ui/chatbotHeader';
import Greetings from '@repo/ui/chatbotGreetings';
import Avatar from '@repo/ui/chatbotAvatar';
import PaymentStatus from '@repo/ui/chatbotPaymentS';

const botName = "Contactín";

const config = {
  botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: "var(--secondary-color)"
    },
    chatButton: {
      backgroundColor: "var(--primary-color)"
    }
  },
  customComponents:{
    header: () => <Header />,
    botAvatar: () => <Avatar />
  },
  initialMessages: [
    createChatBotMessage(
      `Hola por el momento puedo ayudarte con lo siguiente`,
      {
        widget: "greeting"
      }
    ),
  ],
  widgets: [
    {
      widgetName: "greeting",
      widgetFunc: (props) => <Greetings {...props} />
    },
    {
      widgetName: "payment",
      widgetFunc: (props) => <PaymentStatus {...props} />
    }
  ]
};

export default config;