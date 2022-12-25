// Library
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import DetailPage from "./pages/DetailPage";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="mt-24">
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/mypage" element={<MyPage/>}/>
          <Route path="/detail" element={<DetailPage/>}>
              <Route path=":id"/>
          </Route>
          <Route path="/" element={<MainPage/>}/>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
