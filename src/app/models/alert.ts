import Swal, { SweetAlertOptions } from 'sweetalert2';

export class Alert {
  private static base: SweetAlertOptions = {
    heightAuto: false,
    backdrop: true, // Esta opción asegura que el fondo sea oscuro
    allowOutsideClick: false, // Impide cerrar al hacer clic fuera del modal
    confirmButtonText: 'Aceptar',
    background: 'rgba(0, 0, 0, 0.6)', // Fondo oscuro transparente
    color: '#00ff7f', // Texto complementario a tu gradiente
    customClass: {
      popup: 'custom-swal-popup', // Clase CSS personalizada
      confirmButton: 'custom-confirm-button', // Estilos para el botón
    },
  };

  static error(titulo: string, texto: string) {
    Swal.fire(Alert.base);
    Swal.update({
      icon: 'error',
      title: titulo,
      text: texto,
    });
  }

  static password() {
    return Swal.fire({
      title: 'Ingrese contraseña',
      input: 'password',
      heightAuto: false,
      backdrop: true, // Esta opción asegura que el fondo sea oscuro
      allowOutsideClick: false, // Impide cerrar al hacer clic fuera del modal
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Desactivar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      background: 'rgba(0, 0, 0)', // Fondo oscuro transparente
      color: '#00ff7f', // Texto complementario a tu gradiente
      customClass: {
        popup: 'custom-swal-popup', // Clase CSS personalizada
        confirmButton: 'custom-confirm-button', // Estilos para el botón
        cancelButton: 'custom-cancel-button', // Estilos para el botón
      },
    });
  }
}
