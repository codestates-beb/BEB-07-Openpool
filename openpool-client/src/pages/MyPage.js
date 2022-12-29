//modules
import {useState, useEffect } from "react";

//contracts
import openNFTBytesCode from "../contracts/openNFTBytescode.json";

//hooks
import useMetamask from "../hooks/useMetamask";

const MyPage = ()=>{
    const metamask = useMetamask();

    const registerContractHandler = ()=>{
        
    }

    // 컨트랙트 생성에 필요한 함수입니다.
    // 컨트랙트를 생성하는 트랜잭션 주소를 반환합니다.
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

        const contractAddress = await metamask.request({
            method:"eth_getTransactionReceipt",
            params:[{
            hash: createContractTxHash
            }]
        }).then(res=>res.contractAddress);
        
        return contractAddress;
    };

    return(
        <>
            <div className="">

            </div>
            <div className="flex w-full justify-center">
                <div className="w-[400px] border p-6 rounded-lg">
                    <div>
                        <input className="w-full py-4 px-2" placeholder="보유하신 스마트 컨트랙트 주소를 입력해주세요."/>
                    </div>
                    <div className="button-group flex justify-center mt-6">
                        <button className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">컨트랙트 등록</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyPage;