import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  submitForm() {
    // Lógica de envío del formulario
    // Puedes usar servicios HTTP de Angular para enviar datos al servidor, por ejemplo:
    // this.http.post('tu_url_de_envio', this.myForm.value).subscribe(response => {
    //   // Manejar la respuesta del servidor
    // });
  }
}
