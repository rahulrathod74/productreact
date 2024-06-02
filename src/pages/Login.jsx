
import { Box, Heading ,Button,Input,VStack,Container, useToast} from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../component/AuthContext'
import { Navigate } from 'react-router-dom'

const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const {login,auth:{isLoggedIn}}=useContext(AuthContext)
  const toast=useToast()
  async function handleClick(){
    try {
      let res=await axios({
        method:'post',
        url:"https://reqres.in/api/login",
        data:{
          email,
          password,
        }
      })
      login(res)
    } catch (error) {
      console.log(error);
    }
  }
  if(isLoggedIn){
    toast({
      position: 'top',
      title: 'Login Successful',
      description: "Welcome You Are In Product Page.",
      status: 'success',
      duration: 500,
      isClosable: true,
    })
    return <Navigate to='/product'/> 
    
  }
  
  return (
    <Container >
    <VStack spacing={6}>
      <Heading as="h1" size="xl" >
        Login Page
      </Heading>
      <Input type='email' placeholder='large size' size='lg'  value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
      <Input  type='password' placeholder='large size' size='lg' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
      <Button colorScheme='orange' variant='solid' onClick={handleClick} >
    Login
  </Button>
    </VStack>
    </Container>
  )
}

export default Login