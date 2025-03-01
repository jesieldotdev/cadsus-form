import React, { useState } from "react";
import { LoaderPinwheel, ChevronLeft, ChevronRight } from "lucide-react";
import { FamilyMemberForm } from "./components/FamilyMemberForm";
import { UserProfiles } from "../Print";
import { ControllerForm } from "./viewController";
import { BreadCrumb } from "../../components/BreadCrumb";

const Form: React.FC = () => {
  const {
    familyMembersState,
    addMember,
    removeMember,
    handleMemberInputChange,
    exportToExcel,
    printForm,
    formFields,
    formState,
    handleSave,
    loading,
  } = ControllerForm();

  // Estado para controlar o membro atual no stepper
  const [currentStep, setCurrentStep] = useState(0);

  // Funções para navegar no stepper
  const nextStep = () => {
    if (currentStep < familyMembersState.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <BreadCrumb actualPageTitle="Novo Cadastro" />

      {/* <h1 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
        Formulário de Cadastro da Família
      </h1> */}

      <div className="space-y-6">
        {/* Renderizando os campos dinamicamente */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {formFields.map((field, idx) => (
            <div key={field.name || idx}>
              <label className="block text-gray-700">{field.label}</label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={field.value}
                  onChange={field.handleChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-md text-gray-900 text-sm"
                >
                  {field.options?.map((option, optionIdx) => (
                    <option key={optionIdx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={field.value}
                  onChange={field.handleChange}
                  placeholder={field.placeholder}
                  className="mt-1 block w-full px-4 py-2 border rounded-md text-gray-900 text-sm"
                />
              )}
            </div>
          ))}
        </div>

        {/* Stepper para membros da família */}
        {familyMembersState.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-indigo-700 text-center mb-4">
              Membro {currentStep + 1} de {familyMembersState.length}
            </h2>

            <div className="flex flex-wrap justify-between items-center gap-4">
              {/* Botão para voltar */}
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`px-4 py-2 text-white rounded-md w-full sm:w-auto ${
                  currentStep === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"
                }`}
              >
                <ChevronLeft className="inline-block" /> Anterior
              </button>
              <button
                onClick={nextStep}
                disabled={currentStep === familyMembersState.length - 1}
                className={`px-4 py-2 text-white rounded-md w-full sm:w-auto ${
                  currentStep === familyMembersState.length - 1
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-500 hover:bg-indigo-600"
                }`}
              >
                Próximo <ChevronRight className="inline-block" />
              </button>

              {/* Renderizando apenas o membro atual */}
              <div className="w-full">
                <FamilyMemberForm
                  index={currentStep}
                  removeMember={removeMember}
                  handleInputChange={handleMemberInputChange}
                  memberData={familyMembersState[currentStep]}
                />
              </div>

              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`px-4 py-2 text-white rounded-md w-full sm:w-auto ${
                  currentStep === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"
                }`}
              >
                <ChevronLeft className="inline-block" /> Anterior
              </button>
              <button
                onClick={nextStep}
                disabled={currentStep === familyMembersState.length - 1}
                className={`px-4 py-2 text-white rounded-md w-full sm:w-auto ${
                  currentStep === familyMembersState.length - 1
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-500 hover:bg-indigo-600"
                }`}
              >
                Próximo <ChevronRight className="inline-block" />
              </button>
            </div>
          </div>
        )}

        {/* Botão para adicionar novo membro */}
        <button
          onClick={addMember}
          className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
        >
          Adicionar Membro
        </button>
      </div>

  

      {/* Botões de exportação ou impressão */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center sm:justify-start">
        <button
          onClick={exportToExcel}
          className={`px-6 py-3 ${
            familyMembersState.length === 0 ? "bg-gray-500" : "bg-green-500"
          } text-white rounded-md hover:bg-green-600`}
          disabled={familyMembersState.length === 0}
        >
          Exportar para Excel
        </button>
        <button
          onClick={() => handleSave()}
          className={`px-6 py-3 ${
            familyMembersState.length === 0 ? "bg-gray-500" : "bg-green-500"
          } text-white rounded-md hover:bg-green-600`}
          disabled={familyMembersState.length === 0}
        >
          {loading ? <LoaderPinwheel className="animate-spin" /> : "Salvar"}
        </button>
        <button
          onClick={printForm}
          className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Imprimir
        </button>
      </div>


          {/* UserProfiles Component */}
          <p className="p-2 m-4 font-semibold">Pré visualização</p>
          {formState && formState.homeAddress && <UserProfiles formState={formState} />}
    </div>
  );
};

export default Form;
