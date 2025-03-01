import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { LoaderPinwheel, Printer, X } from "lucide-react";

interface UserProfilesProps {
  formState: DomicileItem;
}

// 🎨 Configurações dinâmicas do PDF
const pdfConfig = {
  font: "helvetica",
  titleSize: 14,
  sectionTitleSize: 12,
  contentSize: 10,
  tableHeaderColor: "#ffffff",
  tableHeaderBg: "#4338ca",
  tableRowColor: "#000000",
  tableRowBg: "#f8f9fa",
  alignTitle: "center" as const,
  marginX: 10,
  marginY: 8,
};

export function PrintPDF({ formState }: UserProfilesProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const generatePDF = () => {
    setLoading(true);
    const doc = new jsPDF();

    // 🎨 Estilizando o título
    doc.setFont(pdfConfig.font, "bold");
    doc.setFontSize(pdfConfig.titleSize);
    doc.text("Ficha Domiciliar", 105, pdfConfig.marginY, { align: pdfConfig.alignTitle });

    let currentY = pdfConfig.marginY + 10;

    // 🏠 Seção: Dados do Domicílio
    doc.setFontSize(pdfConfig.sectionTitleSize);
    doc.text("Dados do Domicílio", pdfConfig.marginX, currentY);
    doc.setFontSize(pdfConfig.contentSize);

    autoTable(doc, {
      startY: currentY + 5,
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
      styles: { fontSize: pdfConfig.contentSize },
      headStyles: { fillColor: pdfConfig.tableHeaderBg, textColor: pdfConfig.tableHeaderColor },
      alternateRowStyles: { fillColor: pdfConfig.tableRowBg, textColor: pdfConfig.tableRowColor },
    });

    currentY = (doc as any).lastAutoTable.finalY + 10;

    // 👤 Seção: Moradores
    if (formState.familyMembers.length > 0) {
      doc.setFontSize(pdfConfig.sectionTitleSize);
      doc.text("Moradores", pdfConfig.marginX, currentY);
      doc.setFontSize(pdfConfig.contentSize);

      autoTable(doc, {
        startY: currentY + 5,
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
        styles: { fontSize: pdfConfig.contentSize },
        headStyles: { fillColor: pdfConfig.tableHeaderBg, textColor: pdfConfig.tableHeaderColor },
        alternateRowStyles: { fillColor: pdfConfig.tableRowBg, textColor: pdfConfig.tableRowColor },
      });

      currentY = (doc as any).lastAutoTable.finalY + 10;

      // 🏥 Seção: Informações de Saúde
      doc.setFontSize(pdfConfig.sectionTitleSize);
      doc.text("Informações de Saúde", pdfConfig.marginX, currentY);
      doc.setFontSize(pdfConfig.contentSize);

      autoTable(doc, {
        startY: currentY + 5,
        head: [["Nome", "Hipertensão", "Diabetes", "Fuma", "Bebe", "Problemas Renais", "Câncer"]],
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
        styles: { fontSize: pdfConfig.contentSize },
        headStyles: { fillColor: pdfConfig.tableHeaderBg, textColor: pdfConfig.tableHeaderColor },
        alternateRowStyles: { fillColor: pdfConfig.tableRowBg, textColor: pdfConfig.tableRowColor },
      });
    }

    // 📥 Criar Blob para exibição prévia do PDF
    const pdfBlob = doc.output("blob");
    const pdfBlobUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfBlobUrl);
    setLoading(false);
  };

  return (
    <>
      {/* Botão para gerar PDF */}
      <button
        onClick={generatePDF}
        className="flex px-3 gap-2 items-center py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300 "
      >
        <Printer size={18} /> PDF
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
    </>
  );
}
