import { Link } from 'react-router-dom';

const NavBar = (): JSX.Element => {
	return (
		<nav className="flex my-12 flex-row items-center w-3/4 h-32 bg-white border-gray-200 sm:px-4 py-2.5 rounded-full dark:bg-gray-900 w-100">
			<div className="basis-1/6 text-center text-3xl">Dummy Title</div>
			<ul className="flex flex-wrap basis-3/6 items-start space-x-4">
				<li>
					<Link to="/" className="text-3xl font-bold">
						Home
					</Link>
				</li>
				<li>
					<Link to="/login" className="text-3xl font-bold">
						Login
					</Link>
				</li>
			</ul>
			<div className="flex basis-2/6 justify-items-end space-x-8 text-3xl">
				<div>
					<button>Sign in</button>
				</div>
				<div>
					<button>Register</button>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
