import Link from "next/link";
import ThemeButton from "./theme-button";

export default function NavBar() {

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-3.5 py-1.5 text-sm font-semibold transition-all duration-150 ${
      isActive
        ? "text-blue-400 border-b-2 border-blue-500 font-bold drop-shadow-[0_0_10px_rgba(59,130,246,0.4)]"
        : "text-slate-300 hover:text-white hover:border-b-2 border-blue-500/30"
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
      isActive
        ? "text-blue-300 bg-blue-600/15 border border-blue-500/30 font-bold"
        : "text-slate-300 hover:text-white hover:bg-slate-800/60"
    }`;
  
  return (
    <header className="flex justify-between h-16 gap-4 bg-[#0b1120]/90 backdrop-blur-xl border-b dark:border-neutral-100 items-center px-4">
      <div>
        <Link href="/">PlanCity</Link>
      </div>
      <div className="flex flex-row items-center gap-4">
        <ul className="flex gap-2">
          <li>
            <Link href="/categories">Categorias</Link>
          </li>
          <li>
            <Link href="/events">Eventos</Link>
          </li>
          <li>
            <Link href="/favorites">Favoritos</Link>
          </li>
        </ul>
      </div>
      <ThemeButton />
    </header>
  );
}
