import React from 'react';
import './Message.css';

const Message = ({ message, error }) => <div className={error ? 'message error' : 'message success'}>{message}</div>;
export default Message;
