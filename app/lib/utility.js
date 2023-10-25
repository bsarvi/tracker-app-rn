import { showMessage } from "react-native-flash-message";

const showFlashMessage = (message, type) => {
  showMessage({
    message,
    type, // can be 'default', 'info', 'success', 'warning', or 'danger'
  });
};

export function filterUsers(state, criteria = "all") {
  switch (criteria) {
    case "all":
      return state;
    case "overdue":
      return state.filter((user) => {
        if (user.latestPayment && user.latestPayment.endDate) {
          const currentDate = new Date();
          const endDate = new Date(user.latestPayment.endDate.toDate());

          return endDate <= currentDate && user.isActive; // Include if endate is in the future or today
        }

        return false;
      });
    case "dueToday":
      return state.filter((user) => {
        if (user.latestPayment && user.latestPayment.endDate) {
          const currentDate = new Date();
          const endDate = new Date(user.latestPayment.endDate.toDate());
          const dueToday =
            endDate.toDateString() === currentDate.toDateString() &&
            user.isActive;

          return dueToday; // Include if endate is today
        }

        return false; // Exclude if latestPayment is null or endate is missing
      });
    case "dueIn3Days":
      return state.filter((user) => {
        if (user.latestPayment && user.latestPayment.endDate) {
          const currentDate = new Date();
          const endDate = new Date(user.latestPayment.endDate.toDate());
          const timeDifference = endDate.getTime() - currentDate.getTime();
          const daysDifference = Math.ceil(
            timeDifference / (1000 * 60 * 60 * 24)
          );

          return daysDifference <= 3 && daysDifference > 0 && user.isActive; // Include if endate is within the next three days
        }

        return false; // Exclude if latestPayment is null or endate is missing
      });
    case "dueIn7Days":
      return state.filter((user) => {
        const latestPayment = user.latestPayment;
        if (user.latestPayment && user.latestPayment.endDate) {
          const currentDate = new Date();
          const endDate = new Date(user.latestPayment.endDate.toDate());
          const timeDifference = endDate.getTime() - currentDate.getTime();
          const daysDifference = Math.ceil(
            timeDifference / (1000 * 60 * 60 * 24)
          );

          return daysDifference <= 7 && daysDifference > 0 && user.isActive; // Include if endate is within the next three days
        }
      });
    case "dueIn15Days":
      return state.filter((user) => {
        if (user.latestPayment && user.latestPayment.endDate) {
          const currentDate = new Date();
          const endDate = new Date(user.latestPayment.endDate.toDate());
          const timeDifference = endDate.getTime() - currentDate.getTime();
          const daysDifference = Math.ceil(
            timeDifference / (1000 * 60 * 60 * 24)
          );

          return daysDifference <= 15 && daysDifference > 0 && user.isActive; // Include if endate is within the next three days
        }
      });
    case "inactive":
      return state.filter((user) => !user.isActive);
    default:
      return state;
  }
}

export { showFlashMessage };
