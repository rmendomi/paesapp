export default function WaveDecor({ className = '', color = '#3b82f6', opacity = 0.06, height = 80 }) {
  return (
    <svg className={className} viewBox="0 0 1440 80" preserveAspectRatio="none"
      style={{ height, display: 'block', opacity }}>
      <path fill={color}
        d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1350,20 1440,40 L1440,80 L0,80 Z" />
    </svg>
  );
}

export function BookStackIcon({ className = '', color = '#3b82f6' }) {
  return (
    <svg className={className} viewBox="0 0 120 28" fill="none">
      <rect x="0"  y="18" width="120" height="8" rx="4" fill={color} opacity="0.5" />
      <rect x="5"  y="10" width="100" height="8" rx="4" fill={color} opacity="0.65" />
      <rect x="10" y="2"  width="80"  height="8" rx="4" fill={color} opacity="0.85" />
    </svg>
  );
}
