import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login-google",
  templateUrl: "./login-google.component.html",
  styleUrls: ["./login-google.component.scss"],
})
export class LoginGoogleComponent implements OnInit, OnDestroy {
  errorMessage: string;
  subscription = new Subscription();
  constructor(
    private route: ActivatedRoute,

  ) {}

  ngOnInit(): void {
    this.getParams();
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
  getParams() {
    const key = this.route.snapshot.paramMap.get("access_Token");
    //console.log(key);
    // this.authService.loginGoogle(key);
    // this.subscription.add(
    //   this.authService.loginWithGoogle({ key }).subscribe(
    //     (res) => {
    //       this.router.navigate(["/store"]);
    //     },
    //     (err) => {
    //       this.errorMessage = "We  couldn't sign you  in ";
    //     }
    //   )
    // );
  }
}
