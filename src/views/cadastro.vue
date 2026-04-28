<template>
  <main class="container">
    <header>
      <h1>Gestão de Funcionarios</h1>
      <p>Cadastre e gerencie os membros da sua equipe.</p>
    </header>

    <hr />

    <section aria-labelledby="form-title">
      <h2 id="form-title">Novo Cadastro</h2>
      <form @submit.prevent="adicionarFuncionario">
        <fieldset>
          <legend>Dados Pessoais e Profissionais</legend>
          
          <div class="form-group">
            <label for="nome">Nome Completo:</label>
            <input 
              type="text" 
              id="nome" 
              v-model="novoFuncionario.nome" 
              placeholder="Ex: João Silva" 
              required 
            />
          </div>

          <div class="form-group">
            <label for="cargo">Cargo:</label>
            <input 
              type="text" 
              id="cargo" 
              v-model="novoFuncionario.cargo" 
              placeholder="Ex: Desenvolvedor Front-end" 
              required 
            />
          </div>

          <div class="form-group">
            <label for="email">E-mail:</label>
            <input 
              type="email" 
              id="email" 
              v-model="novoFuncionario.email" 
              placeholder="email@empresa.com" 
              required 
            />
          </div>

          <button type="submit" class="btn-primary">Cadastrar Funcionário</button>
        </fieldset>
      </form>
    </section>

    <hr />

    <section aria-labelledby="list-title">
      <h2 id="list-title">Funcionários Ativos</h2>
      
      <table v-if="funcionarios.length > 0">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Cargo</th>
            <th scope="col">E-mail</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(func, index) in funcionarios" :key="index">
            <td>{{ func.nome }}</td>
            <td>{{ func.cargo }}</td>
            <td>{{ func.email }}</td>
            <td>
              <button @click="removerFuncionario(index)" class="btn-danger">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <p v-else>Nenhum funcionário cadastrado no momento.</p>
    </section>
  </main>
</template>

<script setup>
import { ref, reactive } from 'vue';

// Estado da lista de funcionários
const funcionarios = ref([
  { nome: 'Ana Souza', cargo: 'Gerente de Projetos', email: 'ana@empresa.com' }
]);

// Estado do formulário (reativo)
const novoFuncionario = reactive({
  nome: '',
  cargo: '',
  email: ''
});

// Método para adicionar funcionário
const adicionarFuncionario = () => {
  funcionarios.value.push({ ...novoFuncionario });
  
  // Limpar formulário
  novoFuncionario.nome = '';
  novoFuncionario.cargo = '';
  novoFuncionario.email = '';
};

// Método para remover funcionário
const removerFuncionario = (index) => {
  if (confirm('Deseja realmente excluir este funcionário?')) {
    funcionarios.value.splice(index, 1);
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

fieldset {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  text-align: left;
  padding: 12px;
  border-bottom: 1px solid #eee;
}

.btn-primary {
  background-color: #42b983;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-danger {
  background-color: #ff5252;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}
</style>