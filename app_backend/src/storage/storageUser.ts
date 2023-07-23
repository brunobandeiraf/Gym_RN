import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserDTO } from '@dtos/UserDTO';
import { USER_STORAGE } from './storageConfig';

// Salva os dados de autenticação no Storage do usuário
export async function storageUserSave(user: UserDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
}

// Busca os dados salvo no storage
// garante que o usuário feche o app e ao retornar, sempre lembrado o 
// estado de autenticação
export async function storageUserGet() {
  const storage = await AsyncStorage.getItem(USER_STORAGE);

  // Verifica se tem algum conteúdo e se tiver, converte para o tipo UserDTO
  // se não tiver, retorna vazio
  const user: UserDTO = storage ? JSON.parse(storage) : {};

  return user
}