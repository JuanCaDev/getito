export const formatToCOP = (num: number) => {
  return '$' + new Intl.NumberFormat("en-CO", { maximumFractionDigits: 0 }).format(num).replace(/,/g, '.');
}

export const convertUSDToCOP = (value) => Number(value) * Number(process.env.NEXT_PUBLIC_DOLAR)

export const percentageOfProfit = (salePrice, purchasePrice) => {
  return (((Number(salePrice) - Number(purchasePrice)) / Number(salePrice)) * 100).toFixed(2);
}

export const saleProfit = (salePrice, purchasePrice, cost) => Number(salePrice) - Number(purchasePrice);

export const percentageOfProfitMeli = (salePrice, purchasePrice, saleFee = 0, shippingCost = 5900) => {
  return (((Number(salePrice) - (Number(purchasePrice) + Number(saleFee) + Number(shippingCost))) / (Number(salePrice))) * 100).toFixed(2);
}

export const saleProfitMeli = (salePrice, purchasePrice, saleFee = 0, shippingCost = 5900) => Number(salePrice) - Number(purchasePrice) - Number(saleFee) - Number(shippingCost);