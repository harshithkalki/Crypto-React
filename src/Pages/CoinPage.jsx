import React from 'react'
import { useParams } from 'react-router-dom'
import {CryptoState} from '../CryptoContext';
import { SingleCoin , HistoricalChart } from '../config/api';
import {Flex, useMediaQuery , Text, Progress, Img, Box, Heading, color} from '@chakra-ui/react';
import axios from 'axios';
// import ReactHtmlParser from "react-html-parser";
import CoinInfo from '../components/CoinInfo'

const CoinPage = () => {
  const [isNotSmallerScreen]=useMediaQuery("(min-width:600px)")
  const [loading,setLoad]=React.useState(false);
  const {id}=useParams();
  const [coin,setcoin]=React.useState([]);
  const {cur,sym}= CryptoState();

  const fetchCoin=async()=>{
    setLoad(true);
    const {data}=await axios.get(SingleCoin(id));
    setcoin(data);
    setLoad(false);
  }
  // console.log(coin);
  // function numberWithCommas(x){
  //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
// } 
// const cur_price=coin?.market_data?.current_price[cur.toLowerCase()];
// console.log(cur_price);
  React.useEffect(()=>{
    fetchCoin();
  },[]);

  const htmll=
      <div dangerouslySetInnerHTML={{__html: coin?.description?.en.split(". ")[0]}}>
      </div>;
   if(!coin) return <Progress size='xs' isIndeterminate></Progress>
  return (
    <>
    {loading ?( <Progress size='xs' isIndeterminate /> ):
    <Flex direction={isNotSmallerScreen?"row":"column"}>
      <Flex width={isNotSmallerScreen?"25vw":"100vw"} direction="column" alignItems="center" mt='25' borderRight="2px solid gray">
        <Img src={coin?.image?.large} height="200" alt={coin?.name}></Img>
        <Heading fontWeight="extrabold">{coin?.name}</Heading>
        {/* <Text padding="1vw">{ReactHtmlParser(coin?.description?.en.split(". ")[0])}</Text> */}
        {/* <Text padding="25" pt="10" width="100%" textAlign="justify">{coin?.description?.en.split(". ")[0]}</Text> */}
        {/* <div  dangerouslySetInnerHtml={{__html:coin?.description?.en.split(". ")[0]}}></div> */}
        <Text padding="25" paddingtop="10" width="100%" textAlign="justify" fontWeight="semibold">{htmll}</Text>
        <Box width="90%">
          <Flex alignItems="center"><Heading mr="1vw"  fontSize="2xl">Rank : </Heading><Text fontSize="2xl">{coin?.coingecko_rank}</Text></Flex>
          <Flex alignItems="center"mt="15"><Heading mr="1vw"  fontSize="2xl">Current Price : </Heading><Text fontSize="2xl" fontWeight="thin">{sym} {
               coin?.market_data?.current_price[cur.toLowerCase()].toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}</Text></Flex>
          <Flex alignItems="center"mt="15"><Heading mr="1vw" fontSize="2xl">market cap : </Heading><Text fontSize="2xl" fontWeight="thin">{" "}{sym} {
                coin?.market_data?.market_cap[cur.toLowerCase()]
                  ?.toString()
                  ?.slice(0, -6).replace(/\B(?=(\d{3})+(?!\d))/g,",")
              }
              M</Text></Flex>
        </Box>
      </Flex>

      <CoinInfo coin={coin} />
    </Flex>
    }
      </>
)
}

export default CoinPage