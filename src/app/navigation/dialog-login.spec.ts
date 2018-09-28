import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogLogin } from './dialog-login';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatDialogModule, MatDialogRef } from '@angular/material';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
@NgModule({
    imports: [ MatFormFieldModule ],
    exports: [ MatFormFieldModule ]
}) export class MaterialModule {};

describe('Navigation Login dialog component', () => {
    let fixture : ComponentFixture<DialogLogin>;
    let MockApiService, MockRouter, MockMatDialogRef
    beforeEach(()=>{
        MockApiService = jasmine.createSpyObj(['Auth'])
        MockRouter = jasmine.createSpyObj([null])
        MockMatDialogRef = jasmine.createSpyObj([null])

        TestBed.configureTestingModule({
            // dealing with ngModel error
            imports:[ FormsModule, MaterialModule, MatDialogModule ],
            declarations:[ DialogLogin ],
            providers: [
                { provide: ApiService, useValue: MockApiService },
                { provide: Router, useValue: MockRouter},
                { provide: MatDialogRef, useValue: MockMatDialogRef}
            ]
        })
    fixture = TestBed.createComponent(DialogLogin)   
    })

    it('should render 2 input field', () => {
        const elem = fixture.debugElement.queryAllNodes(By.css('input')).length
        // console.log(elem)

        expect(elem).toBe(2)
    })

    it('should close dialog when click Cancel', () => {
        /// setup
        spyOn(fixture.componentInstance, 'onNoClick')
        const buttonLogin = fixture.debugElement.queryAll(By.css('button'))[0]

        //action
        buttonLogin.triggerEventHandler('click', null)
        
        expect(fixture.componentInstance.onNoClick).toHaveBeenCalledTimes(1)
    })

    it('should call login() when login clicked', () => {
        /// setup
        spyOn(fixture.componentInstance, 'login')
        const buttonLogin = fixture.debugElement.queryAll(By.css('button'))[1]

        //action
        buttonLogin.triggerEventHandler('click', null)
        
      
        expect(fixture.componentInstance.login).toHaveBeenCalledTimes(1)
    })

    it('should take credentials from ngModel and pass to api.Auth() when login is clicked', () => {
        /// setup 
        const buttonLogin = fixture.debugElement.queryAll(By.css('button'))[1]

        //action
        fixture.componentInstance.submitedForm.login = 'user'
        fixture.componentInstance.submitedForm.password = 'password'
        buttonLogin.triggerEventHandler('click', null)
             
        expect(MockApiService.Auth).toHaveBeenCalledWith('user', 'password')
    })    
})
