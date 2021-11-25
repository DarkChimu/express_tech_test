# Express Tech API

## Instalación

Usar el manejador de paquetes [yarn]() para instalar dependencias

Base de datos: PostgreSQL

## Variables de entorno
```javascript
HOST=127.0.0.1
PORT=3333
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=example
DB_PASSWORD=Example
DB_DATABASE=api_test
TOKEN_KEY=123456789
````

## Uso

```javascript

Pasar como header x-access-token el token generado al crear o logear un usuario.

//registrar usuario
Ruta POST: /users/register
{
    "firstName": "John",
    "lastName": "Connor",
    "email": "test@testing.io",
    "role": "doctor", // o usuario
    "password": "1234"
}

//login y obtención de token
Ruta POST: '/users/login'
{
    "email": "testubg@testing.io",
    "password": "1234"
}

//obtener las citas pasando la id del doctor
Ruta GET: /dates/:id

//cambiar el status de la cita (solo como rol de doctor) pasando la id de la cita
Ruta PUT: /dates/:id

//crear una cita pasando el id del doctor
Ruta POST: /dates/create/:id
{
    "user_id": 2, //id del usuario logeado
    "time": "31 de Octubre",
    "description": "enfermo por x cosa"
}


```
