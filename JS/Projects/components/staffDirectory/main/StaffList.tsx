import React, { useState } from "react";
import StaffCard from "./StaffCard";
import { StaffMember } from "./types";

interface StaffListProps {
  staffMembers: StaffMember[];
  isLoading: boolean;
}

const StaffList: React.FC<StaffListProps> = ({ staffMembers, isLoading }) => {
  const [hoverStates, setHoverStates] = useState<Record<string, boolean>>({});

  const setHoverState = (memberId: string, isHovered: boolean) => {
    setHoverStates((prev) => ({ ...prev, [memberId]: isHovered }));
  };

  if (isLoading) {
    return (
      <div className="p-10 text-center">
        <p>Loading staff members...</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 p-5 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] max-sm:grid-cols-[1fr]">
      {staffMembers.map((member) => (
        <StaffCard
          key={member.id}
          member={member}
          isHovered={hoverStates[member.id] || false}
          setHoverState={setHoverState}
        />
      ))}
    </div>
  );
};

export default StaffList;
