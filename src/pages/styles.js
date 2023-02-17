import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';

export const Shape1 = styled(Box)(() => ({
	width: '300px',
	height: '700px',
	position: 'absolute',
	top: '100px',
	left: '-200px',
	transform: 'rotate(25deg)',
	backgroundColor: 'rgba(255, 255, 255, 0.1)',
	borderRadius: '5px',
}));
export const Shape2 = styled(Box)(() => ({
	width: '200px',
	height: '300px',
	position: 'absolute',
	top: '10px',
	right: '-120px',
	transform: 'rotate(-25deg)',
	backgroundColor: 'rgba(0, 0, 0, 0.1)',
	borderRadius: '5px',
}));
export const Shape3 = styled(Box)(() => ({
	width: '500px',
	height: '800px',
	position: 'absolute',
	left: '300px',
	bottom: '-650px',
	transform: 'rotate(-25deg)',
	backgroundColor: 'rgba(255, 255, 255, 0.1)',
	borderRadius: '5px',
	overflow: 'hidden',
}));
export const BoxContainer = styled(Box)(({ theme }) => ({
	width: '100vw',
	height: '100vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	background: 'linear-gradient(225deg, #FD02FF, #0AD6DF)',
	position: 'relative',
	overflow: 'hidden',
}));
export const ChatContainer = styled(Box)(() => ({
	width: '80vw',
	height: '80vh',
	display: 'flex',
	border: '1px solid #ccc',
	borderRadius: '5px',
	backgroundColor: '#3daeae',
	zIndex: 1,
	boxShadow: '0 2px 30px 0 rgba(100,230,300)',
	overflow: 'hidden',
}));
export const FormWrapper = styled(Box)(({ theme }) => ({
	width: '400px',
	border: '1px solid #ccc',
	borderRadius: '5px',
	margin: 'auto',
	backgroundColor: 'white',
	boxShadow: '0 2px 30px 0 rgba(100,230,300)',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: 15,
	padding: 20,
}));
export const ButtonCustom = styled(LoadingButton)(({ theme }) => ({
	width: '100%',
	height: '50px',
	borderRadius: '5px',
	background: 'linear-gradient(to left, #FD02FF, #0AD6DF)',
	fontWeight: 'bold',
	transition: 'background 0.2s linear',
	'&:hover': {
		opacity: 0.8,
	},
}));
export const LoginLink = styled('span')(() => ({
	'&:hover': {
		color: 'blue',
	},
	cursor: 'pointer',
}));
