document.addEventListener("DOMContentLoaded", function () {
  // Verificar si el usuario está logueado
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("Debes iniciar sesión para acceder a esta página.");
    window.location.href = "./Login.html";
    return;
  }

  // Mostrar el enlace de "Mis Reservas" si el usuario está logueado
  const verReservasLink = document.getElementById("ver-reservas-link");
  if (currentUser) {
    verReservasLink.classList.remove("hidden");
  }

  // Manejar el clic en el enlace de "Mis Reservas"
  verReservasLink.querySelector("a").addEventListener("click", function (e) {
    e.preventDefault(); // Evitar que el enlace redirija
    mostrarReservasUsuario(); // Mostrar las reservas del usuario
  });

  // URL de la API
  const API_URL = "https://atexdepr.github.io/api-reservas-hotelcarmen/db.json";

  // Constantes para las imágenes según la categoría de la habitación
  const IMAGENES_POR_CATEGORIA = {
    "Habitación Estándar": ["1085381.webp", "1085382.webp", "1085383.webp"],
    "Suite Junior": ["descarga (5).jpeg", "descarga (6).jpeg", "descarga (9).jpeg"],
    "Suite Ejecutiva": ["descarga (18).jpeg", "descarga (16).jpeg", "descarga (15).jpeg"],
    "Suite Presidencial": ["1041631.webp", "1041632.webp", "1041633.webp"],
    "Suite VIP": ["vip2.webp", "vip1.webp", "vip3.webp"],
  };

  // Simulación de una base de datos en memoria para reservas
  let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

  // Obtener datos de las habitaciones desde la API
  async function fetchHabitaciones() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Error al obtener las habitaciones");
      const data = await response.json();
      return data.habitaciones;
    } catch (error) {
      console.error("Error:", error);
      mostrarError("Error al cargar las habitaciones. Inténtalo de nuevo más tarde.");
      return [];
    }
  }

  // Función para mostrar las habitaciones filtradas
  async function mostrarHabitaciones(filtros) {
    const resultados = document.getElementById("resultados");
    resultados.innerHTML = ""; // Limpiar resultados anteriores

    // Si no hay filtros, no mostrar nada
    if (!filtros || Object.keys(filtros).length === 0) {
      return;
    }

    resultados.innerHTML = "<p>Cargando habitaciones...</p>"; // Mostrar mensaje de carga

    const habitaciones = await fetchHabitaciones();
    resultados.innerHTML = ""; // Limpiar resultados anteriores

    const habitacionesFiltradas = habitaciones.filter((habitacion) => {
      // Filtrar por capacidad
      if (filtros.capacidad && habitacion.capacidad < filtros.capacidad) return false;

      // Filtrar por tipo de habitación
      if (filtros.tipoHabitacion && habitacion.tipo_habitacion !== filtros.tipoHabitacion) return false;

      // Filtrar por servicios
      if (filtros.servicios) {
        for (const servicio of filtros.servicios) {
          if (!habitacion.servicios[servicio]) return false;
        }
      }

      // Filtrar por fechas
      if (filtros.fechaInicio && filtros.fechaFin) {
        const inicio = new Date(filtros.fechaInicio);
        const fin = new Date(filtros.fechaFin);

        if (inicio >= fin) {
          mostrarError("La fecha de inicio debe ser anterior a la fecha de fin.");
          return false;
        }

        if (!esHabitacionDisponible(habitacion, inicio, fin)) return false;
      }

      return true;
    });

    // Mostrar las habitaciones filtradas
    if (habitacionesFiltradas.length === 0) {
      resultados.innerHTML = "<p>No se encontraron habitaciones con los filtros seleccionados.</p>";
      return;
    }

    habitacionesFiltradas.forEach((habitacion) => {
      const card = document.createElement("div");
      card.className = "bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300";

      const estaDisponible = esHabitacionDisponible(habitacion, filtros.fechaInicio, filtros.fechaFin);

      card.innerHTML = `
        <img src="../img/habitaciones/${IMAGENES_POR_CATEGORIA[habitacion.tipo_habitacion][0]}" alt="${
        habitacion.tipo_habitacion
      }" class="w-full h-48 object-cover">
        <div class="p-6">
          <h3 class="text-xl font-semibold mb-2">${habitacion.tipo_habitacion}</h3>
          <p class="text-gray-600 mb-4">${habitacion.descripcion || "Descripción no disponible"}</p>
          <ul class="text-gray-600 mb-4">
            <li class="flex items-center mb-2">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              Capacidad: ${habitacion.capacidad} personas
            </li>
            <li class="flex items-center mb-2">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
              </svg>
              Camas: ${habitacion.camas}
            </li>
            <li class="flex items-center mb-2">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Precio por noche: $${habitacion.precio_por_noche.toLocaleString()}
            </li>
          </ul>
          ${
            estaDisponible
              ? `<button data-id="${habitacion.id}" class="reservar-btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full">Reservar</button>`
              : `<p class="text-red-500 font-semibold mb-2">No disponible para las fechas seleccionadas</p>`
          }
        </div>
      `;
      resultados.appendChild(card);
    });

    // Agregar evento a los botones de reservar
    document.querySelectorAll(".reservar-btn").forEach((btn) => {
      btn.addEventListener("click", () => mostrarDetallesHabitacion(btn.dataset.id, filtros.fechaInicio, filtros.fechaFin));
    });
  }

  // Función para verificar si una habitación está disponible en las fechas seleccionadas
  function esHabitacionDisponible(habitacion, fechaInicio, fechaFin) {
    if (!fechaInicio || !fechaFin) return true;

    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    // Verificar si hay reservas que se solapen con las fechas seleccionadas
    const reservasHabitacion = reservas.filter((reserva) => reserva.habitacionId === habitacion.id);
    for (const reserva of reservasHabitacion) {
      const reservaInicio = new Date(reserva.fechaInicio);
      const reservaFin = new Date(reserva.fechaFin);

      if (
        (inicio >= reservaInicio && inicio < reservaFin) ||
        (fin > reservaInicio && fin <= reservaFin) ||
        (inicio <= reservaInicio && fin >= reservaFin)
      ) {
        return false;
      }
    }

    return true;
  }

  // Función para mostrar los detalles de una habitación
  async function mostrarDetallesHabitacion(id, fechaInicio, fechaFin) {
    const habitaciones = await fetchHabitaciones();
    const habitacion = habitaciones.find((h) => h.id == id);
    if (!habitacion) return;

    // Modal principal
    const detallesContainer = document.getElementById("detalles-habitacion");
    detallesContainer.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50";

    // Contenido del modal
    const modalContent = `
      <div class="bg-white w-full max-w-4xl rounded-2xl overflow-hidden relative">
        <!-- Botón cerrar -->
        <button id="cerrar-detalles" class="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <!-- Contenido -->
        <div class="flex flex-col lg:flex-row">
          <!-- Galería de imágenes -->
          <div class="w-full lg:w-3/5 p-6 bg-gray-50">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              ${IMAGENES_POR_CATEGORIA[habitacion.tipo_habitacion]
                .map(
                  (imagen) => `
                  <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md">
                    <img 
                      src="../img/habitaciones/${imagen}" 
                      alt="Imagen de la habitación" 
                      class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    >
                  </div>
                `
                )
                .join("")}
            </div>
          </div>

          <!-- Información -->
          <div class="w-full lg:w-2/5 p-6 flex flex-col">
            <div class="flex-1">
              <!-- Título y precio -->
              <div class="mb-6">
                <h2 id="detalles-titulo" class="text-2xl font-bold text-gray-900 mb-2">
                  ${habitacion.tipo_habitacion}
                </h2>
                <p id="detalles-precio" class="text-lg text-blue-600 font-semibold">
                  Precio por noche: $${habitacion.precio_por_noche.toLocaleString()}
                </p>
              </div>

              <!-- Servicios -->
              <div id="detalles-servicios" class="mb-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">Servicios incluidos</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  ${Object.entries(habitacion.servicios)
                    .filter(([key, value]) => value)
                    .map(
                      ([key]) => `
                      <div class="flex items-center text-gray-600">
                        <svg class="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>${key.replace(/_/g, " ")}</span>
                      </div>
                    `
                    )
                    .join("")}
                </div>
              </div>
            </div>

            <!-- Botón de reserva -->
            ${
              esHabitacionDisponible(habitacion, fechaInicio, fechaFin)
                ? `
                  <button 
                    id="confirmar-reserva" 
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Confirmar Reserva
                  </button>
                `
                : `
                  <p class="text-center text-red-500 font-medium py-3">
                    No disponible para las fechas seleccionadas
                  </p>
                `
            }
          </div>
        </div>
      </div>
    `;

    detallesContainer.innerHTML = modalContent;
    detallesContainer.classList.remove("hidden");

    // Event listeners
    document.getElementById("cerrar-detalles").onclick = () => {
      detallesContainer.classList.add("hidden");
    };

    const confirmarReservaBtn = document.getElementById("confirmar-reserva");
    if (confirmarReservaBtn) {
      confirmarReservaBtn.onclick = () => {
        if (!esHabitacionDisponible(habitacion, fechaInicio, fechaFin)) {
          alert("La habitación ya no está disponible. Por favor, selecciona otra.");
          return;
        }

        const aceptaPoliticas = confirm(
          `Políticas de Check-in:\n\n- La hora de check-in es a las 14:00.\n- Si no haces efectiva la reserva antes de las 16:00, la habitación quedará disponible para otros.\n\n¿Aceptas estas políticas y deseas continuar con la reserva?`
        );

        if (aceptaPoliticas) {
          reservarHabitacion(habitacion.id, fechaInicio, fechaFin);
        }
      };
    }
  }

  // Función para reservar una habitación
  async function reservarHabitacion(id, fechaInicio, fechaFin) {
    const habitaciones = await fetchHabitaciones();
    const habitacion = habitaciones.find((h) => h.id == id);

    if (!habitacion) return;

    // Crear nueva reserva con un ID único
    const nuevaReserva = {
      id: Date.now(), // Usamos el timestamp como ID único
      habitacionId: id,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
      usuario: currentUser.id,
      timestamp: Date.now(),
    };

    // Agregar la reserva a la lista de reservas
    reservas.push(nuevaReserva);
    localStorage.setItem("reservas", JSON.stringify(reservas));

    // Mostrar alerta con las políticas de check-in
    alert(
      `Reserva confirmada.\n\nLa hora de check-in es a las 14:00. Si no haces efectiva la reserva antes de las 16:00, la habitación quedará disponible para otros.`
    );

    // Ocultar la tarjeta de detalles
    document.getElementById("detalles-habitacion").classList.add("hidden");

    // Actualizar la lista de habitaciones
    mostrarHabitaciones({
      fechaInicio: fechaInicio,
      fechaFin: fechaFin
    });
  }

  // Función para cancelar una reserva
  function cancelarReserva(reservaId) {
    // Mostrar una alerta de confirmación
    const confirmarCancelacion = confirm("¿Estás seguro de que deseas cancelar esta reserva?");

    if (confirmarCancelacion) {
      // Filtrar las reservas para eliminar la reserva con el ID correspondiente
      reservas = reservas.filter((reserva) => reserva.id !== reservaId);

      // Actualizar el localStorage con las reservas restantes
      localStorage.setItem("reservas", JSON.stringify(reservas));

      // Mostrar un mensaje de éxito
      alert("Reserva cancelada con éxito.");

      // Actualizar la lista de reservas mostrada
      mostrarReservasUsuario();
    } else {
      // Si el usuario cancela la acción, no hacer nada
      alert("La reserva no se ha cancelado.");
    }
  }

  // Función para mostrar las reservas del usuario en un modal flotante
  function mostrarReservasUsuario() {
    const reservasUsuario = reservas.filter((reserva) => reserva.usuario === currentUser.id);
    const reservasModal = document.getElementById("reservas-modal");

    // Limpiar el contenido anterior
    reservasModal.innerHTML = "";

    if (reservasUsuario.length === 0) {
      reservasModal.innerHTML = "<p>No tienes reservas activas.</p>";
    } else {
      reservasUsuario.forEach((reserva) => {
        const reservaDiv = document.createElement("div");
        reservaDiv.className = "bg-white rounded-lg shadow-lg p-4 mb-4";
        reservaDiv.innerHTML = `
  <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow transition-shadow duration-200">
    <div class="flex justify-between items-center mb-3">
      <h3 class="text-sm font-medium text-gray-900">Reserva #${reserva.id}</h3>
      <span class="text-xs px-2 py-1 bg-green-50 text-green-600 rounded">Activa</span>
    </div>
    
    <div class="space-y-1 text-sm text-gray-600 mb-3">
      <p>Hab. ${reserva.habitacionId}</p>
      <p class="flex items-center gap-2">
        <span>${new Date(reserva.fechaInicio).toLocaleDateString()}</span>
        <span>→</span>
        <span>${new Date(reserva.fechaFin).toLocaleDateString()}</span>
      </p>
    </div>

    <button 
      class="cancelar-reserva-btn w-full text-xs text-red-500 hover:text-red-600 font-medium py-1.5" 
      data-id="${reserva.id}"
    >
      Cancelar Reserva
    </button>
  </div>
`;
        reservasModal.appendChild(reservaDiv);
      });
    }

    // Mostrar el modal
    document.getElementById("reservas-modal-container").classList.remove("hidden");

    // Agregar evento a los botones de cancelar reserva
    document.querySelectorAll(".cancelar-reserva-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const reservaId = parseInt(btn.dataset.id); // Obtener el ID de la reserva
        cancelarReserva(reservaId); // Llamar a la función para cancelar la reserva
      });
    });
  }

  // Función para mostrar errores
  function mostrarError(mensaje) {
    const errorContainer = document.getElementById("error-container");
    if (errorContainer) {
      errorContainer.textContent = mensaje;
      errorContainer.classList.remove("hidden");
      setTimeout(() => errorContainer.classList.add("hidden"), 5000);
    }
  }

  // Manejar el envío del formulario de filtro
  const filtroForm = document.getElementById("filtro-form");
  filtroForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validar que las fechas estén seleccionadas
    const fechaInicio = document.getElementById("fecha-inicio").value;
    const fechaFin = document.getElementById("fecha-fin").value;

    if (!fechaInicio || !fechaFin) {
      mostrarError("Por favor, selecciona las fechas de llegada y salida.");
      return;
    }

    const filtros = {
      capacidad: document.getElementById("capacidad").value,
      tipoHabitacion: document.getElementById("tipo-habitacion").value,
      servicios: Array.from(document.querySelectorAll('input[name="servicios"]:checked')).map(
        (input) => input.value
      ),
      fechaInicio: fechaInicio,
      fechaFin: fechaFin
    };

    mostrarHabitaciones(filtros);
  });

  // Cerrar el modal de reservas
  document.getElementById("cerrar-reservas-modal").addEventListener("click", function () {
    document.getElementById("reservas-modal-container").classList.add("hidden");
  });

  // Mostrar todas las habitaciones al cargar la página (solo si hay filtros)
  mostrarHabitaciones({});
});