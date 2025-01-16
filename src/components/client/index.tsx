'use client'

import { useEffect, useState } from "react"

export const ClientSide = () => {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        setData(data)
      } catch (err) {
        console.log('Error')
      } finally {
        setLoading(false)
      }
    };

    fetchData(); // Вызов функции
  }, [])

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center align-center">
          <div className="loader w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>

    )
  }

  return (
    <>
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
    </>
  )
}
