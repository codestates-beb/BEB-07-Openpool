//modules
import React, {useEffect, useState, useRef, Link} from 'react';
import axios from 'axios';
import { ethers } from 'ethers';

//css
import "../assets/css/minting.css";


//contracts
import openNFTABI from "../contracts/openNFTABI.json"
import openNFTBytesCode from "../contracts/openNFTBytescode.json";

//hooks
import useMetamask from "../hooks/useMetamask"


// 이름 링크 설명 블록체인 
function Minting({isLogin}) { // isLogin을 어디서든 사용가능,,,
  const [nftName, setNftName] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  // imgPreView
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const imageMimeType = /image\/(png|jpg|jpeg)/i;

    const [image_url, setImageUrl] = useState(""); // 서버에서 받아오는 이미지

    // imgPreView
    const [imgBase64, setImgBase64] = useState(''); 
    const [imgFile, setImgFile] = useState(null);

    const changeHandler = (e) => {
      const file = e.target.files[0];
      if (!file.type.match(imageMimeType)) {
        alert("Image mime type is not valid");
        return;
      }
      setFile(file);
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
    



  //Web3 관련
  const metamask = useMetamask();
  const [contracts, setContracts] = useState("");
  

  // Goerli network가 아니라면 전환
  // const chainId = async window.ethereum.request({ method: "eth_chainId" })
  // console.log("chainId: ", chainId);
  // if(chainId !== '0x5') // 0x5 가 Goerli
  //   await window.ethereum.request({
  //     method: "wallet_switchEthereumChain",
  //     params: [{chainId: '0x5'}]
  //   });
  // };

  // async function Minting(){
  //   // metamask연결 > accounts[0]이 연결된 account
  //   const accounts = await window.ethereum.request({
  //       method: "eth_requestAccounts",
  //   });
  //   console.log(accounts[0]);
  // }



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

    
    return createContractTxHash;
};

// 이미지를 업로드 할 때 필요한 함수입니다.
const imageUpload= async(e) =>{

};


// 메타데이터를 업로드 할 때 필요한 함수입니다.
const createMetadata = async ()=>{
    const result = axios.post("http://localhost:4000/nft/metadata",{
        name: nftName,
        external_url: "http://openpool.com/",
        description: description,
        image: imgSrc,
        attributes: []
    })
    .then(result=>result.data)
    .catch(console.log);

    return result.url;
}

const mintingNFT = async ()=>{
  const token_uri = await createMetadata(); 

  // NFT 민팅을 스마트 컨트랙트에서 실행한다. 의 로직을 작성
  // 결과값을 표현하거나 redirect 하거나 즉, 만들어졌을때 어떻게 표현할건지?
}


    return(
      <>

    <>
      <div className='content-center'>
        <div className="md:grid md:grid-cols-3 md:gap-5 align-content: center">
          <div className="col-start1 col-end-3 ">
            <div className="px-4 sm:px-0 align-content: center">
              <h3 className="text-2xl font-medium leading-6 text-gray-900 text-left">Create NFT</h3>
              <p className="mt-1 text-l text-gray-600 text-lef font-medium">
                Required fields
              </p>
            </div>
          </div>
          <div className=" col-start-2 col-span-1">
            <form> 
            {/* 포스트 요청 주소 및 포스트맨 확인 */}
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label 
                      onChange={(e)=> setNftName(e.target.value)} value = {nftName}
                      htmlFor="company-website" className="text-xl block font-medium text-gray-700">
                        Name
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">

                        <input
                          type="text"
                          name="company-website"
                          id="company-website"
                          className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="NFT name"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label onChange={(e)=> setDescription(e.target.value)} value = {description}  
                    htmlFor="about" className="block text-xl font-medium text-gray-700">
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="The description of NFT"
                        defaultValue={''}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description for your NFT. URLs are hyperlinked.
                    </p>
                  </div>
                  
                  <div className="col-span-6 sm:col-span-3">
                      <label onClick={(e)=> setContracts(e.target.value)} value = {contracts}
                      htmlFor="collection" className="block text-xl font-medium text-gray-700">
                        Contract Transaction
                      </label>
                      <select
                        id="collection"
                        name="collection"
                        autoComplete="collection-name"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option>{setContracts}</option>

                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label onChange={(e)=> setPrice(e.target.value)} value = {price} 
                      htmlFor="company-website" className="text-xl block font-medium text-gray-700">
                        Price
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="company-website"
                            id="company-website"
                            className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="1 eth"
                            />
                        </div>
                      </label>

                    </div>

                  <div className="Minting" onChange={changeHandler}>
                    <label className="block text-xl font-medium text-gray-700">Main Image</label>
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
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                          </label>
                          <p className="pl-1"></p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>

                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
 
                    type="submit"
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


    </>


    </>
  )
}


export default Minting;
