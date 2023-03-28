import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropDownDirective } from "./dropdown.directive";
import { LoadingComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";

@NgModule({
    declarations:[
        AlertComponent,
        LoadingComponent,
        PlaceholderDirective,
        DropDownDirective
    ],
    imports:[CommonModule],
    exports:[
        AlertComponent,
        LoadingComponent,
        PlaceholderDirective,
        DropDownDirective,
        CommonModule
    ]
})
export class SharedModule{

}