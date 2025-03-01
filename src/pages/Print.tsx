import { useRef } from "react";
import html2pdf from "html2pdf.js";

interface UserProfilesProps {
  formState: DomicileItem;
}

export function UserProfiles({ formState }: UserProfilesProps) {
  const printRef = useRef(null);

  const handlePrint = () => {
    html2pdf()
      .from(printRef.current)
      .save(`ficha_domiciliar-${formState.homeAddress}.pdf`);
  };

  const labelsMap: Record<string, string> = {
    homeAddress: "Endereço",
    phone: "Telefone",
    residentsQuantity: "Quantidade de moradores",
    propertyType: "Tipo de propriedade",
    animalQuantity: "Quantidade de animais",
    animalTypes: "Tipo de animais",
    waterSupply: "Fonte de água",
    waterTreatment: "Tratamento de água",
    hasLivedSince: "Tempo de residência",
    residenceType: "Tipo de residência",
    accessToResidenceType: "Acesso à residência",
    predominantConstructionMaterial: "Material predominante da construção",
    electricityAvailability: "Disponibilidade de eletricidade",
  };

  return (
    <div className="flex flex-col justify-center bg-white p-6">
      <div ref={printRef} className="bg-white p-6 rounded-lg shadow-md">
        {/* Título */}
        <h3 className="mb-4 text-lg font-bold text-indigo-700 text-center">Ficha Domiciliar</h3>

        {/* Informações do domicílio */}
        <div className="border p-4 rounded-md bg-gray-50">
          {/* Home Address e Phone agora são renderizados corretamente */}
          <p className="text-gray-700">
            <strong>{labelsMap.homeAddress}:</strong> {formState.homeAddress || "Não informado"}
          </p>
          <p className="text-gray-700">
            <strong>{labelsMap.phone}:</strong> {formState.phone || "Não informado"}
          </p>

          {/* Renderiza os dados do extraData */}
          {Object.entries(formState.extraData)
            .map(([key, value], index) => {
              if (Array.isArray(value) && value.length === 0) return null;
              
              const displayValue =
                typeof value === "boolean"
                  ? value
                    ? "Sim"
                    : "Não"
                  : value && value !== "0"
                  ? value
                  : "Não informado";

              return (
                <p key={index} className="text-gray-700">
                  <strong>{labelsMap[key] || key}:</strong> {displayValue}
                </p>
              );
            })}
        </div>

        {/* Moradores */}
        {!!formState.familyMembers.length && (
          <>
            <h3 className="mt-6 text-lg font-semibold text-indigo-700">Moradores</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {formState.familyMembers.map((member, index) => (
                <div key={index} className="border p-4 rounded-md bg-gray-50">
                  <p className="text-gray-900 font-medium">{member.name || "Nome não informado"}</p>
                  {member.type && <p><strong>Parentesco:</strong> {member.type}</p>}
                  {member.sus && <p><strong>CNS:</strong> {member.sus}</p>}
                  {member.dateOfBirth && <p><strong>Data de Nascimento:</strong> {member.dateOfBirth}</p>}
                  {member.occupation && <p><strong>Ocupação:</strong> {member.occupation || "Não informado"}</p>}
                  {member.naturalFrom && <p><strong>Natural de:</strong> {member.naturalFrom || "Não informado"}</p>}
                  {member.observation && <p><strong>Observação:</strong> {member.observation}</p>}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Botão de Geração de PDF */}
      <button
        onClick={handlePrint}
        className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300 w-full md:w-auto"
      >
        Gerar PDF
      </button>
    </div>
  );
}
