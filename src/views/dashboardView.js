import { formatMovement } from "../utils/helpers.js";
export const renderTransactions = (arr, con) => {
  let html = "";
  arr.forEach((obj) => {
    html += ` <div class="transaction_detail">
 <div class="detail_left">
   <svg
     xmlns="http://www.w3.org/2000/svg"
     width="24"
     height="24"
     viewBox="0 0 24 24"
     fill="none"
     stroke="#f8fafc"
     stroke-width="2"
     stroke-linecap="round"
     stroke-linejoin="round"
     class="lucide lucide-wifi-icon lucide-wifi"
   >
     <path d="M12 20h.01" />
     <path d="M2 8.82a15 15 0 0 1 20 0" />
     <path d="M5 12.859a10 10 0 0 1 14 0" />
     <path d="M8.5 16.429a5 5 0 0 1 7 0" />
   </svg>
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
