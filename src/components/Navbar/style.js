import { styled } from '@mui/material';
import { Box } from '@mui/system';

export const NavbarContainer = styled(Box, {
	shouldForwardProp: prop => prop !== 'isChat',
})(({ isChat }) => ({
	backgroundColor: isChat ? '#686699' : '#34335C',
	width: '100%',
	height: '60px',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '0 20px',
}));
export const NavbarWrapper = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'center',
	gap: '10px',
}));
