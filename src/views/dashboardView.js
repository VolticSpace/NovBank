import { formatMovement } from "../utils/helpers.js";
export const renderTransactions = (arr, con) => {
  let html = "";
  arr.forEach((obj) => {
    html += ` <div class="transaction_detail">
 <div class="detail_left">
   <div class="flex_row">
     <p class="account_type">${obj.type}</p>
     <p class="account_id">${obj.timestamp}</
   span></p>
   </div>
 </div>
 <div class="detail_right">
   <p class="account_bal">${formatMovement({ type: obj.type, amount: obj.amount })}</p>
   <div class="account_mode">
     <p class="mode">successful</p>
   </div>
 </div>
   </div>`;
  });

  if (arr.length === 0) {
    con.innerHTML = `<p style="color: white; font-size: 12px; margin-top: 8px;">
  No transactions yet
</p>`;
  }
  con.insertAdjacentHTML("beforeend", html);
};
export const greetUser = () => {
  let time = new Date().getHours();
  if (time < 12) {
    time = "Good Morning";
  } else if (time < 18) {
    time = "Good Afternoon";
  } else {
    time = "Good evening";
  }
  return time;
};

export const navigatePage = (page) => {
  window.location.href = `${page}.html`;
};
