import { Heading, HStack, Text, VStack } from 'native-base';

export function HomeHeader() {
  return (
    // HStack posiciona na horizontal
    // VStack posiciona na vertical
    <HStack> 
      <VStack>
        <Text color="gray.100">
          Olá,
        </Text>

        <Heading color="gray.100">
          Bruno
        </Heading>
      </VStack>
    </HStack>
  );
}