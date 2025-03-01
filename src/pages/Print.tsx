import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { LoaderPinwheel } from "lucide-react";

interface UserProfilesProps {
  formState: DomicileItem;
}

export function UserProfiles({ formState }: UserProfilesProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    setLoading(true);
    const doc = new jsPDF();

    // 🎨 Estilos do título
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Ficha Domiciliar", 105, 15, { align: "center" });

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");

    // 🏠 Seção: Dados do Domicílio
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Dados do Domicílio", 10, 30);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    autoTable(doc, {
      startY: 35,
      head: [["Campo", "Valor"]],
      body: [
        ["Endereço", formState.homeAddress || "Não informado"],
        ["Telefone", formState.phone || "Não informado"],
        ["Quantidade de moradores", formState.extraData.residentsQuantity || "0"],
        ["Quantidade de cômodos", formState.extraData.roomsQuantity || "0"],
        ["Tipo de residência", formState.extraData.residenceType || "Não informado"],
        ["Material predominante", formState.extraData.predominantConstructionMaterial || "Não informado"],
        ["Energia elétrica", formState.extraData.electricityAvailability ? "Sim" : "Não"],
        ["Acesso à residência", formState.extraData.accessToResidenceType || "Não informado"],
        ["Fonte de água", formState.extraData.waterSupply || "Não informado"],
        ["Tratamento de água", formState.extraData.waterTreatment || "Não informado"],
        ["Quantidade de animais", formState.extraData.animalQuantity || "0"],
        ["Tipo de animais", formState.extraData.animalTypes || "Não informado"],
      ],
      theme: "grid",
      styles: { fontSize: 11 },
    });

    let nextY = (doc as any).lastAutoTable.finalY + 10;

    // 👤 Seção: Moradores
    if (formState.familyMembers.length > 0) {
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Moradores", 10, nextY);
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");

      autoTable(doc, {
        startY: nextY + 5,
        head: [["Nome", "Parentesco", "CNS", "Data de Nasc.", "Naturalidade", "Ocupação"]],
        body: formState.familyMembers.map((member) => [
          member.name || "Não informado",
          member.type || "Não informado",
          member.sus || "Não informado",
          member.dateOfBirth || "Não informado",
          member.naturalFrom || "Não informado",
          member.occupation || "Não informado",
        ]),
        theme: "grid",
        styles: { fontSize: 11 },
      });

      nextY = (doc as any).lastAutoTable.finalY + 10;

      // 🏥 Seção: Saúde dos Moradores
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Informações de Saúde", 10, nextY);
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");

      autoTable(doc, {
        startY: nextY + 5,
        head: [
          ["Nome", "Hipertensão", "Diabetes", "Fuma", "Álcool", "Problemas Renais", "Câncer"],
        ],
        body: formState.familyMembers.map((member) => [
          member.name || "Não informado",
          member.healthInfo?.hasHypertension ? "Sim" : "Não",
          member.healthInfo?.hasDiabetes ? "Sim" : "Não",
          member.healthInfo?.isSmoker ? "Sim" : "Não",
          member.healthInfo?.usesAlcohol ? "Sim" : "Não",
          member.healthInfo?.hasKidneyProblems ? "Sim" : "Não",
          member.healthInfo?.hasCancer ? "Sim" : "Não",
        ]),
        theme: "grid",
        styles: { fontSize: 11 },
      });
    }

    // 📥 Salvar o PDF
    doc.save(`ficha_domiciliar-${formState.homeAddress}.pdf`);
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center bg-white p-6">
      {/* Exibição Prévia */}
      <div ref={printRef} className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="mb-4 text-lg font-bold text-indigo-700 text-center">Ficha Domiciliar</h3>

        <div className="border p-4 rounded-md bg-gray-50">
          <p className="text-gray-700">
            <strong>Endereço:</strong> {formState.homeAddress || "Não informado"}
          </p>
          <p className="text-gray-700">
            <strong>Telefone:</strong> {formState.phone || "Não informado"}
          </p>
          {Object.entries(formState.extraData).map(([key, value], index) => {
            const displayValue = typeof value === "boolean" ? (value ? "Sim" : "Não") : value || "Não informado";
            return (
              <p key={index} className="text-gray-700">
                <strong>{key}:</strong> {displayValue}
              </p>
            );
          })}
        </div>

        {/* Lista de Moradores */}
        {!!formState.familyMembers.length && (
          <>
            <h3 className="mt-6 text-lg font-semibold text-indigo-700">Moradores</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {formState.familyMembers.map((member, index) => (
                <div key={index} className="border p-4 rounded-md bg-gray-50">
                  <p className="text-gray-900 font-medium">{member.name || "Nome não informado"}</p>
                  {member.type && <p><strong>Parentesco:</strong> {member.type}</p>}
                  {member.sus && <p><strong>CNS:</strong> {member.sus}</p>}
                  {member.dateOfBirth && <p><strong>Data de Nascimento:</strong> {member.dateOfBirth}</p>}
                  {member.occupation && <p><strong>Ocupação:</strong> {member.occupation || "Não informado"}</p>}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Botão para gerar PDF */}
      <button
        onClick={handlePrint}
        className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300 w-full md:w-auto"
      >
        {loading ? <LoaderPinwheel className="animate-spin" /> : "Gerar PDF"}
      </button>
    </div>
  );
}
