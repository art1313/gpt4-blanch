import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// this is the place to build you prompt
const generateAction = async (req, res) => {

  const basePromptPrefix =
  `
  Write me a detailed fitness workout plan based on the following input and taylor it specifically to that type of person.
  Level: ${req.body.userInput}
  Gender: ${req.body.userInput2}
  Age: ${req.body.userInput3}
  Height: ${req.body.userInput4}
  Weight: ${req.body.userInput5}
  Desired Weight: ${req.body.userInput6}
  Goal: ${req.body.userInput7}
  Equipment: ${req.body.userInput8}
  Special Case: ${req.body.userInput10}

  Create a plan below in the following format.
  Specify number of repetions and weight in pounds. Make sure that over the week fitness plan covers all muscles groups, such and chest, back, shoulders, triceps, bicepts, legs, core. Combining two muscles groups in one day is the goal.
  For each day provide at least 8 exercizes with the focus on 2 different muscle groups. Add muscle groups as the title for the day.
  Make sure to give at least 2 days rest.
  Monday: [Muscle Group]
  Tuesday:
  Wednesday:
  Thursday:
  Friday:
  Saturday:
  Sunday:

  `;

  console.log(`API: ${basePromptPrefix}`)
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}`,
    temperature: 0.7,
    max_tokens: 2500,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });

  // I build Prompt #2.
  // const secondPrompt = 
  // `
  // Create pretty format the workout plan below: 
  // Fitness Workout Plan: ${basePromptOutput.text}

  // Formatted workout plan:

  // `;
  
  // // I call the OpenAI API a second time with Prompt #2
  // const secondPromptCompletion = await openai.createCompletion({
  //   model: 'text-davinci-003',
  //   prompt: `${secondPrompt}`,
  //   // I set a higher temperature for this one. Up to you!
  //   temperature: 0.8,
	// 	// I also increase max_tokens.
  //   max_tokens: 3000,
  // });
  
  // // Get the output
  // const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  // // Send over the Prompt #2's output to our UI instead of Prompt #1's.
  // res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;