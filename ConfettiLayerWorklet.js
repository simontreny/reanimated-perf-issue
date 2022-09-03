import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const ConfettiLayerWorklet = () => {
  const time = useSharedValue(0);

  useEffect(() => {
    time.value = withTiming(10000000, {
      duration: 10000000,
      easing: Easing.linear,
    });
  });

  return (
    <View style={{flex: 1}}>
      {Array.from({length: 200}, (_, index) => (
        <Confetti key={index} time={time} />
      ))}
    </View>
  );
};

const Confetti = ({time}) => {
  const startX = useRef(random(0, 375)).current;
  const startY = useRef(random(0, 812)).current;
  const velocityX = useRef(random(0, 50) / 1000).current;
  const velocityY = useRef(random(70, 150) / 1000).current;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: (startX + time.value * velocityX) % 375},
      {translateY: (startY + time.value * velocityY) % 812},
    ],
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: 20,
          height: 20,
          backgroundColor: 'blue',
        },
        animatedStyle,
      ]}
    />
  );
};

function random(min, max) {
  return min + Math.random() * (max - min);
}
