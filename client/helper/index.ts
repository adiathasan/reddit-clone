import cookie from 'cookie';

export const parseCookies = (req: { headers: { cookie: any } }) => {
	return cookie.parse(req ? req.headers.cookie || '' : document.cookie);
};

export const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const passwordRegex = new RegExp(
	'^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
);
