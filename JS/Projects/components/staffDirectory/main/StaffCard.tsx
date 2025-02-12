import React from "react";
import { StaffMember } from "./types";

interface StaffCardProps {
  member: StaffMember;
  isHovered: boolean;
  setHoverState: (memberId: string, isHovered: boolean) => void;
}

const StaffCard: React.FC<StaffCardProps> = ({
  member,
  isHovered,
  setHoverState,
}) => {
  return (
    <article
      className="p-6 rounded-lg transition-all ease-in-out bg-white duration-400 shadow-[0_4px_6px_rgba(0,0,0,0.1)]"
      onMouseEnter={() => setHoverState(member.id, true)}
      onMouseLeave={() => setHoverState(member.id, false)}
      style={{
        transform: isHovered ? "translateY(-10px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          : "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      <img
        src={member.imageUrl}
        alt={member.name}
        loading="lazy"
        className="object-cover object-top overflow-hidden mb-4 border-solid transition-all ease-in-out aspect-square border-[3px] border-zinc-100 duration-600 h-[200px] rounded-full shadow-[0_4px_6px_rgba(0,0,0,0.1)] w-[200px] max-sm:h-[150px] max-sm:w-[150px]"
        style={{
          transform: isHovered ? "scale(1.1) rotate(5deg)" : "scale(1)",
          border: isHovered ? "3px solid #3b82f6" : "3px solid #e5e7eb",
        }}
      />
      <h2 className="mb-2 text-2xl">{member.name}</h2>
      <h3 className="mb-4 text-lg text-stone-500">{member.role}</h3>
      <p className="text-base leading-normal">{member.bio}</p>
      <div className="mt-4">
        <h4 className="mb-2 text-base">Interests:</h4>
        <div className="flex flex-wrap gap-2">
          {member.interests.map((interest, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm rounded-2xl bg-zinc-100"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default StaffCard;
