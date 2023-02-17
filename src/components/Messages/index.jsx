import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { db } from '../../firebase';
import Message from '../Message';
import { MessageContainer } from './style';

const Messages = () => {
	const { data } = useContext(ChatContext);
	const [messages, setMessages] = useState([]);
	const { currentUser } = useContext(AuthContext);
	const ref = useRef();

	useEffect(() => {
		const unSub = onSnapshot(doc(db, 'chats', data.chatId), doc => {
			doc.exists() && setMessages(doc.data().messages);
		});

		return () => {
			unSub();
		};
	}, [data.chatId]);
	// useEffect(() => {
	// 	ref.current.scrollIntoView({ behavior: 'smooth' });
	// }, [messages]);

	return (
		<MessageContainer ref={ref}>
			{messages.map(message => (
				<Message isReceive={message.senderId !== currentUser.uid} message={message} key={message.id} />
			))}
		</MessageContainer>
	);
};

export default Messages;
