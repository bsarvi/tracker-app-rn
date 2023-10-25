import { StyleSheet, View } from "react-native";

import { COLORS } from "../constants";

const Container = ({ children }) => {
  return (
    <View style={styles.background}>
      <View style={styles.screen}>{children}</View>
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  background: { backgroundColor: COLORS.black, flex: 1 },
  screen: {
    backgroundColor: COLORS.background,
    flex: 1,
    marginTop: 5,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
});
