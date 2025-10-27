import Link from "next/link";

export default function DropdownNested({ item }: { item: any }) {
  return (
    <div className="absolute pt-3 group-hover:block hidden">
      <div className="bg-white rounded-md shadow-lg animate-scale-in">
        <ul className="py-2">
          {item.items.map((x: any, idx: number) => {
            if ("children" in x) {
              return (
                <li key={x.label} className="relative group">
                  <div className="flex items-center justify-between px-4 py-2 text-neutral-700 group-hover:bg-neutral-100">
                    {x.label}
                    <span className="ml-3 text-neutral-400">›</span>
                  </div>
                  <div className="absolute top-0 left-full ml-2 hidden group-hover:block">
                    <div className="bg-white rounded-md shadow-lg">
                      <ul className="py-2">
                        {x.children.map((c: any) => (
                          <li key={c.label}>
                            <Link href={c.href} className="block px-4 py-2 text-neutral-700 hover:bg-neutral-100">
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            }
            return (
              <li key={x.label}>
                <Link href={x.href} className="block px-4 py-2 text-neutral-700 hover:bg-neutral-100">
                  {x.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
