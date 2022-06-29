// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
// components
import SignIn from './components/SignIn';
import Register from './components/Register';
import Chat from './components/Chat';
import Profile from './components/Profile';
import Authenticate from './components/Authenticate';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route  path="/" element={<Authenticate/>}>
            <Route path="/" element={<Chat/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Route>
          <Route path="/login" element={<SignIn/>}/>
          <Route path="/register" element={<Register/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
