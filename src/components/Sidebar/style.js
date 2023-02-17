import { Box, styled, TextField } from '@mui/material';

export const SidebarContainer = styled(Box)(() => ({
	width: '35%',
	height: '100%',
	backgroundColor: '#45446C',
	overflow: 'scroll',
}));
export const ChatInfo = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'center',
	gap: '10px',
	padding: '5px 5px 5px 15px',
	marginBottom: '5px',
	'&:hover': {
		backgroundColor: '#51446C',
	},
	cursor: 'pointer',
}));
export const TextFieldSearch = styled(TextField)(() => ({
	height: '40px',
	'& .MuiInputBase-root': {
		height: '40px',
		'.MuiInputBase-input': {
			paddingLeft: '5px',
			color: 'white',
			'::placeholder': {
				color: 'white',
			},
		},
	},
}));
