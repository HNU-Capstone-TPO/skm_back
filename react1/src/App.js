import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Mypage from './pages/MyPage';
import Login from './pages/Login';
import Result from './pages/Result';
import Layout from './components/Layout/Layout';
import { SaveProvider } from "./contexts/SaveContext";

const App = () => {
  return (
    <SaveProvider>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage/*" element={<Mypage />} />
      </Route>
    </Routes>
    </SaveProvider>
    
  );
};

export default App;



/*function App() {
  return (
    <SaveProvider>
      <Router>
        <Routes />
      </Router>
    </SaveProvider>
  );
}

export default App;*/