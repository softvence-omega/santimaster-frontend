type SectionHeaderProps = {
  title: string;
  subtitle: string;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="text-center mb-16">
      <h1 className="font-bar-low text-4xl md:text-5xl font-semibold leading-normal text-[#0A251D] mb-4">
        {title}
      </h1>
      <p className="text-xl text-[#636363] font-roboto leading-[140%] max-w-2xl mx-auto">
        {subtitle}
      </p>
    </header>
  );
};

export default SectionHeader;
