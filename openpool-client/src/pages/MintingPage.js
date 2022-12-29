//modules
import React, {useEffect, useState, useRef, Link} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import Web3 from 'web3';

//css
import "../assets/css/minting.css";

//hooks
import useMetamask from "../hooks/useMetamask"

// 이름 링크 설명 블록체인 
function Minting( {isLogin, userAccount}) { // isLogin을 어디서든 사용가능,,,
  // location
  const navigation = useNavigate();

  const [nftName, setNftName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [image_url, setImageUrl] = useState(""); // 서버에서 받아오는 이미지

  // imgPreView
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const imageMimeType = /image\/(png|jpg|jpeg)/i;

  const changeHandler = async (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
    await imageUpload(file);
  }

  useEffect(() => {
    let fileReader, isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result)
        }
      }
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }

  }, [file]);

  useEffect(()=>{
    (async()=>{
      if (isLogin === false) navigation("/");
    })();
  }, [isLogin])

  //Web3 관련
  const metamask = useMetamask();

  // 이미지를 업로드 할 때 필요한 함수입니다.
  const imageUpload= async(file) =>{
      const result = await axios.post("http://localhost:4000/nft/image",{image: file},{
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }).then(res=>res.data)
      .catch(console.log);
    
      if (!result) return;
      
      setImageUrl(result.image_url);
  }

  // 메타데이터를 업로드 할 때 필요한 함수입니다.
  const createMetadata = async ()=>{
    const result = await axios.post("http://localhost:4000/nft/metadata",{
        name: nftName,
        external_url: "http://openpool.com/",
        description: description,
        image: image_url,
        attributes: []
    })
    .then(result=>result.data)
    .catch(console.log);

    return result.token_url;
  }

  const mintingNFT = async ()=>{ 
    const tokenURL = await createMetadata();
    const web3 = new Web3();

    const curAccount = metamask.selectedAddress;

    const mintNFTSelector = web3.eth.abi.encodeFunctionSignature("mintNFT(address,string)");
    const mintNFTParameterEncoded = web3.eth.abi.encodeParameters(["address","string"], [curAccount, tokenURL]);

    const data = mintNFTSelector + mintNFTParameterEncoded.substring(2);
    
    const resultMinting = await metamask.request({method: "eth_sendTransaction", params:[{
      from:curAccount,
      to: contractAddress,
      data
    }]}).then(result=>result)
    .catch(console.log);

    console.log(resultMinting);
  }


  return(
    <div className='content-center'>
      <div className="md:grid md:grid-cols-3 md:gap-5 align-content: center">
        <div className="col-start1 col-end-3 ">
          <div className="px-4 sm:px-0 align-content: center">
            <h3 className="text-2xl font-medium leading-6 text-gray-900 text-left">NFT 민팅하기</h3>
            <p className="mt-1 text-l text-gray-600 text-lef font-medium">
              필요 항목들
            </p>
          </div>
        </div>
        <div className="col-start-2 col-span-1">
          <form> 
          {/* 포스트 요청 주소 및 포스트맨 확인 */}
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label htmlFor="company-website" className="text-xl block font-medium text-gray-700">
                      이름
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">

                      <input
                        type="text"
                        name="company-website"
                        id="company-website"
                        className="block p-3 w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="NFT 명을 기입해주세요."
                        onChange={(e)=> setNftName(e.target.value)} 
                        value = {nftName}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="about" className="block text-xl font-medium text-gray-700">
                    설명
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="NFT 설명을 기입해주세요."
                      onChange={(e)=> setDescription(e.target.value)} 
                      value = {description}  
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    간단한 NFT 설명이 기입되면 되겠습니다.
                  </p>
                </div>
                
                <div className="col-span-6 sm:col-span-3">
                    <label
                    htmlFor="collection" className="block text-xl font-medium text-gray-700">
                      민팅 컨트랙트 주소
                    </label>
                    <select
                      id="collection"
                      name="collection"
                      autoComplete="collection-name"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      onChange={(e)=> setContractAddress(e.target.value)} 
                      defaultValue={0}
                    >
                      <option value={0} disabled={true}>민팅할 컨트랙트를 고르세요.</option>
                      <option value="0x7e5536f75d9567fbe7f13c3f6ea4c8a608f8e54b">0x7e5536f75d9567fbe7f13c3f6ea4c8a608f8e54b</option>
                      <option value="0x4e5e76fed68e5a0456059ac46a0bae5623c522fc">0x4e5e76fed68e5a0456059ac46a0bae5623c522fc</option>
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="company-website" className="text-xl block font-medium text-gray-700">
                      가격
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="company-website"
                          id="company-website"
                          className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="1 eth"
                          onChange={(e)=> setPrice(e.target.value)} 
                          value = {price}
                          disabled={true}
                          />
                      </div>
                    </label>

                  </div>

                <div className="Minting" onChange={changeHandler}>
                  <label className="block mb-2 text-xl font-medium text-gray-700">이미지</label>
                  <div className="space-y-1 text-center content-center">
                  {fileDataURL ?
                    <p className="img-preview-wrapper">
                      {
                        <img src={fileDataURL} alt="preview" />
                      }
                    </p> : null}
                      <div className="flex text-sm text-gray-600 content-center">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <input type="file" name="imgFile" id="imgFile" />
                          <input id="file-upload" name="file-upload" type="file" className="sr-only bg-indigo-600" />
                        </label>
                        <p className="pl-1"></p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>

                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <div>
              </div>
                <button type="button"
                  onClick={mintingNFT}
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Make own your NFT
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


export default Minting;
