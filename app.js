let questions = []
let currentQuestions = []
let currentIndex = 0

fetch("data/questions.json")
  .then(response => response.json())
  .then(data => {
    questions = data
    loadTopics()
  })
function loadTopics() {
  let topics = []

  for (let i = 0; i < questions.length; i++) {
    if (!topics.includes(questions[i].topic)) {
      topics.push(questions[i].topic)
    }
  }

  let select = document.getElementById("topicSelect")

  for (let i = 0; i < topics.length; i++) {
    let option = document.createElement("option")
    option.value = topics[i]
    option.textContent = topics[i]
    select.appendChild(option)
  }
}

document.getElementById("topicSelect").addEventListener("change", function () {
  let selectedTopic = this.value
  currentQuestions = []
  currentIndex = 0

  for (let i = 0; i < questions.length; i++) {
    if (questions[i].topic === selectedTopic) {
      currentQuestions.push(questions[i])
    }
  }

  showQuestion()
})

function showQuestion() {
  let quizDiv = document.getElementById("quiz")
  quizDiv.innerHTML = ""

  let q = currentQuestions[currentIndex]

  let question = document.createElement("h3")
  question.textContent = q.question
  quizDiv.appendChild(question)

  for (let i = 0; i < q.options.length; i++) {
    let btn = document.createElement("button")
    btn.textContent = q.options[i]
    btn.onclick = function () {
      checkAnswer(i)
    }
    quizDiv.appendChild(btn)
  }
}

function checkAnswer(index) {
  let quizDiv = document.getElementById("quiz")
  let q = currentQuestions[currentIndex]

  let result = document.createElement("p")

  if (index === q.answerIndex) {
    result.textContent = "Correct! " + q.explanation
  } else {
    result.textContent = "Wrong. " + q.explanation
  }

  quizDiv.appendChild(result)

  let nextBtn = document.createElement("button")
  nextBtn.textContent = "Next Question"
  nextBtn.onclick = function () {
    currentIndex++

    if (currentIndex < currentQuestions.length) {
      showQuestion()
    } else {
      quizDiv.innerHTML = "Topic completed 🎉"
    }
  }

  quizDiv.appendChild(nextBtn)
}
