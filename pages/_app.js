import { ThemeProvider } from "next-themes";
import { DataProvider } from "../context/dataContext";
import "../css/tailwind.css";

function MyApp({ Component, pageProps }) {

  return (
    <ThemeProvider attribute="class">
        <DataProvider>
          <Component {...pageProps} />
        </DataProvider>
    </ThemeProvider>
  );
}

export default MyApp;
