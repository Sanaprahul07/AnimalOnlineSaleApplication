/* ==========================================================
   Inline SVG icons for the AnimalSale UI.
   Each accepts { size } and inherits color via `currentColor`.
========================================================== */

const base = (size = 24) => ({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
});

export function PawIcon({ size = 24 }) {
    return (
        <svg {...base(size)} fill="currentColor" stroke="none">
            <circle cx="5.5" cy="10.5" r="2" />
            <circle cx="9.5" cy="6.5" r="2" />
            <circle cx="14.5" cy="6.5" r="2" />
            <circle cx="18.5" cy="10.5" r="2" />
            <path d="M12 11c2.5 0 4.5 2 5 4.5.4 2-1 3.5-2.8 3.5-1 0-1.5-.5-2.2-.5s-1.2.5-2.2.5c-1.8 0-3.2-1.5-2.8-3.5C7.5 13 9.5 11 12 11z" />
        </svg>
    );
}

export function SearchIcon({ size = 20 }) {
    return (
        <svg {...base(size)}>
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    );
}

export function LocationIcon({ size = 18 }) {
    return (
        <svg {...base(size)}>
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}

export function ChevronDown({ size = 16 }) {
    return (
        <svg {...base(size)}>
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
}

export function ChevronRight({ size = 22 }) {
    return (
        <svg {...base(size)}>
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
}

export function HeartIcon({ size = 22 }) {
    return (
        <svg {...base(size)}>
            <path d="M19 5.5c-1.7-1.7-4.5-1.7-6.2 0L12 6.3l-.8-.8C9.5 3.8 6.7 3.8 5 5.5c-1.7 1.7-1.7 4.5 0 6.2l7 7 7-7c1.7-1.7 1.7-4.5 0-6.2z" />
        </svg>
    );
}

export function UserIcon({ size = 22 }) {
    return (
        <svg {...base(size)}>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" />
        </svg>
    );
}

export function MenuIcon({ size = 18 }) {
    return (
        <svg {...base(size)}>
            <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
    );
}

export function ShieldCheck({ size = 24 }) {
    return (
        <svg {...base(size)}>
            <path d="M12 3l7 3v5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6l7-3z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}

export function CreditCard({ size = 24 }) {
    return (
        <svg {...base(size)}>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 10h18" />
        </svg>
    );
}

export function BoxIcon({ size = 24 }) {
    return (
        <svg {...base(size)}>
            <path d="M21 8l-9-5-9 5 9 5 9-5z" />
            <path d="M3 8v8l9 5 9-5V8" />
            <path d="M12 13v8" />
        </svg>
    );
}

export function HeadsetIcon({ size = 24 }) {
    return (
        <svg {...base(size)}>
            <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
            <rect x="2" y="14" width="4" height="6" rx="1" />
            <rect x="18" y="14" width="4" height="6" rx="1" />
            <path d="M20 18v1a3 3 0 0 1-3 3h-3" />
        </svg>
    );
}

export function TagIcon({ size = 24 }) {
    return (
        <svg {...base(size)}>
            <path d="M20 12l-8 8-8-8V4h8l8 8z" />
            <circle cx="8.5" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
        </svg>
    );
}

export function LockIcon({ size = 24 }) {
    return (
        <svg {...base(size)}>
            <rect x="4" y="11" width="16" height="9" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
    );
}

export function LeafIcon({ size = 24 }) {
    return (
        <svg {...base(size)}>
            <path d="M11 20A7 7 0 0 1 4 13c0-5 5-9 16-9 0 11-4 16-9 16z" />
            <path d="M8 16c3-3 6-4 9-5" />
        </svg>
    );
}

export function BrowseIcon({ size = 24 }) {
    return (
        <svg {...base(size)}>
            <rect x="3" y="4" width="18" height="14" rx="2" />
            <path d="M3 9h18M8 21h8" />
        </svg>
    );
}

export function ChatIcon({ size = 24 }) {
    return (
        <svg {...base(size)}>
            <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.5A8 8 0 1 1 21 12z" />
        </svg>
    );
}

export function HandshakeIcon({ size = 24 }) {
    return (
        <svg {...base(size)}>
            <path d="m11 17 2 2a1 1 0 0 0 1.4 0l3.6-3.6" />
            <path d="M3 12l4-4 4 3 3-2 5 5-3 3-4-3" />
        </svg>
    );
}

export function TruckIcon({ size = 24 }) {
    return (
        <svg {...base(size)}>
            <rect x="1" y="6" width="13" height="11" rx="1" />
            <path d="M14 9h4l3 3v5h-7" />
            <circle cx="6" cy="18" r="2" />
            <circle cx="17" cy="18" r="2" />
        </svg>
    );
}

export function PhoneIcon({ size = 16 }) {
    return (
        <svg {...base(size)}>
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19 19 0 0 1-8.3-3 19 19 0 0 1-6-6 19 19 0 0 1-3-8.4A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c1 .3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z" />
        </svg>
    );
}

export function MailIcon({ size = 16 }) {
    return (
        <svg {...base(size)}>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
        </svg>
    );
}
