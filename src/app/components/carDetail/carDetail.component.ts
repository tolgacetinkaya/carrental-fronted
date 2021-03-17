import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImages';
import { CarDetailService } from 'src/app/services/carDetail.service';
import { CarImageService } from 'src/app/services/carImage.service';

@Component({
  selector: 'app-carDetail',
  templateUrl: './carDetail.component.html',
  styleUrls: ['./carDetail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDetail:CarDetail;
  carImages:CarImage[]=[]
  imageUrl="https://localhost:44319/images/"
  photoNumbers=this.carImages.length


  constructor(private carImageService: CarImageService, private carDetailService: CarDetailService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.getAllImagesForACar(params["carId"]);
        this.getCarDetailsByCarId(params["carId"]);
      }

    })
  }

  
  getAllImagesForACar(carId: number) {
    this.carImageService.getAllImagesForACar(carId).subscribe(response => {
      this.carImages = response.data;
      console.log(this.carImages)
    })
  }
  getCarDetailsByCarId(carId: number) {
    this.carDetailService.getCarDetailsByCarId(carId).subscribe(response => {
      this.carDetail = response.data[0];
      console.log(this.carDetail)
    })
  }

}