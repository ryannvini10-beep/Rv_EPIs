<template>
  <div class="app-layout">
    <aside class="sidebar">
      <div class="logo">
        <img src="../assets/Logo_EPIatualizada.png" alt="Synaptix Logo" />
        <span>Synaptix</span>
      </div>

      <nav class="menu">
        <ul>
          <li><i class="icon-dashboard"></i> Dashboard</li>
          <li><i class="icon-inventario"></i> Inventário</li>
          <li><i class="icon-add"></i> Adicionar EPI</li>
          <li><i class="icon-uso"></i> EPIs em uso</li>
          <li><i class="icon-registrar"></i> Registrar retirada</li>
          <li class="active"><i class="icon-relatorios"></i> Relatórios</li>
          <li><i class="icon-perfil"></i> Perfil</li>
          <li><i class="icon-config"></i> Configurações</li>
        </ul>
      </nav>

      <footer class="sidebar-footer">
        <button class="btn-sair">Sair</button>
        <div class="user-profile">
          <img src="https://via.placeholder.com/40" alt="Julie Antrez" />
          <div class="user-info">
            <span class="user-name">Julie Antrez</span>
            <span class="user-status">Conectado</span>
          </div>
        </div>
      </footer>
    </aside>

    <main class="main-content">
      <header class="content-header">
        <h1>Relatórios</h1>
        <p>Gere e visualize relatórios sobre o estoque de EPIs</p>
      </header>

      <section class="reports-section">
        <h2>Relatórios Disponíveis</h2>
        <p class="subtitle">Clique para visualizar ou fazer download</p>

        <div class="reports-list">
          <article v-for="(item, index) in relatorios" :key="index" class="report-card">
            <div class="report-icon">
              <i :class="item.icon"></i>
            </div>
            <div class="report-details">
              <h3>{{ item.titulo }}</h3>
              <p>{{ item.descricao }}</p>
            </div>
            <div class="report-actions">
              <button class="btn-visualizar">Visualizar</button>
              <button class="btn-download">Download</button>
            </div>
          </article>
        </div>
      </section>

      <section class="info-section">
        <h3>Informações úteis</h3>
        <p>Os relatórios auxiliam nas análises necessárias para tomadas de decisões sobre diversas situações...</p>
        <p>Para o "Relatório de Movimentação Mensal", é possível acompanhar quais EPIs possuem maiores entradas...</p>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const relatorios = ref([
  { titulo: 'Relatório de Movimentação Mensal', descricao: 'Entradas e saídas do mês de Fevereiro 2026', icon: 'icon-move' },
  { titulo: 'Inventário Completo', descricao: 'Lista completa de todos os EPIs em estoque', icon: 'icon-box' },
  { titulo: 'Análise de Fornecedores', descricao: 'Comparativo de preços e qualidade dos fornecedores', icon: 'icon-cart' },
  { titulo: 'Itens com Estoque Baixo', descricao: 'EPIs que precisam de reposição urgente', icon: 'icon-alert' }
]);
</script>

<style scoped>
/* Layout Base */
.app-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f4f6f8;
  font-family: 'Inter', sans-serif;
}

/* Sidebar */
.sidebar {
  width: 250px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e0e0e0;
}

.sidebar .logo {
  padding: 30px;
  color: #7b1fa2;
  font-weight: bold;
}

.menu ul {
  list-style: none;
  padding: 0;
}

.menu li {
  padding: 15px 30px;
  cursor: pointer;
  color: #666;
  transition: 0.3s;
}

.menu li.active {
  background-color: #7b1fa2;
  color: #fff;
}

/* Conteúdo Principal */
.main-content {
  flex: 1;
  padding: 40px;
}

.content-header h1 {
  font-size: 24px;
  color: #333;
}

/* Cards de Relatório */
.reports-section {
  background-color: #e8e0f5; /* Cor lilás de fundo do container */
  padding: 30px;
  border-radius: 12px;
  margin-top: 20px;
}

.reports-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}

.report-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.report-icon {
  width: 45px;
  height: 45px;
  background-color: #7b1fa2;
  border-radius: 8px;
  margin-right: 20px;
}

.report-details {
  flex: 1;
}

.report-details h3 {
  font-size: 16px;
  margin: 0;
}

.report-details p {
  font-size: 13px;
  color: #888;
  margin: 4px 0 0;
}

/* Botões */
.report-actions {
  display: flex;
  gap: 10px;
}

.btn-visualizar {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn-download {
  padding: 8px 16px;
  background-color: #4a148c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

/* Seção de Info */
.info-section {
  margin-top: 30px;
  background-color: #fce4ec;
  padding: 25px;
  border-radius: 12px;
}
</style>