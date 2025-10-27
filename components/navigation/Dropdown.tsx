import Link from "next/link";

export default function Dropdown({ item }: { item: any }) {
  return (
    <div className="absolute pt-3 group-hover:block hidden">
      <div className="bg-white rounded-md shadow-lg animate-scale-in">
        <ul className="py-2">
          {item.items.map((link: any) => (
            <li key={link.label}>
              <Link href={link.href} className="block px-4 py-2 text-neutral-700 hover:bg-neutral-100">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
