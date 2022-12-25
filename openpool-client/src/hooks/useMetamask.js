// modules
import {useState, useEffect} from "react";

// 메타마스크가 브라우저에 설치되어 있는지 확인하고
// 조건에 모두 해당하면 메타마스크 Provider 객체를 반환합니다.
const useMetamask = ()=>{
    const [web3, setWeb3] = useState(null);

    useEffect(()=>{
        (async ()=>{
            if(typeof window.ethereum === "undefined") {
                alert("지갑이 설치되어있지 않습니다.");
                return;
            }

            if(window.ethereum.isMetaMask === false){
                alert("메타마스크만 지원합니다.");
            }

            setWeb3(window.ethereum);
        })()
    },[])

    return web3;
}

export default useMetamask;