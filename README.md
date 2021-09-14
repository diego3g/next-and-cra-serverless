# Next.js + CRA on Serverless

This project aims to deploy a Next.js and a CRA (create-react-app) application on AWS using Serverless Framework.

Besides that, it should be able to access both application routes through the Next.js domain.

## How it works

On route access, Next.js will try to find a page within the pages directory and, if not found, Next.js will internally rewrite the route to the CRA application.
