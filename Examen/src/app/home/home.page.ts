import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  items: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getBooks().subscribe(books => {
      const dogImageRequests = books.results.map(() => this.dataService.getDogImage());
      forkJoin(dogImageRequests).subscribe(dogImages => {
        this.items = books.results.map((book: { title: string }, index: number) => ({
          title: book.title,
          image: index % 2 === 0 ? dogImages[index].message : this.dataService.getRobotImage(index)
        }));
      });
    });
  }

  saveItem(item: { title: string, image: string }) {
    this.dataService.addBook({ title: item.title, imageUrl: item.image })
      .then(() => {
        console.log('Book saved successfully!');
      })
      .catch(error => {
        console.error('Error saving book: ', error);
      });
  }
}