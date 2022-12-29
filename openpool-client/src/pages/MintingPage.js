//modules
import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';

//css
import "../assets/css/minting.css";
import { FormGroup, Label, Input, Card, CardBody, Button } from "reactstrap";

//contracts
import openNFTABI from "../contracts/openNFTABI.json"
import openNFTBytesCode from "../contracts/openNFTBytescode.json";

//hooks
import useMetamask from "../hooks/useMetamask"

// 이름 링크 설명 블록체인 
function Minting() {
  const [nftName, setNftName] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [description, setDescription] = useState("");

  // imgPreView
  const [imgBase64, setImgBase64] = useState(''); 
  const [imgFile, setImgFile] = useState(null);

  const handleChangeFile = (e) => {
    let reader = new FileReader();

    reader.onload = () =>{
      const base64 = reader.result;
      if(base64) {
        setImgBase64(base64.toString());
      }
    }
    if(e.target.files[0]){
      reader.readAsDataURL(e.target.files[0]);
      setImgFile(e.target.files[0])
    }
  }

  //Web3 관련
  const metamask = useMetamask();
  

  // Goerli network가 아니라면 전환
  // const chainId = async window.ethereum.request({ method: "eth_chainId" })
  // console.log("chainId: ", chainId);
  // if(chainId !== '0x5') // 0x5 가 Goerli
  //   await window.ethereum.request({
  //     method: "wallet_switchEthereumChain",
  //     params: [{chainId: '0x5'}]
  //   });
  // };

  async function Minting(){
    // metamask연결 > accounts[0]이 연결된 account
    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
    });
    console.log(accounts[0]);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if(!nftName || !description || !imgSrc) return
    console.log("Creating NFT...")


  }

  const resetForm = () =>{
    setNftName('')
    setDescription('')
    setImgSrc(null)
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
    
    return createContractTxHash;
};

// 이미지를 업로드 할 때 필요한 함수입니다.
const imageUpload= async() =>{
    const result = await axios.post("http://localhost:4000/nft/image",{image: imgFile},{
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }).then(res=>res.data)
    .catch(console.log);
  
    if (!result) return;
    console.log(result.image_url);
    setImgSrc(result.image_url);
}

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

}

useEffect(()=>{
  console.log(imgFile);
}, [imgFile]);

    return(
      <>

    <>
      <div className='content-center'>
        <div className="md:grid md:grid-cols-3 md:gap-6 align-content: center">
          <div className="col-start1 col-end-3 ">
            <div className="px-4 sm:px-0 align-content: center">
              <h3 className="text-lg font-medium leading-6 text-gray-900 text-left">Create NFT</h3>
              <p className="mt-1 text-l text-gray-600 text-left">
                Required fields
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
                      <label 
                      onChange={(e)=> setNftName(e.target.value)} value = {nftName}
                      htmlFor="company-website" className="block text-sm font-medium text-gray-700">
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
                    htmlFor="about" className="block text-sm font-medium text-gray-700">
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
                      <label htmlFor="collection" className="block text-sm font-medium text-gray-700">
                        Collection
                      </label>
                      <select
                        id="collection"
                        name="collection"
                        autoComplete="collection-name"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option>Ethereum</option>
                        <option>Klaytn</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="collection" className="block text-sm font-medium text-gray-700">
                        Price
                      </label>
                      <select
                        id="collection"
                        name="collection"
                        autoComplete="collection-name"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        
                        <option>1.0 Eth (Goerli) </option>
                      </select>
                    </div>

                  <div className="Minting" onChange={handleChangeFile}>
                    <label className="block text-sm font-medium text-gray-700">Main Image</label>
                    
                    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                      

                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <input type="file" name="imgFile" id="imgFile" onChange={handleChangeFile}/>
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                          </label>
                          <p className="pl-1"></p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button type="button"
                    onClick={imageUpload} // 서버쪽으로 넘어가야함
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
