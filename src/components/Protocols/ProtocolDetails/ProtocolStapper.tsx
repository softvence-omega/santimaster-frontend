import { useState } from "react";

interface Step {
  id: number;
  title: string;
  duration: string;
  details?: {
    subtitle: string;
    description: string;
    note?: {
      type: "success" | "warning";
      text: string;
    };
  }[];
}

export default function ProtocalStapper({
  stepProcedure,
}: {
  stepProcedure: string;
}) {
  const [openStep, setOpenStep] = useState<number | null>(null);

  // Parse JSON safely
  let steps: Step[] = [];
  try {
    steps = stepProcedure ? JSON.parse(stepProcedure) : [];
  } catch (error) {
    console.error("Invalid stepProcedure format:", error);
  }

  const toggleStep = (id: number) => {
    setOpenStep(openStep === id ? null : id);
  };

  if (!steps.length) {
    return (
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">
          Protocol Steps
        </h2>
        <p className="text-gray-500">No steps provided.</p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">
        Protocol Steps
      </h2>
      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.id} className="p-5 rounded-xl bg-[#FAFAFA]">
            <h3 className="flex items-center gap-3 font-semibold text-green-700">
              <span className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-700 rounded-full">
                {step.id}
              </span>
              {step.title}
              <span className="ml-auto text-gray-500 text-sm">
                {step.duration}
              </span>
              <button
                className="cursor-pointer"
                onClick={() => toggleStep(step.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                  fill="none"
                  className={`transition-transform duration-200 ${
                    openStep === step.id ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M14 7.11996L13.2196 8L7.39073 1.42648C7.33946 1.36852 7.27856 1.32254 7.21152 1.29116C7.14447 1.25979 7.07259 1.24364 7 1.24364C6.92741 1.24364 6.85553 1.25979 6.78849 1.29116C6.72144 1.32254 6.66054 1.36852 6.60927 1.42648L0.780353 8L1.04944e-08 7.11996L5.82892 0.546444C6.14128 0.19418 6.5574 7.81962e-08 7 8.34742e-08C7.44261 8.87522e-08 7.85762 0.19418 8.17108 0.546444L14 7.11996Z"
                    fill="#636363"
                  />
                </svg>
              </button>
            </h3>

            {openStep === step.id && (
              <div className="mt-3 space-y-3 text-gray-700">
                {step.details?.map((detail, i) => (
                  <div key={i}>
                    <p className="font-medium">{detail.subtitle}</p>
                    <p>{detail.description}</p>
                    {detail.note && (
                      <div
                        className={`p-3 border rounded-lg mt-2 ${
                          detail.note.type === "success"
                            ? "bg-green-50 border-green-200 text-green-700"
                            : "bg-red-50 border-red-200 text-red-700"
                        }`}
                      >
                        {detail.note.text}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
