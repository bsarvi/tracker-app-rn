import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import DatePicker from "./DatePicker";
import { COLORS, FONT } from "../constants";
import Button from "./Button";
import { showFlashMessage } from "../lib";

const RecordPaymentForm = ({ isLoading, endDate, onSubmit }) => {
  const [startDate, setStartDate] = useState(
    endDate == null ? new Date() : endDate.toDate()
  );
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    if (amount == null || amount == "" || isNaN(amount)) {
      showFlashMessage("Please enter a valid amount", "danger");
      return;
    }

    const paymentData = {
      startDate: startDate,
      endDate: new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000),
      paymentDate: new Date(),
      amount: amount,
    };
    onSubmit(paymentData);
    setAmount("");
  };
  useEffect(() => {
    setStartDate(endDate == null ? new Date() : endDate.toDate());
  }, [endDate]);

  return isLoading ? (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <ActivityIndicator size="large" color={COLORS.lightBackground} />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.datePicker}>
          <DatePicker state={startDate} setState={setStartDate} />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
        />
      </View>
      <Button onPress={handleSubmit} />
    </View>
  );
};

export default RecordPaymentForm;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  datePicker: {
    flex: 3,
  },
  input: {
    backgroundColor: COLORS.lightBackground,
    color: COLORS.black,
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 5,
    ...FONT.bold,
    marginBottom: 3,
    fontSize: 19,
    flex: 2,
  },
});
