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
