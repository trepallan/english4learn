import { createContext } from "react";

interface context {
  activity: any;
  score: any;
  setIsAnswered: any;
  isAnswered: any;
  theme: any;
}

export const ActivityContext = createContext<Partial<context>>({});

export function ActivityContextProvider(props: any) {
  const { activity, score, setIsAnswered, isAnswered, theme } = props;
  return (
    <ActivityContext.Provider
      value={{
        activity,
        score,
        setIsAnswered,
        isAnswered,
        theme,
      }}
    >
      {props.children}
    </ActivityContext.Provider>
  );
}
