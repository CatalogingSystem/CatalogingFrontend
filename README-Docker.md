# CatalogingSystem - Ejecución de Proyectos Independientes

Este documento explica cómo ejecutar el frontend y backend como contenedores separados e independientes, ya que están en repositorios diferentes.

## Configuración de Puertos

- **Frontend**: `http://localhost:3001`
- **Backend API**: `http://localhost:8080`
- **PostgreSQL**: `localhost:5432`
- **pgAdmin**: `http://localhost:5050`

## 🔧 Backend (CatalogingSystem)

### 1. Ejecutar Backend con Docker

```bash
cd CatalogingSystem
docker-compose up --build
```

Esto iniciará:

- API en `http://localhost:8080`
- PostgreSQL en `localhost:5432`
- pgAdmin en `http://localhost:5050`

### 2. Verificar Backend

Abre `http://localhost:8080/swagger` para ver la documentación de la API.

## 🎨 Frontend (CatalogingFrontend)

### 1. Ejecutar Frontend con Docker

```bash
cd CatalogingFrontend
docker-compose up --build
```

Esto iniciará el frontend en `http://localhost:3001`

### 2. Verificar Frontend

Abre `http://localhost:3001` y deberías ver la aplicación funcionando.

## 🔄 Orden de Ejecución

**IMPORTANTE**: Ejecuta primero el backend y luego el frontend.

1. **Terminal 1** - Backend:

   ```bash
   cd CatalogingSystem
   docker-compose up --build
   ```

2. **Terminal 2** - Frontend:
   ```bash
   cd CatalogingFrontend
   docker-compose up --build
   ```

## 🌐 Acceso a la Aplicación

Una vez que ambos contenedores estén corriendo:

- **Aplicación Principal**: `http://localhost:3001`
- **Rutas de Tenant**:
  - `http://localhost:3001/tenant-BO-MA-INAA/login`
  - `http://localhost:3001/tenant-BO-TEST2/login`

## 🛠️ Desarrollo Local (Sin Contenedores)

Si prefieres desarrollar sin contenedores:

### Backend:

```bash
cd CatalogingSystem/CatalogingSystem.Api
dotnet run
```

### Frontend:

```bash
cd CatalogingFrontend
npm install
npm run dev
```

## 🐛 Solución de Problemas

### CORS Errors

El backend está configurado para aceptar peticiones desde:

- `http://localhost:5173` (desarrollo con Vite)
- `http://localhost:3001` (contenedor frontend)
- `http://localhost:3000` (backup puerto)

### Frontend no se conecta al Backend

1. Verifica que el backend esté corriendo en `http://localhost:8080`
2. Revisa que el archivo `.env` del frontend tenga:
   ```
   VITE_API_BASE_URL=http://localhost:8080
   ```

### Problemas de Puerto

Si los puertos están ocupados:

- **Frontend**: Cambia el puerto en `CatalogingFrontend/docker-compose.yml`:

  ```yaml
  ports:
    - "3002:80" # Cambia 3001 por 3002
  ```

- **Backend**: Cambia el puerto en `CatalogingSystem/docker-compose.yml`:
  ```yaml
  ports:
    - "8081:8080" # Cambia 8080 por 8081
  ```

### Ver Logs

```bash
# Frontend
cd CatalogingFrontend
docker-compose logs -f

# Backend
cd CatalogingSystem
docker-compose logs -f
```

### Detener Contenedores

```bash
# Frontend
cd CatalogingFrontend
docker-compose down

# Backend
cd CatalogingSystem
docker-compose down
```

### Resetear Base de Datos

```bash
cd CatalogingSystem
docker-compose down -v
docker-compose up --build
```

## 📝 Notas Importantes

1. **Repositorios Separados**: Cada proyecto mantiene su propia configuración Docker
2. **Sin Dependencias**: Los contenedores no dependen uno del otro en Docker
3. **Comunicación HTTP**: El frontend se conecta al backend vía HTTP en localhost
4. **Variables de Entorno**: Cada proyecto maneja sus propias variables de entorno
