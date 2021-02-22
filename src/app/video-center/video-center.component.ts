import { Component, OnInit,OnChanges } from '@angular/core';
import { Video } from '../video'
import { VideoService } from '../video.service';
import{Router} from '@angular/router'
import {MatDialog,MatDialogConfig} from '@angular/material/dialog'
import { VideoAddNewVideoComponent } from '../video-add-new-video/video-add-new-video.component'
@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers:[VideoService]
})
export class VideoCenterComponent implements OnInit {
public errorMessage;
  videos:Array<Video>;
  selectedVideo:Video
  lastVideo:Video
   hideNewVideo:boolean=true;
  constructor(private videoService:VideoService,
    private router:Router,
    private dialog:MatDialog) { }

  ngOnInit(): void {
   this.videoService.getVideos().subscribe((resVideo)=>{
     
    return this.videos=resVideo
    },
    (error)=>{
     return this.errorMessage=error
    })
    
  }
  getDialogValue(resNewVideo){
    this.videos.push(resNewVideo)
    this.selectedVideo=resNewVideo
  }

  onSelectVideo(video:any){
    this.selectedVideo=video;
    this.hideNewVideo=true
    console.log(this.selectedVideo)
  }
  // onSubmitAddVideo(video:Video){
  //   this.videoService.addVideo(video).subscribe(resNewVideo=>{
  //     this.hideNewVideo=true
  //     console.log(resNewVideo)
  //     this.videos.push(resNewVideo);
  //     this.selectedVideo=resNewVideo
  //   })
  // }
  onUpdateVideoEvent(video:any){
    this.videoService.updateVideo(video).subscribe(resUpdatedVideo=>video=resUpdatedVideo);
    this.selectedVideo=null
  }
  
  onDeleteVideoEvent(video:any){
    let videoArray=this.videos;
    this.videoService.deleteVideo(video)
    .subscribe(resDeletedVideo=>{
      for(let i=0;i<videoArray.length;i++){
        if(videoArray[i]._id===video._id){
          videoArray.splice(i,1)
        }
      }
    })
    this.selectedVideo=null
  }
onResponseVideoEvent(video:any){
  
}
  newVideo(){
    
    const dialogConfig= new MatDialogConfig()
    dialogConfig.disableClose=true
    dialogConfig.autoFocus=true
    dialogConfig.width="60%"
    let dialogRef=this.dialog.open(VideoAddNewVideoComponent,dialogConfig)
    dialogRef.afterClosed().subscribe(result=>console.log(result))
  }
}
// <iframe width="853" height="480" src="https://www.youtube.com/embed/lud7CUSTbyY?list=RDMM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
