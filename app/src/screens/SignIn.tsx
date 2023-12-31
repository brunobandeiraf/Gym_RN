import { useNavigation } from "@react-navigation/native";
import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";

// Contexto de navegação - sem autenticação
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';

import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignIn() {

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  // Função para chamar rota da tela signUp
  function handleNewAccount() {
    navigation.navigate('signUp');
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

              <Input 
                placeholder="E-mail" 
                keyboardType="email-address"
                autoCapitalize="none" //tudo em minísculo

              />
              <Input 
                placeholder="Senha" 
                secureTextEntry //input de senha
              />

              <Button title="Acessar" />
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