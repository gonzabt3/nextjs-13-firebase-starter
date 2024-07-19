'use client'
import { Box, Card, GridItem, Heading } from '@chakra-ui/react';
import react, { useEffect, useRef } from 'react';

const Profile = () => {
  const refScreen : any = useRef(null);

  useEffect(() => {
    if (refScreen.current) {
      refScreen.current.style.maxHeight = `${window.innerHeight}px`;
    }
  }, []);
  return (
    <div ref={refScreen} >
      <GridItem area={'nav'}  rowSpan={7} colSpan={5}>
        <Card  margin={5} height={'100%'}>
          <Box p='2'>
            <Heading>Perfil</Heading>
          </Box>
          <Box p={'2'}>
            <Heading size={'sm'}>Pagos</Heading>
          </Box>
          Plan: Premium
        </Card>
      </GridItem>
    </div>
  );
};

export default Profile;