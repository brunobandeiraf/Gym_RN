import { Heading, HStack, Text, VStack } from 'native-base';

export function HomeHeader() {
  return (
    // HStack posiciona na horizontal
    // VStack posiciona na vertical
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <VStack>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>

        <Heading color="gray.100" fontSize="md">
          Bruno
        </Heading>
      </VStack>
    </HStack>
  );
}