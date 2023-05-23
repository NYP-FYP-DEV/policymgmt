import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';
import Home from './pages/home';
import PoliciesNav from './pages/policies';
import RetrievePoliciesNav from './pages/info';
import RetrieveStatusNav from './pages/status';
import SignUp from './pages/status';
import Contact from './pages/payment';
import PaymentNav from './pages/payment';

function App() {
return (
	<Router>
	<Navbar />
	<Routes>
		<Route exact path='/home' element={<Home />} />
		<Route path='/policies' element={<PoliciesNav/>} />
		<Route path='/payment' element={<PaymentNav/>} />
		<Route path='/info' element={<RetrievePoliciesNav/>} />
		<Route path='/status' element={<RetrieveStatusNav/>} />
	</Routes>
	</Router>
);
}

export default App;
