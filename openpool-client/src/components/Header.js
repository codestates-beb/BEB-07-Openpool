// modules
import {useState} from "react";
import {Link} from "react-router-dom";

// Heroicons
import WalletIcon from "@heroicons/react/24/outline/WalletIcon";
import ShopingCartIcon from "@heroicons/react/24/outline/ShoppingCartIcon"
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";

// css
import "../assets/css/header.css";

const Header = ()=>{
    return (
        <header className="py-4 px-16 w-full flex justify-between items-center fixed top-0">
            <div className="logo-group flex items-center">
                <div className="logo-wrapper h-10 w-10 mr-2">
                    <img className="w-full " src={process.env.PUBLIC_URL + "/images/logo.png"}/>
                </div>
                <div className="logo-brand">
                    <Link className="text-2xl font-bold">OpenPool</Link>
                </div>
            </div>
            <div className="searchbar-wrapper w-full px-16">
                <input className="searchbar" placeholder="Search items, collections, and accounts"></input>
            </div>
            <navbar>
                <ul className="link-group flex items-center">
                    <li className="link-item"><Link>Explore</Link></li>
                    <li className="link-item">
                        <Link>
                            <UserCircleIcon className="h-10 w-10"/>
                        </Link>
                    </li>
                    <li className="link-item">
                        <Link>
                            <WalletIcon className="h-10 w-10"/>
                        </Link>
                    </li>
                    <li className="link-item">
                        <Link>
                            <ShopingCartIcon className="h-10 w-10"/>
                        </Link>
                    </li>
                </ul>
            </navbar>
        </header>
    )    
}

export default Header;