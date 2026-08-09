import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0f', color: '#f0c040', border: '4px solid #d4a574', fontSize: 42, fontWeight: 800 }}>
      M
    </div>,
    { ...size },
  );
}
