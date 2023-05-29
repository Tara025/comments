import Articel from "../Articel/Articel";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid"; //hier war der import falsch (import uuid from "uuidv4")
import styles from "./Message.module.scss";
import { ImBubble } from "react-icons/im";
import { MdOutlineChatBubble } from "react-icons/md";

function Message() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [messages, setMessages] = useState(() => {
    const storedMessages = window.localStorage.getItem("messages");
    return storedMessages ? JSON.parse(storedMessages) : [];
  });

  //console.log("id"+uudid())

  const nameCheck = (e) => {
    //Wert von Namen ändern
    setName(e.target.value);
  };

  const messageCheck = (e) => {
    //Wert von Kommentar/ message ändern
    setMessage(e.target.value);
  };

  const emailCheck = (e) => {
    //Wert von Email/ message ändern
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.length <= 0 || message.length <= 0 || message.length <= 0) {
      setError("Dein Name und/oder deine Nachricht fehlen oder sind zu kurz.");
      return;
    }

    const emailParts = email.split("@"); //durch .split() => array [tara_jones, web.de] - wenn nicht 2 Teile, dann error
    if (emailParts.length !== 2) {
      setError("Email ist ungültig.");
      return;
    }

    const emailHasSpaces = email.includes(" "); //Leerzeichen Kontrolle

    if (emailHasSpaces) {
      setError("Die E-Mail darf keine Leerzeichen enthalten.");
      return;
    }

    const leftPart = emailParts[0]; // = tara_jones (siehe: email.split("@"))

    // if (leftPart.length < 3) {
    //   setError("Left part of email must contain at least three characters");
    //   return;
    // }

    // all numbers
    const numbers = "01234567890";
    // go through each letter of the left part
    let numbersFound = 0;
    for (let i = 0; i < leftPart.length; i++) {
      // the i-th character of the left email part
      const character = leftPart[i];
      for (let j = 0; j < numbers.length; j++) {
        if (character === numbers[j]) {
          numbersFound++;
          break;
        }
      }
    }

    if (numbersFound === leftPart.length) {
      setError(
        "Left part of email must contain at least one non-numeric character."
      );
      return;
    }

    // name the right part
    const rightPart = emailParts[1]; // web.de

    // no two consecutive dots
    if (rightPart.includes("..")) {
      setError("Right part cannot contain two consecutive dots.");
      return;
    }

    // split the right part of the email into domain-ending and domain
    const rightSubParts = rightPart.split("."); //arrray [web, de]
    const domainEnding = rightSubParts[rightSubParts.length - 1]; // -1 bedeutet letztes Element im array => hier die DomainEndung
    const allowedDomains = ["de", "com", "net", "org"];
    if (!allowedDomains.includes(domainEnding)) {
      setError("Domain Endung ist nicht erlaubt.");
      return;
    }

    // check if the domain name part is at least 3 characters (1 for the dot)
    if (rightPart.length - domainEnding.length - 1 < 3) {
      setError("Domain name is too short.");
      return;
    }

    // check if the message length is between 10 and 160 characters
    if (!(message.length > 10 && message.length < 160)) {
      setError("Die Nachricht muss zwischen 10 und 160 Zeichen lang sein!");
      return;
    }

    const currentTime = new Date().toLocaleString("de-DE", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // (Date.UTC(year, monthIndex, day, hour, minute)) => hat nicht funktioniert

    const newMessage = {
      _id: uuid(),
      // crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: currentTime,
      // .toUTCString(),
    };

    setMessages([...messages, newMessage]); //altes array mit Daten + neuer Name und Message

    setName("");
    setMessage("");
    setEmail("");

    setError("");
  };

  const handleDelete = (index) => {
    //index = "234hjdf9324df"
    //const updatedMessages = [...messages];
    //updatedMessages.splice(index, 1);
    const updatedMessages = messages.filter((message) => message._id !== index);
    setMessages(updatedMessages);
  };

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  return (
    <div className={styles.contactForm}>
      <h2>
        <span>
          <ImBubble />
        </span>
        &nbsp;Teile deine Meinung zu diesem Artikel!
      </h2>
      <Articel/>
      <div className={styles.messageList}>
        <h2>
          <span>
            <MdOutlineChatBubble />
          </span>
          &nbsp;
          {messages.length}&nbsp;
          {messages.length !== 1 ? (
            <span>Kommentare </span>
          ) : (
            <span>Kommentar</span>
          )}
        </h2>
      </div>

      <form className={styles.message} onSubmit={handleSubmit}>
        <h3>Schreibe bitte deinen Kommentar</h3>
        <h5>
          Deine E-Mailadresse wird nicht öffentlich angezeigt. Erforderliche
          Felder sind mit * markiert.
        </h5>
        <label>Name *</label>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={nameCheck}
        />
        <label>Email *</label>
        <input
          type="text"
          value={email}
          placeholder="Mail"
          onChange={emailCheck}
        />

        <label>Kommentar</label>
        <textarea
          value={message}
          placeholder="...deine Nachricht bitte"
          onChange={messageCheck}
        ></textarea>
        <p>{error}</p>
        <button type="submit">Kommentar senden</button>
        {/* <input type="submit" value="Kommentarbutton" /> */}

        {messages.map((msg, index) => (
          <div className={styles.Ausgabe} key={msg._id}>
            <h4>{msg.name}</h4>
            <h6>{msg.createdAt}</h6>
            {/* <h5>{msg.email}</h5> */}
            <p>{msg.message}</p>
            <button onClick={() => handleDelete(msg._id)}>Delete</button>
          </div>
        ))}
      </form>
    </div>
  );
}
export default Message;
