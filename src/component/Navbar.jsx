import { Button, Center, Flex } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from './AuthContext'
let data=[
    {
        to:"/",
        title:"HOME"
    },
    
    {
        to:"/product",
        title:"PRODUCT"
    },
    {
        to:"/login",
        title:"LOGIN"
    },
]
const Navbar = () => {
    const{logout}=useContext(AuthContext)
  return (
    <Flex align="Center" justify='space-around' padding={4} background="lightskyblue"  fontWeight="bold" fontFamily="sans-serif">
        {data.map((ele)=>(
            <Link key={ele.to} to={ele.to}>
                {ele.title}
            </Link>
        ))}
        <Button variant="outline" color="blue" onClick={logout}>LOGOUT</Button>
    </Flex>
  )
}

export default Navbar