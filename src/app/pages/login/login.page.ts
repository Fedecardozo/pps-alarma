import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonButton,
  IonInput,
  IonAlert,
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from 'src/app/service/user.service';
import { Alert } from 'src/app/models/alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonAlert,
    IonInput,
    IonButton,
    IonLabel,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
  ],
})
export class LoginPage implements OnInit {
  private userService: UsersService = inject(UsersService);
  private router = inject(Router);
  public fb: FormBuilder = inject(FormBuilder);
  public fg: FormGroup;
  usuarios: Object[] = [
    { correo: 'fede@gmail.com', password: '123456' },
    { correo: 'luna@gmail.com', password: '123456' },
    { correo: 'clari@gmail.com', password: '123456' },
  ];

  constructor() {
    this.fg = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.userService.correo !== null) {
      this.router.navigateByUrl('/home');
    }
  }

  acceder() {
    if (this.fg.valid) {
      this.userService
        .login(
          this.fg.controls['correo'].value,
          this.fg.controls['clave'].value
        )
        .then(() => {
          this.router.navigateByUrl('/home');
        })
        .catch(() => {
          //Muestro un alert de que no esta registrado
          Alert.error(
            'No se encuentra registrado',
            'Verifique correo y contraseña ingresadas'
          );
        })
        .finally(() => {
          this.fg.reset();
        });
    }
  }

  cargaUsuario(user: any) {
    this.fg.setValue({
      correo: user.correo,
      clave: user.password,
    });
  }
}
