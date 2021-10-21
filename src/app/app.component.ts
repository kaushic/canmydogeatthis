import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument, DocumentSnapshot } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'canmydogeatthis';
  @ViewChild('food') foodForm !: NgForm;
  @ViewChild('decision') decision !: ElementRef;
  foodItem !: string;
  edible !: boolean;

  subs !: Subscription;

  constructor(private db: AngularFirestore) { }

  resetForm() {
    // console.log("resetting");
    this.foodForm.reset();
  }
  onSubmit(value: any) {
    // console.log(value.search);
    if (value.search === "food") {
      alert("Do you know what food specifically?");
    } else {
      this.foodQuery(value.search);
      console.log(value.search);
      //console.log(typeof (value.search));
    }
  }
  setLoading = () => {
    this.renderLoading();
  };
  renderLoading = () => {
    this.decision.nativeElement.innerHTML = `<h2 class="loading">loading...</h2>`;
    //console.log("loading...");
  };
  foodQuery(foodItem: string) {
    this.setLoading();
    const doc = this.db.collection('food').doc(foodItem).get();
    this.subs = doc.subscribe((snapshot) => {
      const item = snapshot.data();
      if (!item) {
        this.foodItem = 'undefined';
        console.log("not in db");
      } else {
        this.edible = snapshot.get("canEat");
        this.foodItem = snapshot.get("foodId");
        console.log(item);
        console.log(this.edible);
        console.log(this.foodItem);
        this.setDecision(this.edible);
      }
    });
  }
  setDecision(decision: boolean) {
    let resp;
    if (decision) {
      resp = this.getRandomYesResponse();
    } else {
      resp = this.getRandomNoResponse();
    }
    this.renderDecision(resp);
  }
  renderDecision(resp: any) {
    this.decision.nativeElement.innerHTML = resp;
    // <iframe src="https://giphy.com/embed/MNmyTin5qt5LSXirxd" width="50%" height="50%" style="position:absolute" frameBorder="0" class="giphy-embed"></iframe>
    //resp;//`<h2 class="response">"${resp}"</h2>`;

  }

  getRandomYesResponse() {
    let arr = [
      `<div style="width:50%;height:0;padding-bottom:83%;position:relative;margin-left: auto;margin-right: auto;"><img src="yesGifs/yes1.gif"></img></div>`,
      `<div style="width:50%;height:0;padding-bottom:83%;position:relative;margin-left: auto;margin-right: auto;"><img src="yesGifs/yes2.gif"></img></div>`,
      `<div style="width:50%;height:0;padding-bottom:83%;position:relative;margin-left: auto;margin-right: auto;"><img src="yesGifs/yes3.gif"></img></div>`,
      `<div style="width:50%;height:0;padding-bottom:83%;position:relative;margin-left: auto;margin-right: auto;"><img src="yesGifs/yes4.gif"></img></div>`,
      `<div style="width:50%;height:0;padding-bottom:83%;position:relative;margin-left: auto;margin-right: auto;"><img src="yesGifs/yes5.gif"></img></div>`,
    ]

    return arr[Math.floor(Math.random() * arr.length)]
  }
  getRandomNoResponse() {
    let arr = [
      `<div style="width:50%;height:0;padding-bottom:83%;position:relative;margin-left: auto;margin-right: auto;"><img src="noGifs/no1.gif"></img></div>`,
      `<div style="width:50%;height:0;padding-bottom:83%;position:relative;margin-left: auto;margin-right: auto;"><img src="noGifs/no2.gif"></img></div>`,
      `<div style="width:50%;height:0;padding-bottom:83%;position:relative;margin-left: auto;margin-right: auto;"><img src="noGifs/no3.gif"></img></div>`,
      `<div style="width:50%;height:0;padding-bottom:83%;position:relative;margin-left: auto;margin-right: auto;"><img src="noGifs/no4.gif"></img></div>`,
      `<div style="width:50%;height:0;padding-bottom:83%;position:relative;margin-left: auto;margin-right: auto;"><img src="noGifs/no5.gif"></img></div>`,
    ]
    return arr[Math.floor(Math.random() * arr.length)]
  }
}
