import {
  checkIfContactExists,
  saveUserData,
  fetchRecentPaymentsByUser,
  addPayment,
  updateUserIsActiveStatus,
  fetchUsersWithLatestPayment,
  deletePayment,
  deleteUser,
  fetchLatestPayment,
} from "./firebase";
import { showFlashMessage, filterUsers } from "./utility";

export {
  checkIfContactExists,
  saveUserData,
  showFlashMessage,
  fetchRecentPaymentsByUser,
  addPayment,
  updateUserIsActiveStatus,
  fetchUsersWithLatestPayment,
  deletePayment,
  filterUsers,
  deleteUser,
  fetchLatestPayment,
};
