import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { DB } from "../../firebaseConfig";

export const checkIfContactExists = async (contact) => {
  try {
    const collectionRef = collection(DB, "users");
    const querySnapshot = await getDocs(
      query(collectionRef, where("contact", "==", contact))
    );
    return querySnapshot.size > 0;
  } catch (error) {
    console.log("Error querying Firestore: ", error);
    return false;
  }
};

export const saveUserData = async (values) => {
  try {
    const collectionRef = collection(DB, "users");
    const docRef = await addDoc(collectionRef, {
      name: values.name,
      contact: values.contact,
      isActive: true,
    });

    const newUser = {
      id: docRef.id,
      name: values.name,
      contact: values.contact,
      isActive: true,
    };

    return newUser;
  } catch (error) {
    console.log("Error saving user data to Firestore: ", error);
    return null;
  }
};

export const fetchRecentPaymentsByUser = async (userId) => {
  try {
    const paymentsQuery = query(
      collection(DB, "users", userId, "payments"),
      orderBy("paymentDate", "desc"),
      limit(3)
    );

    const paymentSnapshot = await getDocs(paymentsQuery);

    const recentPayments = paymentSnapshot.docs.map((paymentDoc) => {
      const paymentData = paymentDoc.data();
      const paymentId = paymentDoc.id;

      return {
        id: paymentId,
        ...paymentData,
      };
    });

    const sortedPayments = recentPayments.sort(
      (a, b) => b.paymentDate - a.paymentDate
    );

    return sortedPayments;
  } catch (error) {
    console.log("Error fetching recent payments: ", error);
    return [];
  }
};

export const updateUserIsActiveStatus = async (userId, isActive) => {
  try {
    await updateDoc(doc(DB, "users", userId), {
      isActive: isActive,
    });
  } catch (error) {
    console.error("Error updating user isActive status:", error);
    throw error;
  }
};

// export async function getStatistics() {
//   const usersRef = collectionGroup(db, "users");
//   const usersSnapshot = await getDocs(usersRef);

//   let totalUsers = 0;
//   let inactiveUsers = 0;
//   let totalAmountCollected = 0;
//   let totalDueAmount = 0;
//   let usersToPayInThreeDaysCount = 0;
//   let overdueUsersCount = 0;

//   usersSnapshot.forEach((doc) => {
//     const user = doc.data();
//     const payments = user.payments || [];

//     // Count total users and inactive users
//     totalUsers++;
//     if (!user.isActive) {
//       inactiveUsers++;
//     }

//     // Calculate payment statistics
//     payments.forEach((payment) => {
//       const endDate = payment.endDate;
//       const amount = payment.amount;

//       totalAmountCollected += amount;

//       if (endDate < serverTimestamp()) {
//         totalDueAmount += amount;
//         overdueUsersCount++;
//       }

//       const threeDaysFromNow = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

//       if (endDate.toDate() <= threeDaysFromNow) {
//         usersToPayInThreeDaysCount++;
//       }
//     });
//   });

//   return {
//     totalUsers,
//     inactiveUsers,
//     totalAmountCollected,
//     totalDueAmount,
//     usersToPayInThreeDaysCount,
//     overdueUsersCount,
//   };
// }

export const fetchUsersWithLatestPayment = async () => {
  const usersCollectionRef = collection(DB, "users");
  const usersQuery = query(usersCollectionRef);

  const userSnapshot = await getDocs(usersQuery);

  const usersWithLatestPayment = [];

  for (const userDoc of userSnapshot.docs) {
    const userId = userDoc.id;
    const userData = userDoc.data();

    const paymentsCollectionRef = collection(DB, "users", userId, "payments");
    const paymentsQuery = query(
      paymentsCollectionRef,
      orderBy("paymentDate", "desc"),
      limit(1)
    );

    const paymentSnapshot = await getDocs(paymentsQuery);

    if (!paymentSnapshot.empty) {
      const latestPayment = paymentSnapshot.docs[0].data();

      const endDate = latestPayment.endDate.toDate();

      const currentDate = new Date();
      const timeDifference = endDate.getTime() - currentDate.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      const userWithLatestPayment = {
        id: userId,
        ...userData,
        latestPayment: {
          id: paymentSnapshot.docs[0].id,
          ...latestPayment,
        },
      };

      usersWithLatestPayment.push(userWithLatestPayment);
    } else {
      usersWithLatestPayment.push({
        id: userId,
        ...userData,
        latestPayment: null,
      });
    }
  }

  return usersWithLatestPayment;
};

export const addPayment = async (paymentData, userId) => {
  const paymentRef = collection(DB, "users", userId, "payments");
  const docRef = await addDoc(paymentRef, paymentData);
  const paymentDoc = await getDoc(docRef);
  const payment = {
    id: docRef.id,
    ...paymentDoc.data(),
  };
  return payment;
};

export const deletePayment = async (paymentId, userId) => {
  const paymentRef = doc(DB, "users", userId, "payments", paymentId);
  console.log("delete");
  await deleteDoc(paymentRef);
  console.log("deleted");
};

export const deleteUser = async (userId) => {
  try {
    const userRef = doc(DB, "users", userId);
    await deleteDoc(userRef);
    console.log("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

export const fetchLatestPayment = async (userId) => {
  const paymentRef = collection(DB, "users", userId, "payments");
  const queryRef = query(paymentRef, orderBy("paymentDate", "desc"), limit(1));
  const querySnapshot = await getDocs(queryRef);
  if (querySnapshot.empty) {
    return null;
  }
  const paymentDoc = querySnapshot.docs[0].data();
  return { id: querySnapshot.docs[0].id, ...paymentDoc };
};
