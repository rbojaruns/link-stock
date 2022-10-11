import { configureStore } from '@reduxjs/toolkit';
import user from './slicers/user';

const store = configureStore({
	devTools: true,
	reducer: {
		user: user.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
