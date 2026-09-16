import { social } from "@/lib/site";

const links = [
  {
    label: "Facebook",
    href: social.facebook,
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    label: "Instagram",
    href: social.instagram,
    path: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.2-1.7a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z",
  },
  {
    label: "X (Twitter)",
    href: social.twitter,
    path: "M4 4l16 16M20 4L4 20",
    stroke: true,
  },
  {
    label: "TikTok",
    href: social.tiktok,
    path: "M9 18V5l9-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm9-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
    stroke: true,
  },
  {
    label: "LinkedIn",
    href: social.linkedin,
    path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z",
    extra: <circle cx="4" cy="4" r="2" />,
  },
];

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={l.label}
            data-cursor-hover
            className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/20 text-paper/70 transition-colors hover:border-accent hover:text-accent"
          >
            <svg
              viewBox="0 0 24 24"
              fill={l.stroke ? "none" : "currentColor"}
              stroke={l.stroke ? "currentColor" : "none"}
              strokeWidth={l.stroke ? 1.8 : 0}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d={l.path} />
              {l.extra}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
