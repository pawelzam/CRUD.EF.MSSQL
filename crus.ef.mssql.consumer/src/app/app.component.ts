import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../shared/services/ApiService';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'crus.ef.mssql.consumer';
  order: any = {};
  orders: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getOrders().subscribe(orders => {
      this.orders = orders;
      console.log(orders);
    });
  }

  createOrder() {
    this.apiService.createOrder(this.order).subscribe(_ => {
      console.log('Order has been created');
    });
  }

  
}
