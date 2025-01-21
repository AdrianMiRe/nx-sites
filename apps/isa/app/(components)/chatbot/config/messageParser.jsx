import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    const toLC = message.toLowerCase();
    
    if (toLC.includes('estatus de pago')) {
      actions.handleSelection();
    } 
    
    // if (toLC.includes('si') || toLC.includes('no')) {
    //   actions.handleRecurrence(toLC);
    // }
    
    if ( toLC.includes('@') || ( toLC.startsWith("s") && toLC !== 'si' ) || (toLC.startsWith("m"))) {
      actions.handleQuery(toLC);
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;