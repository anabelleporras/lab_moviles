# Auth App — Expo + Firebase

Aplicación móvil de autenticación construida con **React Native (Expo)** y **TypeScript**. Soporta dos métodos de inicio de sesión —**correo/contraseña** con Firebase Auth y **Google OAuth** vía `expo-auth-session`— con persistencia de sesión en `AsyncStorage` y un sistema de tema propio con soporte para modo claro y oscuro.

---

## Características

- **Registro e inicio de sesión** con correo y contraseña (Firebase Auth).
- **Inicio de sesión con Google** usando `expo-auth-session` (flujo OAuth nativo).
- **Sesión persistente**: el usuario sigue logueado al cerrar y reabrir la app, tanto para Google como para email/password.
- **Validación de formularios** en cliente (nombre, correo, contraseña, confirmación).
- **Mensajes de error traducidos** al español a partir de los códigos de Firebase Auth.
- **Tema claro/oscuro** automático según la apariencia del sistema, con paleta minimalista (negro/blanco/gris) y acento invertido.
- **Pantalla de perfil** con avatar (foto de Google o iniciales) y método de sesión usado.

---

## Stack

| Área | Tecnología |
|------|-----------|
| Framework | Expo SDK 54 |
| Lenguaje | TypeScript (estricto) |
| Auth | Firebase v12 (`firebase/auth`) |
| OAuth | `expo-auth-session` + `expo-web-browser` |
| Persistencia | `@react-native-async-storage/async-storage` |
| UI / safe areas | `react-native-safe-area-context` |
| Iconos | `react-native-svg` |
| Gestor de paquetes | Bun |

---

## Estructura del proyecto

```
.
├── App.tsx                     # Root: providers, splash y enrutado login/register/home
└── src/
    ├── components/
    │   ├── text-field.tsx      # Input reutilizable con label y mensaje de error
    │   └── google-logo.tsx     # Logo SVG de Google
    ├── constants/
    │   ├── theme.ts            # Paleta, tipografía, spacing, radius, temas claro/oscuro
    │   └── types.ts            # Tipos de dominio (UserInfo, AuthProvider)
    ├── hooks/
    │   ├── use-auth.tsx        # AuthProvider + hook useAuth (estado de sesión)
    │   └── use-theme.ts        # Selecciona tema según useColorScheme()
    ├── screens/
    │   ├── login.tsx           # Login email/password + botón de Google
    │   ├── register.tsx        # Registro con validación de campos
    │   └── home.tsx            # Perfil del usuario + cerrar sesión
    ├── services/
    │   └── firebase.ts         # Inicialización de Firebase y Auth (singleton)
    └── utils/
        ├── validators.ts       # Validaciones de formularios
        └── firebase-errors.ts  # Traducción de códigos de error de Firebase
```

---

## Requisitos previos

- [Bun](https://bun.sh/) instalado.
- [Expo CLI](https://docs.expo.dev/) (`bunx expo`).
- Un proyecto en [Firebase](https://console.firebase.google.com/) con **Email/Password** habilitado en *Authentication → Sign-in method*.
- Credenciales de **OAuth de Google** (iOS, Android y Web) desde Google Cloud Console.
- Para probar el login de Google necesitas un **dev build** (no funciona en Expo Go por las restricciones de bundle identifier / esquema de redirección).

---

## Variables de entorno

Crea un archivo `.env` en la raíz. El prefijo `EXPO_PUBLIC_` es obligatorio para que Expo inyecte las variables en el bundle.

```env
# Firebase
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
EXPO_PUBLIC_FIREBASE_APP_ID=...

# Google OAuth
EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS=...
EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID=...
EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB=...
```

---

## Instalación y ejecución

```bash
# Instalar dependencias
bun install

# Iniciar el servidor de desarrollo
bunx expo start
```

Para probar **Google OAuth** necesitas un dev build:

```bash
# Build de desarrollo para iOS
bunx expo run:ios

# Build de desarrollo para Android
bunx expo run:android
```

El entorno principal de pruebas es **iPhone con Expo Go** (para email/password) y el **iOS Simulator** como alternativa; el login de Google requiere el dev build descrito arriba.

---

## Cómo funciona la autenticación

El estado de sesión vive en `AuthProvider` (`src/hooks/use-auth.tsx`) y se expone con el hook `useAuth()`.

1. **Al arrancar** la app lee `AsyncStorage` bajo la clave `@auth_session`. Mientras lee, `initializing` está en `true` y `App.tsx` muestra un splash con `ActivityIndicator`.
2. **Email/password** usa `createUserWithEmailAndPassword` y `signInWithEmailAndPassword`. Firebase persiste su propio token mediante `getReactNativePersistence(AsyncStorage)` configurado en `services/firebase.ts`.
3. **Google** se resuelve en la pantalla de login: tras el flujo OAuth se obtiene el perfil desde `https://www.googleapis.com/userinfo/v2/me` y se guarda con `setGoogleUser`.
4. En ambos casos se persiste un `UserInfo` mostrable (`uid`, `name`, `email`, `picture`, `provider`) en estado y en `AsyncStorage`, de modo que la sesión se restaura igual al reabrir.
5. **`signOut`** cierra sesión en Firebase solo si el `provider` era `password`, y luego limpia el estado y el almacenamiento.

El enrutado es simple, sin librería de navegación: `App.tsx` decide entre splash, `LoginScreen`/`RegisterScreen` (sin usuario) y `HomeScreen` (con usuario).

---

## Sistema de tema

`constants/theme.ts` define la paleta, tipografía, `spacing` y `radius`, junto con `lightTheme` y `darkTheme`. El hook `use-theme.ts` elige el tema según `useColorScheme()` del sistema.

La firma visual es minimalista: el color de acento se **invierte** entre modos (un botón negro en modo claro pasa a ser blanco en modo oscuro).

> Si el modo oscuro no responde, revisa que `userInterfaceStyle` no esté fijado en `"light"` en la configuración de la app (`app.config.ts` / `app.json`).

---

## Notas de desarrollo

- `firebase.ts` usa un patrón singleton (`getApps().length ? getApp() : initializeApp(...)`) y envuelve `initializeAuth` en un `try/catch` con fallback a `getAuth` para sobrevivir al Fast Refresh.
- Los componentes consumen el tema vía `useTheme()` para mantener consistencia entre claro y oscuro.
- Todos los textos de cara al usuario están en español.