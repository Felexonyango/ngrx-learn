
import { DOCUMENT, Location, ViewportScroller } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

// import * as fileSaver from "file-saver";
// import * as XLSX from "xlsx";
import { Title } from "@angular/platform-browser";
import { projectConstants } from "src/app/project-constants/project.constants";

const EXCEL_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";
@Injectable({
    providedIn: "root",
})
export class UtilService {
    constructor(
        private router: Router,
        private location: Location,
        private titleService: Title,
        @Inject(DOCUMENT) private _document: Document,
        private viewportScroller: ViewportScroller
    ) {}

    storeCurrency: string;
    tableToPrint: {
        tableName: string;
        tableData: any[];
        tableColumns: any[];
    };
    userTheme: boolean;
    doesURLHaveText(text: string): boolean {
        const activeRoute = this.router.url?.toUpperCase();
        return activeRoute.includes(text?.toUpperCase()) ? true : false;
    }

    goBack(): void {
        this.location.back();
    }

    public exportAsExcelFile(json: any[], excelFileName: string): void {
        // const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        // const workbook: XLSX.WorkBook = {
        //     Sheets: { data: worksheet },
        //     SheetNames: ["data"],
        // };
        // const excelBuffer: any = XLSX.write(workbook, {
        //     bookType: "xlsx",
        //     type: "array",
        // });
        // this.saveAsExcelFile(excelBuffer, excelFileName);
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        // const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
        // fileSaver.saveAs(
        //     data,
        //     fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        // );
    }
    setDocTitle(title: string): void {
        this.titleService.setTitle(title);
    }

    setDocFavicon(): void {
        const faviconId = "appFavicon";
        const faviconDefaultPath = "assets/img/brand";
        const favicon = projectConstants
        this._document
            .getElementById(faviconId)
            .setAttribute("href", `${faviconDefaultPath}/${favicon}`);
    }

    setTableToPrint(
        tableName: string,
        tableData: any[],
        tableColumns: any[]
    ): void {
        this.tableToPrint = {
            tableName,
            tableData,
            tableColumns,
        };
        this.router.navigate(["/app/shared/print"]);
    }

    onClickScroll(elementId: string): void {
        this.viewportScroller.scrollToAnchor(elementId);
    }
    createInitials(name): string {
        let initials = "";
        name = name.toUpperCase();
        if (name) {
            for (let i = 0; i < name.length; i++) {
                if (name.charAt(i) === " ") {
                    continue;
                }
                if (name.charAt(i) === name.charAt(i).toUpperCase()) {
                    initials += name.charAt(i);

                    if (initials.length == 2) {
                        break;
                    }
                }
            }
        }
        return initials;
    }

    detectBrowserName(): string {
        const agent = window.navigator.userAgent.toLowerCase();
        switch (true) {
            case agent.indexOf("edge") > -1:
                return "edge";
            case agent.indexOf("opr") > -1 && !!(<any>window).opr:
                return "opera";
            case agent.indexOf("chrome") > -1 && !!(<any>window).chrome:
                return "chrome";
            case agent.indexOf("trident") > -1:
                return "ie";
            case agent.indexOf("firefox") > -1:
                return "firefox";
            case agent.indexOf("safari") > -1:
                return "safari";
            default:
                return "other";
        }
    }

    detectBrowserVersion(): string {
        var userAgent = navigator.userAgent,
            tem,
            matchTest =
                userAgent.match(
                    /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
                ) || [];

        if (/trident/i.test(matchTest[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
            return "IE " + (tem[1] || "");
        }
        if (matchTest[1] === "Chrome") {
            tem = userAgent.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null)
                return tem.slice(1).join(" ").replace("OPR", "Opera");
        }
        matchTest = matchTest[2]
            ? [matchTest[1], matchTest[2]]
            : [navigator.appName, navigator.appVersion, "-?"];
        if ((tem = userAgent.match(/version\/(\d+)/i)) != null)
            matchTest.splice(1, 1, tem[1]);
        return matchTest.join(" ");
    }
    profilePictureInitials(first:any, last:any){
        let initials = ""
        console.log(first)
        const firstNameFirstLetter= first.split("")[0].toString().toUpperCase()
        const lastNameFirstLetter = last.split("")[0].toString().toUpperCase()
        initials = firstNameFirstLetter.concat(lastNameFirstLetter)
        return initials
    
       
      }
}
