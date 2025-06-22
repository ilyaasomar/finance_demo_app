import { cn } from "@/lib/utils";
import { Routes } from "@/routes";
import Image from "next/image";
import Link from "next/link";

export function MobileSidebar() {
  const routes = Routes();
  return (
    <>
      <div className="overflow-y-auto bg-white md:block dark:bg-transparent">
        <div className="flex flex-col gap-2">
          <div className="flex h-[60px] items-center px-2 border-b dark:border-b-gray-500">
            <>
              <Link className="flex items-center gap-2 font-semibold" href="/">
                <Image
                  src="/logo-black.png"
                  width={120}
                  height={120}
                  alt="logo"
                  className="block dark:hidden w-30"
                />
                <Image
                  src="/logo-white.png"
                  width={120}
                  height={120}
                  alt="logo"
                  className="hidden dark:block"
                />
              </Link>
            </>
          </div>
          <div className="flex-1 mt-5 ml-0">
            <nav className="grid items-start px-2 text-sm lg:text-[15px] font-medium gap-y-2">
              {routes.map((route) => (
                <Link
                  key={route.id}
                  className={cn(
                    route.isActive
                      ? "flex items-center gap-3 rounded-md px-3 py-2 text-white transition-all bg-[#4191F9] dark:text-white dark:hover:text-gray-50"
                      : "flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 transition-all hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-white"
                  )}
                  href={route.href}
                >
                  <route.icon
                    className={cn(
                      route.isActive
                        ? "h-4 w-4 text-white"
                        : "h-4 w-4 text-gray-900 dark:text-white"
                    )}
                  />
                  {route.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
