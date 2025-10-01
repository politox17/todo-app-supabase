import { useState } from "react";
import { supabase } from "../services/supabaseConnect";

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Login con email/password
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      onLoginSuccess();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Login con Google
  const handleGoogleLogin = async () => {
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) throw error;
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h3>Accedi alla tua applicazione</h3>
      
      {/* Login con Google */}
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={handleGoogleLogin} 
          disabled={loading}
          className="google-button"
        >
          {loading ? 'Caricamento...' : 'Accedi con Google'}
        </button>
      </div>

      <hr />
      
      {/* Login con email/password */}
      <form  className="login-form"onSubmit={handleEmailLogin}>
        <div className="login-email-item">
          <label htmlFor="email">Inserisci email</label>
          <input 
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className='login-password-item'>
          <label htmlFor="password">Inserisci password</label>
          <input 
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Caricamento...' : 'Accedi'}
        </button>
      </form>
    </div>
  );
}