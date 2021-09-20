export const convertToCOP = (num: number) => {
  return '$' + new Intl.NumberFormat("en-CO", { maximumFractionDigits: 0 }).format(num).replace(/,/g, '.');
}