import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';

export default function Logo(props: { path: string }): JSX.Element {
	const navigate = useNavigate();

	return (
		<button
			onClick={() => navigate(props.path, { replace: true })}
			className="basis-1/6"
		>
			<img src={logo} alt={'Logo'} className="w-32" />
		</button>
	);
}
