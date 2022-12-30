// modules
import {useState, useEffect} from "react";


// 메타마스크가 브라우저에 설치되어 있는지 확인하고
// 조건에 모두 해당하면 메타마스크 Provider 객체를 반환합니다.
const useMetamask = ()=>{
    const [metamask, setMetamask] = useState(null);

    useEffect(()=>{
        (async ()=>{
            if(typeof window.ethereum === "undefined") {
                alert("지갑이 설치되어있지 않습니다.");
                return;
            }

            if(window.ethereum.isMetaMask === false){
                alert("메타마스크만 지원합니다.");
                return;
            }
            
            const chaindId = await window.ethereum.request({method:"eth_chainId"});
            if(chaindId !== "0x5"){
                const isChange = await window.ethereum
                .request({method:"wallet_switchEthereumChain", params:[{chainId:"0x5"}]})
                .catch(err=>err);

                if(!isChange) return;
            };

            window.ethereum.on("chainChanged", async(_chaindId)=>{
                const isChange = await window.ethereum
                .request({method:"wallet_switchEthereumChain", params:[{chainId:"0x5"}]})
                .catch(err=>err);
            
                if(!isChange) metamask = null;
              })

            setMetamask(window.ethereum);
        })()
    },[])

    return metamask;
}

export default useMetamask;