import { useRef, createRef } from "react";
import Basic from "./Basic";
import "./App.css";

function App() {
    const inputsRef = useRef([]);
    const inputNames = ["email", "message", "happinessLevel"];
    inputNames.forEach((elem) => {
        const newRef = createRef(elem);
        inputsRef.current.push(newRef);
    });
    return (
        <div className="App">
            <header className="App-header"></header>
            <div className="bg-slate-600 h-screen flex justify-center items-center">{Basic(inputsRef)}</div>
        </div>
    );
}

export default App;
