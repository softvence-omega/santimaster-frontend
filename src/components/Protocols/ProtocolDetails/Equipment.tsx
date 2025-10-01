import { CheckCircle } from "lucide-react";
import EquipmentImage from "../../../assets/potocals/Equipment.png";

export interface EquipmentItem {
  equipmentName: string;
  note?: string;
}

interface EquipmentProps {
  equipment?: EquipmentItem[];
}

const Equipment = ({ equipment = [] }: EquipmentProps) => {
  return (
    <section className="text-center my-12 max-w-5xl mx-auto px-4">
      {/* Title */}
      <h2 className="text-[#0A251D] font-semibold leading-normal text-2xl sm:text-3xl md:text-4xl lg:text-[48px] m-6">
        Equipment
      </h2>

      {equipment.length === 0 ? (
        <p className="text-gray-500 italic">No equipment listed.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Left: Image */}
          <div className="flex justify-center">
            <img
              src={EquipmentImage}
              alt="Equipment"
              className="rounded-lg shadow-md w-full max-w-md object-cover"
            />
          </div>

          {/* Right: Equipment List */}
          <div className="bg-white p-6 rounded-xl shadow-lg text-left">
            <h3 className="font-semibold text-gray-900 mb-4">Equipment List</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              {equipment.map((eq) => (
                <li key={eq.equipmentName} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                  <div>
                    <span className="font-medium">{eq.equipmentName}</span>
                    {eq.note && (
                      <p className="text-gray-500 text-xs">{eq.note}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default Equipment;
