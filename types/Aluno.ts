// Define o tipo para o endereço de um aluno
export interface Aluno {
  nome: string;
  idade: number;
  mensalidade: number;
  mensalidadePaga: boolean;
  endereco: string; // Novo campo para endereço
}

// Tipagem das funções de adicionar e atualizar alunos
export interface FuncaoAdicionarAluno {
  (novoAluno: Aluno): void;
}

export interface FuncaoAtualizarAlunos {
  (alunos: Aluno[]): void;
}
