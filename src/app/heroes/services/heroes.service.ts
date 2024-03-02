import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Heroe } from '../interfaces/heroe.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})

export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getHeroes():Observable<Heroe[]>{
    return this.httpClient.get<Heroe[]>(this.baseUrl + '/heroes');
  }

  getHeroeById(id: string):Observable<Heroe|undefined>{
    return this.httpClient.get<Heroe>(this.baseUrl + `/heroes/${id}`)
    .pipe(
      catchError( () => of(undefined))
      );
  }

  getSuggestion(query: string): Observable<Heroe[]>{
    return this.httpClient.get<Heroe[]>(this.baseUrl + '/heroes?q=' + query +'&_limit=6');
  }

}
