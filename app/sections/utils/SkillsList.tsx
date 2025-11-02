

interface SkillListProps {
  items: string[];
  className?: string;
}

export const SkillList = ({ items, className = "" }: SkillListProps) => {
  if (!items || items.length === 0) {
    return null;
  }

  const listClassName = `flex flex-wrap gap-2 mt-3 ${className}`;

  return (
    <ul className={listClassName}>
      {items.map((item) => (
        <li
          key={item}
          className="relative rounded-sm border border-gray-50/10 bg-fuchsia-200/5 px-3 py-1 text-[11px] leading-none text-foreground "
        >
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};
