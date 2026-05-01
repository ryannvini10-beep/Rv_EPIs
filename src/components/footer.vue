<template>
  <footer class="footer">
    <div class="footer__contato">
      <h4>Contato</h4>
      <p>📧 ryannvini10@gmail.com</p>
    </div>

    <div class="footer__redes">
      <h4>Redes sociais</h4>
      <div class="footer__redes-links">
        <a href="https://br.linkedin.com/" class="footer__link">LinkedIn</a>
        <a href="https://www.instagram.com/" class="footer__link">Instagram</a>
      </div>
    </div>

    <div class="footer__copy">
      <p>© 2026 Sistema em gestão de EPIs — Todos os direitos reservados</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'footer'
}
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;
  background: #217539;
  color: #ffffff;
}

.footer h4 {
  font-size: 14px;
  margin: 0 0 10px;
  color: #ffffff;
}

.footer p,
.footer a {
  font-size: 13px;
  color: #ffffff;
  text-decoration: none;
  margin: 0;
}

.footer a:hover {
  color: #217539;
}

.footer__redes-links {
  display: flex;
  gap: 12px;
}

.footer__copy {
  width: 100%;
  text-align: center;
  border-top: 1px solid #ffffff;
  padding-top: 1rem;
}
</style>