import { useState, useEffect } from "react";
import styles from "./Message.module.css";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function Message() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useLocalStorage("messages", []);

  const nameCheck = (e) => {
    //Wert von Namen ändern
    setName(e.target.value);
  };

  const messageCheck = (e) => {
    //Wert von Kommentar/ message ändern
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!(name.length > 0 && message.length > 0)) {
      alert("Name, email and message cannot be empty");
      return;
    }

    const newMessage = {
      name: name,
      message: message,
    };

    setMessages([...messages, newMessage]); //altes array mit Daten + neuer Name und Message

    setName("");
    setMessage("");
  };

  //   useEffect(() => {
  //     localStorage.setItem("messages", JSON.stringify(messages));
  //   }, [messages]);

  //   useEffect(() => {
  //     const storedMessages = localStorage.getItem("messages");
  //     if (storedMessages) {
  //       setMessages(JSON.parse(storedMessages));
  //     }
  //   }, []);

  return (
    <div className="contact-form">
      <div className={styles.messageList}>
        <h2>{messages.length} Kommentare</h2>

        {messages.map((msg, index) => (
          <div key={index}>
            <h3>Name: {msg.name}</h3>
            <p>Kommentar: {msg.message}</p>
          </div>
        ))}
      </div>

      <form className={styles.message} onSubmit={handleSubmit}>
        <h3>Schreibe bitte einen Kommentar</h3>
        <label>Name *</label>
        <input type="text" value={name} onChange={nameCheck} />
        <label>Kommentar</label>
        <textarea value={message} onChange={messageCheck}></textarea>
        <button type="submit">Kommentar abschicken</button>
      </form>
    </div>
  );
}
export default Message;
