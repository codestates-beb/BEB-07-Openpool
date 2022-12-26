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
        <div class="sm:text-center">
        <Card className=''>
        <CardBody className=''>
            
          <h1 className='text-lg font-semibold leading-8 text-indigo-600'>Create NFT</h1>
          <form>
            <FormGroup>
              <Label for='name' className='text-lg font-semibold leading-8 text-gray-900'>이름</Label>
              <Input
                type='text'
                name='name'
                id='name'
                placeholder='NFT 이름'
                innerRef={nftName}
              />
            </FormGroup>
            <FormGroup>
              <Label for='description' className='text-lg font-semibold leading-8 text-gray-900'>설명</Label>
              <Input
                type='textarea'
                name='text'
                id='description'
                innerRef={description}
              />
            </FormGroup>
            <FormGroup>
              <Label for='collection' className='text-lg font-semibold leading-8 text-gray-900'>종류</Label>
              <Input
                type='text'
                name='collection'
                id='collection'
                placeholder='Ethereum'
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for='amount' className='text-lg font-semibold leading-8 text-gray-900'>수량</Label>
              <Input
                type='text'
                name='amount'
                id='amount'
                placeholder='1'
                disabled
              />
            </FormGroup>
            <div className='mb-3'>
              <label className='text-lg font-semibold leading-8 text-gray-900' htmlFor='customFile'>
                이미지
              </label>
              <input
                type='file'
                className='form-control'
                id='customFile'
                onChange={imgSrc}
              />
            </div>
            <Button
              className='btnMinting'
              type='button'
              color='primary'
              onClick={successMinting}
            >
            </Button>
            <Button
            className='class=" bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={Minting} // minting 이 아니라 값이 서버로부터 맞게 들어왔는지에 대한 props 만들고 넣어줘야함 
          > NFT 만들기
          </Button>
          </form>
        </CardBody>
      </Card>
    </div>
    );
  };

export default Minting

