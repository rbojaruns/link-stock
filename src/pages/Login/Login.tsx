import AuthForm from '../../components/AuthForm/AuthForm';

export default function Login(): JSX.Element {
	return (
		<div className="flex flex-row h-screen items-stretch">
			<div className="flex flex-col basis-3/4">
				<div className="m-16 text-3xl ">Dummy title</div>
				<div className="flex flex-col text-center">
					<div className="text-3xl font-bold my-8">Log in to your account</div>
					<AuthForm />
				</div>
			</div>
			<div className="basis-1/4 bg-red-200"></div>
		</div>
	);
}
