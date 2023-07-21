import React, { useMemo, useState } from "react";
import TextArea from "./TextArea";
import ConfigArea from "./ConfigArea";


const Container = () => {
  const [auto, setAuto] = useState(false);

  return (
    <>
      <div className="config">
        <ConfigArea isAutoComplete={auto} setAutoComplete={setAuto} />
      </div>
      <TextArea auto={ auto }/>
    </>
  );
};

export default Container;
