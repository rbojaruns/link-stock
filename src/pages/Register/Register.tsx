import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import userSlice from '../../store/slicers/user';
import store, { RootState } from '../../store/store';

export default function Register(): JSX.Element {
	const navigate = useNavigate();

	const isUserAuthenticated = useSelector(
		(state: RootState) => state.user.isAuthenticated
	);

	const onAuthenticated = (): React.ReactNode => {
		return (
			<div className="flex flex-col items-center">
				<div className="font-semibold">You are already authenticated!</div>
				<div className="flex flex-col space-x-4">
					<button
						onClick={() => {
							store.dispatch(userSlice.actions.logout());
							navigate('/');
						}}
					>
						Click here to logout
					</button>
					<button onClick={() => navigate('/workplace')}>
						Click here to go to your workplace
					</button>
				</div>
			</div>
		);
	};

	return (
		<div className="flex flex-row h-screen items-stretch">
			<div className="flex flex-col basis-3/4">
				<Logo path="/register" />
				{isUserAuthenticated ? onAuthenticated() : <RegisterForm />}
			</div>
			<div className="basis-1/4 bg-red-200"></div>
		</div>
	);
}
