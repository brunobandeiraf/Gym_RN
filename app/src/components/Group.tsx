import { Text, Pressable, IPressableProps } from 'native-base';
// Pressable - região de clique

type Props  = IPressableProps & {
  name: string;
}

export function Group({ name }: Props) {
  return (
      
      <Pressable
          mr={3}
          w={24}
          h={10}
          bg="gray.600"
          rounded="md" //cantos arredondados
          justifyContent="center"
          alignItems="center"
          overflow="hidden" // manter dentro dos limites do botão
          {...rest}
      >
        <Text
          color="gray.200"
          textTransform="uppercase"
          fontSize="xs"
          fontWeight="bold"
        >
          {name}
        </Text>
    </Pressable>
  );
}