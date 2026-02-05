import df717Logo from "@/assets/df717_logo.png";

const Header = () => {
  return (
    <header className="bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <img src={df717Logo} alt="DF717" className="h-6" />
        </div>
      </div>
    </header>
  );
};

export default Header;
