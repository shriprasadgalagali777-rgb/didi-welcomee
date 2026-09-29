# Panda welcome-back player

This folder contains all nine original image cards, the interactive Back/Continue player, and the MP4. The first Continue press advances to image 2. The MP4 alone plays straight through in Instagram and cannot contain clickable branching buttons.

## Deploy on Vercel

Unzip this archive. From the extracted `vercel-welcome` folder, run:

```bash
npx vercel login
npx vercel deploy --prod
```

When asked, create a new project and use the current directory as the project root. Vercel will print a `vercel.app` URL. Open it on a phone and test Back and Continue before sharing.

The middleware returns HTTP 410 after **30 September 2026, 6:00 PM IST**, including direct requests for the video. This is a fixed deadline; if you deploy much later, edit the `expiresAt` timestamp in `middleware.js` before deploying. Already downloaded copies cannot be recalled.
