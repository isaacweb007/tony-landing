import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

const base = (props: IconProps): IconProps => ({
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  ...props,
});

export const RocketIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M14.5 9.5 L14.5 9.5 M9 15c-2 1-3 3-3 5 2 0 4-1 5-3M14 4c3-1 5 1 6 2 1 1 3 3 2 6-1 3-7 8-9 9l-4-4c1-2 6-8 9-9zM9 13c-1 0-3 0-4 1l4 4c1-1 1-3 1-4z"/>
  </svg>
);

export const UsersIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="9" cy="8" r="3.2"/>
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/>
    <circle cx="17" cy="9" r="2.5"/>
    <path d="M15 14.5c2.7.4 5 2.5 5 5.5"/>
  </svg>
);

export const CalendarIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/>
    <path d="M3.5 9.5 L20.5 9.5 M8 3.5 L8 6.5 M16 3.5 L16 6.5"/>
    <circle cx="8" cy="14" r="1" fill="currentColor"/>
  </svg>
);

export const ChatBubbleIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M20.5 12.5c0 4.5-3.8 8-8.5 8-1.4 0-2.7-.3-3.9-.8L3.5 21l1.4-4.6c-1-1.3-1.4-2.9-1.4-4.4 0-4.5 3.8-8 8.5-8s8.5 3.5 8.5 8z"/>
    <circle cx="9" cy="12" r=".7" fill="currentColor"/>
    <circle cx="12" cy="12" r=".7" fill="currentColor"/>
    <circle cx="15" cy="12" r=".7" fill="currentColor"/>
  </svg>
);

export const MoonIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11z"/>
  </svg>
);

export const HandshakeIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M11 18l-3.5 3.5a2 2 0 0 1-3-3L8 15M13 6l3.5-3.5a2 2 0 0 1 3 3L16 9"/>
    <path d="M3 14l4-4 4 4 4-4 4 4 2-2-6-6-3 3-3-3-6 6 2 2zM12 12l4 4M8 16l3 3"/>
  </svg>
);

export const CheckIcon = (props: IconProps) => (
  <svg {...base(props)} strokeWidth={2.5}>
    <path d="M5 13l4 4L19 7"/>
  </svg>
);

export const CheckCircleIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="12" cy="12" r="9"/>
    <path d="M8 12.5l3 3 5-6.5" strokeWidth={2.2}/>
  </svg>
);

export const LockIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/>
    <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>
    <circle cx="12" cy="15.5" r="1" fill="currentColor"/>
  </svg>
);

export const ShieldLockIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 3l8 3.5v6c0 4.7-3.4 8.5-8 9.5-4.6-1-8-4.8-8-9.5v-6L12 3z"/>
    <path d="M12 11.5v3.5M9.5 11.5h5"/>
  </svg>
);

export const MountainIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M3 20l5.5-9 4 6 2.5-3.5 6 6.5z"/>
    <circle cx="16" cy="6.5" r="1.5"/>
  </svg>
);

export const BellIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2.5h-15L6 16z"/>
    <path d="M10 21a2 2 0 0 0 4 0"/>
  </svg>
);

export const SparkleIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM18 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2zM5 4l.5 1.5 1.5.5-1.5.5L5 8l-.5-1.5L3 6l1.5-.5L5 4z" fill="currentColor" stroke="none"/>
  </svg>
);

export const PaperPlaneIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M21 3L3 11l7 2 2 7 9-17z"/>
    <path d="M10 13l5-5"/>
  </svg>
);

export const BoltIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill="currentColor" fillOpacity={0.15}/>
  </svg>
);

export const LeafIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M5 19c0-8 6-14 16-14 0 10-6 16-14 16-1 0-2 0-2-2zM5 19l8-8"/>
  </svg>
);

export const FlameIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 2c1 4 5 6 5 11a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-10z"/>
  </svg>
);

export const GlobeIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="12" cy="12" r="9"/>
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>
  </svg>
);

export const BrainIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 1 4 3 3 0 0 0 4 3V4zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-1 4 3 3 0 0 1-4 3V4z"/>
    <path d="M9 9h2M13 9h2M9 14h2M13 14h2"/>
  </svg>
);

export const CrownIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M3 8l3 9h12l3-9-5 4-4-7-4 7-5-4z"/>
    <path d="M5 20h14"/>
  </svg>
);

export const PencilIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4 20h4l11-11-4-4-11 11v4z"/>
    <path d="M14 6l4 4"/>
  </svg>
);

export const GiftIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="3.5" y="9" width="17" height="11" rx="1.5"/>
    <path d="M3.5 13h17M12 9v11M8 9c-1.5 0-3-1-3-2.5S6 4 7.5 4 12 9 12 9s3-5 4.5-5S20 5 20 6.5 18.5 9 17 9"/>
  </svg>
);

export const EnvelopeIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="3" y="5.5" width="18" height="13" rx="2"/>
    <path d="M3 7l9 6 9-6"/>
  </svg>
);

export const ChartIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>
  </svg>
);

export const BowlIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M3 11h18a9 9 0 0 1-18 0z"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4M2 21h20"/>
  </svg>
);

export const PinIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M9 4l6 6-3 1-3 7-1-1 1-7-7 1-1-1 7-3 1-3z"/>
  </svg>
);

export const PartyIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M2 22l4-12 10 10L2 22z"/>
    <path d="M14 4l1.5 1.5M19 7l1.5 1.5M16 11l3-1M11 6l1-3"/>
  </svg>
);

export const WarningIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 3l10 17H2L12 3z"/>
    <path d="M12 10v4M12 17.5v.5" strokeWidth={2}/>
  </svg>
);

export const HeartIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 20s-7-4.5-7-10a4.5 4.5 0 0 1 8-3 4.5 4.5 0 0 1 8 3c0 5.5-7 10-7 10s-1 0-2 0z" fill="currentColor" fillOpacity={0.15}/>
  </svg>
);

export const PlayIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M6 4l14 8-14 8V4z" fill="currentColor"/>
  </svg>
);
