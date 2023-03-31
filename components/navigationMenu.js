import Link from 'next/link';

function NavigationMenu() {
  return (
    <nav className="navigation-menu">
      <ul className="navigation-menu__list">
        <li className="navigation-menu__item">
          <Link legacyBehavior href="/">
            <a className="navigation-menu__link">Home</a>
          </Link>
        </li>
        <li className="navigation-menu__item">
          <Link legacyBehavior href="/about">
            <a className="navigation-menu__link">About</a>
          </Link>
        </li>
        <li className="navigation-menu__item">
          <Link legacyBehavior href="/contact">
            <a className="navigation-menu__link">Contact</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;