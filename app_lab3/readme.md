# Tilt Maze

Tilt Maze es un juego para móvil desarrollado con React Native y Expo.

El jugador debe mover una bola a través de un laberinto usando los sensores del dispositivo.

## Descripción

El juego utiliza el acelerómetro para controlar el movimiento de la bola inclinando el celular. Tambien usa el giroscopio para detectar cuando el jugador sacude el dispositivo y liberar la bola si queda pegada a una pared.

## Tecnologías utilizadas

- React Native
- Expo
- TypeScript
- Bun
- Expo Sensors

## Sensores utilizados

### Acelerómetro

Se utiliza para detectar la inclinación del dispositivo y mover la bola dentro del laberinto.

### Giroscopio

Se utiliza para detectar movimientos bruscos del dispositivo. Cuando la bola choca con una pared, se queda pegada y el jugador debe sacudir el celular para despegarla.

# Mecánicas del juego

- Inclinar el celular para mover la bola.
- Evitar chocar con las paredes.
- Si la bola toca una pared:
  - se queda pegada
  - cambia de color
  - el jugador debe sacudir el celular para despegarla
- Llegar a la meta para ganar.

## Instalación

Primero, instala las dependencias:

Bun:
```bash
bun install
```

Expo Sensors:
```bash
bun add expo-sensors
```

## Ejecución del proyecto
```bash
bun expo start
```

## Uso de la aplicación
1. Abrir la aplicación.
2. Presionar el botón Jugar.
3. Leer y aceptar el aviso de uso de sensores.
4. Inclinar el celular para mover la bola.
5. Sacudir el celular si la bola queda atrapada.
6. Llegar a la meta para ganar.

## Requisitos
- Node.js
- Bun
- Expo Go o dispositivo Android/iOS

## Notas importantes
El proyecto debe ejecutarse en un dispositivo físico para utilizar correctamente:
- acelerómetro
- giroscopio
Los emuladores normalmente no soportan sensores físicos de manera completa.

## Autores

Anabelle Porras Carrillo | A03252

Quiann Zolfaghari Calderon | C18723
