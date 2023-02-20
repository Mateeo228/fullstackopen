import { useSelector, useDispatch } from 'react-redux'
import { voteOf } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if ( state.filter === ''){
      return state.anecdotes
    } else {
      return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    }
  })

  const dispatch = useDispatch()

  const sortAnecdotes = anecdotes.sort( (a,b) => b.votes - a.votes )
  const vote = (id) => {
    dispatch(voteOf(id))
  }

  return (
    <div>
      {sortAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList