import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { CryptoState } from '../CryptoContext';
import { HistoricalChart } from '../config/api';
import { Box, Flex, CircularProgress , useMediaQuery} from '@chakra-ui/react';
import {Line} from "react-chartjs-2"

const CoinInfo = ({coin}) => {
    const [isNotSmallerScreen]=useMediaQuery("(min-width:600px)")
    const [graphh, setgraphh]=useState();
    const [load,setload]=useState(false);
    const [days, setdays]=useState(1);
    const {cur}=CryptoState();
    // const {id}=useParams();
    // console.log(coin);

    const fetchChartdata =async ()=>{
        const { data } = await axios.get(HistoricalChart(coin.id,days,cur));
        setload(true)
        setgraphh(data.prices);
    }
// console.log(graphh)
    useEffect(()=>{
        fetchChartdata();
    },[days]);
    
    // if(loading) return <Progress size='xs' isIndeterminate></Progress>
    return (
    

        <Flex width="75%" flexDirection="column" alignItems="center" justifyContent="center" mt={isNotSmallerScreen?"25":"0"} padding={isNotSmallerScreen?"40":"20"} pt={isNotSmallerScreen?"20":"0"}>
            {!graphh | load === false ? (
                <CircularProgress color='blue.300' isIndeterminate />
            ):(<>
            {/* <Line
                data={{
                    labels:chart.map((coin)=>{
                        let date=new Date(coin[0]);
                        let time=date.getHours()>12 ? `${date.getHours()-12}:${date.getMinutes()} PM`
                        :`${date.getHours()}:${date.getMinutes()} AM`;

                        return days===1?time:date.toLocaleDateString();
                    }),
                    datasets:[
                        {data:chart.map((coin)=>coin[1])}
                    ]
                }}
                options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
                /> */}


            </>)}
        </Flex>

  )
}

export default CoinInfo