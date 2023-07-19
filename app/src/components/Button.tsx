import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base';

// tipagem do tipo botton
type Props = IButtonProps & {
  title: string;
  variant?: 'solid' | 'outline';
}
// ? é opcinal

//{ title, ...rest } são as propriedades do botão
export function Button({ title, variant = 'solid', ...rest }: Props) {
  return (
    <ButtonNativeBase
        w="full" //width
        h={14}  //height

        bg={variant === 'outline' ? 'transparent' : 'green.700'}
        // Se for outline terá a bordar transparent
        // se não, será green.700

        borderWidth={variant === 'outline' ? 1 : 0}
        borderColor="green.500" // cor da borda

        rounded="sm" //cantos arrendodados
        
        _pressed={{ //quando estiver precionando
            bg: variant === 'outline' ? 'gray.500' : 'green.500'  
        }}

        {...rest}
    >
    <Text 
        color={variant === 'outline' ? 'green.500' : 'white'}
        fontFamily="heading"
        fontSize="sm"
    >
        {title}
    </Text>
    </ButtonNativeBase>
  );
}