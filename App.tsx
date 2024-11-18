import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlunoCadastro from './components/AlunoCadastro';
import ListaAlunos from './components/ListaAlunos';
import HomeScreen from './screens/HomeScreen';
import { Aluno } from './types/Aluno'; // Importando o tipo Aluno

const Stack = createStackNavigator();

export default function App() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  const adicionarAluno = async (novoAluno: Aluno) => {
    try {
      const updatedAlunos = [...alunos, novoAluno];
      setAlunos(updatedAlunos);
      await AsyncStorage.setItem('@alunos', JSON.stringify(updatedAlunos));
    } catch (error) {
      console.error('Erro ao salvar os dados no AsyncStorage:', error);
    }
  };

  const carregarAlunos = async () => {
    try {
      const alunosSalvos = await AsyncStorage.getItem('@alunos');
      if (alunosSalvos) {
        setAlunos(JSON.parse(alunosSalvos));
      }
    } catch (error) {
      console.error('Erro ao carregar os dados do AsyncStorage:', error);
    }
  };

  const atualizarAlunos = async (updatedAlunos: Aluno[]) => {
    try {
      setAlunos(updatedAlunos);
      await AsyncStorage.setItem('@alunos', JSON.stringify(updatedAlunos));
    } catch (error) {
      console.error('Erro ao salvar os dados no AsyncStorage:', error);
    }
  };

  useEffect(() => {
    carregarAlunos();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Cadastro"
          children={(props) => <AlunoCadastro {...props} adicionarAluno={adicionarAluno} />}
        />
        <Stack.Screen
          name="Lista"
          children={(props) => <ListaAlunos {...props} alunos={alunos} atualizarAlunos={atualizarAlunos} />}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
