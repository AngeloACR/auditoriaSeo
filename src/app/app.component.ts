import { Component } from "@angular/core";
import { PagespeedService } from "./services/pagespeed.service";
import { DataforseoService } from "./services/dataforseo.service";
import { PdfCreatorService } from "./services/pdf-creator.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray
} from "@angular/forms";
import { setupTestingRouter } from "@angular/router/testing";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";

//https://docs.dataforseo.com/v3/traffic_analytics/similarweb/live/?php
//https://documenter.getpostman.com/view/2812008/SzKPVMH4#bcbe37e6-b8b2-4e27-9df0-e515a9e5b806
//https://developers.google.com/speed/docs/insights/v5/get-started#javascript
//https://developers.google.com/speed/docs/insights/v5/reference/pagespeedapi/runpagespeed#response

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  dominio: FormGroup;
  isPagespeedReady: boolean;
  isTrafficReady: boolean;
  isMainKeywordsReady: boolean;
  isKeywordsIdeasReady: boolean;
  puntuacionDesktop: number;
  firstContentfulPaintDesktop: string;
  largestContentfulPaintDesktop: string;
  interactiveDesktop: string;
  mejorasDesktop: any;
  speedIndexDesktop: any;
  puntuacionMobile: number;
  firstContentfulPaintMobile: string;
  largestContentfulPaintMobile: string;
  interactiveMobile: string;
  mejorasMobile: any;
  speedIndexMobile: any;
  tiempoEnSitio: any;
  toggled: any[];
  trafico: number;
  mainKeywords: any;
  keywordsIdeas: any;
  isLoading: boolean = false;
  isTrafficData: boolean = false;
  isMainKeywordsData: boolean = false;
  isKeywordsIdeasData: boolean = false;
  loadMessage: string;
  noTraffic: string;
  noMainKeywords: string;
  noKeywordsIdeas: string;
  constructor(
    private pagespeed: PagespeedService,
    private dataforseo: DataforseoService,
    private pdf: PdfCreatorService
  ) {}

  ngOnInit() {
    this.initForm();
    this.initAccordion();
    this.getLocations();
    this.dismissData();
  }

  locations: any;

  async getLocations() {
    this.isLoading = false;
    this.loadMessage = "Configurando las opciones";
    this.isLoading = true;
    this.locations = await this.dataforseo.getLocations();
    this.isLoading = false;
  }

  initAccordion() {
    this.toggled = [
      {
        toggled: {
          toggled: false
        }
      },
      {
        toggled: {
          toggled: false
        }
      },
      {
        toggled: {
          toggled: false
        }
      },
      {
        toggled: {
          toggled: false
        }
      },
      {
        toggled: {
          toggled: false
        }
      }
    ];
  }

  toggle(e, index) {
    this.toggled[index] = !this.toggled[index];
  }

  loaders: any = [
    {
      loadingMessage: "Determinando el rendimiento de tu sitio",
      isLoading: false
    },
    {
      loadingMessage: "Midiendo el trafico mensual",
      isLoading: false
    }
  ];

  triggerLoad(index) {
    this.dismissLoaders();
    this.loaders[index].isLoading = true;
  }

  dismissLoaders() {
    this.loaders.forEach(loader => {
      loader.isLoading = false;
    });
  }

  dismissData() {
    this.isPagespeedReady = false;
    this.isTrafficReady = false;
    this.isMainKeywordsReady = false;
    this.isKeywordsIdeasReady = false;
  }

  initForm() {
    this.dominio = new FormGroup({
      url: new FormControl("", Validators.required),
      http: new FormControl("", Validators.required),
      location: new FormControl("", Validators.required),
      language: new FormControl("", Validators.required)
    });
  }

  getUrl() {
    let url = this.dominio.value.url;
    let http = this.dominio.value.http;

    let aux = {
      url,
      http
    };
    return aux;
  }

  async analyzeUrl() {
    try {
      this.dismissData();
      let auxUrl = this.getUrl();
      let url = auxUrl.url;
      let http = auxUrl.http;

      let location = this.dominio.value.location;
      let language = this.dominio.value.language;
      if (!location) {
        location = "Argentina";
        console.log(location);
      }
      if (!language) {
        language = "Spanish";
        console.log(language);
      }
      if (http == "") http = "http://";

      await this.pagespeedAnalysis(url, http);
      await this.trafficAnalysis(url, http);
      await this.rankedKeywordAnalysis(url, language);
      await this.keywordIdeasAnalysis(this.mainKeywords, language, location);

      this.isLoading = false;
    } catch (error) {
      console.log(error.toString());
      this.isLoading = false;
    }
  }

  async pagespeedAnalysis(url, http) {
    try {
      let urlPageSpeed = this.fixUrlForPagespeed(url, http);

      this.isLoading = false;
      this.loadMessage = "Midiendo rendimiento en escritorio";
      this.isLoading = true;
      let desktopMetrics: any = await this.pagespeed.getInsights(
        urlPageSpeed,
        "desktop"
      );

      this.puntuacionDesktop = desktopMetrics.performance.score;
      this.firstContentfulPaintDesktop =
        desktopMetrics.performance.firstContentfulPaint;
      this.largestContentfulPaintDesktop =
        desktopMetrics.performance.largestContentfulPaint;
      this.interactiveDesktop = desktopMetrics.performance.interactive;
      this.speedIndexDesktop = desktopMetrics.performance.speedIndex;

      this.mejorasDesktop = desktopMetrics.loadOpportunities;

      this.isLoading = false;
      this.loadMessage = "Midiendo rendimiento en móvil";
      this.isLoading = true;
      let mobileMetrics: any = await this.pagespeed.getInsights(
        urlPageSpeed,
        "mobile"
      );

      this.puntuacionMobile = mobileMetrics.performance.score;
      this.firstContentfulPaintMobile =
        mobileMetrics.performance.firstContentfulPaint;
      this.largestContentfulPaintMobile =
        mobileMetrics.performance.largestContentfulPaint;
      this.interactiveMobile = mobileMetrics.performance.interactive;
      this.speedIndexMobile = mobileMetrics.performance.speedIndex;

      this.mejorasMobile = mobileMetrics.loadOpportunities;
      this.isPagespeedReady = true;
      this.isLoading = false;
    } catch (error) {
      throw error;
    }
  }

  getDesktopResponse() {
    let auxScore = document.getElementById("desktopScore");
    let score = auxScore.cloneNode(true);
    let desktopResponse = {
      ring: auxScore,
      puntuacionDesktop: this.puntuacionDesktop,
      firstContentfulPaintDesktop: this.firstContentfulPaintDesktop,
      largestContentfulPaintDesktop: this.largestContentfulPaintDesktop,
      interactiveDesktop: this.interactiveDesktop,
      speedIndexDesktop: this.speedIndexDesktop,
      mejorasDesktop: this.mejorasDesktop
    };
    return desktopResponse;
  }

  getMobileResponse() {
    let auxScore = document.getElementById("mobileScore");
    let score = auxScore.cloneNode(true);
    let mobileResponse = {
      ring: auxScore,
      puntuacionMobile: this.puntuacionMobile,
      firstContentfulPaintMobile: this.firstContentfulPaintMobile,
      largestContentfulPaintMobile: this.largestContentfulPaintMobile,
      interactiveMobile: this.interactiveMobile,
      speedIndexMobile: this.speedIndexMobile,
      mejorasMobile: this.mejorasMobile
    };
    return mobileResponse;
  }

  async trafficAnalysis(url, http) {
    try {
      let urlDataforseo = this.fixUrlForDataforseo(url);

      this.isLoading = false;
      this.loadMessage = "Midiendo el tráfico mensual";
      this.isLoading = true;

      let audience: any = await this.dataforseo.getTraffic(urlDataforseo);
      console.log("Mostrando trafico mensual de la pagina");
      let timeAux = audience.time_on_site_avg;
      this.trafico = audience.visits;
      if (this.trafico != 0) {
        this.tiempoEnSitio = timeAux;
        this.isTrafficData = true;
      } else {
        this.isTrafficData = false;
        this.noTraffic =
          "No pudimos recabar datos del tráfico de tu sitio porque tiene menos de 5000 visitas mensuales. Para mejorar esto, implemente estrategias de marketing que le permitan mejorar su posicionamiento en la red";
      }

      this.isTrafficReady = true;

      this.isLoading = false;
    } catch (error) {
      throw error;
    }
  }

  getTrafficAnalysisResponse() {
    let tiempoEnSitio;
    let noTraffic;
    let trafficResponse;
    if (this.trafico != 0) {
      trafficResponse = {
        trafico: this.trafico,
        tiempoEnSitio: this.tiempoEnSitio
      };
    } else {
      this.noTraffic =
        "No pudimos recabar datos del tráfico de tu sitio porque tiene menos de 5000 visitas mensuales. Para mejorar esto, implemente estrategias de marketing que le permitan mejorar su posicionamiento en la red";
      trafficResponse = {
        noTraffic: this.noTraffic
      };
    }
    return trafficResponse;
  }

  async rankedKeywordAnalysis(url, language) {
    try {
      let urlDataforseo = this.fixUrlForDataforseo(url);

      this.isLoading = false;
      this.loadMessage = "Determinando posicionamiento de las palabras clave";
      this.isLoading = true;
      this.mainKeywords = [];
      this.noMainKeywords =
        "Este sitio no cuenta con keywords posicionadas, por lo que hay que analizar las estrategias que se estan usando y evaluar opciones para mejorarla. Póngase en contacto con nosotros y con gusto lo ayudaremos a escalar su posicionamiento a un nivel superior.";
      let keywordData: any = await this.dataforseo.getRankedKeyowrds(
        urlDataforseo,
        language
      );
      console.log("Mostrando palabras clave");
      let maxKeywords = 15;
      if (keywordData && keywordData.length != 0) {
        maxKeywords = Math.min(maxKeywords, keywordData.length);
        for (let i = 0; i < maxKeywords; i++) {
          let keyword = keywordData[i].keyword_data.keyword;
          let ranking =
            keywordData[i].ranked_serp_element.serp_item.rank_absolute;
          let aux = {
            keyword,
            ranking
          };
          this.mainKeywords.push(aux);
        }
        this.isMainKeywordsData = true;
      } else {
        this.isMainKeywordsData = false;
      }

      console.log("keywords ranked");
      this.isMainKeywordsReady = true;

      this.isLoading = false;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  getMainKeywordsResponse() {
    let mainKeywordsResponse = {
      keywords: this.mainKeywords
    };

    return mainKeywordsResponse;
  }

  async keywordIdeasAnalysis(keywords, language, location) {
    try {
      this.isLoading = false;
      this.loadMessage = "Determinando ideas de palabras clave";
      this.isLoading = true;
      this.noKeywordsIdeas =
        "Este sitio no cuenta con keywords posicionadas, por lo que no podemos sugerirle palabras adecuadas para posicionarlo, y necesitamos mas información del sitio. Póngase en contacto con nosotros y juntos pensaremos en palabras claves que le ayuden a escalar.";
      if (keywords && keywords.length != 0) {
        this.keywordsIdeas = [];
        for (let i = 0; i < keywords.length; i++) {
          let keywordData: any = await this.dataforseo.getKeywordIdeas(
            keywords[i].keyword,
            language,
            location
          );
          let maxKeywords = 30;
          if (keywordData && keywordData.length != 0) {
            maxKeywords = Math.min(maxKeywords, keywordData.length);
            for (let j = 0; j < maxKeywords; j++) {
              this.keywordsIdeas.push(keywordData[j].keyword);
            }
          }
        }

        console.log("Mostrando ideas palabras clave");
        console.log(this.keywordsIdeas);
        this.isKeywordsIdeasData = true;
        console.log("keywords ideas");
      } else {
        this.isKeywordsIdeasData = false;
      }

      this.isKeywordsIdeasReady = true;
      this.isLoading = false;
    } catch (error) {
      throw error;
    }
  }
  getkeywordsIdeasResponse() {
    let mainKeywordsResponse = {
      keywords: this.keywordsIdeas
    };

    return mainKeywordsResponse;
  }

  fixUrlForPagespeed(url, http) {
    return `${http}${url}`;
  }

  fixUrlForDataforseo(url) {
    return `${url}`;
  }

  async generateReport() {
    let auxUrl = this.getUrl();
    let url = `${auxUrl.http}${auxUrl.url}`;

    let pagespeedDesktopResponse = this.getDesktopResponse();
    this.pdf.setDesktopData(pagespeedDesktopResponse);

    let pagespeedMobileResponse = this.getMobileResponse();
    this.pdf.setMobileData(pagespeedMobileResponse);

    let trafficAnalyticsResponse = this.getTrafficAnalysisResponse();
    this.pdf.setTrafficData(trafficAnalyticsResponse);

    let mainKeyordsResponse = this.getMainKeywordsResponse();
    this.pdf.setRankedKeywordsData(mainKeyordsResponse);

    let keywordsIdeasResponse = this.getkeywordsIdeasResponse();
    this.pdf.setKeywordsIdeasData(keywordsIdeasResponse);

    await this.pdf.generatePdf(name, url);
  }
}
