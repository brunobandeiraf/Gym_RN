import { FlatList, HStack, VStack } from 'native-base';

import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import { useState } from 'react';

export function Home() {

  const [groupSelected, setGroupSelected] = useState('Costas')
  const [groups, setGroups] = useState(['Costas', 'Bíceps', 'Tríceps', 'Ombro'])

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList 
        data={groups} //Nome do grupo será a chave
        keyExtractor={item => item} // Desestrutura os itens
        renderItem={({ item }) => ( // Percorre um a um dos itens
          <Group 
            name={item}
            isActive={groupSelected === item}
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
      />

    </VStack>
  );
}