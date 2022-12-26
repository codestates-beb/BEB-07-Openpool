//modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, FreeMode, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

// 위의 swiper를 이용해서 슬라이드를 구현하세요!
// swiper를 이용하면 손쉽게 슬라이드를 구현할 수 있습니다.
// 참고로 OpenSea도 swiper를 이용하고 있어서 여러 프로젝트에 사용되고 있다는 것을 알 수 있습니다.
// 슬라이드에 들어가는 이미지와 설명들은 임의로 만들어서 사용해주세요.

const MainPage = () => {
  return (
    <>
      <div className="flex justify-center">
        <p className="text-5xl font-extrabold">
          Explore, collect, and sell NFTs
        </p>
      </div>
      <div className="main"></div>
      <div>
        <h1 className="text-xl font-bold">NFT 101</h1>
        <p>Get comfortable with the basics.</p>
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
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
            <a href="https://opensea.io/learn/what-are-nfts" rel="noreferrer">
              What is an NFT?
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a
              href="https://opensea.io/learn/what-is-crypto-wallet"
              rel="norefferer"
            >
              What is a crypto wallet?
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a href="https://opensea.io/learn/nft-gas-fees" rel="norefferer">
              What are blockchain gas fees?
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a href="https://opensea.io/learn/how-to-buy-nft" rel="norefferer">
              How to buy an NFT
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a
              href="https://opensea.io/learn/how-to-create-an-nft"
              rel="norefferer"
            >
              How to create an NFT on OpenSea
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a
              href="https://opensea.io/learn/how-to-sell-nfts"
              rel="norefferer"
            >
              How to sell an NFT using OpenSea
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a
              href="https://opensea.io/learn/what-is-minting-nft"
              rel="norefferer"
            >
              What is minting?
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a href="https://opensea.io/learn/who-is-opensea" rel="norefferer">
              Who is OpenSea?
            </a>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default MainPage;
