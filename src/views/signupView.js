export const renderError = function (errors) {
  clearErrorMsg();
  Object.entries(errors).forEach(([field, msg]) => {
    document.querySelector(`.${field}_error_msg`).textContent = msg;
  });
};

export const clearErrorMsg = function () {
  document
    .querySelectorAll(".error_con")
    .forEach((con) => (con.textContent = ""));
};
