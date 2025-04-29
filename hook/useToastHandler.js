import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";

export const useToastHandler = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("default");

  useEffect(() => {
    if (isVisible) {
      Toast.show({
        type: type,
        text1: type === "error" ? "Error" : type === "success" ? "Success" : "Info",
        text2: message,
        position: "bottom",
        onHide: () => setIsVisible(false),
      });
    }
  }, [isVisible, message, type]);

  const showToast = (type, text) => {
    setType(type);
    setMessage(text);
    setIsVisible(true);
  };

  return { showToast };
};
