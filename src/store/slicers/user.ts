import { createSlice } from '@reduxjs/toolkit';
import {
	userClearAction,
	userLoginAction,
	userLogoutAction,
	UserSchema,
} from '../actions/userAction';

export interface UserState {
	loading: boolean;
	error: string | undefined;
	success: boolean | undefined;
	isAuthenticated: boolean;
	userData: UserSchema | undefined;
}

const initialState: UserState = {
	loading: false,
	error: undefined,
	success: undefined,
	isAuthenticated: !!localStorage.getItem('userId'),
	userData: undefined,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: { logout: userLogoutAction, clear: userClearAction },
	extraReducers: (builder) => {
		builder.addCase(userLoginAction.pending, (state: UserState) => {
			state.loading = true;
			state.error = undefined;
		});
		builder.addCase(userLoginAction.fulfilled, (state, { payload }) => {
			state.loading = false;
			state.success = true;
			state.isAuthenticated = true;
			state.userData = payload.userData;
		});
		builder.addCase(userLoginAction.rejected, (state, { payload }) => {
			state.loading = false;
			state.isAuthenticated = false;
			state.success = false;
			state.error = payload as any;
		});
	},
});

export default userSlice;
