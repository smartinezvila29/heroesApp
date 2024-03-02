import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.css'
})
export class HeroPageComponent implements OnInit {

  public hero?: Heroe;

  constructor(
    private heroService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }


  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      delay(2000),
      switchMap( ({id}) => this.heroService.getHeroeById(id))
    )
    .subscribe( hero => {
      if (!hero) return this.router.navigateByUrl('/heroes/list');
      this.hero = hero;
      return;
    });
  }

  goBack(): void{
    this.router.navigate(['/heroes/list']);
  }
}
