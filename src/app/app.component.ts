import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'canmydogeatthis';
  @ViewChild('food') foodForm!: NgForm;
  @ViewChild('decision') decision !: ElementRef;

  constructor(private items: AngularFirestore) { }

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
    }
  }

  foodQuery(foodItem: any) {
    //this.setLoading();
  }
  renderLoading = () => {
    this.decision.nativeElement.innerHTML = `<h2 class="loading">loading...</h2>`;
    //console.log("loading...");
  };

  setLoading = () => {
    this.renderLoading();
  };

}
