"use strict";
import { AuthManager } from "../services/AuthManager.js";
import { renderNotification } from "../views/notificationView.js";
const notificationManager = new AuthManager();
const notificationsCon = document.querySelector(".notifications-container");
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
renderNotification(
  notificationManager.getCurrentUser().notifications,
  notificationsCon,
);
