import { TestBed } from '@angular/core/testing';

import { Solicitacoes } from './solicitacoes';

describe('Solicitacoes', () => {
  let service: Solicitacoes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Solicitacoes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
