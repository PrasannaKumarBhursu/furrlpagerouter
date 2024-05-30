import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>

      <div className={styles.navbarIcons}>
        <Link href="https://github.com/PrasannaKumarBhursu/furrlpagerouter.git" legacyBehavior >
          <a className={styles.icon} target="_blank" rel="noopener noreferrer"><Image src="/images/github.svg" height={25} width={25} alt="share_icon" title='Github'/></a>

        </Link>
        <Link href="https://drive.google.com/file/d/1YMJ_z8lL0fDEaEm7iUmQTCHoXmghu-nu/view?usp=sharing" legacyBehavior>
          <a className={styles.icon} target="_blank" rel="noopener noreferrer"><Image src="/images/video-solid.svg" height={25} width={25} alt="share_icon" title='Code Explaining video'/></a>
        </Link>
      </div>

      <div className={styles.navbarContainer}>
        <div className={styles.navbarLogo}>Furrl</div>
        <div className={styles.navbarIcons}>
          <Link href="https://furrl.in/wishlist" legacyBehavior>
            <a className={styles.icon} target="_blank" rel="noopener noreferrer"><Image src="/images/bookmark-regular.svg" height={30} width={30} alt="share_icon" /></a>

          </Link>
          <Link href="https://furrl.in/cart" legacyBehavior>
            <a className={styles.icon} target="_blank" rel="noopener noreferrer"><Image src="/images/bag-shopping-solid.svg" height={30} width={30} alt="share_icon" /></a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
