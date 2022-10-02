import NavBar from '../../components/NavBar/NavBar';

export default function Home() {
	return (
		<div className="flex flex-col items-center bg-green-700">
			<NavBar />
			<div className="text-3xl font-bold underline">
				<div>A</div>
				<div>B</div>
			</div>
			<div className="register"></div>
		</div>
	);
}
