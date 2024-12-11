import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setError] = useState<string>('')
  const { t, i18n } = useTranslation('common');

  const handleRegister = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    // todo: описать отдельные виды ошибок
    if(res.status === 201) {
      router.push('/main-page');
    } else {
      const data = await res.json();
      setError(data.message)
    }
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h1 className='mb-6 text-2xl font-bold text-gray-800 mb-6 text-center'>
           {t('login.title')}
        </h1>
      <input
          className="mb-6 block w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={t('login.placeholder.login')}
          value={username}
          onChange={e => setUsername(e.target.value)}
         />
      <input
          className="mb-6 block w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={t('login.placeholder.password')}
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
         />
        { isError
          &&
          <div className='mb-6 p-3 w-full border border-red-500 rounded-lg'>
              {isError}
          </div>
        }
      <button
        className='w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-300'
        onClick={handleRegister}
       >
        {t('login.button')}
      </button>
    </div>
  </div>
  );
}
