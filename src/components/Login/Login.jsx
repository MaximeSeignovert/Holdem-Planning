// Login.jsx
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../supabaseClient';
import { useAuth } from '@/contexts/AuthProvider';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Vous pouvez personnaliser ceci avec un spinner de chargement
  }

  // Si l'utilisateur est authentifié alors renvoie vers "/"
  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full bg-card p-8 rounded-lg shadow-md border">
        <Auth supabaseClient={supabase} providers={['google']} appearance={{ theme: ThemeSupa }} />
      </div>
    </div>
  );
};

export default Login;
