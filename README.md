# Sistema de Reserva de Salas - Node.js

## 📋 Descripción del Proyecto

Este proyecto es una aplicación web para la gestión de reservas de salas desarrollada en Node.js. Permite a los usuarios consultar salas disponibles, crear reservas, ver todas las reservas existentes y eliminar reservas específicas. La aplicación utiliza únicamente módulos nativos de Node.js y maneja los datos mediante archivos JSON.

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm (Node Package Manager)

### Pasos para la instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/sacom14/node_reserva_sala.git
   cd Node_UA1_AA
   ```

2. **Instalar dependencias**
    (en este caso no hace falta)
   ```bash
   npm install
   ```

3. **Iniciar el servidor**
   ```bash
   npm start
   ```
   
   O directamente:
   ```bash
   node server.js
   ```

4. **Verificar funcionamiento**
   - El servidor se ejecutará en `http://localhost:3000`
   - Verás el mensaje: "Server is running on http://localhost:3000"

## 📁 Estructura del Proyecto

```
Node_UA1_AA/
├── package.json          # Configuración del proyecto y dependencias
├── README.md             # Documentación del proyecto
├── server.js             # Archivo principal del servidor
├── data/                 # Directorio de datos JSON
│   ├── reservations.json # Almacena las reservas
│   └── rooms.json        # Almacena información de las salas
└── src/                  # Código fuente de la aplicación
    ├── config.js         # Configuración global
    ├── router.js         # Manejo de rutas
    ├── utils.js          # Funciones utilitarias
    ├── validations.js    # Validaciones de datos
    └── handlers/         # Manejadores de rutas específicas
        ├── reservations.js # Lógica de reservas
        └── rooms.js        # Lógica de salas
```

## 📄 Descripción Detallada de Archivos

### Archivos Principales

#### `package.json`
- **Propósito**: Define la configuración del proyecto npm
- **Contenido**:
  - Nombre del proyecto: "reserva_sala"
  - Versión: "1.0.0"
  - Tipo de módulo: ES6 modules
  - Script de inicio: `node server.js`

#### `server.js`
- **Propósito**: Archivo principal que inicia el servidor HTTP
- **Funcionalidades**:
  - Crea el servidor HTTP en el puerto 3000
  - Inicializa archivos de datos si no existen
  - Establece datos iniciales para salas
  - Maneja errores globales del servidor
  - Delega el enrutamiento al módulo router

### Directorio `src/`

#### `config.js`
- **Propósito**: Centraliza la configuración de la aplicación
- **Constantes definidas**:
  - `PORT`: Puerto del servidor (3000)
  - `DATA_DIR`: Directorio de datos
  - `RESERVATION_FILE`: Ruta del archivo de reservas
  - `ROOMS_FILE`: Ruta del archivo de salas

#### `router.js`
- **Propósito**: Maneja el enrutamiento de la aplicación
- **Función principal**: `router(req, res)`
- **Responsabilidades**:
  - Analiza las URL entrantes
  - Dirige las peticiones a los handlers apropiados
  - Maneja rutas no encontradas (404)

#### `utils.js`
- **Propósito**: Funciones utilitarias reutilizables
- **Funciones principales**:
  - `ensureFileExists()`: Crea archivos JSON si no existen
  - `readJson()`: Lee y parsea archivos JSON
  - `writeJson()`: Escribe datos en archivos JSON
  - `send()`: Envía respuestas HTTP con formato JSON
  - `parseBody()`: Parsea el cuerpo de peticiones HTTP

#### `validations.js`
- **Propósito**: Validaciones de datos de negocio
- **Funciones de validación**:
  - `isPast()`: Verifica si una fecha/hora es pasada
  - `sameSlot()`: Compara si dos reservas ocupan el mismo horario
  - `isRoomCapacityValid()`: Valida la capacidad de una sala

### Directorio `handlers/`

#### `rooms.js`
- **Propósito**: Maneja operaciones relacionadas con salas
- **Función**:
  - `getAvailableRooms()`: Obtiene todas las salas disponibles

#### `reservations.js`
- **Propósito**: Maneja operaciones CRUD de reservas
- **Funciones**:
  - `getAllReservations()`: Obtiene todas las reservas
  - `postReservation()`: Crea una nueva reserva
  - `deleteReservation()`: Elimina una reserva específica

### Directorio `data/`

#### `rooms.json`
- **Propósito**: Almacena información de las salas
- **Estructura**:
  ```json
  {
    "id": "R-1",
    "name": "Sala A",
    "capacity": 4,
    "location": "Planta 1"
  }
  ```

#### `reservations.json`
- **Propósito**: Almacena las reservas realizadas
- **Estructura**:
  ```json
  {
    "id": "uuid-generado",
    "roomId": "R-1",
    "name": "Nombre del usuario",
    "date": "2025-06-20",
    "hour": 14,
    "quantityOfPeople": 3
  }
  ```

## 🛣️ API Routes - Documentación Detallada

### 1. GET `/rooms`
- **Propósito**: Obtiene la lista de todas las salas disponibles
- **Método HTTP**: GET
- **Parámetros**: Ninguno
- **Respuesta exitosa**: 200 OK
- **Ejemplo de respuesta**:
  ```json
  [
    {
      "id": "R-1",
      "name": "Sala A",
      "capacity": 4,
      "location": "Planta 1"
    }
  ]
  ```
- **Casos de uso**: Mostrar salas disponibles para reservar

### 2. GET `/reservations`
- **Propósito**: Obtiene todas las reservas existentes
- **Método HTTP**: GET
- **Parámetros**: Ninguno
- **Respuesta exitosa**: 200 OK
- **Ejemplo de respuesta**:
  ```json
  [
    {
      "id": "0daaad91-a90b-4ef3-9f6f-3feba2c6e3af",
      "roomId": "R-1",
      "name": "Pedrito",
      "date": "2025-06-29",
      "hour": 19,
      "quantityOfPeople": 3
    }
  ]
  ```
- **Casos de uso**: Listar todas las reservas para gestión

### 3. POST `/reservations`
- **Propósito**: Crea una nueva reserva de sala
- **Método HTTP**: POST
- **Content-Type**: application/json
- **Campos requeridos**:
  - `roomId`: ID de la sala a reservar
  - `name`: Nombre del usuario que reserva
  - `date`: Fecha de la reserva (formato: YYYY-MM-DD)
  - `hour`: Hora de la reserva (0-23)
  - `quantityOfPeople`: Número de personas
- **Ejemplo de petición**:
  ```json
  {
    "roomId": "R-1",
    "name": "Juan Pérez",
    "date": "2025-06-25",
    "hour": 14,
    "quantityOfPeople": 3
  }
  ```
- **Validaciones aplicadas**:
  - Todos los campos son obligatorios
  - No se puede reservar en el pasado
  - La sala debe existir
  - El horario no debe estar ocupado
  - La capacidad debe ser válida
- **Respuestas posibles**:
  - 201 Created: Reserva creada exitosamente
  - 400 Bad Request: Datos inválidos o reserva en el pasado
  - 404 Not Found: Sala no encontrada
  - 409 Conflict: Horario ya reservado

### 4. DELETE `/reservations/delete/{id}`
- **Propósito**: Elimina una reserva específica
- **Método HTTP**: DELETE
- **Parámetros de URL**: 
  - `id`: UUID de la reserva a eliminar
- **Ejemplo de URL**: `/reservations/delete/0daaad91-a90b-4ef3-9f6f-3feba2c6e3af`
- **Respuestas posibles**:
  - 204 No Content: Reserva eliminada exitosamente
  - 400 Bad Request: ID de reserva requerido
  - 404 Not Found: Reserva no encontrada

## 🔧 Funcionalidades Detalladas

### Sistema de Validaciones
1. **Validación temporal**: Previene reservas en fechas/horas pasadas
2. **Validación de capacidad**: Verifica que el número de personas no exceda la capacidad
3. **Validación de disponibilidad**: Evita reservas duplicadas en el mismo horario
4. **Validación de existencia**: Confirma que la sala existe antes de reservar

### Manejo de Errores
- **Errores 400**: Datos inválidos o faltantes
- **Errores 404**: Recursos no encontrados
- **Errores 409**: Conflictos de reserva
- **Errores 500**: Errores internos del servidor

### Persistencia de Datos
- Los datos se almacenan en archivos JSON
- Creación automática de archivos si no existen
- Datos iniciales predefinidos para salas

## 🧪 Pruebas de la API

### Ejemplos con cURL

```bash
# Obtener salas disponibles
curl -X GET http://localhost:3000/rooms

# Obtener todas las reservas
curl -X GET http://localhost:3000/reservations

# Crear una nueva reserva
curl -X POST http://localhost:3000/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "roomId": "R-1",
    "name": "Test User",
    "date": "2025-06-25",
    "hour": 15,
    "quantityOfPeople": 2
  }'

# Eliminar una reserva
curl -X DELETE http://localhost:3000/reservations/delete/{reservation-id}
```

## 📊 Datos Iniciales

### Salas Predefinidas
- **Sala A**: Capacidad 4 personas, Planta 1
- **Sala B**: Capacidad 3 personas, Planta 2
- **Sala C**: Capacidad 5 personas, Planta 1
- **Sala D**: Capacidad 4 personas, Planta 1


## 🔮 Posibles Mejoras Futuras

- Implementar base de datos real (MongoDB, PostgreSQL)
- Añadir sistema de autenticación y autorización
- Implementar interfaz web frontend
- Añadir validaciones más robustas
- Implementar logging y monitoreo
- Añadir tests unitarios y de integración
- Implementar manejo de concurrencia

---

**Autor**: Samir Comas Moral  
**Fecha**: Junio 2025  
**Versión**: 1.0.0