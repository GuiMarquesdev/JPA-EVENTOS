import { SERVICE_CATEGORIES } from '../data/jpaData';

export function ServiceMarquee() {
  const items = SERVICE_CATEGORIES.map((category) => category.label);
  const track = [...items, ...items];

  return (
    <div
      className="overflow-hidden bg-[#ffe6f0] border-b border-[#f3d9e6] py-2.5"
      role="presentation"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee">
        {track.map((label, index) => (
          <span
            key={`${label}-${index}`}
            className="flex items-center gap-4 px-3 text-xs sm:text-sm font-semibold text-[#f26b9e] whitespace-nowrap"
          >
            {label}
            <span className="text-[#6ec6e3]" aria-hidden="true">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
