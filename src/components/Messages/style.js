import { styled } from '@mui/material';
import { Box } from '@mui/system';

export const MessageInfo = styled(Box, { shouldForwardProp: prop => prop !== 'isReceive' })(({ isReceive }) => ({
	display: 'flex',
	gap: '10px',
	marginBottom: '10px',
	// justifyContent: isReceive ? 'flex-start' : 'flex-end',
	flexDirection: isReceive ? 'row' : 'row-reverse',
}));
export const BoxMessage = styled(Box, { shouldForwardProp: prop => prop !== 'isReceive' })(({ isReceive }) => ({
	backgroundColor: isReceive ? '#ddd' : '#92A9FC',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '5px 15px',
	borderRadius: '10px',
	borderTopLeftRadius: isReceive ? '0' : '10px',
	borderTopRightRadius: !isReceive ? '0' : '10px',
}));
export const MessageContainer = styled(Box)(() => ({
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	padding: '0 10px',
	overflow: 'scroll',
}));
