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
              <label for="descricao">Nome do equipamento EPI:</label>
              <input type="text" id="descricao" v-model="form.nome_equipamento" placeholder="Ex: Protetor auricular" required />
            </div>

            <div class="grid-inputs">
              <div class="field">
                <label for="ca-numero">N° CA:</label>
                <input type="text" id="ca-numero" v-model="form.ca" placeholder="00000" required />
              </div>
              <div class="field">
                <label for="quantidade">Qtd. Inicial:</label>
                <input type="number" id="quantidade" v-model="form.quantidade" min="1" required />
              </div>
            </div>

            <div class="field">
              <label for="validade">Data de Validade (CA):</label>
              <input type="date" id="validade" v-model="form.data_validade" required />
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
                  <td><strong>{{ item.nome_equipamento }}</strong></td>
                  <td>{{ item.ca }}</td>
                  <td :class="{ 'low-stock': item.quantidade < 10 }">
                    {{ item.quantidade }} un.
                  </td>
                  <td>{{ formatarData(item.data_validade) }}</td>
                  <td>
                    <span :class="['badge', statusClasse(item.data_validade)]">
                      {{ statusTexto(item.data_validade) }}
                    </span>
                  </td>
                </tr>
                <tr v-if="estoque.length === 0">
                  <td colspan="5" style="text-align: center; padding: 2rem; color: #666;">
                    Nenhum EPI cadastrado ou carregando...
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
  import { ref, reactive, computed, onMounted } from 'vue';
  import { useSupabase } from '../composables/useSupabase';

  const { supabase } = useSupabase();

  const estoque = ref([]);

  const form = reactive({ 
    nome_equipamento: '', 
    ca: '', 
    quantidade: null, 
    data_validade: '' 
  });

  const carregar = async () => {
    const { data, error } = await supabase.from('estoque').select('*').order('nome_equipamento');
    if (error) {
      console.error("Erro ao carregar:", error.message);
    } else {
      // CORREÇÃO: Trocado data_validade por data
      estoque.value = data || [];
    }
  };

  onMounted(() => {
    carregar();
  });

  const cadastrarEPI = async () => {
    try {
      const { data, error } = await supabase
        .from('estoque')
        .insert([
          { 
            // CORREÇÃO: Mapeamento correto dos campos conforme o form reativo
            nome_equipamento: form.nome_equipamento, 
            ca: form.ca, 
            quantidade: form.quantidade, 
            data_validade: form.data_validade 
          }
        ])
        .select();

      if (error) throw error;

      if (data) {
        estoque.value.push(data[0]);
      }

      Object.assign(form, { nome_equipamento: '', ca: '', quantidade: null, data_validade: '' });
      alert("EPI cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar EPI:", error.message);
      alert("Não foi possível salvar o EPI. Verifique se as colunas no Supabase estão com letras minúsculas.");
    }
  };

  const itensCriticos = computed(() => {
    return estoque.value.filter(item => item.quantidade < 10);
  });

  const formatarData = (dataStr) => {
    if (!dataStr) return '---';
    const data = new Date(dataStr + 'T00:00:00');
    return data.toLocaleDateString('pt-BR');
  };

  const statusTexto = (validade) => {
    if (!validade) return '---';
    const hoje = new Date();
    hoje.setHours(0,0,0,0);
    const dataVal = new Date(validade + 'T00:00:00');
    return dataVal < hoje ? 'Vencido' : 'Regular';
  };

  const statusClasse = (validade) => {
    if (!validade) return 'success';
    const hoje = new Date();
    hoje.setHours(0,0,0,0);
    const dataVal = new Date(validade + 'T00:00:00');
    return dataVal < hoje ? 'danger' : 'success';
  };
  </script>

  <style scoped>
  /* Seu CSS original permanece aqui... */
  .inventory-container { max-width: 1100px; margin: 2rem auto; padding: 0 1rem; font-family: system-ui, -apple-system, sans-serif; color: #333; }
  .dashboard-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 2rem; margin-top: 2rem; }
  @media (max-width: 850px) { .dashboard-grid { grid-template-columns: 1fr; } }
  .card { background: #fff; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb; }
  h2 { margin-top: 0; font-size: 1.25rem; color: #111827; }
  .field { margin-bottom: 1.2rem; }
  label { display: block; margin-bottom: 0.4rem; font-weight: 500; font-size: 0.9rem; }
  input { width: 100%; padding: 0.6rem; border: 1px solid #d1d5db; border-radius: 6px; box-sizing: border-box; }
  .grid-inputs { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .btn-add { width: 100%; padding: 0.8rem; background: #34495E; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
  .btn-add:hover { background: #2c3e50; }
  .table-wrapper { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
  th { text-align: left; padding: 12px; background: #f9fafb; border-bottom: 2px solid #edf2f7; }
  td { padding: 12px; border-bottom: 1px solid #edf2f7; }
  .low-stock { color: #dc2626; font-weight: bold; }
  .badge { padding: 4px 8px; border-radius: 12px; font-size: 0.75rem; text-transform: uppercase; font-weight: bold; }
  .badge.success { background: #dcfce7; color: #16a34a; }
  .badge.danger { background: #fee2e2; color: #991b1b; }
  .alert-box.warning { background: #fffbeb; border-left: 4px solid #f59e0b; padding: 1rem; margin-bottom: 1.5rem; color: #92400e; }
  </style>