import { ContentService } from './services/content.service';
import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { firebaseConfig } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'codehunt';
  contentDetails: any;
  articleDetails: any;
  colorList = ['#F0DB4F', '#DC0530', '#22C55E', '#6675E0', '#54C5F8'];
  videoIds: string = '';
  constructor(public content: ContentService) {
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    content.getYoutubeContent().subscribe((details: any) => {
      details.items.forEach((item: any) => {
        this.videoIds = this.videoIds.concat(
          `,${item.snippet.thumbnails.default.url.split('/')[4]}`
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

  getRandomColor() {
    return this.colorList[Math.floor(Math.random() * this.colorList.length)];
  }
}
