import "./App.css";
import { useStore } from "effector-react";
import { Operation } from "./Operations/interfaces/Operations";
import { OperationsView } from "./Operations/";
import { operationsStore, updateOrAddOperation } from "./Operations/store";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000", { transports: ["websocket"] });
const listener = (o: string) => {
  updateOrAddOperation(JSON.parse(o) as Operation);
};

socket.on("updatedOperation", listener);

function App() {
  const operations: Operation[] = useStore(operationsStore);

  return <OperationsView operations={operations} />;
}

export default App;
