import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Head from 'next/head';

interface LayoutType {
	children?: any;
	title?: string;
	description?: string;
	ogImage?: string;
}

const Layout: React.FC<LayoutType> = ({
	children,
	title,
	description,
	ogImage,
}) => {
	// when you share this page on facebook you'll see this image
	const ogImg = 'https://i.imgur.com/1H2TK2B.png';

	return (
		<>
			<Head>
				<title>
					{'Reddit | '} {title ? title : ''}
				</title>
				<meta
					name='description'
					key='description'
					content={
						description ? description : 'This is a Reddit clone using Next.js'
					}
				/>
				<meta
					property='og:description'
					content={
						description ? description : 'This is a Reddit clone using Next.js'
					}
					key='og:description'
				/>
				<meta
					property='og:image'
					content={ogImage ? ogImage : ogImg}
					key='og:image'
				/>
			</Head>
			<Header />
			<main className='min-h-screen mt-16'>{children}</main>
			<Footer />
		</>
	);
};

export default Layout;
