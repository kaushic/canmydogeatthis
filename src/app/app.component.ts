import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'canmydogeatthis';
  @ViewChild('food') foodForm!: NgForm;
  resetForm() {
    this.foodForm.reset();
  }
  onSubmit(value: any) {
    // console.log(value.search);
    if (value.search === "food") {
      alert("I'm gonna need you to be a little more specific");
    } else {
      this.setTitle(value.search);
      // console.log("resetting");
    }
  }

  setTitle(food: any) {
    let heading;
    if (food) {
      heading = "not empty";
    } else {
      heading = "empty";
    }
    console.log(heading);

    // console.log(this.question);
  }
}
