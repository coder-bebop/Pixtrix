import { StatusBar } from "expo-status-bar";
import { usePreventScreenCapture } from "expo-screen-capture";
import { StyleSheet, SafeAreaView } from "react-native";
import Navigation from "./components/Navigation";

export default function App() {
  // Hook for preventing screen capture
  usePreventScreenCapture();

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
