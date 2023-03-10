//modules
import {useState, useEffect } from "react";
import axios from "axios";

//contracts
import openNFTBytesCode from "../contracts/openNFTBytescode.json";

//hooks
import useMetamask from "../hooks/useMetamask";

const MyPage = ({userAccount})=>{
    const metamask = useMetamask();
    const [CaddressCreated, setAddress] = useState("");
    const [addressToRegister, setAddressToRegister] = useState("");

    const [isCreating, setIsCreating] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);

    const registerContractHandler = async ()=>{
        setIsRegistering(true);
        const result = await axios.post("http://localhost:4000/contract/register",{
            address : addressToRegister
        });
        setIsRegistering(false);
    }

    // 컨트랙트 생성에 필요한 함수입니다.
    // 컨트랙트를 생성하는 트랜잭션 주소를 반환합니다.
    const createContractHandler = async ()=>{
        setIsCreating(true);
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

        const checkTxInterval = setInterval(async()=>{
            const receipt = await metamask.request({
                method:"eth_getTransactionReceipt",
                params:[createContractTxHash]
            })
            
            if (!receipt) return;
            else {
                setAddressToRegister(receipt.contractAddress);
                setIsCreating(false);
                clearInterval(checkTxInterval);
            }
        }, 5000)
    };

    return(
        <>
            <div className="h-80 bg-slate-100 hover:brightness-50 hover:cursor-pointer">
                <img></img>
            </div>
            <div className="px-20">
                <div className="relative h-20">
                    <div className="absolute -translate-y-2/3 rounded-full w-48 h-48 border-8 border-white bg-rose-600 hover:brightness-50 hover:cursor-pointer">
                        <img></img>
                    </div>
                </div>
                <div>
                    <h1 className="text-5xl font-extrabold">Unnamed</h1>
                    <div className="flex items-center">
                        <svg className="w-[20px] h-[20px]" fill="gray" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.527 12.2062L12 16.1938L5.46875 12.2062L12 1L18.527 12.2062ZM12 17.4742L5.46875 13.4867L12 23L18.5312 13.4867L12 17.4742V17.4742Z" fill="gray">                            
                            </path>
                        </svg>
                        <p className="text-lg align-top">{userAccount}</p>
                    </div>
                </div>
                <div className="flex w-full justify-evenly mt-10">
                    <div className="w-full mr-2 border p-6 rounded-lg">
                        <h2 className="">스마트 컨트랙트 등록</h2>
                        <div>
                            <input 
                                className="w-full border rounded-lg mt-4 py-2 px-2" 
                                placeholder="보유하신 스마트 컨트랙트 주소를 입력해주세요."
                                onChange={(e)=>{setAddressToRegister(e.target.value)}}
                                value={addressToRegister}
                            />
                        </div>
                        <div className="button-group flex justify-center mt-6">
                            {isRegistering ? 
                            <img className="w-10 h-10" src={process.env.PUBLIC_URL+"images/loading.gif"}/>
                                :
                            <button className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={registerContractHandler}
                            >
                                컨트랙트 등록
                            </button>
                            }
                            
                        </div>
                    </div>
                    <div className="w-full ml-2 border p-6 rounded-lg">
                        <h2>스마트 컨트랙트 생성</h2>
                        <p>{CaddressCreated}</p>
                        <div className="button-group flex justify-center mt-6">
                            {isCreating ?
                            <img className="w-10 h-10" src={process.env.PUBLIC_URL+"images/loading.gif"}/>
                                :
                            <button className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={createContractHandler}
                            >
                                컨트랙트 생성
                            </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyPage;