import './style.css';
export default function Home() {
    function clickHandle() {
        window.location.href = '/login'
    }
    return (
        <div className="intro">
            <h1>TaskFlow Manager</h1>
            <p>A Collaborative Task Management Application</p>
            <button className="button-49" onClick={clickHandle} role="button">Continue</button>
        </div>
    )
}