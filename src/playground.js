const fruits = ["a", "b", "c"];
const vegetables = ["cucumber", "raddish"];

console.log([...fruits, ...vegetables]);

const developer = {
  salary: 100000,
  experience: 4.5,
  techStack: ["vue", "HTML", "CSS"],
  lookingForWork: true,
  doubleSalary() {
    this.salary = this.salary * 2;
    this.lookingForWork = false;
  },
};
console.log(developer.salary);
developer.doubleSalary();
console.log(developer.salary);

export const evenOrOdd = (number) => {
  if (number % 2 === 0) {
    return "Even";
  } else {
    return "Odd";
  }
};
export const multiply = (num1, num2) => num1 * num2;
export const divide = (num1, num2) => num1 * num2;
