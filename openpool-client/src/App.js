// modules
import { useState, useEffect } from "react";
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
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState("");
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

    const dataToSign = await axios.get("http://localhost:4000/user/datatosign")
    .then(result=>result.data)
    .catch(err=>err);
    
    const signature = await web3.request({method:"personal_sign", params:[dataToSign, account[0]]})
    .then(result=>result)
    .catch(console.log)

    if (!signature) return;

    const loginResult = await axios
    .post("http://localhost:4000/user/login", {
      dataToSign, signature, address: account[0]
    }, {withCredentials: true})
    .then(result=>{
      return result.data;
    })
    .catch(console.log)

    if (!loginResult) return;

    setIsLogin(true);
    setAccessToken(loginResult.data.accessToken);
  };
  
  const logoutHandler = async ()=>{
    const result = await axios.post("http://localhost:4000/user/logout",{}, {withCredentials:true})
    .then(result=>{
      return result.data;
    })
    .catch(console.log)

    if (!result) return;

    setIsLogin(false);
    setAccessToken("");
  }

  useEffect(()=>{
    (async()=>{
      const result = await axios.post("http://localhost:4000/user/verify",{},{withCredentials:true})
      .then(result=>{return result.data})
      .catch(console.log);

      if (!result) return;

      setIsLogin(true);
      setAccessToken(result.data.accessToken);
    })()
  },[])

  return (
    <BrowserRouter>
      {
        isLogin ? <Header userHandler={logoutHandler} isLogin={isLogin}/>
        : <Header userHandler={loginHandler} isLogin={isLogin} />
      }
      
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
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
