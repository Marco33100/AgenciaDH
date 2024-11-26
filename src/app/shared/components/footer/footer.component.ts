import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  isChatbotVisible: boolean = false; 

  toggleChatbot(): void {
    this.isChatbotVisible = !this.isChatbotVisible; 
  }
}
