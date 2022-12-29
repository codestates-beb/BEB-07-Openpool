// modules
import {useState} from "react";
import {Link} from "react-router-dom";

// Heroicons
import WalletIconOutline from "@heroicons/react/24/outline/WalletIcon";
import WalletIconSolid from "@heroicons/react/24/solid/WalletIcon";
import ShopingCartIcon from "@heroicons/react/24/outline/ShoppingCartIcon"
import UserCircleIconOutline from "@heroicons/react/24/outline/UserCircleIcon";
import UserCircleIconSolid from "@heroicons/react/24/solid/UserCircleIcon";

// stylesheet
import "../assets/css/header.css";


const Header = ({userHandler, isLogin})=>{
    // 헤더는 각 nav 요소에 원래 dropdown이 구현되어있습니다.
    // 가능하면 구현하는데 없어도 상관은 없을 듯 합니다.

    return (
        <header className="lg:py-4 lg:px-16 py-2 px-8 w-full flex justify-between items-center position: absolute;">
            <div className="logo-group flex items-center">
                <div className="logo-wrapper h-10 w-10 mr-2">
                    <Link to="/"><img className="w-full " src={process.env.PUBLIC_URL + "/images/logo.png"}/></Link>
                </div>
                <div className="logo-brand">
                    <Link to="/" className="text-2xl font-bold">OpenPool</Link>
                </div>
            </div>{/* 브랜드로고 */}
            <div className="searchbar-wrapper hidden lg:block w-full px-16">
                <input className="searchbar" placeholder="Search items, collections, and accounts" disabled={true}></input>
            </div>
            <nav>
                <ul className="link-group flex items-center pr-3">
                <li className="link-item px-3">
                        <Link>
                            {isLogin ? 
                                <WalletIconSolid className="h-10 w-10" onClick={userHandler}/>
                                : <WalletIconOutline className="h-10 w-10" onClick={userHandler}/>
                            }
                        </Link>
                    </li>
                    <li className="link-item px-3">
                        <Link to="/Mypage">
                            <UserCircleIconOutline className="h-10 w-10" />
                        </Link>
                    </li>
                    <li className="link-item px-3">
                        <Link to="/minting">
                            <p>Create</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )    
}

export default Header;