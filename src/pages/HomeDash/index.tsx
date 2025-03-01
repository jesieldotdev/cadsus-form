import React from "react";
import { useNavigate } from "react-router-dom";
import { List, ClipboardCheck, Home, Settings } from "lucide-react";

const HomeDash: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-indigo-100 to-blue-200 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8 space-y-6">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700">CADSUS</h1>
        <div className="flex flex-col items-center space-y-4">
          <MenuItem route="/new" icon={<Home />} label="Novo Domicílio" />
          <MenuItem route="/list" icon={<List />} label="Lista de Domicílios" />
          <MenuItem route="#registraAtividade" icon={<ClipboardCheck />} label="Registra Atividade" />
          <MenuItem route="/settings" icon={<Settings />} label="Configurações" />
        </div>
      </div>
    </div>
  );
};

interface MenuItemProps {
  route: string;
  icon: JSX.Element;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ route, icon, label }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(route)}
      className="flex items-center justify-start w-full px-4 py-3 text-lg font-medium text-indigo-600 hover:bg-indigo-100 hover:rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
    >
      <span className="mr-4 text-2xl">{icon}</span>
      <span>{label}</span>
    </button>
  );
};

export default HomeDash;
