# ExpressJS API Example

This example starts an [ExpressJS](https://expressjs.com/) server written in [TypeScript](https://www.typescriptlang.org/).

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/n_2mnn?referralCode=matt)

## ✨ Features

- Express
- TypeScript

## 💁‍♀️ How to use

- Install dependencies `yarn`
- Connect to your Railway project `railway link`
- Start the development server `railway run yarn dev`

## 📝 Notes

The server started simply returns a healthcheck `status: "ok"` payload in JSON. The server code is located in `src/index.ts`.

A versioned API route is available in `src/api.ts` and example function `hello` at `/api/v1/hello`.

## 👏 Thanks

- [Faraz Patankar](https://github.com/FarazPatankar) / Railway team for the [original template](https://github.com/railwayapp-templates/expressjs)
