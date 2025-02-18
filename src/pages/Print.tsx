import { useRef } from "react";
import html2pdf from "html2pdf.js";



interface DataProps{
    data: Data
}

export function UserProfiles({data}: DataProps) {
  const printRef = useRef(null);

  // Dados dos usuários
//   const data = {
//     homeAddress: 'Rua Beija Flor, n 440, São Bento, Roraima - Brasil',
//     homePhone: '95991712353',
//     residentsQuantity: 2,
//     propertyType: 'Alugado',
//     animalQuantity: '2',
//     animalType: 'Cachorro e gato',
//     members: [
//       {
//         tipo: '',
//         nome: 'Jesiel Gomes Da Silva',
//         sus: '704.0028.5668.3069',
//         mae: 'Nair Pereira',
//         pai: 'dfg',
//       },
//       {
//         tipo: '',
//         nome: 'Ana Gomes Da Silva',
//         sus: '704.0028.5668.3070',
//         mae: 'Nair Pereira',
//         pai: 'dfg',
//       },
//     ]
//   };

  const handlePrint = () => {
    html2pdf()
      .from(printRef.current)
      .save("ficha_usuarios.pdf");
  };

  return (
    <div className="flex justify-center bg-white p-4">
      <div ref={printRef} className="bg-white p-4" style={{ fontSize: '10px', width: '100%', margin: '32px' }}>
        <h3 className="mb-4"><strong>Ficha Domiciliar</strong></h3>

        {/* Endereço e detalhes do domicílio */}
        <div className="border p-2 rounded-md">
          <p><strong>Endereço: </strong>{data.homeAddress}</p>
          <p><strong>Telefone: </strong>{data.homePhone}</p>
          <p><strong>Quantidade de moradores: </strong>{data.residentsQuantity}</p>
          <p><strong>Tipo de propriedade: </strong>{data.propertyType}</p>
          <p><strong>Quantidade de animais: </strong>{data.animalQuantity}</p>
          <p><strong>Tipo de animais: </strong>{data.animalType}</p>
        </div>

        {!!data.members.length && <h3 className="mt-4"><strong>Moradores: </strong></h3>}
        {data.members.map((member, index) => (
          <div key={index} style={{ marginBottom: '12px' }} className="border p-2 rounded-md">
            <p><strong>Nome: </strong>{member.nome}</p>
            <p><strong>Tipo: </strong>{member.tipo || 'Não especificado'}</p>
            <p><strong>SUS: </strong>{member.sus}</p>
            <p><strong>Mãe: </strong>{member.mae}</p>
            <p><strong>Pai: </strong>{member.pai}</p>
          </div>
        ))}


      </div>
              {/* Botão para gerar o PDF */}
              <button onClick={handlePrint} style={{ marginTop: '20px', padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Gerar PDF
        </button>
    </div>
  );
}
