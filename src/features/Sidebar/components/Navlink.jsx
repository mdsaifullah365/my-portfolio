/* eslint-disable react/prop-types */
export default function Navlink({ link, text, icon }) {
  return (
    <li>
      <a href={link}>
        <i className={icon}></i>
        <span>{text}</span>
      </a>
    </li>
  );
}
