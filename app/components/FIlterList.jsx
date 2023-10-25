import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { COLORS, FONT } from "../constants";
import DataContext from "../context/DataContext";

const data = [
  { id: "1", title: "All", slug: "all" },
  {
    id: "2",
    title: "Overdue",
    slug: "overdue",
  },
  {
    id: "3",
    title: "Due Today",
    slug: "dueToday",
  },

  {
    id: "4",
    title: "Due In 3 Days",
    slug: "dueIn3Days",
  },
  {
    id: "5",
    title: "Due In 7 Days",
    slug: "dueIn7Days",
  },
  {
    id: "6",
    title: "Due in 15 Days",
    slug: "dueIn15Days",
  },
  {
    id: "7",
    title: "Inactives",
    slug: "inactive",
  },
];

const Item = ({ item }) => {
  const { activeFilter, handleActiveFilter } = useContext(DataContext);

  return (
    <TouchableOpacity
      style={styles.itemContainer(activeFilter, item.slug)}
      onPress={() => handleActiveFilter(item.slug)}
    >
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );
};

const FIlterList = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <FlatList
          data={data}
          renderItem={({ item }) => <Item item={item} a />}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default FIlterList;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  card: {
    backgroundColor: COLORS.card,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    flex: 1,
  },
  itemContainer: (activeFilter, title) => ({
    backgroundColor:
      activeFilter == title ? COLORS.success : COLORS.lightBackground,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderRadius: 15,
  }),
  title: {
    fontSize: 16,
    color: COLORS.black,
    ...FONT.regular,
  },
});
