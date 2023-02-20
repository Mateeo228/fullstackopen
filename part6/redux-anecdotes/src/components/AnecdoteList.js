import { useSelector, useDispatch } from 'react-redux'
import { voteOf } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if ( state.filter === ''){
      return state.anecdotes
    } else {
      return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    }
  })

  const dispatch = useDispatch()

  //A copy of the array is neccesary in order not to modify the state, which is not allowed
  const copyAnecdotes = [...anecdotes]

  const sortAnecdotes = copyAnecdotes.sort( (a,b) => b.votes - a.votes )

  const vote = (id) => {
    dispatch(voteOf(id))
    const anecdoteToVote = sortAnecdotes.find( a => a.id === id)
    dispatch(setNotification(`you voted '${anecdoteToVote.content}'`))
    setTimeout( () => dispatch(removeNotification(null)), 5000)
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