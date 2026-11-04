import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Social share card (WhatsApp, LinkedIn, X, Slack…) for the home page.
export const alt = 'Chirag Shyani — Tech Lead & Senior Full-Stack Developer · 8+ years';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const photo = await readFile(join(process.cwd(), 'public/profile.jpg'), 'base64');

const SERVICES = ['Web Apps', 'Android & iOS', 'Desktop', 'AI Automation', 'Shopify Apps', 'CRM & Payroll'];

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'linear-gradient(135deg, #050507 0%, #12080a 60%, #1c0a0c 100%)',
          color: '#fafafa',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
          <div style={{ display: 'flex', fontSize: 24, letterSpacing: 6, color: '#E31E24', marginBottom: 20 }}>
            8+ YEARS · TAKING NEW CLIENT PROJECTS
          </div>
          <div style={{ display: 'flex', fontSize: 76, fontWeight: 700, lineHeight: 1.02 }}>Chirag Shyani</div>
          <div style={{ display: 'flex', fontSize: 40, color: '#d4d4d8', marginTop: 14 }}>
            Tech Lead & Senior Full-Stack Developer
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 40, maxWidth: 720 }}>
            {SERVICES.map((s) => (
              <div
                key={s}
                style={{
                  display: 'flex',
                  fontSize: 24,
                  padding: '10px 20px',
                  border: '1px solid rgba(227,30,36,0.55)',
                  borderRadius: 999,
                  color: '#fafafa',
                }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={`data:image/jpeg;base64,${photo}`}
            width={300}
            height={300}
            alt=""
            style={{ borderRadius: 999, border: '6px solid #E31E24', objectFit: 'cover' }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
