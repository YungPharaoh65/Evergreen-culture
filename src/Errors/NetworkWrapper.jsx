import React, { useEffect, useState } from "react";
import Errorpage from "./Errorpage";

const NetworkWrapper = ({ children }) => {

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  //function to set WRAPPER
  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    //OPTION T WHEN WINDOW GOES ONLINE / OFFLINE
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };

  }, []);

  if (!isOnline) {
    return <Errorpage />;
  }

  return <>{children}</>;
};

export default NetworkWrapper;
