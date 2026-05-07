<template>
  <header class="navbar">
    <div class="navbar__marca">
      <img
        src="../assets/Logo_EPIatualizada.png"
        alt="Logo EPI"
        class="navbar__logo"
      />
    </div>

    <RouterLink to="/login" class="navbar__login">
      <button type="button" class="navbar__btn">Entrar</button>
    </RouterLink>
  </header>
</template>

<script>
export default {
  name: 'menu'
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  height: 58px;
  background: #ffffff;
  border-bottom: 1px solid #f0ede8;
  gap: 1rem;
}

.navbar__marca {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.navbar__logo {
  height: 60px;
  width: auto;
  display: block;
}

.navbar__lista {
  display: flex;
  align-items: center;
  gap: 5px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar__link {
  display: block;
  padding: 6px 12px;
  border-radius: 7px;
  font-size: 13.5px;
  font-weight: 500;
  color: #000000;
  text-decoration: none;
  letter-spacing: -0.01em;
  transition: background 0.15s, color 0.15s;
  white-space: nowrap;
}

.navbar__link:hover {
  background: #898e96;
  color: #000000;
}

.navbar__link.router-link-active {
  background: #fff4ed;
  color: #ea5b0c;
  font-weight: 600;
}

.navbar__login {
  text-decoration: none;
  flex-shrink: 0;
}

.navbar__btn {
  padding: 7px 18px;
  border-radius: 8px;
  border: none;
  background: #217539;
  color: #ffffff;
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
}

.navbar__btn:hover {
  background: #000000;
}

.navbar__btn:active {
  transform: scale(0.97);
}
</style>