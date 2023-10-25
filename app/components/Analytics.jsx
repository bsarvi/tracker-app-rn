import { StyleSheet, Text, View } from "react-native";

import { COLORS, FONT } from "../constants";
import DataContext from "../context/DataContext";
import { useContext } from "react";

const Analytics = () => {
  const { activeUsers, inactiveUsers, dueIn3Days, overdueUsers } =
    useContext(DataContext);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.desc}>Active Members</Text>
          <Text style={styles.title(COLORS.success)}>{activeUsers}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.desc}>Inactive Members</Text>
          <Text style={styles.title(COLORS.warning)}>{inactiveUsers}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.desc}>Due In 3 Days</Text>
          <Text style={styles.title(COLORS.warning)}>{dueIn3Days}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.desc}>OverDue</Text>
          <Text style={styles.title(COLORS.danger)}>{overdueUsers}</Text>
        </View>
      </View>
    </View>
  );
};

export default Analytics;

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    gap: 10,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    gap: 10,
  },
  card: {
    backgroundColor: COLORS.card,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    flex: 1,
  },
  desc: {
    color: COLORS.lightBackground,
    ...FONT.bold,
    fontSize: 12,
    marginBottom: 8,
  },
  title: (color) => ({
    textAlign: "center",
    color: color,
    ...FONT.light,
    fontSize: 24,
  }),
});
