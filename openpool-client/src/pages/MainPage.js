//modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, FreeMode, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

// Images
import whatIsNft from "../assets/images/what-is-nft.png";
import whatIsCryptoWallet from "../assets/images/what-is-crypto-wallet.png";
import whatAreGasFees from "../assets/images/what-are-gas-fees.png";
import whatIsMinting from "../assets/images/what-is-minting.png";
import whoIsOpenSea from "../assets/images/who-is-opensea.png";
import howToBuyNft from "../assets/images/how-to-buy-nft.png";
import howToCreateNft from "../assets/images/how-to-create-nft.png";
import howToSellNft from "../assets/images/how-to-sell-nft.png";
import art from "../assets/images/art.png";
import collectibles from "../assets/images/collectibles.png";
import music from "../assets/images/music.png";
import domainNames from "../assets/images/domain-names.png";
import photography from "../assets/images/photography-category.png";
import sports from "../assets/images/sports.png";
import tradingCards from "../assets/images/trading-cards.png";
import utility from "../assets/images/utility.png";
import virtualWorlds from "../assets/images/virtual-worlds.png";

// 위의 swiper를 이용해서 슬라이드를 구현하세요!
// swiper를 이용하면 손쉽게 슬라이드를 구현할 수 있습니다.
// 참고로 OpenSea도 swiper를 이용하고 있어서 여러 프로젝트에 사용되고 있다는 것을 알 수 있습니다.
// 슬라이드에 들어가는 이미지와 설명들은 임의로 만들어서 사용해주세요.

const MainPage = () => {
  return (
    <>
      <div className="pt-10 flex justify-center">
        <p className="text-5xl font-extrabold">
          Explore, collect, and sell NFTs
        </p>
      </div>
      <div className="main"></div>
      <div>
        <h1 className="pt-10 pl-4 pb-2 text-xl font-bold">NFT 101</h1>
        <p className="pl-4 pb-4">Get comfortable with the basics.</p>
        <Swiper
          slidesPerView={5}
          spaceBetween={20}
          slidesPerGroup={5}
          loop={true}
          keyboard={{
            enabled: true,
          }}
          freeMode={true}
          navigation={true}
          modules={[Keyboard, FreeMode, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="max-w-sm rounded-xl overflow-hidden shadow-lg">
              <a href="https://opensea.io/learn/what-are-nfts" rel="noreferrer">
                <img className="w-full" src={whatIsNft} alt="" />
                <div className="px-6 py-4">
                  <div className="font-bold text-l mb-4">What is an NFT?</div>
                </div>
              </a>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="max-w-sm rounded-xl overflow-hidden shadow-lg">
              <a
                href="https://opensea.io/learn/what-is-crypto-wallet"
                rel="noreferrer"
              >
                <img className="w-full" src={whatIsCryptoWallet} alt="" />
                <div className="px-6 py-4">
                  <div className="font-bold text-l mb-4">
                    What is a crypto wallet?
                  </div>
                </div>
              </a>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="max-w-sm rounded-xl overflow-hidden shadow-lg">
              <a href="https://opensea.io/learn/nft-gas-fees" rel="noreferrer">
                <img className="w-full" src={whatAreGasFees} alt="" />
                <div className="px-6 py-4">
                  <div className="font-bold text-l mb-4">
                    What are blockchain gas fees?
                  </div>
                </div>
              </a>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="max-w-sm rounded-xl overflow-hidden shadow-lg">
              <a
                href="https://opensea.io/learn/how-to-buy-nft"
                rel="noreferrer"
              >
                <img className="w-full" src={howToBuyNft} alt="" />
                <div className="px-6 py-4">
                  <div className="font-bold text-l mb-4">How to buy an NFT</div>
                </div>
              </a>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="max-w-sm rounded-xl overflow-hidden shadow-lg">
              <a
                href="https://opensea.io/learn/how-to-create-an-nft"
                rel="noreferrer"
              >
                <img className="w-full" src={howToCreateNft} alt="" />
                <div className="px-6 py-4">
                  <div className="font-bold text-l mb-2">
                    How to create an NFT on OpenSea
                  </div>
                </div>
              </a>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="max-w-sm rounded-xl overflow-hidden shadow-lg">
              <a
                href="https://opensea.io/learn/how-to-sell-nfts"
                rel="noreferrer"
              >
                <img className="w-full" src={howToSellNft} alt="" />
                <div className="px-6 py-4">
                  <div className="font-bold text-l mb-2">
                    How to sell an NFT using OpenSea
                  </div>
                </div>
              </a>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="max-w-sm rounded-xl overflow-hidden shadow-lg">
              <a
                href="https://opensea.io/learn/what-is-minting-nft"
                rel="noreferrer"
              >
                <img className="w-full" src={whatIsMinting} alt="" />
                <div className="px-6 py-4">
                  <div className="font-bold text-l mb-2">What is minting?</div>
                </div>
              </a>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="max-w-sm rounded-xl overflow-hidden shadow-lg">
              <a
                href="https://opensea.io/learn/who-is-opensea"
                rel="noreferrer"
              >
                <img className="w-full" src={whoIsOpenSea} alt="" />
                <div className="px-6 py-6">
                  <div className="font-bold text-l mb-4">Who is OpenSea?</div>
                </div>
              </a>
            </div>
          </SwiperSlide>
        </Swiper>
        <div>
          <h1 className="pt-10 pl-4 pb-4 text-xl font-bold">
            Browse by category
          </h1>
          <Swiper
            slidesPerView={5}
            spaceBetween={20}
            slidesPerGroup={5}
            loop={true}
            keyboard={{
              enabled: true,
            }}
            freeMode={true}
            navigation={true}
            modules={[Keyboard, FreeMode, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="max-w-sm rounded-xl overflow-hidden shadow-lg">
                <a
                  href="https://testnets.opensea.io/category/art"
                  rel="noreferrer"
                >
                  <img className="w-full" src={art} alt="" />
                  <div className="px-6 py-4">
                    <div className="font-bold text-l mb-4">Art</div>
                  </div>
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="max-w-sm rounded-xl overflow-hidden shadow-lg">
                <a
                  href="https://testnets.opensea.io/category/collectibles"
                  rel="noreferrer"
                >
                  <img className="w-full" src={collectibles} alt="" />
                  <div className="px-6 py-4">
                    <div className="font-bold text-l mb-4">Collectibles</div>
                  </div>
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="max-w-sm rounded-xl overflow-hidden shadow-lg">
                <a
                  href="https://testnets.opensea.io/category/domain-names"
                  rel="noreferrer"
                >
                  <img className="w-full" src={domainNames} alt="" />
                  <div className="px-6 py-4">
                    <div className="font-bold text-l mb-4">Domain Names</div>
                  </div>
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="max-w-sm rounded-xl overflow-hidden shadow-lg">
                <a
                  href="https://testnets.opensea.io/category/music"
                  rel="noreferrer"
                >
                  <img className="w-full" src={music} alt="" />
                  <div className="px-6 py-4">
                    <div className="font-bold text-l mb-4">Music</div>
                  </div>
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="max-w-sm rounded-xl overflow-hidden shadow-lg">
                <a
                  href="https://testnets.opensea.io/category/photography-category"
                  rel="noreferrer"
                >
                  <img className="w-full" src={photography} alt="" />
                  <div className="px-6 py-4">
                    <div className="font-bold text-l mb-4">Photography</div>
                  </div>
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="max-w-sm rounded-xl overflow-hidden shadow-lg">
                <a
                  href="https://testnets.opensea.io/category/sports"
                  rel="noreferrer"
                >
                  <img className="w-full" src={sports} alt="" />
                  <div className="px-6 py-4">
                    <div className="font-bold text-l mb-4">Sports</div>
                  </div>
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="max-w-sm rounded-xl overflow-hidden shadow-lg">
                <a
                  href="https://testnets.opensea.io/category/trading-cards"
                  rel="noreferrer"
                >
                  <img className="w-full" src={tradingCards} alt="" />
                  <div className="px-6 py-4">
                    <div className="font-bold text-l mb-4">Trading Cards</div>
                  </div>
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="max-w-sm rounded-xl overflow-hidden shadow-lg">
                <a
                  href="https://testnets.opensea.io/category/utility"
                  rel="noreferrer"
                >
                  <img className="w-full" src={utility} alt="" />
                  <div className="px-6 py-4">
                    <div className="font-bold text-l mb-4">Utility</div>
                  </div>
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="max-w-sm rounded-xl overflow-hidden shadow-lg">
                <a
                  href="https://testnets.opensea.io/category/virtual-worlds"
                  rel="noreferrer"
                >
                  <img className="w-full" src={virtualWorlds} alt="" />
                  <div className="px-6 py-4">
                    <div className="font-bold text-l mb-4">Virtual Worlds</div>
                  </div>
                </a>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default MainPage;
