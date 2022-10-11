import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import userSlice from '../../store/slicers/user';
import store, { RootState } from '../../store/store';
import Logo from '../Logo/Logo';

const NavBar = (): JSX.Element => {
	const navigate = useNavigate();

	const isUserAuthenticated = useSelector(
		(state: RootState) => state.user.isAuthenticated
	);

	const actionButtons = (): JSX.Element => {
		if (isUserAuthenticated) {
			return (
				<div className="flex basis-2/6 justify-items-end space-x-8">
					<div>
						<button
							className="hover:drop-shadow-xl hover:font-bold"
							onClick={() => navigate('/workplace')}
						>
							Workplace
						</button>
					</div>
					<div>
						<button
							className="hover:drop-shadow-xl hover:font-bold"
							onClick={() => {
								store.dispatch(userSlice.actions.logout());
								navigate('/');
							}}
						>
							Log out
						</button>
					</div>
				</div>
			);
		} else {
			return (
				<div className="flex basis-2/6 justify-items-end space-x-8">
					<div>
						<button
							className="hover:drop-shadow-xl hover:font-bold"
							onClick={() => navigate('/login')}
						>
							Login
						</button>
					</div>
					<div>
						<button
							className="hover:drop-shadow-xl hover:font-bold"
							onClick={() => alert('Not ready yet...')}
						>
							Register
						</button>
					</div>
				</div>
			);
		}
	};

	return (
		<nav className="flex my-12 flex-row items-center w-3/4 h-32 bg-white border-gray-200 sm:px-4 py-2.5 rounded-full dark:bg-gray-900 w-100">
			<Logo path="/" />
			<div className="flex flex-wrap basis-3/6 items-start space-x-4">
				<button
					className="hover:drop-shadow-xl hover:font-bold"
					onClick={() => alert('One day it will be implemented...')}
				>
					Marketplace
				</button>
				<button
					className="hover:drop-shadow-xl hover:font-bold"
					onClick={() => alert('One day it will be implemented...')}
				>
					Discover
				</button>
				<button
					className="hover:drop-shadow-xl hover:font-bold"
					onClick={() => alert('One day it will be implemented...')}
				>
					Pricing
				</button>
				<button
					className="hover:drop-shadow-xl hover:font-bold"
					onClick={() => alert('One day it will be implemented...')}
				>
					Learn
				</button>
			</div>
			{actionButtons()}
		</nav>
	);
};

export default NavBar;
