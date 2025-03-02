import React, { useState } from "react";
import { CheckCircle, AlertCircle, Save, Eye } from "lucide-react";
import { convertImovToDomicile, convertSiggsData } from "../utils/convertSiggsData";
import { BreadCrumb } from "../components/BreadCrumb";

const SettingsPage: React.FC = () => {
    const [jsonInputDomicile, setJsonInputDomicile] = useState<string>("");
    const [jsonInputMember, setJsonInputMember] = useState<string>("");

    const [parsedJsonDomicile, setParsedJsonDomicile] = useState<object | null>(null);
    const [parsedJsonMember, setParsedJsonMember] = useState<object | null>(null);

    const [convertedDomicile, setConvertedDomicile] = useState<object | null>(null);
    const [convertedMembers, setConvertedMembers] = useState<object | null>(null);

    const [errorDomicile, setErrorDomicile] = useState<string | null>(null);
    const [errorMember, setErrorMember] = useState<string | null>(null);

    const handleJsonChangeDomicile = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.target.value;
        setJsonInputDomicile(input);

        try {
            const parsed = JSON.parse(input);
            setParsedJsonDomicile(parsed);
            setErrorDomicile(null);
        } catch (err) {
            setParsedJsonDomicile(null);
            setErrorDomicile("JSON inválido. Verifique a formatação.");
        }
    };

    const handleJsonChangeMember = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.target.value;
        setJsonInputMember(input);

        try {
            const parsed = JSON.parse(input);
            setParsedJsonMember(parsed);
            setErrorMember(null);
        } catch (err) {
            setParsedJsonMember(null);
            setErrorMember("JSON inválido. Verifique a formatação.");
        }
    };

    const convertDomicile = () => {
        if (parsedJsonDomicile) {
            console.log("Convertendo Domicílio:", parsedJsonDomicile);
            const converted = convertImovToDomicile(parsedJsonDomicile as any);
            setConvertedDomicile(converted);
        } else {
            alert("Erro: O JSON precisa estar correto antes de converter.");
        }
    };

    const convertMembers = () => {
        if (parsedJsonMember) {
            console.log("Convertendo Família:", parsedJsonMember);
            const converted = convertSiggsData(parsedJsonMember as any);
            setConvertedMembers(converted);
        } else {
            alert("Erro: O JSON precisa estar correto antes de converter.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <BreadCrumb actualPageTitle="Configurações" />
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Configurações</h1>

            <div className="flex gap-4">
                {/* Campo de Domicílio */}
                <div className="w-1/2">
                    <label className="block text-gray-700 font-semibold mb-2">Importar Domicílio SIGGS</label>
                    <textarea
                        value={jsonInputDomicile}
                        onChange={handleJsonChangeDomicile}
                        className={`w-full p-3 border rounded-md focus:outline-none ${
                            errorDomicile ? "border-red-500" : "border-gray-300"
                        }`}
                        rows={8}
                        placeholder="Cole aqui o JSON do Domicílio..."
                    ></textarea>
                    {errorDomicile && (
                        <p className="text-red-500 flex items-center mt-2">
                            <AlertCircle size={18} className="mr-2" />
                            {errorDomicile}
                        </p>
                    )}
                    {!errorDomicile && parsedJsonDomicile && (
                        <p className="text-green-500 flex items-center mt-2">
                            <CheckCircle size={18} className="mr-2" />
                            JSON válido!
                        </p>
                    )}
                </div>

                {/* Campo de Família */}
                <div className="w-1/2">
                    <label className="block text-gray-700 font-semibold mb-2">Importar Família SIGGS</label>
                    <textarea
                        value={jsonInputMember}
                        onChange={handleJsonChangeMember}
                        className={`w-full p-3 border rounded-md focus:outline-none ${
                            errorMember ? "border-red-500" : "border-gray-300"
                        }`}
                        rows={8}
                        placeholder="Cole aqui o JSON da Família..."
                    ></textarea>
                    {errorMember && (
                        <p className="text-red-500 flex items-center mt-2">
                            <AlertCircle size={18} className="mr-2" />
                            {errorMember}
                        </p>
                    )}
                    {!errorMember && parsedJsonMember && (
                        <p className="text-green-500 flex items-center mt-2">
                            <CheckCircle size={18} className="mr-2" />
                            JSON válido!
                        </p>
                    )}
                </div>
            </div>

            {/* Botões de Conversão */}
            <div className="flex space-x-4 mt-4">
                <button
                    onClick={convertDomicile}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 flex items-center w-full"
                    disabled={!parsedJsonDomicile}
                >
                    <Save size={18} className="mr-2" />
                    Converter Domicílio
                </button>

                <button
                    onClick={convertMembers}
                    className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 flex items-center w-full"
                    disabled={!parsedJsonMember}
                >
                    <Save size={18} className="mr-2" />
                    Converter Família
                </button>
            </div>

            {/* Visualização dos Dados Convertidos */}
            {(convertedDomicile || convertedMembers) && (
                <div className="mt-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Pré-visualização dos Dados Convertidos</h2>
                    
                    {convertedDomicile && (
                        <div className="p-4 bg-gray-100 rounded-lg mb-4">
                            <h3 className="text-lg font-semibold text-indigo-700 flex items-center">
                                <Eye size={18} className="mr-2" /> Domicílio Convertido
                            </h3>
                            <pre className="text-sm text-gray-700 overflow-x-auto bg-white p-3 rounded-md shadow-md">
                                {JSON.stringify(convertedDomicile, null, 2)}
                            </pre>
                        </div>
                    )}

                    {convertedMembers && (
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <h3 className="text-lg font-semibold text-blue-700 flex items-center">
                                <Eye size={18} className="mr-2" /> Família Convertida
                            </h3>
                            <pre className="text-sm text-gray-700 overflow-x-auto bg-white p-3 rounded-md shadow-md">
                                {JSON.stringify(convertedMembers, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SettingsPage;
