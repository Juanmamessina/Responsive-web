// Obtener referencias a los elementos del formulario y otros elementos relevantes del DOM
const form1 = document.getElementById('personalInfoForm'); // Obtiene el formulario para la información personal
const form2 = document.getElementById('topicForm'); // Obtiene el formulario para seleccionar el tema
const steps = document.querySelectorAll('.step'); // Obtiene todos los elementos con la clase "step" (los pasos del formulario)
const confirmationMessage = document.getElementById('confirmationMessage'); // Obtiene el elemento donde se mostrará el mensaje de confirmación
const userData = document.getElementById('userData'); // Obtiene el elemento donde se mostrará la información del usuario
let currentStep = 0; // Variable para rastrear el paso actual del formulario

// Función para avanzar al siguiente paso del formulario
function nextStep(step) {
  if (step === 1) { // Si el paso es 1 (información personal)
    if (form1.name.value && form1.email.value) { // Comprueba si se han completado los campos de nombre y correo electrónico
      steps[currentStep].style.display = 'none'; // Oculta el paso actual
      currentStep++; // Avanza al siguiente paso
      steps[currentStep].style.display = 'block'; // Muestra el siguiente paso
    } else {
      alert('Please fill in all fields.'); // Muestra una alerta si no se han completado todos los campos
    }
  } else if (step === 2) { // Si el paso es 2 (selección del tema)
    if (form2.topic.value) { // Comprueba si se ha seleccionado un tema
      steps[currentStep].style.display = 'none'; // Oculta el paso actual
      currentStep++; // Avanza al siguiente paso
      steps[currentStep].style.display = 'block'; // Muestra el siguiente paso
    } else {
      alert('Please select a topic.'); // Muestra una alerta si no se ha seleccionado ningún tema
    }
  } else if (step === 3) { // Si el paso es 3 (confirmación)
    // Obtiene los valores de nombre, correo electrónico y tema seleccionado
    const name = form1.name.value;
    const email = form1.email.value;
    const topic = form2.topic.options[form2.topic.selectedIndex].text;

    // Muestra la información del usuario en el elemento userData
    document.getElementById('userData').innerHTML = `Name: ${name}<br>Email: ${email}<br>Topic: ${topic}`;

    // Oculta el paso actual
    steps[currentStep].style.display = 'none';
    currentStep++; // Avanza al siguiente paso
    steps[currentStep].style.display = 'block'; // Muestra el siguiente paso
  }
}

// Función para confirmar el registro del usuario
function confirmRegistration() {
  // Obtiene los valores de nombre, correo electrónico y tema seleccionado
  const name = form1.name.value;
  const email = form1.email.value;
  const topic = form2.topic.options[form2.topic.selectedIndex].text;

  // Crea elementos para el mensaje de confirmación y la información del usuario
  const confirmationParagraph = document.createElement('p');
  const userDataParagraph = document.createElement('p');
  userDataParagraph.innerHTML = `Name: ${name}<br>Email: ${email}<br>Topic: ${topic}`;

  // Limpia el contenido anterior en caso de confirmación previa
  confirmationMessage.innerHTML = '';
  userData.innerHTML = '';

  // Agrega los elementos al formulario de confirmación
  confirmationMessage.appendChild(confirmationParagraph);
  userData.appendChild(userDataParagraph);

  // Oculta el botón de confirmación y muestra el botón de inicio
  document.getElementById('confirmButton').style.display = 'none';
  document.getElementById('homeButton').style.display = 'block';
}

// Función para ir al paso específico del formulario
function goToStep(step) {
  // Restablece los campos del formulario
  form1.reset();
  form2.reset();

  // Limpia el mensaje de confirmación y la información del usuario
  confirmationMessage.innerHTML = '';
  userData.innerHTML = '';

  // Oculta el paso actual
  steps[currentStep].style.display = 'none';
  currentStep = step - 1; // Establece el paso actual al paso seleccionado
  steps[currentStep].style.display = 'block'; // Muestra el paso seleccionado

  // Oculta el botón de inicio
  document.getElementById('homeButton').style.display = 'none';

  // Muestra el botón de confirmación
  document.getElementById('confirmButton').style.display = 'block';
}

// Listener para mostrar el paso actual cuando se carga el contenido DOM
document.addEventListener('DOMContentLoaded', function() {
  // Muestra el paso actual
  steps[currentStep].style.display = 'block';
});
