import { Component, OnInit, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-progress-ring",
  templateUrl: "./progress-ring.component.html",
  styleUrls: ["./progress-ring.component.scss"]
})
export class ProgressRingComponent implements OnInit {
  @Input() percentage: number;
  @Input() id: number;
  score: number;
  constructor(private sanitize: DomSanitizer) {}

  ngOnInit() {
    let number = this.percentage;
    let score = this.percentage * 100;
    let color = "";
    this.score = Math.round(score * 100) / 100;
    if (this.score <= 49) {
      color = "red";
    } else if (this.score >= 50 && this.score <= 89) {
      color = "yellow";
    } else if (this.score >= 90) {
      color = "aade63";
    }
    // let sanitizedColor = this.sanitize.bypassSecurityTrustStyle(color);
    var circles: any = document.querySelectorAll("circle");
    var circle = circles[this.id];
    circle.style.stroke = color;
    if (circles.length) var length = circles.length;
    var radius = circle.r.baseVal.value;
    var circumference = radius * 2 * Math.PI;

    circle.style.strokeDasharray = `${circumference}px ${circumference}px`;
    circle.style.strokeDashoffset = `0`;
    let offset = circumference - number * circumference;
    offset = Math.round(offset * 100) / 100;

    circle.style.strokeDashoffset = `${offset}px`;
  }
}
