If your workflow blocks binary uploads, keep using inline placeholder audio (already configured).

To use your real samples without committing binaries:
1) Upload MP3 files to external hosting (S3, Supabase Storage, Cloudinary, etc.).
2) Update `sampleAudioSources` in `src/pages/Jingle.tsx` with those public URLs.

If binary files are allowed in your workflow, you can still use:
- public/jingle/freecvaudit.mp3
- public/jingle/work-waves.mp3
- public/jingle/copyarabia.mp3
