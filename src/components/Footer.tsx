import heartIcon from '../assets/images/heart.svg'

export function Footer() {
  return (
    <footer className="footer">
      <span className="footer__text">
        Made with
        <img className="footer__icon" src={heartIcon} alt="love" />
        by
        <a className="footer__link" href="https://binary-studio.com/">
          Binary Studio
        </a>
      </span>
    </footer>
  )
}
