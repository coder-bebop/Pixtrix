import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import Navigation from "./components/Navigation";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>
        <Navigation />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
