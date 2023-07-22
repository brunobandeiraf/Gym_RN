import { TouchableOpacity } from 'react-native';
import { Heading, HStack, Text, VStack, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

// MaterialIcons - biblioteca de itens
// para funcionar precisa do Icon 

import { UserPhoto } from './UserPhoto';

export function HomeHeader() {
  return (
    // HStack posiciona na horizontal
    // VStack posiciona na vertical
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
       
       <UserPhoto 
        source={{ uri: 'https://github.com/brunobandeiraf.png' }}
        size={16}
        alt="Imagem do usuário"
        mr={4} //margin-right
      />
      
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>

        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          Bruno Bandeira
        </Heading>
      </VStack>

      <TouchableOpacity>
        <Icon 
          as={MaterialIcons}
          name="logout"
          color="gray.200"
          size={7}
        />
      </TouchableOpacity>

    </HStack>
  );
}