import "../styles/global.css";

export default function App({ Component, pageProps }) {
  console.log("app");
  return <Component {...pageProps} />;
}
