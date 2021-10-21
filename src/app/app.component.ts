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
      resp = "that's a yes from me dawg";
    } else {
      resp = "that's a no from me dawg";
    }
    this.renderDecision(resp);
  }
  renderDecision(resp: any) {
    this.decision.nativeElement.innerHTML = `<h2 class="loading">"${resp}"</h2>`;
  }
}
