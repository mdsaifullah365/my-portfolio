import { useEffect, useRef } from 'react';
import logo from '../../../assets/images/logo.png';
import classes from './Topbar.module.css';

export default function Topbar() {
  const topbarRef = useRef(null);
  const darkModePopupRef = useRef(null);
  const darkModeSliderIconRef = useRef(null);
  const sliderRef = useRef(null);
  const circleRef = useRef(null);

  const refreshDarkModeBtn = () => {
    const darkMode = JSON.parse(localStorage.getItem('darkMode'));

    if (darkMode) {
      sliderRef.current.style.backgroundColor = 'var(--secondary-color)';
      circleRef.current.style.transform = 'translateX(20px)';
    } else {
      sliderRef.current.style.backgroundColor = '#ccc';
      circleRef.current.style.transform = 'translateX(0)';
    }
    // darkMode || darkModeSliderIconRef.current.classList.remove('on');
  };

  const toggleDarkModePopup = (event) => {
    refreshDarkModeBtn();

    if (darkModePopupRef.current.style.display === 'block') {
      darkModePopupRef.current.style.display = 'none';
    } else {
      darkModePopupRef.current.style.display = 'block';
    }

    event.stopPropagation();
  };

  const toggleDarkMode = () => {
    const darkMode = JSON.parse(localStorage.getItem('darkMode'));

    console.log(darkMode);

    darkMode && localStorage.setItem('darkMode', false);
    darkMode || localStorage.setItem('darkMode', true);

    refreshDarkModeBtn();
  };

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    function toggleTopbar() {
      const currentScrollPos = window.scrollY;

      if (prevScrollPos > currentScrollPos) {
        topbarRef.current.style.transform = 'translateY(0)';
      } else {
        topbarRef.current.style.transform = 'translateY(-100%)';
      }

      prevScrollPos = currentScrollPos;
    }

    function hideDarkModePopup() {
      darkModePopupRef.current.style.display = 'none';
    }

    window.addEventListener('scroll', toggleTopbar);

    document.body.addEventListener('click', hideDarkModePopup);

    return () => window.removeEventListener('scroll', toggleTopbar);
  }, []);

  return (
    <header ref={topbarRef} className={classes.topbar}>
      <div className={`container ${classes.container}`}>
        <div className={classes.left}>
          <div className={classes.hamburger}>
            <div className={classes.bar}></div>
            <div className={classes.bar}></div>
            <div className={classes.bar}></div>
          </div>

          <a href='#home' className='logo'>
            <img src={logo} alt='Logo' />
          </a>
        </div>

        <div className={classes.right}>
          <button>
            <i className='fa-solid fa-address-book'></i>
          </button>

          <button>
            <i className='fa-solid fa-file-arrow-down'></i>
          </button>

          <button
            className={classes['btn-dark-mode']}
            onClick={toggleDarkModePopup}>
            <i className='fa-solid fa-circle-half-stroke'></i>

            <p className={classes.dropdown}>
              <i className='fa-solid fa-chevron-down'></i>
            </p>
          </button>
        </div>

        <div
          ref={darkModePopupRef}
          className={classes['dark-mode-popup']}
          onClick={(e) => e.stopPropagation()}>
          <p className={classes['popup-title']}>
            <span>Switch Appearance</span>

            <label>
              <i className='fa-solid fa-circle-half-stroke'></i>
            </label>
          </p>

          <div className={classes['popup-option']} onClick={toggleDarkMode}>
            <span>Dark Mode</span>

            <label
              ref={darkModeSliderIconRef}
              className={classes['toggle-dark-mode']}>
              <span ref={sliderRef} className={classes.slider}></span>
              <span ref={circleRef} className={classes.circle}></span>
            </label>
          </div>
        </div>
      </div>
    </header>
  );
}
