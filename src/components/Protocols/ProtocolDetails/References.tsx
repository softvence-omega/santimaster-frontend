import { ExternalLink } from "lucide-react";

// References Data
const references = [
  {
    id: 1,
    authors:
      "Jinek, M., Chylinski, K., Fonfara, I., Hauer, M., Doudna, J. A. & Charpentier, E.",
    year: "(2012)",
    title:
      "A programmable dual-RNA–guided DNA endonuclease in adaptive bacterial immunity.",
    journal: "Science, 337(6096), 816-821.",
    doi: "DOI: 10.1126/science.1225829",
  },
  {
    id: 2,
    authors:
      "Ran, F. A., Hsu, P. D., Wright, J., Agarwala, V., Scott, D. A., & Zhang, F.",
    year: "(2013)",
    title: "Genome engineering using the CRISPR-Cas9 system.",
    journal: "Nature Protocols, 8(11), 2281-2308.",
    doi: "DOI: 10.1038/nprot.2013.143",
  },
  {
    id: 3,
    authors:
      "Hsu, P. D., Scott, D. A., Weinstein, J. A., Ran, F. A., Konermann, S., Agarwala, V., ... & Zhang, F.",
    year: "(2013)",
    title: "DNA targeting specificity of RNA-guided Cas9 nucleases.",
    journal: "Nature Biotechnology, 31(9), 827-832.",
    doi: "DOI: 10.1038/nbt.2647",
  },
];
const References = () => {
  return (
    <div className="py-10">
      <section>
        <h2
          className="text-[#0A251D] text-center font-semibold leading-normal
           text-2xl sm:text-3xl md:text-4xl lg:text-[48px] m-6"
        >
          References
        </h2>

        <div className=" max-w-5xl mx-auto  p-6">
          <div className="space-y-6">
            {references.map((ref) => (
              <div
                key={ref.id}
                className="p-4 rounded-xl bg-[#FAFAFA] hover:border-blue-600 transition-colors duration-200"
              >
                <div className="flex items-start gap-2 mb-2">
                  <span className="font-bold text-gray-900 text-sm">
                    {ref.id}.
                  </span>
                  <div className="flex-1">
                    <p className="text-gray-800 text-sm leading-relaxed mb-1">
                      <span className="font-medium">{ref.authors}</span>{" "}
                      {ref.year}. {ref.title}
                    </p>
                    <p className="text-gray-700 italic text-sm mb-2">
                      {ref.journal}
                    </p>
                    <button className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center gap-1">
                      {ref.doi}
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default References;
