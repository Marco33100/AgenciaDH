import { Injectable } from "@angular/core";
import { BehaviorSubject, debounceTime, switchMap } from "rxjs";
import axios from 'axios';

@Injectable({
    providedIn: 'root'
})

export class YoutubeService{
    private apiKey: string = 'AIzaSyBcooOo0Ow2K-d5Gc_VzXt_3l4nLzs7PcI';
    private searchQuery = new BehaviorSubject<string>('');

    constructor(){
        this.searchQuery.pipe(
            debounceTime(300),
            switchMap(query => this.searchVideos(query))
        ).subscribe();
    }

    setSearchQuery(query:string){
        this.searchQuery.next(query);
    }

    async searchVideos(query:string){
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
            params: {
                part: 'snippet',
                q: query,
                key: this.apiKey,
                maxResults: 8,
                location: '21.156111111111, -100.9325',  // Coordenadas de Dolores Hidalgo, Guanajuato
                locationRadius: '15km',  // Radio de búsqueda en 50 km
                type: 'video',  // Solo videos
                publishedAfter: '2023-01-01T00:00:00Z',  // Videos recientes
                hl: 'es'
            }
        });

        return response.data.items;
    }


}