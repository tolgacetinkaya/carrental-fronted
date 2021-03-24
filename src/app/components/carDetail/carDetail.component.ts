import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImages';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { CarDetailService } from 'src/app/services/carDetail.service';
import { CarImageService } from 'src/app/services/carImage.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-carDetail',
  templateUrl: './carDetail.component.html',
  styleUrls: ['./carDetail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDetail:CarDetail;
  carImages:CarImage[]=[]
  imageUrl="https://localhost:44319/images/"
  photoNumbers=this.carImages.length;
  carIsAvaible:boolean;
  
  


  constructor(private carImageService: CarImageService, private carDetailService: CarDetailService, private activatedRoute: ActivatedRoute,
    private rentalService:RentalService,private toastrService:ToastrService) { }

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

  checkCarIsAvailable(rental:RentalDetail) {
    this.rentalService.checkCarIsAvailable(rental).subscribe((response) => {
       this.carIsAvaible= response.success
    });
    
  }

}