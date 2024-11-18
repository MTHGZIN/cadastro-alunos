import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { Aluno } from '../types/Aluno';

interface Props {
  adicionarAluno: (novoAluno: Aluno) => void;
  navigation: any;
}

const AlunoCadastro: React.FC<Props> = ({ adicionarAluno, navigation }) => {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [mensalidade, setMensalidade] = useState('');
  const [mensalidadePaga, setMensalidadePaga] = useState(false);

  const handleCadastro = () => {
    if (!nome || !idade || !mensalidade) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Validar idade e mensalidade
    const idadeNum = parseInt(idade, 10);
    const mensalidadeNum = parseFloat(mensalidade);

    if (isNaN(idadeNum) || idadeNum <= 0) {
      alert('Idade inválida. Por favor, insira uma idade válida.');
      return;
    }

    if (isNaN(mensalidadeNum) || mensalidadeNum <= 0) {
      alert('Mensalidade inválida. Por favor, insira um valor válido para a mensalidade.');
      return;
    }

    // Adiciona aluno com mensalidade
    const novoAluno: Aluno = {
      nome,
      idade: idadeNum,
      mensalidade: mensalidadeNum,
      mensalidadePaga: mensalidadePaga,
    };

    adicionarAluno(novoAluno);

    // Limpar campos após cadastro
    setNome('');
    setIdade('');
    setMensalidade('');
    setMensalidadePaga(false);

    // Navega para a tela de lista de alunos após cadastro
    navigation.navigate('Lista');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Aluno</Text>

      <TextInput
        placeholder="Nome do Aluno"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Idade"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Mensalidade"
        value={mensalidade}
        onChangeText={setMensalidade}
        keyboardType="numeric"
        style={styles.input}
      />

      {/* Botão para alternar a mensalidade paga */}
      <Button
        title={mensalidadePaga ? "Mensalidade Paga" : "Mensalidade Não Paga"}
        onPress={() => setMensalidadePaga(!mensalidadePaga)}
        color={mensalidadePaga ? 'green' : 'red'}
      />

      <Button title="Cadastrar" onPress={handleCadastro} />
      
      {/* Botão para acessar a lista de alunos */}
      <Button
        title="Ver Lista de Alunos"
        onPress={() => navigation.navigate('Lista')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
  },
});

export default AlunoCadastro;
