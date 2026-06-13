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

export const timeAgo = (createdAt) => {
  const now = Date.now();
  const diff = Math.floor(now - createdAt);
  const secs = Math.floor(diff / 1000);
  const mins = Math.floor(secs / 60);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  const weeks = Math.floor(days / 7);
  if (secs <= 60) return `just now`;
  if (mins >= 1) return `${mins} mins ago`;
  if (hrs >= 1) return `${hrs} hrs ago`;
  if (days >= 1) return `${days} ${days === 1 ? "day" : "days"} ago`;
  if (weeks >= 1) return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
};
