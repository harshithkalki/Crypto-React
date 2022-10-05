import { Box, Heading, TableContainer, Thead ,Tbody, Tr,Th, Table, Td , Img ,Flex} from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { CoinList } from '../config/api';
import {CryptoState} from '../CryptoContext';

const CoinsTable = () => {
 const [coins,setcoins]=React.useState([]);
 const [loading,setLoad]=React.useState(false);
 const {cur,sym}=CryptoState();

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
    return(
        <Tr>
        <Td> <Flex> <Img src={coin?.image}
                        alt={coin.name}
                        height="3.2vh" mr="0.5vw"
                        style={{marginBottom:10}}></Img> {coin?.name} </Flex></Td>
        <Td>{sym} {numberWithCommas(coin?.current_price)}</Td>
        <Td>{coin?.price_change_percentage_24h}</Td>
        <Td>{sym} {numberWithCommas(coin?.market_cap)}</Td>
        </Tr>
    )
})

  return (
    <>
    <Box textAlign="center">
    <Heading fontWeight="normal">
    <span style={{color:"#FFA500"}} >C</span>rypto<span style={{color:"#FFA500"}} >c</span>urrency Prices by Market Cap
    </Heading>
    <TableContainer>
        <Table>
        <Thead>
            <Tr>
                <Th>Coin</Th>
                <Th>Price</Th>
                <Th>24H Change</Th>
                <Th>Market Cap</Th>
            </Tr>
        </Thead>
        <Tbody>{items}
        </Tbody>
        </Table>
    </TableContainer>
    </Box>
    </>
      )
}

export default CoinsTable