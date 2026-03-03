import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: string | number;
}

// ─── Arrow Up Right (external link indicator) ───
export function IconArrowUpRight({ size = 18, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M7 17L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      <path d="M9 7H17V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Arrow Up (send / submit) ───
export function IconArrowUp({ size = 18, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 19V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      <path d="M5 12L12 5L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Chevron Up (scroll to top) ───
export function IconChevronUp({ size = 18, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M6 15L12 9L18 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Sparkles (AI / magic) ───
export function IconSparkles({ size = 18, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" {...props}>
      <path d="M12 2L13.714 8.286L20 10L13.714 11.714L12 18L10.286 11.714L4 10L10.286 8.286L12 2Z" fill="currentColor" fillOpacity="0.4" />
      <path d="M18 15L18.857 17.143L21 18L18.857 18.857L18 21L17.143 18.857L15 18L17.143 17.143L18 15Z" fill="currentColor" />
      <path d="M6 16L6.714 18.286L9 19L6.714 19.714L6 22L5.286 19.714L3 19L5.286 18.286L6 16Z" fill="currentColor" />
    </svg>
  );
}

// ─── GitHub ───
export function IconGitHub({ size = 18, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 98 96" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
        fill="currentColor"
      />
    </svg>
  );
}

// ─── File / Document (Resume) ───
export function IconFileText({ size = 18, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" {...props}>
      <path
        d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
        fill="currentColor"
        fillOpacity="0.4"
      />
      <path d="M14 2V8H20L14 2Z" fill="currentColor" />
      <rect x="8" y="12" width="8" height="1.5" rx="0.75" fill="currentColor" />
      <rect x="8" y="15" width="8" height="1.5" rx="0.75" fill="currentColor" />
      <rect x="8" y="9" width="4" height="1.5" rx="0.75" fill="currentColor" />
    </svg>
  );
}

// ─── Mail / Email ───
export function IconMail({ size = 18, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" {...props}>
      <path
        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
        fill="currentColor"
        fillOpacity="0.4"
      />
      <path
        d="M22 6L12.53 12.84C12.21 13.05 11.79 13.05 11.47 12.84L2 6"
        fill="currentColor"
      />
    </svg>
  );
}

// ─── LinkedIn ───
export function IconLinkedIn({ size = 18, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" fillOpacity="0.4" />
      <path d="M7.5 8.9C8.33 8.9 9 8.23 9 7.4C9 6.57 8.33 5.9 7.5 5.9C6.67 5.9 6 6.57 6 7.4C6 8.23 6.67 8.9 7.5 8.9Z" fill="currentColor" />
      <path d="M6.2 10.2H8.8V18H6.2V10.2Z" fill="currentColor" />
      <path d="M10.6 10.2H13.1V11.3C13.5 10.6 14.5 9.9 16 9.9C18.5 9.9 18.9 11.5 18.9 13.6V18H16.3V14.1C16.3 13.1 16.3 11.8 14.9 11.8C13.5 11.8 13.2 12.9 13.2 14V18H10.6V10.2Z" fill="currentColor" />
    </svg>
  );
}

// ─── X / Twitter ───
export function IconTwitterX({ size = 18, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" fillOpacity="0.4" />
      <path
        d="M15.45 6.58H17.29L13.27 11.18L18 17.42H14.3L11.4 13.63L8.08 17.42H6.24L10.54 12.50L6 6.58H9.8L12.42 10.05L15.45 6.58ZM14.81 16.32H15.83L9.24 7.62H8.15L14.81 16.32Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ─── Google Scholar ───
export function IconGoogleScholar({ size = 18, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" {...props}>
      <path d="M12 3L1 10L5 12.18V17.82L12 22L19 17.82V12.18L21 11.09V17H23V10L12 3Z" fill="currentColor" fillOpacity="0.4" />
      <path d="M12 15.5L7 12.62V14.82L12 17.7L17 14.82V12.62L12 15.5Z" fill="currentColor" />
    </svg>
  );
}

// ─── Instagram ───
export function IconInstagram({ size = 18, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill="currentColor" fillOpacity="0.4" />
      <path
        d="M12 8.25C9.93 8.25 8.25 9.93 8.25 12C8.25 14.07 9.93 15.75 12 15.75C14.07 15.75 15.75 14.07 15.75 12C15.75 9.93 14.07 8.25 12 8.25ZM12 14.25C10.76 14.25 9.75 13.24 9.75 12C9.75 10.76 10.76 9.75 12 9.75C13.24 9.75 14.25 10.76 14.25 12C14.25 13.24 13.24 14.25 12 14.25Z"
        fill="currentColor"
      />
      <circle cx="16.5" cy="7.5" r="1" fill="currentColor" />
    </svg>
  );
}

// ─── RSS Feed ───
export function IconRss({ size = 18, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" {...props}>
      <path d="M4 11C4 11 8.27 11 11.46 14.19C14.65 17.38 15 21 15 21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <path d="M4 4C4 4 12.49 4 16.95 8.46C21.41 12.92 22 21 22 21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <circle cx="5" cy="19" r="2" fill="currentColor" />
    </svg>
  );
}

// ─── ORCID ───
export function IconOrcid({ size = 18, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 256 256" {...props}>
      <circle cx="128" cy="128" r="120" fill="currentColor" fillOpacity="0.4" />
      <circle cx="80.5" cy="72" r="11" fill="currentColor" />
      <rect x="71" y="96" width="19" height="88" rx="2" fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M120 96H150C168.78 96 184 111.22 184 130C184 148.78 168.78 164 150 164H139V184H120V96ZM139 112V148H150C159.94 148 168 139.94 168 130C168 120.06 159.94 112 150 112H139Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ─── Theme Toggle (half circle) ───
export function IconThemeToggle({ size = 18, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.4" />
      <path d="M12 3V21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3Z" fill="currentColor" />
    </svg>
  );
}
