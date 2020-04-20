import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class GoogleCloudVisionServiceService {

  constructor(public http: HttpClient) { }

  getLabels(base64Image) {
  const headers = new HttpHeaders()
  .append('Content-Type', 'application/json')
  .append('Access-Control-Allow-Headers', 'Content-Type')
  .append('Access-Control-Allow-Methods', 'POST')
  .append('Access-Control-Allow-Origin', 'https://blinduinobackend.herokuapp.com/');
    // return this.http.post('https://blinduinobackend.herokuapp.com/' , base64Image);
  return this.http.post('https://blinduinobackend.herokuapp.com/' , base64Image, {headers});
  }

}
