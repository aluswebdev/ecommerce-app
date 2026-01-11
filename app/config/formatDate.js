const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-SL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatCurrency = (amount) => {
  if (!amount) return "SLE 0";
  return `SLE ${Number(amount).toLocaleString("en-SL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};


export { formatDate, formatCurrency };  
