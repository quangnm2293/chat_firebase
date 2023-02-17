import { Avatar, Button, Typography } from '@mui/material';
import { signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { auth } from '../../firebase';
import { NavbarContainer, NavbarWrapper } from './style';

const Navbar = ({ isChat }) => {
	const { currentUser } = useContext(AuthContext);
	return (
		<NavbarContainer isChat={isChat}>
			<Typography component={'h1'} variant="h6" sx={{ color: 'white', fontSize: 'bold' }}>
				MiQ Chat
			</Typography>
			<NavbarWrapper>
				<Avatar sx={{ width: '24px', height: '24px' }} src={currentUser.photoURL} />
				<Typography
					component={'h2'}
					variant="body2"
					sx={{ color: 'white', textTransform: 'uppercase' }}
				>
					{currentUser.displayName}
				</Typography>
				<Button size="small" variant="contained" sx={{ height: '24px' }} onClick={() => signOut(auth)}>
					Logout
				</Button>
			</NavbarWrapper>
		</NavbarContainer>
	);
};

export default Navbar;
