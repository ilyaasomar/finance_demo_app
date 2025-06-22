import React from "react";
interface AccountPageProps {
  title: string;
}
const Header = ({ title }: AccountPageProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-[20px] font-semibold tracking-tight">{title}</h2>
    </div>
  );
};

export default Header;