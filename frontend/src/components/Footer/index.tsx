// Styles
import './index.scss';

function Footer() {
  return (
    <footer className="page-footer">
      <p>
        Esta aplicação foi desenvolvida exclusivamente para o teste técnico da Shopper.com.br e
        nenhuma utilização comercial da marca é realizada.
      </p>
      <p>
        Desenvolvido por{' '}
        <a href="https://github.com/jfzini" target="_blank" rel="noreferrer">
          João Felipe Zini
        </a>{' '}
        com React, TypeScript, Node, Express, MySQL, Prisma e Docker.
      </p>
    </footer>
  );
}

export default Footer;
