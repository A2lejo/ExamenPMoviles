import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Book {  
  id: number;
  title: string;
  // ...otros campos que necesites...
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private booksUrl = 'https://gutendex.com/books/?ids=1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20';
  private dogImageUrl = 'https://dog.ceo/api/breeds/image/random';
  private robotImageUrl = 'https://robohash.org/';

  constructor(private http: HttpClient, private firestore: AngularFirestore) { }

  getBooks(): Observable<{ results: Book[] }> {
    return this.http.get<{ results: Book[] }>(this.booksUrl);
  }

  getDogImage(): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(this.dogImageUrl);
  }

  getRobotImage(id: number): string {
    return `${this.robotImageUrl}${id}`;
  }

  getBooksAndImages(): Observable<any[]> {
    return this.getBooks().pipe(
      switchMap(books => {
        const dogImageRequests = books.results.map(() => this.getDogImage());
        return forkJoin([of(books), forkJoin(dogImageRequests)]);
      })
    );
  }

  addBook(book: { title: string, imageUrl: string }) {
    return this.firestore.collection('books').add(book);
  }
}