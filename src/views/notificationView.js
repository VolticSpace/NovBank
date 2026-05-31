export const renderNotification = (arr, con) => {
  con.innerHTML = "";
  let html = "";
  if (!arr?.length > 0) return;
  arr.forEach((item) => {
    html += `
       <div class="notification ${item.type}" data-notification_id="${item.id}">
           <div class="icon_real">${item.icon}</div>
           <div class="notification-content">
           <h4>${item.title}</h4>
           <p>
           ${item.message}
           </p>
           <span>${item.createdAt}</span>
           </div>
       </div>
       `;
  });
  con.insertAdjacentHTML("afterbegin", html);
};
