//modules
import {useState, useEffect } from "react";

//hooks
import useMetamask from "../hooks/useMetamask";

const MyPage = ()=>{
    const metamask = useMetamask();

    const registerContractHandler = ()=>{
        
    }

    return(
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
    )
}

export default MyPage;