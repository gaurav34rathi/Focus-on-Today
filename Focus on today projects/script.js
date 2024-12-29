const checkboxList = document.querySelectorAll(".custom-checkbox");
const inputList = document.querySelectorAll(".checkbox-input");
const errorLabel = document.querySelector(".error-label");
const progressValue = document.querySelector(".progress-value");
const progressLabel = document.querySelector(".progress-label");

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};
let compeletedGoalCount = Object.values(allGoals).filter((goal) => {
  return goal.compeleted;
}).length;
progressValue.style.width = `${compeletedGoalCount * 33.33}%`;
progressValue.firstChild.innerText = `${compeletedGoalCount}/3 Completed`;

const allQuotes = [
  "Raise the bar by completing your goals!",
  "Well begun is half done!",
  "Just a step away, keep going!",
  "Whoa! You just completed all the goals, time for chill :D",
];
progressLabel.innerText = allQuotes[compeletedGoalCount];

checkboxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allinputfilled = [...inputList].every((input) => {
      return input.value;
    });
    if (allinputfilled) {
      // checkbox.parentElement.classList.add('completed')
      checkbox.parentElement.classList.toggle("completed");
      // progressValue.style.width = '33.33%'
      const inputId = checkbox.nextElementSibling.id;
      allGoals[inputId].compeleted = !allGoals[inputId].compeleted;
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
      compeletedGoalCount = Object.values(allGoals).filter((goal) => {
        return goal.compeleted;
      }).length;
      progressValue.style.width = `${compeletedGoalCount * 33.3}%`;
      progressValue.firstChild.innerText = `${compeletedGoalCount}/3 Completed`;
      progressLabel.innerText = allQuotes[compeletedGoalCount];
    } else {
      errorLabel.parentElement.classList.add("error-show");
    }
  });
});

inputList.forEach((input) => {
  input.addEventListener("focus", () => {
    errorLabel.parentElement.classList.remove("error-show");
  });

  if (allGoals[input.id]){ 

      input.value = allGoals[input.id].name;

    if(allGoals[input.id].compeleted) {
    input.parentElement.classList.add("completed");
  }
}
  input.addEventListener("input", (e) => {
    if (allGoals[input.id] && allGoals[input.id].compeleted) {
      input.value = allGoals[input.id].name;
      return;
    }

    allGoals[input.id] = {
      name: input.value,
      compeleted: false,
    };
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
