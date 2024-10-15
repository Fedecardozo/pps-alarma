import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { Motion } from '@capacitor/motion';
import { CapacitorFlash } from '@capgo/capacitor-flash';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { UsersService } from '../service/user.service';
import { Alert } from '../models/alert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonFabButton,
    IonFab,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  ],
})
export class HomePage {
  user: UsersService = inject(UsersService);
  activar: boolean;
  textAnterior: string = '';
  textActual: string = 'inicio';
  horizonal: boolean = true;
  sonidoActual: HTMLAudioElement | null = null;
  router: Router = inject(Router);
  constructor() {
    this.activar = true;
  }

  async ngOnInit() {
    // await ScreenOrientation.lock({ orientation: 'landscape' });
  }

  activarDesactivar() {
    this.activar = !this.activar;
    if (!this.activar) {
      this.startMotionTracking();
    } else {
      Alert.password().then((res) => {
        if (res.isConfirmed) {
          if (res.value === this.user.clave) {
            this.desactivar();
          } else {
            this.activar = !this.activar;
            this.final();
          }
        }
      });
    }
  }

  startMotionTracking() {
    Motion.addListener('accel', (event) => {
      const { x, y, z } = event.accelerationIncludingGravity;

      // Detectar si el dispositivo se inclina a la izquierda o derecha
      if (x > 5) {
        this.reproducir('derecha');
        this.horizonal = false;
      } else if (x < -5) {
        this.reproducir('izquierda');
        this.horizonal = false;
      }

      // Detectar si está en posición vertical
      if (Math.abs(y) > 7 && Math.abs(x) < 3) {
        this.turnOnFlashAndSound();
        this.horizonal = false;
      }

      // Detectar si vuelve a la posición horizontal
      if (!this.horizonal && Math.abs(z) > 8 && Math.abs(y) < 2) {
        this.vibrateAndSound();
      }
    });
  }

  reproducir(newText: string) {
    this.textAnterior = this.textActual;
    this.textActual = newText;

    if (this.horizonal || this.textAnterior !== this.textActual) {
      if (this.sonidoActual) this.sonidoActual.pause();
      this.playSound(newText);
    }
  }

  // Función para reproducir sonido
  playSound(direction: string) {
    const sonido = new Audio(`assets/sounds/${direction}.mp3`);
    this.sonidoActual = sonido;
    this.sonidoActual.play();
  }

  // Encender la linterna y reproducir un sonido
  async turnOnFlashAndSound() {
    await CapacitorFlash.switchOn({ intensity: 100 });
    this.reproducir('vertical');
    // Apagar el flash después de 5 segundos
    setTimeout(async () => {
      await CapacitorFlash.switchOff();
    }, 5000);
  }

  // Encender la linterna y reproducir un sonido
  async final() {
    await CapacitorFlash.switchOn({ intensity: 100 });
    this.reproducir('final');
    Haptics.vibrate({ duration: 5000 });
    // Apagar el flash después de 5 segundos
    setTimeout(async () => {
      this.sonidoActual?.pause();
      await CapacitorFlash.switchOff();
    }, 5000);
  }

  // Vibrar y reproducir un sonido por 5 segundos
  vibrateAndSound() {
    Haptics.vibrate();
    this.reproducir('horizontal');
  }

  async desactivar() {
    if (this.sonidoActual) this.sonidoActual.pause();
    await Motion.removeAllListeners();
    await CapacitorFlash.switchOff();
  }

  async cerrarSesion() {
    await this.user.cerrarSesion();
    this.router.navigateByUrl('/login');
  }
}
