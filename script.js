// === SCRIPT LIMPIO ===

// === Fecha mínima ===
const fechaInput = document.getElementById("fecha");
if (fechaInput) {
  const ahora = new Date();
  ahora.setSeconds(0, 0);
  fechaInput.min = ahora.toISOString().slice(0, 16);
}

// === Precios ===
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
  'Pedicura base (10€)': 10,
  'Esmaltado pedicura (+7€)': 7,
  'Pequeñas (15€)': 15,
  'Grandes (25€)': 25,
  'Depilación': 3
};

// === Calcular total ===
const inputs = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
const totalDisplay = document.getElementById('precio-total');

function calcularTotal() {
  let total = 0;
  inputs.forEach(input => {
    if (input.checked) {
      const valor = input.value || input.name;
      for (let key in precios) {
        if (valor.includes(key)) {
          total += precios[key];
          break;
        }
      }
    }
  });
  if (totalDisplay) totalDisplay.textContent = total.toFixed(2) + '€';
}

inputs.forEach(input => input.addEventListener('change', calcularTotal));


function enviarPorWhatsApp() {
  const nombre = document.querySelector('input[name="nombre"]').value;
  const telefono = document.querySelector('input[name="telefono"]').value;
  const fecha = document.querySelector('input[name="fecha"]').value;
  const extrasSeleccionados = [];

  document.querySelectorAll('input[type="radio"]:checked, input[type="checkbox"]:checked').forEach(el => {
    extrasSeleccionados.push(el.value);
  });

  const metodoPago = document.querySelector('input[name="pago"]:checked')?.value || '';
  const notas = document.querySelector('textarea[name="info-extra"]').value;

  let mensaje = `*Ficha Técnica del Cliente*%0A`;
  mensaje += `*Nombre:* ${nombre}%0A`;
  mensaje += `*Teléfono:* ${telefono}%0A`;
  mensaje += `*Cita:* ${fecha}%0A`;
  mensaje += `*Servicios seleccionados:* ${extrasSeleccionados.join(', ') || 'Ninguno'}%0A`;
  mensaje += `*Pago:* ${metodoPago}%0A`;
  mensaje += `*Notas:* ${notas || 'Ninguna'}%0A`;

  const numeroWhatsApp = '34666852779'; // Asegúrate de que esté en formato internacional sin signos +
  const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;

  window.open(url, '_blank');

  return false; // Evita el envío del formulario normal
}

