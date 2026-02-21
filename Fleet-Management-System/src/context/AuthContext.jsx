import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext();


const TOKEN_KEY = "fleet_token";
const USER_KEY = "fleet_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(USER_KEY)) || null; } catch { return null; }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && !user) {
      authService.getMe()
        .then(({ user: u }) => { setUser(u); localStorage.setItem(USER_KEY, JSON.stringify(u)); })
        .catch(() => { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(USER_KEY); });
    }
    
  }, []);

  
  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      if (password) {
        
        const res = await authService.login(email, password);
        if (res.success) {
          localStorage.setItem(TOKEN_KEY, res.token);
          localStorage.setItem(USER_KEY, JSON.stringify(res.user));
          setUser(res.user);
        } else {
          setError(res.message || "Login failed.");
        }
      } else {
        
        const mockUser = { email, role: "manager", name: "Fleet Manager" };
        setUser(mockUser);
        localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
      }
    } catch (err) {
      
      console.warn("⚠️ Backend unreachable — using mock login.");
      const mockUser = { email, role: "manager", name: "Fleet Manager" };
      setUser(mockUser);
      localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);