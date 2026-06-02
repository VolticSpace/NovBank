"use strict";
import { AuthManager } from "../services/AuthManager.js";
import { renderNotification } from "../views/notificationView.js";
const notificationManager = new AuthManager();
const notificationsCon = document.querySelector(".notifications-container");
<<<<<<< HEAD

const markAllReadBtn = document.querySelector(".mark_read_btn");
=======
const markReadBtn = document.querySelector(".mark_read_btn");

markReadBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const users = notificationManager.getUserArray();
  const currentUser = notificationManager.getCurrentUser();

  const user = users.find((u) => u.accountNo === currentUser.accountNo);

  if (user) {
    user.notificationMirror.length = 0;
  }

  notificationManager.saveUser();
  notificationManager.saveCurrentUser(user);
});
>>>>>>> 612335592106f8ce5d91b45d5bace4977fe95207
renderNotification(
  notificationManager.getCurrentUser().notifications,
  notificationsCon,
);

markAllReadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const currentUser = notificationManager
    .getUserArray()
    .find((user) => user.email === notificationManager.getCurrentUser().email);

  currentUser.notifications.map((notification) => (notification.read = true));
  notificationManager.saveCurrentUser(currentUser);
  notificationManager.saveUser();
});
notificationsCon.addEventListener("click", (e) => {
  e.preventDefault();
  const notificationHtml = e.target.closest(".notification");

  const notificationHtmlId = notificationHtml.dataset.notificationId;
  console.log(notificationHtmlId);
  const currentUser = notificationManager
    .getUserArray()
    .find((user) => user.email === notificationManager.getCurrentUser().email);

  const makeRead = currentUser.notifications.find(
    (notification) => notification.id === notificationHtmlId,
  );

  makeRead.read = true;
  notificationHtml.classList.add("read");
  notificationManager.saveCurrentUser(currentUser);
  notificationManager.saveUser();
});
