import { ClientSide } from "@/components/client";

export async function getServerSideProps() {
  // Запрос к стороннему API
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}


const MainPage = ({ data }) => {
  return (
    <div className="h-screen bg-gradient-to-b from-gray-200 to-gray-300">
        <header className="w-full bg-blue-200 h-20 flex justify-between items-center px-4">
        <nav>
        <ul className="flex space-x-6">
          <li><a href="#" className="hover:underline">Кнопка 1</a></li>
          <li><a href="#" className="hover:underline">Кнопка 2</a></li>
          <li><a href="#" className="hover:underline">Кнопка 3</a></li>
          <li><a href="#" className="hover:underline">Кнопка 4</a></li>
        </ul>
      </nav>
            <button>
              Выход
            </button>
        </header>
        <main className="w-full flex">
            <section className="w-1/2 h-screen text-center border-right-black pt-4">
              <h1>Чистый SSR</h1>
              {data.map((user) => (
                <article key={user.id} className="border-2 border-blue-300 px-2 py-3 rounded-lg m-2">
                    <h3>
                      {user.username}
                    </h3>
                    <p>
                      {user.email}
                    </p>
                </article>
              ))}
            </section>
            <div className="w-1 bg-blue-300"></div>
            <section className="w-1/2 h-screen text-center pt-4">
              <h1>Гибридный SSR</h1>
              <ClientSide />
            </section>
        </main>
    </div>
  )
}

export default MainPage
