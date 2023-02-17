import { TextField, Typography } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { BoxContainer, ButtonCustom, FormWrapper, LoginLink, Shape1, Shape2, Shape3 } from './styles';

const Login = () => {
	const navigate = useNavigate();

	const [err, setErr] = useState(false);
	const [loading, setLoading] = useState(false);

	const { currentUser } = useContext(AuthContext);

	const handleSubmit = async event => {
		setErr(false);
		setLoading(true);
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const email = data.get('email');
		const password = data.get('password');

		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate('/');
			setLoading(false);
		} catch (error) {
			console.log({ error });
			setLoading(false);
			setErr(true);
		}
	};
	useEffect(() => {
		if (currentUser) navigate('/');
	}, [currentUser, navigate]);
	return (
		<BoxContainer>
			<Shape1 />
			<Shape2 />
			<Shape3 />
			<FormWrapper component="form" onSubmit={handleSubmit}>
				<Typography component={'h1'} variant="h5" sx={{ pt: '40px' }}>
					Sign in
				</Typography>
				<TextField label="email" fullWidth name="email" required />
				<TextField label="password" fullWidth type="password" name="password" required />

				<ButtonCustom
					variant="contained"
					type="submit"
					loading={loading}
					loadingPosition="start"
					startIcon={<></>}
				>
					Sign in
				</ButtonCustom>
				{err && (
					<Typography component={'h1'} variant="body2" sx={{ pt: '10px', color: 'red' }}>
						Something went wrong
					</Typography>
				)}
				<Typography
					sx={{ pb: '40px' }}
					component={'h1'}
					variant="body1"
					onClick={() => navigate('/register')}
				>
					Already have an account? <LoginLink>Register</LoginLink>
				</Typography>
			</FormWrapper>
		</BoxContainer>
	);
};

export default Login;
