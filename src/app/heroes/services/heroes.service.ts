import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
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

  addHero( hero: Heroe ): Observable<Heroe> {
    return this.httpClient.post<Heroe>(`${ this.baseUrl }/heroes`, hero );
  }

  updateHero( hero: Heroe ): Observable<Heroe> {
    if ( !hero.id ) throw Error('Hero id is required');

    return this.httpClient.patch<Heroe>(`${ this.baseUrl }/heroes/${ hero.id }`, hero );
  }

  deleteHeroById( id: string ): Observable<boolean> {

    return this.httpClient.delete(`${ this.baseUrl }/heroes/${ id }`)
      .pipe(
        map( resp => true ),
        catchError( err => of(false) ),
      );
  }

}
