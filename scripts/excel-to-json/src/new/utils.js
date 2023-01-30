const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = { removeAccents, timeout }