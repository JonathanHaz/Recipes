import { Typography } from "@mui/material";
import { useEffect, useState } from "react"
import './searchDisplay.css'

export default function Sdisplay(props) {
    const [results, setResults] = useState([]);

    useEffect(() => {
        setResults(props.data);
    }, [props.data]);

    return (
        <section id="searchResultsDisplayWrapper">
            {results.map((recipe, index) => (
                <div className="resultContainer" key={index}>
                    <Typography className="resultName" variant='h4'>{recipe.name}</Typography>
                    <Typography className="resultDesc" variant='subtitle1'>{recipe.desc}</Typography>

                </div>
            ))}
        </section>
    );
}
