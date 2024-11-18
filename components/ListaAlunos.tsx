import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, ScrollView } from 'react-native';
import { Aluno, FuncaoAtualizarAlunos } from '../types/Aluno'; // Importando os tipos

interface Props {
  alunos: Aluno[];
  atualizarAlunos: FuncaoAtualizarAlunos;
}

export default function ListaAlunos({ alunos, atualizarAlunos }: Props) {
  const marcarComoPago = (index: number) => {
    const novosAlunos = [...alunos];
    novosAlunos[index].mensalidadePaga = !novosAlunos[index].mensalidadePaga;
    atualizarAlunos(novosAlunos);
  };

  const excluirAluno = (index: number) => {
    const novosAlunos = alunos.filter((_, i) => i !== index);
    atualizarAlunos(novosAlunos);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Alunos</Text>
      
      {/* Usando FlatList para rolar a lista */}
      <FlatList
        data={alunos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text>{item.nome} - {item.idade} anos</Text>
            <Text>Mensalidade: R$ {item.mensalidade.toFixed(2)}</Text>
            <Text>Endereço: {item.endereco}</Text>
            <Text style={{ color: item.mensalidadePaga ? 'green' : 'red' }}>
              {item.mensalidadePaga ? 'Mensalidade Paga' : 'Mensalidade Não Paga'}
            </Text>
            <Button
              title={item.mensalidadePaga ? 'Mensalidade Paga' : 'Mensalidade Não Paga'}
              onPress={() => marcarComoPago(index)}
              color={item.mensalidadePaga ? 'green' : 'red'}
            />
            <Button
              title="Excluir Aluno"
              onPress={() => excluirAluno(index)}
              color="red"
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  item: {
    padding: 8,
    marginBottom: 8,
    borderBottomWidth: 1,
  },
});
