import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { promise } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  forbiddenNames:string[]=['Indra','Nil'];
  genders = ['male', 'female'];
  signUpForm: FormGroup;
  ngOnInit(){
    this.signUpForm = new FormGroup({
      'userdata': new FormGroup({
        'username': new FormControl(null,[Validators.required, this.forbiddenName]),
        'email': new FormControl(null,[Validators.required, Validators.email],this.forbiddenEmail)
      }),
      'gender': new FormControl('female'),
      'hobbies': new FormArray([])
    })
  }

  get controls(){
    return (this.signUpForm.get('hobbies') as FormArray).controls;
  }

  onAddControls(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control);
  }

  onSubmit(){
    console.log(this.signUpForm)
  }

  forbiddenName=(control: FormControl):{[s:string]: boolean}=>{
    if(this.forbiddenNames.indexOf(control.value)!=-1){
      return {'nameIsForbidden': true}
    }
    return null;
  }

  forbiddenEmail=(control: FormControl):Promise<any> | Observable<any>=>{
    const promise = new Promise((resolve,reject)=>{
      setTimeout(()=>{
        if(control.value==='test@test.com'){
          resolve({'emailIsForbidden': true})
        }
        else{
          resolve(null)
        }
      },1500)
    })
    return promise;
  }


}
