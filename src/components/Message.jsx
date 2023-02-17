import { Avatar, Box, Typography } from '@mui/material';
import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { BoxMessage, MessageInfo } from './Messages/style';

const Message = ({ isReceive, message }) => {
	const endDiv = useRef(null);
	const { currentUser } = useContext(AuthContext);
	const { data } = useContext(ChatContext);

	useEffect(() => {
		endDiv.current.scrollIntoView({ behavior: 'smooth' });
	}, []);

	return (
		<>
			<MessageInfo isReceive={isReceive} ref={endDiv}>
				<Box>
					<Avatar
						sx={{ width: '24px', height: '24px' }}
						src={isReceive ? data.user.photoURL : currentUser.photoURL}
					/>
					<Typography variant="caption" sx={{ color: '#555' }}>
						just now
					</Typography>
				</Box>
				{message.text && (
					<BoxMessage isReceive={isReceive}>
						<Typography variant="body2">{message.text}</Typography>
					</BoxMessage>
				)}
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						flexDirection: isReceive ? 'row' : 'row-reverse',
					}}
				>
					{message.img && <img src={message.img} alt="cute" style={{ width: 200, height: 200 }} />}
				</Box>
			</MessageInfo>
		</>
	);
};

export default Message;
