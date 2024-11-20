# 🏆 Reto UpperEat

Sistema de Gestión de Reservas para Restaurantes desarrollado con **Next.js**, **Prisma** y **Tailwind CSS**.

## 🚀 Características Principales

### 📝 Crear Reserva
- Formulario para registrar reservas.
- Campos requeridos: 
  - **Nombre del cliente**.
  - **Número de personas**.
  - **Fecha** y **hora** de la reserva.
- Las reservas se crean con el estado inicial de `pendiente`.

### 📋 Listado de Reservas
- Visualización de todas las reservas ordenadas por **fecha** y **hora**.
- Cada reserva muestra información relevante como cliente, número de personas, fecha, hora y estado.

### ✏️ Modificar Estado de Reserva
- Posibilidad de cambiar el estado de la reserva.
- Estados disponibles:
  - `pendiente`
  - `confirmada`
  - `cancelada`
  - `completada`

### 🗑️ Eliminar Reserva
- Botón para eliminar reservas directamente desde la lista.

---

## 📦 Instalación y Configuración

### 🛠️ Requisitos
- **Node.js** `>= 16.8.0`
- **MySQL** como base de datos.

### 🛠️ Configuración Inicial
1. **Clona el repositorio:**
   ```bash
   git clone <REPO_URL>
   cd reto-uppereat

2. **Configuración e instalación del proyecto:**

   Ejecuta los siguientes comandos en el terminal para configurar y preparar el entorno del proyecto:

   ```bash
   # Instala las dependencias del proyecto
   npm install

   # Configura las variables de entorno (Backend)
   echo "DATABASE_URL=mysql://<usuario>:<password>@<host>:<puerto>/<nombre_base_datos>" > .env

   # Configura las variables de entorno para NEXT_PUBLIC_API_URL=http://localhost:3000/api

   # Aplica las migraciones de Prisma
   npx prisma migrate dev

   # Carga los estados iniciales con el seed
   npm run seed

   # Inicia el servidor de desarrollo
   npm run dev

   
