import './index.css'
import React from "react";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import Store from "./redux/store.js";
import { HashRouter } from "react-router-dom";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
    <HashRouter>
      <Provider store={Store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    </HashRouter>
);
