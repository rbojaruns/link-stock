import { CaseReducer, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserState } from '../slicers/user';

export interface UserSchema {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	avatar: string;
}

const config = {
	headers: {
		'Content-Type': 'application/json',
	},
};

const getUserDataByEmail = async (
	email: string
): Promise<UserSchema | undefined> => {
	let userData: UserSchema | undefined;
	let page = 1;
	let continueSearching = true;
	while (userData === undefined || !continueSearching) {
		const { data } = await axios.get(
			`https://reqres.in/api/users?page=${page}`,
			config
		);
		if (data) {
			const fetchedUserData = (data.data as UserSchema[])?.find((user) => {
				return user.email === email;
			});
			console.log(fetchedUserData);
			if (fetchedUserData) {
				userData = fetchedUserData;
			} else if (data.total_pages === page) {
				continueSearching = false;
			}
		} else {
			continueSearching = false;
		}

		page++;
	}
	return userData;
};

export const userLoginAction = createAsyncThunk<
	{ email: string; password: string; userData: UserSchema },
	{ email: string; password: string },
	{ rejectValue: { status: string } }
>(
	'user/login',
	async (
		{ email, password }: { email: string; password: string },
		{ rejectWithValue }
	) => {
		const response = await axios
			.post('https://reqres.in/api/login', { email, password }, config)
			.then((res) => res.data)
			.catch(() => ({
				status: 'rejected',
			}));
		if (response.status === 'rejected') {
			return rejectWithValue({ status: response.status });
		}
		const userData = await getUserDataByEmail(email);
		if (userData) {
			// store user's token in local storage
			localStorage.setItem('userId', `${userData.id}`);
			localStorage.setItem('userData', JSON.stringify(userData));
		}
		return { ...response, userData };
	}
);

export const userRegisterAction = createAsyncThunk<
	{ email: string; password: string; userData: UserSchema },
	{ email: string; password: string },
	{ rejectValue: { status: string } }
>(
	'user/register',
	async (
		{ email, password }: { email: string; password: string },
		{ rejectWithValue }
	) => {
		const response = await axios
			.post('https://reqres.in/api/register', { email, password }, config)
			.then((res) => res.data)
			.catch(() => ({
				status: 'rejected',
			}));
		if (response.status === 'rejected') {
			return rejectWithValue({ status: response.status });
		}
		const userData = await getUserDataByEmail(email);
		if (userData) {
			// store user's token in local storage
			localStorage.setItem('userId', `${userData.id}`);
		}
		return { ...response, userData };
	}
);

export const userLogoutAction: CaseReducer<
	UserState,
	PayloadAction<undefined>
> = (state: UserState) => {
	localStorage.setItem('userId', '');
	state.isAuthenticated = false;
};

export const userClearAction: CaseReducer<
	UserState,
	PayloadAction<undefined>
> = (state: UserState) => {
	state.success = undefined;
};
