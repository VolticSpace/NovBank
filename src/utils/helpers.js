export const createId = function () {
  const id = [
    randomInt(1, 9),
    randomInt(2, 9),
    randomInt(1, 9),
    randomInt(7, 9),
  ];
  return id.join("");
};
function randomInt(min, max) {
  const n = Math.trunc(Math.random() * (max - min + 1) + min);
  return n;
}
export const createAccountNo = function () {
  const accNo = [
    0,
    0,
    0,
    0,
    randomInt(2, 9),
    randomInt(1, 8),
    randomInt(1, 9),
    randomInt(1, 9),
    randomInt(1, 9),
    randomInt(1, 9),
    randomInt(1, 9),
  ];

  return accNo.join("");
};
export const formatMovement = (obj) => {
  const move = `${formatCurrency(obj.amount)}`;

  return obj.type === "transfer" ? `-${move}` : move;
};
export const formatCurrency = (amount) => {
  const currency = new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency: "NGN",
  });
  return currency.format(amount);
};
