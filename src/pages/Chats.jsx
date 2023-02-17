import React from 'react';
import Chat from '../components/Chat';
import Sidebar from '../components/Sidebar';
import { BoxContainer, ChatContainer } from './styles';

const Chats = () => {
	return (
		<BoxContainer>
			<ChatContainer>
				<Sidebar />
				<Chat />
			</ChatContainer>
		</BoxContainer>
	);
};

export default Chats;
