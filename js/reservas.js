document.addEventListener("DOMContentLoaded", function () {
  // Obtener el usuario actual desde localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Redirigir al usuario si no está autenticado
  if (!currentUser) {
      alert("Debes iniciar sesión para acceder a esta página.");
      window.location.href = "./Login.html";
  }
});