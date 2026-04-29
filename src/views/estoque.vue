<template>
  <main class="inventory-container">
    <header>
      <h1>Controle e estoque de EPIs</h1>
      <p>Gerencie saída e validade dos equipamentos de segurança.</p>
    </header>

    <section class="alerts" aria-live="polite">
      <div v-if="itensCriticos.length > 0" class="alert-box warning">
        <strong>Atenção:</strong> Existem {{ itensCriticos.length }} itens com estoque baixo ou validade próxima.
      </div>
    </section>

    <div class="dashboard-grid">
      <section class="card" aria-labelledby="form-title">
        <h2 id="form-title">Cadastrar novo lote</h2>
        <form @submit.prevent="cadastrarEPI">
          <div class="field">
            <label for="descricao">Descrição do EPI:</label>
            <input type="text" id="descricao" v-model="form.descricao" placeholder="Ex: Protetor auricular" required />
          </div>

          <div class="grid-inputs">
            <div class="field">
              <label for="ca-numero">Nº do CA:</label>
              <input type="text" id="ca-numero" v-model="form.ca" placeholder="00000" required />
            </div>
            <div class="field">
              <label for="quantidade">Qtd. Inicial:</label>
              <input type="number" id="quantidade" v-model.number="form.quantidade" min="1" required />
            </div>
          </div>

          <div class="field">
            <label for="validade">Data de Validade (CA):</label>
            <input type="date" id="validade" v-model="form.validade" required />
          </div>

          <button type="submit" class="btn-add">Adicionar ao Estoque</button>
        </form>
      </section>

      <section class="card list-section" aria-labelledby="list-title">
        <h2 id="list-title">Inventário Atual</h2>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th scope="col">EPI</th>
                <th scope="col">CA</th>
                <th scope="col">Qtd.</th>
                <th scope="col">Validade</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in estoque" :key="item.id">
                <td><strong>{{ item.descricao }}</strong></td>
                <td>{{ item.ca }}</td>
                <td :class="{ 'low-stock': item.quantidade < 10 }">
                  {{ item.quantidade }} un.
                </td>
                <td>{{ formatarData(item.validade) }}</td>
                <td>
                  <span :class="['badge', statusClasse(item.validade)]">
                    {{ statusTexto(item.validade) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

// Dados iniciais (mock)
const estoque = ref([
  { id: 1, descricao: 'Protetor Auricular Plug', ca: '11512', quantidade: 50, validade: '2026-10-15' },
  { id: 2, descricao: 'Óculos de Proteção Incolor', ca: '42714', quantidade: 5, validade: '2024-05-20' }
]);

const form = reactive({
  descricao: '',
  ca: '',
  quantidade: null,
  validade: ''
});

// Lógica de cadastro
const cadastrarEPI = () => {
  estoque.value.push({
    id: Date.now(),
    ...form
  });
  // Reset do form
  Object.assign(form, { descricao: '', ca: '', quantidade: null, validade: '' });
};

// Computed para alertas
const itensCriticos = computed(() => {
  return estoque.value.filter(item => item.quantidade < 10);
});

// Helpers de formatação
const formatarData = (dataStr) => {
  return new Date(dataStr).toLocaleDateString('pt-BR');
};

const statusTexto = (validade) => {
  const hoje = new Date();
  const dataVal = new Date(validade);
  return dataVal < hoje ? 'Vencido' : 'Regular';
};

const statusClasse = (validade) => {
  const hoje = new Date();
  return new Date(validade) < hoje ? 'danger' : 'success';
};
</script>

<style scoped>
.inventory-container {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: system-ui, -apple-system, sans-serif;
  color: #333;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  margin-top: 2rem;
}

@media (max-width: 850px) {
  .dashboard-grid { grid-template-columns: 1fr; }
}

.card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

h2 { margin-top: 0; font-size: 1.25rem; color: #111827; }

.field { margin-bottom: 1.2rem; }
label { display: block; margin-bottom: 0.4rem; font-weight: 500; font-size: 0.9rem; }

input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  box-sizing: border-box;
}

.grid-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.btn-add {
  width: 100%;
  padding: 0.8rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-add:hover { background: #1d4ed8; }

.table-wrapper { overflow-x: auto; }

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

th { text-align: left; padding: 12px; background: #f9fafb; border-bottom: 2px solid #edf2f7; }
td { padding: 12px; border-bottom: 1px solid #edf2f7; }

.low-stock { color: #dc2626; font-weight: bold; }

.badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: bold;
}

.badge.success { background: #dcfce7; color: #166534; }
.badge.danger { background: #fee2e2; color: #991b1b; }

.alert-box.warning {
  background: #fffbeb;
  border-left: 4px solid #f59e0b;
  padding: 1rem;
  margin-bottom: 1.5rem;
  color: #92400e;
}
</style>