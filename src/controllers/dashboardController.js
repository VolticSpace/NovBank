import { BankManager } from "../services/BankManager.js";
import {
  renderTransactions,
  greetUser,
  navigatePage,
} from "../views/dashboardView.js";
const dbUserName = document.querySelectorAll(".user_name");
const dbTotalBal = document.querySelector(".db_total_bal");
const dbAvailableBal = document.querySelector(".db_avail_bal");
const transferBtn = document.querySelector(".transfer_btn");
const topupBtn = document.querySelector(".topup_btn");
const payBillBtn = document.querySelector(".pay_bill_btn");
const moreBtn = document.querySelector(".more_btn");
const accountNoCon = document.querySelector(".account-no");
const transactionsCon = document.querySelector(".transaction_movement_con");
const greetMessage = document.querySelector(".greet");
const openEye = document.querySelector(".open_eye");
const closeEye = document.querySelector(".close_eye");
const eyeCon = document.querySelector(".eye_con");
const notificationCount = document.querySelector(".notification_count");
const notificationIcon = document.querySelectorAll(".notification_icon");
const profileImg = document.querySelectorAll(".profile_img");
const profileViewBtn = document.querySelector(".profile_view");
const profileSettingCon = document.querySelector(".profile_details");
const profileViewModal = document.querySelector(".modal_profile_details");
const sideMenuIcon = document.querySelector(".side_menu_icon");
const sideBar = document.querySelector(".side_bar");
const hideSideBarIcon = document.querySelector(".cancel_icon");
const bottomNav = document.querySelectorAll(".action_con");
export const dashboardManager = new BankManager();

function handleNavLink(links) {}

bottomNav.forEach((nav) => {
  nav.addEventListener("click", (e) => {
    bottomNav.forEach((item) => item.classList.remove("active"));
    nav.classList.add("active");
    const target = e.target.closest(".action_con");
    const pageLink = target.dataset.link;
    navigatePage(pageLink);
  });
});

sideMenuIcon.addEventListener("click", (e) => {
  e.preventDefault();
  profileViewModal.classList.remove("display");
  sideBar.classList.remove("show_side_bar");
  profileViewModal.classList.remove("hidden");
  sideBar.classList.remove("hide_side_bar");
  hideSideBarIcon.classList.remove("hide-side_bar");
  hideSideBarIcon.classList.remove("show_side_bar");
  sideMenuIcon.classList.remove("show_side_bar");

  profileViewModal.classList.add("display");
  hideSideBarIcon.classList.add("show_side_bar");
  sideMenuIcon.classList.add("hide_side_bar");
  sideBar.classList.add("show_side_bar");
});

hideSideBarIcon.addEventListener("click", (e) => {
  e.preventDefault();
  profileViewModal.classList.remove("display");
  sideBar.classList.remove("show_side_bar");
  profileViewModal.classList.remove("hidden");
  sideBar.classList.remove("hide_side_bar");
  hideSideBarIcon.classList.remove("hide-side_bar");
  hideSideBarIcon.classList.remove("show_side_bar");
  sideMenuIcon.classList.remove("show_side_bar");

  profileViewModal.classList.add("hidden");
  hideSideBarIcon.classList.add("hide_side_bar");
  sideMenuIcon.classList.add("show_side_bar");
  sideBar.classList.add("hide_side_bar");
});
profileViewBtn.addEventListener("click", (e) => {
  e.preventDefault();
  profileSettingCon.classList.remove("hidden");
  profileSettingCon.classList.remove("display");
  profileViewModal.classList.remove("display");
  profileViewModal.classList.remove("hidden");

  profileSettingCon.classList.add("display");
  profileViewModal.classList.add("display");
  hideSideBarIcon.classList.remove("show_side_bar");
  sideMenuIcon.classList.add("show_side_bar");
  sideBar.classList.remove("show_side_bar");
});

profileViewModal.addEventListener("click", (e) => {
  e.preventDefault();
  profileSettingCon.classList.remove("hidden");
  profileSettingCon.classList.remove("display");
  profileViewModal.classList.remove("display");
  profileViewModal.classList.remove("hidden");

  profileSettingCon.classList.remove("hidden");
  profileViewModal.classList.remove("hidden");

  if (sideBar) {
    profileViewModal.classList.remove("display");
    sideBar.classList.remove("show_side_bar");
    profileViewModal.classList.remove("hidden");
    sideBar.classList.remove("hide_side_bar");

    profileViewModal.classList.remove("display");
    sideBar.classList.remove("show_side_bar");
    hideSideBarIcon.classList.remove("show_side_bar");
    sideMenuIcon.classList.add("show_side_bar");
  }
});
notificationIcon.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "notificationPage.html";
  });
});
payBillBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "paybills.html";
});

transferBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "transfers.html";
});

topupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "topup.html";
});
const renderNotificationCount = () => {
  const users = dashboardManager.getUserArray();
  const isCurrentUser = users.find(
    (user) => user.email === dashboardManager.getCurrentUser().email,
  );

  if (!isCurrentUser) return;

  let unreadMsg = isCurrentUser.notifications.filter(
    (Notification) => Notification.read === false,
  );
  notificationCount.textContent = unreadMsg.length;
};
const renderDashboard = function () {
  dbUserName.forEach(
    (name) => (name.textContent = dashboardManager.getCurrentUser().fullName),
  );
  dbTotalBal.textContent = dashboardManager.getBalance();
  dbAvailableBal.textContent = dashboardManager.getBalance();
  const transactionDetails = dashboardManager.getTransaction();
  accountNoCon.textContent = `Account Number : ${dashboardManager.getCurrentUser().accountNo}`;
  renderTransactions(dashboardManager.getTransaction(), transactionsCon);
  greetMessage.textContent = `${greetUser()},`;
  renderNotificationCount();
  profileImg.forEach(
    (img) => (img.textContent = dashboardManager.getCurrentUser().fullName[0]),
  );
};
renderDashboard();
function clearEyeClasses() {
  openEye.classList.remove("show");
  openEye.classList.remove("remove");
  closeEye.classList.remove("show");
  closeEye.classList.remove("remove");
}
openEye.addEventListener("click", () => {
  clearEyeClasses();
  openEye.classList.add("remove");
  closeEye.classList.remove("remove");
  dbAvailableBal.textContent = "******";
  dbTotalBal.textContent = "******";
});

closeEye.addEventListener("click", () => {
  clearEyeClasses();
  openEye.classList.remove("remove");
  closeEye.classList.add("remove");
  dbTotalBal.textContent = dashboardManager.getBalance();
  dbAvailableBal.textContent = dashboardManager.getBalance();
});
