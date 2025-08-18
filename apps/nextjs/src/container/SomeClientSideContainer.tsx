import {useState} from "react";

export default function SomeClientSideContainer() {
    const [state, setState] = useState(0);

    return (
        <div>
            <button onClick={()=>setState(prev => prev+1)}>Click</button>
            <p>Clicked: {state}</p>
        </div>
    )
}
