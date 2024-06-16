import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTable,MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

export interface Item {
  name: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, FormsModule, MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild(MatTable) table!: MatTable<Item>;

  currentDate: string = '22/02/2022'; 
  invoiceNumber: string = '1'; 
  cashier: string = 'Administrator';
  customer: string = 'General Customer';
  items: Item[] = [
    { name: 'Coca-cola', quantity: 12, price: 0.50 },
    { name: 'Noodle-can', quantity: 5, price: 0.75 },
    { name: 'Beer', quantity: 6, price: 0.50 },
    { name: 'Fanta', quantity: 8, price: 0.50 },
    { name: 'Pepsi', quantity: 12, price: 0.50 }
  ];
  taxRate: number = 5;
  discountRate: number = 0;
  discount: number = 0;

  displayedColumns: string[] = ['item', 'quantity', 'price', 'action'];

  calculateSubtotal(): number {
    return this.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  }

  
  calculateTotal(): number {
    let subtotal = this.calculateSubtotal();
    let taxAmount = (subtotal * this.taxRate) / 100;
    let discountAmount = (subtotal * this.discountRate) / 100;
    return subtotal + taxAmount - discountAmount;
  }

  
  calculateTax(): number {
    return (this.calculateSubtotal() * this.taxRate) / 100;
  }

  deleteItem(item: Item): void {
    const index = this.items.indexOf(item);
    if (index >= 0) {
      this.items.splice(index, 1);
      this.table.renderRows(); 
    }
  }

  
  addItem(): void {
   
    //this.items.push({ name: 'New Item', quantity: 1, price: 1.0 });
  }
}
