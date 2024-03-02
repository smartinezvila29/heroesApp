import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {

  public searchInput = new FormControl('');

  public heroes: Heroe[] = [];

  public selectedHero?: Heroe | undefined;

  constructor(private heroService: HeroesService) { }

  searchHero(){
    const value: string = this.searchInput.value || '';
    if(value){
      this.heroes = [];
      return;
    }
    this.heroService.getSuggestion(value)
    .subscribe(heroes => this.heroes = heroes);

  }

  onSelectedOption( event: MatAutocompleteSelectedEvent): void{
    if(!event.option.value){
      this.selectedHero = undefined;
      return;
    }

    const hero: Heroe = event.option.value;
    this.searchInput.setValue(hero.superhero);
  }
}
