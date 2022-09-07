import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatmessagesComponent } from './chatmessages.component';

describe('ChatmessagesComponent', () => {
  let component: ChatmessagesComponent;
  let fixture: ComponentFixture<ChatmessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatmessagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatmessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
