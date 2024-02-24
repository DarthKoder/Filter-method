  
/**
 * To run this file in Gitpod, use the 
 * command node filter.js in the terminal
 */


// Simple Filtering
/**
 * I want to iterate through this array and create a new array of only the people who are old enough to drink alcohol - those who are at least 21 years old.
 * In other words, my resulting array should have only Michael in it, since everyone else is under age 21.
 * To do this with the filter method is quite similar to using the map method.  
 * I just need to call the filter method on the people array and pass it a callback function.  
 * Just the same as we did with the map method, I’ll use a simple arrow function that takes the person as a parameter, and returns person.age >= 21. 
 * I’ll store this result in a variable called oldEnough.  
 * If I log that to the console and then run the code using node space filter.js, I see the resulting array which contains only michael’s object.
 */
const people = [
  {
    name: 'Michael',
    age: 23,
  },
  {
    name: 'Lianna',
    age: 16,
  },
  {
    name: 'Paul',
    age: 18,
  },
];

const oldEnough = people.filter(person => person.age >= 21);
console.log(oldEnough);

const paul = people.filter(person => person.age == 18);
console.log(paul);

// Using name
const paul2 = people.filter(person => person.name === "Paul");
console.log(paul2);
// As arbitrary, we can reduse person down to p. --- cleanist and best to use. 
const paul3 = people.filter(p => p.name === "Paul");
console.log(paul3);

/**
 * One thing to note here, is that the filter method always returns an array, even if it’s an array of only one element.
 * If you log paul to the console, you’ll see it’s actually an array containing the paul object. 
 * If I want to access the object itself, 
 * I could simply append [0] to the end up here to get the first and only element in the resulting array.
 * Basically this is to call the object itself without being in the array brackets. 
 */
const paul4 = people.filter(p => p.name === "Paul")[0];
console.log(paul4);

// Complex Filtering
const students = [
  {
    id: 1,
    name: 'Mark',
    profession: 'Developer',
    skills: [
      { name: 'javascript', yrsExperience: 1 },
      { name: 'html', yrsExperience: 5 },
      { name: 'css', yrsExperience: 3 },
    ]
  },
  {
    id: 2,
    name: 'Ariel',
    profession: 'Developer',
    skills: [
      { name: 'javascript', yrsExperience: 0 },
      { name: 'html', yrsExperience: 4 },
      { name: 'css', yrsExperience: 2 },
    ]
  },
  {
    id: 3,
    name: 'Jason',
    profession: 'Designer',
    skills: [
      { name: 'javascript', yrsExperience: 1 },
      { name: 'html', yrsExperience: 1 },
      { name: 'css', yrsExperience: 5 },
    ]
  },
];

/**
 * create a list of job interview candidates by filtering out any students who don’t have at least 5 years of experience in at least one skill.
 * So, when I’m done, I should be left with only Mark and Jason, since Ariel has a max of 4 years of experience. 
 * The first thing we know we need to do is filter the students array, so let’s start with const candidates = students.filter().
 * I’ll pass in an arrow function taking the student as a parameter, and open a set of curly braces to contain  its logic. 
 * Now, I’m going to approach this by filtering the inner skills array to only those skills with at least five years of experience. 
 * I’ll call those strong skills. and for each skill, let strongSkills = student.skills.filter() 
 * And for each skill, we want to check if skill.yrsExperience is greater than or equal to five.
 * This filter will return an array of only those skills in which  the student has at least five years of experience. 
 * In the case of Ariel, it will just return an empty array, since none of her skills pass that test
 */
const candidates = students.filter(student =>  {
  let strongSkills = student.skills.filter(skill => skill.yrsExperience >= 5);
  return strongSkills.length > 0;
})

console.log(candidates);

/**
 * This filter looks pretty complex and it’s not exactly easy to understand what’s going on.
 * In this case, I would extract the whole filter function into its own function, for example, called hasStrongSkills: 
 * Then I can just pass the hasStrongSkills function to my filter, which is a lot easier to read, plus it allows us to reuse the filter function elsewhere.  
 */
const hasStrongSkills = student =>  {
  let strongSkills = student.skills.filter(skill => skill.yrsExperience >= 5);
  return strongSkills.length > 0;
}
const candidates1 = students.filter(hasStrongSkills)

console.log(candidates1);

/**
 *  I could even extract the inner filter into another external function called has5YearsExp, and then pass it inside the hasStrongSkills function. 
 * This actually allows me to then remove the return statement and the strongSkills variable entirely,  
 * just attach .length onto the end of the inner filter instead, and turn everything into a nice single line of code.
 */
const has5YearsExp = skill => skill.yrsExperience >= 5;
const hasStrongSkills1 = student => student.skills.filter(has5YearsExp).length > 0;
const candidates2 = students.filter(hasStrongSkills1).map(students => [students.name]);

console.log(candidates2);
