import React from 'react';
import NaturalidadeInput from './Naturality';
import { ControllerMemberForm } from './viewController';
import { Trash } from 'lucide-react';
import _ from 'lodash';

interface FamilyMemberFormProps {
  index: number;
  removeMember: (index: number) => void;
  handleInputChange: (index: number, field: string, value: string) => void;
  memberData: any;
}

const FamilyMemberForm: React.FC<FamilyMemberFormProps> = ({ index, removeMember, handleInputChange, memberData }) => {

  
  

  const {
    
    formFields
  } = ControllerMemberForm({ handleInputChange, memberData, index, removeMember });

  const debouncedHandleInputChange = _.debounce((index: number, field: string, value: string) => {
    handleInputChange(index, field, value);
  }, 1500); // Ajuste o tempo de debounce conforme necessário (500ms é um exemplo)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(`Campo alterado: ${name} - Novo Valor: ${value}`);
  
    // Mantém a estrutura correta dos objetos aninhados
    debouncedHandleInputChange(index, name, value);
  };
  

  return (
    <div className="space-y-4 p-4 border rounded-md shadow-md mb-4 text-sm bg-gray-50">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-indigo-700">{memberData.tipo || 'Membro'} {index + 1}</h2>
        <button
          onClick={() => removeMember(index)}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          <Trash height={20}/>
        </button>
      </div>

      {/* Renderizando os campos dinamicamente */}
      {formFields.map((field, idx) => (
        <div key={idx}>
          <label className="block text-gray-700">{field.label}</label>
          {field.type === 'select' ? (
            <select
              name={field.name}
              value={field.value}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md text-gray-900 text-sm"
            >
              {field.options?.map((option, optionIdx) => (
                <option key={optionIdx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : field.type === 'textarea' ? (
            <textarea
              name={field.name}
              value={field.value}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md text-gray-900 text-sm"
            ></textarea>
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={field.value}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md text-gray-900 text-sm"
            />
          )}
        </div>
      ))}

      {/* Naturalidade */}
      <NaturalidadeInput handleChange={handleChange} memberData={memberData} />
    </div>
  );
};

export { FamilyMemberForm };
