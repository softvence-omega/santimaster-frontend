import { CheckCircle } from "lucide-react";
import EquipmentImage from "../../../assets/potocals/Equipment.png";

const Equipment = () => {
  const essential = [
    "CO₂ Incubator (37°C, 5% CO₂)",
    "Biosafety Cabinet (Class II)",
    "Inverted Microscope",
    "Centrifuge",
    "Micropipettes (P20, P200, P1000)",
  ];

  const optional = [
    "Flow Cytometer",
    "Fluorescence Microscope",
    "PCR Thermocycler",
    "Gel Electrophoresis System",
  ];

  return (
    <div>
      <section className="text-center my-12 max-w-5xl mx-auto px-4">
        {/* Title */}
        <h2
          className="text-[#0A251D] font-semibold leading-normal
           text-2xl sm:text-3xl md:text-4xl lg:text-[48px] m-6"
        >
          Equipment
        </h2>

        {/* ---------- Large Device Design ---------- */}
        <div className="relative hidden sm:flex justify-center">
          <img
            src={EquipmentImage}
            alt="Equipment"
            className="rounded-lg shadow-md w-full max-w-xl object-cover"
          />

          <div className="absolute left-0 top-1/3 -translate-y-1/2 bg-[#FAFAFA] p-5 rounded-xl text-left w-64">
            <h3 className="font-semibold text-gray-900 mb-3">
              Essential Equipment
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {essential.map((eq) => (
                <li key={eq} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  {eq}
                </li>
              ))}
            </ul>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-5 rounded-xl shadow-lg text-left w-64">
            <h3 className="font-semibold text-gray-900 mb-3">
              Optional Equipment
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {optional.map((eq) => (
                <li key={eq} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  {eq}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- Small Device Design (Grid) ---------- */}
        <div className="grid sm:hidden gap-6">
          <img
            src={EquipmentImage}
            alt="Equipment"
            className="rounded-lg shadow-md w-full object-cover"
          />

          <div className="bg-[#FAFAFA] p-5 rounded-xl text-left">
            <h3 className="font-semibold text-gray-900 mb-3">
              Essential Equipment
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {essential.map((eq) => (
                <li key={eq} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  {eq}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-lg text-left">
            <h3 className="font-semibold text-gray-900 mb-3">
              Optional Equipment
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {optional.map((eq) => (
                <li key={eq} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  {eq}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Equipment;
