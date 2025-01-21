import { Chatbot as CB } from 'react-chatbot-kit';

import 'react-chatbot-kit/build/main.css';

import config from './config/config';
import MessageParser from './config/messageParser';
import ActionProvider from './config/actionProvider';


const Chatbot = () => {
  return (
    <div>
      <CB
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        placeholderText='Introduce aquí tu respuesta'
      />
    </div>
  )
}

export default Chatbot;