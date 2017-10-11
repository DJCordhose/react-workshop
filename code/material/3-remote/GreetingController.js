import React from "react";

import GreetingMaster from "./GreetingMaster";
import GreetingDetail from "./GreetingDetail";

const BACKEND_URL = "http://localhost:7000/greetings";
const MODE_MASTER = "MODE_MASTER";
const MODE_DETAIL = "MODE_DETAIL";

export default class GreetingController extends React.Component {
  render() {
    const { mode, greetings } = this.state;
    return (
      <div>
        {mode === MODE_MASTER ? (
          <GreetingMaster greetings={greetings} onAdd={() => this.setState({ mode: MODE_DETAIL })} />
        ) : (
          <GreetingDetail onSave={greeting => this.saveGreeting(greeting)} />
        )}
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      greetings: [],
      mode: MODE_MASTER
    };
  }

  componentDidMount() {
    this.loadGreetings();
  }

  loadGreetings() {
    return (
      fetch(BACKEND_URL)
        /* TODO:

            1. Hole das JSON-Objekt aus der Server-Response
            2. Das JSON Objekt entspricht unserem Greetings-Array. Setze den State damit neu
             */
        .catch(err => console.error("LOADING GREETINGS FAILED:", err))
    );
  }

  saveGreeting(greetingToBeAdded) {
    fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(greetingToBeAdded)
    })
      .then(response => {
        /* TODO: Liefer das JSON-Objekt aus der Antwort zurück

            (Optional: Wenn das Status Code NICHT 201 ist, wirf einen Error
             */
      })
      .then(json => {
        /* TODO: Das JSON-Objekt, das wir vom Server erhalten haben
               enthält als einziges das Property 'id', das die vom Server
               vergebenen Id für unser neues Greeting darstellt.

               1. Baue ein neues Greeting-Objekt mit den Daten aus
               greetingToBeAdded und der Id aus dem JSON-Objekt

               2. Erzeuge eine neue Greetings-Liste mit den bisherigen
               Greetings und dem neuen Greeting, dass Du in Schritt 2
               erzeugt hast

               3. Setze die erzeugte Greetings-Liste als neuen State
             */
      });
  }
}
