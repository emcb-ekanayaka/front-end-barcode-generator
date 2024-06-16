import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BarcodegenService {

  private baseUrl : string='http://localhost:9000/api/v1/barcode'; 

  constructor(
    private http:HttpClient
  ) { }

createBarCode(data: any):Observable<any>{
    return this.http.post(this.baseUrl,data);     
}

GetLastBarCode():Observable<any>{
  return this.http.get(this.baseUrl);
}
}

