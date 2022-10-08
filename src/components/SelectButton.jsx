import { Button } from '@chakra-ui/react'
import React from 'react'

const SelectButton = ({children, selected ,onClick}) => {
  return (
    <Button onClick={selected?"":onClick} width="20%" backgroundColor={selected?"rgb(100, 181, 246)":""} color={selected?"black":""}>{children}</Button>
  )
}

export default SelectButton