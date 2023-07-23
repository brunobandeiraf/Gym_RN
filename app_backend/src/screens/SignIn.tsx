import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from "@react-navigation/native";
import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";

// Contexto de navegação - sem autenticação
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { useAuth } from '@hooks/useAuth';

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';

import { Input } from "@components/Input";
import { Button } from "@components/Button";

type FormData = {
  email: string;
  password: string;
}

export function SignIn() {

  const { singIn } = useAuth();

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>()

  // Função para chamar rota da tela signUp
  function handleNewAccount() {
    navigation.navigate('signUp');
  }

  function handleSignIn({ email, password }: FormData){
    //console.log(email, password)
    singIn(email, password);
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>

      <VStack flex={1} px={10} pb={16}>
        {/* px padding
            bg é background */}
          <Image 
              source={BackgroundImg}
              defaultSource={BackgroundImg}
              alt="Pessoas treinando"
              resizeMode="contain"
              position="absolute"
          />
          {/* my é posicionamento na vertical */}
          <Center my={24}>
              <LogoSvg />

              <Text color="gray.100" fontSize="sm">
                  Treine sua mente e o seu corpo.
              </Text>
          </Center>
          {/* mb é margin-bottom */}
          <Center>
              <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
                  Acesse a conta
              </Heading>

              {/* <Input 
                placeholder="E-mail" 
                keyboardType="email-address"
                autoCapitalize="none" //tudo em minísculo
              /> */}
              <Controller 
                control={control}
                name="email"
                rules={{ required: 'Informe o e-mail' }}
                
                render={({ field: { onChange } }) => (
                  <Input 
                    placeholder="E-mail" 
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={onChange}
                    errorMessage={errors.email?.message}
                  />
                )}
              />
                
               {/* <Input 
                 placeholder="Senha" 
                 secureTextEntry //input de senha
               /> */}
              <Controller 
                control={control}
                name="password"
                rules={{ required: 'Informe a senha' }}
                
                render={({ field: { onChange } }) => (
                  <Input 
                    placeholder="Senha" 
                    secureTextEntry
                    onChangeText={onChange}
                    errorMessage={errors.password?.message}
                  />
                )}
              />
              
               {/* <Button title="Acessar" /> */}
               <Button title="Acessar" onPress={handleSubmit(handleSignIn)} />
        </Center>

        <Center mt={24}> {/* mt - margin-top, mb - margin-bottom*/}
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda não tem acesso?
          </Text>
        </Center>

        <Button 
            title="Criar Conta" 
            variant="outline"
            onPress={handleNewAccount}
        />
      </VStack>
    </ScrollView>
  );
}