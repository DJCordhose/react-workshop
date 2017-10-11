import * as React from "react";
import { Greeting } from "./types";

interface GreetingMasterProps {
  /**
     * Array of greetings to display
     */
  greetings: Greeting[];
  onAdd: () => void;
}

// const GreetingMaster: React.SFC<GreetingMasterProps> = props => {
// or
/**
 * Master View.
 * 
 * @param props 
 */
const GreetingMaster = (props: GreetingMasterProps) => {
  const { greetings, onAdd } = props;
  const body = greetings.map(greeting => (
    <tr key={greeting.id}>
      <td>{greeting.name}</td>
      <td>{greeting.greeting}</td>
    </tr>
  ));
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Greeting</th>
          </tr>
        </thead>
        <tbody>{body}</tbody>
      </table>
      <button onClick={onAdd}>Add</button>
    </div>
  );
};

export default GreetingMaster;
