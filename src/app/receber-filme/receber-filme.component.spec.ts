import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceberFilmeComponent } from './receber-filme.component';

describe('ReceberFilmeComponent', () => {
  let component: ReceberFilmeComponent;
  let fixture: ComponentFixture<ReceberFilmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceberFilmeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceberFilmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
