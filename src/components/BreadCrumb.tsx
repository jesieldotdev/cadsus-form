import { useNavigate } from "react-router-dom";

interface BreadCrumbProps {
    actualPageTitle: string
}

export const BreadCrumb = ({actualPageTitle }: BreadCrumbProps) => {

    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="flex items-center space-x-2 mb-6">
            <button
                onClick={handleBack}
                className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-2"
            >
                <span className="font-semibold">Inicio</span>
            </button>
            <span>/</span>
            <span className="font-medium text-gray-600">{actualPageTitle}</span>
        </div>
    )
}