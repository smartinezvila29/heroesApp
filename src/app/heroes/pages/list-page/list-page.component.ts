import { Component } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
})
export class ListPageComponent {

  public heroes: Heroe[] = [];

  constructor(private heroService: HeroesService) { }

  ngOnInit(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

}
