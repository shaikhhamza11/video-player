import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http'
import {map} from 'rxjs/operators'
 import {Video} from './video'
 import { Observable,throwError } from 'rxjs';
 import { catchError } from 'rxjs/operators';
// import 'rxjs/add/observable/throw'
 @Injectable({
  providedIn: 'root'
})
export class VideoService {

  private getUrl='/api/videos'
  private postUrl='/api/videos'
  private putUrl='/api/videos/'
  private deleteUrl='/api/videos/'
  constructor(private http:HttpClient) { }
  getVideos(){
    return this.http.get(this.getUrl)
    .pipe(map(responseData=>{
      const videoArray=[];
      for(const key in responseData){
        if(responseData.hasOwnProperty(key)){
          videoArray.push({...responseData[key]})
        }
      }
      return videoArray
    })
    )
    
    
  }
  addVideo(video:Video){
    let headers= new HttpHeaders({'Content-Type':'application/json'})
    return this.http.post<Video>(this.postUrl,JSON.stringify(video),{headers:headers})
    .pipe(map(responseData=>{
      
      console.log(responseData)
      return  responseData
    }))
  }
  updateVideo(video:Video){
    let headers= new HttpHeaders({'Content-Type':'application/json'})
    return this.http.put<Video>(this.putUrl + video._id,JSON.stringify(video),{headers:headers})
    .pipe(map(responseData=>{
      
      console.log(responseData)
      return  responseData
    }))

  }
  deleteVideo(video:Video){
    return this.http.delete<Video>(this.deleteUrl + video._id)
    .pipe(map(responseData=>{
      
      console.log(responseData)
      return  responseData
    }))

  }
    
  
  }

