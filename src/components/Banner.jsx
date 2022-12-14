import { Box , Flex, Heading, useColorMode} from '@chakra-ui/react'
import React from 'react';
// import immg from './cryptobg.jpg'
import Carousel from './Carousel';

const Banner = () => {
    const {colorMode,toggleColorMode}=useColorMode();
    const isDark=colorMode==="dark";
  return (
    <Box  backgroundImage={isDark?"url('./dark.jpg')":"url('./dark.jpg')"}> {/* light.png */}
        <Flex direction="column" pt="10vh" height="55vh" justifyitems="space-around" alignItems="center" >
            <Flex justifyContent="space-around" alignContent="center" mb="10vh" >
            <Heading color="white" ><span style={{color:"rgb(100, 181, 246)"}} >T</span>rending <span style={{color:"rgb(100, 181, 246)"}}>C</span>oins</Heading>
            </Flex>
            <Carousel />
        </Flex>

    </Box>
  )
}

export default Banner