import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from "@react-navigation/native";
import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from "native-base";

// Contexto de navegação - sem autenticação
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { useAuth } from '@hooks/useAuth';

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';

import { AppError } from '@utils/AppError';

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useState } from 'react';

type FormData = {
  email: string;
  password: string;
}

export function SignIn() {

  // useState para aparecer quando estiver aguardando o retorno do login
  const [isLoading, setIsLoading] = useState(false)

  const { singIn } = useAuth();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const toast = useToast();

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>()

  // Função para chamar rota da tela signUp
  function handleNewAccount() {
    navigation.navigate('signUp');
  }

   async function handleSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true);
      await singIn(email, password);

    } catch (error) {
      const isAppError = error instanceof AppError;

      const title =  isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })

      setIsLoading(false);
    }
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
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body" 
            onPress={handleNewAccount} >
            Ainda não tem acesso?
          </Text>
        </Center>

        <Button 
          title="Acessar" 
          onPress={handleSubmit(handleSignIn)} 
          isLoading={isLoading}
        />
      </VStack>
    </ScrollView>
  );
}