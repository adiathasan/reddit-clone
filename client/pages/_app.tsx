import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

import '../styles/globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider attribute='class'>
			<Header />
			<Component {...pageProps} />
			<Footer />
		</ThemeProvider>
	);
}

export default MyApp;
