// module
import WalletIcon from "@heroicons/react/24/solid/WalletIcon";
import ShopingCartIcon from "@heroicons/react/24/solid/ShoppingCartIcon"
import {Link} from "react-router-dom";

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
            <div className="searchbar-wrapper w-full">
                <input className="searchbar" placeholder="Search items, collections, and accounts"></input>
            </div>
            <navbar>
                <ul className="flex items-center">
                    <li><Link>Explore</Link></li>
                    <li>
                        <Link>
                            <WalletIcon className="h-10 w-10"/>
                        </Link>
                    </li>
                    <li>
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