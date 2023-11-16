import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet, Router, RoutesRecognized} from '@angular/router';
import {MainToolbarComponent} from "./Components/mainToolbar/main-toolbar.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {LoadingService} from "./Services/loadingService/loading.service";
@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, MainToolbarComponent, MatProgressSpinnerModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ChallengeFrontend';
  url: string = '';

  constructor(router: Router, public loadingService: LoadingService) {
    router.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        this.url = event.url.substring(1);
      }
    })
  }
}
