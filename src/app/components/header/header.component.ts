import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string = '<div class="freebirdFormviewerViewHeaderTitle freebirdCustomFont" dir="auto" role="heading" aria-level="1">Ejercicio: Gestión de usuarios</div>'
  constructor() { }

  ngOnInit() {
  }

}
