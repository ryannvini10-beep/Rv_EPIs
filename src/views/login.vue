<template>
  <!-- Container principal da tela de login -->
  <div class="container-login">
    <!-- Caixa do formulÃ¡rio -->
    <div class="form-box">
      <!-- TÃ­tulo da pÃ¡gina -->
      <h1 class="titulo">EPIs beep</h1>
      <p class="subtitulo">Bem vindo (a), faça o login para acessar! </p>

      <!-- FormulÃ¡rio de login -->
      <!-- @submit.prevent="fazerLogin" = quando o usuÃ¡rio clica em "Entrar", chama a funÃ§Ã£o fazerLogin() -->
      <form @submit.prevent="fazerLogin" class="formulario">
        <!-- Campo de e-mail -->
        <!-- v-model="email" = vincula o valor do input com a variÃ¡vel email -->
        <!-- Quando o usuÃ¡rio digita, a variÃ¡vel email Ã© atualizada automaticamente -->
        <div class="form-group">
          <label for="email" class="label">E-mail</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="username@email.com"
            class="input"
            required
          />
        </div>

        <!-- Campo de senha -->
        <!-- v-model="senha" = vincula o valor do input com a variÃ¡vel senha -->
        <div class="form-group">
          <label for="senha" class="label">Senha</label>
          <input
            id="senha"
            v-model="senha"
            type="password"
            placeholder="Digite sua senha"
            class="input"
            required
          />
        </div>

        <!-- Mensagem de erro -->
        <!-- v-if="erro" = sÃ³ mostra a mensagem se houver um erro -->
        <div v-if="erro" class="mensagem-erro">
          <i class="fas fa-exclamation-circle"></i>
          {{ erro }}
        </div>

        <!-- BotÃ£o de envio -->
        <!-- :disabled="carregando" = desabilita o botÃ£o enquanto estÃ¡ fazendo login -->
        <!-- Isso evita que o usuÃ¡rio clique mÃºltiplas vezes -->
        <button
          type="submit"
          class="botao-entrar"
          :disabled="carregando"
        >
          <!-- Mostra um spinner enquanto estÃ¡ carregando -->
          <i v-if="carregando" class="fas fa-spinner fa-spin"></i>
          <!-- Mostra o texto normal quando nÃ£o estÃ¡ carregando -->
          <span v-else>Entrar</span>
        </button>
      </form>
       

      <!-- Dica para o usuÃ¡rio -->
      <p class="dica">
        <strong>Atenção:</strong> Use um e-mail e senha validos cadastrados no Supabase.
      </p>
    </div>
  </div>
</template>

<script setup>
// ===== IMPORTAÃ‡Ã•ES =====
// Importar a funÃ§Ã£o ref do Vue para criar variÃ¡veis reativas
// ref() = cria uma variÃ¡vel que, quando muda, atualiza a tela automaticamente
import { ref } from 'vue'

// Importar o composable do Supabase que jÃ¡ estÃ¡ configurado no projeto
// useSupabase() = retorna o cliente Supabase pronto para usar
import { useSupabase } from '@/composables/useSupabase'

// Importar o router do Vue Router para navegar entre pÃ¡ginas
// useRouter() = permite usar router.push() para ir para outras pÃ¡ginas
import { useRouter } from 'vue-router'

// ===== CONFIGURAÃ‡ÃƒO =====
// Pegar o cliente Supabase jÃ¡ configurado
// supabase = objeto que tem os mÃ©todos para autenticaÃ§Ã£o, banco de dados, etc
const { supabase } = useSupabase()

// Pegar o router para navegar entre pÃ¡ginas
// router = objeto que permite router.push('/pagina') para navegar
const router = useRouter()

// ===== VARIÃVEIS REATIVAS =====
// Essas variÃ¡veis sÃ£o "reativas", ou seja, quando mudam, a tela atualiza automaticamente

// VariÃ¡vel que guarda o e-mail digitado pelo usuÃ¡rio
// ref('') = comeÃ§a vazia
// email.value = para acessar o valor dentro do script
// {{ email }} = para usar no template
const email = ref('')

// VariÃ¡vel que guarda a senha digitada pelo usuÃ¡rio
// ref('') = comeÃ§a vazia
const senha = ref('')

// VariÃ¡vel que guarda a mensagem de erro (se houver)
// Quando tem um erro, mostra na tela
// Quando nÃ£o tem erro, a mensagem fica vazia e nÃ£o aparece
const erro = ref('')

// VariÃ¡vel que indica se o login estÃ¡ em progresso
// Usamos isso para:
// 1. Desabilitar o botÃ£o enquanto aguarda a resposta do Supabase
// 2. Mostrar um spinner de carregamento
// 3. Evitar que o usuÃ¡rio clique mÃºltiplas vezes
const carregando = ref(false)

// ===== FUNÃ‡ÃƒO PRINCIPAL: FAZER LOGIN =====
// Esta funÃ§Ã£o Ã© chamada quando o usuÃ¡rio clica no botÃ£o "Entrar"
// async = significa que essa funÃ§Ã£o pode fazer operaÃ§Ãµes que demoram (como chamar o Supabase)
// await = espera a operaÃ§Ã£o terminar antes de continuar
async function fazerLogin() {
  // ===== PASSO 1: LIMPAR ERROS ANTERIORES =====
  // Se havia uma mensagem de erro da tentativa anterior, apagar
  // Assim a tela fica limpa para a nova tentativa
  erro.value = ''

  // ===== PASSO 2: VALIDAR SE OS CAMPOS ESTÃƒO PREENCHIDOS =====
  // Verificar se o usuÃ¡rio digitou algo nos campos
  // Se nÃ£o digitou nada, mostrar erro e parar a funÃ§Ã£o
  if (!email.value || !senha.value) {
    // !email.value = se email estÃ¡ vazio (falsy)
    // || = OU (se email estÃ¡ vazio OU senha estÃ¡ vazia)
    // Se algum estiver vazio, entra neste if
    erro.value = 'Por favor, preencha todos os campos'
    // Mostra a mensagem de erro na tela
    return
    // return = para a execuÃ§Ã£o da funÃ§Ã£o aqui
    // NÃ£o continua para o Supabase se os campos estÃ£o vazios
  }

  // ===== PASSO 3: MOSTRAR QUE ESTÃ CARREGANDO =====
  // Muda carregando para true
  // Isso faz com que:
  // 1. O botÃ£o fica desabilitado (nÃ£o pode clicar de novo)
  // 2. Aparece um spinner de carregamento
  carregando.value = true

  try {
    // ===== PASSO 4: TENTAR FAZER LOGIN COM O SUPABASE =====
    // supabase.auth.signInWithPassword() = funÃ§Ã£o do Supabase que autentica o usuÃ¡rio
    // Recebe um objeto com email e password
    // Retorna um objeto com { data, error }
    // - data = informaÃ§Ãµes do usuÃ¡rio se o login funcionou
    // - error = mensagem de erro se o login falhou
    const { error } = await supabase.auth.signInWithPassword({
      // email: email.value = envia o e-mail que o usuÃ¡rio digitou
      email: email.value,
      // password: senha.value = envia a senha que o usuÃ¡rio digitou
      password: senha.value
    })
    // await = espera o Supabase responder antes de continuar

    // ===== PASSO 5: VERIFICAR SE HOUVE ERRO =====
    // Se o Supabase retornou um erro, significa que:
    // - O e-mail nÃ£o existe
    // - A senha estÃ¡ incorreta
    // - Algum outro problema de autenticaÃ§Ã£o
    if (error) {
      // if (error) = se houve erro
      // O Supabase retorna um erro se o e-mail ou senha estiverem incorretos
      // Mostrar a mensagem de erro para o usuÃ¡rio
      erro.value = 'E-mail ou senha incorretos. Tente novamente.'
      // Desabilitar o carregamento (botÃ£o volta ao normal)
      carregando.value = false
      // return = para a funÃ§Ã£o aqui, nÃ£o continua
      return
    }

    // ===== PASSO 6: LOGIN BEM-SUCEDIDO - REDIRECIONAR =====
    // Se chegou aqui, significa que o login funcionou!
    // NÃ£o houve erro, entÃ£o o usuÃ¡rio estÃ¡ autenticado
    // Agora precisamos levar o usuÃ¡rio para a pÃ¡gina principal
    // router.push('/') = navega para a pÃ¡gina inicial
    // '/' = rota raiz (onde estÃ¡ o AppLayout com a Sidebar)
    // Isso acontece sem recarregar a pÃ¡gina (SPA - Single Page Application)
       router.push('/dashboard')
    // Depois que router.push() Ã© executado, o usuÃ¡rio Ã© levado para a pÃ¡gina inicial
  }
  // ===== PASSO 7: CAPTURAR ERROS INESPERADOS =====
  // Se houver um erro que nÃ£o foi previsto (erro de rede, erro do servidor, etc)
  // Este catch captura e trata
  catch (err) {
    // err = objeto com informaÃ§Ãµes do erro
    // Mostrar uma mensagem genÃ©rica para o usuÃ¡rio
    // NÃ£o mostramos o erro tÃ©cnico para nÃ£o assustar o usuÃ¡rio
    erro.value = 'Erro ao fazer login. Tente novamente mais tarde.'
    // Mostrar o erro completo no console do navegador (para debug)
    // Isso ajuda o desenvolvedor a entender o que deu errado
    console.error('Erro ao fazer login:', err)
    // Desabilitar o carregamento (botÃ£o volta ao normal)
    carregando.value = false
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

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* ===== CONTAINER PRINCIPAL ===== */
/* Centraliza o formulÃ¡rio na tela */
.container-login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #FFFFFF;
  padding: 20px;
}

/* ===== CAIXA DO FORMULÃRIO ===== */
/* Estilo da caixa que envolve o formulÃ¡rio */
.form-box {
  width: 100%;
  max-width: 450px;
  padding: 50px 40px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* ===== TÃTULOS ===== */
/* TÃ­tulo principal */
.titulo {
  font-size: 35px;
  color: #005f56;
  font-weight: 700;
  margin-bottom:10px;
  text-align: center;
}

/* SubtÃ­tulo */
.subtitulo {
  font-size: 23px;
  color: #1A1A1A;
  text-align: center;
  margin-bottom: 40px;
}

/* ===== FORMULÃRIO ===== */
/* Estilos do formulÃ¡rio */
.formulario {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ===== GRUPOS DE FORMULÃRIO ===== */
/* Cada campo (e-mail, senha) Ã© envolvido em um form-group */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* ===== LABELS ===== */
/* RÃ³tulos dos campos (E-mail, Senha) */
.label {
  font-size: 18px;
  font-weight: 600;
  color: #005f56;
}

/* ===== INPUTS ===== */
/* Estilo dos campos de entrada (e-mail, senha) */
.input {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 4px;
  font-size: 16px;
  color: #1A1A1A;
  background-color: #FFFFFF;
  transition: all 0.3s ease;
}

/* Quando o usuÃ¡rio clica no input, muda a borda para azul */
.input:focus {
  outline: none;
  border-color: #005f56;
  box-shadow: 0 0 0 3px rgba(0, 61, 153, 0.1);
}

/* ===== MENSAGEM DE ERRO ===== */
/* Estilo da mensagem de erro */
.mensagem-erro {
  padding: 12px 16px;
  background-color: #FEE2E2;
  border: 1px solid #FECACA;
  border-radius: 4px;
  color: #DC2626;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Ãcone de erro */
.mensagem-erro i {
  font-size: 18px;
}

/* ===== BOTÃƒO DE ENTRAR ===== */
/* Estilo do botÃ£o de login */
.botao-entrar {
  padding: 12px 24px;
  background-color: #005f56;
  color: #FFFFFF;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
}

/* Quando passa o mouse no botÃ£o, muda a cor */
.botao-entrar:hover:not(:disabled) {
  background-color: #005f56;
}

/* Quando o botÃ£o estÃ¡ desabilitado (carregando), muda a aparÃªncia */
.botao-entrar:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ===== DICA ===== */
/* Estilo da dica para o usuÃ¡rio */
.dica {
  font-size: 13px;
  color: #6B7280;
  text-align: center;
  margin-top: 20px;
  line-height: 1.5;
}

/* ===== RESPONSIVIDADE ===== */
/* Em telas pequenas (celulares), reduz o tamanho do formulÃ¡rio */
@media (max-width: 600px) {
  .form-box {
    padding: 30px 20px;
  }

  .titulo {
    font-size: 24px;
  }

  .subtitulo {
    font-size: 14px;
  }
}
</style>
