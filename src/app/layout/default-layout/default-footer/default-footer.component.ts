import { FooterComponent } from '@coreui/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-default-footer',
  standalone: true,
  templateUrl: './default-footer.component.html',
styleUrls: ['./default-footer.component.scss']

})
  
export class DefaultFooterComponent extends FooterComponent {
  constructor() {
    super();
  }
}
