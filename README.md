# Next.js OpenJira APP
para correr localmentem se necesita la base de datos

```
docker-compose up -d
```

* el -d significa __detached__

## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__

* MongoDB URL Local:
```
mongodb://localhost:27017/entriesdb
```

* Reconstruir los módulos de node y levantar Next
```
yarn install
yarn dev
```


## Llenar la base de datos con la informacion de pruebas
```
http://localhost:3000/api/seed
```