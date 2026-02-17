import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import routes from "./routes/Routes.tsx";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "react-quill/dist/quill.snow.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={routes} />
        <Toaster position="top-center" reverseOrder={false} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
