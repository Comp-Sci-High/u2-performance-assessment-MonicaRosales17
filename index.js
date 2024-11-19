

async function generateImage(promptData) {

  const apiKey = "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"

  const url = "https://api.openai.com/v1/images/generations"

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ` + apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(promptData)
  }

  const response = await fetch(url, options);

  const data = await response.json();
  console.log(data);
  return data;
}

generateImage({
  prompt: "Conan Gray"
});

// let answer = prompt("Do you want to know some facts about Conan Gray?: ")

// if(answer === "yes"){
//   console.log("hi")
// }