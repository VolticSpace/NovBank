export const renderNotification = (arr, con) => {
  con.innerHTML = "";
  let html = "";
  if (!arr?.length > 0) return;
  arr.forEach((item) => {
    const { time, date } = item.createdAt;
    html += `
       <div class="notification ${item.type} ${item.read === true ? "read" : "unread"}" data-notification-id="${item.id}">
           <div class="icon_real">${item.icon}</div>
           <div class="notification-content">
           <h4>${item.title}</h4>
           <p>
           ${item.message}
           </p>
           <span>${time} ${date}</span>
           </div>
       </div>
       `;
  });

  con.insertAdjacentHTML("beforeend", html);
  con.insertAdjacentHTML("afterbegin", html);
};
