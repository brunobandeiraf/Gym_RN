import { Input as NativeBaseInput, IInputProps } from 'native-base';

//IInputProps habilita o { ...rest}
export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput 
      bg="gray.700" //background
      h={14} //altura
      px={4} //padding
      borderWidth={0}
      fontSize="md" //maior
      color="white"
      fontFamily="body" //mesma font do body
      mb={4} //margin-bottom
      placeholderTextColor="gray.300"
      _focus={{
        bgColor: 'gray.700',
        borderWidth: 1,
        borderColor: 'green.500'
      }}
      {...rest} 
    />
  );
}