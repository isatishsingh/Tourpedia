import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-travel-footer text-white py-8">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="space-y-2">
          <p className="text-gray-300">© 2025 Copyright</p>
          <p className="flex items-center justify-center gap-2 text-gray-300">
            Made With <Heart className="w-4 h-4 text-red-500 fill-current" /> By{" "}
            <span className="text-cyan-400 font-medium">Sanjeev</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;