import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Msg } from '../../models/msg.model';
import { MsgService } from '../../services/msg.service';

@Component({
  selector: 'msg',
  standalone: false,

  templateUrl: './msg.component.html',
  styleUrl: './msg.component.scss'
})
export class MsgComponent {
  msg$: Observable<Msg | null>
  constructor(private msgService: MsgService) {
    this.msg$ = this.msgService.msg$
  }

  onCloseMsg() {
    this.msgService.closeMsg()
  }
}
