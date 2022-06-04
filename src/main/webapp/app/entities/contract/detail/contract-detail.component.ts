import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContract } from '../contract.model';

@Component({
  selector: 'apblng-contract-detail',
  templateUrl: './contract-detail.component.html',
})
export class ContractDetailComponent implements OnInit {
  contract: IContract | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contract }) => {
      this.contract = contract;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
