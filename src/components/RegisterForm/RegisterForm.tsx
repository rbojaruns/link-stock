import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import store from '../../store';
import { userRegisterAction } from '../../store/actions/userAction';

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

export default function RegisterForm() {
	const navigate = useNavigate();

	const [creds, setCreds] = useState<{ email?: string; password?: string }>({
		email: 'eve.holt@reqres.in',
		password: 'cityslicka',
	});

	const submitForm = async (event: any) => {
		event.preventDefault();
		const { email, password } = creds;
		if (!email) {
			alert('E-mail is not provided');
		} else if (!password) {
			alert('Password is not provided');
		} else {
			await store
				.dispatch(userRegisterAction({ email, password }))
				.then((response) => {
					if (response.meta.requestStatus !== 'rejected') {
						navigate('/workplace');
					}
				});
		}
	};

	return (
		<div className="flex flex-col text-center">
			<div className="text-3xl font-bold my-8">Create your new account</div>
			<form
				className="h-screen flex flex-col 
        items-center"
				onSubmit={submitForm}
			>
				{FormFields.map((formField) => {
					return (
						<div className="w-52 text-center" key={formField.name}>
							<input
								className="w-[32rem]"
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
				<input type="submit" value="Create account" />
			</form>
		</div>
	);
}
