import { createContext } from "react";

interface context {
  activity: any;
  score: any;
  setIsAnswered: any;
  isAnswered: any;
}

export const ActivityContext = createContext<Partial<context>>({});

export function ActivityContextProvider(props: any) {
  const { activity, score, setIsAnswered, isAnswered } = props;
  return (
    <ActivityContext.Provider
      value={{
        activity,
        score,
        setIsAnswered,
        isAnswered,
      }}
    >
      {props.children}
    </ActivityContext.Provider>
  );
}
