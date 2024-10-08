import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../shared/services/ApiService';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateOrderComponent } from "./create-order/create-order.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, CreateOrderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'crus.ef.mssql.consumer';
  order: any = {};
  orders: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.apiService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }

  orderCreated(order: any) {
    this.apiService.createOrder(order).subscribe(_ => {
    this.getOrders();
    });
  }
}
