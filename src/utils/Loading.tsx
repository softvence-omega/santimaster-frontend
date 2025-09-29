import { ClipLoader } from "react-spinners";
import type { CSSProperties } from "react";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

function Loading() {
  return (
    <div className="flex items-center justify-center p-10">
      <ClipLoader
        color="#22c55e"
        loading={true}
        cssOverride={override}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loading;
