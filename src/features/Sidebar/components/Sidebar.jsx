import logo from '../../../assets/images/logo.png';
import navItems from '../data/navItems';
import Navlink from './Navlink';
import classes from './Sidebar.module.css';
export default function Sidebar() {
  return (
    <aside className={classes.sidebar}>
      <div className={classes.header}>
        <a href='#home' className='logo'>
          <img src={logo} alt='Logo' />
        </a>
        <p className={classes.name}>Md Saif Ullah</p>
      </div>

      <nav className={classes.navmenu}>
        <ul>
          {navItems.map(({ link, text, icon }) => (
            <Navlink key={link} link={link} text={text} icon={icon} />
          ))}
        </ul>
      </nav>

      <div className={classes.footer}>
        <a href='#' className={classes.resume}>
          <i className='fa-solid fa-file-arrow-down'></i>

          <span className={classes.tooltip}>Download resume</span>
        </a>
      </div>
    </aside>
  );
}
