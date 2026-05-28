import { AuthManager } from "./AuthManager.js";

export class BankManager extends AuthManager {
  #balance;
  #notifications;
  #recentTransactions;
  constructor() {
    super();
  }
  getBalanceAmount() {
    return this.getCurrentUser().balance;
  }
  getBalance() {
    const currentUser = this.getCurrentUser();
    return `$${Number(currentUser.balance).toFixed(2)}`;
  }
  getTransaction() {
    return this.getCurrentUser().transactions;
  }
  addTransactions(obj) {
    if (!obj) return;
    this.getCurrentUser().transaction.push(obj);
  }
  getRecentTransactions() {
    return this.getCurrentUser();
  }
  deposit() {}
  withdraw() {}
  transfer(inputs) {
    const users = this.getUserArray();

    const currentUser = users.find(
      (user) => user.accountNo === this.getCurrentUser().accountNo,
    );

    const receiver = users.find(
      (user) => Number(user.accountNo) === Number(inputs.accountNo),
    );

    const sufficientAmount = currentUser.balance >= inputs.amount;

    if (!receiver) throw new Error("Invalid Account Number");

    if (!sufficientAmount) throw new Error("Insufficient balance");

    if (currentUser.accountNo === receiver.accountNo)
      throw new Error("You cannot transfer to yourself");

    receiver.balance += inputs.amount;
    currentUser.balance -= inputs.amount;
    currentUser.transactions.push({
      amount: inputs.amount,
      sender: currentUser.fullName,
      receiver: receiver.fullName,
      type: "transfer",
      timestamp: new Date().toLocaleDateString(),
      reference: `TNX${Date.now()}`,
      naration: inputs.naration,
    });

    receiver.transactions.push({
      amount: +inputs.amount,
      sender: currentUser.fullName,
      receiver: receiver.fullName,
      type: "deposit",
      timestamp: new Date().toLocaleDateString(),
      reference: `TNX${Date.now()}`,
    });
    this.saveUser();
    this.saveCurrentUser(currentUser);

    return {
      success: true,
      message: "Transfer successful",
    };
  }

  topUp() {}
  addNotification() {}
  getNotifications() {}
  saveDashboardData() {}
  loadDashboardData() {}
  logout() {}
}
