import React, { useState, useEffect } from 'react';

function App() {

    const [isCompatible, setIsCompatible] = useState();

    useEffect(() => {
        function checkIfCompaitbleWithWebSocket () {
            let compatible = window.WebSocket;
            if(compatible) return true;
            return false
        }

        let isCompatible = checkIfCompaitbleWithWebSocket();
        setIsCompatible(isCompatible);
    }, []);

    if (!isCompatible) {
        return (<h2>Your browser does not support WebSocket.</h2>);
    };

    return (
        <div className="App">
           Hello, world
        </div>
    );
}

export default App;
