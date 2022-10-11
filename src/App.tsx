import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { Workplace } from './pages/Workplace/Workplace';

export default function App() {
	return (
		<div className="app">
			<Router>
				<div>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						{/* <Route path="/register" element={<Register />} /> */}
						<Route path="/workplace" element={<Workplace />} />
					</Routes>
				</div>
			</Router>
		</div>
	);
}
