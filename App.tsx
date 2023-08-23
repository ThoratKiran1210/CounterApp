import React, { useState, useEffect } from 'react';
import { View, Text, Button, ImageBackground, StyleSheet } from 'react-native';

const App: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const targetNumber = 10; // Change this to your desired target number

  useEffect(() => {
    // let interval: NodeJS.Timeout :-  is declaring a variable named interval with a type annotation NodeJS.Timeout.
    // NodeJS.Timeout is a type that represents a timeout ID returned by the setInterval function. 
    let interval: NodeJS.Timeout;

    if (isActive && seconds < targetNumber) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 0.2); // Increment every 200 milliseconds (0.2 seconds)
      }, 200);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, seconds, targetNumber]);

  const handleStart = () => {
    setIsActive(true);
    setSeconds(0); // Reset the timer to 0 when starting
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleResume = () => {
    setIsActive(true);
  };

  return (
    <ImageBackground source={require('./assets/timer.gif')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.timerBox}>
          <Text style={styles.timerText}>Timer: {seconds.toFixed(1)} seconds</Text>
          <View style={styles.buttonContainer}>
            <Button title="Start" onPress={handleStart} disabled={isActive || seconds >= targetNumber} />
            <Button title="Stop" onPress={handleStop} disabled={!isActive || seconds >= targetNumber} />
            <Button title="Resume" onPress={handleResume} disabled={isActive || seconds >= targetNumber} />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' if needed
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerBox: {
    // backgroundColor: 'white', // Background color of the box
    padding: 20,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  timerText: {
    fontSize: 24,
    marginBottom: 20,
    color: 'black', // Adjust text color to contrast with the background
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 10
  },
});

export default App;
