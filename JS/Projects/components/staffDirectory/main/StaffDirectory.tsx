import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import StaffList from "./StaffList";
import { StaffMember } from "./types";

const StaffDirectory: React.FC = () => {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<string>("staff");
  const [animationVisible, setAnimationVisible] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    fetchStaffMembers();
    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  const fetchStaffMembers = async () => {
    try {
      const response = await fetch("/api/staff");
      const data = await response.json();
      setStaffMembers(data);
    } catch (error) {
      console.error("Error fetching staff members:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const showPageTransition = () => {
    setAnimationVisible(true);
    setTimeout(() => setAnimationVisible(false), 1000);
  };

  const navigateTo = (page: string) => {
    showPageTransition();
    setCurrentPage(page);
  };

  const updateScrollProgress = () => {
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress((window.scrollY / scrollHeight) * 100);
  };

  return (
    <div
      className="min-h-screen transition-all bg-neutral-50 duration-500 ease-in-out"
      style={{
        opacity: animationVisible ? 0 : 1,
        transform: animationVisible ? "translateY(20px)" : "translateY(0)",
      }}
    >
      <Navigation
        currentPage={currentPage}
        navigateTo={navigateTo}
        scrollProgress={scrollProgress}
      />
      <div className="mb-10 text-7xl font-bold tracking-tighter text-center text-black max-w-[341px] mx-auto">
        Meet Our Staff
      </div>
      <StaffList staffMembers={staffMembers} isLoading={isLoading} />
    </div>
  );
};

export default StaffDirectory;
