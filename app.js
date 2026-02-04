let questions = []

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
  let filtered = []

  for (let i = 0; i < questions.length; i++) {
    if (questions[i].topic === selectedTopic) {
      filtered.push(questions[i])
    }
  }

  showQuestion(filtered[0])
})

function showQuestion(q) {
  let quizDiv = document.getElementById("quiz")
  quizDiv.innerHTML = ""

  let question = document.createElement("h3")
  question.textContent = q.question
  quizDiv.appendChild(question)

  for (let i = 0; i < q.options.length; i++) {
    let btn = document.createElement("button")
    btn.textContent = q.options[i]
    btn.onclick = function () {
      checkAnswer(i, q)
    }
    quizDiv.appendChild(btn)
  }
}
