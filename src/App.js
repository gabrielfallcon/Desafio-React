import React,{useState, useEffect} from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(res => {
      setRepositories(res.data)
      console.log(res.data)
    })
  }, [])

  async function handleAddRepository() {
    const res = await api.post('repositories', {
      title: 'React Ninja',
      url: 'www.html.com',
      techs: ['projetos', 'angular', 'node'],
      like: 0
    })

    const repo = res.data

    setRepositories([...repositories, repo])
  }

  async function handleRemoveRepository(id) {
    const repository = await api.delete(`/repositories/${id}`)

    console.log(repository)

    setRepositories(repositories.filter(repo => repo.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => {
          return(
            <li>
              <span key={repo.id}>{repo.title}</span>
              
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
