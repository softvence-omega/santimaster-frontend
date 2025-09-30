import type { Material } from "../../../types/potocols.type";

const TableMaterials = ({ materials }: { materials: Material[] }) => {
  return (
    <div>
      {/* ------------Materials & Reagents------------ */}
      <section>
        <h2
          className="text-[#0A251D] text-center font-semibold leading-normal
           text-2xl sm:text-3xl md:text-4xl lg:text-[48px] m-6"
        >
          Materials & Reagents
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm text-gray-700 border-collapse">
            <thead className="bg-gray-100 text-[#1C1C1E]">
              <tr>
                <th className="border px-4 py-2 text-left">Item</th>
                <th className="border px-4 py-2 text-left">Amount</th>
                <th className="border px-4 py-2 text-left">Catalog #</th>
                <th className="border px-4 py-2 text-left">Supplier</th>
              </tr>
            </thead>
            <tbody>
              {materials?.length > 0 ? (
                materials.map((mat, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{mat.itemName}</td>
                    <td className="border px-4 py-2">{mat.quantity}</td>
                    <td className="border px-4 py-2">{mat.catalog}</td>
                    <td className="border px-4 py-2">{mat.supplier}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="border px-4 py-2 text-center text-gray-500"
                  >
                    No materials provided.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TableMaterials;
