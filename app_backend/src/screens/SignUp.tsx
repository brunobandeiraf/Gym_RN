import { useNavigation } from "@react-navigation/native";
import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import { useForm, Controller } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';

import { Input } from "@components/Input";
import { Button } from "@components/Button";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

// Validação dos dados utilizando o Yup
const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
password_confirm: yup.string().required('Confirme a senha.').oneOf([yup.ref('password')/*, null*/], 'A confirmação da senha não confere')
});

export function SignUp() {

  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [passwordConfirm, setPasswordConfirm] = useState('');
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  function handleSignUp({ name, email, password, password_confirm }: FormDataProps) {
    
    //fetch('http://localhost:3333/users', {
    fetch('http://192.168.10.120:3333/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
    .then(response => response.json())
    .then(data => console.log(data));
  

    //console.log({ name, email, password, password_confirm })
    
    // console.log({
    //   name, email, password, passwordConfirm
    // });
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <VStack flex={1} px={10} pb={16}>
          <Image 
            source={BackgroundImg}
            defaultSource={BackgroundImg} //Define que a imagem é padrão e carrega mais rápido
            alt="Pessoas treinando"
            resizeMode="contain"
            position="absolute"
          />

          <Center my={24}>
            <LogoSvg />

            <Text color="gray.100" fontSize="sm">
              Treine sua mente e o seu corpo.
            </Text>
          </Center>

          <Center>
            <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
              Crie sua conta
            </Heading>

            {/* 
            //usando useStates
            <Input 
              placeholder="Nome"
              //Sempre que o setName mudar, o onChangeText vai refletir
              onChangeText={setName}
            /> */}

            <Controller 
              control={control}
              name="name"

              // sem usar o yup
              // rules={{ // campo obrigatório e não envia sem o preenchimento. Mas sem mensagem
              //   required: 'Informe o nome.'
              // }}

              render={({ field: { onChange, value } }) => (
                <Input 
                  placeholder="Nome"
                  onChangeText={onChange}
                  value={value}

                  errorMessage={errors.name?.message}
                />
            )}/>

            {/* <Input 
              placeholder="E-mail" 
              keyboardType="email-address"
              autoCapitalize="none"

              onChangeText={setEmail}
            /> */}
            
            <Controller 
              control={control}
              name="email"

              // sem usar o yup
              // rules={{
              //   required: 'Informe o email.',
              //   pattern: {
              //     value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              //     message: 'E-mail inválido'
              //   }
              // }}

              render={({ field: { onChange, value } }) => (
                <Input 
                  placeholder="E-mail" 
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}

                  errorMessage={errors.email?.message}
                />
              )}/>

            {/* <Input 
              placeholder="Senha" 
              secureTextEntry

              onChangeText={setPassword}
            /> */}
            <Controller 
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input 
                  placeholder="Senha" 
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}

                  errorMessage={errors.password?.message}
                />
              )}
            />

            {/* <Input 
              placeholder="Confirmar a Senha" 
              secureTextEntry

              onChangeText={setPasswordConfirm}
            /> */}
            <Controller 
              control={control}
              name="password_confirm"
              render={({ field: { onChange, value } }) => (
                <Input 
                  placeholder="Confirmar a Senha" 
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(handleSignUp)}
                  returnKeyType="send" // possibilita enviar tendo o foco neste campo
                  errorMessage={errors.password_confirm?.message}
                />
              )}
            />

            <Button 
              title="Criar e acessar" 
              //handleSubmit é a função interna que ativa o hook
              //handleSignUp é a função que recebe
              onPress={handleSubmit(handleSignUp)}
            />
          </Center>

          <Button 
            title="Voltar para o login" 
            variant="outline" 
            mt={12}
            onPress={handleGoBack}
          />
      </VStack>
    </ScrollView>
  );
}