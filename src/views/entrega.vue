<template>
  <main class="delivery-container">
    <header>
      <h1>Registro de Entrega de EPIs</h1>
      <p>Formalize a entrega do equipamentos de proteção aos colaboradores.</p>
    </header>

    <div class="delivery-grid">
      <section class="card" aria-labelledby="registro-title">
        <h2 id="registro-title">Nova Entrega</h2>
        <form @submit.prevent="registrarEntrega">
          
          <div class="field">
            <label for="funcionario">Colaborador:</label>
            <select id="funcionario" v-model="transacao.funcionarioId" required>
              <option value="">Selecione o funcionário...</option>
              <option v-for="f in funcionarios" :key="f.id" :value="f.id">
                {{ f.nome }} ({{ f.cargo }})
              </option>
            </select>
          </div>

          <div class="field">
            <label for="epi">Equipamento (EPI):</label>
            <select id="epi" v-model="transacao.epiId" required>
              <option value="">Selecione o item...</option>
              <option v-for="e in estoque" :key="e.id" :value="e.id">
                {{ e.descricao }} - CA: {{ e.ca }} (Disp: {{ e.quantidade }})
              </option>
            </select>
          </div>

          <div class="grid-inputs">
            <div class="field">
              <label for="qtd-entrega">Quantidade:</label>
              <input type="number" id="qtd-entrega" v-model.number="transacao.quantidade" min="1" required />
            </div>
            <div class="field">
              <label for="data-entrega">Data de Entrega:</label>
              <input type="date" id="data-entrega" v-model="transacao.data" required />
            </div>
          </div>

          <div class="field checkbox-group">
            <input type="checkbox" id="termo" v-model="transacao.aceitouTermo" required />
            <label for="termo">O colaborador confirma o recebimento e o treinamento de uso.</label>
          </div>

          <button type="submit" class="btn-confirm" :disabled="!transacao.aceitouTermo">
            Confirmar Entrega e Gerar Recibo
          </button>
        </form>
      </section>

      <section class="card list-section" aria-labelledby="historico-title">
        <h2 id="historico-title">Entregas Realizadas</h2>
        <div class="table-wrapper">
          <table summary="Lista das últimas entregas de EPI realizadas">
            <thead>
              <tr>
                <th scope="col">Data</th>
                <th scope="col">Colaborador</th>
                <th scope="col">EPI</th>
                <th scope="col">Qtd.</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="entrega in historico" :key="entrega.id">
                <td>{{ formatarData(entrega.data) }}</td>
                <td>{{ getNomeFuncionario(entrega.funcionarioId) }}</td>
                <td>{{ getNomeEPI(entrega.epiId) }}</td>
                <td>{{ entrega.quantidade }} un.</td>
                <td>
                  <button @click="imprimirRecibo(entrega)" class="btn-icon" title="Imprimir Recibo">
                    🖨️
                  </button>
                </td>
              </tr>
              <tr v-if="historico.length === 0">
                <td colspan="5" class="text-center">Nenhuma entrega registrada hoje.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive } from 'vue';

// Dados Mockados (Simulando Banco de Dados)
const funcionarios = ref([
  { id: 101, nome: 'Carlos Andrade', cargo: 'Soldador' },
  { id: 102, nome: 'Marina Silva', cargo: 'Técnica de Elétrica' }
]);

const estoque = ref([
  { id: 1, descricao: 'Luva de Vaqueta', ca: '12345', quantidade: 25 },
  { id: 2, descricao: 'Capacete com Carneira', ca: '9876', quantidade: 10 }
]);

const historico = ref([]);

// Estado do formulário
const transacao = reactive({
  funcionarioId: '',
  epiId: '',
  quantidade: 1,
  data: new Date().toISOString().substr(0, 10),
  aceitouTermo: false
});

// Lógica de Registro
const registrarEntrega = () => {
  const novaEntrega = {
    id: Date.now(),
    ...JSON.parse(JSON.stringify(transacao))
  };

  // 1. Adiciona ao histórico
  historico.value.unshift(novaEntrega);

  // 2. Simula baixa no estoque
  const itemEstoque = estoque.value.find(e => e.id === transacao.epiId);
  if (itemEstoque) itemEstoque.quantidade -= transacao.quantidade;

  // 3. Reseta formulário
  transacao.funcionarioId = '';
  transacao.epiId = '';
  transacao.quantidade = 1;
  transacao.aceitouTermo = false;

  alert('Entrega registrada com sucesso!');
};

// Funções Auxiliares
const getNomeFuncionario = (id) => funcionarios.value.find(f => f.id === id)?.nome || 'N/A';
const getNomeEPI = (id) => estoque.value.find(e => e.id === id)?.descricao || 'N/A';
const formatarData = (d) => d.split('-').reverse().join('/');

const imprimirRecibo = (entrega) => {
  alert(`Gerando PDF de recibo para ${getNomeFuncionario(entrega.funcionarioId)}...`);
};
</script>

<style scoped>
.delivery-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: 'Segoe UI', Roboto, sans-serif;
}

.delivery-grid {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 2rem;
  align-items: start;
}

@media (max-width: 900px) {
  .delivery-grid { grid-template-columns: 1fr; }
}

.card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-top: 4px solid #059669; /* Verde esmeralda */
}

.field { margin-bottom: 1rem; }
label { display: block; margin-bottom: 0.5rem; font-weight: 600; font-size: 0.9rem; }

select, input {
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background-color: #f9fafb;
}

.grid-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #ecfdf5;
  padding: 10px;
  border-radius: 4px;
}

.checkbox-group input { width: auto; }
.checkbox-group label { margin-bottom: 0; cursor: pointer; }

.btn-confirm {
  width: 100%;
  padding: 1rem;
  background: #059669;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
}

.btn-confirm:disabled { background: #9ca3af; cursor: not-allowed; }

.table-wrapper { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
th { text-align: left; padding: 12px; border-bottom: 2px solid #e5e7eb; color: #374151; }
td { padding: 12px; border-bottom: 1px solid #f3f4f6; }

.btn-icon { background: none; border: none; cursor: pointer; font-size: 1.2rem; }
.text-center { text-align: center; color: #6b7280; padding: 2rem; }
</style>