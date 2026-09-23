import Link from "next/link";


export default function SideBar() {
  return (
    <aside className="flex items-start justify-center w-full max-w-70 min-h-screen gap-4 border pt-6 px-4">

            <ul className="gap-2 w-full ">
                <li className="hover:border border-white/50 rounded-md w-full px-2 py-1 flex justify-center">
                    <Link href="/">Inicio</Link>
                </li>
                <li className="hover:border border-white/50 rounded-md w-full px-2 py-1 flex justify-center">
                    <Link href="/events">Eventos</Link>
                </li>
                <li className="hover:border border-white/50 rounded-md w-full px-2 py-1 flex justify-center">
                    <Link href="/categories">Categorias</Link>
                </li>
        </ul>

    </aside>
  );
}