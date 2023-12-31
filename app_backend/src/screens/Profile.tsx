import { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { Center, ScrollView, VStack, Skeleton, Text, Heading, useToast } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

const PHOTO_SIZE = 33;

export function Profile() {

  // useState para ter o Skeleton
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  // useState para alterar a foto selecionada
  const [userPhoto, setUserPhoto] = useState('https://github.com/brunobandeiraf.png');
  // useState do alerta toast.show({})
  const toast = useToast();


  // async porque pode levar algum tempo
  async function handleUserPhotoSelected(){
    
    setPhotoIsLoading(true);
    try {
      //launchImageLibraryAsync acessa o album do usuário
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Tipo de conteúdo que pode selecionar
        quality: 1, //de 0 a 1
        aspect: [4, 4], // o tamanho da imagem - 4x4
        allowsEditing: true, // é possível editar a imagem após a seleção?
      });

      if(photoSelected.canceled) {
        return; //selecionou a imagem e cancelou
      }
    
      if(photoSelected.assets[0].uri){
        // Usa a biblioteca FileSystem para retornar as inf. do arquivo selecionado
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);
        console.log(photoInfo);
        
        //if(photoInfo.size && (photoInfo.size  / 1024 / 1024 ) > 2){
        if(photoInfo.exists && (photoInfo.size  / 1024 / 1024 ) > 5){
          // Se a imagem for acima de 5mb
          //return Alert.alert('Essa imagem é muito grande. Escolha uma de até 5MB.'); 
          return toast.show({
            title: 'Essa imagem é muito grande. Escolha uma de até 5MB.',
            placement: 'top', //local que irá aparecer
            bgColor: 'red.500'
          })
        }

        // Se selecionou a foto, o useState faz a alteração do estado
        //setUserPhoto(photoSelected.uri);
        setUserPhoto(photoSelected.assets[0].uri);
      }

    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title='Perfil' />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
        {
          // Efeito para carregar uma imagem alternando cores na ausência de uma foto ou enquanto carrega
          // Se photoIsLoading estiver true aparece Skeleton : senão, UserPhoto
          photoIsLoading ?
              <Skeleton 
                w={PHOTO_SIZE}
                h={PHOTO_SIZE}
                rounded="full"
                startColor="gray.500"
                endColor="gray.400"
              />
            :
              <UserPhoto 
                source={{ uri: userPhoto }}
                alt="Foto do perfil do usuário"
                size={PHOTO_SIZE}
              />
          }

          <TouchableOpacity onPress={handleUserPhotoSelected}>
            <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
              Alterar Foto
            </Text>
          </TouchableOpacity>

          <Input 
            bg="gray.600" 
            placeholder='Nome' 
          />

          <Input 
            bg="gray.600" 
            placeholder="E-mail"
            isDisabled
          />

          <Heading color="gray.200" fontSize="md" mb={2} alignSelf="flex-start" mt={12} fontFamily="heading">
            Alterar senha
          </Heading>

          <Input 
            bg="gray.600"
            placeholder="Senha antiga"
            secureTextEntry //ocultar a senha do usuário
          />

          <Input 
            bg="gray.600"
            placeholder="Nova senha"
            secureTextEntry
          />

          <Input 
            bg="gray.600"
            placeholder="Confirme a nova senha"
            secureTextEntry
          />

          <Button title="Atualizar" mt={4} />
        </Center>

      </ScrollView>
    </VStack>
  );
}