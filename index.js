const sendBtn = document.getElementById("send-btn");
const input = document.getElementById("message-input");
const chatBox = document.getElementById("chat-box");

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender.toLowerCase());
  msg.innerText = sender + ": " + text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", () => {
  const message = input.value.trim();
  if (message === "") return;

  // Show user's message
  addMessage("You", message);

  // Clear input
  input.value = "";

  // Auto-reply "hi" after a short delay
  setTimeout(() => {
    addMessage("Bot", "hi");
  }, 300);
});

// Allow pressing Enter to send
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});
