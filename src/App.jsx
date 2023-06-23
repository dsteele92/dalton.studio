import React from 'react';
import { Navbar } from 'components';
import { Home, Portfolio, About, Fitness, Contact } from 'pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
	return (
		<div>
			<Router>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/about' element={<About />} />
					<Route path='/portfolio' element={<Portfolio />} />
					<Route path='/fitness' element={<Fitness />} />
					<Route path='/contact' element={<Contact />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
