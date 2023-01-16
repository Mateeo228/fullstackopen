import React from 'react'

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <strong>Total of {sum} exercises</strong>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  console.log(parts.map(x => x))
  return (
    <>
      {parts.map(part => <Part key={part.id} part={part}/>)}
    </>   
  )
}
  
const Course = ({ course }) => {
  const initialValue = 0;
  const totalValue = course.parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    initialValue
  )
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={totalValue} />
    </div>
  )
}

export default Course