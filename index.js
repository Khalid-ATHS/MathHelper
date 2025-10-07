const sendBtn = document.getElementById("send-btn");
const input = document.getElementById("message-input");
const chatBox = document.getElementById("chat-box");

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender.toLowerCase());
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  addMessage("You", message);
  input.value = "";

  // Bot reply after short delay
  setTimeout(() => {
    addMessage("Bot", "hi");
  }, 300);
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
