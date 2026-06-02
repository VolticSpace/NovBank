import { AuthManager } from "./AuthManager.js";
import { createId, formatCurrency } from "../utils/helpers.js";

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
    return `${formatCurrency(currentUser.balance)}`;
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

    if (!receiver) {
      currentUser.notifications.push({
        id: createId(),
        title: "Transfer Failed",
        message: `You tried to transfer to an invalid account number`,
        type: "warning",
        read: false,
        createdAt: {
          time: new Date().toLocaleTimeString(),
          date: new Date().toLocaleDateString(),
        },
        reference: `TNX${Date.now()}`,
        icon: "📌",
      });
      this.saveUser();
      this.saveCurrentUser(currentUser);
      throw new Error("Invalid Account Number");
    }

    if (!sufficientAmount) {
      currentUser.notifications.push({
        id: createId(),
        title: "Transfer Failed",
        message: `Your balance is too low to do such transaction`,
        type: "warning",
        read: false,
        createdAt: {
          time: new Date().toLocaleTimeString(),
          date: new Date().toLocaleDateString(),
        },
        reference: `TNX${Date.now()}`,
        icon: "📌",
      });

      this.saveUser();
      this.saveCurrentUser(currentUser);
      throw new Error("Insufficient balance");
    }

    if (currentUser.accountNo === receiver.accountNo) {
      currentUser.notifications.push({
        id: createId(),
        title: "Transfer Failed",
        message: `You tried transfering to yourself`,
        type: "warning",
        read: false,
        createdAt: {
          time: new Date().toLocaleTimeString(),
          date: new Date().toLocaleDateString(),
        },
        reference: `TNX${Date.now()}`,
        icon: "📌",
      });

      this.saveUser();
      this.saveCurrentUser(currentUser);
      throw new Error("You cannot transfer to yourself");
    }

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
      amount: inputs.amount,
      sender: currentUser.fullName,
      receiver: receiver.fullName,
      type: "deposit",
      timestamp: new Date().toLocaleDateString(),
      reference: `TNX${Date.now()}`,
    });

    currentUser.notifications.push({
      id: createId(),
      title: "Transfer Alert",
      message: `You transfer of NGN ${inputs.amount} to ${receiver.fullName}[${receiver.accountNo}] is successful`,
      type: "success",
      read: false,
      createdAt: {
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
      },
      reference: `TNX${Date.now()}`,
      icon: "✔",
    });

    receiver.notifications.push({
      id: createId(),
      title: "Credit Alert",
      message: `You received  NGN ${inputs.amount} from ${
        currentUser.fullName
      } [${currentUser.accountNo}] which as being added to your balance`,
      type: "success",
      read: false,
      createdAt: {
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
      },
      reference: `TNX${Date.now()}`,
      icon: "✔",
    });
    this.saveUser();
    this.saveCurrentUser(currentUser);

    return {
      success: true,
      message: "Transfer successful",
    };
  }

  topUp() {}
  getNotifications() {}
  saveDashboardData() {}
  loadDashboardData() {}
  logout() {}
}
