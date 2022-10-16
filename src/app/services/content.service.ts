import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  apiKey = 'AIzaSyAozF9flyjLpsfrsNvn_qf3aqYHBz63iT0';
  videoIds: string = '';
  constructor(public httpClient: HttpClient) {}

  getYoutubeContent() {
    let youtubeUrl = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=UCkEdJb21tHsWEYUGe1-VrsQ&maxResults=25&key=${this.apiKey}`;
    return this.httpClient.get(youtubeUrl);
  }

  getVideoDetails(videoIds: string) {
    let youtubeUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoIds}&key=${this.apiKey}`;
    console.log(youtubeUrl);
    return this.httpClient.get(youtubeUrl);
  }

  getDevArticles() {
    let devToUrl = `https://dev.to/api/articles?username=abilashs003`;
    return this.httpClient.get(devToUrl);
  }
}
