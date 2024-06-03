// chat/static/chat/chat.js
window.onload = function() {
    var messageInput = document.getElementById("message");
    var messagesList = document.getElementById("messages");
    var submitButton = document.getElementById("submit");

    const db = getDatabase();

    // Retrieve new messages as they come in
    onValue(ref(db, 'messages'), (snapshot) => {
        messagesList.innerHTML = "";
        snapshot.forEach((childSnapshot) => {
            var message = childSnapshot.val().text;
            var li = document.createElement("li");
            li.textContent = message;
            messagesList.appendChild(li);
        });
    });

    // Add new message to the database
    submitButton.addEventListener("click", () => {
        var message = messageInput.value;
        if (message) {
            const newMessageRef = push(ref(db, 'messages'));
            set(newMessageRef, {
                text: message
            });
            messageInput.value = "";
        }
    });
};
