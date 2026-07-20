import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, TranslateModule, MatIcon],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @Input() fixed = false;
}