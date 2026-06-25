// metro.config.js
// REQUERIDO para que el Firebase JS SDK funcione en Expo SDK 53/54.
// Expo SDK 53+ activa `unstable_enablePackageExports` por defecto, lo que rompe
// la resolución de los .cjs internos de Firebase y produce el error:
//   "Component auth has not been registered yet"
// Estas dos líneas lo solucionan. Después de crearlo: `npx expo start --clear`.
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push("cjs");
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
