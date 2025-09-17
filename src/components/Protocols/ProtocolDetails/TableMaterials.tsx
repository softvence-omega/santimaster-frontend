const TableMaterials = () => {
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
                <th className="border px-4 py-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "CRISPR-Cas9 Plasmid",
                  "2µg",
                  "48978",
                  "Addgene",
                  "Store at -20°C",
                ],
                [
                  "Dulbecco’s Media (DMEM)",
                  "50 mL",
                  "Custom",
                  "Gibco",
                  "Tissue specific",
                ],
                [
                  "Lipofectamine 3000",
                  "1.5 mL",
                  "L3000015",
                  "Thermo Fisher",
                  "Transfection reagent",
                ],
                [
                  "DMEM Medium",
                  "500 mL",
                  "11965092",
                  "Thermo Fisher",
                  "With L-glutamine",
                ],
                [
                  "Fetal Bovine Serum",
                  "60 mL",
                  "26140079",
                  "Thermo Fisher",
                  "Heat inactivated",
                ],
              ].map(([item, amount, catalog, supplier, notes]) => (
                <tr key={item}>
                  <td className="border px-4 py-2">{item}</td>
                  <td className="border px-4 py-2">{amount}</td>
                  <td className="border px-4 py-2">{catalog}</td>
                  <td className="border px-4 py-2">{supplier}</td>
                  <td className="border px-4 py-2">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TableMaterials;
