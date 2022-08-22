export const formatToCOP = (num: number) => {
  return '$' + new Intl.NumberFormat("en-CO", { maximumFractionDigits: 0 }).format(num).replace(/,/g, '.');
}

export const convertUSDToCOP = (value) => Number(value) * Number(process.env.NEXT_PUBLIC_DOLAR)

export const percentageOfProfit = (salePrice, purchasePrice) => {
  return (((Number(salePrice) - Number(purchasePrice)) / Number(salePrice)) * 100).toFixed(2);
}

export const saleProfit = (salePrice, purchasePrice) => Number(salePrice) - Number(purchasePrice);