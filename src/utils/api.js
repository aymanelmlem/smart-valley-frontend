export const BASE_URL = import.meta.env.VITE_API_URL;

export const getRandomColor = () => {
    const colors =  [
      '#D6336C', '#DAA520', '#FF6F61', '#FF9F9F', '#FF5E7A', 
      '#CE5D99', '#D77C8D', '#F5A623', '#D9A0B8', '#B76C94'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

