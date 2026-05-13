<template>
  <!-- Container principal que divide a tela em Sidebar + ConteÃºdo -->
  <div class="shell">
    <!-- ===== SIDEBAR: Menu lateral fixo ===== -->
    <!-- A Sidebar fica fixa na esquerda enquanto o conteÃºdo rola -->
    <aside class="sidebar">
      <!-- Logo/TÃ­tulo do sistema -->
      <h1 class="logo">
        <i class="fas fa-shield-alt"></i>
        EPIs beep
      </h1>

      <!-- Menu de navegaÃ§Ã£o -->
      <!-- RouterLink: links especiais do Vue Router que navegam sem recarregar a pÃ¡gina -->
      <nav class="menu">

 <RouterLink to="/dashboard/cadastro" class="menu-item" active-class="active">
    <i class="fas fa-chart-bar"></i>
    <span>Cadastre o colaborador</span>
  </RouterLink>
  

    <RouterLink to="/dashboard/estoque" class="menu-item" active-class="active">
    <i class="fas fa-chart-bar"></i>
    <span>Estoque</span>
  </RouterLink>

  <RouterLink to="/dashboard/entrega" class="menu-item" active-class="active">
    <i class="fas fa-box"></i>
    <span>Entrega de EPIs</span>
  </RouterLink>
</nav>

      <!-- BotÃ£o de logout -->
      <!-- @click="sair" = quando o usuÃ¡rio clica, chama a funÃ§Ã£o sair() -->
      <button @click="sair" class="botao-sair">
        <i class="fas fa-sign-out-alt"></i>
        <span>Sair</span>
      </button>
    </aside>

    <!-- ===== CONTEÃšDO CENTRAL ===== -->
    <!-- Aqui Ã© onde as pÃ¡ginas aparecem (Dashboard, FuncionÃ¡rios, etc.) -->
    <main class="conteudo">
      <!-- RouterView: espaÃ§o vazio onde o Vue coloca o componente da rota atual -->
      <!-- Cada rota filha (children) aparece aqui automaticamente -->
      <RouterView />
    </main>
  </div>
</template>

<script setup>
// ===== IMPORTAÃ‡Ã•ES =====
// Importar o composable do Supabase que jÃ¡ estÃ¡ configurado no projeto
// useSupabase() = retorna o cliente Supabase pronto para usar
import { useSupabase } from '@/composables/useSupabase'

// Importar o router do Vue Router para navegar entre pÃ¡ginas
// useRouter() = permite usar router.push() para ir para outras pÃ¡ginas
import { useRouter } from 'vue-router'

// Importar os componentes especiais do Vue Router
// RouterLink = componente que cria links que navegam sem recarregar
// RouterView = componente que mostra o conteÃºdo da rota atual
import { RouterLink, RouterView } from 'vue-router'

// ===== CONFIGURAÃ‡ÃƒO =====
// Pegar o cliente Supabase jÃ¡ configurado
// supabase = objeto que tem os mÃ©todos para autenticaÃ§Ã£o, banco de dados, etc
const { supabase } = useSupabase()

// Pegar o router para navegar entre pÃ¡ginas
// router = objeto que permite router.push('/pagina') para navegar
const router = useRouter()

// ===== FUNÃ‡ÃƒO: FAZER LOGOUT =====
// Esta funÃ§Ã£o Ã© chamada quando o usuÃ¡rio clica no botÃ£o "Sair"
// Ela desconecta o usuÃ¡rio do Supabase e o redireciona para a pÃ¡gina de login
async function sair() {
  // try = tenta executar o cÃ³digo dentro
  // Se houver um erro, vai para o catch
  try {
    // ===== PASSO 1: DESCONECTAR DO SUPABASE =====
    // supabase.auth.signOut() = funÃ§Ã£o do Supabase que desconecta o usuÃ¡rio
    // Isso remove a sessÃ£o do usuÃ¡rio do navegador
    // await = espera a operaÃ§Ã£o terminar antes de continuar
    await supabase.auth.signOut()
    // Depois de desconectar, o usuÃ¡rio nÃ£o estÃ¡ mais autenticado
    // Se tentar acessar uma pÃ¡gina protegida, serÃ¡ redirecionado para login

    // ===== PASSO 2: REDIRECIONAR PARA A PÃGINA DE LOGIN =====
    // router.push('/login') = navega para a pÃ¡gina /login
    // Isso leva o usuÃ¡rio de volta para a tela de login
    // A navegaÃ§Ã£o acontece sem recarregar a pÃ¡gina (SPA)
    router.push('/login')
    // Agora o usuÃ¡rio estÃ¡ na pÃ¡gina de login e pode fazer login novamente
  }
  // catch = captura qualquer erro que aconteÃ§a no try
  catch (err) {
    // Se houver um erro ao fazer logout, mostrar no console
    // Isso ajuda o desenvolvedor a entender o que deu errado
    console.error('Erro ao fazer logout:', err)
    // Nota: mesmo com erro, o usuÃ¡rio pode estar desconectado
    // Mas Ã© bom avisar o desenvolvedor sobre o problema
  }
}
</script>

<style scoped>
/* ===== ESTILOS GERAIS ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ===== CONTAINER PRINCIPAL: SHELL ===== */
/* Divide a tela em duas colunas: Sidebar (esquerda) + ConteÃºdo (direita) */
.shell {
  display: flex;
  /* flex = coloca os elementos lado a lado */
  height: 100vh;
  /* 100vh = ocupa toda a altura da tela */
  background-color: #FFFFFF;
}

/* ===== SIDEBAR: Menu lateral fixo ===== */
/* A Sidebar fica presa no lugar enquanto o conteÃºdo rola */
.sidebar {
  width: 250px;
  /* Largura fixa de 250px */
  background-color: #005f56;
  /* Azul escuro como fundo */
  color: #FFFFFF;
  /* Texto branco */
  padding: 30px 20px;
  /* EspaÃ§o interno */
  display: flex;
  /* Coloca os itens em coluna */
  flex-direction: column;
  position: fixed;
  /* Fica fixo enquanto o conteÃºdo rola */
  height: 100vh;
  /* Ocupa toda a altura da tela */
  left: 0;
  /* PosiÃ§Ã£o na esquerda */
  top: 0;
  /* PosiÃ§Ã£o no topo */
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  /* Sombra suave na direita da Sidebar */
  z-index: 1000;
  /* Fica acima de outros elementos */
  overflow-y: auto;
  /* Permite rolar se o conteÃºdo for muito grande */
}

/* ===== LOGO ===== */
/* TÃ­tulo do sistema na Sidebar */
.logo {
  font-size: 30px;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 40px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

/* Ãcone do logo */
.logo i {
  font-size: 28px;
}

/* ===== MENU DE NAVEGAÃ‡ÃƒO ===== */
/* Container que envolve todos os links do menu */
.menu {
  flex-grow: 1;
  /* Ocupa todo o espaÃ§o disponÃ­vel */
  display: flex;
  flex-direction: column;
  /* Coloca os itens em coluna (um embaixo do outro) */
  gap: 10px;
  /* EspaÃ§o entre os itens */
}

/* ===== ITENS DO MENU ===== */
/* Estilo de cada link do menu */
.menu-item {
  display: flex;
  /* Coloca o Ã­cone e o texto lado a lado */
  align-items: center;
  padding: 15px 20px;
  color: #FFFFFF;
  text-decoration: none;
  /* Remove o sublinhado padrÃ£o dos links */
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  /* Muda o cursor para "mÃ£o" quando passa */
  transition: all 0.3s ease;
  /* AnimaÃ§Ã£o suave ao mudar de estado */
  gap: 12px;
  /* EspaÃ§o entre o Ã­cone e o texto */
}

/* Quando passa o mouse no item do menu */
.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  /* Fundo branco translÃºcido */
}

/* Quando o item estÃ¡ ativo (a pÃ¡gina atual) */
.menu-item.active {
  background-color: rgba(255, 255, 255, 0.2);
  /* Fundo branco mais opaco */
  font-weight: 600;
  /* Texto em negrito */
  border-left: 4px solid #FFFFFF;
  /* Borda branca na esquerda */
  padding-left: 16px;
  /* Reduz o padding para compensar a borda */
}

/* Ãcone do menu */
.menu-item i {
  font-size: 20px;
  width: 24px;
  text-align: center;
}

/* ===== BOTÃƒO SAIR ===== */
/* BotÃ£o de logout na parte inferior da Sidebar */
.botao-sair {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  /* Fundo branco translÃºcido */
  color: #FFFFFF;
  border: none;
  padding: 12px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;
  /* Ocupa toda a largura da Sidebar */
}

/* Quando passa o mouse no botÃ£o Sair */
.botao-sair:hover {
  background-color: rgba(255, 255, 255, 0.2);
  /* Fundo mais opaco */
}

/* Quando clica no botÃ£o Sair */
.botao-sair:active {
  transform: scale(0.98);
  /* Diminui um pouco o tamanho */
}

/* Ãcone do botÃ£o Sair */
.botao-sair i {
  font-size: 18px;
}

/* ===== CONTEÃšDO CENTRAL ===== */
/* Ãrea principal onde as pÃ¡ginas aparecem */
.conteudo {
  flex-grow: 1;
  /* Ocupa todo o espaÃ§o restante */
  margin-left: 250px;
  /* Deixa espaÃ§o para a Sidebar fixa (250px) */
  padding: 30px;
  /* EspaÃ§o interno */
  overflow-y: auto;
  /* Permite rolar o conteÃºdo se necessÃ¡rio */
  background-color: #FFFFFF;
}

/* ===== RESPONSIVIDADE: Telas pequenas (celulares) ===== */
@media (max-width: 768px) {
  /* Em telas pequenas, a Sidebar fica escondida ou reduzida */
  .sidebar {
    width: 200px;
    /* Reduz a largura da Sidebar */
  }

  .conteudo {
    margin-left: 200px;
    /* Ajusta o espaÃ§o para a nova largura */
    padding: 20px;
    /* Reduz o padding */
  }

  .logo {
    font-size: 20px;
    margin-bottom: 30px;
  }

  .menu-item {
    padding: 12px 15px;
    font-size: 14px;
  }
}

/* ===== RESPONSIVIDADE: Telas muito pequenas (celulares pequenos) ===== */
@media (max-width: 480px) {
  /* Em telas muito pequenas, a Sidebar pode ser ocultada com JavaScript */
  .sidebar {
    width: 100%;
    position: absolute;
    height: auto;
  }

  .conteudo {
    margin-left: 0;
    padding: 15px;
  }
}
</style>