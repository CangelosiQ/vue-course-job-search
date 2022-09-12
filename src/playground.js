// const fruits = ["a", "b", "c"];
// const vegetables = ["cucumber", "raddish"];

// console.log([...fruits, ...vegetables]);

// const developer = {
//   salary: 100000,
//   experience: 4.5,
//   techStack: ["vue", "HTML", "CSS"],
//   lookingForWork: true,
//   doubleSalary() {
//     this.salary = this.salary * 2;
//     this.lookingForWork = false;
//   },
// };
// console.log(developer.salary);
// developer.doubleSalary();
// console.log(developer.salary);

// const numbers = [1, 2, 3, 4, 5];
// const squares = numbers.map((number) => {
//   return number * number;
// });
// console.log(squares);

// const favoritFood = "sushi";

const axios = require("axios");
const url = "http://localhost:3000/jobs";

axios.get(url).then((response) => {
  console.log(response.data);
});
