const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateName(name: string): string | null {
  const value = name.trim();
  if (!value) return "El nombre es obligatorio.";
  if (value.length < 2) return "El nombre es muy corto.";
  return null;
}

export function validateEmail(email: string): string | null {
  const value = email.trim();
  if (!value) return "El correo es obligatorio.";
  if (!EMAIL_RE.test(value)) return "Ingresa un correo válido.";
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "La contraseña es obligatoria.";
  // Firebase exige mínimo 6 caracteres para email/password.
  if (password.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
  return null;
}

export function validateConfirm(password: string, confirm: string): string | null {
  if (!confirm) return "Confirma tu contraseña.";
  if (password !== confirm) return "Las contraseñas no coinciden.";
  return null;
}
