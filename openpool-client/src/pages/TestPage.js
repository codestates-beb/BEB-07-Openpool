// modules
import { createContext, useEffect } from "react";

// hooks
import useMetamask from "../hooks/useMetamask";

// contracts
import openNFTABI from "../contracts/openNFTABI.json";
import openNFTBytesCode from "../contracts/openNFTBytescode.json";


const TestPage = ()=>{
    const metamask = useMetamask();

    const createNFT = async ()=>{
        const account = await metamask.request({method:"eth_requestAccounts"})
        const curAccount = account[0];
        if(!curAccount) return;

        const estimateGasfee = await metamask.request({
            method:"eth_estimateGas", 
            params:[{from: curAccount, data : "0x"+openNFTBytesCode.object}]
        })
        
        const createContractTxHash = await metamask.request({
            method:"eth_sendTransaction", 
            params:[{
                from:curAccount, 
                gas:estimateGasfee, 
                data: "0x"+openNFTBytesCode.object
            }]
        })

        return createContractTxHash;
    };

    const createMetadata = async ()=>{
        const result = axios.post("http://localhost:4000/nft/metadata",{
            name: "",
            external_url: "",
            description: "",
            image: "",
            attributes: []
        })
        .then(result=>result.data)
        .catch(console.log);

        return result.url;
    }

    return (
        <div className="px-20">
            <button className="p-5 rounded-lg bg-slate-300" onClick={createNFTHandler}>컨트랙트 생성</button>
        </div>
    )
}

export default TestPage;