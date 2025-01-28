import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
  export class InactividadService {
    private timeoutDuration = 60000; // 1 minuto en milisegundos
    private timeout: any;
    private listenersInitialized = false; // Bandera para evitar acumulación de listeners
  
    constructor(private router: Router) {}
  
    // Inicia el monitoreo de inactividad
    startMonitoring(): void {
      this.resetTimer();
      if (!this.listenersInitialized) {
        this.initializeInactivityListeners();
        this.listenersInitialized = true;
      }
    }
  
    // Reinicia el temporizador de inactividad
    private resetTimer(): void {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => this.logoutUser(), this.timeoutDuration);
    }
  
    // Configura los eventos que reinician el temporizador
    private initializeInactivityListeners(): void {
      const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
      events.forEach(event => {
        window.addEventListener(event, () => this.resetTimer());
      });
    }
  
    // Lógica para cerrar sesión automáticamente
    private logoutUser(): void {
      localStorage.clear(); // Limpia el almacenamiento local
      this.router.navigate(['/login']); // Redirige al login
    }
  }
  