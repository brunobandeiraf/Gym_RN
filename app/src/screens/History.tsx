import { useState } from 'react';
import { Heading, VStack, SectionList, Text } from 'native-base';

import { HistoryCard } from '@components/HistoryCard';
import { ScreenHeader } from '@components/ScreenHeader';

export function History() {

  const [exercises, setExercises] = useState([
    {
      title: '26.08.22',
      data: ["Puxada frontal", "Remada unilateral"]
    },
    {
      title: '27.08.22',
      data: ["Agachamento Livre", "LegPress 45"]
    }
  ]);

  return (
    <VStack flex={1}>
      <ScreenHeader title='Histórico' />

    {/* Mostra os dados por seções
      SectionList exige que os dados tenham um título e depois os dados
    */}
      <SectionList 
        sections={exercises}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <HistoryCard />
        )}
        // renderSectionHeader - renderiza as seções, agrupadas
        renderSectionHeader={({ section }) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3}>
            {section.title}
          </Heading>
        )}
        px={8}

        // Quando não estiver itens, adicionar as condições ...flex...
        contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: 'center' }}
        // Quando não estiver itens na lista
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center">
            Não há exercícios registrados ainda. {'\n'}
            Vamos fazer exercícios hoje?
          </Text>
        )}

        showsVerticalScrollIndicator={false}
      />

    </VStack>
  );
}