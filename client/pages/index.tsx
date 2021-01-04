import Link from 'next/link';
import RedditIcon from '@material-ui/icons/Reddit';
import PanoramaIcon from '@material-ui/icons/Panorama';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ForwardIcon from '@material-ui/icons/Forward';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

import Layout from '../components/layout/Layout';

export default function Home({
	posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	console.log(posts);

	return (
		<Layout title='home'>
			<div className='flex justify-center max-w-full gap-6 mx-auto mt-20 align-center w-1000'>
				<div className='flex flex-col items-center justify-center gap-6 '>
					<div className='flex items-start justify-center w-full gap-3 p-6 rounded shadow-md bg-gray-50 dark:bg-gray-900'>
						<div className='p-2 text-gray-100 bg-gray-700 rounded-full'>
							<RedditIcon />
						</div>
						<div className='flex-1 gap-2'>
							<input
								type='text'
								className='form-input focus:ring-8 focus:ring-blue-900'
								placeholder='Title'
							/>
							<textarea
								className='w-full p-4 my-4 text-black bg-gray-300 border rounded outline-none hover:shadow focus:ring focus:ring-offset-blue-500 dark:focus:ring-offset-blue-400 '
								name='textarea'
								id='textarea++'
								placeholder='Create Post'
							></textarea>
						</div>
						<div className='p-2 bg-gray-300 rounded cursor-pointer dark:bg-gray-700'>
							<PanoramaIcon />
						</div>
						<div className='p-2 bg-gray-200 rounded cursor-pointer dark:bg-gray-700'>
							<AttachFileIcon className='transform rotate-45 ' />
						</div>
					</div>
					{posts.map((post) => (
						<div
							key={post.id}
							className='flex items-start justify-center w-full rounded shadow-md dark:bg-gray-900'
						>
							<div className='flex flex-col items-center justify-start p-2 bg-gray-200 rounded-l dark:bg-gray-900 '>
								<ForwardIcon className='text-red-600 transform -rotate-90' />
								<span className='font-semibold text-red-600'>129</span>
								<ForwardIcon className='text-gray-500 transform rotate-90' />
							</div>
							<div className='flex-1 h-full p-2 bg-white rounded-r dark:from-gray-900 bg-gradient-to-b dark:to-black'>
								<h1 className='mb-3 text-xl font-semibold text-gray-900 dark:text-gray-200'>
									{post.title}
								</h1>
								<p className='font-normal leading-5 text-gray-600 text-2l dark:text-gray-300 '>
									{post.body}
								</p>
							</div>
						</div>
					))}
				</div>
				<div className='rounded shadow-md w-80 bg-gray-50 dark:bg-gray-900'>
					<div className='p-4 rounded rounded-b-none bg-gradient-to-r from-green-600 to-blue-900'>
						<h2 className='text-lg font-semibold text-gray-100'>
							Outdoor communities — they’re really out there
						</h2>
					</div>
					<div className=''></div>
				</div>
			</div>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async (ctx) => {
	const config: RequestInit = {
		headers: {
			'X-Parse-Application-Id': 'app',
			'X-Parse-REST-API-Key': 'rest',
			'Content-Type': 'application/json',
		},
		method: 'GET',
	};

	// const data = await fetch(
	// 	'http://localhost:1337/parse/classes/Post',
	// 	config
	// ).then((res) => res.json());

	const data = null;

	return {
		props: {
			posts: data
				? data.results
				: [
						{
							id: 12,
							title: 'The hill way road',
							body: 'I will die when my time comes',
						},
				  ],
		},
		revalidate: 1,
	};
};
