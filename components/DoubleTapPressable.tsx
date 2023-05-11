import React, { useState, useRef } from "react";
import { Pressable } from "react-native";

function DoubleTapPressable({ onPress, onDoubleTap, ...props }) {
  const [lastTap, setLastTap] = useState(0);
  const timeoutRef = useRef(null);

  function handlePress() {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (now - lastTap < DOUBLE_PRESS_DELAY) {
      clearTimeout(timeoutRef.current);
      onDoubleTap();
    } else {
      setLastTap(now);
      timeoutRef.current = setTimeout(() => {
        onPress();
      }, DOUBLE_PRESS_DELAY);
    }
  }

  function handleLongPress() {
    clearTimeout(timeoutRef.current);
    onPress();
  }

  return (
    <Pressable onPress={handlePress} onLongPress={handleLongPress} {...props} />
  );
}

export default DoubleTapPressable;
