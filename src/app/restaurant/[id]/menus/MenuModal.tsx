import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Input,
  Stack,
} from '@chakra-ui/react';
import { getDatabase, ref, push, set } from 'firebase/database';
import { useAuthContext } from '@/context/AuthContext';
import firebase_app from '@/firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import QRCode from 'qrcode'
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
const generateQRCode = async (url : string) => {
  try {
    const qrCode = await QRCode.toDataURL(url);
    return qrCode
  } catch (err) {
    console.error(err);
  }
};

const addQrCode = async (id: string) => {
  const baseUrl = window.location.origin;
  const qrCode = await generateQRCode(baseUrl+'/menu/'+id)
  try {
    const db = getFirestore(firebase_app);
    const menuDocRed = doc(db, 'menus', id);
    await updateDoc(menuDocRed, {qrCode: qrCode});   
    console.log('Document updated successfully!');
  } catch (error) {
    console.error('Error updating document: ', error);
  }
}


const MenuModal = ({isOpen, close, restaurantId, restaurant}:any) => {
  const context = useAuthContext();
  const handleSubmit = async (values :any ) => {
    console.log('Form values:', values);
    
    console.log('rest', restaurant);
    const db = getFirestore(firebase_app);

    addDoc(collection(db, 'menus'), {
      ...values,
      restaurantId: restaurantId,
      sections:[],
      delete: false,
      restaurantName: restaurant.name,
    })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
      close();
      addQrCode(docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
  };

  const  handleOnClose = () => {
    close();
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleOnClose} >
        <ModalOverlay />
        <ModalContent>
        <Formik
              initialValues={{ 
                name: '',
                type: '',
                description: '',
              }}
              onSubmit={handleSubmit}
            >
          <Form>
          <ModalHeader>Nuevo Menu</ModalHeader>
          <ModalCloseButton onClick={() => handleOnClose} />
          <ModalBody>
           
                <Stack spacing={4}>
                  <Field name="name">
                    {({ field }:any) => (
                      <FormControl>
                        <Input {...field} type="text" placeholder="Nombre" />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="description">
                    {({ field }:any) => (
                      <FormControl>
                        <Input {...field} type="text" placeholder="Descripcion" />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="type">
                    {({ field }:any) => (
                      <FormControl>
                        <Input {...field} type="text" placeholder="Tipo" />
                      </FormControl>
                    )}
                  </Field>
                </Stack>
          </ModalBody>
          <ModalFooter>
            <Button  colorScheme='orange' mr={3} type="submit">
              Guardar
            </Button>
            <Button variant='ghost'>Cancelar</Button>
          </ModalFooter>
          </Form>
            </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MenuModal;
