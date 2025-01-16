document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('reservation-form');
  const checkIn = document.getElementById('check-in');
  const checkOut = document.getElementById('check-out');
  const checkInError = document.getElementById('check-in-error');
  const checkOutError = document.getElementById('check-out-error');

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];
  checkIn.min = today;
  checkOut.min = today;

  checkIn.addEventListener('change', function() {
      checkOut.min = checkIn.value;
      if(checkOut.value && checkOut.value < checkIn.value) {
          checkOut.value = checkIn.value;
      }
      validateDates();
  });

  checkOut.addEventListener('change', function() {
      validateDates();
  });

  function validateDates() {
      const start = new Date(checkIn.value);
      const end = new Date(checkOut.value);
      const today = new Date();
      today.setHours(0,0,0,0);

      checkInError.classList.add('hidden');
      checkOutError.classList.add('hidden');

      if(start < today) {
          checkInError.textContent = 'La fecha debe ser igual o posterior a hoy';
          checkInError.classList.remove('hidden');
          return false;
      }

      if(end < start) {
          checkOutError.textContent = 'La fecha de salida debe ser posterior a la llegada';
          checkOutError.classList.remove('hidden');
          return false;
      }

      return true;
  }

  form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if(!validateDates()) {
          return;
      }

      // Aquí puedes agregar la lógica para buscar habitaciones disponibles
      console.log('Buscando habitaciones disponibles...', {
          checkIn: checkIn.value,
          checkOut: checkOut.value,
          guests: document.getElementById('guests').value
      });
  });
});