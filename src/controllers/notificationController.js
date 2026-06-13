"use strict";
import { AuthManager } from "../services/AuthManager.js";
import { renderNotification } from "../views/notificationView.js";
const notificationManager = new AuthManager();
const notificationsCon = document.querySelector(".notifications-container");

const markAllReadBtn = document.querySelector(".mark_read_btn");

markAllReadBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const users = notificationManager.getUserArray();
  const currentUser = notificationManager.getCurrentUser();

  const user = users.find((u) => u.id === currentUser.id);
  user.notifications.forEach((notif) => {
    notif.read = true;
  });

  notificationsCon
    .querySelectorAll(".notification")
    .forEach((div) => div.classList.add("read"));
  notificationManager.saveUser();
  notificationManager.saveCurrentUser(user);
});
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
