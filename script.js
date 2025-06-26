// Establecer fecha mínima como la actual
const fechaInput = document.getElementById("fecha");
const ahora = new Date();
ahora.setSeconds(0, 0); // Limpiar segundos/milisegundos
const isoAhora = ahora.toISOString().slice(0, 16);
if (fechaInput) fechaInput.min = isoAhora;

const precios = {
  'Pequeño (15€)': 15,
  'Mediano (20€)': 20,
  'Grande (25€)': 25,
  'Decoración (+2€)': 2,
  'Dibujo o Francesa (+4€)': 4,
  'Relleno (13€)': 13,
  'Retirado completo (5€)': 5,
  'Retirado de diseño (3€)': 3,
  'Restauración uña partida/caída (1€)': 1,
  'Limpieza de uñas naturales (5€)': 5,
  'Servicio': 12.5,
  'Decoración semi (+2€)': 2,
  'Dibujo semi (+4€)': 4,
  'Relleno semi (8€)': 8,
  'Retirado semi (3€)': 3,
  'Retirado diseño semi (3€)': 3,
  'Restauración semi (1€)': 1,
  'Sin esmaltado (10€)': 10,
  'Con esmaltado (17€)': 17,
  'Pequeñas (15€)': 15,
  'Grandes (25€)': 25,
  'Depilación': 3
};

const inputs = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
const totalDisplay = document.getElementById('precio-total');

function calcularTotal() {
  let total = 0;

  inputs.forEach(input => {
    if (input.checked) {
      const valor = input.value || input.name;
      for (let key in precios) {
        if (valor.includes(key) || input.name.includes(key.toLowerCase().replace(/ /g, '-'))) {
          total += precios[key];
          break;
        }
      }
    }
  });

  if (totalDisplay) totalDisplay.textContent = total.toFixed(2) + '€';
}

inputs.forEach(input => input.addEventListener('change', calcularTotal));

// Confirmación al enviar el formulario
function mostrarConfirmacion() {
  document.getElementById("enviarBtn").style.display = "none";
  document.getElementById("enviando").style.display = "inline";
  alert("✅ ¡Tu reserva fue enviada con éxito! Te contactaremos pronto. 😊");
  return true;
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(reg => console.log("✅ Service Worker registrado:", reg.scope))
        .catch(err => console.error("❌ Error al registrar Service Worker:", err));
    });
  }