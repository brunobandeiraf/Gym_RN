import { TouchableOpacity } from 'react-native';
import { Box, Heading, HStack, Icon, Image, Text, VStack, ScrollView } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

// Imagens do projeto
import BodySvg from '@assets/body.svg';
import SeriesSvg from '@assets/series.svg';
import RepetitionsSvg from '@assets/repetitions.svg';

import { Button } from '@components/Button';

export function Exercise() {

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon 
            as={Feather}
            name="arrow-left"
            color="green.500"
            size={6}
          />
        </TouchableOpacity>

        {/* justifyContent="space-between" - um item para cada lado */}
        <HStack justifyContent="space-between" mt={4} mb={8} alignItems="center">
          <Heading color="gray.100" fontSize="lg"  flexShrink={1} fontFamily="heading">
            {/* flexShrink={1} - quebra pra linha de baixo sem influenciar no outro item */}
            Puxada frontal
          </Heading>

          <HStack alignItems="center">
            <BodySvg />
            {/* textTransform="capitalize" - primeira letra me maiúsculo */}
            <Text color="gray.200" ml={1} textTransform="capitalize">
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView>
        <VStack p={8}>
          <Image
            w="full"
            h={80}
            source={{ uri: 'http://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg' }}
            alt="Nome do exercício"
            mb={3}
            resizeMode="cover" //encaixar com toda região da imagem
            rounded="lg" //cantos arrendodados
          />

          {/* Box como se fosse a View do RN 
            rounded="md" - campos arrendados
          */}
          <Box bg="gray.600" rounded="md" pb={4} px={4}>   
          {/* justifyContent="space-around" -  cada um espaçado para cada lado */}
            <HStack alignItems="center" justifyContent="space-around" mb={6} mt={5}>
              <HStack>
              <SeriesSvg />{/* componente da img */}
                <Text color="gray.200" ml="2">
                  3 séries
                </Text>
              </HStack>

              <HStack>
                <RepetitionsSvg />
                <Text color="gray.200" ml="2">
                  12 repetições
                </Text>
              </HStack>
            </HStack>

            <Button 
              title="Marcar como realizado"
            />
          </Box>
        
        </VStack>
      </ScrollView>

    </VStack>
  );
}