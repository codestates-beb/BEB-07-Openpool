// modules
import {useState} from "react";

import {Link} from "react-router-dom";
import WalletIcon from "@heroicons/react/24/solid/WalletIcon";
import ShopingCartIcon from "@heroicons/react/24/solid/ShoppingCartIcon"

// css
import "../assets/css/header.css";

const Header = ()=>{
    return (
        <header className="py-4 px-16 w-full flex justify-between items-center fixed top-0">
            <div className="logo-group">
                <div className="logo-wrapper">
                    <img src=""/>
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
                    <li className="link-item text-xl font-bold"><Link>Explore</Link></li>
                    <li className="link-item">
                        <Link>
                            <WalletIcon className="h-10 w-10"/>
                        </Link>
                    </li>
                    <li className="link-item">
                        <Link>
                            <ShopingCartIcon className="h-10 w-10"></ShopingCartIcon>
                        </Link>
                    </li>
                </ul>
            </navbar>
        </header>
    )    
}

export default Header;