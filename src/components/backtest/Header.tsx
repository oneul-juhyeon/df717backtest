import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import df717Logo from "@/assets/df717_logo.png";

const Header = () => {
  return (
    <header className="bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <img src={df717Logo} alt="DF717" className="h-6" />
        </div>
        <Link 
          to="/" 
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Home</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
