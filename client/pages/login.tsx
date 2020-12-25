import React, { FormEvent, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Layout from '../components/layout/Layout';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import _ from 'lodash';

import useLoader from '../hooks/useLoader';
import { passwordRegex } from '../helper';

const login = () => {
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState(null);
	const [messageType, setMessageType] = useState('success');
	const [isFormValid, setIsFormValid] = useState(false);
	const [open, setOpen] = useState(false);

	const [cookie, setCookie] = useCookies(['user']);

	const { isLoading, setIsLoading } = useLoader();

	const router = useRouter();

	useEffect(() => {
		if (!_.isEmpty(cookie)) {
			router.push('/');
			console.log(cookie);
		}
	}, [cookie]);

	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const validatorFunc = (e) => {
		const value = e.target.value;

		const reference: string = e.target.dataset.id;

		const isValidName: boolean = value.trim().length > 1;

		const isStrongPassword: boolean = passwordRegex.test(value);

		const valid = () => {
			e.target.style.borderColor = '#06df7a';
		};
		const invalid = () => {
			e.target.style.borderColor = 'red';
		};

		switch (reference) {
			case 'name':
				if (isValidName) {
					valid();
				} else {
					invalid();
				}
				break;
			case 'password':
				if (isStrongPassword) {
					valid();
				} else {
					invalid();
				}
				break;

			default:
				break;
		}
	};

	const config: RequestInit = {
		headers: {
			'X-Parse-Application-Id': 'app',
			'X-Parse-REST-API-Key': 'rest',
			'X-Parse-Revocable-Session': '1',
			'Content-Type': 'application/json',
		},
		method: 'GET',
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (isFormValid) {
			setIsLoading(true);
			try {
				const data = await fetch(
					`http://localhost:1337/parse/login?username=${name}&password=${password}`,
					config
				).then((res) => res.json());

				if (data.error) {
					setMessageType('error');
					setMessage(data.error);
					setOpen(true);
				} else {
					setCookie('user', JSON.stringify(data), {
						path: '/',
						maxAge: 36000, // Expires after 10hr
						sameSite: true,
					});
					setMessageType('success');
					setMessage('Successfully Logged In');
					setOpen(true);
				}

				setIsLoading(false);
			} catch (err) {
				console.log(err);
			}
		}
	};

	useEffect(() => {
		document.querySelectorAll('.form-input').forEach((input) => {
			input.addEventListener('focusin', (e) => {
				validatorFunc(e);
			});
			input.addEventListener('focusout', (e) => {
				e.target.style.borderColor = 'transparent';
			});
		});
		const formValid = name.trim().length > 1 && passwordRegex.test(password);

		if (formValid) {
			setIsFormValid(true);
		} else {
			setIsFormValid(false);
		}
	}, [name, password]);

	return (
		<Layout title='login'>
			<div className='mt-32 '>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col items-center justify-center max-w-full gap-6 p-8 mx-auto bg-gray-200 shadow-lg w-96 dark:bg-gray-800 rounded-xl'>
					<h1 className='text-3xl font-semibold text-gray-800 dark:text-gray-100'>
						Login
					</h1>
					<input
						data-id='name'
						onChange={(e) => {
							setName(e.target.value);
							validatorFunc(e);
						}}
						value={name}
						type='text'
						placeholder='username...'
						className='form-input '
					/>

					<input
						data-id='password'
						onChange={(e) => {
							setPassword(e.target.value);
							validatorFunc(e);
						}}
						value={password}
						type='password'
						placeholder='password...'
						className='form-input'
					/>

					<Button
						disabled={!isFormValid || isLoading}
						fullWidth
						type='submit'
						size='large'
						variant='contained'
						color='primary'>
						{isLoading ? 'submitting..' : 'Submit'}
					</Button>
				</form>
				<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
					<Alert onClose={handleClose} variant='filled' severity={messageType}>
						{message}
					</Alert>
				</Snackbar>
			</div>
		</Layout>
	);
};

export default login;
