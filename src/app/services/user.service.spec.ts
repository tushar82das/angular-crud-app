import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IUsers } from '../models/users';

import { UserService } from './user.service';


describe('UserService', () => {

  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [UserService]
    });

    service = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('should retrive users from the API via GET request', () => {
    const mockUsers: IUsers[] = [
      {
        "id": 1,
        "name": "Tushar Das",
        "email": "tushar82das@gmail.com",
        "password": "test@123",
        "phone": "7377163666",
        "address": "Bangalore"
      },
      {
        "id": 2,
        "name": "Sukumar Sailem",
        "email": "sukumar123@gmail.com",
        "password": "test@123",
        "phone": "7377163666",
        "address": "Bangalore"
      }];
    service.getUsersList().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });
    const mockRequest = httpMock.expectOne(`${service.apiUrl}`);
    expect(mockRequest.request.method).toBe('GET');
    mockRequest.flush(mockUsers);

  });

  it('should retrive user details based on the given ID via get request', () => {
    const mockUser: IUsers = {
      "id": 1,
      "name": "Tushar Das",
      "email": "tushar82das@gmail.com",
      "password": "test@123",
      "phone": "7377163666",
      "address": "Bangalore"
    };
    const userId = 1;
    service.getUserDetails(userId).subscribe(user => {
      expect(user).toEqual(mockUser);
    });
    const mockRequest = httpMock.expectOne(`${service.apiUrl}/${userId}`);
    expect(mockRequest.request.method).toBe('GET');
    mockRequest.flush(mockUser);

  });

  it('should add new user via POST tequest', () => {
    const mockRequestData = {
      "name": "Tushar Das",
      "email": "tushar82das@gmail.com",
      "password": "test@123",
      "phone": "7377163666",
      "address": "Bangalore"
    }
    const mockResponseData: IUsers = {
      "id": 1,
      "name": "Tushar Das",
      "email": "tushar82das@gmail.com",
      "password": "test@123",
      "phone": "7377163666",
      "address": "Bangalore"
    }

    service.addUserRecord(mockRequestData).subscribe(user => {
      expect(user).toEqual(mockResponseData);
    });
    const mockRequest = httpMock.expectOne(`${service.apiUrl}`);
    expect(mockRequest.request.method).toBe('POST');
    mockRequest.flush(mockResponseData);
  });

  it('should update user record via PATCH request', () => {
    const userID = 1;
    const mockRequestData = {
      "name": "Tushar",
      "email": "tushar82das@gmail.com",
      "password": "test@123",
      "phone": "7377163666",
      "address": "Bangalore"
    }
    const mockResponseData: IUsers = {
      "id": 1,
      "name": "Tushar",
      "email": "tushar82das@gmail.com",
      "password": "test@123",
      "phone": "7377163666",
      "address": "Bangalore"
    }
    service.updateUserRecord(userID, mockRequestData).subscribe(user => {
      expect(user).toEqual(mockResponseData);
    });
    const mockRequest = httpMock.expectOne(`${service.apiUrl}/${userID}`);
    expect(mockRequest.request.method).toBe('PATCH');
    mockRequest.flush(mockResponseData);
  });

  it('should delete user record via DELETE request', () => {
    let userId = 1;
    const mockResponseData: IUsers = {
      "id": 1,
      "name": "Tushar",
      "email": "tushar82das@gmail.com",
      "password": "test@123",
      "phone": "7377163666",
      "address": "Bangalore"
    };
    service.deleteUserRecord(userId).subscribe(user => {
      console.log('----------------------------------');
      console.log(user);
      console.log('----------------------------------');
    });
    const mockRequest = httpMock.expectOne(`${service.apiUrl}/${userId}`);
    expect(mockRequest.request.method).toBe('DELETE');
    mockRequest.flush(mockResponseData);
  });

});
