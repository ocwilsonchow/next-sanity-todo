```bash
## Create template
npx create-next-app@latest
```

```bash
## Install Chakra
npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^6
```

```bash
## Install all packages
npm i swr moment @sanity/client groq @chakra-ui/icons react-icons
```

```bash
## Install Sanity Studio and set up schema
mkdir studio
mkdir lib
npm install -g @sanity/cli && sanity init --template get-started --project k29pknem --dataset production --provider github

# Start local Sanity Studio server
# Open localhost:3333
sanity start
```

```bash
## Start localhost:3000
cd next-sanity-todo
npm run dev
```
