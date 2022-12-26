import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
// import web3 from 'web3';
import "../assets/css/minting.css";




// 이름 링크 설명 블록체인 
function Minting() {

    const [file, setFile] = useState(null); // 초기 사진 빈 값
    const [descrition, setDescription] = useState(""); // 설명 초기값
    const [name, setName] = useState("") // 이름 초기값
    const [link, setLink] = useState("") // 링크 초기값
    const [chain, setChain] = useState("") // 체인 초기값 
    const blockChainList = ["Ethereum", "Klaytn", "Solana"];

    const fileUploader = useRef(null); // 사진 업로드

    const handleClick = (e) => {
        fileUploader.current.click();
    }
    
    const handleChange = (e) => {
        const maxSize = 100 * 1024 * 1024; // 최대 크기 지정
    
        if (e.target.files[0].size > maxSize) {
          alert("첨부파일 사이즈는 100MB 이내로 등록 가능합니다.")
        } else {
          //add file handler
          //console.log(e.target.files[0]);
          setFile(e.target.files[0]);
        }
    }
    const checkElement = () => {
        if (name && file && chain) {
            return true;
        }
        return false;
    }
    return(
        <>
        <div>
            <h1>ㅎㅇㅎㅇ</h1>
        </div>
        </>
    )
}

export default Minting

