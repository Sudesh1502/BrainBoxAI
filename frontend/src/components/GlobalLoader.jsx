import { FadeLoader } from "react-spinners";
import { useLoader } from "../components/LoaderContext";

const GlobalLoader = () => {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.3)", // slight blur effect
        backdropFilter: "blur(3px)",   // blur screen a bit
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <FadeLoader />
    </div>
  );
};

export default GlobalLoader;
