import styles from "./keyboard.module.css"
// Icons
import returnIcon from "../../../assets/icon/returnIcon.svg";
import checkIcon from "../../../assets/icon/checkIcon.svg";



export default function Pinboard() {

    return (
        <div className={styles.container}>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
            <button>6</button>
            <button>7</button>
            <button>8</button>
            <button>9</button>
            <button><img src={returnIcon} alt="return-icon" /></button>
            <button>0</button>
            <button><img src={checkIcon} alt="check-Icon" /></button>
        </div>
    )
}