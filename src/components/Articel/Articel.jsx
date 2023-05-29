import styles from './Articel.module.scss';
import Einfachs from "../../images/Einfachs.jpg";

function Articel() {
  return (
    <div className={styles.articel}>
        
        <img src={Einfachs} alt="beer" />
    </div>
  )
}

export default Articel