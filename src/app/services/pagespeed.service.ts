import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class PagespeedService {
  apiKey: string = "AIzaSyC8fMPm_Lam4wNReDSfCglderMxjyZPyNw";
  myKey: string = `&key=${this.apiKey}`;
  address: string =
    "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?";

  constructor(private http: HttpClient) {}

  getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    return headers;
  }

  getInsights(url, device) {
    try {
      let headers = this.getHeaders();
      let urlString = `url=${url}`;
      let categories =
        "&category=accessibility&category=performance&category=best-practices&category=seo&category=pwa";
      let strategy = `&strategy=${device}`;
      let locale = "&locale=es";
      let address =
        this.address + urlString + locale + categories + strategy + this.myKey;
      return new Promise((resolve, reject) => {
        try {
          this.http
            .get(address, { headers: headers })
            .subscribe((data: any) => {
              // data is already a JSON object

              let lighthouse = data.lighthouseResult;
              let performance = this.getPerformance(lighthouse);
              let loadOpportunities = this.getOpportunities(lighthouse);
              let response = {
                performance,
                loadOpportunities
              };
              resolve(response);
            });
        } catch (error) {
          throw error;
        }
      });
    } catch (error) {
      throw error;
    }
  }

  getPerformance(data) {
    let score = data.categories.performance.score;
    let firstContentfulPaint =
      data.audits["first-contentful-paint"].displayValue;
    let largestContentfulPaint =
      data.audits["largest-contentful-paint"].displayValue;
    let interactive = data.audits["interactive"].displayValue;
    let speedIndex = data.audits["speed-index"].displayValue;

    let performance = {
      score,
      firstContentfulPaint,
      largestContentfulPaint,
      interactive,
      speedIndex
    };
    return performance;
  }

  getOpportunities(data) {
    let auditRefs = data.categories.performance.auditRefs;
    let loadOpportunities = [];
    auditRefs.forEach(auditRef => {
      if (auditRef.group == "load-opportunities") {
        let title = data.audits[auditRef.id].title;
        let displayValue = data.audits[auditRef.id].displayValue;
        let opportunity = {
          title,
          displayValue
        };

        loadOpportunities.push(opportunity);
      }
    });
    return loadOpportunities;
  }
}
