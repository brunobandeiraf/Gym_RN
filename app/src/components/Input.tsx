import { Input as NativeBaseInput, IInputProps, FormControl } from 'native-base';

type Props = IInputProps & {
  errorMessage?: string | null;
}

//IInputProps habilita o { ...rest}
export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {
  
  //!! para converter para booleano
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} mb={4}>
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
        
        _focus={{ //foco no input
          bgColor: 'gray.700',
          borderWidth: 1,
          borderColor: 'green.500'
        }}
        
        {...rest} 
      />

      <FormControl.ErrorMessage>
        {errorMessage}
      </FormControl.ErrorMessage>
      
    </FormControl>
  );
}