import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { Program } from 'src/app/shared/models/program';

@Component({
  selector: 'app-program-tile',
  templateUrl: './program-tile.component.html',
  styleUrls: ['./program-tile.component.scss'],
})
export class ProgramTileComponent implements OnInit {

  @Input() id: number;
  @Input() program: any;

  constructor(public data: DataService) { }

  ngOnInit() {}

}
