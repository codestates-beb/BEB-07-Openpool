import "../assets/css/detail.css";
import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import whatIsNft from "../assets/images/what-is-nft.png";

const DetailPage = () => {
  
  const [nftName, setNftName] = useState('');
  const [builder, setBuilder] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState('')



  
  return (
    
<section className="text-gray-600 body-font">
  
  <div className="container px-5 py-24 mx-auto flex flex-col content-center p-2">
  <h2 onChange={(e)=> setNftName(e.target.value)} value = {nftName} 
  className="font-bold title-font mb-8 text-gray-900 text-2xl text-center">NFT 이름</h2>
    <div className="lg:w-4/6 mx-auto">
      <div className="rounded-lg h-64 overflow-hidden">
        <img className="object-cover object-center h-full w-full" src={whatIsNft} alt="" />
      </div>
      <div className="flex flex-col sm:flex-row mt-10">
        <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
          <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div className="flex flex-col items-center text-center justify-center">
            <h2 onChange={(e)=> setBuilder(e.target.value)} value={builder} 
            className="font-medium title-font mt-4 text-gray-900 text-lg">만든 사람 </h2>
            <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
            <p onChange={(e)=> setPrice(e.target.value)} value={price} 
            className="text-base">1.00 Eth</p>
          </div>
        </div>
        <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
          <p onChange={(e)=> setDescription(e.target.value)} value={description} 
          className="leading-relaxed text-lg mb-4"> NFT 설명</p>          
        </div>
        
      </div>
      <div class="container px-5 py-24 mx-auto">
    <div class="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
      <h1 class="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">부가설명 기타</h1>
      <button 
      class="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0">
        Buy</button> 
        {/* 버튼 누르면 가격에 따라 구매할 수 있게끔 스마트 컨트랙트 */}
    </div>
  </div>
    </div>
  </div>
</section>

  )
}



export default DetailPage;
