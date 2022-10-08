import { Box, Heading, TableContainer,
        Thead ,Tbody,Tr,Th, Table, Td,
        Img ,Flex , useMediaQuery ,
         Text , Progress , useColorMode, IconButton , useColorModeValue, color
         } from '@chakra-ui/react';
import { GrFormPrevious , GrFormNext} from "react-icons/gr";
// import { AiOutlineLeftCircle } from "react-icons/ai";
import axios from 'axios';
import React from 'react';
import { CoinList } from '../config/api';
import {CryptoState} from '../CryptoContext';
import { useNavigate} from 'react-router-dom';


const CoinsTable = () => {
 const [coins,setcoins]=React.useState([]);
 const {colorMode,toggleColorMode}=useColorMode();
 const [page,setpage]=React.useState(1);
 const isDark=colorMode==="dark";
//  const paginationBackground = useColorModeValue("gray.900", "gray.500")
 const [loading,setLoad]=React.useState(false);
 const {cur,sym}=CryptoState();
 const [isNotSmallerScreen]=useMediaQuery("(min-width:600px)");
 const navigate = useNavigate();
//  const paginate = pageNumber => setpage(pageNumber);

 const fetchData= async ()=>{
    setLoad(true);
    const {data}=await axios.get(CoinList(cur));
    setLoad(false);
    setcoins(data);
 }
 const numberWithCommas=(x)=>{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

//  console.log(coins);
 React.useEffect(()=>{
    fetchData();
 },[cur])
const items=coins.map((coin)=>{
    let profit = coin?.price_change_percentage_24h >= 0;
    
    return(
    
        <Tr onClick={()=> navigate(`/coins/${coin.id}`)} _hover={isDark?{background: "gray.600"}:{background:"gray.300"}} cursor="pointer">
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
        <Td>{sym} {numberWithCommas(coin?.market_cap.toString().slice(0, -6))}M</Td>
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
    {loading ?( <Progress size='xs' isIndeterminate /> ):
        <Table>
        <Thead bgColor="#1bc7d3" color="blackAlpha.100" height="8vh">
            <Tr>
                <Th color="black" fontSize="medium">Coin</Th>
                <Th color="black" fontSize="medium">Price</Th>
                <Th color="black" fontSize="medium">24H Change</Th>
                <Th color="black" fontSize="medium">Market Cap</Th>
            </Tr>
        </Thead>
        <Tbody>{items.slice((page-1)*10,(page-1)*10+10)}
        </Tbody>
        </Table>}
    </TableContainer>
    <Flex mt="10vh" width={isNotSmallerScreen?"10vw":"30vw"} justifyContent="space-between" mb="10vh">
        <IconButton isRound="true" onClick={()=>setpage(prev=>((page !==1)?prev-1:1))} icon={<GrFormPrevious /> } backgroundColor={isDark?"gray.500":"gray.400"}></IconButton>
        <IconButton isRound="true" onClick={()=>setpage(prev=>((page !==items.length / 10)?prev + 1:items.length/10))}  icon={<GrFormNext />} backgroundColor={isDark?"gray.500":"gray.400"}></IconButton>
    </Flex>
    </Flex>
    </>
      )
}

export default CoinsTable