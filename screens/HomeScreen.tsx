import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface Props {
  navigation: any;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Cadastro de Alunos</Text>

      {/* Botão para navegar até a tela de Cadastro de Alunos */}
      <Button
        title="Ir para Cadastro"
        onPress={() => navigation.navigate('Cadastro')} // Navega para a tela de Cadastro
      />
      
      <View style={styles.spacing} />

      {/* Botão para navegar até a tela de Lista de Alunos */}
      <Button
        title="Ver Lista de Alunos"
        onPress={() => navigation.navigate('Lista')} // Navega para a tela de Lista
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
  spacing: {
    marginVertical: 10,
  }
});

export default HomeScreen;
