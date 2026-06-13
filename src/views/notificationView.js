import { timeAgo } from "../utils/helpers.js";
export const renderNotification = (arr, con) => {
  con.innerHTML = "";
  let html = "";
  if (!arr?.length > 0) return;
  arr.forEach((item) => {
    html += `
       <div class="notification ${item.type} ${item.read === true ? "read" : "unread"}" data-notification-id="${item.id}" data-created-at="${item.createdAt}">
           <div class="icon_real">${item.icon}</div>
           <div class="notification-content">
           <h4>${item.title}</h4>
           <p>
           ${item.message}
           </p>
           <span class="notif_interval" data-created-at="${item.createdAt}"></span>
           </div>
       </div>
       `;
  });
  con.insertAdjacentHTML("afterbegin", html);
  const timeDiv = document.querySelectorAll(".notif_interval");
  timeDiv.forEach((div) => {
    div.textContent = timeAgo(div.dataset.createdAt);
    setInterval(() => {
      div.textContent = timeAgo(div.dataset.createdAt);
    }, 60000);
  });
};
