import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseType } from '@angular/http';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Inventory } from '../inventory-record/InventoryRecord';
import { InventoryDto } from '../inventory-record/inventoryDto';
import { environment } from 'src/environments/environment';

const GET_HEADERS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  responseType: 'text' as 'json'
};

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  baseUrl: string = environment.baseUrl + "/InventoryManagementSystem/inventory/"

  constructor(private http: HttpClient) { }

  addProducts(inventory: Inventory){
    return this.http.post(this.baseUrl + 'addproduct/' + sessionStorage.getItem('token') + '/' + sessionStorage.getItem('userName'), inventory,{responseType: 'text'})
    .pipe(catchError(this.handleError));
  }

  getProducts(): Observable<InventoryDto[]>{
    return this.http.get<InventoryDto[]>(this.baseUrl + 'getuserproducts/' + sessionStorage.getItem('userName'))
    .pipe(catchError(this.handleError));
  }

  deleteProduct(productId: number){
    return this.http.delete(this.baseUrl + 'deleteproduct/' + productId,{responseType: 'text'})
      .pipe(catchError(this.handleError));
  }

  deleteProductBySM(productId: number){
    return this.http.delete(this.baseUrl + 'SMdeleteproduct/' + productId,{responseType: 'text'})
      .pipe(catchError(this.handleError));
  }

  getPendingProducts(): Observable<InventoryDto[]>{
    return this.http.get<InventoryDto[]>(this.baseUrl + 'getpendingproducts',{responseType: 'json'})
      .pipe(catchError(this.handleError));
  }

  approveProducts(productId: number){
    return this.http.get(this.baseUrl + 'approveproduct/' + productId, {responseType: 'text'})
      .pipe(catchError(this.handleError));
  }

  pendingProductUser(): Observable<InventoryDto[]>{
    return this.http.get<InventoryDto[]>(this.baseUrl + 'pendingproduct/' + sessionStorage.getItem('userName'))
    .pipe(catchError(this.handleError));
  }

  productById(): Observable<InventoryDto>{
    return this.http.get<InventoryDto>(this.baseUrl + 'getproductId/' + sessionStorage.getItem('productId'))
    .pipe(catchError(this.handleError));
  }

  updateProduct(inventory: InventoryDto){
    return this.http.put(this.baseUrl + 'updateproduct' , inventory, {responseType: 'text'})
      .pipe(catchError(this.handleError));
  }

  getAllProducts(): Observable<InventoryDto[]>{
    return this.http.get<InventoryDto[]>(this.baseUrl + 'getallproducts')
      .pipe(catchError(this.handleError));
  }


  private handleError (errorResponse: HttpErrorResponse) {
    if(errorResponse.error instanceof ErrorEvent){
      //console.error("Client Side Error", errorResponse.error.message);
    } else {
      console.error("Server Side Error",errorResponse);
    }
    return throwError('There is a problem with service');
  }
}
