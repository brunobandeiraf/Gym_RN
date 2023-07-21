import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Heading, HStack, Text, VStack } from 'native-base';

import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import { ExerciseCard } from '@components/ExerciseCard';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

export function Home() {

  const [groups, setGroups] = useState(['Costas', 'Bíceps', 'Tríceps', 'ombro']);
  const [exercises, setExercises] = useState(['Puxada frontal', 'Remada curvada', 'Remada unilateral', 'Levantamento terras']);
  const [groupSelected, setGroupSelected] = useState('Costas');

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  function handleOpenExerciseDetails() {
    navigation.navigate('exercise');
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList 
        data={groups} //Nome do grupo será a chave
        keyExtractor={item => item} // Desestrutura os itens
        renderItem={({ item }) => ( // Percorre um a um dos itens
          <Group 
            name={item}
            // isActive verifica o grupo muscular ativo
            isActive={groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}

        horizontal // FlatList na horizontal
        showsHorizontalScrollIndicator={false} // Remover barra de scroll
        _contentContainerStyle={{
          px: 8, //padding
        }}
        my={10} // margin vertical 
        maxH={10} // Máximo da altura será 10, senão oculta espaço de toda tela
        minH={10} // Altura mínima
      />

      <VStack px={8}> 
       {/* justifyContent="space-between" - cada um em um canto 
        mb - margin-bottom 
        */}
        <HStack justifyContent="space-between" mb={5}> 
          <Heading color="gray.200" fontSize="md">
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList 
          data={exercises} // Lista de exercícios
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <ExerciseCard onPress={handleOpenExerciseDetails} /> // Cada um dos card
          )}

          showsVerticalScrollIndicator={false}
          // Add um espaço de padding ao final para usuário saber que acabou a lista
          _contentContainerStyle={{
            paddingBottom: 20
          }}
        />

      </VStack>

    </VStack>
  );
}