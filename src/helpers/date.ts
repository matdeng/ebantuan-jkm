// src/helpers/date.ts
export const formatDateTime = (dateString: string | Date): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
  
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds} ${ampm}`;
};

export const formatDateShort = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ms-MY', {
    day: '2-digit',
    month: '2-digit', 
    year: 'numeric'
  });
};
