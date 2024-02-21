import {
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  StatusBar,
  Image,
} from "react-native";
import { useState } from "react";

const App = () => {
  const [showTextArea, setShowTextArea] = useState(false);
  const [loading, setLoading] = useState(false);

  const [joke, setJoke] = useState("");

  const showJoke = () => {
    setLoading(true);
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((data) => {
        // Work with the JSON data
        let joke = data.setup + " \n\n" + data.punchline;
        setJoke(joke);
        setShowTextArea(true);
        setLoading(false);
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error("Fetch error:", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="black" />
      <Image style={styles.img} source={require("./assets/icon.png")} />
      <Button
        color={"dodgerblue"}
        title={loading ? "loading..." : "Give Me A Joke"}
        onPress={showJoke}
        disabled={loading}
      ></Button>
      {showTextArea && <Text style={styles.boldFont}>{joke}</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  boldFont: {
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  img: {
    marginBottom: 20,
  },
});

export default App;
