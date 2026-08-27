import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { account, teams, BLOG_TEAM_ID } from "../lib/appwrite";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isBlogger, setIsBlogger] = useState(false);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const current = await account.get();
      setUser(current);
      const teamList = await teams.list();
      setIsBlogger(teamList.teams.some((t) => t.$id === BLOG_TEAM_ID));
    } catch {
      setUser(null);
      setIsBlogger(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function login(email, password) {
    await account.createEmailPasswordSession({ email, password });
    await refresh();
  }

  async function logout() {
    await account.deleteSession({ sessionId: "current" });
    setUser(null);
    setIsBlogger(false);
  }

  return (
    <AuthContext.Provider value={{ user, isBlogger, loading, login, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
