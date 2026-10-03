// Small inline icons (no icon dependency). All are decorative: callers provide the accessible text.
type P = { size?: number; className?: string };
const base = (size: number) => ({ width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true, focusable: false });

export const ArrowRight = ({ size = 16, className }: P) => <svg {...base(size)} className={className}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
export const ArrowUpRight = ({ size = 16, className }: P) => <svg {...base(size)} className={className}><path d="M7 17 17 7M8 7h9v9" /></svg>;
export const ArrowUp = ({ size = 18, className }: P) => <svg {...base(size)} className={className}><path d="M12 19V5M6 11l6-6 6 6" /></svg>;
export const Copy = ({ size = 15, className }: P) => <svg {...base(size)} className={className}><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h8" /></svg>;
export const Check = ({ size = 15, className }: P) => <svg {...base(size)} className={className}><path d="m5 12 4.5 4.5L19 7" /></svg>;
export const Pin = ({ size = 13, className }: P) => <svg {...base(size)} className={className}><path d="M12 21s-6.5-6.1-6.5-11a6.5 6.5 0 0 1 13 0c0 4.9-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.3" /></svg>;
export const Sun = ({ size = 18, className }: P) => <svg {...base(size)} className={className}><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" /></svg>;
export const Moon = ({ size = 18, className }: P) => <svg {...base(size)} className={className}><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" /></svg>;
export const Search = ({ size = 16, className }: P) => <svg {...base(size)} className={className}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></svg>;
export const X = ({ size = 14, className }: P) => <svg {...base(size)} className={className}><path d="M6 6l12 12M18 6 6 18" /></svg>;
export const Mail = ({ size = 18, className }: P) => <svg {...base(size)} className={className}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6.5 8.5 7 8.5-7" /></svg>;
