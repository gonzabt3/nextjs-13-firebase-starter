'use client'
import React, { useEffect, useRef } from 'react';
import { Box, Button, Card, GridItem, Heading } from '@chakra-ui/react';
import { CardPayment } from '@mercadopago/sdk-react';
import { initMercadoPago } from '@mercadopago/sdk-react';
import axios from 'axios';

initMercadoPago('TEST-28d1010f-acc4-474a-992d-861df9701807');
const Profile = () => {
  const refScreen : any = useRef(null);

  useEffect(() => {
    if (refScreen.current) {
      refScreen.current.style.maxHeight = `${window.innerHeight}px`;
    }
  }, []);

  useEffect(() => {
    const userId = 1
    const rootPath = "https://suscriptions-6e5dzo5roa-uc.a.run.app";  
    axios.get(rootPath+'/suscriptions?userId='+userId, )
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  })

  const pay = async (params : any) => {
    const userId = 1
    const rootPath = "https://suscriptions-6e5dzo5roa-uc.a.run.app";  
    const payload ={
      userId: userId,
      ...params
    }
    axios.post(rootPath+'/pay', payload )
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
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