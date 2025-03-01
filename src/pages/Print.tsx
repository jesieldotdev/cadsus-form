import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { LoaderPinwheel, X } from "lucide-react";

interface UserProfilesProps {
  formState: DomicileItem;
}

export function UserProfiles({ formState }: UserProfilesProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const generatePDF = () => {
    setLoading(true);
    const doc = new jsPDF();

    // 🎨 Estilizando o título
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Ficha Domiciliar", 105, 15, { align: "center" });

    doc.setFontSize(16);
    doc.text("Dados do Domicílio", 10, 30);
    doc.setFontSize(12);

    // 🏠 Seção: Dados do Domicílio
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
      doc.text("Moradores", 10, nextY);
      doc.setFontSize(12);

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

      // 🏥 Seção: Informações de Saúde
      doc.setFontSize(16);
      doc.text("Informações de Saúde", 10, nextY);
      doc.setFontSize(12);

      autoTable(doc, {
        startY: nextY + 5,
        head: [
          ["Nome", "Hipertensão", "Diabetes", "Fuma", "Bebe", "Problemas Renais", "Câncer"],
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

    // 📥 Criar Blob para exibição prévia do PDF
    const pdfBlob = doc.output("blob");
    const pdfBlobUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfBlobUrl);
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
        </div>
      </div>

      {/* Botão para gerar PDF */}
      <button
        onClick={generatePDF}
        className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300 w-full md:w-auto"
      >
        {loading ? <LoaderPinwheel className="animate-spin" /> : "Gerar PDF"}
      </button>

      {/* Modal de visualização do PDF */}
      {pdfUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-700">Pré-visualização do PDF</h2>
              <button onClick={() => setPdfUrl(null)} className="text-gray-600 hover:text-gray-800">
                <X size={20} />
              </button>
            </div>
            <iframe src={pdfUrl} className="w-full h-[500px]"></iframe>
            <div className="flex justify-end space-x-4 mt-4">
              <a href={pdfUrl} download={`ficha_domiciliar-${formState.homeAddress}.pdf`} className="bg-blue-600 text-white px-4 py-2 rounded-md">
                Baixar PDF
              </a>
              <button onClick={() => setPdfUrl(null)} className="bg-gray-500 text-white px-4 py-2 rounded-md">
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
