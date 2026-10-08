import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Appearance,
  ScrollView,
  FlatList,
} from "react-native";
import { GoalItem } from "./components/GoalItem";
import { GoalInput } from "./components/GoalInput";
export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(true);

  const addGoalHandler = (enteredText) => {
    setCourseGoals((currentCourseGoals) => {
      setModalVisibility(false);
      return [
        ...currentCourseGoals,
        { text: enteredText, id: Math.random().toString() },
      ];
    });
  };
  const deleteGoalHandler = (id) => {
    setCourseGoals(courseGoals.filter((goal) => goal.id !== id));
  };

  const cancelHandler = () => {
    setModalVisibility(false);
  };

  const openModal = () => {
    setModalVisibility(true);
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button title="Add New Goal" color="#bd90f9" onPress={openModal} />
        <GoalInput
          onAddGoal={addGoalHandler}
          modalVisibility={modalVisibility}
          cancelHandler={cancelHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  onDeleteItem={deleteGoalHandler}
                  id={itemData.item.id}
                />
              );
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  goalsContainer: {
    flex: 5,
  },
});
