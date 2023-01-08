# Nodepop

Deploy:

```sh
npm install
```

Load initial data to database:

```
npm run init-db
```

Start the application in production with:

```sh
npm start
```

Start the application in development with:

```sh
npm run dev
```

## API Documentation

Adverts list:

GET /api/anuncios

Example to filter by price
http://127.0.0.1:3000/api/anuncios?price=25

Example to filter by sale
http://127.0.0.1:3000/api/anuncios?sale=true

Example to filter by field: name
http://127.0.0.1:3000/api/anuncios?fields=name

Pagination example to return ad 3 to 6:
http://127.0.0.1:3000/api/anuncios?skip=2&limit=3

The API returns the images of each advertisement by doing a
request to url:
http://127.0.0.1:3000/images/*.jpg