type SectionHeaderProps = {
  title: string;
  subtitle: string;
  className?:string;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle,className }) => {
  return (
    <header className={`${className} text-center mb-16 px-4 sm:px-6 md:px-0`}>
      <h1 className="font-bar-low text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-snug sm:leading-normal md:leading-normal text-[#0A251D] mb-4">
        {title}
      </h1>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#636363] font-roboto leading-[1.4] max-w-2xl mx-auto">
        {subtitle}
      </p>
    </header>
  );
};

export default SectionHeader;
