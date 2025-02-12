import React from "react";

interface NavigationProps {
  currentPage: string;
  navigateTo: (page: string) => void;
  scrollProgress: number;
}

const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  navigateTo,
  scrollProgress,
}) => {
  const pages = ["home", "staff", "about", "contact"];

  return (
    <nav
      className="flex sticky top-0 justify-between items-center p-5 mb-10 transition-all backdrop-blur-[10px] bg-white bg-opacity-90 duration-300 ease-in-out shadow-[0_2px_10px_rgba(0,0,0,0.1)] z-[100]"
      style={{
        transform: `translateY(${scrollProgress > 5 ? "-100%" : "0"})`,
        opacity: scrollProgress > 5 ? 0 : 1,
      }}
    >
      <h1 className="text-2xl font-bold">Mest Woreton Institute</h1>
      <div className="flex gap-5">
        {pages.map((page) => (
          <button
            key={page}
            className="px-5 py-2.5 rounded-lg transition-all duration-300 ease-in-out"
            onClick={() => navigateTo(page)}
            style={{
              backgroundColor: currentPage === page ? "#f0f0f0" : "transparent",
            }}
          >
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
