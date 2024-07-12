import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Index from './components/index';
import Success from './components/success';
import Cancel from './components/cancel';

function App() {
  

  return (
    <Router>
    
    <Routes>
        <Route path='/' element={<Index/>} />
        <Route path='/success' element={<Success/>} />
        <Route path='/cancel' element={<Cancel/>} />

    </Routes>
</Router>
  )
}

export default App
