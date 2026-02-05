import React from 'react';

interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, className = '', children }) => {
  return (
    <section 
      id={id}
      className={`h-screen w-full snap-start flex flex-col justify-center items-center relative overflow-hidden ${className}`}
    >
      <div className="container mx-auto px-8 relative z-10">
        {children}
      </div>
    </section>
  );
};

export default Section;
