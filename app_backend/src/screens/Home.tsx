import { useState, useEffect, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FlatList, Heading, HStack, Text, useToast, VStack } from 'native-base';

import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import { ExerciseDTO } from '@dtos/ExerciseDTO';

import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import { ExerciseCard } from '@components/ExerciseCard';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

import { Loading } from '@components/Loading';

export function Home() {
  const [isLoading, setIsLoading] = useState(true);

  //const [groups, setGroups] = useState(['Costas', 'Bíceps', 'Tríceps', 'ombro']);
  const [groups, setGroups] = useState<string[]>([]);
  //const [exercises, setExercises] = useState(['Puxada frontal', 'Remada curvada', 'Remada unilateral', 'Levantamento terras']);
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  // Grupo selecionado
  const [groupSelected, setGroupSelected] = useState('bíceps');

  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  function handleOpenExerciseDetails() {
    navigation.navigate('exercise');
  }


  //  Buscar os grupos musculares
  async function fetchGroups() {
    try {
      const response = await api.get('/groups');
      setGroups(response.data); // atualiza o useState

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os grupos musculares';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  //useEffect para ficar sempre atualizando o estado
  useEffect(() => {
    fetchGroups();
  },[])


  // Busca os exercícios dos grupos
  async function fecthExercisesByGroup() {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/bygroup/${groupSelected}`);
      setExercises(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os exercícios';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }finally {
      setIsLoading(false);
    }
  }
  // useFocusEffect e useCallback percebe quando a home recebe o foco para atualizar a lista
  // hook disparado após um evento
  useFocusEffect(
    useCallback(() => {
      fecthExercisesByGroup()
    },[groupSelected])
  )

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

      {
        // isLoading é true, carrega a tela de loading, se não, o restante
        isLoading ? <Loading/> :
        <VStack px={8}> 
        {/* justifyContent="space-between" - cada um em um canto 
          mb - margin-bottom 
          */}
          <HStack justifyContent="space-between" mb={5}> 
            <Heading color="gray.200" fontSize="md" fontFamily="heading">
              Exercícios
            </Heading>

            <Text color="gray.200" fontSize="sm">
              {exercises.length}
            </Text>
          </HStack>

          <FlatList 
            data={exercises} // Lista de exercícios
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ExerciseCard 
                onPress={handleOpenExerciseDetails}
                data={item}
              /> // Cada um dos card
            )}

            showsVerticalScrollIndicator={false}
            // Add um espaço de padding ao final para usuário saber que acabou a lista
            _contentContainerStyle={{
              paddingBottom: 20
            }}
          />

        </VStack>
      }
    </VStack>
  );
}