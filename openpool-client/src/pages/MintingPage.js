import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import Web3 from 'web3';
import "../assets/css/minting.css";
import { FormGroup, Label, Input, Card, CardBody, Button } from "reactstrap";



// 이름 링크 설명 블록체인 
function Minting() {

    const baseImage = "https://icons-for-free.com/download-icon-file-131964752888364301_512.png";
    const [imgSrc, setImgSrc] = useState(baseImage);
    const [nftName, setNftName] = useState("");
    const [description, setDescription] = useState("");
    const [waitNftMinting, setWaitNftMinting] = useState(false);
    const [successMinting, setSuccessMinting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [web3, setWeb3] = useState();

    useEffect(() => {
        if(typeof window.ethereum !== "undefined"){
          try{
            const web = new Web3(window.ethereum);
            setWeb3(web);
          } catch (err) {
            console.log(err);
          }
        }
      }, []);
    
      const changeNftName = (e) => {
        setNftName(e.value);
      };

      const chageDescription = (e) => {
        setDescription(e.value);
      }
      
      const checkElement = () => {
        if( nftName && imgSrc && description) {
            return true;
        }
        return false;
      }



      async function Minting(){
        // metamask연결 > accounts[0]이 연결된 account
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        console.log(accounts[0]);
      }

      

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
            <form action="#" method="POST"> 
            {/* 포스트 요청 주소 및 포스트맨 확인 */}
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
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
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
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

                  <div>
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
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
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


export default Minting

