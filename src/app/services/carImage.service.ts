import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarImage } from '../models/carImages';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl = 'https://localhost:44319/api/';

  constructor(private httpClient:HttpClient) { }

  getAllImagesForACar(carId:number){
    let newPath=this.apiUrl+"carimages/getallcarimage?carId="+carId
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

}
