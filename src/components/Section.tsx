import React from "react";

interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  fullBleed?: boolean;
}

const Section: React.FC<SectionProps> = ({
  id,
  className = "",
  children,
  fullBleed = false,
}) => {
  return (
    <section
      id={id}
      className={`h-screen w-full snap-start flex flex-col justify-center items-center relative overflow-hidden ${className}`}
    >
      {fullBleed ? (
        children
      ) : (
        <div className="container mx-auto px-8 relative z-10">{children}</div>
      )}
    </section>
  );
};

export default Section;
