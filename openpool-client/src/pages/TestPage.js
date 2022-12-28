// modules
import { createContext, useEffect } from "react";
import axios from "axios";

// hooks
import useMetamask from "../hooks/useMetamask";

// contracts
import openNFTABI from "../contracts/openNFTABI.json";
import openNFTBytesCode from "../contracts/openNFTBytescode.json";


const TestPage = ()=>{
    const metamask = useMetamask();
    const [image, setImage] =  usestate()

    const createContract = async ()=>{
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

    const imageUpload= async() =>{
        
    }

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

    const mintingNFT = ()=>{

    }

    return (
        <div className="px-20">
            <button className="p-5 rounded-lg bg-slate-300" onClick={createNFT}>컨트랙트 생성</button>
        </div>
    )
}

export default TestPage;