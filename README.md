First, run the development server:

```bash
npx create-next-app@latest
```

```bash
npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^6
```

```bash
npm i swr moment @sanity/client
```

```bash
mkdir studio
npm install -g @sanity/cli && sanity init --template get-started --project k29pknem --dataset production --provider github

sanity start
```

```bash
cd next-sanity-todo
npm run dev
```
