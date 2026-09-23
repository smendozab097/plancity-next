import SideBar from "@/components/side-bar";


export default function CategoriesLayout({ children }: {children: React.ReactNode}) {
  return (
    <div className="flex">
        <SideBar/>
        <div className="w-full">
            {children}
        </div>
    </div>
  );
}
