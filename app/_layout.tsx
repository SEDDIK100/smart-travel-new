import { store } from "@/redux/stores";
import { Slot } from "expo-router";
import { Provider } from "react-redux";
import "../global.css";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}
