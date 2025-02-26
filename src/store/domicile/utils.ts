export const getDefaultDomicileItem = (): DomicileItem => ({
    homeAddress: undefined,
    phone: '',
    extraData: {
      waterSupply: undefined,
      waterTreatment: undefined,
      animalTypes: [],
      hasLivedSince: undefined,
      residenceType: undefined,
      accessToResidenceType: undefined,
      predominantConstructionMaterial: undefined,
      electricityAvailability: false,
      residentsQuantity: undefined,
      propertyType: undefined,
      animalQuantity: undefined,
      roomsQuantity: undefined
    },
    familyMembers: [
      {
        name: undefined,
        type: undefined,
        sus: undefined,
        father: undefined,
        mother: undefined,
        degreeOfStudy: undefined,
        occupation: undefined,
        healthInfo: {
          isPregnant: false,
          referenceMaternity: undefined,
          healthStatus: undefined,
          usesOtherDrugs: false,
          hasHypertension: false,
          hasDiabetes: false,
          hadStroke: false,
          hadHeartAttack: false,
          hasHeartDisease: false,
          heartDiseaseType: undefined,
          hasRespiratoryDisease: false,
          respiratoryDiseaseType: undefined,
          isSmoker: false,
          usesAlcohol: false,
          hasKidneyProblems: false,
          kidneyProblemType: undefined,
          hasLeprosy: false,
          hasCancer: false,
          hasTuberculosis: false,
          hadHospitalizationInLast12Months: false,
          hospitalizationCause: undefined,
          hadMentalHealthDiagnosis: false,
          isBedridden: false,
          usesMedicinalPlants: false,
          medicinalPlants: undefined,
          usesOtherIntegrativePractices: false,
          isDomiciled: false,
          otherHealthConditions: []
        }
      }
    ]
  });
  


  export const mockDomicileItem: DomicileItem[] = [
    {
      "homeAddress": "Rua das Flores, 123",
      "phone": "9876-5432",
      "extraData": {
        "waterSupply": "Rede encanada até o domicílio",
        "waterTreatment": "Com tratamento",
        "animalTypes": ["Cachorro", "Gato"],
        "hasLivedSince": "2015",
        "residenceType": "Casa",
        "accessToResidenceType": "Asfalto",
        "predominantConstructionMaterial": "Alvenaria/Tijolo com Revestimento",
        "electricityAvailability": true,
        "residentsQuantity": 4,
        "propertyType": "Próprio",
        "animalQuantity": 2,
        "roomsQuantity": 5
      },
      "familyMembers": [
        {
          "name": "João Silva",
          "type": "Pai",
          "sus": "123456789",
          "father": "Carlos Silva",
          "mother": "Maria Silva",
          "degreeOfStudy": "Ensino Superior",
          "occupation": "Engenheiro",
          "healthInfo": {
            "isPregnant": false,
            "referenceMaternity": undefined,
            "healthStatus": "Peso Adequado",
            "usesOtherDrugs": false,
            "hasHypertension": false,
            "hasDiabetes": false,
            "hadStroke": false,
            "hadHeartAttack": false,
            "hasHeartDisease": false,
            "heartDiseaseType": undefined,
            "hasRespiratoryDisease": false,
            "respiratoryDiseaseType": undefined,
            "isSmoker": false,
            "usesAlcohol": true,
            "hasKidneyProblems": false,
            "kidneyProblemType": undefined,
            "hasLeprosy": false,
            "hasCancer": false,
            "hasTuberculosis": false,
            "hadHospitalizationInLast12Months": false,
            "hospitalizationCause": undefined,
            "hadMentalHealthDiagnosis": false,
            "isBedridden": false,
            "usesMedicinalPlants": false,
            "medicinalPlants": undefined,
            "usesOtherIntegrativePractices": false,
            "isDomiciled": true,
            "otherHealthConditions": []
          }
        }
      ]
    },
    {
      "homeAddress": "Av. Central, 456",
      "phone": "8765-4321",
      "extraData": {
        "waterSupply": "Poço artesiano",
        "waterTreatment": "Sem tratamento",
        "animalTypes": ["Passaro"],
        "hasLivedSince": "2010",
        "residenceType": "Apartamento",
        "accessToResidenceType": "Pavimento",
        "predominantConstructionMaterial": "Madeira Aparelhada",
        "electricityAvailability": true,
        "residentsQuantity": 3,
        "propertyType": "Alugado",
        "animalQuantity": 1,
        "roomsQuantity": 4
      },
      "familyMembers": [
        {
          "name": "Maria Oliveira",
          "type": "Mãe",
          "sus": "987654321",
          "father": "Roberto Oliveira",
          "mother": "Ana Oliveira",
          "degreeOfStudy": "Ensino Médio",
          "occupation": "Professor",
          "healthInfo": {
            "isPregnant": false,
            "referenceMaternity": undefined,
            "healthStatus": "Abaixo do Peso",
            "usesOtherDrugs": true,
            "hasHypertension": false,
            "hasDiabetes": true,
            "hadStroke": false,
            "hadHeartAttack": false,
            "hasHeartDisease": false,
            "heartDiseaseType": undefined,
            "hasRespiratoryDisease": true,
            "respiratoryDiseaseType": "Asma",
            "isSmoker": true,
            "usesAlcohol": true,
            "hasKidneyProblems": false,
            "kidneyProblemType": undefined,
            "hasLeprosy": false,
            "hasCancer": false,
            "hasTuberculosis": false,
            "hadHospitalizationInLast12Months": true,
            "hospitalizationCause": "Pneumonia",
            "hadMentalHealthDiagnosis": true,
            "isBedridden": false,
            "usesMedicinalPlants": false,
            "medicinalPlants": undefined,
            "usesOtherIntegrativePractices": false,
            "isDomiciled": true,
            "otherHealthConditions": ["Hipotireoidismo"]
          }
        }
      ]
    },
    {
      "homeAddress": "Rua do Sol, 789",
      "phone": "7654-3210",
      "extraData": {
        "waterSupply": "Outra",
        "waterTreatment": "Com tratamento",
        "animalTypes": ["De Criação"],
        "hasLivedSince": "2020",
        "residenceType": "Casa",
        "accessToResidenceType": "Chão",
        "predominantConstructionMaterial": "Taipa com Revestimento",
        "electricityAvailability": false,
        "residentsQuantity": 5,
        "propertyType": "Financiado",
        "animalQuantity": 3,
        "roomsQuantity": 6
      },
      "familyMembers": [
        {
          "name": "Pedro Souza",
          "type": "Filho",
          "sus": "192837465",
          "father": "Gustavo Souza",
          "mother": "Claudia Souza",
          "degreeOfStudy": "Ensino Fundamental",
          "occupation": "Estudante",
          "healthInfo": {
            "isPregnant": false,
            "referenceMaternity": undefined,
            "healthStatus": "Peso Adequado",
            "usesOtherDrugs": false,
            "hasHypertension": false,
            "hasDiabetes": false,
            "hadStroke": false,
            "hadHeartAttack": false,
            "hasHeartDisease": false,
            "heartDiseaseType": undefined,
            "hasRespiratoryDisease": false,
            "respiratoryDiseaseType": undefined,
            "isSmoker": false,
            "usesAlcohol": false,
            "hasKidneyProblems": false,
            "kidneyProblemType": undefined,
            "hasLeprosy": false,
            "hasCancer": false,
            "hasTuberculosis": false,
            "hadHospitalizationInLast12Months": false,
            "hospitalizationCause": undefined,
            "hadMentalHealthDiagnosis": false,
            "isBedridden": false,
            "usesMedicinalPlants": false,
            "medicinalPlants": undefined,
            "usesOtherIntegrativePractices": false,
            "isDomiciled": true,
            "otherHealthConditions": []
          }
        }
      ]
    }
  ]
  