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
  const [userAccount, setUserAccount] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const metamask = useMetamask();

  const loginHandler = async () => {
    // 현재 클라이언트 웹페이지에 계정을 연동하는 것 까지는 구현되었으나
    // 서버에서 신원인증 토큰을 발급받는 부분은 구현이 안 되어 있습니다.

    const account = await metamask
      .request({
        method: "eth_requestAccounts",
      })
      .then((result) => result)
      .catch((err) => err);

    const dataToSign = await axios.get("http://localhost:4000/user/datatosign")
    .then(result=>result.data)
    .catch(err=>err);
    
    const signature = await metamask.request({method:"personal_sign", params:[dataToSign, account[0]]})
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
    setUserAccount(account);
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
      .then(result=>{
        if (result.status === 400) return false;
        else return result.data
      })
      .catch(err=>err.response.status);

      if (result === 400) return;

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
      
      <div className="mb-10 w-full flex flex-col flex-grow">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/mypage" element={<MyPage userAccount={userAccount}/>} />
          <Route path="/detail/:contract/:tokenId" element={<DetailPage />} />
          <Route path="/minting" element={<MintingPage userAccount={userAccount} />} />
          {/* <Route path=":id"/> */}
          {/* </Route> */}
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
