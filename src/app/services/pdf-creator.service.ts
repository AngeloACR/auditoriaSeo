import { Injectable } from "@angular/core";
import {
  fondo,
  analiticaWeb1,
  analiticaWeb2,
  seo1,
  seo2,
  seo3,
  pagespeedLogo,
  serpLogo
} from "../../environments/environment.prod";
import jspdf from "jspdf";
import html2canvas from "html2canvas";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  Montserrat: {
    normal: "Montserrat-Regular.otf",
    bold: "Montserrat-Bold.otf",
    italics: "Montserrat-Italic.otf",
    bolditalics: "Montserrat-BoldItalic.otf"
  }
};
@Injectable({
  providedIn: "root"
})
export class PdfCreatorService {
  cover: any;
  body: any;
  farewell: any;

  constructor() {}

  async generatePdf(name, site) {
    const documentDefinition = await this.getDocumentDefinition(name, site);
    pdfMake.createPdf(documentDefinition).open();
  }

  getCover(site) {
    let contact = this.getContactInfo("contactStyle");
    let cover = {
      stack: [
        { text: "Auditoría", style: "header" },
        { text: "Posicionamiento Orgánico", style: "subheader" },
        {
          table: {
            headerRows: 1,
            widths: ["*"],
            body: [
              [
                {
                  text: site,
                  style: "siteheader"
                }
              ]
            ]
          },
          layout: {
            //hLineWidth: function(i, node) {
            //  return (i === 0 || i === node.table.body.length) ? 2 : 1;
            //},
            //vLineWidth: function(i, node) {
            //  return (i === 0 || i === node.table.widths.length) ? 2 : 1;
            //},
            hLineColor: function(i, node) {
              return "white";
            },
            vLineColor: function(i, node) {
              return "white";
            },
            paddingLeft: function(i, node) {
              return 5;
            },
            paddingRight: function(i, node) {
              return 5;
            },
            paddingTop: function(i, node) {
              return 5;
            },
            paddingBottom: function(i, node) {
              return 5;
            },
            hLineWidth: function(i, node) {
              return 3;
            },
            vLineWidth: function(i, node) {
              return 3;
            }
          }
        },
        contact
      ],
      style: "coverStyle",
      pageBreak: "after"
    };
    return cover;
  }

  getInfoPage() {
    let pageInfo = [
      {
        stack: [
          { text: "El SEO", style: "infoHeader" },
          { text: "Concepto básicos\n\n", style: "infoSubheader" },
          {
            text: [
              "El ",
              { text: "SEO", bold: true },
              ", o en español ",
              { text: "Posicionamiento Orgánico", bold: true },
              ", son un conjunto de técnicas preparadas por especialistas que hacen que tu sitio web aparezca en los primeros resultados en Google, todo esto de forma natural. \n\nEl ",
              { text: "SEO", bold: true },
              " ayudará al sitio web de tu empresa a escalar puestos poco a poco en los buscadores (Como Google) y con esto, las visitas a tu sitio aumentarán respectivamente."
            ],
            style: "infoContent"
          }
        ]
      },
      {
        stack: [
          { text: "\nSus Beneficios", style: "infoHeader" },
          { text: "En qué te puede ayudar\n\n", style: "infoSubheader" },
          {
            text: [
              "Que tu sitio web aparezca en los primeros resultados de ",
              { text: "Google", bold: true },
              ", significa que estás actuando frente a tus competidores. Al posicionar palabras claves sobre tu negocio o producto, haces que las personas que necesitan y buscan lo que ofrece tu negocio sea encontrado a la primera. Entonces, estar bien posicionado significa mayores visitas en tu sitio web, y mejores ventas de tu servicio o producto. El posicionamiento orgánico es identificado como una de las mejores estrategias de ",
              { text: "Marketing Digital", bold: true },
              ". Para el 2021 solo las ",
              {
                text:
                  "empresas inteligentes estarán invirtiendo en estas técnicas de generación de contenido",
                bold: true
              },
              ", y posteriormente generación de clientes potenciales."
            ],
            style: "infoContent"
          }
        ]
      },
      {
        stack: [
          { text: "\nTiempos", style: "infoHeader" },
          { text: "Cuánto toma posicionarte\n\n", style: "infoSubheader" },
          {
            text: [
              "Estrategias naturales, tiempos naturales. El ",
              { text: "SEO", bold: true },
              " es la mejor inversión en Marketing a mediano y largo plazo. El tiempo que toma posicionar tu sitio depende de muchos factores, pero entre los más importantes es el sector de tu empresa y quienes son tu competencia. Nuestro trabajo garantiza primeras posiciones, con ayuda de esfuerzo y algo de tiempo. La mayoría de las veces se necesita al menos ",
              { text: "6 meses", bold: true },
              " para ver resultados buenos, y un año o más para resultados óptimos."
            ],
            style: "infoContent"
          }
        ]
      }
    ];

    return pageInfo;
  }

  getContactInfo(style) {
    let wsImg = new Image();
    let mailImg = new Image();
    let logoImg = new Image();
    wsImg.src = "../../assets/icon-ws.png";
    mailImg.src = "../../assets/icon-mail.png";
    logoImg.src = "../../assets/logo.png";

    let wsIcon =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAyCAYAAAATIfj2AAAACXBIWXMAAAsTAAALEwEAmpwYAAABNmlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjarY6xSsNQFEDPi6LiUCsEcXB4kygotupgxqQtRRCs1SHJ1qShSmkSXl7VfoSjWwcXd7/AyVFwUPwC/0Bx6uAQIYODCJ7p3MPlcsGo2HWnYZRhEGvVbjrS9Xw5+8QMUwDQCbPUbrUOAOIkjvjB5ysC4HnTrjsN/sZ8mCoNTIDtbpSFICpA/0KnGsQYMIN+qkHcAaY6addAPAClXu4vQCnI/Q0oKdfzQXwAZs/1fDDmADPIfQUwdXSpAWpJOlJnvVMtq5ZlSbubBJE8HmU6GmRyPw4TlSaqo6MukP8HwGK+2G46cq1qWXvr/DOu58vc3o8QgFh6LFpBOFTn3yqMnd/n4sZ4GQ5vYXpStN0ruNmAheuirVahvAX34y/Axk/96FpPYgAAACBjSFJNAAB6JQAAgIMAAPn/AACA6AAAUggAARVYAAA6lwAAF2/XWh+QAAADiElEQVR42uyaSWgUQRSGv5gRY5RxiwExKoILiAd3jYLRKLge3BEUQdxuBrwE9ODJDRTxILiBwRxcEPTg7sF9i2NEQcREEcUFRSOSUXHL76UOLtM93dXVE5D5YS7z6lXVP1X1v3qvpkAS/xPa8J8hTyhPKMdIxNRvJ2AUMB4YApQBSaAd8BVIAy+A+8AV4CbQ5GLgAscqVw4sAOYCvUL4vQJOAIeAC5FmIMnFZ5CkQ5JaFB2nJA21nYsLMuskfZRbfJa0RVIil4S6SjqseHFaUo8w87I9QyXASXPw48YDYAbwLC5R6AqcBUbkUI0fAZONMjqNQwXAnhyTARgI1BrZd0porZHkTPhmpHenGfyzY1ITgA0uZXugpLTH4X0uqfyv9otiEIlvkka7UrljHoO0SJrm4XM9BlJXJbWJSmiUT9Cs9fFbGJOce/2Agc/QEiMI/+xYYJeP3wngdQwisTSKKCSBOR62ZqDRxzcNHI+B0DSgpy2hcqCHh63JkPJDjVlJl+gIVNoSGp9l9Yqz+Pfy2K5RMdGW0FAfW2egj4+9G7AppmA7yJZQWZbAPN3HtgvoHxOhblFEwQ+rTIaaSQEbY7wOJW0JdQiwgtUehNYDF2Mi1NaWUDpAmypgZIbvvwOLTQrgGj9sCX0K0KYYOAKUZrC9BKYCKQ/fY2aFUyEJNdteTs+FuJIckVTg0U8XSTV/td/9mz1hLrSpgGPdsr3LbQ95z9qUpb+pku5IuiipMIM9IWm5pIdZxqm1JTTH4vJYlaXPQknFWdqUSmrwGWOZLaFSSU0WpNY4qCht9ej7i6S+trftt8BpCxXaBmyOI9YA54GnUVLwA5YTqgaOAgMs6+7jPGz7o6bghZKuRUjI3ktaLSkZYrtVefRVL6mtixS83OzdKHgiaZuk4T7jtJe00cP/p6RKl4XGkz6X0TBoAeqAc8AN4I3JccaY7Hiwh98+YIWrQmMCuOszWNy4B1QAH13V5YZ55SA5wEtgfjYyYQnNb6UXvxfA7KCpSNAJFgGzWoFMPTAJuB1G64NgNNDPx/7TMREBe00hpCFs8AqCmRm+ewjsMFWhsQ4TuTpgCrAyyJmxDaxnTBxISdogqUJSuwztZko6KOlDyPj0yZSa59m82tnEod5Ad7OngziUmTJThVHGEpPKF5lMsxl4Z959LgOXgMcultf1K3irI/9PkjyhPKE8oT/wawC23pBR36kS9QAAAABJRU5ErkJggg==";
    let mailIcon =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNmlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjarY6xSsNQFEDPi6LiUCsEcXB4kygotupgxqQtRRCs1SHJ1qShSmkSXl7VfoSjWwcXd7/AyVFwUPwC/0Bx6uAQIYODCJ7p3MPlcsGo2HWnYZRhEGvVbjrS9Xw5+8QMUwDQCbPUbrUOAOIkjvjB5ysC4HnTrjsN/sZ8mCoNTIDtbpSFICpA/0KnGsQYMIN+qkHcAaY6addAPAClXu4vQCnI/Q0oKdfzQXwAZs/1fDDmADPIfQUwdXSpAWpJOlJnvVMtq5ZlSbubBJE8HmU6GmRyPw4TlSaqo6MukP8HwGK+2G46cq1qWXvr/DOu58vc3o8QgFh6LFpBOFTn3yqMnd/n4sZ4GQ5vYXpStN0ruNmAheuirVahvAX34y/Axk/96FpPYgAAACBjSFJNAAB6JQAAgIMAAPn/AACA6AAAUggAARVYAAA6lwAAF2/XWh+QAAALA0lEQVR42sQZaVCUV7Lf+46Z75vhmwOj2VUECSoem92k3DJbrFVmS4irAQQlkWBkk1oVQaPLgtGYY1NmB0EOr5iTqDESFbkZBP2RH2s22eySlCYVFRPMUeZAnXEGmOO73v6AGYdhDqho0lVTUzN9vn79+vXrRosWLURwCwgAoIDvUBCJ5nbgAgGF4CM4SIjvGwf8DofDUXDBEAoXTiYOsmGETXSI1UCIbxgHLlBOJNmRZIbzuN/6sYQEjANHxhlu4WSjUAYHbkekmAo2IFKcQ5SYjGRUqDgP5fVRnoYwjOF+QzhvRFMcISRQtJ2lgxWqqgqEEEBoiIcQAhgjUNWh/4ZwQzJ9dIQQcgs3mg9jDIqiAMYYCBlS5aMPlD3MNyxLJQhhQAj5cT6gEhMT/P8QQkCn0wHLaghFDTHodDqQJBkEQQBFUUAQDIAQAoqi/DiDQQBJkkCv1wPAEI7neZBlGQTBAKLoBZPJBKqqgkajAZbVACEEYmJiQJIkiImJAUIIsCwLWq0WEEJ+fSzLIlmWEfJ5CoDQvvBQVRW8Xi9JS1scm5WVbaEoCgYHBymj0SjbbDbaaDSSwcFBleM4CgAkl8vNGI1G6caN67TZbFZv3nSAVquhCCGS1+tlBUGQbDYbHRsbq9rtdjAYjEgUvYqiKDTH8ZLT6WBMJpNis9lRTIweeb1ehRDC8DwvOZ1OJjZ2Avnhh+8HamvfeOH8+XMOlmURxpj4Ux4hBDQaDUEIQWdnh/2+++6/mJqaVu3bgbi4qWGP/eTJkwEAYMqUuFG4qVPjo/KH4vNBff2x1R9/3O0UBAEwpogkiRghpFKJiQng8XggP/+J3yQlTZ/S3f2/7z744N8fGo2m3uTkWVnwCwAhxGOx7Mg4ceJYA8/r4MUXd9yn1XK/+uyz89/TNIOwz9MOx83k9euLmpYty5rh8XigpqbyiNXaXggA0s9psCzLA1VVu1Y1NTWeEgQDPPPMczNTUha0CIKQoCjqiJQHMTEGBwBM3bJlW+fSpenTXS4XVFWVv9LY2FD0M9rsra7eter48XcbDAYDbN26fUZqaloXAMR5vV7P8GEk2Jc1nE4HHk5F00pKtlhXrnxsZn//ALz88t432tpaCn6OkCgre2l5c3NTC8YI1qxZNys1Nc0KAPHDO+DP4z5DQaPR+lOfVqudXlS0sT0zc1nSwIATdu+ufu3UKesGAFDvXEhUrGptbbEihCAx8Z4pDz74p0YASPLR8LzOvz6/pwGIEihIq9UmFReXduXkrJzR398PO3daXrZa29bciZCoqCh79OTJ+gaMMcTHx0/dtau6c9Kku5MDiZxOBxXoaYQQAq/XywRL43k+sbBwY9uKFY/MEkURqqp2vWW1tv81wnU+LlAUxWWx7Fje3t7WQVEUxMfHTy0r29U2ZUrcnGBao9EoBdceoNPpxVCCeZ6fUVJS2pqZuSzJ4/FAebmltqOjfQMAKLchS+T5QiIuLm5yeXmVNT4+/t5Q9E6nkwmu8sDhuMmGU4AxlbRly7ZT6ekZyR6PF3butBxobKz/KaEiVVSUPdrQUN/s83BlZU1nXFzc3HAMPK+TfBuMA9wvR9KCMU4qKXm6NTs7e4YkibB//76Dzc2Na8frcUVRBisqynJaW5s7EEKQkJDgC4m5kflk2lf40QHux9EUMgwzvaRkS4eqqosbGxu+2Ldv9xsIITkzM+sVANBE41dV1V1TU5V/4sTxFrPZDHl5jycuXrykddKkSXPGwKv4PO03muO4MXmKppl7iotLT2u12szGxpOfVlaWH3S5XM7c3LzjAEBFConycktOc3OTNSYmBkpLt/42NTWtCQCmjUWvTqfzRfKtlKeq6phzsFarnbZuXWFZQsI0TAjA66+/0nDs2NEVoiheDUXvdru/tlheymptbbZyHAc8z+N58+btHKvBQ2fO4X/YUomJCUiWZUhOnpX8wAN/eGyMMi4dPFj75Pvvn71GURQghODs2X9d/Oqrr47p9XqvVstpaJq+8eOPP3x7/fr11yyWlwq6ujo+MRpNgBACt9tN+vr6Pl2wYMFDGGPTWBT29PQc7u7+by/DMOCrp8FoNIpjNXjv3pq0urqj3yCEoLi49OGBgf7Burqj73V1dXz30UcfbhcEw/YJE2Kpq1evKoQQuHatDyZMuAuee+4fKXa77e6qqsqGzs6O8wjB4u3bn++gaTopmtJr1/rYUS0Eu93OjMHgzw8c2P9wXd0731AUDYWFRRk5OY/UA4A8Y8bMMqu17fClSxe/tdlscOPGdYWmaRAEAe6/f96vN2/+e+7s2bNfAABOkuTH9u6tqe/qOnVZVdX0rVu3N3McNzOSYoPB4Et5/pcLmEwmOZqHDxzYn37oUO0ViqJh7dqCJXl5q08CAAMAbErKH3ekpKQU22y2s729vf8RRdHFMAybmJi4UBAM8xmG8YdBVlb2uwAg1dRUNnd2nrqIEF5WWvp0u06nuyeccrfbzQwfxBGexmMJCYqiYcOGTZl5eaveGTY48FFuMptj083m2PQoDqCysrLrMMb5VVUV9V1dHRdlWXpo27ZnT+t0usQw94Qy6nIZSilhQ+LPQyFBQUFB4ZK8vFV1AKD/iaUHl5GReWTTpuIsntfB6dOdX9bUVC4ZGBi4HIqYZVnku1ywr+UgiiIJFxIHD9ZeQQjB2rUFS/Lzn2gEAP52FEwIIc3y5StOFBZuyNTrY6ClpenS7t3VD7tcrivBtAMDA8FNQQSqqgZfDBf27KlOe/vtg70Mw8BTT/0tOz//ieNjufnGCfTy5Tl1mzcXrxQEAzQ1NfSUlf0zTZKky0FVnhJYTxMAAhzHBb4FP3/11QP+LFFQULg0Nzfv6G0IibD1UEbGskMFBUVZRqMRzpzp+sJi2ZHh9Xr8htvtdnpEPQ2AwOl0+vJgz759e5a89dabvRhTsH79hozVq//SAADaO/zi0uTkPHKsuLhkhUajAau1/aLFsmOpLMtf3kp5t9piBIDAxIkTNQDQu2/fnsV1dUe+pmkaNm7clJ2bm3f4DoREOGCXLk0/LEkSs3t39btnzpy+rCjqkmefff6MqiqmEW0xWVbgrrsmaq9c6T1SW/v6ZYwpWLNm3eLHH88/cbsO3TiASU6elcnz/Lnu7u5Lly/33BgcHHxPUZTvL1y4cJ2maYQWLVqICCGIYRjV5XIBQggVFW3My8l59Aj8wmC1tj1ZU1N1yPcSZxgG+UtThBCRJAkRQmD+/PnC3Ln3/r6n59KbAAi53S7FZDKhvr4+bDabZYfDwXIc71VVhZEkSdbr9djhcCCz2azcvHmT1uv1kiiKrKqqMs/z2G63g8lkUu12Oy0Iguj1ehmEkKzRaKj+/n5iMpmJ3W6jjEaj5HA4WJZlJYqiaLfbhWbPnvO7WbPmCOfOfeLQaDT+bgFatGjhiF4wxhgwxoQQAhRFg9frAb1eD06nEziOA1EUAWMKMEYgSRJotVpwu91+HE0PHXJJkoDjOBgcHACO48Hj8QDDMMNlsAIsqwG32w08P4TTaDQgiqLvsQEez5Bel8uFghrv6iijfT3qWz1mDKqqDveW1RGkCCE/TlXVUX3k0fwkJC64tx0om6KoUY17OtRsA+ORZYiPEaHRDxMfLpTwABoEACR4UUF8kXARB0UQZWAzFhwZ50wmmmyINigaz6AHxrngSGO28Sx0zIOiSB2laFOvaIOi8Sw0oqfDbRuKMq5DYfgjyUZBn6jjQRxlkqqG8A6JMK4L5gtFGwrn+6hh9I6g//8A7IsBrI21LGEAAAAASUVORK5CYII=";
    let logo =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdcAAABaCAYAAADq3RxzAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNmlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjarY6xSsNQFEDPi6LiUCsEcXB4kygotupgxqQtRRCs1SHJ1qShSmkSXl7VfoSjWwcXd7/AyVFwUPwC/0Bx6uAQIYODCJ7p3MPlcsGo2HWnYZRhEGvVbjrS9Xw5+8QMUwDQCbPUbrUOAOIkjvjB5ysC4HnTrjsN/sZ8mCoNTIDtbpSFICpA/0KnGsQYMIN+qkHcAaY6addAPAClXu4vQCnI/Q0oKdfzQXwAZs/1fDDmADPIfQUwdXSpAWpJOlJnvVMtq5ZlSbubBJE8HmU6GmRyPw4TlSaqo6MukP8HwGK+2G46cq1qWXvr/DOu58vc3o8QgFh6LFpBOFTn3yqMnd/n4sZ4GQ5vYXpStN0ruNmAheuirVahvAX34y/Axk/96FpPYgAAACBjSFJNAAB6JQAAgIMAAPn/AACA6AAAUggAARVYAAA6lwAAF2/XWh+QAAAQG0lEQVR42uyd743iOhfGz6y2gWwJ2RKyQnxFypTAlBBKgBKgBFLCUMJE4itClxKGEjYl8H4YW3h5Y+f4X+Iwz09C9+pehiSOfZ5z7OPjl9vtRgAAAAAIxw80AQAAAABxBQAAACCuAAAAAMQVAAAAABBXAAAAAOIKAAAAQFwBAAAAAHEFAAAAIK4AAAAAxBUAAAAAEFcAAAAA4goAAABAXAEAAACIKwAAAAAgrgAAAADEFQAAAIC4AgAAAADiCgAAAEBcAQAAAIgrAAAAACCuAAAAwLD8HPsGZvMF3gIA4DuSiw8RUYPmGJ7z6YjIFQAAnoSKiD7F50N8bkS0V8QWTByIKwAADMfeIKIVEf1HRAWaCeIKAADfgRvjUzIi1qrnOxkRvaO5Ia4AAAB4LJnfyxlCDRLnZ2L3U4hPTvepka5F/6v4XAiJAAA8I4UQmEz8e0b/Tpe2YvxLu3AV/2wTfqbS8vlh2yCuXuT0NVWypP7F/K7O2RLRQXzQGQGYLqWwA0shpiYyxR6odqERnzpBoW0Zz6V+F0yYl9vtNsqFZ/NFQURbCjv90RDRDiILwOREdR3YFrTCFoQSWY6hfO2xPe/Enxr+LaJxEJGn2oozmy+y2Xyxp6+suDLCIP0Qop2h6wCQNDndt6KEtgWZsAOfQrhToGZ+7wBhReTqEq2+0zB7uS7Ck8T0Shg+NG28QdMAB6qBneCGiN487EGIyFU+9z7ifYJEItfB1lxn8wV3MF0Vz+360FllUoP8lIbfK4QgQGDDzQoAEILtCNFkSV+zZW90T4QaK3pt6D4NriZrHiyiW5A4g4irENZ9z9cOSsfT0dI9YUH1BNeaaBgCC0Ba7Kl/r2cscsUejCmwVyJaoSs8N9HXXMVUsElY5fTtG7klItX0tfi/0QjoBa8ZgGQi1mrke8iEwKLMIJiuuM7mC9mRTcL4h8Jk9+46PNKN8BARtQIwLktymwo+iHH8SkQvyue3cMh3ZJ/8gypIIDqxp4X3pF8T3ZxPx13gU3FkFPwuhPuAVwzA6GTUvyzU5SzXBuGUORlSfJciMuZGpIUQ+x1eT1RkboxaEESleXiXo2ZJz+aLnO41F3Iias+n41tS4jqbL+SG8M6I9Xw6xurUrRBYAEAa2GQFX8kt6UgWkrFJltqOYNBdso45xfxr8l/Hzehr61LWE8D8YfyOrKNsUxhoS/cCIIeIbdyoGiFmWHX36zyrGnNaWNfBL+fTMdXF/K5i3B8J/34u2nkvfufz4bf/E/99L77HOW2j1NynzXdDPJ+MLLZ03wv5t+PZtsxB/MiH5n5jrMV9BGqXpdIej+/6U2kPToWjoZAV2DhIw+2TJ7GxFJk1pQ8ng7gK8M45/aZmtOen5SzCo015F305+ulAs/liKWzJNvTY/xnphkvSb914I+CL9LL6Ol+hiexTLRdpUwqz6PB8ORnn6ndLjYEJOatSaK5zsGiTNcPwyWms8sEQuqxJDuFkd0WsobL6a7oXkeCMpbHbiPM8nOi/8uy7fe+qNYirnPpfBnpmWRBoQ/G2J0XNXI8VuZqmg1F5xE98ZCTq6tXJKRAZ/ZQJPZesppN79LsP4flyPPDrAJFMpRGSmvGeZIUh16hEHsq9HymSzSyMV+jEQ5syqNUExn4d+TlKxrgzCetHQGF9FOwY7yf6lrChxRXJA34RUOiSkTmNP324jiDyUmRdpriygINO91s1812HEvqxDuHmGlvubIMtq8D3mbq4+hxVt3S8BymsMftWaCEshnCogk8LiynhLqN2QNTqZaQ5YnF9iMaKnr+RVWFUWo2h051I1Lc+1vf/ucZAfbaC0Ray1OZrj7FYd/xWRWGmoipNm9U99815166zA677yV2jIW6UGQOZgbpktE1Bae+J5z7L0uH9ctbFdYlfPrNoNshkpxAaMkhAEWPNtXA0ssDcsTKDQPStn5bivSwf3s9O8566BOlm8V0bdqRfk2zENS4GQ1IaDEPZI5Ry/bnq6MNlABFaa56r9RBWGeU9nl0qj2CTWfqZxqhIh2OI8cgR1wvFXe/kCJK819RtFOdZKtIX1PGJWg+av+NG/Y3Sd9uHSJuzFCSniCezEyTGtHBhaFzg5mXpIqA/9DX11TA69k58//Who4+NGj23wjD8EhFW3WPwDuL5TRmmfVOrOw+D02fkMovrSeHLDM/6Szxvl0C3Snv89rhOyEiZc43Ye9FtEsdSh7ttqHLoq5youcvp76MVffK1o9/K3IPfzJmikuLmiDTC/ryJ+30ljxmsGJFr54A6n46IXMM6KxtHT1tGPSkdybcR97NyjGIu4m+7oj65KfzQYziWHQbHJ4t0bWkcTd77ynKQSyflSt3FG2QGcswTjXKLdzeEA1cGut+xqRmiZpM1zMnMrzXX4LTZiungrJhCv44QFBzoq6hR0BmUoSJXCGt4cfVdE0ypJKTchuHTuS8Gg1I4GA+f6FWXeVkbDPs6kLA+Xm/lIOYx+23Xux+if4W63xTElePYcCO8yvGanL/bWc5McJzrMnC/rc+n41uMfKAY4polbsjB81I7Gs5G4wC6ZutWGvFvLKJc6VHXAdqktrzu0I5VCtfIJtLHW2af4DiGHBGuO+x3zhhTLbklqm0CPRtrRiNmQaMf9Fyo1XzUz5RpEzaMKbbVRWNEXITZZVtOrhn8tYOxCDXwN5GNFBgWTjTI2RvtGrWWzHtsHZ+t7+9CzTJE3Rr6bOKqFolWP1PGlKhTEeA4I1xxbQM4MWvLaEO3da2mcDM+rcF5KNFlJkdDvKW2qidS77Mfukx9jrj5LAX2OQ8hxPVKkRM6YyQ0tR3GIsN48BLXa4dAyNT0Nd0zf7G27e/JbjuEmbstJ9NEgzsHQxF64DcaY1rQuFnjOcWfGuY4V1Nbuqqp/6QhU2KTTx1h7ppnOeL7DBH9Jyeul45GLQj4sCH9+ZP5gyCoRzhJz3NqhqOkf2vyDhVd6TIxK6YAVYYo1CTIoT1/m9+L5fhy7z8VcZ2aYypPAOqrN61zDPuiVtNsC8ee7yM/v2/Rj+hr/TGmhTsN+Wy+gMD6DSTu+pssnCDXn//Svb5sytPIGd1LIcrTXYae1tcZFM52BZ3B6pveLQYa/FcPQxnTeA1hF8qA95sKPolNJbln0Md0yGztxRD9MylxvQw8RfBdqOlrc7NLp5DlzfZCbNeU1lS9rKUb/Ngnx3bmCufj/7fZfvPsXJkzJrGTqpYW9ztFm8Bx+DKHNvmu/Rbi+o0j2N/E35it8/jkaSspzCbIkn+pbOLXbZnpy77sMljffR28Yb7/mO++DHivKTow3OUKdfy71hEGY4rr+XRsNB5rOZsvcjR50ChWlgnckH1R64zCn7Ljgu44NLlP7lU4FC/MTxOofbvaa2kw4KWj938xiE5oJ8bm+kOJK1G8bWXcg9qvE3aCuNtyuv7d9TdTEN7k39ePgV/4d96bGUPEZD3ZRxF6pfshw30DYT9im+gOfL/QV71gF6chVP+1Oet1qTFAB+Y7HFNc28jtyO0HMcbHPvB9pupo940PtViEax1hW3FdWTjELp/kkzSHFtcq8cSma0QjN+Rzy0L9soj7H8M7yWm8YgK6Y+x8SyGGYNdjpPqio53FuxpTXGNOh3KTbkwzGK6sLQR76uuL3MQm1zrCLn3m2y8DRhFXMTXcJBgpuYhrFsjQjVkN50L36eOxhb/vuq6VXWI4iK0myup7r61FNHQxXCfUMorOAeCcxxvDSdHdY6hzbGW2fKjIL3W4U8OuFZlcItclTecwhElFrqZBVczmi1QF9hJJGDmp72N6uGPdW+44cG1/M2TUpRoNuX2oq53bAO9lG+hZtiNGbFeL68is8cLzWW3sy46mD7eNXeoI2ziej/gcbRgqqHk+cRXRq2l6OEWBvRi8Pp9Oksqzho4IU6u8FTLaM4lPpQitbdEIm+ssyX9vcmVwDoeaDrU5vDsnt21ZS/rKgF9b3tezZMUeIvZ3V6ekcBRYuYPgY8oCG7u28MowqKTAZol10FYjIi6dJKMw20wqCpMMVlo6FSqNZhD4PNvFIFwuQr8N3B90EUHVE7VeHa6jM1Y+xT8qg2Pnc1ati1NnewiBLCjyTt0JTzJXYKt8L7fse88Qtarj0/fIRpslAm6UWwpnqWKO4bUyeyEDk0mWz40qrufTUSanmAb/B4VZ/F4G8nJ2hk5iI5Ql+U9xqYZmq3jmLp3NJD6cQaUbuFvGdW3ENXdwJOR0YoxBeDDMRuQBIwiT2O0tnTt5f3sHMY/puO4cx/VejL2b8pGC6nIubUtfOQjPRj3g39ocKZeLdygrxclks1K837V4l3877ImMYicnsC+32y36RWbzhcmDVgdfTfbZi0vqT+V/sRShz56XWdO9oH6j/F0hPjZC3/Q4IGuNgB0Ub7PpEZ7SIMpX+soo5rTzu+HddU2xySSKjeYepcPSxYbhHWdKVN83+F48ujDXSZJbiFzhGBI5Rh73k2cPBiszGMVXGm+f4NhlOF2fn2MoXxn2K9TvuNouXZv8cmzPUMGRr510auPz6ThtcbUQWGnspXC0D50sVz4F8U52cDGsJiHxmXahDiNt6jS2g6WrrUIO5M+e31QzX0vmM76Tfk1QZt0+bvJXnZiuv8kCiyu3767Ifx0zpqc+trCqsx1j7Hm/iojV5fmnIK6uzsuOeIeU62zUUGujNfGWF76XuAqBlQvcQ6Voy7Uel6k6rkHlCuurePbSQlxL8su4Cy0Gpkizj9+k3+oUanDKKH4dWFw5jgV3BoArsKHHiY+wxEBulxlquq8Rz++a1DcVcZVLJCHGZmoCy7VXSYjroIeln09HOW02RJZiLTrNwePvQxQzOIjfaR0NQoz2ujr+bkPmJDUT655oqhmxnbn9wef/2zoJfyjcumgtfi+lknHynmLX9G1FVBazb6TExbJNQ1RAk2N4F/EdrmhixT5+DH3B8+nYnk/HVSCDahLVVYDBJMXNJWVfRqRvnvdxFc/yS9zHxXPgyapNF4/2tZ1arMk87SQH54rcMm1XAdqZ8wyt4f7rCAZlI95V7fhsIcdCDK7ivcewBWr7PVNWMNfRDOU0ujgxIZ24WAFGdAadFu5CFPOXe/FyjxfQeBghLrpDvGWlG/lPXW3arsV/m4V6dRqmpPvac6a5HymoV4pTo7dU2kS9D/WgdpcTNgr6txj+4/ptq3jol44IuSsB7CXA8+rWs7hrQb4slbZ+XFO/PrR7M8FITSZjcXMpdA7kIYItmMq0sOQvow1DLmV09VX5cXVmD47t8P3WXDXi2mVU1eocqtFuHsTjQvrycQCA6VIoDmRO/1+xR3UgG8WBhC1ICzUQKDts+qjv8anFFQAAAHg2fqAJAAAAAIgrAAAAAHEFAAAAIK4AAAAAgLgCAAAAEFcAAAAA4goAAAAAiCsAAAAAcQUAAAAgrgAAAACAuAIAAAAQVwAAAADiCgAAAEBcAQAAAABxBQAAACCuAAAAAMQVAAAAABBXAAAAAOIKAAAAPB//GwAl2K4iljIQwAAAAABJRU5ErkJggg==";

    let contactInfo = {
      stack: [
        {
          columns: [
            { image: wsIcon, width: 30, style: "contactimage" },
            { text: "+34 653 84 98 70", style: "contacttext" }
          ]
        },
        {
          columns: [
            { image: mailIcon, width: 30 },
            { text: "gustavo@santiagodev.com", style: "contacttext" }
          ]
        }
      ]
    };

    let contactLogo = {
      stack: [
        { image: logo, width: 200 },
        { text: "Gustavoliver.com", style: "contactlogotext" }
      ],
      style: "contactlogo"
    };

    return {
      columns: [contactInfo, contactLogo],
      style: style
    };
  }

  mobileData: any;
  desktopData: any;
  keywordIdeas: any;
  rankedKeywords: any;
  traffic: any;
  setMobileData(mobileData) {
    this.mobileData = mobileData;
  }
  setDesktopData(desktopData) {
    this.desktopData = desktopData;
  }
  setTrafficData(data) {
    this.traffic = data;
  }
  setRankedKeywordsData(data) {
    this.rankedKeywords = data;
  }
  setKeywordsIdeasData(data) {
    this.keywordIdeas = data;
  }

  async getBase64Data(data) {
    let aux = await html2canvas(data);
    return aux.toDataURL("image/png");
  }

  async getPageSpeedDesktopContent() {
    console.log("desktop content");
    let desktop = await this.getBase64Data(this.desktopData.ring);
    let opportunities = [];
    let mejoras = this.desktopData.mejorasDesktop;
    let maxOpportunities = 8;
    let i = 0;
    let max = Math.min(maxOpportunities, mejoras.length);
    while (i < max) {
      let aux;
      if (mejoras[i].displayValue) {
        aux = {
          text: `${mejoras[i].title}: ${mejoras[i].displayValue}.\n\n`,
          style: "pagespeedOpportunity"
        };
        opportunities.push(aux);
      }
      i++;
    }
    let data = {
      stack: [
        { text: "Optimización On-Page", style: "infoHeader" },
        {
          text: "Velocidad de carga para Móviles y Escritorio\n",
          style: "infoSubheader"
        },
        {
          text:
            "El primer requisito de Google para posicionar un sitio web, es que su carga deba ser rápida. Si esto no sucede, el algoritmo de Google no tomará muy en cuenta su sitio. Google estima en 1,5 segundos el tiempo medio óptimo que una página debería tardar en vargarse.\n\n",
          style: "pagespeedInfoText"
        },
        {
          text: "Análisis en Escritorio\n\n",
          style: "pagespeedTitle",
          bold: true
        },
        {
          columns: [
            {
              text: `Rendimiento general\n\n`,
              style: "pagespeedTitle",
              alignment: "left"
            },
            {
              text: `Detalle de carga\n\n`,
              style: "pagespeedTitle",
              alignment: "right",
              margin: [0, 0, 30, 0]
            }
          ]
        },
        {
          columns: [
            { image: desktop, width: 100, margin: [20, 0, 0, 0] },
            {
              stack: [
                {
                  text: `Primer renderizado con contenido: ${this.desktopData.firstContentfulPaintDesktop}.\n\n`,
                  style: "pagespeedInfo"
                },
                {
                  text: `Renderizado del contenido mas largo: ${this.desktopData.largestContentfulPaintDesktop}.\n\n`,
                  style: "pagespeedInfo"
                },
                {
                  text: `Tiempo hasta que el sitio esté interactivo: ${this.desktopData.interactiveDesktop}.\n\n`,
                  style: "pagespeedInfo"
                },
                {
                  text: `Índice de velocidad: ${this.desktopData.speedIndexDesktop}.\n\n`,
                  style: "pagespeedInfo"
                }
              ],
              style: "pagespeedInfoBox"
            }
          ]
        },
        {
          text: "Oportunidades de mejora\n\n",
          style: "pagespeedTitle",
          bold: true
        },
        {
          stack: opportunities,
          style: "pagespeedOpportunityBox"
        },

        {
          text: [
            "Las oportunidades son recomendaciones técnicas que deberían mejorarse en la web, para disminuir su tiempo de carga. Al optimizar la velocidad de carga, ",
            { text: "Google", bold: true },
            " tomará mejor en cuenta tu sitio web.\n\n"
          ],
          style: "pagespeedFooterText"
        }
      ],
      pageBreak: "after"
    };
    return data;
  }

  async getPageSpeedMobileContent() {
    console.log("mobile content");
    let mobile = await this.getBase64Data(this.mobileData.ring);
    let opportunities = [];
    let mejoras = this.mobileData.mejorasMobile;
    let maxOpportunities = 8;
    let i = 0;
    let max = Math.min(maxOpportunities, mejoras.length);
    while (i < max) {
      let aux;
      if (mejoras[i].displayValue) {
        aux = {
          text: `${mejoras[i].title}: ${mejoras[i].displayValue}.\n\n`,
          style: "pagespeedOpportunity"
        };
        opportunities.push(aux);
      }
      i++;
    }
    let data = {
      stack: [
        { text: "Optimización On-Page", style: "infoHeader" },
        {
          text: "Velocidad de carga para Móviles y Escritorio\n",
          style: "infoSubheader"
        },
        {
          text:
            "Otro factor importante es la velocidad de carga en teléfonos inteligentes. Si la velocidad es menor a 2 segundos, está en buen rango.\n\n",
          style: "pagespeedInfoText"
        },
        {
          text: "Análisis en Móvil\n\n",
          style: "pagespeedTitle",
          bold: true
        },
        {
          columns: [
            {
              text: `Rendimiento general\n\n`,
              style: "pagespeedTitle",
              alignment: "left"
            },
            {
              text: `Detalle de carga\n\n`,
              style: "pagespeedTitle",
              alignment: "right",
              margin: [0, 0, 30, 0]
            }
          ]
        },
        {
          columns: [
            { image: mobile, width: 100, margin: [20, 0, 0, 0] },
            {
              stack: [
                {
                  text: `Primer renderizado con contenido: ${this.mobileData.firstContentfulPaintMobile}.\n\n`,
                  style: "pagespeedInfo"
                },
                {
                  text: `Renderizado del contenido mas largo: ${this.mobileData.largestContentfulPaintMobile}.\n\n`,
                  style: "pagespeedInfo"
                },
                {
                  text: `Tiempo hasta que el sitio esté interactivo: ${this.mobileData.interactiveMobile}.\n\n`,
                  style: "pagespeedInfo"
                },
                {
                  text: `Índice de velocidad: ${this.mobileData.speedIndexMobile}.\n\n`,
                  style: "pagespeedInfo"
                }
              ],
              style: "pagespeedInfoBox"
            }
          ]
        },
        {
          text: "Oportunidades de mejora\n\n",
          style: "pagespeedTitle",
          bold: true
        },
        {
          stack: opportunities,
          style: "pagespeedOpportunityBox"
        },

        {
          text: [
            { text: "PageSpeed Insights", bold: true },
            " es un software de ",
            { text: "Google ", bold: true },
            "que hace un estudio de tu sitio web en versión escritorio y móvil, y te ofrece la oportunidad de mejora cumpliendo los criterios recomendados.\n\n"
          ],
          style: "pagespeedFooterText"
        }
      ],
      pageBreak: "after"
    };
    return data;
  }

  async getTrafficContent() {
    console.log(this.traffic);
    let textContent = "";
    if (this.traffic.noTraffic) {
      textContent =
        "No pudimos recabar datos del tráfico de tu sitio porque tiene menos de 5000 visitas mensuales. Para mejorar esto, implemente estrategias de SEO que le permitan mejorar su posicionamiento en la red";
    } else {
      let time = this.traffic.tiempoEnSitio.split(":");
      textContent = `Su sitio tiene un tráfico de ${this.traffic.trafico} usuarios al mes. y se queda en el sitio un tiempo aproximado de ${time[1]} minutos con ${time[2]} segundos.\n\n`;
    }
    let data = {
      stack: [
        { text: "Tráfico mensual", style: "infoHeader" },
        {
          text: "Cantidad de usuarios que visitaron la página el último mes\n",
          style: "infoSubheader"
        },
        {
          text: textContent,
          style: "pagespeedInfoText"
        },
        {
          text: "Analíticas de nuestros clientes\n",
          style: "pagespeedTitle",
          bold: true
        },
        {
          text: [
            "Desarrollo web y posteriormente ",
            { text: "Estrategias SEO", bold: true },
            " desde cero, en el lapso de 1 año, se alcanzaron más de 26,000 visitantes por día, todo de manera orgánica y natural."
          ],
          style: "pagespeedInfoText",
          margin: [0, 10, 0, 0]
        },
        {
          image: analiticaWeb1,
          width: 400,
          alignment: "center",
          margin: [0, 10, 0, 10]
        },
        {
          text: [
            { text: "Estrategias SEO", bold: true },
            " desde cero, en el lapso de 5 meses, se alcanzaron más de 1,300 visitantes por día, todo de manera orgánica y natural."
          ],
          style: "pagespeedInfoText",
          margin: [0, 40, 0, 0]
        },
        {
          image: analiticaWeb2,
          width: 400,
          alignment: "center",
          margin: [0, 10, 0, 10]
        }
      ],
      pageBreak: "after"
    };
    return data;
  }

  async getRankedKeywordsContent() {
    console.log(this.rankedKeywords);
    let body = [];
    let header = [];
    header.push({
      text: "Palabra clave\n\n",
      style: "planHeader",
      fillColor: "#29352f"
    });
    header.push({
      text: "Posición\n\n",
      style: "planHeader",
      fillColor: "#29352f"
    });
    let textContent;
    let data;
    if (this.rankedKeywords.keywords && this.rankedKeywords.keywords.length) {
      body.push(header);
      let length = Math.min(this.rankedKeywords.keywords.length, 10);
      for (let i = 0; i < length; i++) {
        let aux = [];
        aux.push({
          text: `${this.rankedKeywords.keywords[i].keyword}`,
          style: "keywordInfo",
          fillColor: "#29352f"
        });
        aux.push({
          text: `${this.rankedKeywords.keywords[i].ranking}`,
          style: "keywordInfo",
          fillColor: "#29352f"
        });
        body.push(aux);
      }
      data = {
        stack: [
          { text: "Palabras posicionadas", style: "infoHeader" },
          {
            text: "Palabras clave que posicionaron tu sitio\n",
            style: "infoSubheader"
          },
          {
            layout: "noBorders",
            table: {
              headerRows: 1,
              widths: [200, 200],
              body: body
            },
            style: "keywordTable"
          }
        ],
        pageBreak: "after"
      };
    } else {
      textContent =
        "Este sitio no cuenta con keywords posicionadas, por lo que hay que analizar las estrategias que se estan usando y evaluar opciones para mejorarla. Póngase en contacto con nosotros y con gusto lo ayudaremos a escalar su posicionamiento a un nivel superior.\n\n";
      data = {
        stack: [
          { text: "Palabras posicionadas", style: "infoHeader" },
          {
            text: "Palabras clave que posicionaron tu sitio\n",
            style: "infoSubheader"
          },
          {
            text: textContent,
            style: "pagespeedInfoText"
          }
        ],
        pageBreak: "after"
      };
    }

    return data;
  }

  async getKeywordIdeasContent() {
    console.log(this.keywordIdeas);

    let body = [];
    let header = [];
    let data;
    let textContent;
    if (this.keywordIdeas.keywords && this.keywordIdeas.keywords.length) {
      header.push(
        {
          text: "Palabras \n\n",
          style: "planHeader",
          fillColor: "#29352f"
        },
        {
          text: "claves \n\n",
          style: "planHeader",
          fillColor: "#29352f"
        }
      );
      body.push(header);
      let length = this.keywordIdeas.keywords.length;
      for (let i = 0; i < 24; i += 2) {
        let aux = [];
        aux.push({
          text: `${this.keywordIdeas.keywords[i]}`,
          style: "keywordInfo",
          fillColor: "#29352f"
        });
        aux.push({
          text: `${this.keywordIdeas.keywords[i + 1]}`,
          style: "keywordInfo",
          fillColor: "#29352f"
        });
        body.push(aux);
      }
      data = {
        stack: [
          { text: "Ideas de Palabras Claves", style: "infoHeader" },
          {
            text: "Deberías posicionarlas\n",
            style: "infoSubheader"
          },
          {
            layout: "noBorders",
            table: {
              headerRows: 1,
              widths: [200, 200],
              body: body
            },
            style: "keywordTable"
          },
          {
            text:
              "Según nuestro estudio, estas son algunas de las palabras clave que deberías estar posicionando. Es un análisis preliminar, pero nos da una idea de lo que trata tu negocio y hacia dónde debería enfocarse.\n\n",
            style: "ideasInfoText"
          }
        ],
        pageBreak: "after"
      };
    } else {
      textContent =
        "Este sitio no cuenta con keywords posicionadas, por lo que no podemos sugerirle palabras adecuadas para posicionarlo, y necesitamos mas información del sitio. Póngase en contacto con nosotros y juntos pensaremos en palabras claves que le ayuden a escalar.\n\n";
      data = {
        stack: [
          { text: "Palabras posicionadas", style: "infoHeader" },
          {
            text: "Palabras clave que posicionaron tu sitio\n",
            style: "infoSubheader"
          },
          {
            text: textContent,
            style: "pagespeedInfoText"
          }
        ],
        pageBreak: "after"
      };
    }
    return data;
  }

  getFarewell() {
    let contact = this.getContactInfo("contactFarewellStyle");
    let cover = {
      stack: [{ text: "¡Muchas Gracias!", style: "farewell" }, contact],
      style: "coverStyle"
    };
    return cover;
  }

  async getDocumentDefinition(name, site) {
    let fondoImg = new Image();
    fondoImg.src = "../../assets/fondo.jpg";
    let fondo1 = fondo;

    let fondo2 = fondo;

    let content = [
      this.getCover(site),
      {
        stack: [
          {
            columns: [
              { text: "El SEO", style: "infoHeader", alignment: "left" },
              {
                image: seo1,
                width: 70,
                margin: [-370, -20, 0, 0]
              }
            ]
          },
          { text: "Conceptos básicos\n\n", style: "infoSubheader" },
          {
            text: [
              "El ",
              { text: "SEO", bold: true },
              ", o en español ",
              { text: "Posicionamiento Orgánico", bold: true },
              ", son un conjunto de técnicas preparadas por especialistas que hacen que tu sitio web aparezca en los primeros resultados en Google, todo esto de forma natural. \n\nEl ",
              { text: "SEO", bold: true },
              " ayudará al sitio web de tu empresa a escalar puestos poco a poco en los buscadores (Como Google) y con esto, las visitas a tu sitio aumentarán respectivamente."
            ],
            style: "infoContent"
          }
        ]
      },
      {
        stack: [
          {
            columns: [
              {
                text: "\nSus Beneficios",
                style: "infoHeader",
                alignment: "left"
              },
              {
                image: seo2,
                width: 70,
                margin: [-260, 15, 0, -30]
              }
            ]
          },
          { text: "En qué te puede ayudar\n\n", style: "infoSubheader" },
          {
            text: [
              "Que tu sitio web aparezca en los primeros resultados de ",
              { text: "Google", bold: true },
              ", significa que estás actuando frente a tus competidores. Al posicionar palabras claves sobre tu negocio o producto, haces que las personas que necesitan y buscan lo que ofrece tu negocio sea encontrado a la primera. Entonces, estar bien posicionado significa mayores visitas en tu sitio web, y mejores ventas de tu servicio o producto. El posicionamiento orgánico es identificado como una de las mejores estrategias de ",
              { text: "Marketing Digital", bold: true },
              ". Para el 2021 solo las ",
              {
                text:
                  "empresas inteligentes estarán invirtiendo en estas técnicas de generación de contenido",
                bold: true
              },
              ", y posteriormente generación de clientes potenciales."
            ],
            style: "infoContent"
          }
        ]
      },
      {
        stack: [
          {
            columns: [
              { text: "\nTiempos", style: "infoHeader", alignment: "left" },
              {
                image: seo3,
                width: 70,
                margin: [-335, 17, 0, -30]
              }
            ]
          },
          { text: "Cuánto toma posicionarte\n\n", style: "infoSubheader" },
          {
            text: [
              "Estrategias naturales, tiempos naturales. El ",
              { text: "SEO", bold: true },
              " es la mejor inversión en Marketing a mediano y largo plazo. El tiempo que toma posicionar tu sitio depende de muchos factores, pero entre los más importantes es el sector de tu empresa y quienes son tu competencia. Nuestro trabajo garantiza primeras posiciones, con ayuda de esfuerzo y algo de tiempo. La mayoría de las veces se necesita al menos ",
              { text: "6 meses", bold: true },
              " para ver resultados buenos, y un año o más para resultados óptimos."
            ],
            style: "infoContent"
          }
        ],
        pageBreak: "after"
      },
      await this.getPageSpeedDesktopContent(),
      await this.getPageSpeedMobileContent(),
      await this.getTrafficContent(),
      await this.getRankedKeywordsContent(),
      await this.getKeywordIdeasContent(),
      {
        stack: [
          { text: "Planes de SEO", style: "infoHeader" },
          { text: "Resultados Garantizados\n\n", style: "infoSubheader" },
          {
            columns: [
              {
                layout: "noBorders",
                table: {
                  headerRows: 1,
                  widths: [200],
                  body: [
                    [
                      {
                        text: ["PLAN ", { text: "ORO\n\n", bold: true }],
                        style: "planHeader",
                        fillColor: "#aade63"
                      }
                    ],
                    [
                      {
                        text: "Indexación en Google\n\n",
                        style: "planInfo",
                        fillColor: "#aade63"
                      }
                    ],
                    [
                      {
                        text: "SEO en Homepage\n\n",
                        style: "planInfo",
                        fillColor: "#aade63"
                      }
                    ],
                    [
                      {
                        text: "SEO en páginas de servicios\n\n",
                        style: "planInfo",
                        fillColor: "#aade63"
                      }
                    ],
                    [
                      {
                        text: "Diseño de Blog Dinámico\n\n",
                        style: "planInfo",
                        fillColor: "#aade63"
                      }
                    ],
                    [
                      {
                        text:
                          "Redacción y subida de cuatro artículos semanales de 1200 palabras (Originales)\n\n",
                        style: "planInfo",
                        fillColor: "#aade63"
                      }
                    ],
                    [
                      {
                        text: "SEO en todos los artículos\n\n",
                        style: "planInfo",
                        fillColor: "#aade63"
                      }
                    ],
                    [
                      {
                        text:
                          "Análisis de Tráfico con Jetpack y Google Analytics\n\n",
                        style: "planInfo",
                        fillColor: "#aade63"
                      }
                    ],
                    [
                      {
                        text: "Análisis de Palabras Claves de competencia\n\n",
                        style: "planInfo",
                        fillColor: "#aade63"
                      }
                    ],
                    [
                      {
                        text: "Carga ultra rápida de la web\n\n",
                        style: "planInfo",
                        fillColor: "#aade63"
                      }
                    ],
                    [
                      {
                        text: "3,500 MXN/Mes\n\n",
                        style: "planPrice",
                        fillColor: "#29352f"
                      }
                    ]
                  ]
                }
              },
              {
                layout: "noBorders",
                table: {
                  headerRows: 1,
                  widths: [200],
                  body: [
                    [
                      {
                        text: ["PLAN ", { text: "VIP\n\n", bold: true }],

                        style: "planHeader",
                        fillColor: "#aade63"
                      }
                    ],
                    [
                      {
                        text: "Indexación en Google\n\n",
                        style: "planInfo",
                        fillColor: "#aade63"
                      }
                    ],
                    [
                      {
                        text: "SEO en Homepage\n\n",
                        style: "planInfo",
                        fillColor: "#aade63"
                      }
                    ],
                    [
                      {
                        text: "SEO en páginas de servicios\n\n",
                        style: "planInfo",
                        fillColor: "#aade63"
                      }
                    ],
                    [
                      {
                        text: "Diseño de Blog Dinámico\n\n",
                        style: "planInfo",
                        fillColor: "#aade63"
                      }
                    ],
                    [
                      {
                        text:
                          "Redacción y subida de ocho artículos semanales de 1200 palabras (Originales)\n\n",
                        style: "planInfo",
                        fillColor: "#aade63"
                      }
                    ],
                    [
                      {
                        text: "SEO en todos los artículos\n\n",
                        style: "planInfo",
                        fillColor: "#aade63"
                      }
                    ],
                    [
                      {
                        text:
                          "Análisis de Tráfico con Jetpack y Google Analytics\n\n",
                        style: "planInfo",
                        fillColor: "#aade63"
                      }
                    ],
                    [
                      {
                        text: "Análisis de Palabras Claves de competencia\n\n",
                        style: "planInfo",
                        fillColor: "#aade63"
                      }
                    ],
                    [
                      {
                        text: "Carga ultra rápida de la web\n\n",
                        style: "planInfo",
                        fillColor: "#aade63"
                      }
                    ],
                    [
                      {
                        text: "6,500 MXN/Mes\n\n",
                        style: "planPrice",
                        fillColor: "#29352f"
                      }
                    ]
                  ]
                },
                margin: [20, 0, 0, 0]
              }
            ],
            style: "planBox"
          },
          {
            text: [
              "* Si cancelas un plan por un año, obtienes un ",
              { text: "descuento especial", bold: true },
              ", favor solicitar más información"
            ],
            style: "infoFooter"
          }
        ],
        pageBreak: "after"
      },
      this.getFarewell()
    ];

    return {
      content: content,
      info: {
        title: name,
        author: "Auditoria SEO",
        subject: "REPORTE",
        keywords: "REPORTE, CONTROL, SEO, AUDITORÍA"
      },
      pageSize: "LETTER",
      background: function(currentPage, pageSize) {
        if (currentPage == 1) {
          return {
            image: fondo1,
            width: pageSize.width,
            height: pageSize.height
          };
        } else if (currentPage == 9) {
          return {
            image: fondo2,
            width: pageSize.width,
            height: pageSize.height
          };
        }
      },
      footer: function(currentPage, pageCount) {
        if (currentPage == 3) {
          let data = {
            columns: [
              { text: "Fuente: ", fontSize: 20, margin: [300, 0, 0, 0] },
              {
                image: pagespeedLogo,
                width: 150,
                margin: [0, 0, 30, 0],
                alignment: "right"
              }
            ]
          };
          return data;
        } else if (currentPage == 4) {
          let data = {
            columns: [
              { text: "Fuente: ", fontSize: 20, margin: [300, 0, 0, 0] },
              {
                image: pagespeedLogo,
                width: 150,
                margin: [0, 0, 30, 0],
                alignment: "right"
              }
            ]
          };
          return data;
        } else if (currentPage == 6) {
          let data = {
            columns: [
              { text: "Fuente: ", fontSize: 20, margin: [300, 0, 0, 0] },
              {
                image: serpLogo,
                width: 150,
                margin: [0, 0, 30, 0],
                alignment: "right"
              }
            ]
          };
          return data;
        } else if (currentPage == 7) {
          let data = {
            columns: [
              { text: "Fuente: ", fontSize: 20, margin: [300, 0, 0, 0] },
              {
                image: serpLogo,
                width: 150,
                margin: [0, 0, 30, 0],
                alignment: "right"
              }
            ]
          };
          return data;
        }
      },
      defaultStyle: {
        font: "Montserrat"
      },
      styles: {
        header: {
          fontSize: 50,
          bold: true,
          alignment: "left",
          color: "white",
          margin: [0, 240, 40, 0]
        },
        subheader: {
          fontSize: 28,
          bold: true,
          margin: [0, 0, 0, 30],
          alignment: "left",
          color: "#29352f"
        },
        siteheader: {
          fontSize: 20,
          bold: true,
          alignment: "center",
          color: "white"
        },
        coverStyle: {
          margin: [60, 0, 40, 0]
        },
        contactStyle: {
          margin: [-50, 244, 10, 0]
        },
        contactFarewellStyle: {
          margin: [-50, 315, 10, 0]
        },
        contacttext: {
          fontSize: 14,
          bold: true,
          alignment: "left",
          margin: [10, 3, 0, 0],
          color: "white"
        },
        contactlogo: {
          margin: [50, -10, 0, 0]
        },
        contactlogotext: {
          fontSize: 18,
          bold: true,
          alignment: "right",
          margin: [0, 0, 20, 0],
          color: "#29352f"
        },

        farewell: {
          fontSize: 42,
          bold: true,
          alignment: "center",
          color: "white",
          margin: [0, 280, 20, 0]
        },

        infoHeader: {
          fontSize: 28,
          alignment: "left"
        },
        infoSubheader: {
          fontSize: 23,
          bold: true
        },
        infoContent: {
          fontSize: 12
        },
        planHeader: {
          color: "white",
          bold: false,
          fontSize: 25,
          alignment: "center",
          margin: [0, 20, 0, 0]
        },
        planInfo: {
          margin: [10, 0, 0, 0]
        },
        pagespeedInfoText: {
          margin: [0, 10, 0, 0],
          alignment: "justify"
        },
        ideasInfoText: {
          margin: [0, 50, 0, 0],
          alignment: "justify"
        },
        pagespeedTitle: {
          fontSize: 16,
          bold: true
        },
        pagespeedInfo: {
          alignment: "right",
          bold: false,
          margin: [0, 0, 30, 0]
        },
        pagespeedInfoBox: {
          margin: [10, 0, 0, 20]
        },
        pagespeedOpportunity: {
          bold: true,
          fontSize: 10,
          alignment: "justify"
        },
        pagespeedFooterText: {
          margin: [0, 40, 0, 0]
        },
        planPrice: {
          color: "white",
          bold: true,
          fontSize: 20,
          alignment: "center",
          margin: [0, 30, 0, 0]
        },
        planBox: {
          margin: [30, 10, 0, 0]
        },
        infoFooter: {
          margin: [0, 30, 0, 0]
        },
        keywordTable: {
          margin: [40, 20, 60, 0]
        },
        keywordInfo: {
          color: "white",
          alignment: "center",
          height: 30,
          margin: [0, 5, 0, 5]
        }
      }
    };
  }

  getValuesObject(fields, values) {
    let titleRow = [];
    let widths = [];
    let titleContent = [];
    let wLength = fields.length;
    for (let i = 0; i < wLength; i++) {
      widths.push("*");
    }
    fields.forEach(field => {
      let aux = {
        text: field,
        style: "tableHeader"
      };
      titleRow.push(aux);
    });

    values.forEach(value => {
      let aux = [];
      value.forEach(item => {
        let auxb = {
          text: item,
          style: "tableContent"
        };
        aux.push(auxb);
      });
      titleContent.push(aux);
    });
    return {
      table: {
        widths: widths,
        body: [titleRow, ...titleContent]
      }
    };
  }
}
