import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NavigationComponent } from "./navigation.component";
import { MatDialog } from "@angular/material";
import { Overlay } from "@angular/cdk/overlay";
import { ApiService } from "../api.service";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { Router } from "@angular/router";
import { By } from "@angular/platform-browser";

describe('Navigation component', () => {
    let fixture: ComponentFixture<NavigationComponent>;
    let mockMatDialog, mockOverlay, mockApiService, mockHttpClient, mockHttpHandler, mockRouter

    beforeEach(() => {
        mockMatDialog = jasmine.createSpyObj([null])
        mockOverlay = jasmine.createSpyObj([null])
        mockApiService = jasmine.createSpyObj(['Auth','isLoggedIn'])
        mockHttpClient = jasmine.createSpyObj([null])
        mockHttpHandler = jasmine.createSpyObj([null])
        mockRouter = jasmine.createSpyObj([null])

        TestBed.configureTestingModule({
            declarations: [NavigationComponent],
            providers: [
                { provide: MatDialog, useValue: mockMatDialog },
                { provide: Overlay, useValue: mockOverlay }, 
                { provide: ApiService, useValue: mockApiService }, 
                { provide: HttpClient, useValue: mockHttpClient }, 
                { provide: HttpHandler, useValue: mockHttpHandler }, 
                { provide: Router, useValue: mockRouter }
            ]
        })
        fixture = TestBed.createComponent(NavigationComponent)
    })

    it('should render button "Login" if user not logged in', () => {
        mockApiService.isLoggedIn.and.returnValue(false)

        fixture.detectChanges()

        expect(fixture.nativeElement.querySelector('button').textContent).toContain('Login')
    })

    it('should render 3 buttons if user logged in', () => {
        mockApiService.isLoggedIn.and.returnValue(true)

        fixture.detectChanges()

        const elem = fixture.debugElement.queryAllNodes(By.css('button')).length
        expect(elem).toBe(3)
    })

    it('should render "Account" if user logged in', () => {
        mockApiService.isLoggedIn.and.returnValue(true)

        fixture.detectChanges()

        const elem = fixture.debugElement.queryAllNodes( By.css('button') )[0].nativeNode.textContent
        expect(elem).toContain('Account')
    })

    it('should render "History" if user logged in', () => {
        mockApiService.isLoggedIn.and.returnValue(true)

        fixture.detectChanges()

        const elem = fixture.debugElement.queryAllNodes( By.css('button') )[1].nativeNode.textContent
        expect(elem).toContain('History')
    })

    it('should render "Logout" if user logged in', () => {
        mockApiService.isLoggedIn.and.returnValue(true)

        fixture.detectChanges()

        const elem = fixture.debugElement.queryAllNodes( By.css('button') )[2].nativeNode.textContent
        expect(elem).toContain('Logout')
    })    
})