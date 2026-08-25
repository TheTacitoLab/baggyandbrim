'use client';

// Replaces the root layout when the layout itself throws. Must define its own
// html/body. Deliberately minimal and self-contained.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-GB">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#11110F',
          color: '#F7F6F1',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          padding: '2rem',
        }}
      >
        <title>Something went wrong | Baggy &amp; Brim</title>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Something slipped.</h1>
        <p style={{ marginTop: '1rem', maxWidth: '40ch', color: 'rgba(247,246,241,0.72)' }}>
          That did not load as it should. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: '1.5rem',
            alignSelf: 'flex-start',
            background: '#F7F6F1',
            color: '#11110F',
            border: 0,
            borderRadius: 2,
            padding: '0.75rem 1.5rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
