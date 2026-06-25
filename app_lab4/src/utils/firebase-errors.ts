import { FirebaseError } from "firebase/app";

// Traduce los códigos de error de Firebase Auth a mensajes claros en español.
// Así el usuario nunca ve algo como "auth/invalid-credential".
export function getAuthErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/invalid-email":
        return "El correo no es válido.";
      case "auth/user-disabled":
        return "Esta cuenta ha sido deshabilitada.";
      case "auth/user-not-found":
        return "No existe una cuenta con ese correo.";
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "Correo o contraseña incorrectos.";
      case "auth/email-already-in-use":
        return "Ya existe una cuenta con ese correo.";
      case "auth/weak-password":
        return "La contraseña es muy débil (mínimo 6 caracteres).";
      case "auth/too-many-requests":
        return "Demasiados intentos. Inténtalo más tarde.";
      case "auth/network-request-failed":
        return "Error de red. Revisa tu conexión.";
      case "auth/operation-not-allowed":
        return "El método email/contraseña no está habilitado en Firebase.";
      default:
        return "Ocurrió un error. Inténtalo de nuevo.";
    }
  }
  return "Ocurrió un error inesperado.";
}
