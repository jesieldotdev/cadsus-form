import { useRef } from "react";
import html2pdf from "html2pdf.js";

interface UserProfiles {
  formState: DomicileItem;
}

export function UserProfiles({
  formState,
}: UserProfiles) {
  const printRef = useRef(null);

  const handlePrint = () => {
    html2pdf()
      .from(printRef.current)
      .save(`ficha_domiciliar-${formState.homeAddress}.pdf`);
  };

  return (
    <div className="flex justify-center bg-white p-4">
      <div
        ref={printRef}
        className="bg-white p-4"
        style={{ fontSize: "10px", width: "100%", margin: "32px" }}
      >
        <h3 className="mb-4">
          <strong>Ficha Domiciliar</strong>
        </h3>

        <div className="border p-2 rounded-md">
          {formState.homeAddress && (
            <p>
              <strong>Endereço: </strong>
              {formState.homeAddress}
            </p>
          )}
          {formState.phone && (
            <p>
              <strong>Telefone: </strong>
              {formState.phone}
            </p>
          )}
          {formState?.extraData?.residentsQuantity && (
            <p>
              <strong>Quantidade de moradores: </strong>
              {formState.extraData.residentsQuantity}
            </p>
          )}
          {formState.extraData.propertyType && (
            <p>
              <strong>Tipo de propriedade: </strong>
              {formState.extraData.propertyType}
            </p>
          )}
          {formState.extraData.animalQuantity && (
            <p>
              <strong>Quantidade de animais: </strong>
              {formState.extraData.animalQuantity}
            </p>
          )}
          {formState.extraData.animalTypes && (
            <p>
              <strong>Tipo de animais: </strong>
              {formState.extraData.animalTypes}
            </p>
          )}
          {formState.extraData.waterSupply && (
            <p>
              <strong>Fonte de água: </strong>
              {formState.extraData.waterSupply}
            </p>
          )}
          {formState.extraData.waterTreatment && (
            <p>
              <strong>Tratamento de água: </strong>
              {formState.extraData.waterTreatment}
            </p>
          )}
          {formState.extraData.hasLivedSince && (
            <p>
              <strong>Tempo de residência: </strong>
              {formState.extraData.hasLivedSince}
            </p>
          )}
          {formState.extraData.residenceType && (
            <p>
              <strong>Tipo de residência: </strong>
              {formState.extraData.residenceType}
            </p>
          )}
          {formState.extraData.accessToResidenceType && (
            <p>
              <strong>Acesso à residência: </strong>
              {formState.extraData.accessToResidenceType}
            </p>
          )}
          {formState.extraData.predominantConstructionMaterial && (
            <p>
              <strong>Material predominante da construção: </strong>
              {formState.extraData.predominantConstructionMaterial}
            </p>
          )}
          {formState.extraData.electricityAvailability !== undefined && (
            <p>
              <strong>Disponibilidade de eletricidade: </strong>
              {formState.extraData.electricityAvailability ? "Sim" : "Não"}
            </p>
          )}
        </div>

        {!!formState.familyMembers.length && (
          <h3 className="mt-4">
            <strong>Moradores: </strong>
          </h3>
        )}
        {formState.familyMembers.map((member, index) => (
          <div
            key={index}
            style={{ marginBottom: "12px" }}
            className="border p-2 rounded-md"
          >
            {member.name && <p><strong>Nome: </strong>{member.name}</p>}
            {member.type && <p><strong>Tipo: </strong>{member.type}</p>}
            {member.sus && <p><strong>SUS: </strong>{member.sus}</p>}
            {member.mother && <p><strong>Mãe: </strong>{member.mother}</p>}
            {member.father && <p><strong>Pai: </strong>{member.father}</p>}
            {member.dateOfBirth && <p><strong>Data de nascimento: </strong>{member.dateOfBirth}</p>}
            {member.skinTone && <p><strong>Cor da pele: </strong>{member.skinTone}</p>}
            {member.degreeOfStudy && <p><strong>Grau de escolaridade: </strong>{member.degreeOfStudy}</p>}
            {member.occupation && <p><strong>Ocupação: </strong>{member.occupation}</p>}
            {member.naturalFrom && <p><strong>Natural de: </strong>{member.naturalFrom}</p>}
            {member.observation && <p><strong>Observação: </strong>{member.observation}</p>}

            {/* Health Information */}
            {member.healthInfo && (
              <div className="mt-4">
                <h4><strong>Informações de Saúde</strong></h4>
                {member.healthInfo.isPregnant !== undefined && (
                  <p>
                    <strong>Está grávida: </strong>
                    {member.healthInfo.isPregnant ? "Sim" : "Não"}
                  </p>
                )}
                {member.healthInfo.healthStatus && (
                  <p>
                    <strong>Estado de saúde: </strong>
                    {member.healthInfo.healthStatus}
                  </p>
                )}
                {member.healthInfo.usesOtherDrugs !== undefined && (
                  <p>
                    <strong>Usa outras drogas: </strong>
                    {member.healthInfo.usesOtherDrugs ? "Sim" : "Não"}
                  </p>
                )}
                {member.healthInfo.hasHypertension !== undefined && (
                  <p>
                    <strong>Tem hipertensão: </strong>
                    {member.healthInfo.hasHypertension ? "Sim" : "Não"}
                  </p>
                )}
                {member.healthInfo.hasDiabetes !== undefined && (
                  <p>
                    <strong>Tem diabetes: </strong>
                    {member.healthInfo.hasDiabetes ? "Sim" : "Não"}
                  </p>
                )}
                {member.healthInfo.hadStroke !== undefined && (
                  <p>
                    <strong>Teve AVC: </strong>
                    {member.healthInfo.hadStroke ? "Sim" : "Não"}
                  </p>
                )}
                {member.healthInfo.hadHeartAttack !== undefined && (
                  <p>
                    <strong>Teve infarto: </strong>
                    {member.healthInfo.hadHeartAttack ? "Sim" : "Não"}
                  </p>
                )}
                {member.healthInfo.hasHeartDisease !== undefined && (
                  <p>
                    <strong>Tem doença cardíaca: </strong>
                    {member.healthInfo.hasHeartDisease ? "Sim" : "Não"}
                  </p>
                )}
                {member.healthInfo.isSmoker !== undefined && (
                  <p>
                    <strong>Fuma: </strong>
                    {member.healthInfo.isSmoker ? "Sim" : "Não"}
                  </p>
                )}
                {member.healthInfo.usesAlcohol !== undefined && (
                  <p>
                    <strong>Usa álcool: </strong>
                    {member.healthInfo.usesAlcohol ? "Sim" : "Não"}
                  </p>
                )}
                {member.healthInfo.hasKidneyProblems !== undefined && (
                  <p>
                    <strong>Tem problemas renais: </strong>
                    {member.healthInfo.hasKidneyProblems ? "Sim" : "Não"}
                  </p>
                )}
                {member.healthInfo.hasLeprosy !== undefined && (
                  <p>
                    <strong>Tem hanseníase: </strong>
                    {member.healthInfo.hasLeprosy ? "Sim" : "Não"}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Botão para gerar o PDF */}
      <button
        onClick={handlePrint}
        style={{
          marginTop: "20px",
          padding: "8px 16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
        }}
      >
        Gerar PDF
      </button>
    </div>
  );
}
