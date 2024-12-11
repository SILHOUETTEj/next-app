import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Перенаправляем на страницу "/dashboard" при загрузке
    router.push('/login');
  }, []);

  return null; // Ничего не отображаем на главной странице
}
