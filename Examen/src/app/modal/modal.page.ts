import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  items: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getBooksAndImages().subscribe(([books, dogImage]) => {
      this.items = books.results.map((book: { title: string }, index: number) => ({
        title: book.title,
        image: index % 2 === 0 ? dogImage.message : this.dataService.getRobotImage(index)
      }));
    });
  }
}