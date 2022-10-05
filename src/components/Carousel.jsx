import { Flex, Img } from '@chakra-ui/react'
import React, { useEffect } from 'react';
import {TrendingCoins } from '../config/api';
import axios from 'axios';
import { CryptoState } from '../CryptoContext';
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom';

const Carousel = () => {
    const [trend,settrent]=React.useState([]);
    const {cur , sym}=CryptoState();
    const fetchTrendingCoins=async()=>{
        const {data} = await axios.get(TrendingCoins(cur));
        settrent(data);
    }
    useEffect(()=>{
        fetchTrendingCoins();
    },[cur]);
    // console.log(trend)

   const numberWithCommas=(x)=>{
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
    }

    const items=trend.map((coin)=>{
        let profit = coin?.price_change_percentage_24h >= 0;
        return(
            <Flex direction="column" alignItems="center" cursor="pointer" color="white">
                <Link to={`/coins/${coin.id}`} >
                    <Img src={coin?.image}
                        alt={coin.name}
                        height="10vh"
                        style={{marginBottom:10}}></Img>
                    <span>{coin?.symbol} &nbsp;<span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span></span>
          <br />
          <span style={{fontSize:22 ,fontWeight: 500}}>
            {sym} {numberWithCommas(coin?.current_price.toFixed(2))}
          </span>
                </Link>
            </Flex>
    )})

  return (
    <Flex height="10vh" alignItems="center" width="80vw">
  <AliceCarousel 
  mouseTracking
  infinite
  autoPlayDirection={1000}
  animationDuration={1500}
  disableDotsControls
  responsive={{0:{items:2},512:{items:4}}}
  autoPlay
  disableButtonsControls
  items={items}></AliceCarousel>

    </Flex>
  )
}

export default Carousel