import { useState } from 'react';
import * as XLSX from 'xlsx';
import dataItems from './data';

interface FamilyMember {
  tipo: string;
  nome: string;
  sus: string;
  mae: string;
  pai: string;
  naturalidade: string;
  ocupacao: string;
  escolaridade: string;
  observacao: string;
  cor: string;
  nascimento: Date | '';
}

export const ControllerForm = () => {

  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [address, setAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [residents, setResidents] = useState<number>();
  const [propertyType, setPropertyType] = useState<string>('');
  const [animalType, setAnimalType] = useState<string>('');
  const [animalQuantity, setAnimalQuantity] = useState<number>();
  const [rooms, setRooms] = useState<number>();

  const addMember = () => {
    setMembers([
      ...members,
      { tipo: '', nome: '', sus: '', mae: '', pai: '', naturalidade: '', ocupacao: '', escolaridade: '', observacao: '', nascimento: '', cor: '' }
    ]);
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleMemberInputChange = (index: number, field: keyof FamilyMember, value: string) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setMembers(updatedMembers);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleResidentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResidents(Number(e.target.value));
  };

  const handleRoomsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRooms(Number(e.target.value));
  };

  const handlePropertyTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPropertyType(e.target.value);
  };

  const handleAnimalTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnimalType(e.target.value);
  };

  const handleAnimalQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnimalQuantity(Number(e.target.value));
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(members);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Cadastro - ${address}`);
    XLSX.writeFile(wb, `Cadastro - ${address}.xlsx`);
  };

  const printForm = () => {
    document.title = `Cadastro - ${address}`;
    window.print();
  };

  const data: Data = {
    homeAddress: address,
    homePhone: phone,
    residentsQuantity: residents,
    propertyType,
    animalQuantity,
    animalType,
    members,
    roomsQuantity: rooms,
  };

  return {
    dataItems,
    members,
    address,
    phone,
    residents,
    propertyType,
    animalType,
    animalQuantity,
    rooms,
    addMember,
    removeMember,
    handleMemberInputChange,
    handleAddressChange,
    handlePhoneChange,
    handleResidentsChange,
    handleRoomsChange,
    handlePropertyTypeChange,
    handleAnimalTypeChange,
    handleAnimalQuantityChange,
    exportToExcel,
    printForm,
    data
  };
};
