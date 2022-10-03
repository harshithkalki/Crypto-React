import { Heading, Select, HStack , useMediaQuery , Flex, useColorMode, IconButton , useColorModeValue} from '@chakra-ui/react';
import React from 'react';
// import { useHistory } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import { FaMoon, FaSun , FaGithub } from "react-icons/fa";

const Header = () => {
    const [isNotSmallerScreen]=useMediaQuery("(min-width:600px)")
    const [cur,setcur]=React.useState("INR");
    const [top,settop]=React.useState("10");
    const {colorMode,toggleColorMode}=useColorMode();
    const isDark=colorMode==="dark";
    const formBackground = useColorModeValue("gray.500", "gray.900")
    // const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${cur}&order=market_cap_desc&per_page=${top}&page=1&sparkline=false`;
    const changecur=(e)=>{
        setcur(e.target.value);
        e.preventDefault();
    }

    const changetop=(e)=>{
        settop(e.target.value);
        e.preventDefault();
    }
    React.useEffect(()=>{

    })
    // const history=useHistory();
    const navigate = useNavigate();
    return (
        <HStack pt="3"   pb="2vh" >
            <Flex justifyContent="space-between" >
            <Heading pl={isNotSmallerScreen?"5vw":"5"}  onClick={()=> navigate('/')} cursor="pointer"><span style={{color:"#FFA500"}}>C</span>ryp<span style={{color:"#FFA500"}}>T</span>o </Heading>
            <Select width={isNotSmallerScreen?"7vw":"20vw"} ml={isNotSmallerScreen?"65vw":"15vw"} fontSize="xs" onChange={changecur} >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            </Select>
            <IconButton icon={isDark?<FaSun />:<FaMoon />} isRound="true" onClick={toggleColorMode} ml={isNotSmallerScreen?"2vw":"3vw"} ></IconButton>
            <a href="https://github.com/harshithkalki">
            <IconButton ml={isNotSmallerScreen?"2vw":"3vw"}  icon={<FaGithub />} isRound='true' ></IconButton>
            </a> 
            {/* <Select width={isNotSmallerScreen?"7vw":"20vw"} ml={isNotSmallerScreen?"3vw":"4vw"} fontSize="xs" onChange={changecur}>
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="ERU">ERU</option>
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="SOL">SOL</option>
            </Select> */}
            </Flex>
        </HStack>
    )
}
export default Header;
