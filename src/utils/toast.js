import toast from "react-hot-toast";

export const toastSuccess = (message) => {
  toast.success(message, {
    duration: 4000,
    position: "top-right",
    style: {
      background: "#4CAF50",
      color: "#fff",
      fontWeight: "bold",
    },
  });
};

export const toastError = (message) => {
  toast.error(message, {
    duration: 4000,
    position: "top-right",
    style: {
      background: "#FF4D4D",
      color: "#fff",
      fontWeight: "bold",
    },
  });
};

export const toastInfo = (message) => {
  toast(message, {
    duration: 4000,
    position: "top-right",
    style: {
      background: "#2196F3",
      color: "#fff",
      fontWeight: "bold",
    },
  });
};