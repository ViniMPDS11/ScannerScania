export default function Button(props) {
    return (
        <button className={props.class}>{props.name}</button>
    );
}