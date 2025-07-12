import Swal from 'sweetalert2';

export const showAlert = (icon, title, text) => {
    Swal.fire({
        icon,
        title,
        text,
        showConfirmButton: false,
        timer: 2500,
    });
};

export const showErrorAlert = (text) => {
    showAlert('error', 'Error', text);
};

export const showSuccessAlert = (text) => {
    showAlert('success', 'Success', text);
};
