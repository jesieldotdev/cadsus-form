import { v4 as uuidv4 } from "uuid";




export function convertSiggsData(input: any): DomicileItem {
  return {
    id: uuidv4(),
    homeAddress: "Endereço Padrão", // Pode ser ajustado caso tenha um campo correspondente
    phone: "0000000000", // Adapte se necessário
    extraData: {
      waterSupply: "Rede encanada até o domicílio",
      waterTreatment: "Sem tratamento",
      animalTypes: "Nenhum",
      hasLivedSince: "2020-01-01",
      residenceType: "Casa",
      accessToResidenceType: "Asfalto",
      predominantConstructionMaterial: "Alvenaria",
      electricityAvailability: false,
      residentsQuantity: input.records || 0,
      propertyType: "Ocupação",
      animalQuantity: 0,
      roomsQuantity: 4,
    },
    familyMembers: input.rows.map((row: any) => ({
      id: uuidv4(),
      name: row.cell[7].split(" Código:")[0], // Extraindo nome da string
      type: row.cell[9] || "Outro",
      sus: row.cell[24] || "",
      dateOfBirth: row.cell[18] || "",
      skinTone: row.cell[16] === "M" ? "Pardo" : "Branco", // Simples inferência de cor
      father: "",
      mother: row.cell[19] || "",
      degreeOfStudy: "FUNDAMENTAL",
      occupation: "",
      healthInfo: {
        isPregnant: row.cell[10] === "SIM" ? "Sim" : "Não",
        referenceMaternity: "",
        healthStatus: "",
        usesOtherDrugs: false,
        hasHypertension: row.cell[14] === "SIM" ? "Sim" : "Não",
        hasDiabetes: row.cell[15] === "SIM" ? "Sim" : "Não",
        hadStroke: false,
        hadHeartAttack: false,
        hasHeartDisease: false,
        heartDiseaseType: "",
        hasRespiratoryDisease: false,
        respiratoryDiseaseType: "",
        isSmoker: false,
        usesAlcohol: false,
        hasKidneyProblems: false,
        kidneyProblemType: "",
        hasLeprosy: false,
        hasCancer: false,
        hasTuberculosis: false,
        hadHospitalizationInLast12Months: false,
        hospitalizationCause: "",
        hadMentalHealthDiagnosis: false,
        isBedridden: false,
        usesMedicinalPlants: false,
        medicinalPlants: "",
        usesOtherIntegrativePractices: false,
        isDomiciled: false,
        otherHealthConditions: [],
      },
      naturalFrom: "",
      observation: "",
    })),
  };
}


export function convertImovToDomicile(imovData: any): DomicileItem {
    return {
      id: uuidv4(),
      homeAddress: `${imovData.logradouro?.tipoLogradouro?.tiloNome || "Rua"} ${imovData.imov.logradouro?.logrNome || "Desconhecido"}, ${imovData.imov?.imovEndeNumero || "S/N"}, ${imovData.imov.localidade?.locaNome || "Localidade desconhecida"} - ${imovData.imov.localidade?.cidade?.cidaNome || "Cidade desconhecido"}} ${imovData.imov.localidade?.cidade?.estado?.estaNome || "Estado desconhecido"}`,
      phone: imovData.imov?.entidadeProprietario?.entiTel1 || "Não informado",
      extraData: {
        waterSupply: "Rede encanada até o domicílio",
        waterTreatment: "Sem tratamento",
        animalTypes: "Nenhum",
        hasLivedSince: imovData.domicilioList?.informacaoDomicilioList?.isadResideDesdeAno
          ? `${imovData.domicilioList?.informacaoDomicilioList?.isadResideDesdeAno}-0${imovData.domicilioList?.informacaoDomicilioList?.isadResideDesdeMes || "1"}-01`
          : "Desconhecido",
        residenceType: imovData.imov?.tipoImovel?.nome || "Residência",
        accessToResidenceType: "Asfalto",
        predominantConstructionMaterial: "Alvenaria",
        electricityAvailability: false,
        residentsQuantity: imovData.domicilioList?.informacaoDomicilioList?.isadRendaFamiliar || 0,
        propertyType: "Ocupação",
        animalQuantity: 0,
        roomsQuantity: 4,
      },
      familyMembers: imovData.imov?.entidadeProprietario?.usuarioServico?.map((member: any) => ({
        id: uuidv4(),
        name: imovData.imov?.entidadeProprietario?.entiNome || "Não informado",
        type: "Responsável",
        sus: member?.isenNumCadSus || "",
        dateOfBirth: imovData.imov?.entidadeProprietario?.entidadeFisica?.entfDtNasc || "",
        skinTone: imovData.imov?.entidadeProprietario?.entidadeFisica?.entfSexo === "M" ? "Pardo" : "Branco",
        father: imovData.imov?.entidadeProprietario?.entidadeFisica?.entfNomePai || "",
        mother: imovData.imov?.entidadeProprietario?.entidadeFisica?.entfNomeMae || "",
        degreeOfStudy: "FUNDAMENTAL",
        occupation: "",
        healthInfo: {
          isPregnant: "Não",
          referenceMaternity: "",
          healthStatus: "",
          usesOtherDrugs: false,
          hasHypertension: "Não",
          hasDiabetes: "Não",
          hadStroke: false,
          hadHeartAttack: false,
          hasHeartDisease: false,
          heartDiseaseType: "",
          hasRespiratoryDisease: false,
          respiratoryDiseaseType: "",
          isSmoker: false,
          usesAlcohol: false,
          hasKidneyProblems: false,
          kidneyProblemType: "",
          hasLeprosy: false,
          hasCancer: false,
          hasTuberculosis: false,
          hadHospitalizationInLast12Months: false,
          hospitalizationCause: "",
          hadMentalHealthDiagnosis: false,
          isBedridden: false,
          usesMedicinalPlants: false,
          medicinalPlants: "",
          usesOtherIntegrativePractices: false,
          isDomiciled: false,
          otherHealthConditions: [],
        },
        naturalFrom: imovData.localidade?.cidade?.cidaNome || "",
        observation: "",
      })) || [],
    };
  }