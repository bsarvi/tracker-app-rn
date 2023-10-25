import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import FlashMessage from "react-native-flash-message";
import { Formik } from "formik";
import * as Yup from "yup";

import { Container, Input, Button } from "../components";
import { COLORS } from "../constants";
import { checkIfContactExists, saveUserData, showFlashMessage } from "../lib";
import DataContext from "../context/DataContext";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  contact: Yup.number().required("Contact is required").integer(),
});

const AddScreen = ({ navigation }) => {
  const { setUsers } = useContext(DataContext);

  const handleSubmit = async (values) => {
    try {
      const contactExists = await checkIfContactExists(values.contact);

      if (contactExists) {
        showFlashMessage("Contact already exists", "danger");
      } else {
        const newUser = await saveUserData(values);

        if (newUser) {
          showFlashMessage("User added successfully", "success");
          user = {
            ...newUser,
            latestPayment: null,
          };
          setUsers((prevUsers) => [...prevUsers, user]);

          navigation.navigate("Details", { user: user });
        } else {
          showFlashMessage("Failed to add user", "danger");
        }
      }
    } catch (error) {
      console.log("Error handling submit: ", error);
    }
  };

  return (
    <Container>
      <View style={styles.wrapper}>
        <View style={styles.card}>
          <Formik
            initialValues={{ name: "", contact: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <>
                <Input
                  value={values.name}
                  handleChange={handleChange("name")}
                  onBlur={handleBlur("name")}
                  placeholder="Name"
                  error={errors.name}
                />

                <Input
                  value={values.contact}
                  handleChange={handleChange("contact")}
                  onBlur={handleBlur("contact")}
                  placeholder="Contact"
                  error={errors.contact}
                />

                <Button onPress={handleSubmit} />
              </>
            )}
          </Formik>
        </View>
      </View>
      <FlashMessage position="top" />
    </Container>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  wrapper: { justifyContent: "center", alignItems: "center", flex: 1 },
  card: {
    backgroundColor: COLORS.card,
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});
