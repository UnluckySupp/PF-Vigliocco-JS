function crearFooter() {
  let footer = document.querySelector("footer");
  footer.innerHTML = `
    <div>
    <h4>Seguínos en nuestras redes</h4>
    <ul>
      <li><a href="https://www.facebook.com" target="_blank">Facebook</a></li>
      <li><a href="https://www.instagram.com" target="_blank">Instagram</a></li>
      <li><a href="https://www.twitter.com" target="_blank">Twitter</a></li>
    </ul>
  </div>
  <div>
    <h4>Contacto</h4>
    <ul>
      <li>Calle Falsa 123 - Narnia</li>
      <li>Tel: 1234 567-890</li>
      <li><a href="#">Atención al cliente</a></li>
    </ul>
  </div>
    `;
  document.body.appendChild(footer);
}

crearFooter();
