import React, { useState, useEffect } from 'react'

import api from './services/api'

import './styles.css'

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      const { data } = response
      setRepositories(data)
    })
  }, [])

  async function handleAddRepository() {
    const newRepository = {
      title: `Test repository ${Date.now()}`,
      url: 'https://github.com/jgabriel1/gostack-desafio-conceitos-nodejs/',
      techs: [
        'Nodejs',
        'React',
        'Python'
      ]
    }

    try {
      const response = await api.post('repositories', newRepository)
      setRepositories([...repositories, response.data])
    } catch (error) {
      console.error(error)
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`)
      setRepositories(repositories => (
        repositories.filter(repository => repository.id !== id)
      ))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {
          repositories.map(({ id, title }) => (
            <li key={id}>
              {title}

              <button onClick={() => handleRemoveRepository(id)}>
                Remover
            </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  )
}

export default App
