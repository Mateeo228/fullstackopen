import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <>
      <h1>{props.header}</h1>
    </>
  )
}

const Button = (props) => {
  return (
    <>
      <button onClick={props.set}>
        {props.text}
      </button>
    </>
  )
}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  const average = (props.good - props.bad)/all
  const positive = (props.good/all) * 100
  
  
  return (
    all === 0 ? 
    <>
    <p>No feedback given</p>
    </>
    :
    <table>
      <tbody>
      <Statistic text="good" value={props.good}/>
      <Statistic text="neutral" value={props.neutral}/>
      <Statistic text="bad" value={props.bad}/>
      <Statistic text="all" value={all}/>
      <Statistic text="average" value={average}/>
      <Statistic text="positive" value = {positive.toString() + " %"} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)
  
  return (
    <div>
      <Header header={'give feedback'}/>
      <Button set={increaseGood} text={'good'}/>
      <Button set={increaseNeutral} text={'neutral'}/>
      <Button set={increaseBad} text={'bad'}/>
      <Header header={'statistics'}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)