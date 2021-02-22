import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Video } from '../video'
import { VideoService } from '../video.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-video-add-new-video',
  templateUrl: './video-add-new-video.component.html',
  styleUrls: ['./video-add-new-video.component.css'],
  providers:[VideoService]
})
export class VideoAddNewVideoComponent implements OnInit {
  @Output() responseVideo= new EventEmitter<Video>()
    videos:Array<Video>;

  hideNewVideo:boolean=true;
  constructor(private videoService:VideoService,
    private router:Router) { }
  selectedVideo:Video
  ngOnInit(): void {
  }
  onSubmitAddVideo(video:Video){
    this.videoService.addVideo(video).subscribe(resNewVideo=>{
      
      console.log(resNewVideo)
      this.responseVideo.emit(resNewVideo)
      })
  }
 
  

}
