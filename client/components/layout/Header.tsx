import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useCookies } from 'react-cookie';
import SearchIcon from '@material-ui/icons/Search';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import MenuIcon from '@material-ui/icons/Menu';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import _ from 'lodash';

import { navLinkUnAuth, navLinkAuth } from '../../assets/routers/router';

const Header = () => {
	const router = useRouter();
	const { setTheme, theme } = useTheme();
	const [isDark, setIsdark] = useState(false);

	const [sunToMoon, setSunToMoon] = useState(false);

	const [cookie, __, removeCookie] = useCookies();

	useEffect(() => {
		setIsdark(theme === 'dark' ? true : false);
	}, [theme]);

	const handleDark = () => {
		setSunToMoon(true);
		setTimeout(() => {
			setTheme(theme === 'light' ? 'dark' : 'light');
		}, 500);
	};

	const handleSubmit = () => {
		removeCookie('user');
	};

	useEffect(() => {
		const time = setTimeout(() => {
			setSunToMoon(false);
		}, 500);
		return () => clearTimeout(time);
	}, [sunToMoon]);

	return (
		<nav className='fixed inset-x-0 top-0 z-10 shadow-md '>
			<div className='px-2 mx-auto max-w-7xl sm:px-6 lg:px-8'>
				<div className='flex items-center justify-center h-14'>
					<div className='flex items-center mr-auto'>
						<div className='cursor-pointer'>
							<Link href='/'>
								<a className='flex justify-center align-center'>
									<img
										className='w-8 h-8'
										src='./favicon.ico'
										alt='reddit-smile'
									/>
									<h2 className='hidden ml-2 text-2xl sm:block'>reddit</h2>
								</a>
							</Link>
						</div>
					</div>
					<div className='flex items-center w-6/12 my-1'>
						<div className='flex items-center w-full bg-gray-300 rounded-lg focus-within:ring focus-within:ring-opacity-50 dark:focus-within:ring-opacity-100 focus-within:ring-blue-500 dark:focus-within:ring-blue-400 dark:bg-gray-600 '>
							<SearchIcon className='m-2 text-gray-500 dark:text-white' />
							<input
								type='search'
								placeholder='Search...'
								className='flex-1 p-2 bg-transparent border-none outline-none dark:text-gray-200'
							/>
						</div>
					</div>
					<div className='hidden ml-auto md:block'>
						<div className='flex items-center gap-8 '>
							{!_.isEmpty(cookie)
								? navLinkAuth.map(({ name, link }, i) => (
										<div key={`${name}__${i}`} className={`flex items-center `}>
											<span
												onClick={handleSubmit}
												className={` cursor-pointer ${
													router.pathname === link
														? 'nav-link-active dark:dark-nav-link-active '
														: 'nav-link dark:dark-nav-link'
												}`}>
												{name}
											</span>
										</div>
								  ))
								: navLinkUnAuth.map(({ link, name }, i) => (
										<div key={`${name}__${i}`} className={`flex items-center `}>
											<Link href={link}>
												<a
													className={
														router.pathname === link
															? 'nav-link-active dark:dark-nav-link-active '
															: 'nav-link dark:dark-nav-link'
													}>
													{name}
												</a>
											</Link>
										</div>
								  ))}
						</div>
					</div>
					<div className='ml-auto cursor-pointer md:ml-8' onClick={handleDark}>
						{isDark ? (
							<NightsStayIcon
								className={`text-white ${sunToMoon ? ' animate-spin' : ''}`}
							/>
						) : (
							<Brightness4Icon
								className={` w-20  ${sunToMoon ? ' animate-spin' : ''}`}
							/>
						)}
					</div>
					<div className='block ml-4 md:hidden'>
						<MenuIcon
							className={`cursor-pointer ${
								isDark ? ' text-white ' : 'text-gray-900'
							}`}
						/>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Header;
