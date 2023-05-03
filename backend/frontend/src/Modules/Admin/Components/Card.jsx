import '../styles/Main.css';

function Card(props) {
    return (
        <div class="card">
            <div className='card-header'>
            {props.children}
            <h2>{props.text}</h2>            <h1>40</h1>
            </div>
        </div>
    );
}

export default Card;