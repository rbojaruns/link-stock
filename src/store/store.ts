import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import user from './slicers/user';

const store = configureStore({
	reducer: {
		user,
	},
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
