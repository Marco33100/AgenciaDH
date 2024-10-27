import { Component } from '@angular/core';
import { YoutubeService } from '../../core/services/youtube.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-videos-search',
  templateUrl: './videos-search.component.html',
  styleUrl: './videos-search.component.scss'
})
export class VideosSearchComponent {
  videos: any[]=[];
  query: string = '';

  constructor(private youtubeService: YoutubeService, private sanitizer: DomSanitizer){}


  search(){
    this.youtubeService.searchVideos(this.query).then((videos)=>{
      this.videos = videos;
    });
  }

  getSafeUrl(videoId:string):SafeResourceUrl{
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https:///www.youtube.com/embed/${videoId}`);
  }

}
