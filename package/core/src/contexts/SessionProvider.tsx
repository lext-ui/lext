import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { SessionProps } from "../interfaces";
import SessionStore from "../utils/SessionStore";
import { AsyncStorageProps, MMKVProps } from "../types";

export const SessionContext = createContext<SessionProps | null>(null);
export const SessionContextDispatch = createContext<
  Dispatch<SetStateAction<SessionProps | null>>
>(() => {});

type SessionProviderProps = {
  children: ReactNode;
  storage?: AsyncStorageProps | MMKVProps;
};

const SessionProvider: FC<SessionProviderProps> = ({ children, storage }) => {
  const [session, setSession] = useState<SessionProps | null>(null);

  const onHandlerSession = async () => {
    if (!storage) {
      return null;
    }

    const result = await SessionStore.getSessionLocale({
      storage,
    });

    await setSession(result);
  };

  const onListener = async () => {
    if (!storage) {
      return;
    }

    if (!session) {
      await SessionStore.removeSessionLocale({ storage });
    } else {
      await SessionStore.setSessionLocale(session, { storage });
    }
  };

  useEffect(() => {
    onHandlerSession();
  }, []);

  useEffect(() => {
    onListener();
  }, [setSession, session]);

  return (
    <SessionContext.Provider value={session}>
      <SessionContextDispatch.Provider value={setSession}>
        {children}
      </SessionContextDispatch.Provider>
    </SessionContext.Provider>
  );
};

export default SessionProvider;
