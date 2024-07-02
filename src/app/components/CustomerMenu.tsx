'use client'
import React,{useRef, useEffect} from 'react';
import { Card, Flex, GridItem, Heading, Text } from '@chakra-ui/react'
import Section from './section';
const CustomerMenu = ({menu, showErrorNotFound, loading}:any) => {
  
  const refScreen : any = useRef(null);
  const sections = () => {
    if (menu != null && menu.sections != null) {
      return menu.sections.map((section: any) => {
        return (
          <Section section={section} key={section.id}/>
        )
      })
    }
  }
  useEffect(() => {
    if (refScreen.current) {
      refScreen.current.style.maxHeight = `${window.innerHeight}px`;
    }
  }, []);
  return(
    <>
      <div ref={refScreen}>
      <GridItem area={'nav'} rowSpan={7} colSpan={5}>
        <Card margin={5} height={'100%'}>
          {loading ? <Text textAlign="center">Cargando...</Text> : 
          <>
          {showErrorNotFound || menu == null ? (
            <Text textAlign="center">Restaurante no encontrado</Text>
          ) : (
            <>
              <Flex minWidth="max-content" justifyContent="center" gap="2">
                <Heading size={'xl'}>{menu.restaurantName}</Heading>
              </Flex>
              <Flex direction="column">
                {sections()}  
              </Flex>
            </>
          )}
        </>
        }
        </Card>
      </GridItem>
    </div>
    </>
  )
}

export default CustomerMenu;
