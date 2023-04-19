// animacion boton hamburguesa
let hamburger = document.querySelector(".hamburger");
hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("is-active");
});



document.addEventListener("DOMContentLoaded", function () {
  // VALIDACION Y CONSUMO FORMULARIO DE CONTACTO
  $("#formContacto").validate({
    rules: {
      nombre: {
        required: true,
        minlength: 2,
        maxlength: 30,
      },
      apellido: {
        required: true,
        minlength: 2,
        maxlength: 30,
      },
      email: {
        required: true,
        email: true,
      },
      mensaje: {
        required: true,
        minlength: 5,
        maxlength: 200,
      },
    },
    messages: {
      nombre: {
        required: "Este campo no puede estar vacio",
        minlength: "El minimo de caracteres permitidos son 2",
        maxlength: "Superaste el maximo de caracteres permitidos",
      },
      apellido: {
        required: "Este campo no puede estar vacio",
        minlength: "El minimo de caracteres permitidos son 2",
        maxlength: "Superaste el maximo de caracteres permitidos",
      },
      email: {
        required: "Ingresa su correo electronico",
        email: "Ingrese un email valido",
      },
      mensaje: "No se puede enviar este campo vacio",
    },

    submitHandler: function (form) {
      let nombre = $("#nombre").val();
      let apellido = $("#apellido").val();
      let email = $("#email").val();
      let mensaje = $("#mensaje").val();
      

      $.ajax({
        url: "https://reqres.in/api/users?page=2",
        method: "POST",
        data: {
          nombre: nombre,
          apellido:apellido,
          email: email,
          mensaje: mensaje,
        },
        success: function (response) {
          console.log("Éxito:", response); 
          let formExito = ()=>{
            Swal.fire({
              title :   "Su formulario se envio correctamente",
              icon : 'success',
              padding : '2rem',
         
          });
          formContacto.reset();
          };
          formExito();
        },
        error: function (xhr, status, error) {
          console.error("Error:", error);
          let formError = ()=>{
            Swal.fire({
              title :   "Error al enviar el mensaje. Por favor intentelo nuevamente.",
              icon : 'error',
              padding : '2rem',      
          })
          }
        },
      });
    },
  });

  // Formulario de proceso
  $("#formCita").validate({
    rules: {
      nombreCita: {
        required: true,
        minlength: 2,
        maxlength: 30,
      },
      emailCita: {
        required: true,
        email: true,
      },
      telefono: {
        required: true,
        minlength: 5,
      },
      diareserva: {
        required: true,
      },
      horaCita: {
        required: true,
      },
    },
    messages: {
      diareserva: {
        required: "Selecciona un dia",
      },
      nombreCita: {
        required: "Este campo no puede estar vacio",
        minlength: "El minimo de caracteres permitidos son 2",
        maxlength: "Superaste el maximo de caracteres permitidos",
      },
      emailCita: {
        required: "Ingresa su correo electronico",
        email: "Ingrese un email valido",
      },
      telefono: {
        required: "Ingrese su numero de telefono",
        minlength: "El minimo de caracteres es 5",
      },
      horaCita: {
        required: "Selecciona un horario",
      },
    },

    submitHandler: function (form) {
      let nombreApellido = document.getElementById("nombreCita").value;
      let emailCita = document.getElementById("emailCita").value;
      let celular = document.getElementById("telefono").value;
      let diaReserva = document.getElementById("diareserva").value;
      let horarioReserva = document.getElementById("horaCita").value;

      
      let reserva = ` Nombre y Apellido : ${nombreApellido}.\n Email : ${emailCita}. \n Celular : ${celular}. \n Dia ${diaReserva} a las ${horarioReserva}. `;
      
      const alertSuccess = ()=>{
        Swal.fire({
          title :   "SU RESERVA SE REALIZO CON EXITO",
          html: `Nombre y Apellido: ${nombreApellido} <br> Email : ${emailCita} <br> Celular : ${celular} <br> Dia : ${diaReserva} <br> Horario : ${horarioReserva} `,
          icon : 'success',
          padding : '2rem',
          footer :`Ante cualquier eventualidad comunicarse al 0800-111`,
          
      })
      }

      alertSuccess();
    

      let pdf = new jsPDF();

      // Agregar el resumen al documento PDF
      pdf.text(reserva, 10, 10);

      // Generar el archivo PDF como Blob
      let pdfBlob = pdf.output("blob");

      // Crear un enlace de descarga
      let downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(pdfBlob);
      downloadLink.download = "resumen_proceso.pdf";
      downloadLink.click();

      // Liberar el objeto Blob
      URL.revokeObjectURL(pdfBlob);
    },
  });
});


