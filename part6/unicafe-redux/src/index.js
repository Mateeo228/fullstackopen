import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)
console.log(store.getState().good)

const App = () => {
  return (
    <div>
      <button 
        onClick={e => store.dispatch({ type: 'GOOD' })}
      >
        good
      </button>
      <button
        onClick={e => store.dispatch({ type: 'OK' })}
      >
        ok
      </button>
      <button 
        onClick={e => store.dispatch({ type: 'BAD' })}
      >
        bad
      </button>
      <button 
        onClick={e => store.dispatch({ type: 'ZERO' })}
      >
        reset stats
      </button>
      
      <div>
        good {store.getState().good} <br/>
        ok {store.getState().ok} <br/>
        bad {store.getState().bad} <br/>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)