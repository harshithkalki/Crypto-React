import { Box, Heading, TableContainer, Thead ,Tbody, Tr,Th, Table, Td , Img ,Flex , useMediaQuery , Text} from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { CoinList } from '../config/api';
import {CryptoState} from '../CryptoContext';

const CoinsTable = () => {
 const [coins,setcoins]=React.useState([]);
 const [loading,setLoad]=React.useState(false);
 const {cur,sym}=CryptoState();
 const [isNotSmallerScreen]=useMediaQuery("(min-width:600px)")

 const fetchData= async ()=>{
    setLoad(true);
    const {data}=await axios.get(CoinList(cur));
    setLoad(false);
    setcoins(data);
 }
 const numberWithCommas=(x)=>{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

 console.log(coins);
 React.useEffect(()=>{
    fetchData();
 },[cur])
const items=coins.map((coin)=>{
    let profit = coin?.price_change_percentage_24h >= 0;
    return(
        <Tr>
        <Td> <Flex> <Img src={coin?.image}
                        alt={coin.name}
                        height="5vh" mr="1.5vw"
                        style={{marginBottom:10}}></Img> <Box>
                            <Text fontSize={isNotSmallerScreen?"20":"15"}>{(coin?.symbol).toUpperCase()}</Text>
                            <Text fontSize={isNotSmallerScreen?"15":"13"}>{coin?.name}</Text></Box> </Flex></Td>
        <Td>{sym} {numberWithCommas(coin?.current_price)}</Td>
        <Td> <span style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}>{coin?.price_change_percentage_24h.toFixed(3)} %</span></Td>
        <Td>{sym} {numberWithCommas(coin?.market_cap)}</Td>
        </Tr>
    )
})

  return (
    <>
    <Flex textAlign="center" mt={isNotSmallerScreen?"5vh":"5vh"} direction="column" alignItems="center">
    <Heading fontWeight="normal" mb="6vh">
    <span style={{color:"#FFA500"}} >C</span>rypto<span style={{color:"#FFA500"}} >c</span>urrency Prices by Market Cap
    </Heading>
    

    <TableContainer width="90vw">
        <Table>
        <Thead bgColor="#1bc7d3" color="blackAlpha.100" height="8vh">
            <Tr>
                <Th color="black" fontSize="medium">Coin</Th>
                <Th color="black" fontSize="medium">Price</Th>
                <Th color="black" fontSize="medium">24H Change</Th>
                <Th color="black" fontSize="medium">Market Cap</Th>
            </Tr>
        </Thead>
        <Tbody>{items}
        </Tbody>
        </Table>
    </TableContainer>
    </Flex>
    {/* </Box> */}
    </>
      )
}

export default CoinsTable