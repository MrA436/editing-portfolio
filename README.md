# Video editor portfolio

## Run locally
    npm install
    npm run dev        # http://localhost:3000

## Replace your content
- Name, email, YouTube link, video paths, titles, descriptions: `data/site.ts`
- Videos: put .mp4 files in `public/videos/` using the file names in `data/site.ts`
- Thumbnails: put .jpg files in `public/thumbnails/` using the names in `data/site.ts`
- Horizontal videos? Set `videoAspect: "16 / 9"` in `data/site.ts` (and consider making the grid 1 column).

Tip: compress each video to roughly 5-15 MB (H.264 .mp4) so it starts quickly.

## Deploy to Vercel
    npm i -g vercel
    vercel            # first deploy, follow the prompts
    vercel --prod     # production deploy
Or push to GitHub and import the repo at vercel.com/new.