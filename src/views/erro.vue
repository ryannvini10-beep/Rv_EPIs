<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-lg w-full text-center">
      
      <img 
        src="../assets/Captura de tela ERRO.2.png" 
        alt="Ilustração de erro" 
        class="home__hero-img shadow-lg"
      >

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
import { useRouter } from 'vue-router';

const props = defineProps({
  errorCode: {
    type: String,
    default: '404'
  },
  title: {
    type: String,
    default: 'A Página não foi encontrada'
  },
  message: {
    type: String,
    default: 'A página que você está procurando não foi encontrada.'
  }
});

const router = useRouter();

const goHome = () => {
  router.push('/');
};

const refreshPage = () => {
  window.location.reload();
};
</script>

<style scoped>
/* Adicionando suas linhas de estilo específicas */ 
.home__hero-img {
  display: block;
  width: 40%;
  max-width: 100%;
  border-radius: 150px;
  margin-left: auto;   /* Centraliza horizontalmente */
  margin-right: auto;  /* Centraliza horizontalmente */
  margin-bottom: 2rem;
}

h1 {
  user-select: none;
}

/* Mantendo a animação fadeIn para um visual mais fluido */
img {
  animation: fadeIn 1.2s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>