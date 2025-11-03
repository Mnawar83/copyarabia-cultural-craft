# CopyArabia Cultural Craft Website

This repository contains the source code for the CopyArabia website – an Arabic copywriting and transcreation agency founded by Mnawar Mohammed in 2014.  The site showcases CopyArabia’s services, values and portfolio while offering prospective clients an easy way to get in touch.

The application is built using **Vite**, **TypeScript**, **React**, **shadcn‑ui** and **Tailwind CSS**.  It is designed to be lightweight, responsive and easy to maintain.

## Getting started

To run the project locally you will need a recent version of Node.js and npm installed.  Clone the repository, install the dependencies and start the development server:

```sh
git clone <REPO_URL>
cd copyarabia-cultural-craft
npm install
npm run dev
```

During development the site will be served at `http://localhost:8080/`.  The development server supports hot module replacement so changes are reflected immediately in the browser.

## Project structure

The repository is organised as follows:

| Path          | Description                                                               |
|---------------|---------------------------------------------------------------------------|
| `public/`     | Static assets served at the root of the website (favicon, images, etc.)   |
| `src/`        | Front‑end source code (React components, pages, hooks and utilities)       |
| `supabase/`   | Supabase configuration and SQL migrations                                  |
| `tailwind.config.ts` | Tailwind CSS configuration file                                   |

## License

This project and its contents are the property of CopyArabia.  All rights reserved.
