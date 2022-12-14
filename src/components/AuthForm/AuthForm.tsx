import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLoginAction } from '../../store/actions/userAction';
import store, { RootState } from '../../store/store';

const FormFields: {
	type: string;
	name: string;
	placeholderText: string;
	defaultValue: string;
}[] = [
	{
		type: 'email',
		name: 'email',
		placeholderText: 'Enter e-mail',
		defaultValue: 'eve.holt@reqres.in',
	},
	{
		type: 'password',
		name: 'password',
		placeholderText: 'Enter password',
		defaultValue: 'cityslicka',
	},
];

export default function AuthForm(): JSX.Element {
	const navigate = useNavigate();

	const [creds, setCreds] = useState<{ email?: string; password?: string }>({
		email: 'eve.holt@reqres.in',
		password: 'cityslicka',
	});

	const isLoginSuccessful = useSelector(
		(state: RootState) => state.user.success
	);

	const submitForm = async (event: any) => {
		event.preventDefault();
		const { email, password } = creds;
		if (!email) {
			alert('E-mail is not provided');
		} else if (!password) {
			alert('Password is not provided');
		} else {
			await store
				.dispatch(userLoginAction({ email, password }))
				.then((response) => {
					if (response.meta.requestStatus !== 'rejected') {
						navigate('/workplace');
					}
				});
		}
	};

	return (
		<div className="flex flex-col text-center">
			<div className="text-3xl font-bold my-8">Log in to your account</div>
			{isLoginSuccessful === false && (
				<div className="text-red-400">
					E-mail or/and password are not correct! Try again!
				</div>
			)}
			<form
				className="h-screen flex flex-col 
        items-center space-y-4"
				onSubmit={submitForm}
			>
				{FormFields.map((formField) => {
					return (
						<div className="text-center" key={formField.name}>
							<input
								className="w-[32rem] h-8 bg-slate-200 rounded-md"
								type={formField.type}
								name={formField.name}
								placeholder={formField.placeholderText}
								defaultValue={formField.defaultValue}
								onChange={(event) => {
									setCreds({ ...creds, [formField.name]: event.target.value });
								}}
							/>
						</div>
					);
				})}
				<input className="w-[32rem] h-8 bg-indigo-400 rounded-full text-white" type="submit" value="Log In" />
			</form>
		</div>
	);
}
