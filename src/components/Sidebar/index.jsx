import { Avatar, Box, Divider, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { ChatInfo, SidebarContainer, TextFieldSearch } from './style';
import {
	collection,
	query,
	where,
	getDocs,
	setDoc,
	doc,
	updateDoc,
	serverTimestamp,
	getDoc,
	onSnapshot,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const Sidebar = () => {
	const [username, setUsername] = useState('');
	const [user, setUser] = useState(null);
	const [err, setErr] = useState(false);
	const [chats, setChats] = useState([]);

	const { currentUser } = useContext(AuthContext);
	const { dispatch } = useContext(ChatContext);

	const handleSearch = async () => {
		setErr(false);
		setUser(null);
		const q = query(collection(db, 'users'), where('displayName', '==', username));
		if (!q) {
			setErr(true);
			return;
		}
		try {
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach(doc => {
				setUser(doc.data());
			});
		} catch (error) {
			setErr(true);
		}
	};

	const handleKeyDown = e => {
		e.code === 'Enter' && handleSearch();
	};

	const handleSelect = async () => {
		const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

		try {
			const res = await getDoc(doc(db, 'chats', combinedId));

			if (!res.exists()) {
				await setDoc(doc(db, 'chats', combinedId), { messages: [] });

				await updateDoc(doc(db, 'userChats', currentUser.uid), {
					[combinedId + '.userInfo']: {
						uid: user.uid,
						displayName: user.displayName,
						photoURL: user.photoURL,
					},
					[combinedId + '.date']: serverTimestamp(),
				});
				await updateDoc(doc(db, 'userChats', user.uid), {
					[combinedId + '.userInfo']: {
						uid: currentUser.uid,
						displayName: currentUser.displayName,
						photoURL: currentUser.photoURL,
					},
					[combinedId + '.date']: serverTimestamp(),
				});
			}
		} catch (error) {}

		setUser(null);
		setUsername('');
	};

	useEffect(() => {
		const getChats = () => {
			const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), doc => {
				setChats(doc.data());
			});

			return () => {
				unsub();
			};
		};
		currentUser.uid && getChats();
	}, [currentUser.uid]);

	const handleSelectChat = user => {
		dispatch({ type: 'CHANGE_USER', payload: user });
	};

	return (
		<SidebarContainer>
			<Navbar />
			<TextFieldSearch
				placeholder="Find a user"
				fullWidth
				variant="standard"
				onChange={e => setUsername(e.target.value)}
				onKeyDown={handleKeyDown}
				value={username}
			/>
			{err && (
				<Typography component={'h1'} variant="body2" sx={{ pt: '10px', color: 'red' }}>
					User not found
				</Typography>
			)}
			{user && (
				<ChatInfo onClick={handleSelect}>
					<Avatar src={user.photoURL} />
					<Box sx={{ color: 'white' }}>
						<Typography>{user.displayName}</Typography>
					</Box>
				</ChatInfo>
			)}
			<Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.4)' }} />

			{chats &&
				Object.entries(chats)
					?.sort((a, b) => b[1].date - a[1].date)
					.map(chat => (
						<ChatInfo key={chat[0]} onClick={() => handleSelectChat(chat[1].userInfo)}>
							<Avatar src={chat[1].userInfo.photoURL} />
							<Box sx={{ color: 'white' }}>
								<Typography>{chat[1].userInfo.displayName}</Typography>
								<Typography variant="caption">{chat[1].lastMessage}</Typography>
							</Box>
						</ChatInfo>
					))}
		</SidebarContainer>
	);
};

export default Sidebar;
