# Examen

Examen de desarrollador jr.

## Notas:
Pequeño proyecto para examen de la vacante de desarrollador JR, consiste en un CRUD completo.
Proyecto desarrollado con PHP7 en el backend, y webpack en el frontend

>se instaló la siguiente libreria Microsoft ODBC 17 for SQL Server.
>Y los drivers (extensiones) PHP->SQLS version 5.8.0 [reference](https://github.com/Microsoft/msphpsql/releases/tag/v5.8.0):
>- sqlsrv
>- pdo_sql php 7
>
>tambien se tiene que habilitar las extensiones de php 
>- obdc
>- pdo_odbc

Se habilito un entorno de desarrollo local con wampServer 3.2.6

## Sobre webpack frontend
### Recuerda revisar los updates de los modulos de node...

#### check updates
```
npm outdated
```

### Dependencias externas
- Bootstrap

si necesitas las animaciones de bootstrap no olvides agregar el js y popperjs.

#### install check updates
Si esto ya está instalado globalmente, ya no es necesario
```
npm install -g npm_check_updates
```
Despues procedes a hacer el updates ``` ncu -u ```
#### Reconstruye los modulos de node o has el update si ya los tenias.
A veces es mejor el ```npm install```

```
npm update or npm install
``` 

Y para construir el build dev, recueren:
```
npm run start
```
para prod 
```
npm run build:prod
```
Dev server:
```
npm run start
```