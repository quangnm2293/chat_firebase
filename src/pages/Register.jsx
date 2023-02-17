import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../firebase';
import { BoxContainer, ButtonCustom, FormWrapper, LoginLink, Shape1, Shape2, Shape3 } from './styles';

const Register = () => {
	const navigate = useNavigate();

	const [err, setErr] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async event => {
		setLoading(true);
		setErr(false);
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const email = data.get('email');
		const password = data.get('password');
		const displayName = data.get('username');
		const file = data.get('file');

		try {
			const res = await createUserWithEmailAndPassword(auth, email, password);

			const date = new Date();

			const storageRef = ref(storage, `${displayName + date.toISOString()}`);

			await uploadBytesResumable(storageRef, file).then(() => {
				getDownloadURL(storageRef).then(async downloadURL => {
					try {
						await updateProfile(res.user, { displayName, photoURL: downloadURL });

						await setDoc(doc(db, 'users', res.user.uid), {
							uid: res.user.uid,
							displayName,
							email,
							photoURL: downloadURL,
						});

						await setDoc(doc(db, 'userChats', res.user.uid), {});
						setLoading(false);
					} catch (error) {
						console.log({ err });
						setErr(true);
						setLoading(false);
					}
				});
			});

			navigate('/', { data: res.user.uid });
		} catch (error) {
			setErr(true);
			setLoading(false);
		}
	};
	return (
		<BoxContainer>
			<Shape1 />
			<Shape2 />
			<Shape3 />
			<FormWrapper component="form" onSubmit={handleSubmit}>
				<Typography component={'h1'} variant="h5" sx={{ pt: '40px' }}>
					Sign up
				</Typography>
				<TextField label="username" fullWidth name="username" required />
				<TextField label="email" fullWidth type={'email'} name="email" required />
				<TextField label="password" fullWidth type="password" name="password" required />
				<IconButton color="primary" aria-label="upload picture" component="label">
					<input hidden accept="image/*" type="file" name="file" />
					<AddPhotoAlternateIcon />
					<Typography component={'h1'} variant="body1">
						Add an avatar
					</Typography>
				</IconButton>

				<ButtonCustom variant="contained" loading={loading} loadingPosition="start" type="submit">
					Sign up
				</ButtonCustom>
				{err && (
					<Typography component={'h1'} variant="body2" sx={{ pt: '10px', color: 'red' }}>
						Something went wrong
					</Typography>
				)}
				<Typography
					component={'h1'}
					variant="body1"
					sx={{ pb: '40px' }}
					onClick={() => navigate('/login')}
				>
					Already have an account? <LoginLink>Login</LoginLink>
				</Typography>
			</FormWrapper>
		</BoxContainer>
	);
};

export default Register;
