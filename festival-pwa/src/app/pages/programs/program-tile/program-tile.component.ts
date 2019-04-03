import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-program-tile',
  templateUrl: './program-tile.component.html',
  styleUrls: ['./program-tile.component.scss'],
})
export class ProgramTileComponent implements OnInit {

  @Input() id: number;

  _program: any;

  get program(): any {
    return this._program;
  }

  @Input('program')
  set program(value: any) {
    this._program = value;
    this.data.getImageURL(this._program.image).subscribe(url => this._program.image = url);
    this._program.image = 'https://via.placeholder.com/140x120';
  }

  constructor(public data: DataService) { }

  ngOnInit() {}

}
