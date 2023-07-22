import { Text, Pressable, IPressableProps } from 'native-base';
// Pressable - região de clique

type Props  = IPressableProps & {
  name: string;
  isActive: boolean
}

export function Group({ name, isActive, ...rest }: Props) {
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
          
          isPressed={isActive} // Estiver ativo - pressionado
          _pressed={{
            borderColor: 'green.500',
            borderWidth: 1
          }}

          {...rest}
      >
        <Text
          color={isActive ? "green.500" : "gray.200"}
          textTransform="uppercase"
          fontSize="xs"
          fontWeight="bold"
        >
          {name}
        </Text>
    </Pressable>
  );
}