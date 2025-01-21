import styles from '../../styles/hamburger.module.css'

interface HamburgerProps {
  collapsed: boolean
  setCollapsed: () => void
}

const Hamburger = ({collapsed, setCollapsed}: HamburgerProps) => {
  return (
    <>
      <input 
        id='checkbox'
        type="checkbox"
        className={styles.inputCheck}
        checked={collapsed}
        onChange={setCollapsed}
      />
      <label className={styles.toggle} htmlFor="checkbox">
          <div id="bar1" className={`${styles.bars} ${styles.bar1}`}></div>
          <div id="bar2" className={`${styles.bars} ${styles.bar2}`}></div>
          <div id="bar3" className={styles.bars}></div>
      </label>
    </>
  )
}

export default Hamburger;