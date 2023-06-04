import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Mypage from './pages/MyPage';
import Login from './pages/Login';
import Result from './pages/Result';
import Layout from './components/Layout/Layout';
import Search from './pages/Search';
import { SaveProvider } from "./contexts/SaveContext";
import { SaveItemContextProvider } from "./contexts/SaveItem";
import { SaveRecommendContextProvider} from './contexts/SaveRecommend';
import { ProductContextProvider } from "./contexts/Product";

const App = () => {
  return (
    <SaveProvider>
      <SaveItemContextProvider>
        <SaveRecommendContextProvider>
          <ProductContextProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/result" element={<Result />} />
                <Route path="/search" element={<Search />} />
                <Route path="/login" element={<Login />} />
                <Route path="/mypage/*" element={<Mypage />} />
              </Route>
            </Routes>
          </ProductContextProvider>
        </SaveRecommendContextProvider>
      </SaveItemContextProvider>
    </SaveProvider>
  );
};

export default App;