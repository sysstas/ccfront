import { ApiService } from "./api.service";
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { Overlay } from "@angular/cdk/overlay";
import { HttpRequest } from "@angular/common/http";
describe('api', ()=>{
    let httpTestingController: HttpTestingController;
    let service , mockRouter
    // mockRouter = jasmine.createSpyObj(null)
    // let service: ApiService
    // let a 
    beforeEach(()=>{
        // service = new ApiService(null,null,null)
        mockRouter = jasmine.createSpyObj(['navigate'])
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [
                ApiService,
                { provide: Router, useValue: mockRouter},
                MatSnackBar,
                Overlay

            ]
        })
        service = TestBed.get(ApiService)
        httpTestingController = TestBed.get(HttpTestingController)
    })

    describe( 'API service user authentication', ()=>{
        describe('Auth()',() =>{
            it('shoud put valid token to localstorage from http POST response ', ()=>{      
                localStorage.clear()
                service.Auth('user', 'password')
                const req = httpTestingController.expectOne((request: HttpRequest<any>) => {
                    return request.method == 'POST'
                        && request.url == 'http://localhost:5000/login'
                        && JSON.stringify(request.body) == JSON.stringify({
                            login: 'user', password: 'password'
                        })
                })
                ///sending valid token
                req.flush({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzgwNDA2MzN9.1YgJmYxXDrq53ib5buwKhGwf1MsJ8JJ5ErJbs6PKTqg'})
            
                expect(localStorage.token).toBeTruthy()
            })

            it('shoud navigate to admin pannel if user is an admin ', ()=>{      
                localStorage.clear()
                service.Auth('admin', 'password')
                const req = httpTestingController.expectOne((request: HttpRequest<any>) => {
                    return request.method == 'POST'
                        && request.url == 'http://localhost:5000/login'
                        && JSON.stringify(request.body) == JSON.stringify({
                            login: 'admin', password: 'password'
                        })
                })
                ///sending valid token containing isAdmin = 1
                req.flush({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzgwNDA2MzN9.1YgJmYxXDrq53ib5buwKhGwf1MsJ8JJ5ErJbs6PKTqg'})
            
                expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin'])
            })

            it('shoud navigate to user account if user is not an admin ', ()=>{      
                localStorage.clear()
                service.Auth('admin', 'password')
                const req = httpTestingController.expectOne((request: HttpRequest<any>) => {
                    return request.method == 'POST'
                        && request.url == 'http://localhost:5000/login'
                        && JSON.stringify(request.body) == JSON.stringify({
                            login: 'admin', password: 'password'
                        })
                })
                ///sending valid token containing isAdmin = 1
                req.flush({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjowLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMDcxYmNhZmFiNTM4ZjE1OTZiNTAwMGY4MzQxZGU4MTUiLCJJRCI6MiwiaWF0IjoxNTM4MDQzODM5fQ.td8N5LDIGZL7KBdNQt5oUkU3jTh2gx2pIlgFuojIkww'})
            
                expect(mockRouter.navigate).toHaveBeenCalledWith(['/account'])
            })

        }) 
    })    
})

