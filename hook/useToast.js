import Toast from "react-native-toast-message";

export const useSuccessToast = (text) => {
  Toast.show({
    type: "success", // success | error | info
    text1: "Berhasil",
    text2: text,
    position: "bottom", // atau 'bottom'
  });
};

export const useErrorToast = (text) => {
  Toast.show({
    type: "error", // success | error | info
    text1: "Error",
    text2: text,
    position: "bottom", // atau 'bottom'
  });
};
