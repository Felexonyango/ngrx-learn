import {Component} from '@angular/core';
import { AppBreadcrumbService } from 'src/app/primeng-atlantis-theme/atlantis-utils/app.breadcrumb.service';

@Component({
    templateUrl: './documentation.component.html',
    styles: [`
        :host ::ng-deep .language-css .token.string {
            background: var(--surface-50);
            color: var(--text-white);
        }
        :host ::ng-deep.token.operator {
            background: var(--surface-50);
            color: var(--text-white);
        }
    `]
})
export class DocumentationComponent {

    constructor(private breadcrumbService: AppBreadcrumbService) {
        this.breadcrumbService.setItems([
            { label: 'Start' },
            { label: 'Documentation', routerLink: ['/documentation'] }
        ]);
    }
}
