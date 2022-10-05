import axios from 'axios';
import React from 'react';
import { CoinList } from '../config/api';
import {CryptoState} from '../CryptoContext';

const CoinsTable = () => {
 const [coins,setcoins]=React.useState([]);
 const [loading,setLoad]=React.useState(false);
 const {cur}=CryptoState();

 const fetchData= async ()=>{
    setLoad(true);
    const {data}=await axios.get(CoinList(cur));
    setLoad(false);
    setcoins(data);
 }

 console.log(coins);
 React.useEffect(()=>{
    fetchData();
 },[])


  return (
    <div>CoinsTable</div>
  )
}

export default CoinsTable