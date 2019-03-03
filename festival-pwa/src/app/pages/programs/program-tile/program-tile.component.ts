import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-program-tile',
  templateUrl: './program-tile.component.html',
  styleUrls: ['./program-tile.component.scss'],
})
export class ProgramTileComponent implements OnInit {

  @Input() program;

  constructor() { }

  ngOnInit() {}

}
