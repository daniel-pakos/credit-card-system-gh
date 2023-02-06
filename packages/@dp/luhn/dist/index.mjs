// src/index.ts
function luhn(str) {
  const parsed = String(str).replace(/[^\d]/g, "");
  const size = parsed.length;
  const sizeCheck = size % 2;
  if (!size) {
    return false;
  }
  let series = ``;
  let el;
  let sum = 0;
  for (let i = size - 1; i >= 0; --i) {
    el = parsed.charAt(i);
    if (sizeCheck === i % 2) {
      series += String(parseInt(el, 10) * 2);
    } else {
      series += el;
    }
  }
  series.split("").map((el2) => {
    sum += parseInt(el2, 10);
  });
  return sum % 10 === 0;
}
export {
  luhn
};
