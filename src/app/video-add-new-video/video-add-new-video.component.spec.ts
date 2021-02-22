import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoAddNewVideoComponent } from './video-add-new-video.component';

describe('VideoAddNewVideoComponent', () => {
  let component: VideoAddNewVideoComponent;
  let fixture: ComponentFixture<VideoAddNewVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoAddNewVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoAddNewVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
