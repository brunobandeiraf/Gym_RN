import { useState } from 'react';
import { Center, ScrollView, VStack, Skeleton } from 'native-base';

import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';

const PHOTO_SIZE = 33;

export function Profile() {

  // UseState para ter o Skeleton
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  
  return (
    <VStack flex={1}>
      <ScreenHeader title='Perfil' />

      <ScrollView>
        <Center mt={6} px={10}>
        {
            photoIsLoading ?
              // Efeito para carregar uma imagem alternando cores na ausência de uma foto ou enquanto carrega
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
        </Center>
      </ScrollView>
    </VStack>
  );
}