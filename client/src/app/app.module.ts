import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { AppRoutingModule } from "./app-routing.module";
import { AccordionModule } from "primeng/accordion";
import { AutoCompleteModule } from "primeng/autocomplete";
import { AvatarModule } from "primeng/avatar";
import { AvatarGroupModule } from "primeng/avatargroup";
import { BadgeModule } from "primeng/badge";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { CardModule } from "primeng/card";
import { CarouselModule } from "primeng/carousel";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { ChartModule } from "primeng/chart";
import { CheckboxModule } from "primeng/checkbox";
import { ChipModule } from "primeng/chip";
import { ChipsModule } from "primeng/chips";
import { CodeHighlighterModule } from "primeng/codehighlighter";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ColorPickerModule } from "primeng/colorpicker";
import { ContextMenuModule } from "primeng/contextmenu";
import { DataViewModule } from "primeng/dataview";
import { DialogModule } from "primeng/dialog";
import { DividerModule } from "primeng/divider";
import { DropdownModule } from "primeng/dropdown";
import { FieldsetModule } from "primeng/fieldset";
import { FileUploadModule } from "primeng/fileupload";
import { FullCalendarModule } from "@fullcalendar/angular";
import { GalleriaModule } from "primeng/galleria";
import { ImageModule } from "primeng/image";
import { InplaceModule } from "primeng/inplace";
import { InputNumberModule } from "primeng/inputnumber";
import { InputMaskModule } from "primeng/inputmask";
import { InputSwitchModule } from "primeng/inputswitch";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { KnobModule } from "primeng/knob";
import { LightboxModule } from "primeng/lightbox";
import { ListboxModule } from "primeng/listbox";
import { MegaMenuModule } from "primeng/megamenu";
import { MenuModule } from "primeng/menu";
import { MenubarModule } from "primeng/menubar";
import { OrderListModule } from "primeng/orderlist";
import { OrganizationChartModule } from "primeng/organizationchart";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { PaginatorModule } from "primeng/paginator";
import { PanelModule } from "primeng/panel";
import { PanelMenuModule } from "primeng/panelmenu";
import { PasswordModule } from "primeng/password";
import { PickListModule } from "primeng/picklist";
import { ProgressBarModule } from "primeng/progressbar";
import { RadioButtonModule } from "primeng/radiobutton";
import { RatingModule } from "primeng/rating";
import { RippleModule } from "primeng/ripple";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { ScrollTopModule } from "primeng/scrolltop";
import { SelectButtonModule } from "primeng/selectbutton";
import { SidebarModule } from "primeng/sidebar";
import { SkeletonModule } from "primeng/skeleton";
import { SlideMenuModule } from "primeng/slidemenu";
import { SliderModule } from "primeng/slider";
import { SplitButtonModule } from "primeng/splitbutton";
import { SplitterModule } from "primeng/splitter";
import { StepsModule } from "primeng/steps";
import { TabMenuModule } from "primeng/tabmenu";
import { TableModule } from "primeng/table";
import { TabViewModule } from "primeng/tabview";
import { TagModule } from "primeng/tag";
import { TerminalModule } from "primeng/terminal";
import { TieredMenuModule } from "primeng/tieredmenu";
import { TimelineModule } from "primeng/timeline";
import { ToastModule } from "primeng/toast";
import { ToggleButtonModule } from "primeng/togglebutton";
import { ToolbarModule } from "primeng/toolbar";
import { TooltipModule } from "primeng/tooltip";
import { TreeModule } from "primeng/tree";
import { TreeTableModule } from "primeng/treetable";
import { VirtualScrollerModule } from "primeng/virtualscroller";

// Application Components
import { AppCodeModule } from "./primeng-atlantis-theme/blocks/app-code/app.code.component";
import { AppComponent } from "./app.component";
import { BlockViewer } from "./primeng-atlantis-theme/blocks/blockviewer/blockviewer.component";
import { BlocksComponent } from "./primeng-atlantis-theme/blocks/blocks/blocks.component";

// Demo pages
import { DashboardDemoComponent } from "./primeng-atlantis-theme/demo/view/dashboarddemo.component";
import { FormLayoutDemoComponent } from "./primeng-atlantis-theme/demo/view/formlayoutdemo.component";
import { FloatLabelDemoComponent } from "./primeng-atlantis-theme/demo/view/floatlabeldemo.component";
import { InvalidStateDemoComponent } from "./primeng-atlantis-theme/demo/view/invalidstatedemo.component";
import { InputDemoComponent } from "./primeng-atlantis-theme/demo/view/inputdemo.component";
import { ButtonDemoComponent } from "./primeng-atlantis-theme/demo/view/buttondemo.component";
import { TableDemoComponent } from "./primeng-atlantis-theme/demo/view/tabledemo.component";
import { ListDemoComponent } from "./primeng-atlantis-theme/demo/view/listdemo.component";
import { TreeDemoComponent } from "./primeng-atlantis-theme/demo/view/treedemo.component";
import { PanelsDemoComponent } from "./primeng-atlantis-theme/demo/view/panelsdemo.component";
import { OverlaysDemoComponent } from "./primeng-atlantis-theme/demo/view/overlaysdemo.component";
import { MediaDemoComponent } from "./primeng-atlantis-theme/demo/view/mediademo.component";
import { MenusComponent } from "./primeng-atlantis-theme/demo/view/menus/menus.component";
import { MessagesDemoComponent } from "./primeng-atlantis-theme/demo/view/messagesdemo.component";
import { MiscDemoComponent } from "./primeng-atlantis-theme/demo/view/miscdemo.component";
import { EmptyDemoComponent } from "./primeng-atlantis-theme/demo/view/emptydemo.component";
import { ChartsDemoComponent } from "./primeng-atlantis-theme/demo/view/chartsdemo.component";
import { FileDemoComponent } from "./primeng-atlantis-theme/demo/view/filedemo.component";
import { DocumentationComponent } from "./primeng-atlantis-theme/demo/view/documentation.component";
import { IconsComponent } from "./primeng-atlantis-theme/utilities/icons.component";
import { AppCrudComponent } from "./primeng-atlantis-theme/pages/app.crud.component";
import { AppCalendarComponent } from "./primeng-atlantis-theme/pages/app.calendar.component";
import { AppTimelineDemoComponent } from "./primeng-atlantis-theme/pages/app.timelinedemo.component";
import { AppInvoiceComponent } from "./primeng-atlantis-theme/pages/app.invoice.component";
import { AppHelpComponent } from "./primeng-atlantis-theme/pages/app.help.component";
import { AppNotfoundComponent } from "./primeng-atlantis-theme/pages/app.notfound.component";
import { AppErrorComponent } from "./primeng-atlantis-theme/pages/app.error.component";
import { AppAccessdeniedComponent } from "./primeng-atlantis-theme/pages/app.accessdenied.component";
import { AppLoginComponent } from "./primeng-atlantis-theme/pages/app.login.component";

// Demo services
import { CountryService } from "./primeng-atlantis-theme/demo/service/countryservice";
import { CustomerService } from "./primeng-atlantis-theme/demo/service/customerservice";
import { EventService } from "./primeng-atlantis-theme/demo/service/eventservice";
import { IconService } from "./primeng-atlantis-theme/demo/service/iconservice";
import { NodeService } from "./primeng-atlantis-theme/demo/service/nodeservice";
import { PhotoService } from "./primeng-atlantis-theme/demo/service/photoservice";
import { ProductService } from "./primeng-atlantis-theme/demo/service/productservice";

// Application services
import { ConfigService } from "./primeng-atlantis-theme/demo/service/app.config.service";

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { AppMainComponent } from "./primeng-atlantis-theme/app-main-layout/app.main.component";
import { AppBreadcrumbComponent } from "./primeng-atlantis-theme/atlantis-utils/app.breadcrumb.component";
import { AppBreadcrumbService } from "./primeng-atlantis-theme/atlantis-utils/app.breadcrumb.service";
import { AppConfigComponent } from "./primeng-atlantis-theme/atlantis-utils/app.config.component";
import { AppInlineMenuComponent } from "./primeng-atlantis-theme/atlantis-utils/app.inlinemenu.component";
import { AppMenuComponent } from "./primeng-atlantis-theme/atlantis-utils/app.menu.component";
import { MenuService } from "./primeng-atlantis-theme/atlantis-utils/app.menu.service";
import { AppMenuitemComponent } from "./primeng-atlantis-theme/atlantis-utils/app.menuitem.component";
import { AppRightMenuComponent } from "./primeng-atlantis-theme/atlantis-utils/app.rightmenu.component";
import { AppTopbarComponent } from "./primeng-atlantis-theme/atlantis-utils/app.topbar.component";
import { FormlyModule } from "@ngx-formly/core";
import { JwtModule } from "@auth0/angular-jwt";
import { FormlyPrimeNGModule } from "@ngx-formly/primeng";
import { AuthInterceptor } from "./common/modules/authentication/interceptor/auth.interceptor";
import { VerifyAccountComponent } from "./common/modules/authentication/components/verify-account/verify-account.component";

// DO NOT DELETE
import { MultiSelectModule } from "primeng/multiselect";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { ProfileComponent } from "./common/modules/user/components/profile/profile.component";
import { SharedModule } from "./common/modules/shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
//import { AttendanceComponent } from './leave-management-system/modules/Attendance/components/components/attendance/attendance.component';
export const routes: Routes = [];

FullCalendarModule.registerPlugins([
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin,
]);
export function tokenGetter() {
    return localStorage.getItem("auth_token");
}
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
        AvatarGroupModule,
        AvatarModule,
        BadgeModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        CarouselModule,
        CascadeSelectModule,
        ChartModule,
        CheckboxModule,
        ChipModule,
        ChipsModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        ConfirmPopupModule,
        ColorPickerModule,
        ContextMenuModule,
        DataViewModule,
        DialogModule,
        DividerModule,
        DropdownModule,
        FieldsetModule,
        FileUploadModule,
        FullCalendarModule,
        GalleriaModule,
        KnobModule,
        ImageModule,
        InplaceModule,
        InputNumberModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        RippleModule,
        ScrollPanelModule,
        ScrollTopModule,
        SelectButtonModule,
        SidebarModule,
        SkeletonModule,
        SlideMenuModule,
        SliderModule,
        SplitButtonModule,
        SplitterModule,
        StepsModule,
        TableModule,
        TabMenuModule,
        TabViewModule,
        TagModule,
        TerminalModule,
        TieredMenuModule,
        TimelineModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule,
        VirtualScrollerModule,
        AppCodeModule,
        JwtModule.forRoot({
            config: {
                tokenGetter,
            },
        }),
        FormsModule,
        ReactiveFormsModule,
        FormlyModule.forRoot({ extras: { lazyRender: true } }),
        FormlyPrimeNGModule,
        // NgxPrintModule,

        RouterModule.forRoot(routes, {
            anchorScrolling: "enabled",
        }),
        // DO NOT DELETE
        MultiSelectModule,
        SharedModule,
    ],
    declarations: [
        AppComponent,
        ProfileComponent,
        AppBreadcrumbComponent,
        AppMainComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppConfigComponent,
        AppRightMenuComponent,
        AppInlineMenuComponent,
        AppTopbarComponent,
        DashboardDemoComponent,
        FormLayoutDemoComponent,
        FloatLabelDemoComponent,
        InvalidStateDemoComponent,
        InputDemoComponent,
        ButtonDemoComponent,
        TableDemoComponent,
        ListDemoComponent,
        TreeDemoComponent,
        PanelsDemoComponent,
        OverlaysDemoComponent,
        MediaDemoComponent,
        MenusComponent,
        MessagesDemoComponent,
        MessagesDemoComponent,
        MiscDemoComponent,
        ChartsDemoComponent,
        EmptyDemoComponent,
        FileDemoComponent,
        DocumentationComponent,
        IconsComponent,
        AppCrudComponent,
        AppCalendarComponent,
        AppTimelineDemoComponent,
        AppLoginComponent,
        AppInvoiceComponent,
        AppHelpComponent,
        AppErrorComponent,
        AppAccessdeniedComponent,
        BlockViewer,
        BlocksComponent,
      

        // DO NOT DELETE
        AppNotfoundComponent,
        VerifyAccountComponent,
        
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        MenuService,
        AppBreadcrumbService,
        ConfigService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
