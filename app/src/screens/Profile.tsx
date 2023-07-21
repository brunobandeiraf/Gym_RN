import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Center, ScrollView, VStack, Skeleton, Text, Heading } from 'native-base';
import * as ImagePicker from 'expo-image-picker';

import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

const PHOTO_SIZE = 33;

export function Profile() {

  // UseState para ter o Skeleton
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  
  async function handleUserPhotoSelected(){
    await ImagePicker.launchImageLibraryAsync();
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
                source={{ uri: 'https://github.com/brunobandeira.png' }}
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

          <Heading color="gray.200" fontSize="md" mb={2} alignSelf="flex-start" mt={12}>
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