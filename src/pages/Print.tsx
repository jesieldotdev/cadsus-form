import { useRef } from "react";
import html2pdf from "html2pdf.js";

export function UserProfiles() {
  const printRef = useRef(null);

  // Lista de usuários com informações
  const users = [
    {
      nome: "João da Silva",
      idade: 29,
      email: "joao.silva@example.com",
      endereco: "Rua Exemplo, 123, Bairro, Cidade, Estado, CEP 12345-678",
      telefone: "(11) 1234-5678"
    },
    {
      nome: "Maria Oliveira",
      idade: 34,
      email: "maria.oliveira@example.com",
      endereco: "Avenida Central, 456, Bairro, Cidade, Estado, CEP 23456-789",
      telefone: "(21) 2345-6789"
    },
    {
      nome: "Carlos Souza",
      idade: 40,
      email: "carlos.souza@example.com",
      endereco: "Rua das Flores, 789, Bairro, Cidade, Estado, CEP 34567-890",
      telefone: "(31) 3456-7890"
    }
  ];

  const handlePrint = () => {
    html2pdf()
      .from(printRef.current)
      .save("usuarios.pdf");
  };

  return (
    <div className="flex justify-center">
      <div ref={printRef} style={{ margin: '32px', fontSize: '10px', lineHeight: '1.4' }}>
        <h2 style={{ textAlign: 'center', fontSize: '14px', marginBottom: '12px' }}>Ficha de Usuários</h2>
        
        {users.map((user, index) => (
          <div key={index} style={{ marginBottom: '16px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <h3 style={{ fontSize: '12px', marginBottom: '8px' }}>Usuário {index + 1}</h3>
            <p><strong>Nome:</strong> {user.nome}</p>
            <p><strong>Idade:</strong> {user.idade} anos</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Endereço:</strong> {user.endereco}</p>
            <p><strong>Telefone:</strong> {user.telefone}</p>
          </div>
        ))}

        <button onClick={handlePrint} style={{ marginTop: '20px', padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
          Gerar PDF
        </button>
      </div>
    </div>
  );
}
