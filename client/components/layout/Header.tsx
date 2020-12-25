import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import SearchIcon from '@material-ui/icons/Search';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import MenuIcon from '@material-ui/icons/Menu';

import { navLinkUnAuth } from '../../assets/routers/router';

const Header = () => {
	const router = useRouter();
	const { setTheme, theme } = useTheme();
	const [isDark, setIsdark] = useState(false);

	useEffect(() => {
		setIsdark(theme === 'dark' ? true : false);
	}, [theme]);

	const handleDark = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	};

	return (
		<nav className='fixed top-0 left-0 right-0 shadow-md'>
			<div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
				<div className='flex items-center justify-center h-16 '>
					<div className='flex items-center mr-auto'>
						<div className='cursor-pointer'>
							<Link href='/'>
								<img
									className='w-10 h-10'
									src='./favicon.ico'
									alt='reddit-smile'
								/>
							</Link>
						</div>
					</div>
					<div className='flex items-center w-6/12'>
						<div className='flex items-center w-full bg-gray-300 rounded-lg dark:bg-gray-600 '>
							<SearchIcon className='m-2 text-gray-500 dark:text-white' />
							<input
								type='search'
								placeholder='Search...'
								className='flex-1 p-2 bg-transparent border-none outline-none dark:text-gray-200'
							/>
						</div>
					</div>
					<div className='hidden ml-auto md:block '>
						<div className='flex items-center gap-8 '>
							{navLinkUnAuth.map(({ link, name }, i) => (
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
							<NightsStayIcon className='text-white ' />
						) : (
							<Brightness7Icon />
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
