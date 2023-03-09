interface Data {
  value1: Array<number>,
  value2: number
}

const parseArguments = (args: Array<string>) => {
  if (args.length < 5) throw new Error('Not enough arguments');
  
  const data = args.filter( string => {
    if (string !== args[0] && string !== args[1]){
      return true;
    } else return false;
  })
  const areNumber = data.every( string => !isNaN(Number(string)));
  
  if (areNumber){
    const [objective, ...days] = data;
    return {
      value1: days.map(day => Number(day)),
      value2: Number(objective)
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

interface Result {
  days: number,
  trainingDays: number,
  target: number,
  average: number,
  success: boolean,
  rating: number,
  ratingDescription: string
}

const calculateExercises = (Arr: Array<number>, objective: number) : Result => {
  const days = Arr.length;
  const trainingDays = Arr.reduce( 
    (acum, item) => {
      if (item > 0) {
        return acum + 1;
      } 
      return acum;
    }, 0);
  const success = Arr.filter(day => day > objective).length === days;
  let rating = 1;
  let ratingDescription = 'Bad. You should train more.';

  if (success) {
    rating = 3;
    ratingDescription = 'Excellent! You\'ve achieved your week objecive!';
  } else if (trainingDays > days/2){
    rating = 2;
    ratingDescription = 'Not too bad, but could be better';
  }

  const average = Arr.reduce( (acum, item) => acum + item, 0)/days;

  return { 
    days: days,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: objective,
    average: average };
}

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateExercises(value1, value2));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}