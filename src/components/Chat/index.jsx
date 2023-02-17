import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VideocamIcon from '@mui/icons-material/Videocam';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import Messages from '../Messages';
import { NavbarContainer } from '../Navbar/style';
import SendBar from '../SendBar';
import { ChatBoxContainer } from './style';

const Chat = () => {
	const { data } = useContext(ChatContext);

	return (
		<ChatBoxContainer>
			<NavbarContainer isChat={true}>
				<Typography sx={{ color: 'white' }}>{data.user?.displayName}</Typography>
				<Box>
					<VideocamIcon sx={{ cursor: 'pointer', color: 'white', mr: '15px' }} />
					<PersonAddIcon sx={{ cursor: 'pointer', color: 'white', mr: '15px' }} />
					<MoreHorizIcon sx={{ cursor: 'pointer', color: 'white' }} />
				</Box>
			</NavbarContainer>
			<Messages />
			<SendBar />
		</ChatBoxContainer>
	);
};

export default Chat;
