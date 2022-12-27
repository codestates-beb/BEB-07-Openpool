// modules
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

// stylesheets
import "./App.css";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import DetailPage from "./pages/DetailPage";
import MintingPage from "./pages/MintingPage";

// Custom Hooks
import useMetamask from "./hooks/useMetamask";

function App() {
  const isLogin = useState(false);
  const web3 = useMetamask();

  const loginHandler = async () => {
    // 현재 클라이언트 웹페이지에 계정을 연동하는 것 까지는 구현되었으나
    // 서버에서 신원인증 토큰을 발급받는 부분은 구현이 안 되어 있습니다.

    const account = await web3
      .request({
        method: "eth_requestAccounts",
      })
      .then((result) => result)
      .catch((err) => err);

    console.log(account);

    // TODO
  };

  return (
    <BrowserRouter>
      <Header loginHandler={loginHandler} isLogin={isLogin}/>
      <div className="mt-24 w-full flex flex-col h-screen flex-grow">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/minting" element={<MintingPage />} />
          {/* <Route path=":id"/> */}
          {/* </Route> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
