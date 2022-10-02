import { createSlice } from '@reduxjs/toolkit';

interface UserState {}

const initialState: UserState = {};

export default createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: {},
}).reducer;
