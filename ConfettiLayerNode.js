import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import Animated, {
  add,
  EasingNode,
  modulo,
  multiply,
  timing,
} from 'react-native-reanimated';

export const ConfettiLayerNode = () => {
  const time = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = timing(time, {
      toValue: 10000000,
      duration: 10000000,
      easing: EasingNode.linear,
    });
    animation.start();
    return () => animation.stop();
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

  const animatedStyle = {
    transform: [
      {
        translateX: modulo(add(startX, multiply(time, velocityX)), 375),
      },
      {translateY: modulo(add(startY, multiply(time, velocityY)), 812)},
    ],
  };

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
