// app/head.tsx

export default function Head() {
  return (
    <>
      <title>Digital Blueprint | AEC Tech Directory</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Discover, compare, and explore the best construction technology tools—from BIM to drone mapping." />
      <meta charSet="UTF-8" />
      <meta name="theme-color" content="#0f172a" />
      <link rel="icon" href="/favicon.ico" />

      {/* ✅ Plausible Analytics Tracking */}
      <script
        defer
        data-domain="constructiveblueprint.com"
        src="https://plausible.io/js/script.js"
      />
    </>
  );
}
