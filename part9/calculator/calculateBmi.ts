interface Values {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: Array<string>): Values => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}


const calculateBmi = (height: number, weight: number) : string => {
  const heightInMeters = height/100;
  const Bmi = weight/(heightInMeters^2);
  
  if (Bmi < 18.5){
    return 'Underweight (Unhealthy weight)';
  } else if (Bmi >= 18.5 && Bmi <= 24.9) {
    return 'Normal (Healthy weight)';
  } else if (Bmi > 24.9 && Bmi <= 29.9) {
    return 'Overweight (Unhealthy weight)';
  } else return 'Obesity (Unhealthy weight);'
}

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}