import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  addPayment,
  deletePayment,
  deleteUser,
  fetchRecentPaymentsByUser,
  updateUserIsActiveStatus,
  fetchLatestPayment,
} from "../lib";
import {
  Button,
  Container,
  DisabledUserIcon,
  HistoryItem,
  PaymentList,
} from "../components";
import { COLORS, FONT } from "../constants";
import RecordPaymentForm from "../components/RecordPaymentForm";
import { showFlashMessage } from "../lib";
import FlashMessage from "react-native-flash-message";
import DataContext from "../context/DataContext";

const DetailsScreen = ({ navigation, route }) => {
  const { user } = route.params;
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    updateUsers,
    updateLatestPayemnt,
    deleteUserByID,
    updateStateWithLatestPayment,
  } = useContext(DataContext);
  const [latestPayment, setLatestPayment] = useState(user.latestPayment);

  useEffect(() => {
    fetchRecentPaymentsByUser(user.id)
      .then((paymentHistory) => {
        setPayments(paymentHistory);
      })
      .catch((error) => {
        console.log("Error fetching payment history: ", error);
      });
  }, [user.id]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <DisabledUserIcon
          isActive={user.isActive}
          onPress={handleDisableUser}
        />
      ),
    });
  }, [navigation, user.isActive]);

  const recordPaymentSubmit = (paymentData) => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      addPayment(paymentData, user.id)
        .then((payment) => {
          // Add the payment to the payments array
          if (Keyboard) Keyboard.dismiss();
          const updatedPayments = [payment, ...payments];
          setPayments(updatedPayments);
          showFlashMessage("Payment recorded successfully", "success");
          
          setLatestPayment(payment);
          
          setIsLoading(false);
          updateLatestPayemnt(user.id, payment);
          resolve();
        })
        .catch((error) => {
          showFlashMessage("Error recording payment", "danger");
          reject(error);
        });
    });
  };

  const handleDisableUser = async () => {
    const toggledIsActive = !user.isActive;

    try {
      await updateUserIsActiveStatus(user.id, toggledIsActive);

      updateUsers(user.id, toggledIsActive);
    } catch (error) {
      console.error("Error handling disable user:", error);
      // Handle any error that occurs during the update
    }
  };

  const handleDeletePayment = (paymentId) => {
    Alert.alert(
      "Delete Payment",
      "Are you sure you want to delete this payment?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            deletePayment(paymentId, user.id);
            

            const latestPayment = await fetchLatestPayment(user.id);
            updateStateWithLatestPayment(user.id, latestPayment);
            setLatestPayment(latestPayment);
            setPayments((prevDetails) =>
              prevDetails.filter((payment) => payment.id !== paymentId)
            );

            showFlashMessage("Payment deleted successfully", "success");
          },
        },
      ]
    );
  };
  const handleDeleteUser = () => {
    Alert.alert("Delete User", "Are you sure you want to delete this user?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteUser(user.id);
          deleteUserByID(user.id);
          navigation.navigate("Home");
        },
      },
    ]);
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.wrapper}>
          <View>
            <Text style={styles.desc}>DETAILS</Text>
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.key}>Name</Text>
                <Text style={styles.value}>{user.name}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.key}>Contact</Text>
                <Text style={styles.value}>{user.contact}</Text>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.desc}>RECORD PAYMENT</Text>
            <View style={styles.card}>
              <RecordPaymentForm
                onSubmit={recordPaymentSubmit}
                endDate={latestPayment == null ? null : latestPayment.endDate}
                isLoading={isLoading}
              />
            </View>
          </View>
          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <Text style={styles.desc}>PAYMENT HISTORY</Text>
            <View style={styles.card}>
              <PaymentList
                payments={payments}
                handleDeletePayment={handleDeletePayment}
              />
            </View>
          </View>
          <Button
            title="Delete User"
            onPress={handleDeleteUser}
            color={COLORS.danger}
          />
        </View>
      </ScrollView>
      <FlashMessage position="top" />
    </Container>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  desc: {
    color: COLORS.lightBackground,
    ...FONT.bold,
    fontSize: 17,
    marginBottom: 10,
  },
  card: {
    backgroundColor: COLORS.card,
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  key: { color: COLORS.white, ...FONT.extraLight, fontSize: 16, flex: 2 },
  value: {
    color: COLORS.white,
    ...FONT.regular,
    fontSize: 19,
    textTransform: "capitalize",
    flex: 6,
  },
});
