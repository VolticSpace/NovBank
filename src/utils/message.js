export const displayErrorMsg = function (con, msg) {
  return (con.innerText = msg);
};
export const clearErrorMsg = function (con) {
  return (con.textContent = "");
};
