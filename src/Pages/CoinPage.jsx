import React , {useEffect ,useState}from 'react'
import { useParams } from 'react-router-dom'
import {CryptoState} from '../CryptoContext';
import { SingleCoin , HistoricalChart} from '../config/api';
import {Flex, useMediaQuery , Text, Progress, Img, Box, Heading, CircularProgress } from '@chakra-ui/react';
import axios from 'axios';
import {Line} from "react-chartjs-2";
import {Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from "chart.js";
// import ReactHtmlParser from "react-html-parser";
import CoinInfo from '../components/CoinInfo'

const CoinPage =  () => {
  const [isNotSmallerScreen]=useMediaQuery("(min-width:600px)")
  const [loading,setLoad]=React.useState(false);
  const [graphh, setgraphh]=React.useState();
  const [days, setdays]=useState(1);
  const {id}=useParams();
  const [flag,setFlag]=useState(false);
  const [coin,setcoin]=React.useState([]);
  const {cur,sym}= CryptoState();
  ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);
  const fetchCoin= async ()=>{
    setLoad(true)
    const {data}= await( axios.get(SingleCoin(id)));
    setcoin(data);
    setLoad(false)
  }
  // console.log(coin);
  // function numberWithCommas(x){
  //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
// } 
// const cur_price=coin?.market_data?.current_price[cur.toLowerCase()];
// console.log(cur_price);
// const data= await 
  React.useEffect(()=>{
    fetchCoin();
  },[cur ]);

  //chart _ dependencies
  const fetchChartdata =async ()=>{
    const { data } = await axios.get(HistoricalChart(id,days,cur));
    setFlag(true)
    setgraphh(data.prices);
}
console.log(graphh)
useEffect(()=>{
    fetchChartdata();
},[days]);

  const htmll=
      <span dangerouslySetInnerHTML={{__html: coin?.description?.en.split(". ")[0]}}>
      </span>;
   if(!coin) return <Progress size='xs' isIndeterminate></Progress>;
  return (
    <>{loading?<Progress size='xs' isIndeterminate></Progress>:
    <Flex direction={isNotSmallerScreen?"row":"column"}>
      <Flex width={isNotSmallerScreen?"30vw":"100vw"} direction="column" alignItems="center" mt='25' borderRight="2px solid gray">
        <Img src={coin?.image?.large} height="200" alt={coin?.name}></Img>
        <Heading fontWeight="extrabold">{coin?.name}</Heading>
        {/* <Text padding="1vw">{ReactHtmlParser(coin?.description?.en.split(". ")[0])}</Text> */}
        {/* <Text padding="25" pt="10" width="100%" textAlign="justify">{coin?.description?.en.split(". ")[0]}</Text> */}
        {/* <div  dangerouslySetInnerHtml={{__html:coin?.description?.en.split(". ")[0]}}></div> */}
        <Text padding="25" paddingtop="10" width="100%" textAlign="justify" fontWeight="semibold">{htmll}</Text>
        <Box width="90%">
          <Flex alignItems="center"><Heading mr="1vw"  fontSize="2xl">Rank : </Heading><Text fontSize="2xl">{coin?.coingecko_rank}</Text></Flex>
          <Flex alignItems="center"mt="15"><Heading mr="1vw"  fontSize="2xl">Current Price : </Heading><Text fontSize="2xl" fontWeight="medium">{sym} {
               coin?.market_data?.current_price[cur.toLowerCase()].toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}</Text></Flex>
          <Flex alignItems="center"mt="15"><Heading mr="1vw" fontSize="2xl">market cap : </Heading><Text fontSize="2xl" fontWeight="medium">{" "}{sym} {
                coin?.market_data?.market_cap[cur.toLowerCase()]
                  ?.toString()
                  ?.slice(0, -6).replace(/\B(?=(\d{3})+(?!\d))/g,",")
              }
              M</Text></Flex>
        </Box>
      </Flex>
      {/* <CoinInfo id={coin.id}/> */}
      <Flex width={isNotSmallerScreen?"75vw":"100vw"} flexDirection="column" alignItems="center" justifyContent="center" mt={isNotSmallerScreen?"10vh":"0"} padding={isNotSmallerScreen?"10":"10"} pt={isNotSmallerScreen?"20":"0"}>
            {!graphh | flag === false ? (
                <CircularProgress color='blue.300' isIndeterminate />
            ):(
    <Box minHeight="100%" minWidth="100%"> 
              <Line
                data={{
                  labels:graphh.map((coin) => {
                    let date = new Date(coin[0]);
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                    return days === 1 ? time : date.toLocaleDateString();
                  }),

                  datasets: [
                    {
                      data: graphh.map((coin) => coin[1]),
                      label: `Price ( Past ${days} Days ) in ${cur}`,
                      borderColor: "rgb(100, 181, 246)",
                    },
                  ],
                }}
                options={{
                  elements: {
                    point: {
                      radius: 1,
                    },
                  },
                }}
              />
            </Box>
            )}
        </Flex> 

      
    </Flex>
       }
      </>
)
}

export default CoinPage