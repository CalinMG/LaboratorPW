function Card(props) {
    return (
        <div>
            <h3>{props.title}</h3>
            <p>{props.description}</p>

            <p>
                Status: {props.done ? 'finalizat' : 'in lucru'}
            </p>

            <button onClick={props.onToggle}>
                schimba status!!
            </button>
        </div>
    );
}

export default Card;