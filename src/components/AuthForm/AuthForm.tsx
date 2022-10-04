import { useState } from 'react';
import { userLoginAction } from '../../store/actions/userAction';
import { useAppDispatch } from '../../store/store';

const FormFields: { type: string; name: string; placeholderText: string }[] = [
	{ type: 'email', name: 'email', placeholderText: 'Enter e-mail' },
	{ type: 'password', name: 'password', placeholderText: 'Enter password' },
];

export default function AuthForm(): JSX.Element {
	const [creds, setCreds] = useState<{ email?: string; password?: string }>({});

	const submitForm = () => {
		const { email, password } = creds;
		if (!email) {
			alert('E-mail is not provided');
		} else if (!password) {
			alert('Password is not provided');
		} else {
			useAppDispatch(userLoginAction({ email, password }));
		}
	};

	return (
		<form
			className="h-screen flex flex-col 
        items-center"
		>
			{FormFields.map((formField) => {
				return (
					<div className="w-52 text-center">
						<input
							className="w-[32rem]"
							type={formField.type}
							name={formField.name}
							placeholder={formField.placeholderText}
							onChange={(event) => {
								setCreds({ ...creds, [formField.name]: event.target.value });
							}}
						/>
					</div>
				);
			})}
			<input type="submit" value="Submit" />
		</form>
	);
}
