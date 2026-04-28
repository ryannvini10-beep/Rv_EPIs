<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-lg w-full text-center">
      
      <div class="relative">
        <h1 class="text-9xl font-black text-gray-200">
          {{ errorCode }}
        </h1>
        <p class="absolute inset-0 flex items-center justify-center text-2xl font-bold text-indigo-600 mt-8">
          Ops! Algo deu errado.
        </p>
      </div>

      <h2 class="mt-8 text-3xl font-bold text-gray-900 tracking-tight">
        {{ title }}
      </h2>
      <p class="mt-4 text-gray-600">
        {{ message }}
      </p>

      <div class="mt-10 flex flex-col sm:flex-row justify-center gap-4">
        <button 
          @click="goHome"
          class="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
        >
          Voltar ao Início
        </button>
        
        <button 
          @click="refreshPage"
          class="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
        >
          Tentar Novamente
        </button>
      </div>

      <p class="mt-8 text-sm text-gray-400">
        Se o problema persistir, entre em contato com o <a href="#" class="underline">suporte técnico</a>.
      </p>
    </div>
  </div>
</template>

<script setup>
/**
 * COMPONENT: ErrorPage
 * Descrição: Tela genérica para exibição de erros (404, 500, etc).
 */
import { useRouter } from 'vue-router';

// Definição das Props para tornar o componente reutilizável
const props = defineProps({
  errorCode: {
    type: String,
    default: '404'
  },
  title: {
    type: String,
    default: 'Página não encontrada'
  },
  message: {
    type: String,
    default: 'A página que você está procurando não existe ou foi movida para um novo endereço.'
  }
});

const router = useRouter();

/**
 * Função para navegar de volta à página inicial
 */
const goHome = () => {
  router.push('/');
};

/**
 * Função para recarregar a página atual caso seja um erro temporário
 */
const refreshPage = () => {
  window.location.reload();
};
</script>

<style scoped>
/* Estilos específicos se necessário, embora o Tailwind cubra a maioria */
h1 {
  user-select: none; /* Impede que o usuário selecione o número grande do erro */
}
</style>