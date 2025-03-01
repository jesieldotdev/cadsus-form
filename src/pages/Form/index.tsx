import React from 'react';
import * as XLSX from 'xlsx';
import { FamilyMemberForm } from './components/FamilyMemberForm';
import { UserProfiles } from '../Print';
import { ControllerForm } from './viewController';
import { BreadCrumb } from '../../components/BreadCrumb';
import { LoaderPinwheel } from 'lucide-react';

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
    addDomicileItem,
    handleSave,
    loading
  } = ControllerForm();

  console.log(familyMembersState)

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <BreadCrumb actualPageTitle="Novo Cadastro" />

      <h1 className="text-2xl font-bold text-indigo-700 mb-6">Formulário de Cadastro da Família</h1>
      <div className="space-y-6">
        {/* Renderizando os campos dinamicamente */}
        {formFields.map((field, idx) => (
          <div key={field.name || idx} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">{field.label}</label>
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  value={field.value}
                  onChange={field.handleChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-md text-gray-900 text-sm"
                >
                  {field.options?.map((option, optionIdx) => (
                    <option key={optionIdx} value={option}>{option}</option>
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
          </div>
        ))}

        {/* Renderizando os membros da família */}
        { familyMembersState.map((member, index) => (
          <FamilyMemberForm
            key={index}
            index={index}
            removeMember={removeMember}
            handleInputChange={handleMemberInputChange}
            memberData={member}
          />
        ))}
        <button
          onClick={addMember}
          className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Adicionar Membro
        </button>
      </div>

      {/* UserProfiles Component */}
      {formState && formState.homeAddress && <UserProfiles formState={formState} />}

      {/* Botões de exportação ou impressão */}
      <div className="mt-6 flex space-x-4">
        <button
          onClick={exportToExcel}
          className={`px-6 py-3 ${familyMembersState.length === 0 ? 'bg-gray-500' : 'bg-green-500'} text-white rounded-md hover:bg-green-600`}
          disabled={familyMembersState.length === 0} // Desabilita se não houver membros
        >
          Exportar para Excel
        </button>
        <button
          onClick={() => handleSave()}
          className={`px-6 py-3 ${familyMembersState.length === 0 ? 'bg-gray-500' : 'bg-green-500'} text-white rounded-md hover:bg-green-600`}
          disabled={familyMembersState.length === 0} // Desabilita se não houver membros
        >
         {loading ? <LoaderPinwheel className='animate-spin'/> : 'Salvar'}
        </button>
        <button
          onClick={printForm}
          className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Imprimir
        </button>
      </div>
    </div>
  );
};

export default Form;
