import { createSlice } from '@reduxjs/toolkit';
import { userLoginAction } from '../actions/userAction';

interface UserState {
	loading: boolean;
	error: string | undefined;
	success: boolean;
}

const initialState: UserState = {
	loading: false,
	error: undefined,
	success: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(userLoginAction.pending, (state: UserState) => {
			state.loading = true;
			state.error = undefined;
		});

		builder.addCase(userLoginAction.fulfilled, (state, { payload }) => {
			state.loading = false;
			state.success = true; // registration successful
		});
		builder.addCase(userLoginAction.rejected, (state, { payload }) => {
			state.loading = false;
			state.error = payload as any;
		});
	},
});

export default userSlice.reducer;
