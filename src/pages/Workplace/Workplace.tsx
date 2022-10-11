import { useEffect, useState } from 'react';
import Logo from '../../components/Logo/Logo';
import { UserSchema } from '../../store/actions/userAction';

type ButtonData = { name: string; text: string; isDefault?: boolean };

const buttonsData: ButtonData[] = [
	{ name: 'links', text: 'Links', isDefault: true },
	{ name: 'appeareance', text: 'Appeareance' },
	{ name: 'analytics', text: 'Analytics' },
];

export const Workplace = (): JSX.Element => {
	const [userData, setUserData] = useState<UserSchema | undefined>();
	const [fieldSelected, setFieldSelected] = useState<string>(
		buttonsData.find((button) => button.isDefault === true)?.name ?? ''
	);

	const wrapButton = (name: string, text: string): JSX.Element => {
		return (
			<button
				className={`${
					fieldSelected === name
						? 'underline underline-offset-8 font-semibold'
						: ''
				}`}
				onClick={() => setFieldSelected(name)}
			>
				{text}
			</button>
		);
	};

	const wrapButtons = (buttonsData: ButtonData[]): JSX.Element[] => {
		return buttonsData.map((buttonData) => {
			return wrapButton(buttonData.name, buttonData.text);
		});
	};

	useEffect(() => {
		const userDataFromStorage = localStorage.getItem('userData');
		if (userDataFromStorage) {
			setUserData(JSON.parse(userDataFromStorage));
		}
	}, []);

	return (
		<div className="workplace flex flex-row">
			<div className="menu h-screen w-16 flex flex-col items-center justify-between my-4">
				<div className="menu-top">
					<Logo path="/workplace" />
				</div>
				<div className="menu-bottom w-12">
					<button onClick={() => alert('One day it will be implemented')}>
						<img src="https://img.icons8.com/material-outlined/48/000000/filled-message.png" />
					</button>
					<div className="mb-8">
						<img className="rounded-full" src={userData?.avatar} />
					</div>
				</div>
			</div>
			<div className="work-area border-l-2 bg-slate-50 w-screen flex flex-col">
				<div className="w-full h-16 border-b-2 flex flex-row space-x-4 px-4">
					{wrapButtons(buttonsData)}
				</div>
				<div>dummy text</div>
			</div>
		</div>
	);
};
