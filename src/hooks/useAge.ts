import { useMemo } from 'react';

export const useAge = (birth_date?: string): { years: number; months: number; display: string } => {
  return useMemo(() => {
    if ((!birth_date) || (birth_date && new Date(birth_date) > new Date())) {
      return { years: 0, months: 0, display: 'Non renseigné' };
    }
    
    const birth = new Date(birth_date + 'T00:00:00');
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    const days = today.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    const totalMonths = years * 12 + months;

    if (totalMonths < 12) {
      return { years: 0, months: totalMonths, display: `${totalMonths} mois` };
    } else {
      return { years, months, display: `${years} ans` };
    }
  }, [birth_date]);
};
