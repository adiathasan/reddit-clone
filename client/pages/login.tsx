import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Layout from '../components/layout/Layout';

const login = () => {
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	return (
		<Layout title='login'>
			<div className='mt-32 '>
				<form className='flex flex-col items-center justify-center max-w-full gap-6 p-8 mx-auto bg-gray-200 shadow-lg w-96 dark:bg-gray-800 rounded-xl'>
					<h1 className='text-3xl font-semibold text-gray-800 dark:text-gray-100'>
						Login
					</h1>
					<input
						onChange={(e) => setName(e.target.value)}
						value={name}
						type='text'
						placeholder='username...'
						className='form-input '
					/>

					<input
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						type='password'
						placeholder='password...'
						className='form-input'
					/>

					<Button size='large' variant='contained' color='primary'>
						Submit
					</Button>
				</form>
			</div>
		</Layout>
	);
};

export default login;
