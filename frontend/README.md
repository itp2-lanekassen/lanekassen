# Lånekassen Frontend

Using Node 18

## Development

Install dependencies:

```bash
npm ci
```

Run development server:

```bash
npm run dev
```

Server will be started on <http://localhost:3000>

## Production

Install dependencies:

```bash
npm ci
```

To preview the production build:

```bash
npm run preview
```

Build for production:

```bash
npm run build
```

Build files can be fond in the `dist` directory

## Quality and testing

All files are checked with eslint on commit. *NOT IMPLEMENTED YET:  Tests are ran on push*

Running eslint manually:

```bash
npm run lint
```

Running eslint and fixing errors:

```bash
npm run lint:fix
```

Running typecheck:

```bash
npm run typecheck
```

*NOT IMPLEMENTED YET: Testing:*

```bash
npm test
```
