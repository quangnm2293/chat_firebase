import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Box, Button, InputLabel, styled, TextField } from '@mui/material';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db, storage } from '../firebase';

const SendBarContainer = styled(Box)(() => ({
	height: '60px',
	backgroundColor: 'white',
	position: 'relative',
}));
const SendWrapper = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	gap: '10px',
	position: 'absolute',
	top: '15px',
	right: '10px',
	zIndex: 1,
}));
const SendText = styled(TextField)(() => ({
	height: '60px',
	'& .MuiInputBase-root': {
		height: '60px',
		borderRadius: 0,
		border: 'none',
		outline: 'none',
		'& .MuiInputBase-input': {
			border: 'none',
			outline: 'none',
		},
	},
}));

const SendBar = () => {
	const { currentUser } = useContext(AuthContext);
	const { data } = useContext(ChatContext);

	const [text, setText] = useState('');
	const [img, setImg] = useState('');

	const handleSubmit = async event => {
		event.preventDefault();
		setText('');
		setImg('');

		if (img) {
			const storageRef = ref(storage, uuid());
			await uploadBytesResumable(storageRef, img).then(() => {
				getDownloadURL(storageRef).then(async downloadURL => {
					try {
						await updateDoc(doc(db, 'chats', data.chatId), {
							messages: arrayUnion({
								id: uuid(),
								text,
								senderId: currentUser.uid,
								date: Timestamp.now(),
								img: downloadURL,
							}),
						});
					} catch (error) {
						console.log({ error });
					}
				});
			});
		} else {
			await updateDoc(doc(db, 'chats', data.chatId), {
				messages: arrayUnion({
					id: uuid(),
					text,
					senderId: currentUser.uid,
					date: Timestamp.now(),
				}),
			});
		}

		await updateDoc(doc(db, 'userChats', currentUser.uid), {
			[data.chatId + '.lastMessage']: text,
			[data.chatId + '.date']: serverTimestamp(),
		});
		await updateDoc(doc(db, 'userChats', data.user.uid), {
			[data.chatId + '.lastMessage']: text,
			[data.chatId + '.date']: serverTimestamp(),
		});
	};

	return (
		<SendBarContainer component={'form'} onSubmit={handleSubmit}>
			<SendWrapper>
				<AttachFileIcon sx={{ color: '#aaa', cursor: 'pointer' }} />
				<TextField
					type="file"
					id="file"
					sx={{ display: 'none' }}
					onChange={e => setImg(e.target.files[0])}
				/>
				<InputLabel htmlFor="file">
					<AddPhotoAlternateIcon sx={{ color: '#aaa', cursor: 'pointer' }} />
				</InputLabel>

				<Button variant="contained" type="submit">
					Send
				</Button>
			</SendWrapper>
			<SendText fullWidth name="sendText" value={text} onChange={e => setText(e.target.value)} />
		</SendBarContainer>
	);
};

export default SendBar;
