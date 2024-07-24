'use client'
import React, { useEffect, useRef } from 'react';
import { Box, Button, Card, GridItem, Heading } from '@chakra-ui/react';
import { CardPayment } from '@mercadopago/sdk-react';
import { initMercadoPago } from '@mercadopago/sdk-react';

initMercadoPago('TEST-28d1010f-acc4-474a-992d-861df9701807');
const Profile = () => {
  const refScreen : any = useRef(null);

  useEffect(() => {
    if (refScreen.current) {
      refScreen.current.style.maxHeight = `${window.innerHeight}px`;
    }
  }, []);

  const pay = async (params : any) => {
    console.log('params', params)
    fetch('http://127.0.0.1:5001/gomenu-test1/us-central1/helloWorld')
  }

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
          <Button
            onClick={pay}
          >mercadopago</Button>
          <CardPayment
            initialization={{ amount: 100 }}
            onSubmit={pay}
          />
        </Card>
      </GridItem>
    </div>
  );
};

export default Profile;