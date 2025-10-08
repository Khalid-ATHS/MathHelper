const sendBtn = document.getElementById("send-btn");
const input = document.getElementById("message-input");
const chatBox = document.getElementById("chat-box");

const API_KEY = "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";

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender.toLowerCase());
  msg.innerText = text;
  chatBox.appendChild(msg);

  if (sender === "Bot") {
    const copyBtn = document.createElement("button");
    copyBtn.classList.add("copy-btn");
    copyBtn.innerText = "C";
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(text);
    });
    chatBox.appendChild(copyBtn);
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  addMessage("You", message);
  input.value = "";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are MathHelper. Only give hints or guiding steps for math problems. Do NOT give the final answer. If the question is not about math, politely refuse."
          },
          { role: "user", content: message }
        ],
        max_tokens: 150,
        temperature: 0.6
      })
    });

    const data = await response.json();
    const botReply = data.choices[0].message.content;
    addMessage("Bot", botReply);
  } catch (err) {
    addMessage("Bot", "Error: Unable to connect to AI.");
  }
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
