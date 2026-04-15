import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event !== 'PASSWORD_RECOVERY') {
          // on laisse quand même l'user définir un nouveau mdp si le lien est valide
        }
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (!password || password.length < 6) {
      setError('Mot de passe trop court (min 6 caractères)');
      return;
    }
    if (password !== password2) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      setInfo('Mot de passe mis à jour');
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 flex-1">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl/9 font-bold tracking-tight text-black">Nouveau mot de passe</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label htmlFor="password" className="block text-sm/6 font-medium text-dark-grey">Nouveau mot de passe</label>
            <div className="mt-2">
              <input
                type="password"
                placeholder="Nouveau mot de passe"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-dark-grey outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-150 sm:text-sm/6"
                required
              />
            </div>
            <div className="mt-2">
              <input
                type="password"
                placeholder="Confirmer le mot de passe"
                value={password2}
                onChange={e => setPassword2(e.target.value)}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-dark-grey outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-150 sm:text-sm/6"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm p-2 bg-red-50 rounded">{error}</p>}
          {info && <p className="text-green-600 text-sm p-2 bg-green-50 rounded">{info}</p>}

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-yellow-150 px-3 py-1.5 text-sm/6 font-semibold text-dark-grey hover:bg-yellow-150/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-150 transition-colors"
          >
            Mettre à jour le mot de passe
          </button>
        </form>
      </div>
    </div>
  );
};
