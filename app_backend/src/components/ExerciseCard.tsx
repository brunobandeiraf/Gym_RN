import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Heading, HStack, Image, Text, VStack, Icon } from 'native-base';

import { Entypo } from '@expo/vector-icons';
import { ExerciseDTO } from '@dtos/ExerciseDTO';
import { api } from '@services/api';

// TouchableOpacityProps é a tipagem do TouchableOpacity
type Props = TouchableOpacityProps & {
  data: ExerciseDTO;
};

// ...rest significa que vai acessar tudo que existe dentro da Props
export function ExerciseCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
        {/* bg - background  do card*/}
      <HStack bg="gray.500" alignItems="center" p={2} pr={4} rounded="md" mb={3}>
        <Image 
          //api.defaults.baseURL - endereço do servidor
          //thumb é uma imagem menor
          // demo é uma imagem maior
          source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}` }}
          alt="Imagem do exercício"
          w={16}
          h={16}
          rounded="md" // Cantos arredondados
          mr={4} //margin-right
          resizeMode="cover" // imagem ajustada
        />

        {/* flex={1} para ocupar todo espaço e um ficar de cada lado */}
        <VStack flex={1}>
            <Heading fontSize="lg" color="white" fontFamily="heading">
              {data.name}
            </Heading>
        
            {/* numberOfLines = define a qtd máxima de linhas */}
            <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
              {data.series} séries x {data.repetitions} repetições
            </Text>
        </VStack>

        <Icon 
          as={Entypo}
          name="chevron-thin-right"
          color="gray.300"
        />
      </HStack>
    </TouchableOpacity>
  );
}