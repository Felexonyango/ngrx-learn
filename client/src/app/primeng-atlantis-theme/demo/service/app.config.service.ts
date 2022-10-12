import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppConfig } from '../domain/appconfig';

@Injectable()
export class ConfigService {

    config: AppConfig = {
        theme: '',
        dark: true,
        inputStyle: '',
        ripple: true
    };

    private configUpdate = new Subject<AppConfig>();

    configUpdate$ = this.configUpdate.asObservable();

    changeColorScheme(scheme): void{
        this.changeStyleSheetsColor('layout-css', 'layout-' + scheme + '.css', 1);
        this.changeStyleSheetsColor('theme-css', 'theme-' + scheme + '.css', 1);
    }
    changeStyleSheetsColor(id, value, from) {
        const element = document.getElementById(id);
        const urlTokens = element.getAttribute('href').split('/');

        localStorage.setItem('currentTheme', value);
        if (from === 1) {
            urlTokens[urlTokens.length - 1] = value;
        } else if (from === 2) {
            urlTokens[urlTokens.length - 2] = value;
        }
        const newURL = urlTokens.join('/');
        this.replaceLink(element, newURL);
    }
    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    }
    replaceLink(linkElement, href) {
        if (this.isIE()) {
            linkElement.setAttribute('href', href);
        } else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);
            });
        }
    }
    updateConfig(config: AppConfig) {
        this.config = config;
        this.configUpdate.next(config);
    }

    getConfig() {
       return this.config;
    }
}
