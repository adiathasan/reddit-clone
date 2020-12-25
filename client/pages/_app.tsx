import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { CookiesProvider } from 'react-cookie';

import '../styles/globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<CookiesProvider>
			<ThemeProvider attribute='class'>
				<Header />
				<Component {...pageProps} />
				<Footer />
			</ThemeProvider>
		</CookiesProvider>
	);
}

export default MyApp;
