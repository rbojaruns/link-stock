import { useSelector } from 'react-redux';
import AuthForm from '../../components/AuthForm/AuthForm';
import Logo from '../../components/Logo/Logo';
import store from '../../store';
import userSlice from '../../store/slicers/user';
import { RootState } from '../../store/store';

export default function Login(): JSX.Element {
	const isUserAuthenticated = useSelector(
		(state: RootState) => state.user.isAuthenticated
	);

	const onAuthenticated = (): React.ReactNode => {
		return (
			<div>
				<div>You are authenticated</div>
				<div>
					<button onClick={() => store.dispatch(userSlice.actions.logout())}>
						Click here to logout
					</button>
				</div>
			</div>
		);
	};

	return (
		<div className="flex flex-row h-screen items-stretch">
			<div className="flex flex-col basis-3/4">
				<Logo path="/" />
				{isUserAuthenticated ? onAuthenticated() : <AuthForm />}
			</div>
			<div className="basis-1/4 bg-red-200"></div>
		</div>
	);
}
