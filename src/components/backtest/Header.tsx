import df717Logo from "@/assets/df717_logo.png";
import StrategyNav from "./StrategyNav";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <img src={df717Logo} alt="DF717" className="h-6" />
        </div>
        <StrategyNav />
      </div>
    </header>
  );
};

export default Header;
