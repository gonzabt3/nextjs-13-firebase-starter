'use client'
import React, { useEffect } from 'react';
import { Box, Button, ButtonGroup, Flex, Heading, Icon, IconButton, Spacer } from '@chakra-ui/react';
import { FaUserCircle } from "react-icons/fa";
import 'firebase/auth'
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const context = useAuthContext();
  const router = useRouter();
  const user = (context as any).user;
  const logout = async () => {
    console.log("logout")
    await user.signOut()
  }

  const goToProfilePage = () => {
    router.push('/profile')
  }

  return (
    <div>
      <Flex alignItems='center' gap='1' margin={5}>
        <Box p='2'>
          <Heading size='md'>GoMenu</Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap='1'>
        { (!user) ?
          <>
            <a href={'/singup'}>
              <Button  colorScheme='orange' variant='solid'>
                Registrarse
              </Button> 
            </a>
            <a href={'/signin'}>
              <Button  colorScheme='orange' variant='outline'>Ingresar</Button>
            </a>
            </>
          :
          <>
            <IconButton
              colorScheme='orange' variant='outline'
              aria-label="Profile"
              icon={<Icon as={FaUserCircle}/>}
              onClick={goToProfilePage}
            />         
            <Button  onClick={logout} colorScheme='orange' variant='outline'>Salir</Button>
          </>
        }          
        </ButtonGroup>
      </Flex>
    </div>
  );
};

export default Navbar;