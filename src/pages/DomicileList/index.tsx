import React from 'react';
import { MapPin, Phone, User } from 'lucide-react';
import { mockDomicileItem } from '../../store/domicile/utils';

interface Domicile {
  homeAddress: string | undefined;
  phone: string | undefined;
  residentsQuantity: number | undefined;
}

const DomicileListData: Domicile[] = mockDomicileItem.map(item => ({homeAddress:item.homeAddress, phone: item.phone, residentsQuantity: item.extraData.residentsQuantity}))

const domicileList: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-center text-indigo-700 mb-6">Lista de Domicílios</h1>
      <div className="space-y-4">
        {DomicileListData.map((domicilio, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-3">
              <MapPin className="text-indigo-600" size={20} />
              <span className="text-lg font-medium text-gray-700">{domicilio.homeAddress}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="text-green-600" size={20} />
              <span className="text-sm text-gray-600">{domicilio.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <User className="text-blue-600" size={20} />
              <span className="text-sm text-gray-600">{domicilio.residentsQuantity} moradores</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default domicileList;
