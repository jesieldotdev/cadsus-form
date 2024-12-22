import React from 'react';
import NaturalidadeInput from './Naturality';

interface FamilyMemberFormProps {
  index: number;
  removeMember: (index: number) => void;
  handleInputChange: (index: number, field: string, value: string) => void;
  memberData: any;
}

const FamilyMemberForm: React.FC<FamilyMemberFormProps> = ({ index, removeMember, handleInputChange, memberData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    handleInputChange(index, e.target.name, e.target.value);
  };

  const handleSUSChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    if (value.length > 15) value = value.slice(0, 15); // Limita a 15 caracteres

    if (value.length === 15) {
      value = value.replace(/(\d{3})(\d{4})(\d{4})(\d{4})/, '$1.$2.$3.$4'); // Aplica a formatação
    }

    handleInputChange(index, 'sus', value);
  };

  const handleDateBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    handleInputChange(index, 'nascimento', value)
  }

  const memberTypes = ['Responsável', 'Irmão/irmã', 'Pai', 'Mãe', 'Filho(a)', 'Genro/Nora', 'Cônjuge', 'Neto(a)/Bisneto(a)', 'Sogro(a)', 'Enteado(a)', 'Outro'];

  const scolarity = [
    "ALFABETIZAÇÃO PARA ADULTOS (MOBRAL, ETC)",
    "CLASSE DE ALFABETIZAÇÃO - CA",
    "CRECHE",
    "ENSINO FUNDAMENTAL COMPLETO",
    "ENSINO FUNDAMENTAL EJA - SÉRIES FINAIS (SUPLETIVO 5ª a 9ª))",
    "ENSINO FUNDAMENTAL EJA - SÉRIES INICIAIS (SUPLETIVO 1ª a 4ª)",
    "ENSINO FUNDAMENTAL ESPECIAL",
    "ENSINO FUNDAMENTAL 1ª a 4ª SÉRIES",
    "ENSINO FUNDAMENTAL 5ª a 9ª SÉRIES",
    "ENSINO MÉDIO EJA (SUPLETIVO)",
    "ENSINO MÉDIO ESPECIAL",
    "ENSINO MÉDIO, MÉDIO 2º CICLO (CIENTÍFICO, TÉCNICO E ETC)",
    "FUNDAMENTAL 1A A 4A COMPLETO",
    "NENHUM",
    "PRÉ-ESCOLA (EXCETO CA)",
    "SUPERIOR, APERFEIÇOAMENTO, ESPECIALIZAÇÃO, MESTRADO, DOUTORADO"
  ];

  const skinTones = ["Branco", "Preto", "Pardo", "Amarelo", "Indigena"];

  return (
    <div className="space-y-4 p-4 border rounded-md shadow-md mb-4 text-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{memberData.tipo || 'Membro'} {index + 1}</h2>
        <button
          onClick={() => removeMember(index)}
          className="text-red-500 hover:text-red-700"
        >
          Remover
        </button>
      </div>
      <div>
        <label className="block text-gray-700">Tipo de Membro</label>
        <select
          name="tipo"
          value={memberData.tipo}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 text-sm"
        >
          {memberTypes.map((member, idx) => (
            <option key={idx} value={member}>{member}</option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-gray-700">Nome</label>
            <input
              placeholder='João Niguém'
              type="text"
              name="nome"
              value={memberData.nome}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md text-sm text-gray-900"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700">SUS</label>
            <input
              type="text"
              placeholder='000.0000.0000.0000'
              name="sus"
              value={memberData.sus}
              onChange={handleSUSChange}
              maxLength={19} // Permite 15 caracteres numéricos + 3 pontos + 1 traço
              className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 text-sm"
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-gray-700">Mãe</label>
            <input
              type="text"
              name="mae"
              value={memberData.mae}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 text-sm"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700">Pai</label>
            <input
              type="text"
              name="pai"
              value={memberData.pai}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 text-sm"
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-2/4">
            <label className="block text-gray-700">Nascimento</label>
            <input
              type="date"
              name="natural"
              value={memberData.nascimento}
              onChange={handleDateBirthChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 text-sm"
            />
          </div>
       

       


          <div className="w-2/4">
            <label className="block text-gray-700">Ocupação</label>
            <input
              type="text"
              name="ocupacao"
              value={memberData.ocupacao}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 text-sm"
            />
          </div>

        </div>

        <div className='1/3'>
            <label className="block text-gray-700">Tipo de Membro</label>
            <select
              name="tipo"
              value={memberData.tipo}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 text-sm"
            >
              {scolarity.map((level, idx) => (
                <option key={idx} value={memberData.escolaridade}>{level}</option>
              ))}
            </select>
          </div>

        <div className="flex space-x-4">

<NaturalidadeInput handleChange={handleChange} memberData={memberData} />
          
        
          <div className="w-2/4">
            <label className="block text-gray-700">Cor</label>
            <select
              name="propertyType"
              className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 text-sm"
            >
            {skinTones.map((tone, idx) => (
                <option key={idx} value={memberData.cor}>{tone}</option>
              ))}
            </select>
          </div>

        </div>

        <div>
          <label className="block text-gray-700">Observação</label>
          <textarea
            name="observacao"
            value={memberData.observacao}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 text-sm"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default FamilyMemberForm;
