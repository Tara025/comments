import styles from './Articel.module.scss';
import Einfachs from "../../images/Einfachs.jpg";

function Articel() {
  return (
    <div className={styles.articel}>
      <h4>Brauerei Püttner aus Schlammersdorf!</h4>
      <h5>Einfachs/Hell</h5>
        
        <img src={Einfachs} alt="beer" />
    </div>
  )
}

export default Articel