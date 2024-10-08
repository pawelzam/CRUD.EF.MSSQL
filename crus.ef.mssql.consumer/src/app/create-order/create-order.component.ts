import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateOrderService } from './create-order.service';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css'
})
export class CreateOrderComponent implements OnInit {
  @Output() orderCreated = new EventEmitter<any>();
  
  constructor(private createOrderService: CreateOrderService) {}

  ngOnInit(): void {
    this.order.id = this.createOrderService.generateGuid();
  }

  public order: any = {
    id: '6607708a-3e55-4d6b-baaf-2111cfcbd106',
    total: 100
  };

  createOrder() {    
      this.orderCreated.emit(this.order);
      this.order.id = this.createOrderService.generateGuid();
      this.order.total = this.order.total + 1;
 }
}
