import logoAmevi from "@/assets/e214b3767302229bb769b749498b0cffbf615395.png";
import { CartDrawer } from "@/page/Homepage/components/features/CartDrawer";


export function Header() {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-[#C9A14A]/20">
      <div className="w-full px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-12">
            <img
              src={logoAmevi}
              alt="Amevi"
              className="h-10 w-auto object-contain cursor-pointer"
              onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}
            />
          </div>

          <div className="flex items-center gap-7">
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#home"
                onClick={(e) => handleSmoothScroll(e, "home")}
                className="text-white hover:text-[#C9A14A] transition-colors text-[16px]"
              >
                Início
              </a>
              <a
                href="#catalog"
                onClick={(e) => handleSmoothScroll(e, "catalog")}
                className="text-white hover:text-[#C9A14A] transition-colors text-sm text-[16px]"
              >
                Catálogo
              </a>
            </nav>

            <CartDrawer
            />
          </div>
        </div>
      </div>
    </header>
  );
}
