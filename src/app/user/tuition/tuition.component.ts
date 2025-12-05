import {Component, OnInit} from '@angular/core';
import {Tuition} from "../../model/tuition";
import {TuitionService} from "../../service/tuition.service";

@Component({
  selector: 'app-tuition',
  templateUrl: './tuition.component.html',
  styleUrls: ['./tuition.component.css']
})
export class TuitionComponent implements OnInit {

  title = "Hóa đơn học phí"
  tuitions?: Tuition[]
  idUserLogin?: any
  height = "height: 500px"

  constructor(private tuitionService: TuitionService) {
    this.idUserLogin = localStorage.getItem("idUser")
  }

  ngOnInit(): void {
    this.tuitionService.getAllTuitionByIdUser(this.idUserLogin).subscribe(rs => {
      this.tuitions = rs
      if (this.tuitions != null) {
        let px = 100;
        if (this.tuitions.length <= 2) {
          let value = px + 400 * this.tuitions.length
          this.height = this.height + value + 'px'
        }
        if (this.tuitions.length <= 6 && this.tuitions.length > 2) {
          let value = px + 200 * this.tuitions.length
          this.height = this.height + value + 'px'
        }
        if (this.tuitions.length > 6) {
          let value = px * this.tuitions.length
          this.height = this.height + value + 'px'
        }
      }
    })
  }

}
