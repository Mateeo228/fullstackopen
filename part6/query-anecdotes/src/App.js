import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import NotificationContext from './NotificationContext'
import { useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'CLEAR':
      return null
    case 'SET':
      return action.payload
    default:
      return state
  }
}

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  const result = useQuery('anecdotes', getAnecdotes)
  const queryClient = useQueryClient()
  
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  console.log(result)

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    notificationDispatch({ type: 'SET', payload: `anecdote '${anecdote.content}' voted`})
    setTimeout(() => notificationDispatch({ type: 'CLEAR' }), 5000)
  }

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  )
}

export default App
