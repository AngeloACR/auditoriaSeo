import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DataforseoService {
  login: string = "olivergustavo1@gmail.com";
  password: string = "61f1505846071772";
  authString: string = `${this.login}:${this.password}`;
  authEncode: string = btoa(this.authString);
  authToken = `Basic ${this.authEncode}`;
  address = "https://api.dataforseo.com/v3/";

  constructor(private http: HttpClient) {}

  getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", this.authToken);
    return headers;
  }

  getKeywords(url) {}

  getTraffic(url) {
    let headers = this.getHeaders();
    let endpoint = "traffic_analytics/similarweb/live";
    let body = [
      {
        target: url
      }
    ];
    let address = this.address + endpoint;

    return new Promise((resolve, reject) => {
      this.http
        .post(address, body, { headers: headers })
        .subscribe((data: any) => {
          let audience = data.tasks[0].result[0].audience;
          console.log(data.tasks[0].result[0]);
          // data is already a JSON object
          console.log(audience);
          resolve(audience);
        });
    });
  }

  getLocations() {
    let headers = this.getHeaders();
    let endpoint = "dataforseo_labs/locations_and_languages";

    let address = this.address + endpoint;

    return new Promise((resolve, reject) => {
      this.http.get(address, { headers: headers }).subscribe((data: any) => {
        let locations = data.tasks[0].result;
        // data is already a JSON object
        resolve(locations);
      });
    });
  }

  getRankedKeyowrds(url, language) {
    try {
      let headers = this.getHeaders();
      let endpoint = "dataforseo_labs/ranked_keywords/live";
      let body = [
        {
          target: url,
          language_name: language,
          limit: 20
          /* filters: [
          ["keyword_data.keyword_info.search_volume", "<>", 0],
          "and",
          [
            ["ranked_serp_element.serp_item.type", "<>", "paid"],
            "or",
            ["ranked_serp_element.is_paid", "=", false]
          ]
        ] */
        }
      ];

      let address = this.address + endpoint;
      return new Promise((resolve, reject) => {
        this.http
          .post(address, body, { headers: headers })
          .subscribe((data: any) => {
            let keywordData = data.tasks[0].result[0].items;
            console.log(keywordData);
            resolve(keywordData);
          });
      });
    } catch (e) {
      throw e;
    }
  }
  getKeywordIdeas(keyword, language, location) {
    let headers = this.getHeaders();
    let endpoint = "dataforseo_labs/keyword_ideas/live";

    var keywords = keyword.split(" ");
    let keywordIdeaBody = [
      {
        keywords,
        location_name: location,
        language_name: language,
        limit: 5
      }
    ];
    let address = this.address + endpoint;
    return new Promise((resolve, reject) => {
      this.http
        .post(address, keywordIdeaBody, { headers: headers })
        .subscribe((data: any) => {
          console.log(data);
          let keywordIdeas = data.tasks[0].result[0].items;
          console.log(keywordIdeas);
          resolve(keywordIdeas);
        });
    });
  }
}
