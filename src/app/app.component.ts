import { ContentService } from './services/content.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'codehunt';
  contentDetails: any;
  articleDetails: any;
  videoIds: string = '';
  constructor(public content: ContentService) {
    content.getYoutubeContent().subscribe((details: any) => {
      details.items.forEach((item: any) => {
        this.videoIds = this.videoIds.concat(
          `%${item.snippet.thumbnails.default.url.split('/')[4]}`
        );
      });

      console.log(this.videoIds.slice(1, this.videoIds.length));
      content
        .getVideoDetails(this.videoIds.slice(1, this.videoIds.length))
        .subscribe((videoDetails: any) => {
          console.log(videoDetails);
          this.contentDetails = videoDetails.items;
        });
    });

    content.getDevArticles().subscribe((data) => {
      console.log(data);
      this.articleDetails = data;
    });
  }
}
