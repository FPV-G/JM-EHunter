// ==UserScript==
// @name         JM-EHunter for 18comic
// @namespace    http://tampermonkey.net/
// @version      2.0.0.18comic.5
// @description  JM-EHunter reader adapted for 18comic, including scrambled-image restoration.
// @supportURL   https://github.com/yourusername/JM-EHunter/issues
// @author       Alex Chen
// @match        https://exhentai.org/*
// @match        https://e-hentai.org/*
// @match        https://nhentai.net/*
// @match        https://18comic.vip/*
// @connect      hath.network
// @connect      nhentai.net
// @connect      githubusercontent.com
// @connect      jp.animesales.xyz
// @connect      cdn-msp.18comic.vip
// @connect      cdn-msp2.18comic.vip
// @connect      cdn-msp3.18comic.vip
// @grant        GM_xmlhttpRequest
// @grant        GM_download
// @grant        unsafeWindow
// @license      MIT
// ==/UserScript==
(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.appendChild(document.createTextNode(`@charset "UTF-8";/* mussy */
.circle-icon-button[data-v-2a2205e2] {
  height: 26px;
  width: 26px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s;
}
.circle-icon-button.big[data-v-2a2205e2] {
  height: 36px;
  width: 36px;
}
.circle-icon-button > svg[data-v-2a2205e2] {
  fill: rgba(255, 255, 255, 0.9);
  height: 18px;
  width: 18px;
  transition: all 0.2s;
}
.circle-icon-button > svg.rotate[data-v-2a2205e2] {
  transform: rotate(90deg);
}
.circle-icon-button > svg.rotate90[data-v-2a2205e2] {
  transform: rotate(90deg);
}
.circle-icon-button > svg.rotate180[data-v-2a2205e2] {
  transform: rotate(180deg);
}
.circle-icon-button > svg.rotateMinus90[data-v-2a2205e2] {
  transform: rotate(-90deg);
}
.circle-icon-button > svg.rotateMinus180[data-v-2a2205e2] {
  transform: rotate(-180deg);
}
.circle-icon-button[data-v-2a2205e2]:hover {
  background: rgba(255, 255, 255, 0.9);
}
.circle-icon-button:hover > svg[data-v-2a2205e2] {
  fill: rgba(0, 0, 0, 0.5);
}
.circle-icon-button[data-v-2a2205e2]:active {
  background: rgba(255, 255, 255, 0.2);
}
.circle-icon-button:active > svg[data-v-2a2205e2] {
  fill: rgba(0, 0, 0, 0.5);
}.popover[data-v-e5801761] {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border-radius: 2px;
  color: black;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 1;
}/* mussy */
div[data-v-da60e7c5] {
  display: flex;
}
.drop-option[data-v-da60e7c5] {
  position: relative;
  justify-content: center;
  align-items: center;
  overflow: visible;
  cursor: pointer;
}
.drop-option > .text[data-v-da60e7c5] {
  margin-left: 7px;
  padding: 3px 5px;
  background: rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  color: white;
  font-size: 14px;
}
.drop-option > .icon-drop-down[data-v-da60e7c5] {
  fill: white;
  height: 18px;
  width: 18px;
  margin-left: 2px;
}
.drop-option .options[data-v-da60e7c5] {
  flex-direction: column;
  transition: all 0.3s ease;
}
.drop-option .options > .item[data-v-da60e7c5] {
  padding: 5px 10px;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.8);
  padding: 7px 11px;
  min-width: 52px;
  transition: all 0.3s ease;
}
.drop-option .options > .item > span[data-v-da60e7c5] {
  transition: all 0.3s ease;
}
.drop-option .options > .item[data-v-da60e7c5]:hover {
  cursor: pointer;
  background: rgba(0, 0, 0, 0.1);
}
.drop-option .options > .item:hover > span[data-v-da60e7c5] {
  color: var(--ehunter-accent-color, #28af60);
  margin-left: 5px;
  margin-right: -5px;
}/* mussy */
.flat-button > a[data-v-e69ed2a2] {
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  transition: all 0.2s ease;
}
.flat-button > .default[data-v-e69ed2a2] {
  padding: 5px 10px;
}
.flat-button.inline[data-v-e69ed2a2] {
  margin-left: 10px;
}
.flat-button > .plain[data-v-e69ed2a2] {
  color: hsl(145, 63%, 42%);
}
.flat-button > .plain[data-v-e69ed2a2]:hover {
  color: hsl(145, 63%, 52%);
}
.flat-button > .plain[data-v-e69ed2a2]:active {
  color: hsl(145, 63%, 32%);
}
.flat-button > .positive[data-v-e69ed2a2] {
  color: hsl(145, 63%, 49%);
}
.flat-button > .positive[data-v-e69ed2a2]:hover {
  color: hsl(145, 63%, 59%);
}
.flat-button > .positive[data-v-e69ed2a2]:active {
  color: hsl(145, 63%, 39%);
}
.flat-button > .negative[data-v-e69ed2a2] {
  color: #AAAAAA;
}
.flat-button > .negative[data-v-e69ed2a2]:hover {
  color: rgb(195.5, 195.5, 195.5);
}
.flat-button > .negative[data-v-e69ed2a2]:active {
  color: rgb(144.5, 144.5, 144.5);
}
.flat-button > .warning[data-v-e69ed2a2] {
  color: #e74c3c;
}
.flat-button > .warning[data-v-e69ed2a2]:hover {
  color: rgb(236.5890410959, 117.6849315068, 105.4109589041);
}
.flat-button > .warning[data-v-e69ed2a2]:active {
  color: rgb(213.698630137, 43.8356164384, 26.301369863);
}/* mussy */
div[data-v-c3d57ccd],
section[data-v-c3d57ccd] {
  display: flex;
}
.ehunter-pagination[data-v-c3d57ccd] {
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}
.ehunter-pagination > span[data-v-c3d57ccd] {
  font-size: 14px;
  line-height: 28px;
  text-align: center;
  color: #c9cacf;
  transition: all 0.3s ease;
}
.ehunter-pagination > span[data-v-c3d57ccd]:hover {
  color: white;
}
.ehunter-pagination > .item[data-v-c3d57ccd] {
  margin: 0 5px;
  width: 28px;
  height: 28px;
  justify-content: center;
  align-content: center;
  border-radius: 6%;
  cursor: pointer;
  user-select: none;
  background: transparent;
  transition: all 0.3s ease;
}
.ehunter-pagination > .item[data-v-c3d57ccd]:hover {
  background: #777777;
}
.ehunter-pagination > .item.active[data-v-c3d57ccd] {
  color: white;
  background: hsl(145, 63%, 49%);
}
.ehunter-pagination > .item > .icon[data-v-c3d57ccd] {
  fill: #c9cacf;
  width: 24px;
}
.ehunter-pagination > .item > .icon[data-v-c3d57ccd]:hover {
  fill: white;
}
.ehunter-pagination > .item.disable[data-v-c3d57ccd] {
  cursor: not-allowed;
}
.ehunter-pagination > .item.disable[data-v-c3d57ccd]:hover {
  background: transparent;
}
.ehunter-pagination > .item.disable > .icon[data-v-c3d57ccd] {
  fill: rgba(201, 202, 207, 0.6);
}
.ehunter-pagination > .item.disable > .icon[data-v-c3d57ccd]:hover {
  fill: rgba(201, 202, 207, 0.6);
}/* mussy */
div[data-v-5a202c7e] {
  display: flex;
}
.slider[data-v-5a202c7e] {
  position: relative;
  width: 200px;
  height: 20px;
  cursor: pointer;
}
.slider > .track[data-v-5a202c7e] {
  position: absolute;
  left: 0;
  height: 2px;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: #bdbdbd;
}
.slider > .fill[data-v-5a202c7e] {
  position: absolute;
  left: 0;
  height: 2px;
  width: 20%;
  top: 50%;
  transform: translateY(-50%);
  background: hsl(145, 63%, 42%);
}
.slider > .thumb[data-v-5a202c7e] {
  position: absolute;
  width: 12px;
  height: 12px;
  top: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: hsl(145, 63%, 49%);
  pointer-events: none;
  transition: width 0.1s ease, height 0.1s ease;
}/* mussy */
div[data-v-ea2849fc] {
  display: flex;
}
.simple-modal[data-v-ea2849fc] {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10030;
  overflow-y: auto;
}
.simple-dialog[data-v-ea2849fc] {
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.simple-dialog > .background[data-v-ea2849fc] {
  flex: 1;
  background: rgba(0, 0, 0, 0.6);
}
.simple-dialog > article[data-v-ea2849fc] {
  display: flex;
  flex-direction: column;
  position: absolute;
  background: white;
  border-radius: 3px;
  min-width: 430px;
  min-height: 110px;
  max-width: 50%;
  max-height: 88%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 19px 22px;
}
.simple-dialog > article > h4[data-v-ea2849fc] {
  box-sizing: border-box;
  font-size: 22px;
  text-align: left;
  margin: 2px 0px;
  padding-bottom: 10px;
  color: #000000;
  font-weight: lighter;
}
.simple-dialog > article > p[data-v-ea2849fc] {
  color: rgba(0, 0, 0, 0.8);
  text-align: left;
  font-size: 16px;
  overflow: auto;
  flex: 1;
}
.simple-dialog > article > .operation-bar[data-v-ea2849fc] {
  flex-direction: row-reverse;
  margin-top: 10px;
  flex-shrink: 0;
}
@media only screen and (max-width: 767px) {
.simple-dialog > article[data-v-ea2849fc] {
    min-width: 280px;
    max-width: 90%;
    padding: 16px 18px;
}
.simple-dialog > article > h4[data-v-ea2849fc] {
    font-size: 18px;
    padding-bottom: 8px;
}
.simple-dialog > article > p[data-v-ea2849fc] {
    font-size: 14px;
}
}input[data-v-ffc66e8a]::-webkit-outer-spin-button,
input[data-v-ffc66e8a]::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0;
  /* <-- Apparently some margin are still there even though it's hidden */
}
input[type=number][data-v-ffc66e8a] {
  -moz-appearance: textfield;
  /* Firefox */
}
div[data-v-ffc66e8a] {
  display: flex;
}
.PopSlider > .content[data-v-ffc66e8a] {
  padding: 7px 10px 7px 15px;
  align-items: center;
}
.PopSlider > .content > .button[data-v-ffc66e8a] {
  margin-left: 8px;
}
.PopSlider > .content > .value[data-v-ffc66e8a] {
  background: transparent;
  border: none;
  width: 30px;
  color: #2ecc70;
  margin-right: 7px;
  font-size: 13px;
  text-align: center;
}
.PopSlider > .content > .value[data-v-ffc66e8a]:focus {
  outline-width: 0;
  color: #222222;
}/* mussy */
div[data-v-c7457182] {
  display: flex;
}
.num-drop-option[data-v-c7457182] {
  position: relative;
}/* mussy */
div[data-v-7622434e] {
  display: flex;
}
.switch[data-v-7622434e] {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 28px;
  height: 20px;
  margin: 0 15px;
  position: relative;
  cursor: pointer;
}
.switch > .track[data-v-7622434e] {
  height: 14px;
  width: 100%;
  border-radius: 30px;
  background: #bdbdbd;
  transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);
}
.switch > .track.active[data-v-7622434e] {
  background: var(--ehunter-switch-track-active, #71ca96);
}
.switch > .thumb[data-v-7622434e] {
  position: absolute;
  width: 20px;
  height: 20px;
  background: #f5f5f5;
  border-radius: 50%;
  transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);
  left: 0;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.117647), 0 1px 4px rgba(0, 0, 0, 0.117647);
}
.switch > .thumb.active[data-v-7622434e] {
  background: var(--ehunter-switch-thumb-active, #006548);
  left: 100%;
}/* mussy */
div[data-v-f51bd597] {
  display: flex;
}
.options[data-v-f51bd597] {
  flex-direction: column;
  transition: all 0.3s ease;
  font-size: 14px;
}
.options > .item[data-v-f51bd597] {
  padding: 5px 10px;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.8);
  padding: 7px 11px;
  min-width: 52px;
  transition: all 0.3s ease;
}
.options > .item > span[data-v-f51bd597] {
  transition: all 0.3s ease;
}
.options > .item[data-v-f51bd597]:hover {
  cursor: pointer;
  background: rgba(0, 0, 0, 0.1);
}
.options > .item:hover > span[data-v-f51bd597] {
  color: hsl(145, 63%, 42%);
  margin-left: 5px;
  margin-right: -5px;
}/* mussy */
.ehunter-more-settings-modal[data-v-b3713ec5] {
  position: fixed;
  inset: 0;
  background: radial-gradient(1200px 700px at 12% 8%, rgba(132, 176, 255, 0.24), rgba(132, 176, 255, 0) 58%), radial-gradient(1000px 600px at 100% 100%, rgba(82, 205, 186, 0.2), rgba(82, 205, 186, 0) 55%), rgba(16, 24, 39, 0.46);
  backdrop-filter: blur(6px);
  z-index: 10020;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.ehunter-more-settings-modal > .ehunter-panel[data-v-b3713ec5] {
  position: relative;
  width: min(980px, 100%);
  height: min(740px, 100%);
  border-radius: 18px;
  overflow: hidden;
  background: linear-gradient(180deg, #f8fbff 0%, #f2f6fd 100%);
  box-shadow: 0 28px 70px rgba(6, 19, 38, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: column;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-header[data-v-b3713ec5] {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  padding: 14px 56px 14px 20px;
  border-bottom: 1px solid rgba(78, 102, 146, 0.18);
  background: rgba(255, 255, 255, 0.82);
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-header > h3[data-v-b3713ec5] {
  margin: 0;
  font-size: 19px;
  color: #1e304f;
  font-weight: 700;
  letter-spacing: 0.2px;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-header > .ehunter-close-btn[data-v-b3713ec5] {
  position: absolute;
  right: 14px;
  top: 12px;
  z-index: 2;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  color: #4a6fa5;
  background: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  font-size: 20px;
  line-height: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  transition: all 0.24s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(26, 45, 78, 0.12);
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-header > .ehunter-close-btn[data-v-b3713ec5]:hover {
  background: rgb(235, 243, 255);
  color: #2d5a9e;
  transform: scale(1.08);
  box-shadow: 0 4px 12px rgba(31, 68, 125, 0.18);
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-header > .ehunter-close-btn[data-v-b3713ec5]:active {
  transform: scale(0.96);
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body[data-v-b3713ec5] {
  flex: 1;
  min-height: 0;
  display: flex;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-left-nav[data-v-b3713ec5] {
  margin: 0px;
  width: 210px;
  padding: 14px 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-right: 1px solid rgba(88, 113, 158, 0.16);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.78), rgba(245, 250, 255, 0.72));
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-left-nav > .ehunter-category[data-v-b3713ec5] {
  border: none;
  background: transparent;
  text-align: left;
  border-radius: 11px;
  font-size: 14px;
  color: #4a5f84;
  padding: 10px 12px;
  transition: all 0.2s ease;
  cursor: pointer;
  font-weight: 500;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-left-nav > .ehunter-category[data-v-b3713ec5]:hover {
  background: rgba(208, 225, 255, 0.55);
  color: #2b4f86;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-left-nav > .ehunter-category.ehunter-active[data-v-b3713ec5] {
  background: #dff3e5;
  color: #2a6142;
  font-weight: 700;
  box-shadow: inset 0 0 0 1px #8cc5a0;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content[data-v-b3713ec5] {
  flex: 1;
  min-width: 0;
  min-height: 0;
  overflow: auto;
  display: block;
  padding: 16px 18px;
  scroll-behavior: smooth;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group[data-v-b3713ec5] {
  display: block;
  scroll-margin-top: 12px;
  padding: 14px;
  border: 1px solid rgba(92, 119, 163, 0.18);
  border-radius: 14px;
  margin-bottom: 12px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 8px 24px rgba(26, 45, 78, 0.08);
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > h4[data-v-b3713ec5] {
  margin: 0 0 12px;
  font-size: 16px;
  color: #233e67;
  font-weight: 700;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-row[data-v-b3713ec5] {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin: 8px 0;
  color: #2f415d;
  min-height: 42px;
  padding: 6px 0;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-row[data-v-b3713ec5]:not(:last-child) {
  border-bottom: 1px dashed rgba(128, 150, 186, 0.2);
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-row > .ehunter-label-block[data-v-b3713ec5] {
  min-width: 0;
  flex: 1;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-row > .ehunter-label-block > .ehunter-label[data-v-b3713ec5] {
  font-size: 14px;
  color: #2f466d;
  font-weight: 500;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-row > .ehunter-label-block > .ehunter-tip[data-v-b3713ec5] {
  margin: 0;
  font-size: 11px;
  line-height: 1.3;
  color: #7a879c;
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-row > .ehunter-label[data-v-b3713ec5] {
  font-size: 14px;
  color: #2f466d;
  font-weight: 500;
  min-width: 120px;
  flex-shrink: 0;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-row[data-v-b3713ec5] > :not(.ehunter-label):not(.ehunter-label-block) {
  margin-left: auto;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-row > .ehunter-value[data-v-b3713ec5] {
  font-size: 13px;
  color: #476088;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-row > .ehunter-link[data-v-b3713ec5] {
  color: #2b5da5;
  text-decoration: none;
  font-size: 13px;
  word-break: break-all;
  text-align: right;
  max-width: 66%;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-row > .ehunter-danger[data-v-b3713ec5] {
  border: 1px solid #d9a5a5;
  border-radius: 8px;
  background: #fff4f4;
  color: #8a4646;
  font-size: 13px;
  padding: 8px 12px;
  cursor: pointer;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-row > .ehunter-danger[data-v-b3713ec5]:hover {
  background: #ffe9e9;
  border-color: #cf8e8e;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-row > .ehunter-action[data-v-b3713ec5] {
  border: 1px solid #8bc7a0;
  border-radius: 8px;
  background: #f2fff6;
  color: #2a5f41;
  font-size: 13px;
  padding: 8px 12px;
  cursor: pointer;
  font-weight: 600;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-row > .ehunter-action[data-v-b3713ec5]:hover {
  background: #e6f7ec;
  border-color: #77b88f;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-quick-lanes[data-v-b3713ec5] {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 2px;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-quick-lanes > .ehunter-lane-intro[data-v-b3713ec5] {
  margin: 0;
  font-size: 12px;
  color: #5a6c8c;
  line-height: 1.35;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-quick-lanes > .ehunter-lane-divider[data-v-b3713ec5] {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, rgba(126, 146, 178, 0), rgba(126, 146, 178, 0.5), rgba(126, 146, 178, 0));
  margin: 2px 0;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-quick-lanes > .ehunter-quick-lane[data-v-b3713ec5] {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0 2px;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-quick-lanes > .ehunter-quick-lane > .ehunter-lane-header[data-v-b3713ec5] {
  margin: 0;
  font-size: 12px;
  color: #355a96;
  font-weight: 700;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-quick-lanes > .ehunter-quick-lane > .ehunter-lane-desc[data-v-b3713ec5] {
  margin: 2px 0 5px;
  font-size: 11px;
  color: #6c7f9f;
  line-height: 1.25;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-quick-lanes > .ehunter-quick-lane > .ehunter-quick-item[data-v-b3713ec5] {
  display: grid;
  grid-template-columns: 16px minmax(0, 1fr) auto;
  align-items: center;
  gap: 6px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 7px;
  border: 1px solid rgba(101, 126, 168, 0.18);
  background: #fdfefe;
  margin: 4px 0;
  padding: 5px 8px;
  transition: all 0.18s ease;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  touch-action: manipulation;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-quick-lanes > .ehunter-quick-lane > .ehunter-quick-item[data-v-b3713ec5] * {
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-quick-lanes > .ehunter-quick-lane > .ehunter-quick-item[data-v-b3713ec5]:hover {
  background: rgba(232, 243, 255, 0.92);
  border-color: rgba(82, 120, 184, 0.36);
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-quick-lanes > .ehunter-quick-lane > .ehunter-quick-item > .ehunter-drag-handle[data-v-b3713ec5] {
  width: 10px;
  height: 10px;
  opacity: 0.8;
  background: radial-gradient(circle, #5f7498 1.1px, transparent 1.2px) 0 0/6px 6px, radial-gradient(circle, #5f7498 1.1px, transparent 1.2px) 3px 3px/6px 6px;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-quick-lanes > .ehunter-quick-lane > .ehunter-quick-item > .ehunter-label[data-v-b3713ec5] {
  font-size: 13px;
  color: #2e4264;
  pointer-events: none;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-quick-lanes > .ehunter-quick-lane > .ehunter-quick-item > .ehunter-mode-tag[data-v-b3713ec5] {
  font-size: 11px;
  color: #6a7d9c;
  pointer-events: none;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-quick-lanes > .ehunter-quick-lane.ehunter-hidden > .ehunter-lane-header[data-v-b3713ec5] {
  color: #6d7a8e;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-quick-lanes > .ehunter-quick-lane.ehunter-hidden > .ehunter-quick-item[data-v-b3713ec5] {
  background: rgba(236, 240, 246, 0.92);
  border-color: rgba(141, 153, 174, 0.25);
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-quick-lanes > .ehunter-quick-lane.ehunter-hidden > .ehunter-quick-item > .ehunter-drag-handle[data-v-b3713ec5] {
  opacity: 0.52;
  background: radial-gradient(circle, #8191a8 1.1px, transparent 1.2px) 0 0/6px 6px, radial-gradient(circle, #8191a8 1.1px, transparent 1.2px) 3px 3px/6px 6px;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-quick-lanes > .ehunter-quick-lane.ehunter-hidden > .ehunter-quick-item > .ehunter-label[data-v-b3713ec5],
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-quick-lanes > .ehunter-quick-lane.ehunter-hidden > .ehunter-quick-item > .ehunter-mode-tag[data-v-b3713ec5] {
  color: #7e889a;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-shortcut-intro[data-v-b3713ec5] {
  margin: 0 0 8px;
  font-size: 12px;
  line-height: 1.35;
  color: #5c6e8d;
}
@media only screen and (max-width: 767px) {
.ehunter-more-settings-modal[data-v-b3713ec5] {
    padding: 0;
}
.ehunter-more-settings-modal > .ehunter-panel[data-v-b3713ec5] {
    width: 100%;
    height: 100%;
    border-radius: 0;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body[data-v-b3713ec5] {
    flex-direction: column;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-left-nav[data-v-b3713ec5] {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid rgba(71, 89, 126, 0.15);
    flex-direction: row;
    overflow-x: auto;
    white-space: nowrap;
    gap: 6px;
    padding: 10px;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-left-nav > .ehunter-category[data-v-b3713ec5] {
    flex-shrink: 0;
    padding: 8px 10px;
    font-size: 13px;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content[data-v-b3713ec5] {
    padding: 12px 14px;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-row > .ehunter-label-block[data-v-b3713ec5] {
    min-width: 0;
}
.ehunter-more-settings-modal > .ehunter-panel > .ehunter-panel-body > .ehunter-content > .ehunter-group > .ehunter-row > .ehunter-link[data-v-b3713ec5] {
    max-width: 58%;
}
}
[data-v-b3713ec5] .drop-option > .text {
  background: #f2fff6;
  border: 1px solid #86c59e;
  border-radius: 8px;
  color: #2a6042;
  font-weight: 600;
  padding: 4px 10px;
}
[data-v-b3713ec5] .drop-option > .icon-drop-down {
  fill: #2a6042;
}
[data-v-b3713ec5] .drop-option .options {
  background: #fff;
  border: 1px solid rgba(95, 124, 169, 0.28);
  border-radius: 10px;
  box-shadow: 0 10px 22px rgba(24, 44, 80, 0.16);
}
.ehunter-shortcut-editor[data-v-b3713ec5] {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  flex-wrap: wrap;
  max-width: 56%;
}
.ehunter-shortcut-chips[data-v-b3713ec5] {
  display: flex;
  flex-direction: row;
  gap: 5px;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.ehunter-shortcut-chip[data-v-b3713ec5] {
  border: 1px solid #8bc7a0;
  border-radius: 999px;
  background: #f4fff7;
  color: #25543a;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  line-height: 1;
  padding: 4px 8px;
  max-width: 180px;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}
.ehunter-shortcut-chip[data-v-b3713ec5]:hover {
  background: #ecfaef;
  border-color: #6fb88b;
}
.ehunter-shortcut-chip > .ehunter-chip-key[data-v-b3713ec5] {
  display: block;
  font-weight: 600;
  text-align: center;
}
.ehunter-shortcut-chip > .ehunter-chip-remove[data-v-b3713ec5] {
  font-weight: 700;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 0;
  margin-left: 0;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: width 0.15s ease, margin-left 0.15s ease, opacity 0.15s ease;
}
.ehunter-shortcut-chip:hover > .ehunter-chip-remove[data-v-b3713ec5], .ehunter-shortcut-chip:focus-visible > .ehunter-chip-remove[data-v-b3713ec5] {
  width: 10px;
  margin-left: 4px;
  opacity: 0.8;
}
.ehunter-shortcut-chip-list-enter-active[data-v-b3713ec5],
.ehunter-shortcut-chip-list-leave-active[data-v-b3713ec5] {
  transition: opacity 0.16s ease, transform 0.16s ease, max-width 0.16s ease, margin 0.16s ease, padding 0.16s ease;
}
.ehunter-shortcut-chip-list-move[data-v-b3713ec5] {
  transition: transform 0.16s ease;
}
.ehunter-shortcut-chip-list-enter-from[data-v-b3713ec5],
.ehunter-shortcut-chip-list-leave-to[data-v-b3713ec5] {
  opacity: 0;
  transform: scale(0.88);
}
.ehunter-shortcut-chip-list-leave-to[data-v-b3713ec5] {
  max-width: 0;
  margin-left: 0;
  margin-right: 0;
  padding-left: 0;
  padding-right: 0;
  border-width: 0;
}
.ehunter-shortcut-add[data-v-b3713ec5] {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
}
.ehunter-shortcut-add-btn[data-v-b3713ec5] {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid #7fbe98;
  background: #effbf2;
  color: #2b6a47;
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.ehunter-shortcut-add-btn[data-v-b3713ec5]:hover {
  background: #e2f5e8;
  border-color: #69ae85;
}
.ehunter-shortcut-add-icon[data-v-b3713ec5] {
  display: block;
  line-height: 1;
  transform: translateY(-1px);
  pointer-events: none;
}
.ehunter-shortcut-select[data-v-b3713ec5] {
  min-width: 110px;
  max-width: 150px;
  border: 1px solid #8bc7a0;
  border-radius: 7px;
  background: #f6fff8;
  color: #2b5d41;
  font-size: 11px;
  line-height: 1.2;
  padding: 4px 7px;
}
.ehunter-shortcut-select[data-v-b3713ec5]:hover, .ehunter-shortcut-select[data-v-b3713ec5]:focus {
  border-color: #6ed08f;
  background: #e9fff1 !important;
  color: #1f7a3f;
}/* mussy */
div[data-v-f31c6980] {
  display: flex;
}
.top-bar[data-v-f31c6980] {
  width: 100%;
  height: var(--v0daa2faa);
  min-height: var(--v0daa2faa);
  max-height: var(--v0daa2faa);
  padding: 0;
  margin: 0;
  background: transparent;
  position: relative;
}
.top-bar > .float-content[data-v-f31c6980] {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 20000;
  flex-shrink: 0;
}
.top-bar > .float-content .circle-icon-button[data-v-f31c6980] {
  height: 26px;
  width: 26px;
  min-height: 26px;
  min-width: 26px;
  max-height: 26px;
  max-width: 26px;
  flex: 0 0 26px;
  padding: 0;
  margin-top: 0;
  margin-bottom: 0;
}
.top-bar > .float-content .circle-icon-button > svg[data-v-f31c6980] {
  height: 18px;
  width: 18px;
  min-height: 18px;
  min-width: 18px;
}
.top-bar > .float-content > .more-button-wrapper[data-v-f31c6980] {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.top-bar > .float-content > .button[data-v-f31c6980], .top-bar > .float-content > .more-button-wrapper[data-v-f31c6980] {
  margin-right: 13px;
}
.top-bar > .inner-content[data-v-f31c6980] {
  color: white;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
  background: var(--ehunter-accent-color, #28af60);
  font-size: 14px;
  transition: all 0.3s ease;
  height: 100%;
}
.top-bar > .inner-content > .item[data-v-f31c6980] {
  margin-left: 18px;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  flex: 0 0 auto;
}
.top-bar > .inner-content > .item .drop-option[data-v-f31c6980],
.top-bar > .inner-content > .item .num-drop-option[data-v-f31c6980],
.top-bar > .inner-content > .item .switch[data-v-f31c6980] {
  flex: 0 0 auto;
}
.top-bar > .inner-content > .item .drop-option > .text[data-v-f31c6980] {
  padding: 3px 5px;
  min-height: 20px;
  line-height: 14px;
  box-sizing: border-box;
}
.top-bar > .inner-content > .item .switch[data-v-f31c6980] {
  width: 28px;
  min-width: 28px;
  height: 20px;
  margin: 0 15px;
}
.top-bar > .inner-content > .item .switch > .track[data-v-f31c6980] {
  height: 14px;
  width: 100%;
}
.top-bar > .inner-content > .item .switch > .thumb[data-v-f31c6980] {
  width: 20px;
  height: 20px;
}
.top-bar > .inner-content > .item.less-margin[data-v-f31c6980] {
  margin-left: 10px;
}
.top-bar > .inner-content > .item.icon-margin[data-v-f31c6980] {
  margin-left: 15px;
}
.top-bar > .inner-content > .item > .label[data-v-f31c6980] {
  display: flex;
  align-items: center;
  font-size: 14px;
  margin: 0;
  white-space: nowrap;
  cursor: default;
}
.top-bar > .inner-content > .item > .label.icon > svg[data-v-f31c6980] {
  fill: white;
  height: 18px;
  width: 18px;
}
.top-bar > .inner-content > .item > .label.icon > svg.reset[data-v-f31c6980] {
  height: 18px;
  width: 18px;
}
.top-bar > .inner-content > .item > .label.icon > svg.info[data-v-f31c6980] {
  height: 20px;
  width: 20px;
}
.top-bar > .inner-content > .item > .label.icon > svg.github[data-v-f31c6980] {
  height: 17px;
  height: 17px;
}
.top-bar > .inner-content > .item > .label.clickable[data-v-f31c6980] {
  cursor: pointer;
}
.top-bar > .inner-content.hide[data-v-f31c6980] {
  transform: translateY(-100%);
}.awesome-scroll-view[data-v-4f224e6d] {
  position: relative;
  overflow-y: overlay;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}
.awesome-scroll-view.axis-x[data-v-4f224e6d] {
  overflow-y: hidden;
  overflow-x: overlay;
  flex-direction: row;
}
.awesome-scroll-view.scrollbar[data-v-4f224e6d] {
  transition: all 0.3s ease;
}
.awesome-scroll-view.scrollbar[data-v-4f224e6d]::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background: transparent;
}
.awesome-scroll-view.scrollbar[data-v-4f224e6d]::-webkit-scrollbar-track {
  background: transparent;
}
.awesome-scroll-view.scrollbar[data-v-4f224e6d]::-webkit-scrollbar-thumb {
  border-radius: 999px;
  border: 2px solid transparent;
  background-clip: padding-box;
  background-color: rgba(255, 255, 255, 0);
  transition: background-color 0.2s ease;
}
.awesome-scroll-view.scrollbar[data-v-4f224e6d]:hover::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.46);
}
.awesome-scroll-view.axis-y[data-v-4f224e6d] {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0) transparent;
}
.awesome-scroll-view.axis-y[data-v-4f224e6d]:hover {
  scrollbar-color: rgba(255, 255, 255, 0.46) transparent;
}
.awesome-scroll-view.axis-x[data-v-4f224e6d] {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0) transparent;
}
.awesome-scroll-view.axis-x[data-v-4f224e6d]:hover {
  scrollbar-color: rgba(255, 255, 255, 0.46) transparent;
}/* mussy */
.dock-handle[data-v-5a311fbe] {
  appearance: none;
  border: 0;
  color: white;
  background: transparent;
  width: 100%;
  height: 100%;
  min-height: 40px;
  font-weight: 700;
  letter-spacing: 0.08em;
  cursor: grab;
  transition: background-color 0.2s ease;
}
.dock-handle[data-v-5a311fbe]:hover {
  background: rgba(255, 255, 255, 0.08);
}
.dock-handle.armed[data-v-5a311fbe] {
  background: rgba(0, 0, 0, 0.2);
}
.dock-handle[data-v-5a311fbe]:active {
  cursor: grabbing;
}.thumb-view[data-v-88a65bb0] {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.thumb-view > .thumb-stage[data-v-88a65bb0] {
  flex-shrink: 0;
  transform-origin: center center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.thumb-view > .thumb-stage > .thumb-sprite[data-v-88a65bb0],
.thumb-view > .thumb-stage > .thumb-image[data-v-88a65bb0] {
  width: 100%;
  height: 100%;
  display: block;
}
.thumb-view > .thumb-stage > .thumb-image[data-v-88a65bb0] {
  object-fit: contain;
}
.thumb-view > .thumb-fallback[data-v-88a65bb0] {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
}/* mussy */
.thumb-content[data-v-2665bf4a] {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
  min-width: 0;
}
.thumb-content .thumb-scroll-view[data-v-2665bf4a] {
  position: relative;
  background: #444444;
  height: 100%;
  flex: 1;
  min-height: 0;
  min-width: 0;
  width: 100%;
}
.thumb-content .thumb-scroll-view[data-v-2665bf4a]:not(.dock-bottom) {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.thumb-content .thumb-scroll-view > .header[data-v-2665bf4a] {
  position: relative;
  height: 40px;
  background: #2ecc71;
  flex-shrink: 0;
}
.thumb-content .thumb-scroll-view > .header > .app-name[data-v-2665bf4a] {
  color: white;
  font-weight: bolder;
  font-size: var(--v5a8223be);
  letter-spacing: var(--v6df6e1a2);
  display: block;
  position: absolute;
  white-space: nowrap;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}
.thumb-content .thumb-scroll-view .thumb-container[data-v-2665bf4a] {
  position: relative;
  width: 100%;
  padding: 3px 0;
  margin: 0;
  height: var(--v3276ebb2);
  flex-shrink: 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
  transition: all 0.1s ease;
}
.thumb-content .thumb-scroll-view .thumb-container > .thumb-stage[data-v-2665bf4a] {
  position: relative;
  width: var(--v44d27a72);
  height: var(--v3276ebb2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
.thumb-content .thumb-scroll-view .thumb-container > .thumb-stage > .thumb[data-v-2665bf4a] {
  width: 100%;
  height: 100%;
  transition: all 0.5s ease;
}
.thumb-content .thumb-scroll-view .thumb-container > .thumb-stage > .index[data-v-2665bf4a] {
  position: absolute;
  display: block;
  font-weight: bolder;
  font-size: var(--v928be0aa);
  color: rgba(51, 51, 51, 0.8);
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.8);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  user-select: none;
  cursor: default;
  transition: all 0.2s ease;
}
.thumb-content .thumb-scroll-view .thumb-container[data-v-2665bf4a]:hover {
  background: rgba(0, 0, 0, 0.4);
}
.thumb-content .thumb-scroll-view .thumb-container:hover > .thumb-stage > .index[data-v-2665bf4a] {
  font-size: var(--v6297f873);
  color: #333333;
  -webkit-text-stroke: 1px white;
}
.thumb-content .thumb-scroll-view:not(.dock-bottom) .thumb-container[data-v-2665bf4a] {
  padding: 3px var(--v4f06c231);
}
.thumb-content .thumb-scroll-view:not(.dock-bottom) .thumb-container > .thumb-stage[data-v-2665bf4a] {
  width: 100%;
}
.thumb-content .thumb-scroll-view:not(.dock-bottom) .thumb-container + .thumb-container[data-v-2665bf4a] {
  margin-top: var(--v595b4c6c);
}
.thumb-content .thumb-scroll-view .indicator[data-v-2665bf4a] {
  position: absolute;
  box-sizing: border-box;
  margin-top: 40px;
  height: var(--v3276ebb2);
  left: 0;
  right: 0;
  border-left: 3px solid rgba(255, 255, 255, 0.4);
  border-right: 3px solid rgba(255, 255, 255, 0.4);
  background: rgba(0, 0, 0, 0.4);
  transition: all 0.5s ease;
  pointer-events: none;
  top: var(--v3d2994ea);
}
.thumb-content .thumb-expand-trigger[data-v-2665bf4a] {
  position: absolute;
  left: 50%;
  bottom: 8px;
  transform: translateX(-50%);
  z-index: 25;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.45);
  color: rgba(255, 255, 255, 0.92);
  width: 32px;
  height: 32px;
  cursor: pointer;
  opacity: 0.78;
  transition: all 0.2s ease;
}
.thumb-content .thumb-expand-trigger > .expand-icon[data-v-2665bf4a] {
  width: 16px;
  height: 16px;
  fill: currentColor;
  transform: rotate(0deg);
}
.thumb-content .thumb-expand-trigger[data-v-2665bf4a]:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.65);
}
.thumb-content .thumb-expand-trigger.dock-bottom[data-v-2665bf4a] {
  right: 8px;
  left: auto;
  top: 50%;
  bottom: auto;
  transform: translateY(-50%);
}
.thumb-content .thumb-expand-trigger.dock-bottom > .expand-icon[data-v-2665bf4a] {
  transform: rotate(90deg);
}
.thumb-content.dock-bottom .thumb-scroll-view[data-v-2665bf4a] {
  width: 100%;
  height: 100%;
  flex-direction: row;
  overflow-x: overlay;
  overflow-y: hidden;
}
.thumb-content.dock-bottom .thumb-scroll-view > .header[data-v-2665bf4a] {
  width: 40px;
  height: 100%;
}
.thumb-content.dock-bottom .thumb-scroll-view > .header > .app-name[data-v-2665bf4a] {
  writing-mode: vertical-rl;
  text-orientation: upright;
  white-space: normal;
  letter-spacing: var(--v15069c5b);
  top: 0;
  left: 0;
  transform: none;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--v3b1f8b12);
  line-height: 1;
}
.thumb-content.dock-bottom .thumb-scroll-view .indicator[data-v-2665bf4a] {
  display: block;
  margin-top: 0;
  margin-left: 40px;
  top: 0;
  left: var(--v3d2994ea);
  width: var(--v44d27a72);
  height: 100%;
  border-left: 0;
  border-right: 0;
  border-top: 3px solid rgba(255, 255, 255, 0.4);
  border-bottom: 3px solid rgba(255, 255, 255, 0.4);
}
.thumb-content.dock-bottom .thumb-scroll-view .thumb-container[data-v-2665bf4a] {
  width: var(--v44d27a72);
  min-width: var(--v44d27a72);
  height: 100%;
  padding: var(--v0891a98a) var(--d8540348);
  flex-direction: column;
}
.thumb-content.dock-bottom .thumb-scroll-view .thumb-container > .thumb-stage[data-v-2665bf4a] {
  width: 100%;
  height: 100%;
  transform-origin: center center;
}/* mussy */
.ehunter-loading-view[data-v-5a40b588] {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #333333;
}
.ehunter-loading-view .loading-animation[data-v-5a40b588] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
}
.ehunter-loading-view .loading-animation .book[data-v-5a40b588] {
  position: relative;
  margin: 0 auto;
  border: 5px solid #ecf0f1;
  width: 100px;
  height: 60px;
}
.ehunter-loading-view .loading-animation .book__page[data-v-5a40b588] {
  position: absolute;
  left: 50%;
  top: -5px;
  margin: 0 auto;
  border-top: 5px solid #ecf0f1;
  border-bottom: 5px solid #ecf0f1;
  border-right: 5px solid #ecf0f1;
  background: #333333;
  width: 50px;
  height: 60px;
  transform-origin: 0% 50%;
  animation: flip-5a40b588 0.85s infinite linear;
  animation-fill-mode: forwards;
  backface-visibility: hidden;
}
.ehunter-loading-view .loading-animation .book__page[data-v-5a40b588]:nth-child(1) {
  z-index: 3;
  animation-delay: -0.28s;
}
.ehunter-loading-view .loading-animation .book__page[data-v-5a40b588]:nth-child(2) {
  z-index: 2;
  animation-delay: -0.56s;
}
.ehunter-loading-view .loading-animation .book__page[data-v-5a40b588]:nth-child(3) {
  z-index: 1;
  animation-delay: -0.84s;
}
@keyframes flip-5a40b588 {
0% {
    transform: perspective(600px) rotateY(0deg);
}
20% {
    background: rgb(25.5, 25.5, 25.5);
}
29.9% {
    background: rgb(25.5, 25.5, 25.5);
}
30% {
    transform: perspective(200px) rotateY(-90deg);
    background: #333333;
}
54.999% {
    opacity: 1;
}
55% {
    opacity: 0;
}
60% {
    transform: perspective(200px) rotateY(-180deg);
    background: #333333;
}
100% {
    transform: perspective(200px) rotateY(-180deg);
    background: #333333;
}
}
.ehunter-loading-view .loading-animation h4[data-v-5a40b588] {
  color: #ffffff;
  text-align: center;
  font-family: sans-serif;
  text-transform: uppercase;
  font-size: 20px;
  position: relative;
  margin: 0;
}
.ehunter-loading-view .loading-animation h4[data-v-5a40b588]:after {
  position: absolute;
  content: "";
  -webkit-animation: Dots-5a40b588 1.4s cubic-bezier(0, 0.39, 1, 0.68) infinite;
  animation: Dots-5a40b588 1.4s cubic-bezier(0, 0.39, 1, 0.68) infinite;
}
.ehunter-loading-view .loading-animation[data-v-5a40b588] {
  /* Dots */
}
@-webkit-keyframes Dots-5a40b588 {
0% {
    content: "";
}
33% {
    content: ".";
}
66% {
    content: "..";
}
100% {
    content: "...";
}
}
@keyframes Dots-5a40b588 {
0% {
    content: "";
}
33% {
    content: ".";
}
66% {
    content: "..";
}
100% {
    content: "...";
}
}
.ehunter-loading[data-v-5a40b588] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.ehunter-error[data-v-5a40b588] {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 20px;
  background: #333;
  color: #fff;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  text-align: left;
}
.error-header[data-v-5a40b588] {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 10px;
}
.error-header h3[data-v-5a40b588] {
  margin: 0;
  font-size: 24px;
  color: #ff6b6b;
}
.close-button[data-v-5a40b588] {
  background: none;
  border: none;
  color: #fff;
  font-size: 32px;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background 0.2s;
}
.close-button[data-v-5a40b588]:hover {
  background: rgba(255, 255, 255, 0.1);
}
.error-message[data-v-5a40b588] {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
  color: rgba(255, 255, 255, 0.9);
}
.error-details[data-v-5a40b588] {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 15px;
}
.init-steps[data-v-5a40b588] {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.25);
}
.init-steps h4[data-v-5a40b588] {
  margin: 0;
  font-size: 15px;
  color: #d9f2ff;
}
.init-steps ul[data-v-5a40b588] {
  margin: 0;
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.init-steps li[data-v-5a40b588] {
  font-size: 13px;
  line-height: 1.4;
}
.step-status[data-v-5a40b588] {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-width: 52px;
  margin-right: 8px;
  border-radius: 999px;
  padding: 1px 8px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}
.step-status--success[data-v-5a40b588] {
  background: rgba(56, 142, 60, 0.25);
  color: #8ee59a;
}
.step-status--failed[data-v-5a40b588] {
  background: rgba(211, 47, 47, 0.25);
  color: #ff9e9e;
}
.step-status--pending[data-v-5a40b588] {
  background: rgba(158, 158, 158, 0.25);
  color: #d7d7d7;
}
.step-label[data-v-5a40b588] {
  color: #ffffff;
}
.step-detail[data-v-5a40b588] {
  color: rgba(255, 255, 255, 0.8);
  margin-left: 4px;
}
.error-details summary[data-v-5a40b588] {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 10px;
  user-select: none;
}
.error-details summary[data-v-5a40b588]:hover {
  color: #4fc3f7;
}
.error-info[data-v-5a40b588] {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}
.error-info p[data-v-5a40b588] {
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
}
.error-info strong[data-v-5a40b588] {
  color: #4fc3f7;
}
.copy-button[data-v-5a40b588] {
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  border-radius: 4px;
  padding: 4px 10px;
  cursor: pointer;
}
.copy-button[data-v-5a40b588]:hover {
  background: rgba(255, 255, 255, 0.16);
}
.error-stack[data-v-5a40b588] {
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 10px;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  line-height: 1.4;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #ff9800;
}
.feedback-link[data-v-5a40b588] {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-top: 0;
  margin-bottom: 16px;
  padding: 10px 12px;
  border-left: 4px solid #ffd166;
  border-radius: 6px;
  background: rgba(255, 209, 102, 0.18);
  color: #fff4cf;
  font-size: 14px;
  line-height: 1.4;
}
.feedback-link a[data-v-5a40b588] {
  color: #ffe29a;
  text-decoration: underline;
  font-weight: 700;
}
.feedback-link a[data-v-5a40b588]:hover {
  color: #fff6d7;
}/* mussy */
div[data-v-34f09df5],
span[data-v-34f09df5] {
  display: flex;
}
.page-view[data-v-34f09df5] {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: all 0.3s ease;
  overflow: visible;
}
.page-view > .layer[data-v-34f09df5] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.page-view > .preview-layer[data-v-34f09df5] {
  overflow: hidden;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
}
.page-view > .preview-layer > .preview-thumb[data-v-34f09df5] {
  width: 100%;
  height: 100%;
}
.page-view > .preview-layer[data-v-34f09df5]:after {
  display: block;
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
}
.page-view > .loading-layer[data-v-34f09df5] {
  box-shadow: inset 0px 0px 0px 5px hsl(231, 6%, 36%);
}
.page-view > .loading-layer > .index[data-v-34f09df5] {
  position: absolute;
  color: rgba(255, 255, 255, 0.5);
  font-weight: bolder;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 80px;
  margin: 0;
}
.page-view > .loading-layer > .loading-info-panel[data-v-34f09df5] {
  position: absolute;
  top: calc(50% + 80px);
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 14px;
  z-index: 1;
}
.page-view > .loading-layer > .loading-info-panel .loading-info[data-v-34f09df5] {
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.page-view > .loading-layer > .loading-info-panel .loading-info > .operation[data-v-34f09df5] {
  margin-top: 2px;
}
.page-view > .loading-layer > .loading-info-panel .loading-info > .operation > .no-margin[data-v-34f09df5] {
  margin-left: 0;
}
.page-view > .img-layer > .album-item[data-v-34f09df5] {
  width: inherit;
  min-width: inherit;
  height: inherit;
}
.menu-layer[data-v-34f09df5] {
  z-index: 12010;
  pointer-events: auto;
}
.menu-layer > .menu-anchor[data-v-34f09df5] {
  position: absolute;
  width: 0;
  height: 0;
}
.menu-layer > .menu-anchor[data-v-34f09df5] .popover {
  min-width: 170px;
  z-index: 12020;
}
.page-menu-options[data-v-34f09df5] {
  flex-direction: column;
  min-width: 170px;
}
.page-menu-options > .item[data-v-34f09df5] {
  border: 0;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 12px;
  color: rgba(0, 0, 0, 0.82);
  transition: all 0.2s ease;
  width: 100%;
  font-size: 13px;
}
.page-menu-options > .item > small[data-v-34f09df5] {
  margin-top: 3px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 11px;
}
.page-menu-options > .item[data-v-34f09df5]:hover {
  cursor: pointer;
  background: rgba(0, 0, 0, 0.08);
  color: hsl(145, 63%, 42%);
}
.page-menu-options > .item[data-v-34f09df5]:disabled, .page-menu-options > .item.disabled[data-v-34f09df5] {
  cursor: not-allowed;
  color: rgba(0, 0, 0, 0.45);
  background: rgba(0, 0, 0, 0.03);
}
.focus-indicator[data-v-34f09df5] {
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.3);
  box-sizing: border-box;
  pointer-events: none;
  z-index: 12005;
}
.magnifier-lens[data-v-34f09df5] {
  position: absolute;
  border: 2px solid hsl(145, 63%, 42%);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(39.627, 174.573, 95.8545, 0.8);
  overflow: hidden;
  background: rgba(0, 0, 0, 0.12);
  pointer-events: none;
  z-index: 12009;
}
.magnifier-lens > .magnifier-canvas[data-v-34f09df5] {
  width: 100%;
  height: 100%;
  display: block;
}
.magnifier-lens > .magnifier-pending[data-v-34f09df5] {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.92);
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.28), rgba(0, 0, 0, 0.16));
}
.magnifier-lens > .magnifier-pending > .spinner[data-v-34f09df5] {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: rgba(255, 255, 255, 0.95);
  animation: magnifier-spin-34f09df5 0.7s linear infinite;
}
@keyframes magnifier-spin-34f09df5 {
from {
    transform: rotate(0deg);
}
to {
    transform: rotate(360deg);
}
}/* mussy */
.album-scroll-view[data-v-c08983c3] {
  position: relative;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
}
.album-scroll-view > .preload[data-v-c08983c3] {
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 144px;
  z-index: -10;
  opacity: 0;
  display: flex;
  flex-direction: row;
}
.album-scroll-view > .preload .preload-item[data-v-c08983c3] {
  width: 200px;
  height: 144px;
  position: relative;
}
.album-scroll-view > .scroll-view[data-v-c08983c3] {
  height: 100%;
  width: 100%;
}
.album-scroll-view > .scroll-view h1[data-v-c08983c3] {
  color: #c9cacf;
  padding: 10px 20px;
  font-size: 18px;
  text-align: center;
  margin-top: 60px;
}
.album-scroll-view > .scroll-view > .top-pagination[data-v-c08983c3] {
  margin-top: 15px;
  margin-bottom: 15px;
}
.album-scroll-view > .scroll-view > .bottom-pagination[data-v-c08983c3] {
  margin-top: 15px;
  margin-bottom: 30px;
}
.album-scroll-view > .scroll-view .page-container[data-v-c08983c3] {
  transition: all 0.3s ease;
  height: 0;
  position: relative;
}
.album-scroll-view > .scroll-view .page-container[data-v-c08983c3]:first-of-type {
  margin-top: 35px;
}
.album-scroll-view > .scroll-view .page-container[data-v-c08983c3]:last-of-type {
  margin-bottom: 35px;
}/* mussy */
.book-page-view[data-v-26accc38] {
  position: relative;
  transition: all 0.3s ease;
  user-select: none;
  width: 100%;
  height: 100%;
}
.book-page-view > .page[data-v-26accc38] {
  background: white;
  flex: 1;
  align-self: stretch;
  overflow: hidden;
}
.book-page-view > .page > .ehunter-tag[data-v-26accc38] {
  position: absolute;
  right: 8vh;
  bottom: 8vh;
  padding: 1vh 10vh;
  background: hsl(145, 63%, 42%);
  color: white;
  font-size: 1.8vh;
  transform-origin: center;
  transform: translate(50%, 50%) rotate(-45deg);
}
.book-page-view > .page > .ehunter-tag.left[data-v-26accc38] {
  left: 7vh;
  right: initial;
  transform: translate(-50%, 50%) rotate(45deg);
}
.book-page-view > .page.start-page[data-v-26accc38] {
  position: relative;
  justify-content: center;
}
.book-page-view > .page.start-page > h1[data-v-26accc38] {
  font-size: 4vh;
  font-weight: lighter;
  margin: 40% 20px;
  text-align: left;
  color: rgba(0, 0, 0, 0.8);
}
.book-page-view > .page.end-page[data-v-26accc38] {
  position: relative;
  justify-content: center;
  align-items: center;
}
.book-page-view > .page.end-page > h1[data-v-26accc38] {
  color: rgba(0, 0, 0, 0.7);
  font-size: 6vh;
  padding-bottom: 20%;
}/* mussy */
.album-book-view[data-v-c146cde5] {
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.album-book-view > .book-spread[data-v-c146cde5] {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}
.album-book-view > .book-spread > .book-page-container[data-v-c146cde5] {
  user-select: none;
  position: absolute;
  box-sizing: border-box;
  box-shadow: 0px 19px 10px -8px rgba(0, 0, 0, 0.35);
  overflow: visible;
}
.album-book-view > .book-spread > .book-page-container[data-v-c146cde5]:hover {
  z-index: 13050 !important;
}
.album-book-view > .book-page-container[data-v-c146cde5] {
  user-select: none;
  position: absolute;
  box-sizing: border-box;
  box-shadow: 0px 19px 10px -8px rgba(0, 0, 0, 0.35);
}
.album-book-view.mode-rotate[data-v-c146cde5] {
  perspective: 1800px;
  perspective-origin: 50% 50%;
}
.album-book-view.mode-rotate > .book-spread[data-v-c146cde5] {
  backface-visibility: hidden;
  will-change: transform, opacity;
  overflow: visible;
  --curl-before-opacity: 0;
  --curl-after-opacity: 0;
  --curl-before-transform: translateX(0) scaleX(1);
  --curl-after-transform: translateX(0) scaleX(1);
}
.album-book-view.mode-rotate > .book-spread[data-v-c146cde5]::before, .album-book-view.mode-rotate > .book-spread[data-v-c146cde5]::after {
  content: "";
  position: absolute;
  inset: -2% -1%;
  pointer-events: none;
  opacity: var(--curl-before-opacity);
  transition: opacity 0.42s ease, transform 0.42s cubic-bezier(0.22, 0.61, 0.36, 1);
}
.album-book-view.mode-rotate > .book-spread[data-v-c146cde5]::before {
  background: radial-gradient(120% 85% at 52% 50%, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0.12) 26%, rgba(255, 255, 255, 0.02) 62%, rgba(255, 255, 255, 0) 100%);
  mix-blend-mode: screen;
}
.album-book-view.mode-rotate > .book-spread[data-v-c146cde5]::after {
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.34) 0%, rgba(0, 0, 0, 0.16) 14%, rgba(0, 0, 0, 0.06) 30%, rgba(0, 0, 0, 0) 55%);
  opacity: var(--curl-after-opacity);
  transform: var(--curl-after-transform);
}
.album-book-view.mode-rotate > .book-spread[data-v-c146cde5]::before {
  transform: var(--curl-before-transform);
}
.album-book-view.mode-rotate > .book-spread > .book-page-container[data-v-c146cde5] {
  overflow: visible;
}
.album-book-view.mode-rotate > .book-spread > .book-page-container[data-v-c146cde5]::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.16) 0%, rgba(0, 0, 0, 0.04) 18%, rgba(255, 255, 255, 0) 60%);
  opacity: 0.35;
}
.album-book-view.mode-slide > .book-spread[data-v-c146cde5] {
  will-change: transform, opacity;
  backface-visibility: hidden;
  box-shadow: 0 16px 26px -14px rgba(0, 0, 0, 0.38);
}
.album-book-view.mode-page-flip[data-v-c146cde5] {
  perspective: 2400px;
  perspective-origin: 50% 50%;
}
.album-book-view.mode-page-flip > .book-spread[data-v-c146cde5] {
  transform-style: preserve-3d;
  backface-visibility: hidden;
  will-change: transform;
}
.album-book-view > .bottom-pagination[data-v-c146cde5] {
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  background: rgb(51, 51, 51);
  border-radius: 3px;
  opacity: 0.5;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 12000;
}
.album-book-view > .bottom-pagination[data-v-c146cde5]:hover {
  opacity: 1;
}
.action-panel[data-v-c146cde5] {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10000;
  opacity: 0.5;
  display: none;
  background-color: black;
  pointer-events: none;
}
.action-panel .next[data-v-c146cde5] {
  position: absolute;
  left: 0;
  right: 0;
  height: 35%;
  bottom: 0;
  background-color: red;
  pointer-events: none;
}
.action-panel .pre[data-v-c146cde5] {
  position: absolute;
  left: 0;
  right: 0;
  height: 35%;
  top: 0;
  background-color: green;
  pointer-events: none;
}
.action-panel .setting[data-v-c146cde5] {
  position: absolute;
  left: 0;
  right: 0;
  height: 30%;
  top: 50%;
  transform: translateY(-50%);
  background-color: purple;
  pointer-events: none;
}
.screen-flip-enter-active[data-v-c146cde5],
.screen-flip-leave-active[data-v-c146cde5] {
  transition: transform var(--v78c0c054) cubic-bezier(0.4, 0, 0.2, 1), opacity var(--v78c0c054) ease;
}
.screen-flip-enter-from[data-v-c146cde5] {
  transform-origin: right center;
  transform: rotateY(90deg);
  opacity: 0;
}
.screen-flip-leave-to[data-v-c146cde5] {
  transform-origin: left center;
  transform: rotateY(-90deg);
  opacity: 0;
}
.screen-flip-reverse-enter-active[data-v-c146cde5],
.screen-flip-reverse-leave-active[data-v-c146cde5] {
  transition: transform var(--v78c0c054) cubic-bezier(0.4, 0, 0.2, 1), opacity var(--v78c0c054) ease;
}
.screen-flip-reverse-enter-from[data-v-c146cde5] {
  transform-origin: left center;
  transform: rotateY(-90deg);
  opacity: 0;
}
.screen-flip-reverse-leave-to[data-v-c146cde5] {
  transform-origin: right center;
  transform: rotateY(90deg);
  opacity: 0;
}
.screen-flip-reverse-leave-to[data-v-c146cde5] {
  transform-origin: right center;
  transform: translate3d(16%, 0, 0) rotateY(80deg) rotateX(2.8deg) skewY(-2.6deg) scale(0.91, 0.97);
  opacity: 0;
}
.screen-slide-next-enter-active[data-v-c146cde5],
.screen-slide-next-leave-active[data-v-c146cde5],
.screen-slide-prev-enter-active[data-v-c146cde5],
.screen-slide-prev-leave-active[data-v-c146cde5] {
  transition: transform var(--v78c0c054) cubic-bezier(0.22, 0.74, 0.2, 1), opacity var(--v78c0c054) ease;
}
.screen-slide-next-enter-from[data-v-c146cde5] {
  transform: translate3d(0, 102%, 0);
  opacity: 0.95;
}
.screen-slide-next-leave-to[data-v-c146cde5] {
  transform: translate3d(0, -102%, 0);
  opacity: 0;
}
.screen-slide-prev-enter-from[data-v-c146cde5] {
  transform: translate3d(0, -102%, 0);
  opacity: 0.95;
}
.screen-slide-prev-leave-to[data-v-c146cde5] {
  transform: translate3d(0, 102%, 0);
  opacity: 0;
}
.screen-horizontal-rtl-enter-active[data-v-c146cde5],
.screen-horizontal-rtl-leave-active[data-v-c146cde5],
.screen-horizontal-ltr-enter-active[data-v-c146cde5],
.screen-horizontal-ltr-leave-active[data-v-c146cde5] {
  transition: transform var(--v78c0c054) cubic-bezier(0.22, 0.74, 0.2, 1), opacity var(--v78c0c054) ease;
}
.screen-horizontal-rtl-enter-from[data-v-c146cde5] {
  transform: translate3d(-102%, 0, 0);
  opacity: 0.95;
}
.screen-horizontal-rtl-leave-to[data-v-c146cde5] {
  transform: translate3d(102%, 0, 0);
  opacity: 0;
}
.screen-horizontal-ltr-enter-from[data-v-c146cde5] {
  transform: translate3d(102%, 0, 0);
  opacity: 0.95;
}
.screen-horizontal-ltr-leave-to[data-v-c146cde5] {
  transform: translate3d(-102%, 0, 0);
  opacity: 0;
}
.screen-none-enter-active[data-v-c146cde5],
.screen-none-leave-active[data-v-c146cde5] {
  transition-duration: 0s;
}
.screen-none-enter-from[data-v-c146cde5],
.screen-none-leave-to[data-v-c146cde5] {
  opacity: 1;
  transform: none;
}
.screen-page-flip-enter-active[data-v-c146cde5],
.screen-page-flip-leave-active[data-v-c146cde5],
.screen-page-flip-reverse-enter-active[data-v-c146cde5],
.screen-page-flip-reverse-leave-active[data-v-c146cde5] {
  transition: transform var(--v78c0c054) cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity var(--v78c0c054) ease;
}
.screen-page-flip-enter-from[data-v-c146cde5] {
  transform: rotateY(95deg);
  transform-origin: right center;
  opacity: 0.3;
}
.screen-page-flip-leave-to[data-v-c146cde5] {
  transform: rotateY(-95deg);
  transform-origin: left center;
  opacity: 0.3;
}
.screen-page-flip-reverse-enter-from[data-v-c146cde5] {
  transform: rotateY(-95deg);
  transform-origin: left center;
  opacity: 0.3;
}
.screen-page-flip-reverse-leave-to[data-v-c146cde5] {
  transform: rotateY(95deg);
  transform-origin: right center;
  opacity: 0.3;
}/* mussy */
.thumb-expand-modal[data-v-a86570b6] {
  position: fixed;
  inset: 0;
  z-index: 10024;
  background: radial-gradient(1400px 800px at 15% 10%, rgba(99, 152, 255, 0.18), rgba(99, 152, 255, 0) 60%), radial-gradient(1200px 700px at 88% 92%, rgba(82, 205, 186, 0.15), rgba(82, 205, 186, 0) 58%), rgba(16, 24, 39, 0.46);
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.thumb-expand-modal > .panel[data-v-a86570b6] {
  position: relative;
  width: min(1200px, 100%);
  max-height: min(90vh, 900px);
  min-height: min(80vh, 760px);
  border-radius: 20px;
}
@media only all and (min-width: 1600px) {
.thumb-expand-modal > .panel[data-v-a86570b6] {
    width: min(1400px, 100%);
}
}
.thumb-expand-modal > .panel[data-v-a86570b6] {
  background: linear-gradient(165deg, #ffffff 0%, #f5f8fc 48%, #eef3fa 100%);
  box-shadow: 0 32px 80px rgba(8, 24, 48, 0.28), 0 12px 32px rgba(8, 24, 48, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.85), inset 0 -1px 0 rgba(106, 132, 176, 0.08);
  border: 1px solid rgba(106, 132, 176, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.thumb-expand-modal > .panel > .close-btn[data-v-a86570b6] {
  position: absolute;
  right: 14px;
  top: 12px;
  z-index: 2;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  color: #4a6fa5;
  background: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  font-size: 20px;
  line-height: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  transition: all 0.24s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(26, 45, 78, 0.12);
}
.thumb-expand-modal > .panel > .close-btn[data-v-a86570b6]:hover {
  background: rgb(235, 243, 255);
  color: #2d5a9e;
  transform: scale(1.08);
  box-shadow: 0 4px 12px rgba(31, 68, 125, 0.18);
}
.thumb-expand-modal > .panel > .close-btn[data-v-a86570b6]:active {
  transform: scale(0.96);
}
.thumb-expand-modal > .panel > .grid-wrap[data-v-a86570b6] {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 48px 16px 12px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 120px));
  gap: 12px;
  justify-content: start;
  align-content: start;
  min-height: 640px;
}
.thumb-expand-modal > .panel > .grid-wrap.distributed[data-v-a86570b6] {
  justify-content: space-between;
}
.thumb-expand-modal > .panel > .grid-wrap > .thumb-item[data-v-a86570b6] {
  height: 206px;
  border: 1px solid rgba(92, 119, 163, 0.18);
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(250, 252, 255, 0.93) 100%);
  box-shadow: 0 3px 10px rgba(26, 45, 78, 0.05), 0 1px 3px rgba(26, 45, 78, 0.07);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding: 8px;
  gap: 8px;
  cursor: pointer;
  transition: all 0.26s cubic-bezier(0.4, 0, 0.2, 1);
}
.thumb-expand-modal > .panel > .grid-wrap > .thumb-item[data-v-a86570b6]:hover {
  transform: translateY(-2px);
  border-color: hsl(145, 63%, 49%);
  box-shadow: 0 10px 24px hsla(145, 63%, 49%, 0.15), 0 4px 12px hsla(145, 63%, 49%, 0.1);
  background: linear-gradient(135deg, rgb(255, 255, 255) 0%, rgba(248, 255, 252, 0.98) 100%);
}
.thumb-expand-modal > .panel > .grid-wrap > .thumb-item.active[data-v-a86570b6] {
  border-color: hsl(145, 63%, 49%);
  box-shadow: 0 8px 20px hsla(145, 63%, 49%, 0.2), 0 0 0 2px hsla(145, 63%, 49%, 0.15);
  background: linear-gradient(135deg, rgba(240, 255, 248, 0.98) 0%, rgba(235, 252, 245, 0.96) 100%);
}
.thumb-expand-modal > .panel > .grid-wrap > .thumb-item > .thumb-frame[data-v-a86570b6] {
  width: 100%;
  aspect-ratio: 100/144;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.thumb-expand-modal > .panel > .grid-wrap > .thumb-item > .thumb-frame.error[data-v-a86570b6] {
  border: 1px dashed rgba(122, 136, 162, 0.4);
  background: rgba(220, 227, 238, 0.5);
}
.thumb-expand-modal > .panel > .grid-wrap > .thumb-item > .thumb-frame[data-v-a86570b6] >  .thumb-view {
  width: 100%;
  height: 100%;
}
.thumb-expand-modal > .panel > .grid-wrap > .thumb-item > .thumb-frame[data-v-a86570b6] >  .thumb-view .thumb-fallback {
  font-size: 12px;
  color: #5d6f8f;
}
.thumb-expand-modal > .panel > .grid-wrap > .thumb-item > .page-label[data-v-a86570b6] {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 24px;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 600;
  color: #2b4f86;
  background: linear-gradient(135deg, rgba(220, 233, 255, 0.6) 0%, rgba(230, 240, 255, 0.5) 100%);
  transition: all 0.22s ease;
}
.thumb-expand-modal > .panel > .grid-wrap > .thumb-item:hover > .page-label[data-v-a86570b6] {
  background: linear-gradient(135deg, hsla(145, 63%, 85%, 0.7) 0%, hsla(145, 63%, 90%, 0.6) 100%);
  color: hsl(145, 63%, 30%);
}
.thumb-expand-modal > .panel > .grid-wrap > .thumb-item.active > .page-label[data-v-a86570b6] {
  background: linear-gradient(135deg, hsla(145, 63%, 75%, 0.85) 0%, hsla(145, 63%, 80%, 0.75) 100%);
  color: hsl(145, 63%, 25%);
  font-weight: 700;
}
.thumb-expand-modal > .panel > .pager-row[data-v-a86570b6] {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top: 1px solid rgba(78, 102, 146, 0.15);
  padding: 14px 16px 16px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(250, 252, 255, 0.88) 100%);
  backdrop-filter: blur(4px);
}
@media only screen and (max-width: 1023px) {
.thumb-expand-modal[data-v-a86570b6] {
    padding: 14px;
}
.thumb-expand-modal > .panel[data-v-a86570b6] {
    min-height: min(86vh, 840px);
}
.thumb-expand-modal > .panel > .grid-wrap[data-v-a86570b6] {
    padding: 44px 14px 12px;
    gap: 10px;
}
}
@media only screen and (max-width: 767px) {
.thumb-expand-modal[data-v-a86570b6] {
    padding: 0;
}
.thumb-expand-modal > .panel[data-v-a86570b6] {
    width: 100%;
    height: 100%;
    max-height: none;
    min-height: 100%;
    border-radius: 0;
}
.thumb-expand-modal > .panel > .grid-wrap[data-v-a86570b6] {
    padding: 44px 0 10px;
    gap: 10px;
}
.thumb-expand-modal > .panel > .grid-wrap > .thumb-item[data-v-a86570b6] {
    height: 196px;
    padding: 7px;
    gap: 7px;
}
.thumb-expand-modal > .panel > .grid-wrap > .thumb-item > .page-label[data-v-a86570b6] {
    height: 22px;
    font-size: 11px;
}
}/* mussy */
.split-handle[data-v-100ef373] {
  position: relative;
  z-index: 13000;
  background: transparent;
  transition: background-color 0.2s ease;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: none;
}
.split-handle.vertical[data-v-100ef373] {
  width: 0;
}
.split-handle.horizontal[data-v-100ef373] {
  height: 0;
}
.split-handle .grip[data-v-100ef373] {
  position: absolute;
  border-radius: 2px;
  background: transparent;
  transition: background-color 0.2s ease;
}
.split-handle.vertical .grip[data-v-100ef373] {
  top: 0;
  bottom: 0;
  left: -5px;
  width: 10px;
  cursor: col-resize;
}
.split-handle.horizontal .grip[data-v-100ef373] {
  left: 0;
  right: 0;
  top: -5px;
  height: 10px;
  cursor: row-resize;
}
.split-handle.active .grip[data-v-100ef373], .split-handle:hover .grip[data-v-100ef373] {
  background: rgba(46, 204, 113, 0.16);
}/* mussy */
.dock-workspace[data-v-fa3343db] {
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.dock-workspace.slot-right[data-v-fa3343db] {
  flex-direction: row-reverse;
}
.dock-workspace.slot-bottom[data-v-fa3343db] {
  flex-direction: column;
}
.thumb-panel[data-v-fa3343db] {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  opacity: 1;
  transition: width 0.28s ease, height 0.28s ease, opacity 0.22s ease;
}
.thumb-panel.collapsed[data-v-fa3343db] {
  opacity: 0;
  pointer-events: none;
}
.thumb-panel.side[data-v-fa3343db] {
  height: 100%;
}
.thumb-panel.bottom[data-v-fa3343db] {
  width: 100%;
}
.main-panel[data-v-fa3343db] {
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
.main-panel.resizing[data-v-fa3343db] {
  user-select: none;
}
.drop-overlay[data-v-fa3343db] {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 12000;
}
.drop-overlay .drop-zone[data-v-fa3343db] {
  position: absolute;
  border: 1px dashed rgba(255, 255, 255, 0.45);
  background: rgba(0, 0, 0, 0.15);
  color: white;
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  align-items: center;
  justify-content: center;
  display: flex;
  transition: all 0.16s ease;
}
.drop-overlay .drop-zone.left[data-v-fa3343db] {
  top: 8px;
  left: 8px;
  bottom: 8px;
  width: 22%;
}
.drop-overlay .drop-zone.right[data-v-fa3343db] {
  top: 8px;
  right: 8px;
  bottom: 8px;
  width: 22%;
}
.drop-overlay .drop-zone.bottom[data-v-fa3343db] {
  left: 8px;
  right: 8px;
  bottom: 8px;
  height: 24%;
}
.drop-overlay .drop-zone.active[data-v-fa3343db] {
  background: rgba(46, 204, 113, 0.28);
  border-color: rgba(46, 204, 113, 0.9);
}/* mussy */
div[data-v-bd0ec685] {
  display: flex;
}
.reader-view[data-v-bd0ec685] {
  position: relative;
  flex-direction: row;
  align-items: center;
  height: 100%;
  width: 100%;
}
.reader-view[data-v-bd0ec685] .main-content {
  height: 100%;
  width: 100%;
  flex-grow: 1;
  position: relative;
  display: flex;
  flex-direction: column;
}
.reader-view[data-v-bd0ec685] .main-content > .top-bar {
  position: absolute;
  z-index: 10000;
  left: 0;
  top: 0;
  width: 100%;
}
.reader-view[data-v-bd0ec685] .main-content > .content {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.reader-view > .panel[data-v-bd0ec685] {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 2vh;
  right: 2vh;
  z-index: 10000;
  opacity: 0.5;
  transition: all 0.2s ease;
}
.reader-view > .panel[data-v-bd0ec685]:hover {
  opacity: 1;
}
.reader-view > .panel > .location[data-v-bd0ec685] {
  color: hsl(145, 63%, 42%);
  display: inline-block;
  font-size: 16px;
  line-height: 16px;
  margin-top: 2px;
}
.reader-view > .panel .icon-container[data-v-bd0ec685] {
  position: relative;
  display: inline-block;
}
.reader-view > .panel > .full-screen[data-v-bd0ec685] {
  cursor: pointer;
  margin-left: 5px;
}
.reader-view > .panel > .full-screen > svg[data-v-bd0ec685] {
  fill: hsl(145, 63%, 42%);
  width: 26px;
  height: 26px;
}
.reader-view > .status-pannel[data-v-bd0ec685] {
  z-index: 10000;
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  opacity: 0.5;
  background-color: black;
  padding: 3px 5px;
  gap: 3px;
}
.reader-view > .status-pannel > .progress[data-v-bd0ec685] {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 11px;
  line-height: 11px;
  color: white;
}
.reader-view > .status-pannel > .full-screen[data-v-bd0ec685] {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 0;
  color: white;
  transition: color 0.2s ease;
}
.reader-view > .status-pannel > .full-screen[data-v-bd0ec685]:hover {
  color: hsl(145, 63%, 42%);
}
.reader-view > .status-pannel > .full-screen > svg[data-v-bd0ec685] {
  fill: currentColor;
  width: 12px;
  height: 12px;
}article[data-v-19f1746c], header[data-v-19f1746c], footer[data-v-19f1746c], p[data-v-19f1746c], span[data-v-19f1746c], div[data-v-19f1746c] {
  display: flex;
}
.status-notification-item[data-v-19f1746c] {
  flex-direction: column;
  width: 320px;
  padding: 12px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(28, 32, 40, 0.96), rgba(20, 22, 28, 0.96));
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
  color: #f8fbff;
  gap: 8px;
}
.status-notification-item > header[data-v-19f1746c] {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.status-notification-item > header > strong[data-v-19f1746c] {
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.2px;
}
.status-notification-item > header > .close[data-v-19f1746c] {
  border: 0;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;
  font-size: 14px;
  line-height: 14px;
}
.status-notification-item > p[data-v-19f1746c] {
  margin: 0;
  font-size: 12px;
  line-height: 16px;
  color: rgba(245, 250, 255, 0.92);
}
.status-notification-item > .actions[data-v-19f1746c] {
  flex-direction: row;
  gap: 8px;
}
.status-notification-item > .actions > .action-btn[data-v-19f1746c] {
  border: 0;
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 11px;
  line-height: 14px;
  cursor: pointer;
  color: #f6fbff;
  background: rgba(255, 255, 255, 0.16);
}
.status-notification-item > .actions > .action-btn.danger[data-v-19f1746c] {
  background: rgba(255, 92, 92, 0.26);
  border: 1px solid rgba(255, 140, 140, 0.6);
}
.status-notification-item > footer[data-v-19f1746c] {
  flex-direction: column;
  gap: 4px;
}
.status-notification-item > footer > span[data-v-19f1746c] {
  font-size: 11px;
  color: rgba(245, 250, 255, 0.8);
}
.status-notification-item > footer > .bar[data-v-19f1746c] {
  position: relative;
  width: 100%;
  height: 5px;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.16);
}
.status-notification-item > footer > .bar > i[data-v-19f1746c] {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(90deg, #45d483, #9df39d);
}
.status-notification-item.severity-error[data-v-19f1746c] {
  border-color: rgba(255, 124, 124, 0.5);
}
.status-notification-item.severity-error > footer > .bar > i[data-v-19f1746c] {
  background: linear-gradient(90deg, #ff7c7c, #ffb6b6);
}
.status-notification-item.severity-warning[data-v-19f1746c] {
  border-color: rgba(255, 199, 94, 0.55);
}
.status-notification-item.severity-warning > footer > .bar > i[data-v-19f1746c] {
  background: linear-gradient(90deg, #ffc75e, #ffe59d);
}
@media only screen and (max-width: 767px) {
.status-notification-item[data-v-19f1746c] {
    width: min(88vw, 320px);
    padding: 10px;
}
}div[data-v-cded4c82] {
  display: flex;
}
.status-notification-stack[data-v-cded4c82] {
  position: fixed;
  right: 8px;
  bottom: 28px;
  z-index: 10020;
  pointer-events: none;
}
.status-notification-stack > .list[data-v-cded4c82] {
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  pointer-events: auto;
}
@media only screen and (max-width: 767px) {
.status-notification-stack[data-v-cded4c82] {
    right: 6px;
    bottom: 32px;
}
}
/* mussy */
p.markdown {
  font-size: 14px !important;
  line-height: 1.42857143 !important;
  color: #333 !important;
}
p.markdown * {
  box-sizing: border-box;
}
p.markdown *:before,
p.markdown *:after {
  box-sizing: border-box;
}
p.markdown hr {
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-top: 1px solid #eee;
  height: 0;
}
p.markdown input,
p.markdown button,
p.markdown select,
p.markdown textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}
p.markdown a {
  color: #428bca;
  text-decoration: none;
  background: transparent;
}
p.markdown a:hover, p.markdown a:focus {
  color: #2a6496;
  outline: none;
  text-decoration: underline;
}
p.markdown p {
  margin: 0 0 10px !important;
}
p.markdown b,
p.markdown strong {
  font-weight: bold;
}
p.markdown h1 {
  font-size: 36px;
  margin: 0.67em 0;
}
p.markdown h2 {
  font-size: 30px;
}
p.markdown h4 {
  font-size: 18px;
}
p.markdown h5 {
  font-size: 14px;
}
p.markdown h6 {
  font-size: 12px;
}
p.markdown h1,
p.markdown h2,
p.markdown h3 {
  margin-top: 20px !important;
  margin-bottom: 10px !important;
}
p.markdown h4,
p.markdown h5,
p.markdown h6 {
  margin-top: 10px !important;
  margin-bottom: 10px !important;
}
p.markdown h1,
p.markdown h2,
p.markdown h3,
p.markdown h4,
p.markdown h5,
p.markdown h6 {
  font-family: inherit;
  font-weight: 500;
  line-height: 1.1;
  color: inherit;
}
p.markdown blockquote {
  padding: 10px 20px;
  margin: 0 0 20px;
  font-size: 17.5px;
  border-left: 5px solid #eee;
}
p.markdown blockquote:before {
  content: "";
}
p.markdown blockquote:after {
  content: "";
}
p.markdown ul,
p.markdown ol {
  margin-top: 0;
  margin-bottom: 10px;
}
p.markdown code,
p.markdown kbd,
p.markdown pre,
p.markdown samp {
  font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
}
p.markdown code {
  padding: 2px 4px;
  font-size: 90%;
  color: #c7254e;
  background-color: #f9f2f4;
  border-radius: 4px;
}
p.markdown ul {
  padding-left: 20px;
}
p.markdown ul ul,
p.markdown ol ul,
p.markdown ul ol,
p.markdown ol ol {
  margin-bottom: 0;
}
p.markdown pre {
  display: block;
  padding: 9.5px;
  margin: 0 0 10px;
  font-size: 13px;
  line-height: 1.42857143;
  color: #333;
  word-break: break-all;
  word-wrap: break-word;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: auto;
}
p.markdown pre code {
  padding: 0;
  font-size: inherit;
  color: inherit;
  white-space: pre-wrap;
  background-color: transparent;
  border-radius: 0;
}
p.markdown table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
  background-color: transparent;
  border-spacing: 0;
  border-collapse: collapse;
}
p.markdown table > caption + thead > tr:first-child > th,
p.markdown table > colgroup + thead > tr:first-child > th,
p.markdown table > thead:first-child > tr:first-child > th,
p.markdown table > caption + thead > tr:first-child > td,
p.markdown table > colgroup + thead > tr:first-child > td,
p.markdown table > thead:first-child > tr:first-child > td {
  border-top: 0;
}
p.markdown table > thead > tr > th {
  vertical-align: bottom;
  border-bottom: 2px solid #ddd;
}
p.markdown table > thead > tr > th,
p.markdown table > tbody > tr > th,
p.markdown table > tfoot > tr > th,
p.markdown table > thead > tr > td,
p.markdown table > tbody > tr > td,
p.markdown table > tfoot > tr > td {
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
  border-top: 1px solid #ddd;
}
p.markdown th {
  text-align: left;
}
p.markdown td,
p.markdown th {
  padding: 0;
}
p.markdown tbody > tr:nth-child(odd) > td,
p.markdown tbody > tr:nth-child(odd) > th {
  background-color: #f9f9f9;
}
p.markdown img {
  max-width: 35%;
  vertical-align: middle;
  border: 0;
}
p.markdown sub,
p.markdown sup {
  position: relative;
  font-size: 75%;
  line-height: 0;
  vertical-align: baseline;
}
p.markdown sup {
  top: -0.5em;
}
p.markdown .emoji {
  height: 1.2em;
}
.normalize {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  margin: 0;
  -webkit-font-smoothing: auto;
}
.normalize main {
  display: block;
}
.normalize h1 {
  font-size: 2em;
  margin: 0.67em 0;
}
.normalize hr {
  box-sizing: content-box;
  height: 0;
  overflow: visible;
}
.normalize pre {
  font-family: monospace, monospace;
  font-size: 1em;
}
.normalize a {
  background-color: transparent;
}
.normalize abbr[title] {
  border-bottom: none;
  text-decoration: underline;
  text-decoration: underline dotted;
}
.normalize b,
.normalize strong {
  font-weight: bolder;
}
.normalize code,
.normalize kbd,
.normalize samp {
  font-family: monospace, monospace;
  font-size: 1em;
}
.normalize small {
  font-size: 80%;
}
.normalize sub,
.normalize sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
.normalize sub {
  bottom: -0.25em;
}
.normalize sup {
  top: -0.5em;
}
.normalize img {
  border-style: none;
}
.normalize button,
.normalize input,
.normalize optgroup,
.normalize select,
.normalize textarea {
  font-family: inherit;
  /* 1 */
  font-size: 100%;
  /* 1 */
  line-height: 1.15;
  margin: 0;
}
.normalize button,
.normalize input {
  overflow: visible;
}
.normalize button,
.normalize select {
  text-transform: none;
}
.normalize button,
.normalize [type=button],
.normalize [type=reset],
.normalize [type=submit] {
  -webkit-appearance: button;
}
.normalize button::-moz-focus-inner,
.normalize [type=button]::-moz-focus-inner,
.normalize [type=reset]::-moz-focus-inner,
.normalize [type=submit]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}
.normalize button:-moz-focusring,
.normalize [type=button]:-moz-focusring,
.normalize [type=reset]:-moz-focusring,
.normalize [type=submit]:-moz-focusring {
  outline: 1px dotted ButtonText;
}
.normalize fieldset {
  padding: 0.35em 0.75em 0.625em;
}
.normalize legend {
  box-sizing: border-box;
  color: inherit;
  display: table;
  max-width: 100%;
  padding: 0;
  white-space: normal;
}
.normalize progress {
  vertical-align: baseline;
}
.normalize textarea {
  overflow: auto;
}
.normalize [type=checkbox],
.normalize [type=radio] {
  box-sizing: border-box;
  padding: 0;
}
.normalize [type=number]::-webkit-inner-spin-button,
.normalize [type=number]::-webkit-outer-spin-button {
  height: auto;
}
.normalize [type=search] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}
.normalize [type=search]::-webkit-search-decoration {
  -webkit-appearance: none;
}
.normalize ::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}
.normalize details {
  display: block;
}
.normalize summary {
  display: list-item;
}
.normalize template {
  display: none;
}
.normalize [hidden] {
  display: none;
}
.ehunter-app {
  --ehunter-primary-color: #2ecc71;
  --ehunter-accent-color: #28af60;
  --ehunter-switch-track-active: #71ca96;
  --ehunter-switch-thumb-active: #006548;
  font-family: PingFang SC, Microsoft YaHei, 微软雅黑, Arial, Hiragino Sans GB, Heiti SC, Droid Sans, WenQuanYi Micro Hei, sans-serif !important;
  display: flex;
  height: 100%;
  text-align: initial;
}
.ehunter-app section,
.ehunter-app header,
.ehunter-app nav {
  display: flex;
}
.ehunter-app p {
  padding: 0;
  margin: 0;
}
.ehunter-app h1,
.ehunter-app h2,
.ehunter-app h3,
.ehunter-app h4,
.ehunter-app h5,
.ehunter-app h6 {
  margin: 0;
}
.ehunter-app .clickable {
  cursor: pointer;
}
.ehunter-app .no-select {
  user-select: none;
}
.ehunter-app div {
  display: flex;
}
.ehunter-app .tips {
  position: relative;
}
.ehunter-app .tips:hover:after {
  content: attr(title-content);
  position: absolute;
  top: -110%;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 12px;
  white-space: nowrap;
  padding: 4px 6px 5px 6px;
  border-radius: 2px;
  min-width: 50px;
  text-align: center;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.117647), 0 1px 4px rgba(0, 0, 0, 0.117647);
  color: white;
}
.ehunter-app .tips.tips-down:hover:after {
  top: 130%;
}
.ehunter-app .tips.tips-right:hover:after {
  left: -10%;
  transform: initial;
}
.ehunter-app .tips.tips-left:hover:after {
  right: -20%;
  left: initial;
  transform: initial;
}
.ehunter-app .slide-fade-enter-active,
.ehunter-app .slide-fade-leave-active {
  transition: all 0.2s ease;
}
.ehunter-app .slide-fade-enter-from,
.ehunter-app .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.ehunter-app .center-horizontal-fade-enter-active,
.ehunter-app .center-horizontal-fade-leave-active {
  transition: all 0.8s ease;
}
.ehunter-app .center-horizontal-fade-enter-from,
.ehunter-app .center-horizontal-fade-leave-to {
  transform: translateX(-40%) !important;
  opacity: 0 !important;
}
.ehunter-app .slow-horizontal-fade-enter-active,
.ehunter-app .slow-horizontal-fade-leave-active {
  transition: all 0.8s ease;
}
.ehunter-app .slow-horizontal-fade-enter-from,
.ehunter-app .slow-horizontal-fade-leave-to {
  transform: translateX(20%);
  opacity: 0;
}
.ehunter-app .loading-horizontal-fade-enter-active,
.ehunter-app .loading-horizontal-fade-leave-active {
  transition: all 0.5s ease;
}
.ehunter-app .loading-horizontal-fade-enter-from,
.ehunter-app .loading-horizontal-fade-leave-to {
  transform: translateX(20%);
  opacity: 0;
}
.ehunter-app .fast-horizontal-fade-enter-active,
.ehunter-app .fast-horizontal-fade-leave-active {
  transition: all 0.4s ease;
}
.ehunter-app .fast-horizontal-fade-enter-from,
.ehunter-app .fast-horizontal-fade-leave-to {
  transform: translateX(20%);
  opacity: 0;
}
.ehunter-app .slow-vertical-fade-enter-active,
.ehunter-app .slow-vertical-fade-leave-active {
  transition: all 0.8s ease;
}
.ehunter-app .slow-vertical-fade-enter-from,
.ehunter-app .slow-vertical-fade-leave-to {
  transform: translate(-20%, 20%);
  opacity: 0;
}
.ehunter-app .slow-opacity-fade-enter-active,
.ehunter-app .slow-opacity-fade-leave-active {
  transition: all 0.3s ease;
}
.ehunter-app .slow-opacity-fade-enter-from,
.ehunter-app .slow-opacity-fade-leave-to {
  opacity: 0;
}
.ehunter-app .vertical-list-enter-active,
.ehunter-app .vertical-list-leave-active {
  transition: all 0.5s;
}
.ehunter-app .vertical-list-enter-from,
.ehunter-app .vertical-list-leave-to {
  opacity: 0;
  transform: translateY(10%);
}
#jmehunter-app[data-ehunter-platform=C18] .ehunter-app {
  --ehunter-primary-color: #FF7A00;
  --ehunter-accent-color: #FF7A00;
  --ehunter-switch-track-active: #FFB166;
  --ehunter-switch-thumb-active: #FF7A00;
}
.ehunter-container {
    position: absolute;
    height: 100%;
    width: 100%;
    background: #333333;
    left: 0;
    top: 0;
    z-index: 1;
}
.normalize {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  margin: 0;
  -webkit-font-smoothing: auto;
}
.normalize main {
  display: block;
}
.normalize h1 {
  font-size: 2em;
  margin: 0.67em 0;
}
.normalize hr {
  box-sizing: content-box;
  height: 0;
  overflow: visible;
}
.normalize pre {
  font-family: monospace, monospace;
  font-size: 1em;
}
.normalize a {
  background-color: transparent;
}
.normalize abbr[title] {
  border-bottom: none;
  text-decoration: underline;
  text-decoration: underline dotted;
}
.normalize b,
.normalize strong {
  font-weight: bolder;
}
.normalize code,
.normalize kbd,
.normalize samp {
  font-family: monospace, monospace;
  font-size: 1em;
}
.normalize small {
  font-size: 80%;
}
.normalize sub,
.normalize sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
.normalize sub {
  bottom: -0.25em;
}
.normalize sup {
  top: -0.5em;
}
.normalize img {
  border-style: none;
}
.normalize button,
.normalize input,
.normalize optgroup,
.normalize select,
.normalize textarea {
  font-family: inherit;
  /* 1 */
  font-size: 100%;
  /* 1 */
  line-height: 1.15;
  margin: 0;
}
.normalize button,
.normalize input {
  overflow: visible;
}
.normalize button,
.normalize select {
  text-transform: none;
}
.normalize button,
.normalize [type=button],
.normalize [type=reset],
.normalize [type=submit] {
  -webkit-appearance: button;
}
.normalize button::-moz-focus-inner,
.normalize [type=button]::-moz-focus-inner,
.normalize [type=reset]::-moz-focus-inner,
.normalize [type=submit]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}
.normalize button:-moz-focusring,
.normalize [type=button]:-moz-focusring,
.normalize [type=reset]:-moz-focusring,
.normalize [type=submit]:-moz-focusring {
  outline: 1px dotted ButtonText;
}
.normalize fieldset {
  padding: 0.35em 0.75em 0.625em;
}
.normalize legend {
  box-sizing: border-box;
  color: inherit;
  display: table;
  max-width: 100%;
  padding: 0;
  white-space: normal;
}
.normalize progress {
  vertical-align: baseline;
}
.normalize textarea {
  overflow: auto;
}
.normalize [type=checkbox],
.normalize [type=radio] {
  box-sizing: border-box;
  padding: 0;
}
.normalize [type=number]::-webkit-inner-spin-button,
.normalize [type=number]::-webkit-outer-spin-button {
  height: auto;
}
.normalize [type=search] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}
.normalize [type=search]::-webkit-search-decoration {
  -webkit-appearance: none;
}
.normalize ::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}
.normalize details {
  display: block;
}
.normalize summary {
  display: list-item;
}
.normalize template {
  display: none;
}
.normalize [hidden] {
  display: none;
}`));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
(function() {
  "use strict";
  /**
  * @vue/shared v3.5.28
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  // @__NO_SIDE_EFFECTS__
  function makeMap(str) {
    const map2 = /* @__PURE__ */ Object.create(null);
    for (const key of str.split(",")) map2[key] = 1;
    return (val) => val in map2;
  }
  const EMPTY_OBJ = {};
  const EMPTY_ARR = [];
  const NOOP = () => {
  };
  const NO = () => false;
  const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
  (key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
  const isModelListener = (key) => key.startsWith("onUpdate:");
  const extend = Object.assign;
  const remove = (arr, el2) => {
    const i2 = arr.indexOf(el2);
    if (i2 > -1) {
      arr.splice(i2, 1);
    }
  };
  const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
  const isArray = Array.isArray;
  const isMap = (val) => toTypeString(val) === "[object Map]";
  const isSet = (val) => toTypeString(val) === "[object Set]";
  const isDate = (val) => toTypeString(val) === "[object Date]";
  const isFunction = (val) => typeof val === "function";
  const isString = (val) => typeof val === "string";
  const isSymbol = (val) => typeof val === "symbol";
  const isObject = (val) => val !== null && typeof val === "object";
  const isPromise = (val) => {
    return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
  };
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
  };
  const isPlainObject = (val) => toTypeString(val) === "[object Object]";
  const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
  const isReservedProp = /* @__PURE__ */ makeMap(
    // the leading comma is intentional so empty string "" is also included
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  );
  const cacheStringFunction = (fn) => {
    const cache = /* @__PURE__ */ Object.create(null);
    return ((str) => {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    });
  };
  const camelizeRE = /-\w/g;
  const camelize = cacheStringFunction(
    (str) => {
      return str.replace(camelizeRE, (c) => c.slice(1).toUpperCase());
    }
  );
  const hyphenateRE = /\B([A-Z])/g;
  const hyphenate = cacheStringFunction(
    (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
  );
  const capitalize = cacheStringFunction((str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  const toHandlerKey = cacheStringFunction(
    (str) => {
      const s = str ? `on${capitalize(str)}` : ``;
      return s;
    }
  );
  const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
  const invokeArrayFns = (fns, ...arg) => {
    for (let i2 = 0; i2 < fns.length; i2++) {
      fns[i2](...arg);
    }
  };
  const def = (obj, key, value, writable = false) => {
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: false,
      writable,
      value
    });
  };
  const looseToNumber = (val) => {
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
  };
  const toNumber = (val) => {
    const n = isString(val) ? Number(val) : NaN;
    return isNaN(n) ? val : n;
  };
  let _globalThis;
  const getGlobalThis = () => {
    return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
  };
  function normalizeStyle(value) {
    if (isArray(value)) {
      const res = {};
      for (let i2 = 0; i2 < value.length; i2++) {
        const item = value[i2];
        const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
        if (normalized) {
          for (const key in normalized) {
            res[key] = normalized[key];
          }
        }
      }
      return res;
    } else if (isString(value) || isObject(value)) {
      return value;
    }
  }
  const listDelimiterRE = /;(?![^(]*\))/g;
  const propertyDelimiterRE = /:([^]+)/;
  const styleCommentRE = /\/\*[^]*?\*\//g;
  function parseStringStyle(cssText) {
    const ret = {};
    cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
      if (item) {
        const tmp = item.split(propertyDelimiterRE);
        tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return ret;
  }
  function normalizeClass(value) {
    let res = "";
    if (isString(value)) {
      res = value;
    } else if (isArray(value)) {
      for (let i2 = 0; i2 < value.length; i2++) {
        const normalized = normalizeClass(value[i2]);
        if (normalized) {
          res += normalized + " ";
        }
      }
    } else if (isObject(value)) {
      for (const name in value) {
        if (value[name]) {
          res += name + " ";
        }
      }
    }
    return res.trim();
  }
  const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
  const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
  function includeBooleanAttr(value) {
    return !!value || value === "";
  }
  function looseCompareArrays(a, b) {
    if (a.length !== b.length) return false;
    let equal = true;
    for (let i2 = 0; equal && i2 < a.length; i2++) {
      equal = looseEqual(a[i2], b[i2]);
    }
    return equal;
  }
  function looseEqual(a, b) {
    if (a === b) return true;
    let aValidType = isDate(a);
    let bValidType = isDate(b);
    if (aValidType || bValidType) {
      return aValidType && bValidType ? a.getTime() === b.getTime() : false;
    }
    aValidType = isSymbol(a);
    bValidType = isSymbol(b);
    if (aValidType || bValidType) {
      return a === b;
    }
    aValidType = isArray(a);
    bValidType = isArray(b);
    if (aValidType || bValidType) {
      return aValidType && bValidType ? looseCompareArrays(a, b) : false;
    }
    aValidType = isObject(a);
    bValidType = isObject(b);
    if (aValidType || bValidType) {
      if (!aValidType || !bValidType) {
        return false;
      }
      const aKeysCount = Object.keys(a).length;
      const bKeysCount = Object.keys(b).length;
      if (aKeysCount !== bKeysCount) {
        return false;
      }
      for (const key in a) {
        const aHasKey = a.hasOwnProperty(key);
        const bHasKey = b.hasOwnProperty(key);
        if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
          return false;
        }
      }
    }
    return String(a) === String(b);
  }
  const isRef$1 = (val) => {
    return !!(val && val["__v_isRef"] === true);
  };
  const toDisplayString = (val) => {
    return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? isRef$1(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
  };
  const replacer = (_key, val) => {
    if (isRef$1(val)) {
      return replacer(_key, val.value);
    } else if (isMap(val)) {
      return {
        [`Map(${val.size})`]: [...val.entries()].reduce(
          (entries, [key, val2], i2) => {
            entries[stringifySymbol(key, i2) + " =>"] = val2;
            return entries;
          },
          {}
        )
      };
    } else if (isSet(val)) {
      return {
        [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
      };
    } else if (isSymbol(val)) {
      return stringifySymbol(val);
    } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
      return String(val);
    }
    return val;
  };
  const stringifySymbol = (v, i2 = "") => {
    var _a2;
    return (
      // Symbol.description in es2019+ so we need to cast here to pass
      // the lib: es2016 check
      isSymbol(v) ? `Symbol(${(_a2 = v.description) != null ? _a2 : i2})` : v
    );
  };
  function normalizeCssVarValue(value) {
    if (value == null) {
      return "initial";
    }
    if (typeof value === "string") {
      return value === "" ? " " : value;
    }
    return String(value);
  }
  /**
  * @vue/reactivity v3.5.28
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  let activeEffectScope;
  class EffectScope {
    // TODO isolatedDeclarations "__v_skip"
    constructor(detached = false) {
      this.detached = detached;
      this._active = true;
      this._on = 0;
      this.effects = [];
      this.cleanups = [];
      this._isPaused = false;
      this.__v_skip = true;
      this.parent = activeEffectScope;
      if (!detached && activeEffectScope) {
        this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
          this
        ) - 1;
      }
    }
    get active() {
      return this._active;
    }
    pause() {
      if (this._active) {
        this._isPaused = true;
        let i2, l;
        if (this.scopes) {
          for (i2 = 0, l = this.scopes.length; i2 < l; i2++) {
            this.scopes[i2].pause();
          }
        }
        for (i2 = 0, l = this.effects.length; i2 < l; i2++) {
          this.effects[i2].pause();
        }
      }
    }
    /**
     * Resumes the effect scope, including all child scopes and effects.
     */
    resume() {
      if (this._active) {
        if (this._isPaused) {
          this._isPaused = false;
          let i2, l;
          if (this.scopes) {
            for (i2 = 0, l = this.scopes.length; i2 < l; i2++) {
              this.scopes[i2].resume();
            }
          }
          for (i2 = 0, l = this.effects.length; i2 < l; i2++) {
            this.effects[i2].resume();
          }
        }
      }
    }
    run(fn) {
      if (this._active) {
        const currentEffectScope = activeEffectScope;
        try {
          activeEffectScope = this;
          return fn();
        } finally {
          activeEffectScope = currentEffectScope;
        }
      }
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    on() {
      if (++this._on === 1) {
        this.prevScope = activeEffectScope;
        activeEffectScope = this;
      }
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    off() {
      if (this._on > 0 && --this._on === 0) {
        activeEffectScope = this.prevScope;
        this.prevScope = void 0;
      }
    }
    stop(fromParent) {
      if (this._active) {
        this._active = false;
        let i2, l;
        for (i2 = 0, l = this.effects.length; i2 < l; i2++) {
          this.effects[i2].stop();
        }
        this.effects.length = 0;
        for (i2 = 0, l = this.cleanups.length; i2 < l; i2++) {
          this.cleanups[i2]();
        }
        this.cleanups.length = 0;
        if (this.scopes) {
          for (i2 = 0, l = this.scopes.length; i2 < l; i2++) {
            this.scopes[i2].stop(true);
          }
          this.scopes.length = 0;
        }
        if (!this.detached && this.parent && !fromParent) {
          const last = this.parent.scopes.pop();
          if (last && last !== this) {
            this.parent.scopes[this.index] = last;
            last.index = this.index;
          }
        }
        this.parent = void 0;
      }
    }
  }
  function getCurrentScope() {
    return activeEffectScope;
  }
  let activeSub;
  const pausedQueueEffects = /* @__PURE__ */ new WeakSet();
  class ReactiveEffect {
    constructor(fn) {
      this.fn = fn;
      this.deps = void 0;
      this.depsTail = void 0;
      this.flags = 1 | 4;
      this.next = void 0;
      this.cleanup = void 0;
      this.scheduler = void 0;
      if (activeEffectScope && activeEffectScope.active) {
        activeEffectScope.effects.push(this);
      }
    }
    pause() {
      this.flags |= 64;
    }
    resume() {
      if (this.flags & 64) {
        this.flags &= -65;
        if (pausedQueueEffects.has(this)) {
          pausedQueueEffects.delete(this);
          this.trigger();
        }
      }
    }
    /**
     * @internal
     */
    notify() {
      if (this.flags & 2 && !(this.flags & 32)) {
        return;
      }
      if (!(this.flags & 8)) {
        batch(this);
      }
    }
    run() {
      if (!(this.flags & 1)) {
        return this.fn();
      }
      this.flags |= 2;
      cleanupEffect(this);
      prepareDeps(this);
      const prevEffect = activeSub;
      const prevShouldTrack = shouldTrack;
      activeSub = this;
      shouldTrack = true;
      try {
        return this.fn();
      } finally {
        cleanupDeps(this);
        activeSub = prevEffect;
        shouldTrack = prevShouldTrack;
        this.flags &= -3;
      }
    }
    stop() {
      if (this.flags & 1) {
        for (let link2 = this.deps; link2; link2 = link2.nextDep) {
          removeSub(link2);
        }
        this.deps = this.depsTail = void 0;
        cleanupEffect(this);
        this.onStop && this.onStop();
        this.flags &= -2;
      }
    }
    trigger() {
      if (this.flags & 64) {
        pausedQueueEffects.add(this);
      } else if (this.scheduler) {
        this.scheduler();
      } else {
        this.runIfDirty();
      }
    }
    /**
     * @internal
     */
    runIfDirty() {
      if (isDirty(this)) {
        this.run();
      }
    }
    get dirty() {
      return isDirty(this);
    }
  }
  let batchDepth = 0;
  let batchedSub;
  let batchedComputed;
  function batch(sub2, isComputed = false) {
    sub2.flags |= 8;
    if (isComputed) {
      sub2.next = batchedComputed;
      batchedComputed = sub2;
      return;
    }
    sub2.next = batchedSub;
    batchedSub = sub2;
  }
  function startBatch() {
    batchDepth++;
  }
  function endBatch() {
    if (--batchDepth > 0) {
      return;
    }
    if (batchedComputed) {
      let e = batchedComputed;
      batchedComputed = void 0;
      while (e) {
        const next = e.next;
        e.next = void 0;
        e.flags &= -9;
        e = next;
      }
    }
    let error;
    while (batchedSub) {
      let e = batchedSub;
      batchedSub = void 0;
      while (e) {
        const next = e.next;
        e.next = void 0;
        e.flags &= -9;
        if (e.flags & 1) {
          try {
            ;
            e.trigger();
          } catch (err2) {
            if (!error) error = err2;
          }
        }
        e = next;
      }
    }
    if (error) throw error;
  }
  function prepareDeps(sub2) {
    for (let link2 = sub2.deps; link2; link2 = link2.nextDep) {
      link2.version = -1;
      link2.prevActiveLink = link2.dep.activeLink;
      link2.dep.activeLink = link2;
    }
  }
  function cleanupDeps(sub2) {
    let head;
    let tail = sub2.depsTail;
    let link2 = tail;
    while (link2) {
      const prev = link2.prevDep;
      if (link2.version === -1) {
        if (link2 === tail) tail = prev;
        removeSub(link2);
        removeDep(link2);
      } else {
        head = link2;
      }
      link2.dep.activeLink = link2.prevActiveLink;
      link2.prevActiveLink = void 0;
      link2 = prev;
    }
    sub2.deps = head;
    sub2.depsTail = tail;
  }
  function isDirty(sub2) {
    for (let link2 = sub2.deps; link2; link2 = link2.nextDep) {
      if (link2.dep.version !== link2.version || link2.dep.computed && (refreshComputed(link2.dep.computed) || link2.dep.version !== link2.version)) {
        return true;
      }
    }
    if (sub2._dirty) {
      return true;
    }
    return false;
  }
  function refreshComputed(computed2) {
    if (computed2.flags & 4 && !(computed2.flags & 16)) {
      return;
    }
    computed2.flags &= -17;
    if (computed2.globalVersion === globalVersion) {
      return;
    }
    computed2.globalVersion = globalVersion;
    if (!computed2.isSSR && computed2.flags & 128 && (!computed2.deps && !computed2._dirty || !isDirty(computed2))) {
      return;
    }
    computed2.flags |= 2;
    const dep = computed2.dep;
    const prevSub = activeSub;
    const prevShouldTrack = shouldTrack;
    activeSub = computed2;
    shouldTrack = true;
    try {
      prepareDeps(computed2);
      const value = computed2.fn(computed2._value);
      if (dep.version === 0 || hasChanged(value, computed2._value)) {
        computed2.flags |= 128;
        computed2._value = value;
        dep.version++;
      }
    } catch (err2) {
      dep.version++;
      throw err2;
    } finally {
      activeSub = prevSub;
      shouldTrack = prevShouldTrack;
      cleanupDeps(computed2);
      computed2.flags &= -3;
    }
  }
  function removeSub(link2, soft = false) {
    const { dep, prevSub, nextSub } = link2;
    if (prevSub) {
      prevSub.nextSub = nextSub;
      link2.prevSub = void 0;
    }
    if (nextSub) {
      nextSub.prevSub = prevSub;
      link2.nextSub = void 0;
    }
    if (dep.subs === link2) {
      dep.subs = prevSub;
      if (!prevSub && dep.computed) {
        dep.computed.flags &= -5;
        for (let l = dep.computed.deps; l; l = l.nextDep) {
          removeSub(l, true);
        }
      }
    }
    if (!soft && !--dep.sc && dep.map) {
      dep.map.delete(dep.key);
    }
  }
  function removeDep(link2) {
    const { prevDep, nextDep } = link2;
    if (prevDep) {
      prevDep.nextDep = nextDep;
      link2.prevDep = void 0;
    }
    if (nextDep) {
      nextDep.prevDep = prevDep;
      link2.nextDep = void 0;
    }
  }
  let shouldTrack = true;
  const trackStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
  }
  function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === void 0 ? true : last;
  }
  function cleanupEffect(e) {
    const { cleanup } = e;
    e.cleanup = void 0;
    if (cleanup) {
      const prevSub = activeSub;
      activeSub = void 0;
      try {
        cleanup();
      } finally {
        activeSub = prevSub;
      }
    }
  }
  let globalVersion = 0;
  class Link {
    constructor(sub2, dep) {
      this.sub = sub2;
      this.dep = dep;
      this.version = dep.version;
      this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
    }
  }
  class Dep {
    // TODO isolatedDeclarations "__v_skip"
    constructor(computed2) {
      this.computed = computed2;
      this.version = 0;
      this.activeLink = void 0;
      this.subs = void 0;
      this.map = void 0;
      this.key = void 0;
      this.sc = 0;
      this.__v_skip = true;
    }
    track(debugInfo) {
      if (!activeSub || !shouldTrack || activeSub === this.computed) {
        return;
      }
      let link2 = this.activeLink;
      if (link2 === void 0 || link2.sub !== activeSub) {
        link2 = this.activeLink = new Link(activeSub, this);
        if (!activeSub.deps) {
          activeSub.deps = activeSub.depsTail = link2;
        } else {
          link2.prevDep = activeSub.depsTail;
          activeSub.depsTail.nextDep = link2;
          activeSub.depsTail = link2;
        }
        addSub(link2);
      } else if (link2.version === -1) {
        link2.version = this.version;
        if (link2.nextDep) {
          const next = link2.nextDep;
          next.prevDep = link2.prevDep;
          if (link2.prevDep) {
            link2.prevDep.nextDep = next;
          }
          link2.prevDep = activeSub.depsTail;
          link2.nextDep = void 0;
          activeSub.depsTail.nextDep = link2;
          activeSub.depsTail = link2;
          if (activeSub.deps === link2) {
            activeSub.deps = next;
          }
        }
      }
      return link2;
    }
    trigger(debugInfo) {
      this.version++;
      globalVersion++;
      this.notify(debugInfo);
    }
    notify(debugInfo) {
      startBatch();
      try {
        if (false) ;
        for (let link2 = this.subs; link2; link2 = link2.prevSub) {
          if (link2.sub.notify()) {
            ;
            link2.sub.dep.notify();
          }
        }
      } finally {
        endBatch();
      }
    }
  }
  function addSub(link2) {
    link2.dep.sc++;
    if (link2.sub.flags & 4) {
      const computed2 = link2.dep.computed;
      if (computed2 && !link2.dep.subs) {
        computed2.flags |= 4 | 16;
        for (let l = computed2.deps; l; l = l.nextDep) {
          addSub(l);
        }
      }
      const currentTail = link2.dep.subs;
      if (currentTail !== link2) {
        link2.prevSub = currentTail;
        if (currentTail) currentTail.nextSub = link2;
      }
      link2.dep.subs = link2;
    }
  }
  const targetMap = /* @__PURE__ */ new WeakMap();
  const ITERATE_KEY = /* @__PURE__ */ Symbol(
    ""
  );
  const MAP_KEY_ITERATE_KEY = /* @__PURE__ */ Symbol(
    ""
  );
  const ARRAY_ITERATE_KEY = /* @__PURE__ */ Symbol(
    ""
  );
  function track(target2, type, key) {
    if (shouldTrack && activeSub) {
      let depsMap = targetMap.get(target2);
      if (!depsMap) {
        targetMap.set(target2, depsMap = /* @__PURE__ */ new Map());
      }
      let dep = depsMap.get(key);
      if (!dep) {
        depsMap.set(key, dep = new Dep());
        dep.map = depsMap;
        dep.key = key;
      }
      {
        dep.track();
      }
    }
  }
  function trigger(target2, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target2);
    if (!depsMap) {
      globalVersion++;
      return;
    }
    const run = (dep) => {
      if (dep) {
        {
          dep.trigger();
        }
      }
    };
    startBatch();
    if (type === "clear") {
      depsMap.forEach(run);
    } else {
      const targetIsArray = isArray(target2);
      const isArrayIndex = targetIsArray && isIntegerKey(key);
      if (targetIsArray && key === "length") {
        const newLength = Number(newValue);
        depsMap.forEach((dep, key2) => {
          if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) {
            run(dep);
          }
        });
      } else {
        if (key !== void 0 || depsMap.has(void 0)) {
          run(depsMap.get(key));
        }
        if (isArrayIndex) {
          run(depsMap.get(ARRAY_ITERATE_KEY));
        }
        switch (type) {
          case "add":
            if (!targetIsArray) {
              run(depsMap.get(ITERATE_KEY));
              if (isMap(target2)) {
                run(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            } else if (isArrayIndex) {
              run(depsMap.get("length"));
            }
            break;
          case "delete":
            if (!targetIsArray) {
              run(depsMap.get(ITERATE_KEY));
              if (isMap(target2)) {
                run(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            }
            break;
          case "set":
            if (isMap(target2)) {
              run(depsMap.get(ITERATE_KEY));
            }
            break;
        }
      }
    }
    endBatch();
  }
  function reactiveReadArray(array) {
    const raw = /* @__PURE__ */ toRaw(array);
    if (raw === array) return raw;
    track(raw, "iterate", ARRAY_ITERATE_KEY);
    return /* @__PURE__ */ isShallow(array) ? raw : raw.map(toReactive);
  }
  function shallowReadArray(arr) {
    track(arr = /* @__PURE__ */ toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
    return arr;
  }
  function toWrapped(target2, item) {
    if (/* @__PURE__ */ isReadonly(target2)) {
      return /* @__PURE__ */ isReactive(target2) ? toReadonly(toReactive(item)) : toReadonly(item);
    }
    return toReactive(item);
  }
  const arrayInstrumentations = {
    __proto__: null,
    [Symbol.iterator]() {
      return iterator(this, Symbol.iterator, (item) => toWrapped(this, item));
    },
    concat(...args) {
      return reactiveReadArray(this).concat(
        ...args.map((x2) => isArray(x2) ? reactiveReadArray(x2) : x2)
      );
    },
    entries() {
      return iterator(this, "entries", (value) => {
        value[1] = toWrapped(this, value[1]);
        return value;
      });
    },
    every(fn, thisArg) {
      return apply(this, "every", fn, thisArg, void 0, arguments);
    },
    filter(fn, thisArg) {
      return apply(
        this,
        "filter",
        fn,
        thisArg,
        (v) => v.map((item) => toWrapped(this, item)),
        arguments
      );
    },
    find(fn, thisArg) {
      return apply(
        this,
        "find",
        fn,
        thisArg,
        (item) => toWrapped(this, item),
        arguments
      );
    },
    findIndex(fn, thisArg) {
      return apply(this, "findIndex", fn, thisArg, void 0, arguments);
    },
    findLast(fn, thisArg) {
      return apply(
        this,
        "findLast",
        fn,
        thisArg,
        (item) => toWrapped(this, item),
        arguments
      );
    },
    findLastIndex(fn, thisArg) {
      return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
    },
    // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
    forEach(fn, thisArg) {
      return apply(this, "forEach", fn, thisArg, void 0, arguments);
    },
    includes(...args) {
      return searchProxy(this, "includes", args);
    },
    indexOf(...args) {
      return searchProxy(this, "indexOf", args);
    },
    join(separator) {
      return reactiveReadArray(this).join(separator);
    },
    // keys() iterator only reads `length`, no optimization required
    lastIndexOf(...args) {
      return searchProxy(this, "lastIndexOf", args);
    },
    map(fn, thisArg) {
      return apply(this, "map", fn, thisArg, void 0, arguments);
    },
    pop() {
      return noTracking(this, "pop");
    },
    push(...args) {
      return noTracking(this, "push", args);
    },
    reduce(fn, ...args) {
      return reduce(this, "reduce", fn, args);
    },
    reduceRight(fn, ...args) {
      return reduce(this, "reduceRight", fn, args);
    },
    shift() {
      return noTracking(this, "shift");
    },
    // slice could use ARRAY_ITERATE but also seems to beg for range tracking
    some(fn, thisArg) {
      return apply(this, "some", fn, thisArg, void 0, arguments);
    },
    splice(...args) {
      return noTracking(this, "splice", args);
    },
    toReversed() {
      return reactiveReadArray(this).toReversed();
    },
    toSorted(comparer) {
      return reactiveReadArray(this).toSorted(comparer);
    },
    toSpliced(...args) {
      return reactiveReadArray(this).toSpliced(...args);
    },
    unshift(...args) {
      return noTracking(this, "unshift", args);
    },
    values() {
      return iterator(this, "values", (item) => toWrapped(this, item));
    }
  };
  function iterator(self2, method, wrapValue) {
    const arr = shallowReadArray(self2);
    const iter = arr[method]();
    if (arr !== self2 && !/* @__PURE__ */ isShallow(self2)) {
      iter._next = iter.next;
      iter.next = () => {
        const result = iter._next();
        if (!result.done) {
          result.value = wrapValue(result.value);
        }
        return result;
      };
    }
    return iter;
  }
  const arrayProto = Array.prototype;
  function apply(self2, method, fn, thisArg, wrappedRetFn, args) {
    const arr = shallowReadArray(self2);
    const needsWrap = arr !== self2 && !/* @__PURE__ */ isShallow(self2);
    const methodFn = arr[method];
    if (methodFn !== arrayProto[method]) {
      const result2 = methodFn.apply(self2, args);
      return needsWrap ? toReactive(result2) : result2;
    }
    let wrappedFn = fn;
    if (arr !== self2) {
      if (needsWrap) {
        wrappedFn = function(item, index) {
          return fn.call(this, toWrapped(self2, item), index, self2);
        };
      } else if (fn.length > 2) {
        wrappedFn = function(item, index) {
          return fn.call(this, item, index, self2);
        };
      }
    }
    const result = methodFn.call(arr, wrappedFn, thisArg);
    return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
  }
  function reduce(self2, method, fn, args) {
    const arr = shallowReadArray(self2);
    let wrappedFn = fn;
    if (arr !== self2) {
      if (!/* @__PURE__ */ isShallow(self2)) {
        wrappedFn = function(acc, item, index) {
          return fn.call(this, acc, toWrapped(self2, item), index, self2);
        };
      } else if (fn.length > 3) {
        wrappedFn = function(acc, item, index) {
          return fn.call(this, acc, item, index, self2);
        };
      }
    }
    return arr[method](wrappedFn, ...args);
  }
  function searchProxy(self2, method, args) {
    const arr = /* @__PURE__ */ toRaw(self2);
    track(arr, "iterate", ARRAY_ITERATE_KEY);
    const res = arr[method](...args);
    if ((res === -1 || res === false) && /* @__PURE__ */ isProxy(args[0])) {
      args[0] = /* @__PURE__ */ toRaw(args[0]);
      return arr[method](...args);
    }
    return res;
  }
  function noTracking(self2, method, args = []) {
    pauseTracking();
    startBatch();
    const res = (/* @__PURE__ */ toRaw(self2))[method].apply(self2, args);
    endBatch();
    resetTracking();
    return res;
  }
  const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
  const builtInSymbols = new Set(
    /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
  );
  function hasOwnProperty(key) {
    if (!isSymbol(key)) key = String(key);
    const obj = /* @__PURE__ */ toRaw(this);
    track(obj, "has", key);
    return obj.hasOwnProperty(key);
  }
  class BaseReactiveHandler {
    constructor(_isReadonly = false, _isShallow = false) {
      this._isReadonly = _isReadonly;
      this._isShallow = _isShallow;
    }
    get(target2, key, receiver) {
      if (key === "__v_skip") return target2["__v_skip"];
      const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_isShallow") {
        return isShallow2;
      } else if (key === "__v_raw") {
        if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target2) || // receiver is not the reactive proxy, but has the same prototype
        // this means the receiver is a user proxy of the reactive proxy
        Object.getPrototypeOf(target2) === Object.getPrototypeOf(receiver)) {
          return target2;
        }
        return;
      }
      const targetIsArray = isArray(target2);
      if (!isReadonly2) {
        let fn;
        if (targetIsArray && (fn = arrayInstrumentations[key])) {
          return fn;
        }
        if (key === "hasOwnProperty") {
          return hasOwnProperty;
        }
      }
      const res = Reflect.get(
        target2,
        key,
        // if this is a proxy wrapping a ref, return methods using the raw ref
        // as receiver so that we don't have to call `toRaw` on the ref in all
        // its class methods
        /* @__PURE__ */ isRef(target2) ? target2 : receiver
      );
      if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
        return res;
      }
      if (!isReadonly2) {
        track(target2, "get", key);
      }
      if (isShallow2) {
        return res;
      }
      if (/* @__PURE__ */ isRef(res)) {
        const value = targetIsArray && isIntegerKey(key) ? res : res.value;
        return isReadonly2 && isObject(value) ? /* @__PURE__ */ readonly(value) : value;
      }
      if (isObject(res)) {
        return isReadonly2 ? /* @__PURE__ */ readonly(res) : /* @__PURE__ */ reactive(res);
      }
      return res;
    }
  }
  class MutableReactiveHandler extends BaseReactiveHandler {
    constructor(isShallow2 = false) {
      super(false, isShallow2);
    }
    set(target2, key, value, receiver) {
      let oldValue = target2[key];
      const isArrayWithIntegerKey = isArray(target2) && isIntegerKey(key);
      if (!this._isShallow) {
        const isOldValueReadonly = /* @__PURE__ */ isReadonly(oldValue);
        if (!/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
          oldValue = /* @__PURE__ */ toRaw(oldValue);
          value = /* @__PURE__ */ toRaw(value);
        }
        if (!isArrayWithIntegerKey && /* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) {
          if (isOldValueReadonly) {
            return true;
          } else {
            oldValue.value = value;
            return true;
          }
        }
      }
      const hadKey = isArrayWithIntegerKey ? Number(key) < target2.length : hasOwn(target2, key);
      const result = Reflect.set(
        target2,
        key,
        value,
        /* @__PURE__ */ isRef(target2) ? target2 : receiver
      );
      if (target2 === /* @__PURE__ */ toRaw(receiver)) {
        if (!hadKey) {
          trigger(target2, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target2, "set", key, value);
        }
      }
      return result;
    }
    deleteProperty(target2, key) {
      const hadKey = hasOwn(target2, key);
      target2[key];
      const result = Reflect.deleteProperty(target2, key);
      if (result && hadKey) {
        trigger(target2, "delete", key, void 0);
      }
      return result;
    }
    has(target2, key) {
      const result = Reflect.has(target2, key);
      if (!isSymbol(key) || !builtInSymbols.has(key)) {
        track(target2, "has", key);
      }
      return result;
    }
    ownKeys(target2) {
      track(
        target2,
        "iterate",
        isArray(target2) ? "length" : ITERATE_KEY
      );
      return Reflect.ownKeys(target2);
    }
  }
  class ReadonlyReactiveHandler extends BaseReactiveHandler {
    constructor(isShallow2 = false) {
      super(true, isShallow2);
    }
    set(target2, key) {
      return true;
    }
    deleteProperty(target2, key) {
      return true;
    }
  }
  const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
  const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
  const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
  const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
  const toShallow = (value) => value;
  const getProto = (v) => Reflect.getPrototypeOf(v);
  function createIterableMethod(method, isReadonly2, isShallow2) {
    return function(...args) {
      const target2 = this["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target2);
      const targetIsMap = isMap(rawTarget);
      const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
      const isKeyOnly = method === "keys" && targetIsMap;
      const innerIterator = target2[method](...args);
      const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      !isReadonly2 && track(
        rawTarget,
        "iterate",
        isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
      );
      return extend(
        // inheriting all iterator properties
        Object.create(innerIterator),
        {
          // iterator protocol
          next() {
            const { value, done } = innerIterator.next();
            return done ? { value, done } : {
              value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
              done
            };
          }
        }
      );
    };
  }
  function createReadonlyMethod(type) {
    return function(...args) {
      return type === "delete" ? false : type === "clear" ? void 0 : this;
    };
  }
  function createInstrumentations(readonly2, shallow) {
    const instrumentations = {
      get(key) {
        const target2 = this["__v_raw"];
        const rawTarget = /* @__PURE__ */ toRaw(target2);
        const rawKey = /* @__PURE__ */ toRaw(key);
        if (!readonly2) {
          if (hasChanged(key, rawKey)) {
            track(rawTarget, "get", key);
          }
          track(rawTarget, "get", rawKey);
        }
        const { has } = getProto(rawTarget);
        const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
        if (has.call(rawTarget, key)) {
          return wrap(target2.get(key));
        } else if (has.call(rawTarget, rawKey)) {
          return wrap(target2.get(rawKey));
        } else if (target2 !== rawTarget) {
          target2.get(key);
        }
      },
      get size() {
        const target2 = this["__v_raw"];
        !readonly2 && track(/* @__PURE__ */ toRaw(target2), "iterate", ITERATE_KEY);
        return target2.size;
      },
      has(key) {
        const target2 = this["__v_raw"];
        const rawTarget = /* @__PURE__ */ toRaw(target2);
        const rawKey = /* @__PURE__ */ toRaw(key);
        if (!readonly2) {
          if (hasChanged(key, rawKey)) {
            track(rawTarget, "has", key);
          }
          track(rawTarget, "has", rawKey);
        }
        return key === rawKey ? target2.has(key) : target2.has(key) || target2.has(rawKey);
      },
      forEach(callback, thisArg) {
        const observed = this;
        const target2 = observed["__v_raw"];
        const rawTarget = /* @__PURE__ */ toRaw(target2);
        const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
        !readonly2 && track(rawTarget, "iterate", ITERATE_KEY);
        return target2.forEach((value, key) => {
          return callback.call(thisArg, wrap(value), wrap(key), observed);
        });
      }
    };
    extend(
      instrumentations,
      readonly2 ? {
        add: createReadonlyMethod("add"),
        set: createReadonlyMethod("set"),
        delete: createReadonlyMethod("delete"),
        clear: createReadonlyMethod("clear")
      } : {
        add(value) {
          if (!shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
            value = /* @__PURE__ */ toRaw(value);
          }
          const target2 = /* @__PURE__ */ toRaw(this);
          const proto = getProto(target2);
          const hadKey = proto.has.call(target2, value);
          if (!hadKey) {
            target2.add(value);
            trigger(target2, "add", value, value);
          }
          return this;
        },
        set(key, value) {
          if (!shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
            value = /* @__PURE__ */ toRaw(value);
          }
          const target2 = /* @__PURE__ */ toRaw(this);
          const { has, get } = getProto(target2);
          let hadKey = has.call(target2, key);
          if (!hadKey) {
            key = /* @__PURE__ */ toRaw(key);
            hadKey = has.call(target2, key);
          }
          const oldValue = get.call(target2, key);
          target2.set(key, value);
          if (!hadKey) {
            trigger(target2, "add", key, value);
          } else if (hasChanged(value, oldValue)) {
            trigger(target2, "set", key, value);
          }
          return this;
        },
        delete(key) {
          const target2 = /* @__PURE__ */ toRaw(this);
          const { has, get } = getProto(target2);
          let hadKey = has.call(target2, key);
          if (!hadKey) {
            key = /* @__PURE__ */ toRaw(key);
            hadKey = has.call(target2, key);
          }
          get ? get.call(target2, key) : void 0;
          const result = target2.delete(key);
          if (hadKey) {
            trigger(target2, "delete", key, void 0);
          }
          return result;
        },
        clear() {
          const target2 = /* @__PURE__ */ toRaw(this);
          const hadItems = target2.size !== 0;
          const result = target2.clear();
          if (hadItems) {
            trigger(
              target2,
              "clear",
              void 0,
              void 0
            );
          }
          return result;
        }
      }
    );
    const iteratorMethods = [
      "keys",
      "values",
      "entries",
      Symbol.iterator
    ];
    iteratorMethods.forEach((method) => {
      instrumentations[method] = createIterableMethod(method, readonly2, shallow);
    });
    return instrumentations;
  }
  function createInstrumentationGetter(isReadonly2, shallow) {
    const instrumentations = createInstrumentations(isReadonly2, shallow);
    return (target2, key, receiver) => {
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_raw") {
        return target2;
      }
      return Reflect.get(
        hasOwn(instrumentations, key) && key in target2 ? instrumentations : target2,
        key,
        receiver
      );
    };
  }
  const mutableCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, false)
  };
  const shallowCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, true)
  };
  const readonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, false)
  };
  const shallowReadonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, true)
  };
  const reactiveMap = /* @__PURE__ */ new WeakMap();
  const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
  const readonlyMap = /* @__PURE__ */ new WeakMap();
  const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
  function targetTypeMap(rawType) {
    switch (rawType) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  function getTargetType(value) {
    return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
  }
  // @__NO_SIDE_EFFECTS__
  function reactive(target2) {
    if (/* @__PURE__ */ isReadonly(target2)) {
      return target2;
    }
    return createReactiveObject(
      target2,
      false,
      mutableHandlers,
      mutableCollectionHandlers,
      reactiveMap
    );
  }
  // @__NO_SIDE_EFFECTS__
  function shallowReactive(target2) {
    return createReactiveObject(
      target2,
      false,
      shallowReactiveHandlers,
      shallowCollectionHandlers,
      shallowReactiveMap
    );
  }
  // @__NO_SIDE_EFFECTS__
  function readonly(target2) {
    return createReactiveObject(
      target2,
      true,
      readonlyHandlers,
      readonlyCollectionHandlers,
      readonlyMap
    );
  }
  // @__NO_SIDE_EFFECTS__
  function shallowReadonly(target2) {
    return createReactiveObject(
      target2,
      true,
      shallowReadonlyHandlers,
      shallowReadonlyCollectionHandlers,
      shallowReadonlyMap
    );
  }
  function createReactiveObject(target2, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject(target2)) {
      return target2;
    }
    if (target2["__v_raw"] && !(isReadonly2 && target2["__v_isReactive"])) {
      return target2;
    }
    const targetType = getTargetType(target2);
    if (targetType === 0) {
      return target2;
    }
    const existingProxy = proxyMap.get(target2);
    if (existingProxy) {
      return existingProxy;
    }
    const proxy = new Proxy(
      target2,
      targetType === 2 ? collectionHandlers : baseHandlers
    );
    proxyMap.set(target2, proxy);
    return proxy;
  }
  // @__NO_SIDE_EFFECTS__
  function isReactive(value) {
    if (/* @__PURE__ */ isReadonly(value)) {
      return /* @__PURE__ */ isReactive(value["__v_raw"]);
    }
    return !!(value && value["__v_isReactive"]);
  }
  // @__NO_SIDE_EFFECTS__
  function isReadonly(value) {
    return !!(value && value["__v_isReadonly"]);
  }
  // @__NO_SIDE_EFFECTS__
  function isShallow(value) {
    return !!(value && value["__v_isShallow"]);
  }
  // @__NO_SIDE_EFFECTS__
  function isProxy(value) {
    return value ? !!value["__v_raw"] : false;
  }
  // @__NO_SIDE_EFFECTS__
  function toRaw(observed) {
    const raw = observed && observed["__v_raw"];
    return raw ? /* @__PURE__ */ toRaw(raw) : observed;
  }
  function markRaw(value) {
    if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) {
      def(value, "__v_skip", true);
    }
    return value;
  }
  const toReactive = (value) => isObject(value) ? /* @__PURE__ */ reactive(value) : value;
  const toReadonly = (value) => isObject(value) ? /* @__PURE__ */ readonly(value) : value;
  // @__NO_SIDE_EFFECTS__
  function isRef(r) {
    return r ? r["__v_isRef"] === true : false;
  }
  // @__NO_SIDE_EFFECTS__
  function ref(value) {
    return createRef(value, false);
  }
  function createRef(rawValue, shallow) {
    if (/* @__PURE__ */ isRef(rawValue)) {
      return rawValue;
    }
    return new RefImpl(rawValue, shallow);
  }
  class RefImpl {
    constructor(value, isShallow2) {
      this.dep = new Dep();
      this["__v_isRef"] = true;
      this["__v_isShallow"] = false;
      this._rawValue = isShallow2 ? value : /* @__PURE__ */ toRaw(value);
      this._value = isShallow2 ? value : toReactive(value);
      this["__v_isShallow"] = isShallow2;
    }
    get value() {
      {
        this.dep.track();
      }
      return this._value;
    }
    set value(newValue) {
      const oldValue = this._rawValue;
      const useDirectValue = this["__v_isShallow"] || /* @__PURE__ */ isShallow(newValue) || /* @__PURE__ */ isReadonly(newValue);
      newValue = useDirectValue ? newValue : /* @__PURE__ */ toRaw(newValue);
      if (hasChanged(newValue, oldValue)) {
        this._rawValue = newValue;
        this._value = useDirectValue ? newValue : toReactive(newValue);
        {
          this.dep.trigger();
        }
      }
    }
  }
  function unref(ref2) {
    return /* @__PURE__ */ isRef(ref2) ? ref2.value : ref2;
  }
  const shallowUnwrapHandlers = {
    get: (target2, key, receiver) => key === "__v_raw" ? target2 : unref(Reflect.get(target2, key, receiver)),
    set: (target2, key, value, receiver) => {
      const oldValue = target2[key];
      if (/* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) {
        oldValue.value = value;
        return true;
      } else {
        return Reflect.set(target2, key, value, receiver);
      }
    }
  };
  function proxyRefs(objectWithRefs) {
    return /* @__PURE__ */ isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
  }
  class ComputedRefImpl {
    constructor(fn, setter, isSSR) {
      this.fn = fn;
      this.setter = setter;
      this._value = void 0;
      this.dep = new Dep(this);
      this.__v_isRef = true;
      this.deps = void 0;
      this.depsTail = void 0;
      this.flags = 16;
      this.globalVersion = globalVersion - 1;
      this.next = void 0;
      this.effect = this;
      this["__v_isReadonly"] = !setter;
      this.isSSR = isSSR;
    }
    /**
     * @internal
     */
    notify() {
      this.flags |= 16;
      if (!(this.flags & 8) && // avoid infinite self recursion
      activeSub !== this) {
        batch(this, true);
        return true;
      }
    }
    get value() {
      const link2 = this.dep.track();
      refreshComputed(this);
      if (link2) {
        link2.version = this.dep.version;
      }
      return this._value;
    }
    set value(newValue) {
      if (this.setter) {
        this.setter(newValue);
      }
    }
  }
  // @__NO_SIDE_EFFECTS__
  function computed$1(getterOrOptions, debugOptions, isSSR = false) {
    let getter;
    let setter;
    if (isFunction(getterOrOptions)) {
      getter = getterOrOptions;
    } else {
      getter = getterOrOptions.get;
      setter = getterOrOptions.set;
    }
    const cRef = new ComputedRefImpl(getter, setter, isSSR);
    return cRef;
  }
  const INITIAL_WATCHER_VALUE = {};
  const cleanupMap = /* @__PURE__ */ new WeakMap();
  let activeWatcher = void 0;
  function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
    if (owner) {
      let cleanups = cleanupMap.get(owner);
      if (!cleanups) cleanupMap.set(owner, cleanups = []);
      cleanups.push(cleanupFn);
    }
  }
  function watch$1(source, cb, options = EMPTY_OBJ) {
    const { immediate, deep, once, scheduler, augmentJob, call } = options;
    const reactiveGetter = (source2) => {
      if (deep) return source2;
      if (/* @__PURE__ */ isShallow(source2) || deep === false || deep === 0)
        return traverse(source2, 1);
      return traverse(source2);
    };
    let effect2;
    let getter;
    let cleanup;
    let boundCleanup;
    let forceTrigger = false;
    let isMultiSource = false;
    if (/* @__PURE__ */ isRef(source)) {
      getter = () => source.value;
      forceTrigger = /* @__PURE__ */ isShallow(source);
    } else if (/* @__PURE__ */ isReactive(source)) {
      getter = () => reactiveGetter(source);
      forceTrigger = true;
    } else if (isArray(source)) {
      isMultiSource = true;
      forceTrigger = source.some((s) => /* @__PURE__ */ isReactive(s) || /* @__PURE__ */ isShallow(s));
      getter = () => source.map((s) => {
        if (/* @__PURE__ */ isRef(s)) {
          return s.value;
        } else if (/* @__PURE__ */ isReactive(s)) {
          return reactiveGetter(s);
        } else if (isFunction(s)) {
          return call ? call(s, 2) : s();
        } else ;
      });
    } else if (isFunction(source)) {
      if (cb) {
        getter = call ? () => call(source, 2) : source;
      } else {
        getter = () => {
          if (cleanup) {
            pauseTracking();
            try {
              cleanup();
            } finally {
              resetTracking();
            }
          }
          const currentEffect = activeWatcher;
          activeWatcher = effect2;
          try {
            return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
          } finally {
            activeWatcher = currentEffect;
          }
        };
      }
    } else {
      getter = NOOP;
    }
    if (cb && deep) {
      const baseGetter = getter;
      const depth = deep === true ? Infinity : deep;
      getter = () => traverse(baseGetter(), depth);
    }
    const scope = getCurrentScope();
    const watchHandle = () => {
      effect2.stop();
      if (scope && scope.active) {
        remove(scope.effects, effect2);
      }
    };
    if (once && cb) {
      const _cb = cb;
      cb = (...args) => {
        _cb(...args);
        watchHandle();
      };
    }
    let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
    const job = (immediateFirstRun) => {
      if (!(effect2.flags & 1) || !effect2.dirty && !immediateFirstRun) {
        return;
      }
      if (cb) {
        const newValue = effect2.run();
        if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i2) => hasChanged(v, oldValue[i2])) : hasChanged(newValue, oldValue))) {
          if (cleanup) {
            cleanup();
          }
          const currentWatcher = activeWatcher;
          activeWatcher = effect2;
          try {
            const args = [
              newValue,
              // pass undefined as the old value when it's changed for the first time
              oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
              boundCleanup
            ];
            oldValue = newValue;
            call ? call(cb, 3, args) : (
              // @ts-expect-error
              cb(...args)
            );
          } finally {
            activeWatcher = currentWatcher;
          }
        }
      } else {
        effect2.run();
      }
    };
    if (augmentJob) {
      augmentJob(job);
    }
    effect2 = new ReactiveEffect(getter);
    effect2.scheduler = scheduler ? () => scheduler(job, false) : job;
    boundCleanup = (fn) => onWatcherCleanup(fn, false, effect2);
    cleanup = effect2.onStop = () => {
      const cleanups = cleanupMap.get(effect2);
      if (cleanups) {
        if (call) {
          call(cleanups, 4);
        } else {
          for (const cleanup2 of cleanups) cleanup2();
        }
        cleanupMap.delete(effect2);
      }
    };
    if (cb) {
      if (immediate) {
        job(true);
      } else {
        oldValue = effect2.run();
      }
    } else if (scheduler) {
      scheduler(job.bind(null, true), true);
    } else {
      effect2.run();
    }
    watchHandle.pause = effect2.pause.bind(effect2);
    watchHandle.resume = effect2.resume.bind(effect2);
    watchHandle.stop = watchHandle;
    return watchHandle;
  }
  function traverse(value, depth = Infinity, seen) {
    if (depth <= 0 || !isObject(value) || value["__v_skip"]) {
      return value;
    }
    seen = seen || /* @__PURE__ */ new Map();
    if ((seen.get(value) || 0) >= depth) {
      return value;
    }
    seen.set(value, depth);
    depth--;
    if (/* @__PURE__ */ isRef(value)) {
      traverse(value.value, depth, seen);
    } else if (isArray(value)) {
      for (let i2 = 0; i2 < value.length; i2++) {
        traverse(value[i2], depth, seen);
      }
    } else if (isSet(value) || isMap(value)) {
      value.forEach((v) => {
        traverse(v, depth, seen);
      });
    } else if (isPlainObject(value)) {
      for (const key in value) {
        traverse(value[key], depth, seen);
      }
      for (const key of Object.getOwnPropertySymbols(value)) {
        if (Object.prototype.propertyIsEnumerable.call(value, key)) {
          traverse(value[key], depth, seen);
        }
      }
    }
    return value;
  }
  /**
  * @vue/runtime-core v3.5.28
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  const stack = [];
  let isWarning = false;
  function warn$1(msg, ...args) {
    if (isWarning) return;
    isWarning = true;
    pauseTracking();
    const instance2 = stack.length ? stack[stack.length - 1].component : null;
    const appWarnHandler = instance2 && instance2.appContext.config.warnHandler;
    const trace = getComponentTrace();
    if (appWarnHandler) {
      callWithErrorHandling(
        appWarnHandler,
        instance2,
        11,
        [
          // eslint-disable-next-line no-restricted-syntax
          msg + args.map((a) => {
            var _a2, _b2;
            return (_b2 = (_a2 = a.toString) == null ? void 0 : _a2.call(a)) != null ? _b2 : JSON.stringify(a);
          }).join(""),
          instance2 && instance2.proxy,
          trace.map(
            ({ vnode }) => `at <${formatComponentName(instance2, vnode.type)}>`
          ).join("\n"),
          trace
        ]
      );
    } else {
      const warnArgs = [`[Vue warn]: ${msg}`, ...args];
      if (trace.length && // avoid spamming console during tests
      true) {
        warnArgs.push(`
`, ...formatTrace(trace));
      }
      console.warn(...warnArgs);
    }
    resetTracking();
    isWarning = false;
  }
  function getComponentTrace() {
    let currentVNode = stack[stack.length - 1];
    if (!currentVNode) {
      return [];
    }
    const normalizedStack = [];
    while (currentVNode) {
      const last = normalizedStack[0];
      if (last && last.vnode === currentVNode) {
        last.recurseCount++;
      } else {
        normalizedStack.push({
          vnode: currentVNode,
          recurseCount: 0
        });
      }
      const parentInstance = currentVNode.component && currentVNode.component.parent;
      currentVNode = parentInstance && parentInstance.vnode;
    }
    return normalizedStack;
  }
  function formatTrace(trace) {
    const logs = [];
    trace.forEach((entry, i2) => {
      logs.push(...i2 === 0 ? [] : [`
`], ...formatTraceEntry(entry));
    });
    return logs;
  }
  function formatTraceEntry({ vnode, recurseCount }) {
    const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
    const isRoot = vnode.component ? vnode.component.parent == null : false;
    const open = ` at <${formatComponentName(
      vnode.component,
      vnode.type,
      isRoot
    )}`;
    const close = `>` + postfix;
    return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
  }
  function formatProps(props) {
    const res = [];
    const keys = Object.keys(props);
    keys.slice(0, 3).forEach((key) => {
      res.push(...formatProp(key, props[key]));
    });
    if (keys.length > 3) {
      res.push(` ...`);
    }
    return res;
  }
  function formatProp(key, value, raw) {
    if (isString(value)) {
      value = JSON.stringify(value);
      return raw ? value : [`${key}=${value}`];
    } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
      return raw ? value : [`${key}=${value}`];
    } else if (/* @__PURE__ */ isRef(value)) {
      value = formatProp(key, /* @__PURE__ */ toRaw(value.value), true);
      return raw ? value : [`${key}=Ref<`, value, `>`];
    } else if (isFunction(value)) {
      return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
    } else {
      value = /* @__PURE__ */ toRaw(value);
      return raw ? value : [`${key}=`, value];
    }
  }
  function callWithErrorHandling(fn, instance2, type, args) {
    try {
      return args ? fn(...args) : fn();
    } catch (err2) {
      handleError(err2, instance2, type);
    }
  }
  function callWithAsyncErrorHandling(fn, instance2, type, args) {
    if (isFunction(fn)) {
      const res = callWithErrorHandling(fn, instance2, type, args);
      if (res && isPromise(res)) {
        res.catch((err2) => {
          handleError(err2, instance2, type);
        });
      }
      return res;
    }
    if (isArray(fn)) {
      const values = [];
      for (let i2 = 0; i2 < fn.length; i2++) {
        values.push(callWithAsyncErrorHandling(fn[i2], instance2, type, args));
      }
      return values;
    }
  }
  function handleError(err2, instance2, type, throwInDev = true) {
    const contextVNode = instance2 ? instance2.vnode : null;
    const { errorHandler, throwUnhandledErrorInProduction } = instance2 && instance2.appContext.config || EMPTY_OBJ;
    if (instance2) {
      let cur = instance2.parent;
      const exposedInstance = instance2.proxy;
      const errorInfo = `https://vuejs.org/error-reference/#runtime-${type}`;
      while (cur) {
        const errorCapturedHooks = cur.ec;
        if (errorCapturedHooks) {
          for (let i2 = 0; i2 < errorCapturedHooks.length; i2++) {
            if (errorCapturedHooks[i2](err2, exposedInstance, errorInfo) === false) {
              return;
            }
          }
        }
        cur = cur.parent;
      }
      if (errorHandler) {
        pauseTracking();
        callWithErrorHandling(errorHandler, null, 10, [
          err2,
          exposedInstance,
          errorInfo
        ]);
        resetTracking();
        return;
      }
    }
    logError(err2, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
  }
  function logError(err2, type, contextVNode, throwInDev = true, throwInProd = false) {
    if (throwInProd) {
      throw err2;
    } else {
      console.error(err2);
    }
  }
  const queue = [];
  let flushIndex = -1;
  const pendingPostFlushCbs = [];
  let activePostFlushCbs = null;
  let postFlushIndex = 0;
  const resolvedPromise = /* @__PURE__ */ Promise.resolve();
  let currentFlushPromise = null;
  function nextTick(fn) {
    const p2 = currentFlushPromise || resolvedPromise;
    return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
  }
  function findInsertionIndex(id) {
    let start = flushIndex + 1;
    let end = queue.length;
    while (start < end) {
      const middle = start + end >>> 1;
      const middleJob = queue[middle];
      const middleJobId = getId(middleJob);
      if (middleJobId < id || middleJobId === id && middleJob.flags & 2) {
        start = middle + 1;
      } else {
        end = middle;
      }
    }
    return start;
  }
  function queueJob(job) {
    if (!(job.flags & 1)) {
      const jobId = getId(job);
      const lastJob = queue[queue.length - 1];
      if (!lastJob || // fast path when the job id is larger than the tail
      !(job.flags & 2) && jobId >= getId(lastJob)) {
        queue.push(job);
      } else {
        queue.splice(findInsertionIndex(jobId), 0, job);
      }
      job.flags |= 1;
      queueFlush();
    }
  }
  function queueFlush() {
    if (!currentFlushPromise) {
      currentFlushPromise = resolvedPromise.then(flushJobs);
    }
  }
  function queuePostFlushCb(cb) {
    if (!isArray(cb)) {
      if (activePostFlushCbs && cb.id === -1) {
        activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
      } else if (!(cb.flags & 1)) {
        pendingPostFlushCbs.push(cb);
        cb.flags |= 1;
      }
    } else {
      pendingPostFlushCbs.push(...cb);
    }
    queueFlush();
  }
  function flushPreFlushCbs(instance2, seen, i2 = flushIndex + 1) {
    for (; i2 < queue.length; i2++) {
      const cb = queue[i2];
      if (cb && cb.flags & 2) {
        if (instance2 && cb.id !== instance2.uid) {
          continue;
        }
        queue.splice(i2, 1);
        i2--;
        if (cb.flags & 4) {
          cb.flags &= -2;
        }
        cb();
        if (!(cb.flags & 4)) {
          cb.flags &= -2;
        }
      }
    }
  }
  function flushPostFlushCbs(seen) {
    if (pendingPostFlushCbs.length) {
      const deduped = [...new Set(pendingPostFlushCbs)].sort(
        (a, b) => getId(a) - getId(b)
      );
      pendingPostFlushCbs.length = 0;
      if (activePostFlushCbs) {
        activePostFlushCbs.push(...deduped);
        return;
      }
      activePostFlushCbs = deduped;
      for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
        const cb = activePostFlushCbs[postFlushIndex];
        if (cb.flags & 4) {
          cb.flags &= -2;
        }
        if (!(cb.flags & 8)) cb();
        cb.flags &= -2;
      }
      activePostFlushCbs = null;
      postFlushIndex = 0;
    }
  }
  const getId = (job) => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id;
  function flushJobs(seen) {
    try {
      for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
        const job = queue[flushIndex];
        if (job && !(job.flags & 8)) {
          if (false) ;
          if (job.flags & 4) {
            job.flags &= ~1;
          }
          callWithErrorHandling(
            job,
            job.i,
            job.i ? 15 : 14
          );
          if (!(job.flags & 4)) {
            job.flags &= ~1;
          }
        }
      }
    } finally {
      for (; flushIndex < queue.length; flushIndex++) {
        const job = queue[flushIndex];
        if (job) {
          job.flags &= -2;
        }
      }
      flushIndex = -1;
      queue.length = 0;
      flushPostFlushCbs();
      currentFlushPromise = null;
      if (queue.length || pendingPostFlushCbs.length) {
        flushJobs();
      }
    }
  }
  let currentRenderingInstance = null;
  let currentScopeId = null;
  function setCurrentRenderingInstance(instance2) {
    const prev = currentRenderingInstance;
    currentRenderingInstance = instance2;
    currentScopeId = instance2 && instance2.type.__scopeId || null;
    return prev;
  }
  function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
    if (!ctx) return fn;
    if (fn._n) {
      return fn;
    }
    const renderFnWithContext = (...args) => {
      if (renderFnWithContext._d) {
        setBlockTracking(-1);
      }
      const prevInstance = setCurrentRenderingInstance(ctx);
      let res;
      try {
        res = fn(...args);
      } finally {
        setCurrentRenderingInstance(prevInstance);
        if (renderFnWithContext._d) {
          setBlockTracking(1);
        }
      }
      return res;
    };
    renderFnWithContext._n = true;
    renderFnWithContext._c = true;
    renderFnWithContext._d = true;
    return renderFnWithContext;
  }
  function withDirectives(vnode, directives) {
    if (currentRenderingInstance === null) {
      return vnode;
    }
    const instance2 = getComponentPublicInstance(currentRenderingInstance);
    const bindings = vnode.dirs || (vnode.dirs = []);
    for (let i2 = 0; i2 < directives.length; i2++) {
      let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i2];
      if (dir) {
        if (isFunction(dir)) {
          dir = {
            mounted: dir,
            updated: dir
          };
        }
        if (dir.deep) {
          traverse(value);
        }
        bindings.push({
          dir,
          instance: instance2,
          value,
          oldValue: void 0,
          arg,
          modifiers
        });
      }
    }
    return vnode;
  }
  function invokeDirectiveHook(vnode, prevVNode, instance2, name) {
    const bindings = vnode.dirs;
    const oldBindings = prevVNode && prevVNode.dirs;
    for (let i2 = 0; i2 < bindings.length; i2++) {
      const binding = bindings[i2];
      if (oldBindings) {
        binding.oldValue = oldBindings[i2].value;
      }
      let hook = binding.dir[name];
      if (hook) {
        pauseTracking();
        callWithAsyncErrorHandling(hook, instance2, 8, [
          vnode.el,
          binding,
          vnode,
          prevVNode
        ]);
        resetTracking();
      }
    }
  }
  function provide(key, value) {
    if (currentInstance) {
      let provides = currentInstance.provides;
      const parentProvides = currentInstance.parent && currentInstance.parent.provides;
      if (parentProvides === provides) {
        provides = currentInstance.provides = Object.create(parentProvides);
      }
      provides[key] = value;
    }
  }
  function inject(key, defaultValue, treatDefaultAsFactory = false) {
    const instance2 = getCurrentInstance();
    if (instance2 || currentApp) {
      let provides = currentApp ? currentApp._context.provides : instance2 ? instance2.parent == null || instance2.ce ? instance2.vnode.appContext && instance2.vnode.appContext.provides : instance2.parent.provides : void 0;
      if (provides && key in provides) {
        return provides[key];
      } else if (arguments.length > 1) {
        return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance2 && instance2.proxy) : defaultValue;
      } else ;
    }
  }
  const ssrContextKey = /* @__PURE__ */ Symbol.for("v-scx");
  const useSSRContext = () => {
    {
      const ctx = inject(ssrContextKey);
      return ctx;
    }
  };
  function watch(source, cb, options) {
    return doWatch(source, cb, options);
  }
  function doWatch(source, cb, options = EMPTY_OBJ) {
    const { immediate, deep, flush, once } = options;
    const baseWatchOptions = extend({}, options);
    const runsImmediately = cb && immediate || !cb && flush !== "post";
    let ssrCleanup;
    if (isInSSRComponentSetup) {
      if (flush === "sync") {
        const ctx = useSSRContext();
        ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
      } else if (!runsImmediately) {
        const watchStopHandle = () => {
        };
        watchStopHandle.stop = NOOP;
        watchStopHandle.resume = NOOP;
        watchStopHandle.pause = NOOP;
        return watchStopHandle;
      }
    }
    const instance2 = currentInstance;
    baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance2, type, args);
    let isPre = false;
    if (flush === "post") {
      baseWatchOptions.scheduler = (job) => {
        queuePostRenderEffect(job, instance2 && instance2.suspense);
      };
    } else if (flush !== "sync") {
      isPre = true;
      baseWatchOptions.scheduler = (job, isFirstRun) => {
        if (isFirstRun) {
          job();
        } else {
          queueJob(job);
        }
      };
    }
    baseWatchOptions.augmentJob = (job) => {
      if (cb) {
        job.flags |= 4;
      }
      if (isPre) {
        job.flags |= 2;
        if (instance2) {
          job.id = instance2.uid;
          job.i = instance2;
        }
      }
    };
    const watchHandle = watch$1(source, cb, baseWatchOptions);
    if (isInSSRComponentSetup) {
      if (ssrCleanup) {
        ssrCleanup.push(watchHandle);
      } else if (runsImmediately) {
        watchHandle();
      }
    }
    return watchHandle;
  }
  function instanceWatch(source, value, options) {
    const publicThis = this.proxy;
    const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
    let cb;
    if (isFunction(value)) {
      cb = value;
    } else {
      cb = value.handler;
      options = value;
    }
    const reset = setCurrentInstance(this);
    const res = doWatch(getter, cb.bind(publicThis), options);
    reset();
    return res;
  }
  function createPathGetter(ctx, path) {
    const segments = path.split(".");
    return () => {
      let cur = ctx;
      for (let i2 = 0; i2 < segments.length && cur; i2++) {
        cur = cur[segments[i2]];
      }
      return cur;
    };
  }
  const TeleportEndKey = /* @__PURE__ */ Symbol("_vte");
  const isTeleport = (type) => type.__isTeleport;
  const isTeleportDisabled = (props) => props && (props.disabled || props.disabled === "");
  const isTeleportDeferred = (props) => props && (props.defer || props.defer === "");
  const isTargetSVG = (target2) => typeof SVGElement !== "undefined" && target2 instanceof SVGElement;
  const isTargetMathML = (target2) => typeof MathMLElement === "function" && target2 instanceof MathMLElement;
  const resolveTarget = (props, select) => {
    const targetSelector = props && props.to;
    if (isString(targetSelector)) {
      if (!select) {
        return null;
      } else {
        const target2 = select(targetSelector);
        return target2;
      }
    } else {
      return targetSelector;
    }
  };
  const TeleportImpl = {
    name: "Teleport",
    __isTeleport: true,
    process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals) {
      const {
        mc: mountChildren,
        pc: patchChildren,
        pbc: patchBlockChildren,
        o: { insert, querySelector, createText, createComment }
      } = internals;
      const disabled = isTeleportDisabled(n2.props);
      let { shapeFlag, children, dynamicChildren } = n2;
      if (n1 == null) {
        const placeholder = n2.el = createText("");
        const mainAnchor = n2.anchor = createText("");
        insert(placeholder, container, anchor);
        insert(mainAnchor, container, anchor);
        const mount = (container2, anchor2) => {
          if (shapeFlag & 16) {
            mountChildren(
              children,
              container2,
              anchor2,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          }
        };
        const mountToTarget = () => {
          const target2 = n2.target = resolveTarget(n2.props, querySelector);
          const targetAnchor = prepareAnchor(target2, n2, createText, insert);
          if (target2) {
            if (namespace !== "svg" && isTargetSVG(target2)) {
              namespace = "svg";
            } else if (namespace !== "mathml" && isTargetMathML(target2)) {
              namespace = "mathml";
            }
            if (parentComponent && parentComponent.isCE) {
              (parentComponent.ce._teleportTargets || (parentComponent.ce._teleportTargets = /* @__PURE__ */ new Set())).add(target2);
            }
            if (!disabled) {
              mount(target2, targetAnchor);
              updateCssVars(n2, false);
            }
          }
        };
        if (disabled) {
          mount(container, mainAnchor);
          updateCssVars(n2, true);
        }
        if (isTeleportDeferred(n2.props)) {
          n2.el.__isMounted = false;
          queuePostRenderEffect(() => {
            mountToTarget();
            delete n2.el.__isMounted;
          }, parentSuspense);
        } else {
          mountToTarget();
        }
      } else {
        if (isTeleportDeferred(n2.props) && n1.el.__isMounted === false) {
          queuePostRenderEffect(() => {
            TeleportImpl.process(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized,
              internals
            );
          }, parentSuspense);
          return;
        }
        n2.el = n1.el;
        n2.targetStart = n1.targetStart;
        const mainAnchor = n2.anchor = n1.anchor;
        const target2 = n2.target = n1.target;
        const targetAnchor = n2.targetAnchor = n1.targetAnchor;
        const wasDisabled = isTeleportDisabled(n1.props);
        const currentContainer = wasDisabled ? container : target2;
        const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
        if (namespace === "svg" || isTargetSVG(target2)) {
          namespace = "svg";
        } else if (namespace === "mathml" || isTargetMathML(target2)) {
          namespace = "mathml";
        }
        if (dynamicChildren) {
          patchBlockChildren(
            n1.dynamicChildren,
            dynamicChildren,
            currentContainer,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds
          );
          traverseStaticChildren(n1, n2, true);
        } else if (!optimized) {
          patchChildren(
            n1,
            n2,
            currentContainer,
            currentAnchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            false
          );
        }
        if (disabled) {
          if (!wasDisabled) {
            moveTeleport(
              n2,
              container,
              mainAnchor,
              internals,
              1
            );
          } else {
            if (n2.props && n1.props && n2.props.to !== n1.props.to) {
              n2.props.to = n1.props.to;
            }
          }
        } else {
          if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
            const nextTarget = n2.target = resolveTarget(
              n2.props,
              querySelector
            );
            if (nextTarget) {
              moveTeleport(
                n2,
                nextTarget,
                null,
                internals,
                0
              );
            }
          } else if (wasDisabled) {
            moveTeleport(
              n2,
              target2,
              targetAnchor,
              internals,
              1
            );
          }
        }
        updateCssVars(n2, disabled);
      }
    },
    remove(vnode, parentComponent, parentSuspense, { um: unmount, o: { remove: hostRemove } }, doRemove) {
      const {
        shapeFlag,
        children,
        anchor,
        targetStart,
        targetAnchor,
        target: target2,
        props
      } = vnode;
      if (target2) {
        hostRemove(targetStart);
        hostRemove(targetAnchor);
      }
      doRemove && hostRemove(anchor);
      if (shapeFlag & 16) {
        const shouldRemove = doRemove || !isTeleportDisabled(props);
        for (let i2 = 0; i2 < children.length; i2++) {
          const child = children[i2];
          unmount(
            child,
            parentComponent,
            parentSuspense,
            shouldRemove,
            !!child.dynamicChildren
          );
        }
      }
    },
    move: moveTeleport,
    hydrate: hydrateTeleport
  };
  function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2) {
    if (moveType === 0) {
      insert(vnode.targetAnchor, container, parentAnchor);
    }
    const { el: el2, anchor, shapeFlag, children, props } = vnode;
    const isReorder = moveType === 2;
    if (isReorder) {
      insert(el2, container, parentAnchor);
    }
    if (!isReorder || isTeleportDisabled(props)) {
      if (shapeFlag & 16) {
        for (let i2 = 0; i2 < children.length; i2++) {
          move(
            children[i2],
            container,
            parentAnchor,
            2
          );
        }
      }
    }
    if (isReorder) {
      insert(anchor, container, parentAnchor);
    }
  }
  function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, {
    o: { nextSibling, parentNode, querySelector, insert, createText }
  }, hydrateChildren) {
    function hydrateAnchor(target22, targetNode) {
      let targetAnchor = targetNode;
      while (targetAnchor) {
        if (targetAnchor && targetAnchor.nodeType === 8) {
          if (targetAnchor.data === "teleport start anchor") {
            vnode.targetStart = targetAnchor;
          } else if (targetAnchor.data === "teleport anchor") {
            vnode.targetAnchor = targetAnchor;
            target22._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
            break;
          }
        }
        targetAnchor = nextSibling(targetAnchor);
      }
    }
    function hydrateDisabledTeleport(node2, vnode2) {
      vnode2.anchor = hydrateChildren(
        nextSibling(node2),
        vnode2,
        parentNode(node2),
        parentComponent,
        parentSuspense,
        slotScopeIds,
        optimized
      );
    }
    const target2 = vnode.target = resolveTarget(
      vnode.props,
      querySelector
    );
    const disabled = isTeleportDisabled(vnode.props);
    if (target2) {
      const targetNode = target2._lpa || target2.firstChild;
      if (vnode.shapeFlag & 16) {
        if (disabled) {
          hydrateDisabledTeleport(node, vnode);
          hydrateAnchor(target2, targetNode);
          if (!vnode.targetAnchor) {
            prepareAnchor(
              target2,
              vnode,
              createText,
              insert,
              // if target is the same as the main view, insert anchors before current node
              // to avoid hydrating mismatch
              parentNode(node) === target2 ? node : null
            );
          }
        } else {
          vnode.anchor = nextSibling(node);
          hydrateAnchor(target2, targetNode);
          if (!vnode.targetAnchor) {
            prepareAnchor(target2, vnode, createText, insert);
          }
          hydrateChildren(
            targetNode && nextSibling(targetNode),
            vnode,
            target2,
            parentComponent,
            parentSuspense,
            slotScopeIds,
            optimized
          );
        }
      }
      updateCssVars(vnode, disabled);
    } else if (disabled) {
      if (vnode.shapeFlag & 16) {
        hydrateDisabledTeleport(node, vnode);
        vnode.targetStart = node;
        vnode.targetAnchor = nextSibling(node);
      }
    }
    return vnode.anchor && nextSibling(vnode.anchor);
  }
  const Teleport = TeleportImpl;
  function updateCssVars(vnode, isDisabled) {
    const ctx = vnode.ctx;
    if (ctx && ctx.ut) {
      let node, anchor;
      if (isDisabled) {
        node = vnode.el;
        anchor = vnode.anchor;
      } else {
        node = vnode.targetStart;
        anchor = vnode.targetAnchor;
      }
      while (node && node !== anchor) {
        if (node.nodeType === 1) node.setAttribute("data-v-owner", ctx.uid);
        node = node.nextSibling;
      }
      ctx.ut();
    }
  }
  function prepareAnchor(target2, vnode, createText, insert, anchor = null) {
    const targetStart = vnode.targetStart = createText("");
    const targetAnchor = vnode.targetAnchor = createText("");
    targetStart[TeleportEndKey] = targetAnchor;
    if (target2) {
      insert(targetStart, target2, anchor);
      insert(targetAnchor, target2, anchor);
    }
    return targetAnchor;
  }
  const leaveCbKey = /* @__PURE__ */ Symbol("_leaveCb");
  const enterCbKey$1 = /* @__PURE__ */ Symbol("_enterCb");
  function useTransitionState() {
    const state = {
      isMounted: false,
      isLeaving: false,
      isUnmounting: false,
      leavingVNodes: /* @__PURE__ */ new Map()
    };
    onMounted(() => {
      state.isMounted = true;
    });
    onBeforeUnmount(() => {
      state.isUnmounting = true;
    });
    return state;
  }
  const TransitionHookValidator = [Function, Array];
  const BaseTransitionPropsValidators = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    // enter
    onBeforeEnter: TransitionHookValidator,
    onEnter: TransitionHookValidator,
    onAfterEnter: TransitionHookValidator,
    onEnterCancelled: TransitionHookValidator,
    // leave
    onBeforeLeave: TransitionHookValidator,
    onLeave: TransitionHookValidator,
    onAfterLeave: TransitionHookValidator,
    onLeaveCancelled: TransitionHookValidator,
    // appear
    onBeforeAppear: TransitionHookValidator,
    onAppear: TransitionHookValidator,
    onAfterAppear: TransitionHookValidator,
    onAppearCancelled: TransitionHookValidator
  };
  const recursiveGetSubtree = (instance2) => {
    const subTree = instance2.subTree;
    return subTree.component ? recursiveGetSubtree(subTree.component) : subTree;
  };
  const BaseTransitionImpl = {
    name: `BaseTransition`,
    props: BaseTransitionPropsValidators,
    setup(props, { slots }) {
      const instance2 = getCurrentInstance();
      const state = useTransitionState();
      return () => {
        const children = slots.default && getTransitionRawChildren(slots.default(), true);
        if (!children || !children.length) {
          return;
        }
        const child = findNonCommentChild(children);
        const rawProps = /* @__PURE__ */ toRaw(props);
        const { mode } = rawProps;
        if (state.isLeaving) {
          return emptyPlaceholder(child);
        }
        const innerChild = getInnerChild$1(child);
        if (!innerChild) {
          return emptyPlaceholder(child);
        }
        let enterHooks = resolveTransitionHooks(
          innerChild,
          rawProps,
          state,
          instance2,
          // #11061, ensure enterHooks is fresh after clone
          (hooks) => enterHooks = hooks
        );
        if (innerChild.type !== Comment) {
          setTransitionHooks(innerChild, enterHooks);
        }
        let oldInnerChild = instance2.subTree && getInnerChild$1(instance2.subTree);
        if (oldInnerChild && oldInnerChild.type !== Comment && !isSameVNodeType(oldInnerChild, innerChild) && recursiveGetSubtree(instance2).type !== Comment) {
          let leavingHooks = resolveTransitionHooks(
            oldInnerChild,
            rawProps,
            state,
            instance2
          );
          setTransitionHooks(oldInnerChild, leavingHooks);
          if (mode === "out-in" && innerChild.type !== Comment) {
            state.isLeaving = true;
            leavingHooks.afterLeave = () => {
              state.isLeaving = false;
              if (!(instance2.job.flags & 8)) {
                instance2.update();
              }
              delete leavingHooks.afterLeave;
              oldInnerChild = void 0;
            };
            return emptyPlaceholder(child);
          } else if (mode === "in-out" && innerChild.type !== Comment) {
            leavingHooks.delayLeave = (el2, earlyRemove, delayedLeave) => {
              const leavingVNodesCache = getLeavingNodesForType(
                state,
                oldInnerChild
              );
              leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
              el2[leaveCbKey] = () => {
                earlyRemove();
                el2[leaveCbKey] = void 0;
                delete enterHooks.delayedLeave;
                oldInnerChild = void 0;
              };
              enterHooks.delayedLeave = () => {
                delayedLeave();
                delete enterHooks.delayedLeave;
                oldInnerChild = void 0;
              };
            };
          } else {
            oldInnerChild = void 0;
          }
        } else if (oldInnerChild) {
          oldInnerChild = void 0;
        }
        return child;
      };
    }
  };
  function findNonCommentChild(children) {
    let child = children[0];
    if (children.length > 1) {
      for (const c of children) {
        if (c.type !== Comment) {
          child = c;
          break;
        }
      }
    }
    return child;
  }
  const BaseTransition = BaseTransitionImpl;
  function getLeavingNodesForType(state, vnode) {
    const { leavingVNodes } = state;
    let leavingVNodesCache = leavingVNodes.get(vnode.type);
    if (!leavingVNodesCache) {
      leavingVNodesCache = /* @__PURE__ */ Object.create(null);
      leavingVNodes.set(vnode.type, leavingVNodesCache);
    }
    return leavingVNodesCache;
  }
  function resolveTransitionHooks(vnode, props, state, instance2, postClone) {
    const {
      appear,
      mode,
      persisted = false,
      onBeforeEnter,
      onEnter,
      onAfterEnter,
      onEnterCancelled,
      onBeforeLeave,
      onLeave,
      onAfterLeave,
      onLeaveCancelled,
      onBeforeAppear,
      onAppear,
      onAfterAppear,
      onAppearCancelled
    } = props;
    const key = String(vnode.key);
    const leavingVNodesCache = getLeavingNodesForType(state, vnode);
    const callHook2 = (hook, args) => {
      hook && callWithAsyncErrorHandling(
        hook,
        instance2,
        9,
        args
      );
    };
    const callAsyncHook = (hook, args) => {
      const done = args[1];
      callHook2(hook, args);
      if (isArray(hook)) {
        if (hook.every((hook2) => hook2.length <= 1)) done();
      } else if (hook.length <= 1) {
        done();
      }
    };
    const hooks = {
      mode,
      persisted,
      beforeEnter(el2) {
        let hook = onBeforeEnter;
        if (!state.isMounted) {
          if (appear) {
            hook = onBeforeAppear || onBeforeEnter;
          } else {
            return;
          }
        }
        if (el2[leaveCbKey]) {
          el2[leaveCbKey](
            true
            /* cancelled */
          );
        }
        const leavingVNode = leavingVNodesCache[key];
        if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el[leaveCbKey]) {
          leavingVNode.el[leaveCbKey]();
        }
        callHook2(hook, [el2]);
      },
      enter(el2) {
        let hook = onEnter;
        let afterHook = onAfterEnter;
        let cancelHook = onEnterCancelled;
        if (!state.isMounted) {
          if (appear) {
            hook = onAppear || onEnter;
            afterHook = onAfterAppear || onAfterEnter;
            cancelHook = onAppearCancelled || onEnterCancelled;
          } else {
            return;
          }
        }
        let called = false;
        el2[enterCbKey$1] = (cancelled) => {
          if (called) return;
          called = true;
          if (cancelled) {
            callHook2(cancelHook, [el2]);
          } else {
            callHook2(afterHook, [el2]);
          }
          if (hooks.delayedLeave) {
            hooks.delayedLeave();
          }
          el2[enterCbKey$1] = void 0;
        };
        const done = el2[enterCbKey$1].bind(null, false);
        if (hook) {
          callAsyncHook(hook, [el2, done]);
        } else {
          done();
        }
      },
      leave(el2, remove2) {
        const key2 = String(vnode.key);
        if (el2[enterCbKey$1]) {
          el2[enterCbKey$1](
            true
            /* cancelled */
          );
        }
        if (state.isUnmounting) {
          return remove2();
        }
        callHook2(onBeforeLeave, [el2]);
        let called = false;
        el2[leaveCbKey] = (cancelled) => {
          if (called) return;
          called = true;
          remove2();
          if (cancelled) {
            callHook2(onLeaveCancelled, [el2]);
          } else {
            callHook2(onAfterLeave, [el2]);
          }
          el2[leaveCbKey] = void 0;
          if (leavingVNodesCache[key2] === vnode) {
            delete leavingVNodesCache[key2];
          }
        };
        const done = el2[leaveCbKey].bind(null, false);
        leavingVNodesCache[key2] = vnode;
        if (onLeave) {
          callAsyncHook(onLeave, [el2, done]);
        } else {
          done();
        }
      },
      clone(vnode2) {
        const hooks2 = resolveTransitionHooks(
          vnode2,
          props,
          state,
          instance2,
          postClone
        );
        if (postClone) postClone(hooks2);
        return hooks2;
      }
    };
    return hooks;
  }
  function emptyPlaceholder(vnode) {
    if (isKeepAlive(vnode)) {
      vnode = cloneVNode(vnode);
      vnode.children = null;
      return vnode;
    }
  }
  function getInnerChild$1(vnode) {
    if (!isKeepAlive(vnode)) {
      if (isTeleport(vnode.type) && vnode.children) {
        return findNonCommentChild(vnode.children);
      }
      return vnode;
    }
    if (vnode.component) {
      return vnode.component.subTree;
    }
    const { shapeFlag, children } = vnode;
    if (children) {
      if (shapeFlag & 16) {
        return children[0];
      }
      if (shapeFlag & 32 && isFunction(children.default)) {
        return children.default();
      }
    }
  }
  function setTransitionHooks(vnode, hooks) {
    if (vnode.shapeFlag & 6 && vnode.component) {
      vnode.transition = hooks;
      setTransitionHooks(vnode.component.subTree, hooks);
    } else if (vnode.shapeFlag & 128) {
      vnode.ssContent.transition = hooks.clone(vnode.ssContent);
      vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
    } else {
      vnode.transition = hooks;
    }
  }
  function getTransitionRawChildren(children, keepComment = false, parentKey) {
    let ret = [];
    let keyedFragmentCount = 0;
    for (let i2 = 0; i2 < children.length; i2++) {
      let child = children[i2];
      const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i2);
      if (child.type === Fragment) {
        if (child.patchFlag & 128) keyedFragmentCount++;
        ret = ret.concat(
          getTransitionRawChildren(child.children, keepComment, key)
        );
      } else if (keepComment || child.type !== Comment) {
        ret.push(key != null ? cloneVNode(child, { key }) : child);
      }
    }
    if (keyedFragmentCount > 1) {
      for (let i2 = 0; i2 < ret.length; i2++) {
        ret[i2].patchFlag = -2;
      }
    }
    return ret;
  }
  // @__NO_SIDE_EFFECTS__
  function defineComponent(options, extraOptions) {
    return isFunction(options) ? (
      // #8236: extend call and options.name access are considered side-effects
      // by Rollup, so we have to wrap it in a pure-annotated IIFE.
      /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))()
    ) : options;
  }
  function markAsyncBoundary(instance2) {
    instance2.ids = [instance2.ids[0] + instance2.ids[2]++ + "-", 0, 0];
  }
  function isTemplateRefKey(refs, key) {
    let desc;
    return !!((desc = Object.getOwnPropertyDescriptor(refs, key)) && !desc.configurable);
  }
  const pendingSetRefMap = /* @__PURE__ */ new WeakMap();
  function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
    if (isArray(rawRef)) {
      rawRef.forEach(
        (r, i2) => setRef(
          r,
          oldRawRef && (isArray(oldRawRef) ? oldRawRef[i2] : oldRawRef),
          parentSuspense,
          vnode,
          isUnmount
        )
      );
      return;
    }
    if (isAsyncWrapper(vnode) && !isUnmount) {
      if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) {
        setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
      }
      return;
    }
    const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
    const value = isUnmount ? null : refValue;
    const { i: owner, r: ref3 } = rawRef;
    const oldRef = oldRawRef && oldRawRef.r;
    const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
    const setupState = owner.setupState;
    const rawSetupState = /* @__PURE__ */ toRaw(setupState);
    const canSetSetupRef = setupState === EMPTY_OBJ ? NO : (key) => {
      if (isTemplateRefKey(refs, key)) {
        return false;
      }
      return hasOwn(rawSetupState, key);
    };
    const canSetRef = (ref22, key) => {
      if (key && isTemplateRefKey(refs, key)) {
        return false;
      }
      return true;
    };
    if (oldRef != null && oldRef !== ref3) {
      invalidatePendingSetRef(oldRawRef);
      if (isString(oldRef)) {
        refs[oldRef] = null;
        if (canSetSetupRef(oldRef)) {
          setupState[oldRef] = null;
        }
      } else if (/* @__PURE__ */ isRef(oldRef)) {
        const oldRawRefAtom = oldRawRef;
        if (canSetRef(oldRef, oldRawRefAtom.k)) {
          oldRef.value = null;
        }
        if (oldRawRefAtom.k) refs[oldRawRefAtom.k] = null;
      }
    }
    if (isFunction(ref3)) {
      callWithErrorHandling(ref3, owner, 12, [value, refs]);
    } else {
      const _isString = isString(ref3);
      const _isRef = /* @__PURE__ */ isRef(ref3);
      if (_isString || _isRef) {
        const doSet = () => {
          if (rawRef.f) {
            const existing = _isString ? canSetSetupRef(ref3) ? setupState[ref3] : refs[ref3] : canSetRef() || !rawRef.k ? ref3.value : refs[rawRef.k];
            if (isUnmount) {
              isArray(existing) && remove(existing, refValue);
            } else {
              if (!isArray(existing)) {
                if (_isString) {
                  refs[ref3] = [refValue];
                  if (canSetSetupRef(ref3)) {
                    setupState[ref3] = refs[ref3];
                  }
                } else {
                  const newVal = [refValue];
                  if (canSetRef(ref3, rawRef.k)) {
                    ref3.value = newVal;
                  }
                  if (rawRef.k) refs[rawRef.k] = newVal;
                }
              } else if (!existing.includes(refValue)) {
                existing.push(refValue);
              }
            }
          } else if (_isString) {
            refs[ref3] = value;
            if (canSetSetupRef(ref3)) {
              setupState[ref3] = value;
            }
          } else if (_isRef) {
            if (canSetRef(ref3, rawRef.k)) {
              ref3.value = value;
            }
            if (rawRef.k) refs[rawRef.k] = value;
          } else ;
        };
        if (value) {
          const job = () => {
            doSet();
            pendingSetRefMap.delete(rawRef);
          };
          job.id = -1;
          pendingSetRefMap.set(rawRef, job);
          queuePostRenderEffect(job, parentSuspense);
        } else {
          invalidatePendingSetRef(rawRef);
          doSet();
        }
      }
    }
  }
  function invalidatePendingSetRef(rawRef) {
    const pendingSetRef = pendingSetRefMap.get(rawRef);
    if (pendingSetRef) {
      pendingSetRef.flags |= 8;
      pendingSetRefMap.delete(rawRef);
    }
  }
  getGlobalThis().requestIdleCallback || ((cb) => setTimeout(cb, 1));
  getGlobalThis().cancelIdleCallback || ((id) => clearTimeout(id));
  const isAsyncWrapper = (i2) => !!i2.type.__asyncLoader;
  const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
  function onActivated(hook, target2) {
    registerKeepAliveHook(hook, "a", target2);
  }
  function onDeactivated(hook, target2) {
    registerKeepAliveHook(hook, "da", target2);
  }
  function registerKeepAliveHook(hook, type, target2 = currentInstance) {
    const wrappedHook = hook.__wdc || (hook.__wdc = () => {
      let current = target2;
      while (current) {
        if (current.isDeactivated) {
          return;
        }
        current = current.parent;
      }
      return hook();
    });
    injectHook(type, wrappedHook, target2);
    if (target2) {
      let current = target2.parent;
      while (current && current.parent) {
        if (isKeepAlive(current.parent.vnode)) {
          injectToKeepAliveRoot(wrappedHook, type, target2, current);
        }
        current = current.parent;
      }
    }
  }
  function injectToKeepAliveRoot(hook, type, target2, keepAliveRoot) {
    const injected = injectHook(
      type,
      hook,
      keepAliveRoot,
      true
      /* prepend */
    );
    onUnmounted(() => {
      remove(keepAliveRoot[type], injected);
    }, target2);
  }
  function injectHook(type, hook, target2 = currentInstance, prepend = false) {
    if (target2) {
      const hooks = target2[type] || (target2[type] = []);
      const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
        pauseTracking();
        const reset = setCurrentInstance(target2);
        const res = callWithAsyncErrorHandling(hook, target2, type, args);
        reset();
        resetTracking();
        return res;
      });
      if (prepend) {
        hooks.unshift(wrappedHook);
      } else {
        hooks.push(wrappedHook);
      }
      return wrappedHook;
    }
  }
  const createHook = (lifecycle) => (hook, target2 = currentInstance) => {
    if (!isInSSRComponentSetup || lifecycle === "sp") {
      injectHook(lifecycle, (...args) => hook(...args), target2);
    }
  };
  const onBeforeMount = createHook("bm");
  const onMounted = createHook("m");
  const onBeforeUpdate = createHook(
    "bu"
  );
  const onUpdated = createHook("u");
  const onBeforeUnmount = createHook(
    "bum"
  );
  const onUnmounted = createHook("um");
  const onServerPrefetch = createHook(
    "sp"
  );
  const onRenderTriggered = createHook("rtg");
  const onRenderTracked = createHook("rtc");
  function onErrorCaptured(hook, target2 = currentInstance) {
    injectHook("ec", hook, target2);
  }
  const NULL_DYNAMIC_COMPONENT = /* @__PURE__ */ Symbol.for("v-ndc");
  function renderList(source, renderItem, cache, index) {
    let ret;
    const cached = cache;
    const sourceIsArray = isArray(source);
    if (sourceIsArray || isString(source)) {
      const sourceIsReactiveArray = sourceIsArray && /* @__PURE__ */ isReactive(source);
      let needsWrap = false;
      let isReadonlySource = false;
      if (sourceIsReactiveArray) {
        needsWrap = !/* @__PURE__ */ isShallow(source);
        isReadonlySource = /* @__PURE__ */ isReadonly(source);
        source = shallowReadArray(source);
      }
      ret = new Array(source.length);
      for (let i2 = 0, l = source.length; i2 < l; i2++) {
        ret[i2] = renderItem(
          needsWrap ? isReadonlySource ? toReadonly(toReactive(source[i2])) : toReactive(source[i2]) : source[i2],
          i2,
          void 0,
          cached
        );
      }
    } else if (typeof source === "number") {
      ret = new Array(source);
      for (let i2 = 0; i2 < source; i2++) {
        ret[i2] = renderItem(i2 + 1, i2, void 0, cached);
      }
    } else if (isObject(source)) {
      if (source[Symbol.iterator]) {
        ret = Array.from(
          source,
          (item, i2) => renderItem(item, i2, void 0, cached)
        );
      } else {
        const keys = Object.keys(source);
        ret = new Array(keys.length);
        for (let i2 = 0, l = keys.length; i2 < l; i2++) {
          const key = keys[i2];
          ret[i2] = renderItem(source[key], key, i2, cached);
        }
      }
    } else {
      ret = [];
    }
    return ret;
  }
  function renderSlot(slots, name, props = {}, fallback, noSlotted) {
    if (currentRenderingInstance.ce || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.ce) {
      const hasProps = Object.keys(props).length > 0;
      if (name !== "default") props.name = name;
      return openBlock(), createBlock(
        Fragment,
        null,
        [createVNode("slot", props, fallback && fallback())],
        hasProps ? -2 : 64
      );
    }
    let slot = slots[name];
    if (slot && slot._c) {
      slot._d = false;
    }
    openBlock();
    const validSlotContent = slot && ensureValidVNode(slot(props));
    const slotKey = props.key || // slot content array of a dynamic conditional slot may have a branch
    // key attached in the `createSlots` helper, respect that
    validSlotContent && validSlotContent.key;
    const rendered = createBlock(
      Fragment,
      {
        key: (slotKey && !isSymbol(slotKey) ? slotKey : `_${name}`) + // #7256 force differentiate fallback content from actual content
        (!validSlotContent && fallback ? "_fb" : "")
      },
      validSlotContent || (fallback ? fallback() : []),
      validSlotContent && slots._ === 1 ? 64 : -2
    );
    if (slot && slot._c) {
      slot._d = true;
    }
    return rendered;
  }
  function ensureValidVNode(vnodes) {
    return vnodes.some((child) => {
      if (!isVNode(child)) return true;
      if (child.type === Comment) return false;
      if (child.type === Fragment && !ensureValidVNode(child.children))
        return false;
      return true;
    }) ? vnodes : null;
  }
  const getPublicInstance = (i2) => {
    if (!i2) return null;
    if (isStatefulComponent(i2)) return getComponentPublicInstance(i2);
    return getPublicInstance(i2.parent);
  };
  const publicPropertiesMap = (
    // Move PURE marker to new line to workaround compiler discarding it
    // due to type annotation
    /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
      $: (i2) => i2,
      $el: (i2) => i2.vnode.el,
      $data: (i2) => i2.data,
      $props: (i2) => i2.props,
      $attrs: (i2) => i2.attrs,
      $slots: (i2) => i2.slots,
      $refs: (i2) => i2.refs,
      $parent: (i2) => getPublicInstance(i2.parent),
      $root: (i2) => getPublicInstance(i2.root),
      $host: (i2) => i2.ce,
      $emit: (i2) => i2.emit,
      $options: (i2) => resolveMergedOptions(i2),
      $forceUpdate: (i2) => i2.f || (i2.f = () => {
        queueJob(i2.update);
      }),
      $nextTick: (i2) => i2.n || (i2.n = nextTick.bind(i2.proxy)),
      $watch: (i2) => instanceWatch.bind(i2)
    })
  );
  const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
  const PublicInstanceProxyHandlers = {
    get({ _: instance2 }, key) {
      if (key === "__v_skip") {
        return true;
      }
      const { ctx, setupState, data, props, accessCache, type, appContext } = instance2;
      if (key[0] !== "$") {
        const n = accessCache[key];
        if (n !== void 0) {
          switch (n) {
            case 1:
              return setupState[key];
            case 2:
              return data[key];
            case 4:
              return ctx[key];
            case 3:
              return props[key];
          }
        } else if (hasSetupBinding(setupState, key)) {
          accessCache[key] = 1;
          return setupState[key];
        } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
          accessCache[key] = 2;
          return data[key];
        } else if (hasOwn(props, key)) {
          accessCache[key] = 3;
          return props[key];
        } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
          accessCache[key] = 4;
          return ctx[key];
        } else if (shouldCacheAccess) {
          accessCache[key] = 0;
        }
      }
      const publicGetter = publicPropertiesMap[key];
      let cssModule, globalProperties;
      if (publicGetter) {
        if (key === "$attrs") {
          track(instance2.attrs, "get", "");
        }
        return publicGetter(instance2);
      } else if (
        // css module (injected by vue-loader)
        (cssModule = type.__cssModules) && (cssModule = cssModule[key])
      ) {
        return cssModule;
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (
        // global properties
        globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
      ) {
        {
          return globalProperties[key];
        }
      } else ;
    },
    set({ _: instance2 }, key, value) {
      const { data, setupState, ctx } = instance2;
      if (hasSetupBinding(setupState, key)) {
        setupState[key] = value;
        return true;
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        data[key] = value;
        return true;
      } else if (hasOwn(instance2.props, key)) {
        return false;
      }
      if (key[0] === "$" && key.slice(1) in instance2) {
        return false;
      } else {
        {
          ctx[key] = value;
        }
      }
      return true;
    },
    has({
      _: { data, setupState, accessCache, ctx, appContext, props, type }
    }, key) {
      let cssModules;
      return !!(accessCache[key] || data !== EMPTY_OBJ && key[0] !== "$" && hasOwn(data, key) || hasSetupBinding(setupState, key) || hasOwn(props, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key) || (cssModules = type.__cssModules) && cssModules[key]);
    },
    defineProperty(target2, key, descriptor) {
      if (descriptor.get != null) {
        target2._.accessCache[key] = 0;
      } else if (hasOwn(descriptor, "value")) {
        this.set(target2, key, descriptor.value, null);
      }
      return Reflect.defineProperty(target2, key, descriptor);
    }
  };
  function normalizePropsOrEmits(props) {
    return isArray(props) ? props.reduce(
      (normalized, p2) => (normalized[p2] = null, normalized),
      {}
    ) : props;
  }
  let shouldCacheAccess = true;
  function applyOptions(instance2) {
    const options = resolveMergedOptions(instance2);
    const publicThis = instance2.proxy;
    const ctx = instance2.ctx;
    shouldCacheAccess = false;
    if (options.beforeCreate) {
      callHook$1(options.beforeCreate, instance2, "bc");
    }
    const {
      // state
      data: dataOptions,
      computed: computedOptions,
      methods,
      watch: watchOptions,
      provide: provideOptions,
      inject: injectOptions,
      // lifecycle
      created,
      beforeMount,
      mounted,
      beforeUpdate,
      updated,
      activated,
      deactivated,
      beforeDestroy,
      beforeUnmount,
      destroyed,
      unmounted,
      render: render2,
      renderTracked,
      renderTriggered,
      errorCaptured,
      serverPrefetch,
      // public API
      expose,
      inheritAttrs,
      // assets
      components,
      directives,
      filters
    } = options;
    const checkDuplicateProperties = null;
    if (injectOptions) {
      resolveInjections(injectOptions, ctx, checkDuplicateProperties);
    }
    if (methods) {
      for (const key in methods) {
        const methodHandler = methods[key];
        if (isFunction(methodHandler)) {
          {
            ctx[key] = methodHandler.bind(publicThis);
          }
        }
      }
    }
    if (dataOptions) {
      const data = dataOptions.call(publicThis, publicThis);
      if (!isObject(data)) ;
      else {
        instance2.data = /* @__PURE__ */ reactive(data);
      }
    }
    shouldCacheAccess = true;
    if (computedOptions) {
      for (const key in computedOptions) {
        const opt = computedOptions[key];
        const get = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
        const set = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
        const c = computed({
          get,
          set
        });
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => c.value,
          set: (v) => c.value = v
        });
      }
    }
    if (watchOptions) {
      for (const key in watchOptions) {
        createWatcher(watchOptions[key], ctx, publicThis, key);
      }
    }
    if (provideOptions) {
      const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
    if (created) {
      callHook$1(created, instance2, "c");
    }
    function registerLifecycleHook(register, hook) {
      if (isArray(hook)) {
        hook.forEach((_hook) => register(_hook.bind(publicThis)));
      } else if (hook) {
        register(hook.bind(publicThis));
      }
    }
    registerLifecycleHook(onBeforeMount, beforeMount);
    registerLifecycleHook(onMounted, mounted);
    registerLifecycleHook(onBeforeUpdate, beforeUpdate);
    registerLifecycleHook(onUpdated, updated);
    registerLifecycleHook(onActivated, activated);
    registerLifecycleHook(onDeactivated, deactivated);
    registerLifecycleHook(onErrorCaptured, errorCaptured);
    registerLifecycleHook(onRenderTracked, renderTracked);
    registerLifecycleHook(onRenderTriggered, renderTriggered);
    registerLifecycleHook(onBeforeUnmount, beforeUnmount);
    registerLifecycleHook(onUnmounted, unmounted);
    registerLifecycleHook(onServerPrefetch, serverPrefetch);
    if (isArray(expose)) {
      if (expose.length) {
        const exposed = instance2.exposed || (instance2.exposed = {});
        expose.forEach((key) => {
          Object.defineProperty(exposed, key, {
            get: () => publicThis[key],
            set: (val) => publicThis[key] = val,
            enumerable: true
          });
        });
      } else if (!instance2.exposed) {
        instance2.exposed = {};
      }
    }
    if (render2 && instance2.render === NOOP) {
      instance2.render = render2;
    }
    if (inheritAttrs != null) {
      instance2.inheritAttrs = inheritAttrs;
    }
    if (components) instance2.components = components;
    if (directives) instance2.directives = directives;
    if (serverPrefetch) {
      markAsyncBoundary(instance2);
    }
  }
  function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
    if (isArray(injectOptions)) {
      injectOptions = normalizeInject(injectOptions);
    }
    for (const key in injectOptions) {
      const opt = injectOptions[key];
      let injected;
      if (isObject(opt)) {
        if ("default" in opt) {
          injected = inject(
            opt.from || key,
            opt.default,
            true
          );
        } else {
          injected = inject(opt.from || key);
        }
      } else {
        injected = inject(opt);
      }
      if (/* @__PURE__ */ isRef(injected)) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        ctx[key] = injected;
      }
    }
  }
  function callHook$1(hook, instance2, type) {
    callWithAsyncErrorHandling(
      isArray(hook) ? hook.map((h2) => h2.bind(instance2.proxy)) : hook.bind(instance2.proxy),
      instance2,
      type
    );
  }
  function createWatcher(raw, ctx, publicThis, key) {
    let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
    if (isString(raw)) {
      const handler = ctx[raw];
      if (isFunction(handler)) {
        {
          watch(getter, handler);
        }
      }
    } else if (isFunction(raw)) {
      {
        watch(getter, raw.bind(publicThis));
      }
    } else if (isObject(raw)) {
      if (isArray(raw)) {
        raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
      } else {
        const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
        if (isFunction(handler)) {
          watch(getter, handler, raw);
        }
      }
    } else ;
  }
  function resolveMergedOptions(instance2) {
    const base = instance2.type;
    const { mixins, extends: extendsOptions } = base;
    const {
      mixins: globalMixins,
      optionsCache: cache,
      config: { optionMergeStrategies }
    } = instance2.appContext;
    const cached = cache.get(base);
    let resolved;
    if (cached) {
      resolved = cached;
    } else if (!globalMixins.length && !mixins && !extendsOptions) {
      {
        resolved = base;
      }
    } else {
      resolved = {};
      if (globalMixins.length) {
        globalMixins.forEach(
          (m) => mergeOptions(resolved, m, optionMergeStrategies, true)
        );
      }
      mergeOptions(resolved, base, optionMergeStrategies);
    }
    if (isObject(base)) {
      cache.set(base, resolved);
    }
    return resolved;
  }
  function mergeOptions(to, from, strats, asMixin = false) {
    const { mixins, extends: extendsOptions } = from;
    if (extendsOptions) {
      mergeOptions(to, extendsOptions, strats, true);
    }
    if (mixins) {
      mixins.forEach(
        (m) => mergeOptions(to, m, strats, true)
      );
    }
    for (const key in from) {
      if (asMixin && key === "expose") ;
      else {
        const strat = internalOptionMergeStrats[key] || strats && strats[key];
        to[key] = strat ? strat(to[key], from[key]) : from[key];
      }
    }
    return to;
  }
  const internalOptionMergeStrats = {
    data: mergeDataFn,
    props: mergeEmitsOrPropsOptions,
    emits: mergeEmitsOrPropsOptions,
    // objects
    methods: mergeObjectOptions,
    computed: mergeObjectOptions,
    // lifecycle
    beforeCreate: mergeAsArray,
    created: mergeAsArray,
    beforeMount: mergeAsArray,
    mounted: mergeAsArray,
    beforeUpdate: mergeAsArray,
    updated: mergeAsArray,
    beforeDestroy: mergeAsArray,
    beforeUnmount: mergeAsArray,
    destroyed: mergeAsArray,
    unmounted: mergeAsArray,
    activated: mergeAsArray,
    deactivated: mergeAsArray,
    errorCaptured: mergeAsArray,
    serverPrefetch: mergeAsArray,
    // assets
    components: mergeObjectOptions,
    directives: mergeObjectOptions,
    // watch
    watch: mergeWatchOptions,
    // provide / inject
    provide: mergeDataFn,
    inject: mergeInject
  };
  function mergeDataFn(to, from) {
    if (!from) {
      return to;
    }
    if (!to) {
      return from;
    }
    return function mergedDataFn() {
      return extend(
        isFunction(to) ? to.call(this, this) : to,
        isFunction(from) ? from.call(this, this) : from
      );
    };
  }
  function mergeInject(to, from) {
    return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
  }
  function normalizeInject(raw) {
    if (isArray(raw)) {
      const res = {};
      for (let i2 = 0; i2 < raw.length; i2++) {
        res[raw[i2]] = raw[i2];
      }
      return res;
    }
    return raw;
  }
  function mergeAsArray(to, from) {
    return to ? [...new Set([].concat(to, from))] : from;
  }
  function mergeObjectOptions(to, from) {
    return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
  }
  function mergeEmitsOrPropsOptions(to, from) {
    if (to) {
      if (isArray(to) && isArray(from)) {
        return [.../* @__PURE__ */ new Set([...to, ...from])];
      }
      return extend(
        /* @__PURE__ */ Object.create(null),
        normalizePropsOrEmits(to),
        normalizePropsOrEmits(from != null ? from : {})
      );
    } else {
      return from;
    }
  }
  function mergeWatchOptions(to, from) {
    if (!to) return from;
    if (!from) return to;
    const merged = extend(/* @__PURE__ */ Object.create(null), to);
    for (const key in from) {
      merged[key] = mergeAsArray(to[key], from[key]);
    }
    return merged;
  }
  function createAppContext() {
    return {
      app: null,
      config: {
        isNativeTag: NO,
        performance: false,
        globalProperties: {},
        optionMergeStrategies: {},
        errorHandler: void 0,
        warnHandler: void 0,
        compilerOptions: {}
      },
      mixins: [],
      components: {},
      directives: {},
      provides: /* @__PURE__ */ Object.create(null),
      optionsCache: /* @__PURE__ */ new WeakMap(),
      propsCache: /* @__PURE__ */ new WeakMap(),
      emitsCache: /* @__PURE__ */ new WeakMap()
    };
  }
  let uid$1 = 0;
  function createAppAPI(render2, hydrate) {
    return function createApp2(rootComponent, rootProps = null) {
      if (!isFunction(rootComponent)) {
        rootComponent = extend({}, rootComponent);
      }
      if (rootProps != null && !isObject(rootProps)) {
        rootProps = null;
      }
      const context = createAppContext();
      const installedPlugins = /* @__PURE__ */ new WeakSet();
      const pluginCleanupFns = [];
      let isMounted = false;
      const app = context.app = {
        _uid: uid$1++,
        _component: rootComponent,
        _props: rootProps,
        _container: null,
        _context: context,
        _instance: null,
        version: version$1,
        get config() {
          return context.config;
        },
        set config(v) {
        },
        use(plugin, ...options) {
          if (installedPlugins.has(plugin)) ;
          else if (plugin && isFunction(plugin.install)) {
            installedPlugins.add(plugin);
            plugin.install(app, ...options);
          } else if (isFunction(plugin)) {
            installedPlugins.add(plugin);
            plugin(app, ...options);
          } else ;
          return app;
        },
        mixin(mixin) {
          {
            if (!context.mixins.includes(mixin)) {
              context.mixins.push(mixin);
            }
          }
          return app;
        },
        component(name, component) {
          if (!component) {
            return context.components[name];
          }
          context.components[name] = component;
          return app;
        },
        directive(name, directive) {
          if (!directive) {
            return context.directives[name];
          }
          context.directives[name] = directive;
          return app;
        },
        mount(rootContainer, isHydrate, namespace) {
          if (!isMounted) {
            const vnode = app._ceVNode || createVNode(rootComponent, rootProps);
            vnode.appContext = context;
            if (namespace === true) {
              namespace = "svg";
            } else if (namespace === false) {
              namespace = void 0;
            }
            {
              render2(vnode, rootContainer, namespace);
            }
            isMounted = true;
            app._container = rootContainer;
            rootContainer.__vue_app__ = app;
            return getComponentPublicInstance(vnode.component);
          }
        },
        onUnmount(cleanupFn) {
          pluginCleanupFns.push(cleanupFn);
        },
        unmount() {
          if (isMounted) {
            callWithAsyncErrorHandling(
              pluginCleanupFns,
              app._instance,
              16
            );
            render2(null, app._container);
            delete app._container.__vue_app__;
          }
        },
        provide(key, value) {
          context.provides[key] = value;
          return app;
        },
        runWithContext(fn) {
          const lastApp = currentApp;
          currentApp = app;
          try {
            return fn();
          } finally {
            currentApp = lastApp;
          }
        }
      };
      return app;
    };
  }
  let currentApp = null;
  const getModelModifiers = (props, modelName) => {
    return modelName === "modelValue" || modelName === "model-value" ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${camelize(modelName)}Modifiers`] || props[`${hyphenate(modelName)}Modifiers`];
  };
  function emit(instance2, event, ...rawArgs) {
    if (instance2.isUnmounted) return;
    const props = instance2.vnode.props || EMPTY_OBJ;
    let args = rawArgs;
    const isModelListener2 = event.startsWith("update:");
    const modifiers = isModelListener2 && getModelModifiers(props, event.slice(7));
    if (modifiers) {
      if (modifiers.trim) {
        args = rawArgs.map((a) => isString(a) ? a.trim() : a);
      }
      if (modifiers.number) {
        args = rawArgs.map(looseToNumber);
      }
    }
    let handlerName;
    let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
    props[handlerName = toHandlerKey(camelize(event))];
    if (!handler && isModelListener2) {
      handler = props[handlerName = toHandlerKey(hyphenate(event))];
    }
    if (handler) {
      callWithAsyncErrorHandling(
        handler,
        instance2,
        6,
        args
      );
    }
    const onceHandler = props[handlerName + `Once`];
    if (onceHandler) {
      if (!instance2.emitted) {
        instance2.emitted = {};
      } else if (instance2.emitted[handlerName]) {
        return;
      }
      instance2.emitted[handlerName] = true;
      callWithAsyncErrorHandling(
        onceHandler,
        instance2,
        6,
        args
      );
    }
  }
  const mixinEmitsCache = /* @__PURE__ */ new WeakMap();
  function normalizeEmitsOptions(comp2, appContext, asMixin = false) {
    const cache = asMixin ? mixinEmitsCache : appContext.emitsCache;
    const cached = cache.get(comp2);
    if (cached !== void 0) {
      return cached;
    }
    const raw = comp2.emits;
    let normalized = {};
    let hasExtends = false;
    if (!isFunction(comp2)) {
      const extendEmits = (raw2) => {
        const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
        if (normalizedFromExtend) {
          hasExtends = true;
          extend(normalized, normalizedFromExtend);
        }
      };
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendEmits);
      }
      if (comp2.extends) {
        extendEmits(comp2.extends);
      }
      if (comp2.mixins) {
        comp2.mixins.forEach(extendEmits);
      }
    }
    if (!raw && !hasExtends) {
      if (isObject(comp2)) {
        cache.set(comp2, null);
      }
      return null;
    }
    if (isArray(raw)) {
      raw.forEach((key) => normalized[key] = null);
    } else {
      extend(normalized, raw);
    }
    if (isObject(comp2)) {
      cache.set(comp2, normalized);
    }
    return normalized;
  }
  function isEmitListener(options, key) {
    if (!options || !isOn(key)) {
      return false;
    }
    key = key.slice(2).replace(/Once$/, "");
    return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
  }
  function markAttrsAccessed() {
  }
  function renderComponentRoot(instance2) {
    const {
      type: Component,
      vnode,
      proxy,
      withProxy,
      propsOptions: [propsOptions],
      slots,
      attrs,
      emit: emit2,
      render: render2,
      renderCache,
      props,
      data,
      setupState,
      ctx,
      inheritAttrs
    } = instance2;
    const prev = setCurrentRenderingInstance(instance2);
    let result;
    let fallthroughAttrs;
    try {
      if (vnode.shapeFlag & 4) {
        const proxyToUse = withProxy || proxy;
        const thisProxy = false ? new Proxy(proxyToUse, {
          get(target2, key, receiver) {
            warn$1(
              `Property '${String(
                key
              )}' was accessed via 'this'. Avoid using 'this' in templates.`
            );
            return Reflect.get(target2, key, receiver);
          }
        }) : proxyToUse;
        result = normalizeVNode(
          render2.call(
            thisProxy,
            proxyToUse,
            renderCache,
            false ? /* @__PURE__ */ shallowReadonly(props) : props,
            setupState,
            data,
            ctx
          )
        );
        fallthroughAttrs = attrs;
      } else {
        const render22 = Component;
        if (false) ;
        result = normalizeVNode(
          render22.length > 1 ? render22(
            false ? /* @__PURE__ */ shallowReadonly(props) : props,
            false ? {
              get attrs() {
                markAttrsAccessed();
                return /* @__PURE__ */ shallowReadonly(attrs);
              },
              slots,
              emit: emit2
            } : { attrs, slots, emit: emit2 }
          ) : render22(
            false ? /* @__PURE__ */ shallowReadonly(props) : props,
            null
          )
        );
        fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
      }
    } catch (err2) {
      blockStack.length = 0;
      handleError(err2, instance2, 1);
      result = createVNode(Comment);
    }
    let root = result;
    if (fallthroughAttrs && inheritAttrs !== false) {
      const keys = Object.keys(fallthroughAttrs);
      const { shapeFlag } = root;
      if (keys.length) {
        if (shapeFlag & (1 | 6)) {
          if (propsOptions && keys.some(isModelListener)) {
            fallthroughAttrs = filterModelListeners(
              fallthroughAttrs,
              propsOptions
            );
          }
          root = cloneVNode(root, fallthroughAttrs, false, true);
        }
      }
    }
    if (vnode.dirs) {
      root = cloneVNode(root, null, false, true);
      root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
    }
    if (vnode.transition) {
      setTransitionHooks(root, vnode.transition);
    }
    {
      result = root;
    }
    setCurrentRenderingInstance(prev);
    return result;
  }
  const getFunctionalFallthrough = (attrs) => {
    let res;
    for (const key in attrs) {
      if (key === "class" || key === "style" || isOn(key)) {
        (res || (res = {}))[key] = attrs[key];
      }
    }
    return res;
  };
  const filterModelListeners = (attrs, props) => {
    const res = {};
    for (const key in attrs) {
      if (!isModelListener(key) || !(key.slice(9) in props)) {
        res[key] = attrs[key];
      }
    }
    return res;
  };
  function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
    const { props: prevProps, children: prevChildren, component } = prevVNode;
    const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
    const emits = component.emitsOptions;
    if (nextVNode.dirs || nextVNode.transition) {
      return true;
    }
    if (optimized && patchFlag >= 0) {
      if (patchFlag & 1024) {
        return true;
      }
      if (patchFlag & 16) {
        if (!prevProps) {
          return !!nextProps;
        }
        return hasPropsChanged(prevProps, nextProps, emits);
      } else if (patchFlag & 8) {
        const dynamicProps = nextVNode.dynamicProps;
        for (let i2 = 0; i2 < dynamicProps.length; i2++) {
          const key = dynamicProps[i2];
          if (hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emits, key)) {
            return true;
          }
        }
      }
    } else {
      if (prevChildren || nextChildren) {
        if (!nextChildren || !nextChildren.$stable) {
          return true;
        }
      }
      if (prevProps === nextProps) {
        return false;
      }
      if (!prevProps) {
        return !!nextProps;
      }
      if (!nextProps) {
        return true;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    }
    return false;
  }
  function hasPropsChanged(prevProps, nextProps, emitsOptions) {
    const nextKeys = Object.keys(nextProps);
    if (nextKeys.length !== Object.keys(prevProps).length) {
      return true;
    }
    for (let i2 = 0; i2 < nextKeys.length; i2++) {
      const key = nextKeys[i2];
      if (hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emitsOptions, key)) {
        return true;
      }
    }
    return false;
  }
  function hasPropValueChanged(nextProps, prevProps, key) {
    const nextProp = nextProps[key];
    const prevProp = prevProps[key];
    if (key === "style" && isObject(nextProp) && isObject(prevProp)) {
      return !looseEqual(nextProp, prevProp);
    }
    return nextProp !== prevProp;
  }
  function updateHOCHostEl({ vnode, parent }, el2) {
    while (parent) {
      const root = parent.subTree;
      if (root.suspense && root.suspense.activeBranch === vnode) {
        root.el = vnode.el;
      }
      if (root === vnode) {
        (vnode = parent.vnode).el = el2;
        parent = parent.parent;
      } else {
        break;
      }
    }
  }
  const internalObjectProto = {};
  const createInternalObject = () => Object.create(internalObjectProto);
  const isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
  function initProps(instance2, rawProps, isStateful, isSSR = false) {
    const props = {};
    const attrs = createInternalObject();
    instance2.propsDefaults = /* @__PURE__ */ Object.create(null);
    setFullProps(instance2, rawProps, props, attrs);
    for (const key in instance2.propsOptions[0]) {
      if (!(key in props)) {
        props[key] = void 0;
      }
    }
    if (isStateful) {
      instance2.props = isSSR ? props : /* @__PURE__ */ shallowReactive(props);
    } else {
      if (!instance2.type.props) {
        instance2.props = attrs;
      } else {
        instance2.props = props;
      }
    }
    instance2.attrs = attrs;
  }
  function updateProps(instance2, rawProps, rawPrevProps, optimized) {
    const {
      props,
      attrs,
      vnode: { patchFlag }
    } = instance2;
    const rawCurrentProps = /* @__PURE__ */ toRaw(props);
    const [options] = instance2.propsOptions;
    let hasAttrsChanged = false;
    if (
      // always force full diff in dev
      // - #1942 if hmr is enabled with sfc component
      // - vite#872 non-sfc component used by sfc component
      (optimized || patchFlag > 0) && !(patchFlag & 16)
    ) {
      if (patchFlag & 8) {
        const propsToUpdate = instance2.vnode.dynamicProps;
        for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
          let key = propsToUpdate[i2];
          if (isEmitListener(instance2.emitsOptions, key)) {
            continue;
          }
          const value = rawProps[key];
          if (options) {
            if (hasOwn(attrs, key)) {
              if (value !== attrs[key]) {
                attrs[key] = value;
                hasAttrsChanged = true;
              }
            } else {
              const camelizedKey = camelize(key);
              props[camelizedKey] = resolvePropValue(
                options,
                rawCurrentProps,
                camelizedKey,
                value,
                instance2,
                false
              );
            }
          } else {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          }
        }
      }
    } else {
      if (setFullProps(instance2, rawProps, props, attrs)) {
        hasAttrsChanged = true;
      }
      let kebabKey;
      for (const key in rawCurrentProps) {
        if (!rawProps || // for camelCase
        !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
        // and converted to camelCase (#955)
        ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
          if (options) {
            if (rawPrevProps && // for camelCase
            (rawPrevProps[key] !== void 0 || // for kebab-case
            rawPrevProps[kebabKey] !== void 0)) {
              props[key] = resolvePropValue(
                options,
                rawCurrentProps,
                key,
                void 0,
                instance2,
                true
              );
            }
          } else {
            delete props[key];
          }
        }
      }
      if (attrs !== rawCurrentProps) {
        for (const key in attrs) {
          if (!rawProps || !hasOwn(rawProps, key) && true) {
            delete attrs[key];
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (hasAttrsChanged) {
      trigger(instance2.attrs, "set", "");
    }
  }
  function setFullProps(instance2, rawProps, props, attrs) {
    const [options, needCastKeys] = instance2.propsOptions;
    let hasAttrsChanged = false;
    let rawCastValues;
    if (rawProps) {
      for (let key in rawProps) {
        if (isReservedProp(key)) {
          continue;
        }
        const value = rawProps[key];
        let camelKey;
        if (options && hasOwn(options, camelKey = camelize(key))) {
          if (!needCastKeys || !needCastKeys.includes(camelKey)) {
            props[camelKey] = value;
          } else {
            (rawCastValues || (rawCastValues = {}))[camelKey] = value;
          }
        } else if (!isEmitListener(instance2.emitsOptions, key)) {
          if (!(key in attrs) || value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (needCastKeys) {
      const rawCurrentProps = /* @__PURE__ */ toRaw(props);
      const castValues = rawCastValues || EMPTY_OBJ;
      for (let i2 = 0; i2 < needCastKeys.length; i2++) {
        const key = needCastKeys[i2];
        props[key] = resolvePropValue(
          options,
          rawCurrentProps,
          key,
          castValues[key],
          instance2,
          !hasOwn(castValues, key)
        );
      }
    }
    return hasAttrsChanged;
  }
  function resolvePropValue(options, props, key, value, instance2, isAbsent) {
    const opt = options[key];
    if (opt != null) {
      const hasDefault = hasOwn(opt, "default");
      if (hasDefault && value === void 0) {
        const defaultValue = opt.default;
        if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
          const { propsDefaults } = instance2;
          if (key in propsDefaults) {
            value = propsDefaults[key];
          } else {
            const reset = setCurrentInstance(instance2);
            value = propsDefaults[key] = defaultValue.call(
              null,
              props
            );
            reset();
          }
        } else {
          value = defaultValue;
        }
        if (instance2.ce) {
          instance2.ce._setProp(key, value);
        }
      }
      if (opt[
        0
        /* shouldCast */
      ]) {
        if (isAbsent && !hasDefault) {
          value = false;
        } else if (opt[
          1
          /* shouldCastTrue */
        ] && (value === "" || value === hyphenate(key))) {
          value = true;
        }
      }
    }
    return value;
  }
  const mixinPropsCache = /* @__PURE__ */ new WeakMap();
  function normalizePropsOptions(comp2, appContext, asMixin = false) {
    const cache = asMixin ? mixinPropsCache : appContext.propsCache;
    const cached = cache.get(comp2);
    if (cached) {
      return cached;
    }
    const raw = comp2.props;
    const normalized = {};
    const needCastKeys = [];
    let hasExtends = false;
    if (!isFunction(comp2)) {
      const extendProps = (raw2) => {
        hasExtends = true;
        const [props, keys] = normalizePropsOptions(raw2, appContext, true);
        extend(normalized, props);
        if (keys) needCastKeys.push(...keys);
      };
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendProps);
      }
      if (comp2.extends) {
        extendProps(comp2.extends);
      }
      if (comp2.mixins) {
        comp2.mixins.forEach(extendProps);
      }
    }
    if (!raw && !hasExtends) {
      if (isObject(comp2)) {
        cache.set(comp2, EMPTY_ARR);
      }
      return EMPTY_ARR;
    }
    if (isArray(raw)) {
      for (let i2 = 0; i2 < raw.length; i2++) {
        const normalizedKey = camelize(raw[i2]);
        if (validatePropName(normalizedKey)) {
          normalized[normalizedKey] = EMPTY_OBJ;
        }
      }
    } else if (raw) {
      for (const key in raw) {
        const normalizedKey = camelize(key);
        if (validatePropName(normalizedKey)) {
          const opt = raw[key];
          const prop2 = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
          const propType = prop2.type;
          let shouldCast = false;
          let shouldCastTrue = true;
          if (isArray(propType)) {
            for (let index = 0; index < propType.length; ++index) {
              const type = propType[index];
              const typeName = isFunction(type) && type.name;
              if (typeName === "Boolean") {
                shouldCast = true;
                break;
              } else if (typeName === "String") {
                shouldCastTrue = false;
              }
            }
          } else {
            shouldCast = isFunction(propType) && propType.name === "Boolean";
          }
          prop2[
            0
            /* shouldCast */
          ] = shouldCast;
          prop2[
            1
            /* shouldCastTrue */
          ] = shouldCastTrue;
          if (shouldCast || hasOwn(prop2, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
    const res = [normalized, needCastKeys];
    if (isObject(comp2)) {
      cache.set(comp2, res);
    }
    return res;
  }
  function validatePropName(key) {
    if (key[0] !== "$" && !isReservedProp(key)) {
      return true;
    }
    return false;
  }
  const isInternalKey = (key) => key === "_" || key === "_ctx" || key === "$stable";
  const normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
  const normalizeSlot = (key, rawSlot, ctx) => {
    if (rawSlot._n) {
      return rawSlot;
    }
    const normalized = withCtx((...args) => {
      if (false) ;
      return normalizeSlotValue(rawSlot(...args));
    }, ctx);
    normalized._c = false;
    return normalized;
  };
  const normalizeObjectSlots = (rawSlots, slots, instance2) => {
    const ctx = rawSlots._ctx;
    for (const key in rawSlots) {
      if (isInternalKey(key)) continue;
      const value = rawSlots[key];
      if (isFunction(value)) {
        slots[key] = normalizeSlot(key, value, ctx);
      } else if (value != null) {
        const normalized = normalizeSlotValue(value);
        slots[key] = () => normalized;
      }
    }
  };
  const normalizeVNodeSlots = (instance2, children) => {
    const normalized = normalizeSlotValue(children);
    instance2.slots.default = () => normalized;
  };
  const assignSlots = (slots, children, optimized) => {
    for (const key in children) {
      if (optimized || !isInternalKey(key)) {
        slots[key] = children[key];
      }
    }
  };
  const initSlots = (instance2, children, optimized) => {
    const slots = instance2.slots = createInternalObject();
    if (instance2.vnode.shapeFlag & 32) {
      const type = children._;
      if (type) {
        assignSlots(slots, children, optimized);
        if (optimized) {
          def(slots, "_", type, true);
        }
      } else {
        normalizeObjectSlots(children, slots);
      }
    } else if (children) {
      normalizeVNodeSlots(instance2, children);
    }
  };
  const updateSlots = (instance2, children, optimized) => {
    const { vnode, slots } = instance2;
    let needDeletionCheck = true;
    let deletionComparisonTarget = EMPTY_OBJ;
    if (vnode.shapeFlag & 32) {
      const type = children._;
      if (type) {
        if (optimized && type === 1) {
          needDeletionCheck = false;
        } else {
          assignSlots(slots, children, optimized);
        }
      } else {
        needDeletionCheck = !children.$stable;
        normalizeObjectSlots(children, slots);
      }
      deletionComparisonTarget = children;
    } else if (children) {
      normalizeVNodeSlots(instance2, children);
      deletionComparisonTarget = { default: 1 };
    }
    if (needDeletionCheck) {
      for (const key in slots) {
        if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
          delete slots[key];
        }
      }
    }
  };
  const queuePostRenderEffect = queueEffectWithSuspense;
  function createRenderer(options) {
    return baseCreateRenderer(options);
  }
  function baseCreateRenderer(options, createHydrationFns) {
    const target2 = getGlobalThis();
    target2.__VUE__ = true;
    const {
      insert: hostInsert,
      remove: hostRemove,
      patchProp: hostPatchProp,
      createElement: hostCreateElement,
      createText: hostCreateText,
      createComment: hostCreateComment,
      setText: hostSetText,
      setElementText: hostSetElementText,
      parentNode: hostParentNode,
      nextSibling: hostNextSibling,
      setScopeId: hostSetScopeId = NOOP,
      insertStaticContent: hostInsertStaticContent
    } = options;
    const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
      if (n1 === n2) {
        return;
      }
      if (n1 && !isSameVNodeType(n1, n2)) {
        anchor = getNextHostNode(n1);
        unmount(n1, parentComponent, parentSuspense, true);
        n1 = null;
      }
      if (n2.patchFlag === -2) {
        optimized = false;
        n2.dynamicChildren = null;
      }
      const { type, ref: ref3, shapeFlag } = n2;
      switch (type) {
        case Text:
          processText(n1, n2, container, anchor);
          break;
        case Comment:
          processCommentNode(n1, n2, container, anchor);
          break;
        case Static:
          if (n1 == null) {
            mountStaticNode(n2, container, anchor, namespace);
          }
          break;
        case Fragment:
          processFragment(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          break;
        default:
          if (shapeFlag & 1) {
            processElement(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else if (shapeFlag & 6) {
            processComponent(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else if (shapeFlag & 64) {
            type.process(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized,
              internals
            );
          } else if (shapeFlag & 128) {
            type.process(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized,
              internals
            );
          } else ;
      }
      if (ref3 != null && parentComponent) {
        setRef(ref3, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
      } else if (ref3 == null && n1 && n1.ref != null) {
        setRef(n1.ref, null, parentSuspense, n1, true);
      }
    };
    const processText = (n1, n2, container, anchor) => {
      if (n1 == null) {
        hostInsert(
          n2.el = hostCreateText(n2.children),
          container,
          anchor
        );
      } else {
        const el2 = n2.el = n1.el;
        if (n2.children !== n1.children) {
          hostSetText(el2, n2.children);
        }
      }
    };
    const processCommentNode = (n1, n2, container, anchor) => {
      if (n1 == null) {
        hostInsert(
          n2.el = hostCreateComment(n2.children || ""),
          container,
          anchor
        );
      } else {
        n2.el = n1.el;
      }
    };
    const mountStaticNode = (n2, container, anchor, namespace) => {
      [n2.el, n2.anchor] = hostInsertStaticContent(
        n2.children,
        container,
        anchor,
        namespace,
        n2.el,
        n2.anchor
      );
    };
    const moveStaticNode = ({ el: el2, anchor }, container, nextSibling) => {
      let next;
      while (el2 && el2 !== anchor) {
        next = hostNextSibling(el2);
        hostInsert(el2, container, nextSibling);
        el2 = next;
      }
      hostInsert(anchor, container, nextSibling);
    };
    const removeStaticNode = ({ el: el2, anchor }) => {
      let next;
      while (el2 && el2 !== anchor) {
        next = hostNextSibling(el2);
        hostRemove(el2);
        el2 = next;
      }
      hostRemove(anchor);
    };
    const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      if (n2.type === "svg") {
        namespace = "svg";
      } else if (n2.type === "math") {
        namespace = "mathml";
      }
      if (n1 == null) {
        mountElement(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        const customElement = n1.el && n1.el._isVueCE ? n1.el : null;
        try {
          if (customElement) {
            customElement._beginPatch();
          }
          patchElement(
            n1,
            n2,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } finally {
          if (customElement) {
            customElement._endPatch();
          }
        }
      }
    };
    const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      let el2;
      let vnodeHook;
      const { props, shapeFlag, transition, dirs } = vnode;
      el2 = vnode.el = hostCreateElement(
        vnode.type,
        namespace,
        props && props.is,
        props
      );
      if (shapeFlag & 8) {
        hostSetElementText(el2, vnode.children);
      } else if (shapeFlag & 16) {
        mountChildren(
          vnode.children,
          el2,
          null,
          parentComponent,
          parentSuspense,
          resolveChildrenNamespace(vnode, namespace),
          slotScopeIds,
          optimized
        );
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      setScopeId(el2, vnode, vnode.scopeId, slotScopeIds, parentComponent);
      if (props) {
        for (const key in props) {
          if (key !== "value" && !isReservedProp(key)) {
            hostPatchProp(el2, key, null, props[key], namespace, parentComponent);
          }
        }
        if ("value" in props) {
          hostPatchProp(el2, "value", null, props.value, namespace);
        }
        if (vnodeHook = props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      }
      const needCallTransitionHooks = needTransition(parentSuspense, transition);
      if (needCallTransitionHooks) {
        transition.beforeEnter(el2);
      }
      hostInsert(el2, container, anchor);
      if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          needCallTransitionHooks && transition.enter(el2);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
        }, parentSuspense);
      }
    };
    const setScopeId = (el2, vnode, scopeId, slotScopeIds, parentComponent) => {
      if (scopeId) {
        hostSetScopeId(el2, scopeId);
      }
      if (slotScopeIds) {
        for (let i2 = 0; i2 < slotScopeIds.length; i2++) {
          hostSetScopeId(el2, slotScopeIds[i2]);
        }
      }
      if (parentComponent) {
        let subTree = parentComponent.subTree;
        if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
          const parentVNode = parentComponent.vnode;
          setScopeId(
            el2,
            parentVNode,
            parentVNode.scopeId,
            parentVNode.slotScopeIds,
            parentComponent.parent
          );
        }
      }
    };
    const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
      for (let i2 = start; i2 < children.length; i2++) {
        const child = children[i2] = optimized ? cloneIfMounted(children[i2]) : normalizeVNode(children[i2]);
        patch(
          null,
          child,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    };
    const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      const el2 = n2.el = n1.el;
      let { patchFlag, dynamicChildren, dirs } = n2;
      patchFlag |= n1.patchFlag & 16;
      const oldProps = n1.props || EMPTY_OBJ;
      const newProps = n2.props || EMPTY_OBJ;
      let vnodeHook;
      parentComponent && toggleRecurse(parentComponent, false);
      if (vnodeHook = newProps.onVnodeBeforeUpdate) {
        invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
      }
      if (dirs) {
        invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
      }
      parentComponent && toggleRecurse(parentComponent, true);
      if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) {
        hostSetElementText(el2, "");
      }
      if (dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          el2,
          parentComponent,
          parentSuspense,
          resolveChildrenNamespace(n2, namespace),
          slotScopeIds
        );
      } else if (!optimized) {
        patchChildren(
          n1,
          n2,
          el2,
          null,
          parentComponent,
          parentSuspense,
          resolveChildrenNamespace(n2, namespace),
          slotScopeIds,
          false
        );
      }
      if (patchFlag > 0) {
        if (patchFlag & 16) {
          patchProps(el2, oldProps, newProps, parentComponent, namespace);
        } else {
          if (patchFlag & 2) {
            if (oldProps.class !== newProps.class) {
              hostPatchProp(el2, "class", null, newProps.class, namespace);
            }
          }
          if (patchFlag & 4) {
            hostPatchProp(el2, "style", oldProps.style, newProps.style, namespace);
          }
          if (patchFlag & 8) {
            const propsToUpdate = n2.dynamicProps;
            for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
              const key = propsToUpdate[i2];
              const prev = oldProps[key];
              const next = newProps[key];
              if (next !== prev || key === "value") {
                hostPatchProp(el2, key, prev, next, namespace, parentComponent);
              }
            }
          }
        }
        if (patchFlag & 1) {
          if (n1.children !== n2.children) {
            hostSetElementText(el2, n2.children);
          }
        }
      } else if (!optimized && dynamicChildren == null) {
        patchProps(el2, oldProps, newProps, parentComponent, namespace);
      }
      if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
          dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
        }, parentSuspense);
      }
    };
    const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
      for (let i2 = 0; i2 < newChildren.length; i2++) {
        const oldVNode = oldChildren[i2];
        const newVNode = newChildren[i2];
        const container = (
          // oldVNode may be an errored async setup() component inside Suspense
          // which will not have a mounted element
          oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
          // of the Fragment itself so it can move its children.
          (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
          // which also requires the correct parent container
          !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
          oldVNode.shapeFlag & (6 | 64 | 128)) ? hostParentNode(oldVNode.el) : (
            // In other cases, the parent container is not actually used so we
            // just pass the block element here to avoid a DOM parentNode call.
            fallbackContainer
          )
        );
        patch(
          oldVNode,
          newVNode,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          true
        );
      }
    };
    const patchProps = (el2, oldProps, newProps, parentComponent, namespace) => {
      if (oldProps !== newProps) {
        if (oldProps !== EMPTY_OBJ) {
          for (const key in oldProps) {
            if (!isReservedProp(key) && !(key in newProps)) {
              hostPatchProp(
                el2,
                key,
                oldProps[key],
                null,
                namespace,
                parentComponent
              );
            }
          }
        }
        for (const key in newProps) {
          if (isReservedProp(key)) continue;
          const next = newProps[key];
          const prev = oldProps[key];
          if (next !== prev && key !== "value") {
            hostPatchProp(el2, key, prev, next, namespace, parentComponent);
          }
        }
        if ("value" in newProps) {
          hostPatchProp(el2, "value", oldProps.value, newProps.value, namespace);
        }
      }
    };
    const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
      const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
      let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
      if (fragmentSlotScopeIds) {
        slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
      }
      if (n1 == null) {
        hostInsert(fragmentStartAnchor, container, anchor);
        hostInsert(fragmentEndAnchor, container, anchor);
        mountChildren(
          // #10007
          // such fragment like `<></>` will be compiled into
          // a fragment which doesn't have a children.
          // In this case fallback to an empty array
          n2.children || [],
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
        // of renderSlot() with no valid children
        n1.dynamicChildren && n1.dynamicChildren.length === dynamicChildren.length) {
          patchBlockChildren(
            n1.dynamicChildren,
            dynamicChildren,
            container,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds
          );
          if (
            // #2080 if the stable fragment has a key, it's a <template v-for> that may
            //  get moved around. Make sure all root level vnodes inherit el.
            // #2134 or if it's a component root, it may also get moved around
            // as the component is being moved.
            n2.key != null || parentComponent && n2 === parentComponent.subTree
          ) {
            traverseStaticChildren(
              n1,
              n2,
              true
              /* shallow */
            );
          }
        } else {
          patchChildren(
            n1,
            n2,
            container,
            fragmentEndAnchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      }
    };
    const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      n2.slotScopeIds = slotScopeIds;
      if (n1 == null) {
        if (n2.shapeFlag & 512) {
          parentComponent.ctx.activate(
            n2,
            container,
            anchor,
            namespace,
            optimized
          );
        } else {
          mountComponent(
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            optimized
          );
        }
      } else {
        updateComponent(n1, n2, optimized);
      }
    };
    const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
      const instance2 = initialVNode.component = createComponentInstance(
        initialVNode,
        parentComponent,
        parentSuspense
      );
      if (isKeepAlive(initialVNode)) {
        instance2.ctx.renderer = internals;
      }
      {
        setupComponent(instance2, false, optimized);
      }
      if (instance2.asyncDep) {
        parentSuspense && parentSuspense.registerDep(instance2, setupRenderEffect, optimized);
        if (!initialVNode.el) {
          const placeholder = instance2.subTree = createVNode(Comment);
          processCommentNode(null, placeholder, container, anchor);
          initialVNode.placeholder = placeholder.el;
        }
      } else {
        setupRenderEffect(
          instance2,
          initialVNode,
          container,
          anchor,
          parentSuspense,
          namespace,
          optimized
        );
      }
    };
    const updateComponent = (n1, n2, optimized) => {
      const instance2 = n2.component = n1.component;
      if (shouldUpdateComponent(n1, n2, optimized)) {
        if (instance2.asyncDep && !instance2.asyncResolved) {
          updateComponentPreRender(instance2, n2, optimized);
          return;
        } else {
          instance2.next = n2;
          instance2.update();
        }
      } else {
        n2.el = n1.el;
        instance2.vnode = n2;
      }
    };
    const setupRenderEffect = (instance2, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
      const componentUpdateFn = () => {
        if (!instance2.isMounted) {
          let vnodeHook;
          const { el: el2, props } = initialVNode;
          const { bm, m, parent, root, type } = instance2;
          const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
          toggleRecurse(instance2, false);
          if (bm) {
            invokeArrayFns(bm);
          }
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
            invokeVNodeHook(vnodeHook, parent, initialVNode);
          }
          toggleRecurse(instance2, true);
          {
            if (root.ce && root.ce._hasShadowRoot()) {
              root.ce._injectChildStyle(type);
            }
            const subTree = instance2.subTree = renderComponentRoot(instance2);
            patch(
              null,
              subTree,
              container,
              anchor,
              instance2,
              parentSuspense,
              namespace
            );
            initialVNode.el = subTree.el;
          }
          if (m) {
            queuePostRenderEffect(m, parentSuspense);
          }
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
            const scopedInitialVNode = initialVNode;
            queuePostRenderEffect(
              () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
              parentSuspense
            );
          }
          if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
            instance2.a && queuePostRenderEffect(instance2.a, parentSuspense);
          }
          instance2.isMounted = true;
          initialVNode = container = anchor = null;
        } else {
          let { next, bu, u, parent, vnode } = instance2;
          {
            const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance2);
            if (nonHydratedAsyncRoot) {
              if (next) {
                next.el = vnode.el;
                updateComponentPreRender(instance2, next, optimized);
              }
              nonHydratedAsyncRoot.asyncDep.then(() => {
                queuePostRenderEffect(() => {
                  if (!instance2.isUnmounted) update();
                }, parentSuspense);
              });
              return;
            }
          }
          let originNext = next;
          let vnodeHook;
          toggleRecurse(instance2, false);
          if (next) {
            next.el = vnode.el;
            updateComponentPreRender(instance2, next, optimized);
          } else {
            next = vnode;
          }
          if (bu) {
            invokeArrayFns(bu);
          }
          if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
            invokeVNodeHook(vnodeHook, parent, next, vnode);
          }
          toggleRecurse(instance2, true);
          const nextTree = renderComponentRoot(instance2);
          const prevTree = instance2.subTree;
          instance2.subTree = nextTree;
          patch(
            prevTree,
            nextTree,
            // parent may have changed if it's in a teleport
            hostParentNode(prevTree.el),
            // anchor may have changed if it's in a fragment
            getNextHostNode(prevTree),
            instance2,
            parentSuspense,
            namespace
          );
          next.el = nextTree.el;
          if (originNext === null) {
            updateHOCHostEl(instance2, nextTree.el);
          }
          if (u) {
            queuePostRenderEffect(u, parentSuspense);
          }
          if (vnodeHook = next.props && next.props.onVnodeUpdated) {
            queuePostRenderEffect(
              () => invokeVNodeHook(vnodeHook, parent, next, vnode),
              parentSuspense
            );
          }
        }
      };
      instance2.scope.on();
      const effect2 = instance2.effect = new ReactiveEffect(componentUpdateFn);
      instance2.scope.off();
      const update = instance2.update = effect2.run.bind(effect2);
      const job = instance2.job = effect2.runIfDirty.bind(effect2);
      job.i = instance2;
      job.id = instance2.uid;
      effect2.scheduler = () => queueJob(job);
      toggleRecurse(instance2, true);
      update();
    };
    const updateComponentPreRender = (instance2, nextVNode, optimized) => {
      nextVNode.component = instance2;
      const prevProps = instance2.vnode.props;
      instance2.vnode = nextVNode;
      instance2.next = null;
      updateProps(instance2, nextVNode.props, prevProps, optimized);
      updateSlots(instance2, nextVNode.children, optimized);
      pauseTracking();
      flushPreFlushCbs(instance2);
      resetTracking();
    };
    const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
      const c1 = n1 && n1.children;
      const prevShapeFlag = n1 ? n1.shapeFlag : 0;
      const c2 = n2.children;
      const { patchFlag, shapeFlag } = n2;
      if (patchFlag > 0) {
        if (patchFlag & 128) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          return;
        } else if (patchFlag & 256) {
          patchUnkeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          return;
        }
      }
      if (shapeFlag & 8) {
        if (prevShapeFlag & 16) {
          unmountChildren(c1, parentComponent, parentSuspense);
        }
        if (c2 !== c1) {
          hostSetElementText(container, c2);
        }
      } else {
        if (prevShapeFlag & 16) {
          if (shapeFlag & 16) {
            patchKeyedChildren(
              c1,
              c2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else {
            unmountChildren(c1, parentComponent, parentSuspense, true);
          }
        } else {
          if (prevShapeFlag & 8) {
            hostSetElementText(container, "");
          }
          if (shapeFlag & 16) {
            mountChildren(
              c2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          }
        }
      }
    };
    const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      c1 = c1 || EMPTY_ARR;
      c2 = c2 || EMPTY_ARR;
      const oldLength = c1.length;
      const newLength = c2.length;
      const commonLength = Math.min(oldLength, newLength);
      let i2;
      for (i2 = 0; i2 < commonLength; i2++) {
        const nextChild = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
        patch(
          c1[i2],
          nextChild,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
      if (oldLength > newLength) {
        unmountChildren(
          c1,
          parentComponent,
          parentSuspense,
          true,
          false,
          commonLength
        );
      } else {
        mountChildren(
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized,
          commonLength
        );
      }
    };
    const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      let i2 = 0;
      const l2 = c2.length;
      let e1 = c1.length - 1;
      let e2 = l2 - 1;
      while (i2 <= e1 && i2 <= e2) {
        const n1 = c1[i2];
        const n2 = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
        if (isSameVNodeType(n1, n2)) {
          patch(
            n1,
            n2,
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          break;
        }
        i2++;
      }
      while (i2 <= e1 && i2 <= e2) {
        const n1 = c1[e1];
        const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
        if (isSameVNodeType(n1, n2)) {
          patch(
            n1,
            n2,
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          break;
        }
        e1--;
        e2--;
      }
      if (i2 > e1) {
        if (i2 <= e2) {
          const nextPos = e2 + 1;
          const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
          while (i2 <= e2) {
            patch(
              null,
              c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]),
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
            i2++;
          }
        }
      } else if (i2 > e2) {
        while (i2 <= e1) {
          unmount(c1[i2], parentComponent, parentSuspense, true);
          i2++;
        }
      } else {
        const s1 = i2;
        const s2 = i2;
        const keyToNewIndexMap = /* @__PURE__ */ new Map();
        for (i2 = s2; i2 <= e2; i2++) {
          const nextChild = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
          if (nextChild.key != null) {
            keyToNewIndexMap.set(nextChild.key, i2);
          }
        }
        let j;
        let patched = 0;
        const toBePatched = e2 - s2 + 1;
        let moved = false;
        let maxNewIndexSoFar = 0;
        const newIndexToOldIndexMap = new Array(toBePatched);
        for (i2 = 0; i2 < toBePatched; i2++) newIndexToOldIndexMap[i2] = 0;
        for (i2 = s1; i2 <= e1; i2++) {
          const prevChild = c1[i2];
          if (patched >= toBePatched) {
            unmount(prevChild, parentComponent, parentSuspense, true);
            continue;
          }
          let newIndex;
          if (prevChild.key != null) {
            newIndex = keyToNewIndexMap.get(prevChild.key);
          } else {
            for (j = s2; j <= e2; j++) {
              if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
                newIndex = j;
                break;
              }
            }
          }
          if (newIndex === void 0) {
            unmount(prevChild, parentComponent, parentSuspense, true);
          } else {
            newIndexToOldIndexMap[newIndex - s2] = i2 + 1;
            if (newIndex >= maxNewIndexSoFar) {
              maxNewIndexSoFar = newIndex;
            } else {
              moved = true;
            }
            patch(
              prevChild,
              c2[newIndex],
              container,
              null,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
            patched++;
          }
        }
        const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
        j = increasingNewIndexSequence.length - 1;
        for (i2 = toBePatched - 1; i2 >= 0; i2--) {
          const nextIndex = s2 + i2;
          const nextChild = c2[nextIndex];
          const anchorVNode = c2[nextIndex + 1];
          const anchor = nextIndex + 1 < l2 ? (
            // #13559, #14173 fallback to el placeholder for unresolved async component
            anchorVNode.el || resolveAsyncComponentPlaceholder(anchorVNode)
          ) : parentAnchor;
          if (newIndexToOldIndexMap[i2] === 0) {
            patch(
              null,
              nextChild,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else if (moved) {
            if (j < 0 || i2 !== increasingNewIndexSequence[j]) {
              move(nextChild, container, anchor, 2);
            } else {
              j--;
            }
          }
        }
      }
    };
    const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
      const { el: el2, type, transition, children, shapeFlag } = vnode;
      if (shapeFlag & 6) {
        move(vnode.component.subTree, container, anchor, moveType);
        return;
      }
      if (shapeFlag & 128) {
        vnode.suspense.move(container, anchor, moveType);
        return;
      }
      if (shapeFlag & 64) {
        type.move(vnode, container, anchor, internals);
        return;
      }
      if (type === Fragment) {
        hostInsert(el2, container, anchor);
        for (let i2 = 0; i2 < children.length; i2++) {
          move(children[i2], container, anchor, moveType);
        }
        hostInsert(vnode.anchor, container, anchor);
        return;
      }
      if (type === Static) {
        moveStaticNode(vnode, container, anchor);
        return;
      }
      const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
      if (needTransition2) {
        if (moveType === 0) {
          transition.beforeEnter(el2);
          hostInsert(el2, container, anchor);
          queuePostRenderEffect(() => transition.enter(el2), parentSuspense);
        } else {
          const { leave, delayLeave, afterLeave } = transition;
          const remove22 = () => {
            if (vnode.ctx.isUnmounted) {
              hostRemove(el2);
            } else {
              hostInsert(el2, container, anchor);
            }
          };
          const performLeave = () => {
            if (el2._isLeaving) {
              el2[leaveCbKey](
                true
                /* cancelled */
              );
            }
            leave(el2, () => {
              remove22();
              afterLeave && afterLeave();
            });
          };
          if (delayLeave) {
            delayLeave(el2, remove22, performLeave);
          } else {
            performLeave();
          }
        }
      } else {
        hostInsert(el2, container, anchor);
      }
    };
    const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
      const {
        type,
        props,
        ref: ref3,
        children,
        dynamicChildren,
        shapeFlag,
        patchFlag,
        dirs,
        cacheIndex
      } = vnode;
      if (patchFlag === -2) {
        optimized = false;
      }
      if (ref3 != null) {
        pauseTracking();
        setRef(ref3, null, parentSuspense, vnode, true);
        resetTracking();
      }
      if (cacheIndex != null) {
        parentComponent.renderCache[cacheIndex] = void 0;
      }
      if (shapeFlag & 256) {
        parentComponent.ctx.deactivate(vnode);
        return;
      }
      const shouldInvokeDirs = shapeFlag & 1 && dirs;
      const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
      let vnodeHook;
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
      if (shapeFlag & 6) {
        unmountComponent(vnode.component, parentSuspense, doRemove);
      } else {
        if (shapeFlag & 128) {
          vnode.suspense.unmount(parentSuspense, doRemove);
          return;
        }
        if (shouldInvokeDirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
        }
        if (shapeFlag & 64) {
          vnode.type.remove(
            vnode,
            parentComponent,
            parentSuspense,
            internals,
            doRemove
          );
        } else if (dynamicChildren && // #5154
        // when v-once is used inside a block, setBlockTracking(-1) marks the
        // parent block with hasOnce: true
        // so that it doesn't take the fast path during unmount - otherwise
        // components nested in v-once are never unmounted.
        !dynamicChildren.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
        (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
          unmountChildren(
            dynamicChildren,
            parentComponent,
            parentSuspense,
            false,
            true
          );
        } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
          unmountChildren(children, parentComponent, parentSuspense);
        }
        if (doRemove) {
          remove2(vnode);
        }
      }
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
        }, parentSuspense);
      }
    };
    const remove2 = (vnode) => {
      const { type, el: el2, anchor, transition } = vnode;
      if (type === Fragment) {
        {
          removeFragment(el2, anchor);
        }
        return;
      }
      if (type === Static) {
        removeStaticNode(vnode);
        return;
      }
      const performRemove = () => {
        hostRemove(el2);
        if (transition && !transition.persisted && transition.afterLeave) {
          transition.afterLeave();
        }
      };
      if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
        const { leave, delayLeave } = transition;
        const performLeave = () => leave(el2, performRemove);
        if (delayLeave) {
          delayLeave(vnode.el, performRemove, performLeave);
        } else {
          performLeave();
        }
      } else {
        performRemove();
      }
    };
    const removeFragment = (cur, end) => {
      let next;
      while (cur !== end) {
        next = hostNextSibling(cur);
        hostRemove(cur);
        cur = next;
      }
      hostRemove(end);
    };
    const unmountComponent = (instance2, parentSuspense, doRemove) => {
      const { bum, scope, job, subTree, um, m, a } = instance2;
      invalidateMount(m);
      invalidateMount(a);
      if (bum) {
        invokeArrayFns(bum);
      }
      scope.stop();
      if (job) {
        job.flags |= 8;
        unmount(subTree, instance2, parentSuspense, doRemove);
      }
      if (um) {
        queuePostRenderEffect(um, parentSuspense);
      }
      queuePostRenderEffect(() => {
        instance2.isUnmounted = true;
      }, parentSuspense);
    };
    const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
      for (let i2 = start; i2 < children.length; i2++) {
        unmount(children[i2], parentComponent, parentSuspense, doRemove, optimized);
      }
    };
    const getNextHostNode = (vnode) => {
      if (vnode.shapeFlag & 6) {
        return getNextHostNode(vnode.component.subTree);
      }
      if (vnode.shapeFlag & 128) {
        return vnode.suspense.next();
      }
      const el2 = hostNextSibling(vnode.anchor || vnode.el);
      const teleportEnd = el2 && el2[TeleportEndKey];
      return teleportEnd ? hostNextSibling(teleportEnd) : el2;
    };
    let isFlushing = false;
    const render2 = (vnode, container, namespace) => {
      let instance2;
      if (vnode == null) {
        if (container._vnode) {
          unmount(container._vnode, null, null, true);
          instance2 = container._vnode.component;
        }
      } else {
        patch(
          container._vnode || null,
          vnode,
          container,
          null,
          null,
          null,
          namespace
        );
      }
      container._vnode = vnode;
      if (!isFlushing) {
        isFlushing = true;
        flushPreFlushCbs(instance2);
        flushPostFlushCbs();
        isFlushing = false;
      }
    };
    const internals = {
      p: patch,
      um: unmount,
      m: move,
      r: remove2,
      mt: mountComponent,
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      n: getNextHostNode,
      o: options
    };
    let hydrate;
    return {
      render: render2,
      hydrate,
      createApp: createAppAPI(render2)
    };
  }
  function resolveChildrenNamespace({ type, props }, currentNamespace) {
    return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
  }
  function toggleRecurse({ effect: effect2, job }, allowed) {
    if (allowed) {
      effect2.flags |= 32;
      job.flags |= 4;
    } else {
      effect2.flags &= -33;
      job.flags &= -5;
    }
  }
  function needTransition(parentSuspense, transition) {
    return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
  }
  function traverseStaticChildren(n1, n2, shallow = false) {
    const ch1 = n1.children;
    const ch2 = n2.children;
    if (isArray(ch1) && isArray(ch2)) {
      for (let i2 = 0; i2 < ch1.length; i2++) {
        const c1 = ch1[i2];
        let c2 = ch2[i2];
        if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
          if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
            c2 = ch2[i2] = cloneIfMounted(ch2[i2]);
            c2.el = c1.el;
          }
          if (!shallow && c2.patchFlag !== -2)
            traverseStaticChildren(c1, c2);
        }
        if (c2.type === Text) {
          if (c2.patchFlag === -1) {
            c2 = ch2[i2] = cloneIfMounted(c2);
          }
          c2.el = c1.el;
        }
        if (c2.type === Comment && !c2.el) {
          c2.el = c1.el;
        }
      }
    }
  }
  function getSequence(arr) {
    const p2 = arr.slice();
    const result = [0];
    let i2, j, u, v, c;
    const len = arr.length;
    for (i2 = 0; i2 < len; i2++) {
      const arrI = arr[i2];
      if (arrI !== 0) {
        j = result[result.length - 1];
        if (arr[j] < arrI) {
          p2[i2] = j;
          result.push(i2);
          continue;
        }
        u = 0;
        v = result.length - 1;
        while (u < v) {
          c = u + v >> 1;
          if (arr[result[c]] < arrI) {
            u = c + 1;
          } else {
            v = c;
          }
        }
        if (arrI < arr[result[u]]) {
          if (u > 0) {
            p2[i2] = result[u - 1];
          }
          result[u] = i2;
        }
      }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
      result[u] = v;
      v = p2[v];
    }
    return result;
  }
  function locateNonHydratedAsyncRoot(instance2) {
    const subComponent = instance2.subTree.component;
    if (subComponent) {
      if (subComponent.asyncDep && !subComponent.asyncResolved) {
        return subComponent;
      } else {
        return locateNonHydratedAsyncRoot(subComponent);
      }
    }
  }
  function invalidateMount(hooks) {
    if (hooks) {
      for (let i2 = 0; i2 < hooks.length; i2++)
        hooks[i2].flags |= 8;
    }
  }
  function resolveAsyncComponentPlaceholder(anchorVnode) {
    if (anchorVnode.placeholder) {
      return anchorVnode.placeholder;
    }
    const instance2 = anchorVnode.component;
    if (instance2) {
      return resolveAsyncComponentPlaceholder(instance2.subTree);
    }
    return null;
  }
  const isSuspense = (type) => type.__isSuspense;
  function queueEffectWithSuspense(fn, suspense) {
    if (suspense && suspense.pendingBranch) {
      if (isArray(fn)) {
        suspense.effects.push(...fn);
      } else {
        suspense.effects.push(fn);
      }
    } else {
      queuePostFlushCb(fn);
    }
  }
  const Fragment = /* @__PURE__ */ Symbol.for("v-fgt");
  const Text = /* @__PURE__ */ Symbol.for("v-txt");
  const Comment = /* @__PURE__ */ Symbol.for("v-cmt");
  const Static = /* @__PURE__ */ Symbol.for("v-stc");
  const blockStack = [];
  let currentBlock = null;
  function openBlock(disableTracking = false) {
    blockStack.push(currentBlock = disableTracking ? null : []);
  }
  function closeBlock() {
    blockStack.pop();
    currentBlock = blockStack[blockStack.length - 1] || null;
  }
  let isBlockTreeEnabled = 1;
  function setBlockTracking(value, inVOnce = false) {
    isBlockTreeEnabled += value;
    if (value < 0 && currentBlock && inVOnce) {
      currentBlock.hasOnce = true;
    }
  }
  function setupBlock(vnode) {
    vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
    closeBlock();
    if (isBlockTreeEnabled > 0 && currentBlock) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
    return setupBlock(
      createBaseVNode(
        type,
        props,
        children,
        patchFlag,
        dynamicProps,
        shapeFlag,
        true
      )
    );
  }
  function createBlock(type, props, children, patchFlag, dynamicProps) {
    return setupBlock(
      createVNode(
        type,
        props,
        children,
        patchFlag,
        dynamicProps,
        true
      )
    );
  }
  function isVNode(value) {
    return value ? value.__v_isVNode === true : false;
  }
  function isSameVNodeType(n1, n2) {
    return n1.type === n2.type && n1.key === n2.key;
  }
  const normalizeKey = ({ key }) => key != null ? key : null;
  const normalizeRef = ({
    ref: ref3,
    ref_key,
    ref_for
  }) => {
    if (typeof ref3 === "number") {
      ref3 = "" + ref3;
    }
    return ref3 != null ? isString(ref3) || /* @__PURE__ */ isRef(ref3) || isFunction(ref3) ? { i: currentRenderingInstance, r: ref3, k: ref_key, f: !!ref_for } : ref3 : null;
  };
  function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
    const vnode = {
      __v_isVNode: true,
      __v_skip: true,
      type,
      props,
      key: props && normalizeKey(props),
      ref: props && normalizeRef(props),
      scopeId: currentScopeId,
      slotScopeIds: null,
      children,
      component: null,
      suspense: null,
      ssContent: null,
      ssFallback: null,
      dirs: null,
      transition: null,
      el: null,
      anchor: null,
      target: null,
      targetStart: null,
      targetAnchor: null,
      staticCount: 0,
      shapeFlag,
      patchFlag,
      dynamicProps,
      dynamicChildren: null,
      appContext: null,
      ctx: currentRenderingInstance
    };
    if (needFullChildrenNormalization) {
      normalizeChildren(vnode, children);
      if (shapeFlag & 128) {
        type.normalize(vnode);
      }
    } else if (children) {
      vnode.shapeFlag |= isString(children) ? 8 : 16;
    }
    if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
    !isBlockNode && // has current parent block
    currentBlock && // presence of a patch flag indicates this node needs patching on updates.
    // component nodes also should always be patched, because even if the
    // component doesn't need to update, it needs to persist the instance on to
    // the next vnode so that it can be properly unmounted later.
    (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
    // vnode should not be considered dynamic due to handler caching.
    vnode.patchFlag !== 32) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  const createVNode = _createVNode;
  function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
    if (!type || type === NULL_DYNAMIC_COMPONENT) {
      type = Comment;
    }
    if (isVNode(type)) {
      const cloned = cloneVNode(
        type,
        props,
        true
        /* mergeRef: true */
      );
      if (children) {
        normalizeChildren(cloned, children);
      }
      if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
        if (cloned.shapeFlag & 6) {
          currentBlock[currentBlock.indexOf(type)] = cloned;
        } else {
          currentBlock.push(cloned);
        }
      }
      cloned.patchFlag = -2;
      return cloned;
    }
    if (isClassComponent(type)) {
      type = type.__vccOpts;
    }
    if (props) {
      props = guardReactiveProps(props);
      let { class: klass, style } = props;
      if (klass && !isString(klass)) {
        props.class = normalizeClass(klass);
      }
      if (isObject(style)) {
        if (/* @__PURE__ */ isProxy(style) && !isArray(style)) {
          style = extend({}, style);
        }
        props.style = normalizeStyle(style);
      }
    }
    const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
    return createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      isBlockNode,
      true
    );
  }
  function guardReactiveProps(props) {
    if (!props) return null;
    return /* @__PURE__ */ isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
  }
  function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
    const { props, ref: ref3, patchFlag, children, transition } = vnode;
    const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
    const cloned = {
      __v_isVNode: true,
      __v_skip: true,
      type: vnode.type,
      props: mergedProps,
      key: mergedProps && normalizeKey(mergedProps),
      ref: extraProps && extraProps.ref ? (
        // #2078 in the case of <component :is="vnode" ref="extra"/>
        // if the vnode itself already has a ref, cloneVNode will need to merge
        // the refs so the single vnode can be set on multiple refs
        mergeRef && ref3 ? isArray(ref3) ? ref3.concat(normalizeRef(extraProps)) : [ref3, normalizeRef(extraProps)] : normalizeRef(extraProps)
      ) : ref3,
      scopeId: vnode.scopeId,
      slotScopeIds: vnode.slotScopeIds,
      children,
      target: vnode.target,
      targetStart: vnode.targetStart,
      targetAnchor: vnode.targetAnchor,
      staticCount: vnode.staticCount,
      shapeFlag: vnode.shapeFlag,
      // if the vnode is cloned with extra props, we can no longer assume its
      // existing patch flag to be reliable and need to add the FULL_PROPS flag.
      // note: preserve flag for fragments since they use the flag for children
      // fast paths only.
      patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
      dynamicProps: vnode.dynamicProps,
      dynamicChildren: vnode.dynamicChildren,
      appContext: vnode.appContext,
      dirs: vnode.dirs,
      transition,
      // These should technically only be non-null on mounted VNodes. However,
      // they *should* be copied for kept-alive vnodes. So we just always copy
      // them since them being non-null during a mount doesn't affect the logic as
      // they will simply be overwritten.
      component: vnode.component,
      suspense: vnode.suspense,
      ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
      ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
      placeholder: vnode.placeholder,
      el: vnode.el,
      anchor: vnode.anchor,
      ctx: vnode.ctx,
      ce: vnode.ce
    };
    if (transition && cloneTransition) {
      setTransitionHooks(
        cloned,
        transition.clone(cloned)
      );
    }
    return cloned;
  }
  function createTextVNode(text2 = " ", flag = 0) {
    return createVNode(Text, null, text2, flag);
  }
  function createStaticVNode(content, numberOfNodes) {
    const vnode = createVNode(Static, null, content);
    vnode.staticCount = numberOfNodes;
    return vnode;
  }
  function createCommentVNode(text2 = "", asBlock = false) {
    return asBlock ? (openBlock(), createBlock(Comment, null, text2)) : createVNode(Comment, null, text2);
  }
  function normalizeVNode(child) {
    if (child == null || typeof child === "boolean") {
      return createVNode(Comment);
    } else if (isArray(child)) {
      return createVNode(
        Fragment,
        null,
        // #3666, avoid reference pollution when reusing vnode
        child.slice()
      );
    } else if (isVNode(child)) {
      return cloneIfMounted(child);
    } else {
      return createVNode(Text, null, String(child));
    }
  }
  function cloneIfMounted(child) {
    return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
  }
  function normalizeChildren(vnode, children) {
    let type = 0;
    const { shapeFlag } = vnode;
    if (children == null) {
      children = null;
    } else if (isArray(children)) {
      type = 16;
    } else if (typeof children === "object") {
      if (shapeFlag & (1 | 64)) {
        const slot = children.default;
        if (slot) {
          slot._c && (slot._d = false);
          normalizeChildren(vnode, slot());
          slot._c && (slot._d = true);
        }
        return;
      } else {
        type = 32;
        const slotFlag = children._;
        if (!slotFlag && !isInternalObject(children)) {
          children._ctx = currentRenderingInstance;
        } else if (slotFlag === 3 && currentRenderingInstance) {
          if (currentRenderingInstance.slots._ === 1) {
            children._ = 1;
          } else {
            children._ = 2;
            vnode.patchFlag |= 1024;
          }
        }
      }
    } else if (isFunction(children)) {
      children = { default: children, _ctx: currentRenderingInstance };
      type = 32;
    } else {
      children = String(children);
      if (shapeFlag & 64) {
        type = 16;
        children = [createTextVNode(children)];
      } else {
        type = 8;
      }
    }
    vnode.children = children;
    vnode.shapeFlag |= type;
  }
  function mergeProps(...args) {
    const ret = {};
    for (let i2 = 0; i2 < args.length; i2++) {
      const toMerge = args[i2];
      for (const key in toMerge) {
        if (key === "class") {
          if (ret.class !== toMerge.class) {
            ret.class = normalizeClass([ret.class, toMerge.class]);
          }
        } else if (key === "style") {
          ret.style = normalizeStyle([ret.style, toMerge.style]);
        } else if (isOn(key)) {
          const existing = ret[key];
          const incoming = toMerge[key];
          if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
            ret[key] = existing ? [].concat(existing, incoming) : incoming;
          }
        } else if (key !== "") {
          ret[key] = toMerge[key];
        }
      }
    }
    return ret;
  }
  function invokeVNodeHook(hook, instance2, vnode, prevVNode = null) {
    callWithAsyncErrorHandling(hook, instance2, 7, [
      vnode,
      prevVNode
    ]);
  }
  const emptyAppContext = createAppContext();
  let uid = 0;
  function createComponentInstance(vnode, parent, suspense) {
    const type = vnode.type;
    const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
    const instance2 = {
      uid: uid++,
      vnode,
      type,
      parent,
      appContext,
      root: null,
      // to be immediately set
      next: null,
      subTree: null,
      // will be set synchronously right after creation
      effect: null,
      update: null,
      // will be set synchronously right after creation
      job: null,
      scope: new EffectScope(
        true
        /* detached */
      ),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: parent ? parent.provides : Object.create(appContext.provides),
      ids: parent ? parent.ids : ["", 0, 0],
      accessCache: null,
      renderCache: [],
      // local resolved assets
      components: null,
      directives: null,
      // resolved props and emits options
      propsOptions: normalizePropsOptions(type, appContext),
      emitsOptions: normalizeEmitsOptions(type, appContext),
      // emit
      emit: null,
      // to be set immediately
      emitted: null,
      // props default value
      propsDefaults: EMPTY_OBJ,
      // inheritAttrs
      inheritAttrs: type.inheritAttrs,
      // state
      ctx: EMPTY_OBJ,
      data: EMPTY_OBJ,
      props: EMPTY_OBJ,
      attrs: EMPTY_OBJ,
      slots: EMPTY_OBJ,
      refs: EMPTY_OBJ,
      setupState: EMPTY_OBJ,
      setupContext: null,
      // suspense related
      suspense,
      suspenseId: suspense ? suspense.pendingId : 0,
      asyncDep: null,
      asyncResolved: false,
      // lifecycle hooks
      // not using enums here because it results in computed properties
      isMounted: false,
      isUnmounted: false,
      isDeactivated: false,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    };
    {
      instance2.ctx = { _: instance2 };
    }
    instance2.root = parent ? parent.root : instance2;
    instance2.emit = emit.bind(null, instance2);
    if (vnode.ce) {
      vnode.ce(instance2);
    }
    return instance2;
  }
  let currentInstance = null;
  const getCurrentInstance = () => currentInstance || currentRenderingInstance;
  let internalSetCurrentInstance;
  let setInSSRSetupState;
  {
    const g = getGlobalThis();
    const registerGlobalSetter = (key, setter) => {
      let setters;
      if (!(setters = g[key])) setters = g[key] = [];
      setters.push(setter);
      return (v) => {
        if (setters.length > 1) setters.forEach((set) => set(v));
        else setters[0](v);
      };
    };
    internalSetCurrentInstance = registerGlobalSetter(
      `__VUE_INSTANCE_SETTERS__`,
      (v) => currentInstance = v
    );
    setInSSRSetupState = registerGlobalSetter(
      `__VUE_SSR_SETTERS__`,
      (v) => isInSSRComponentSetup = v
    );
  }
  const setCurrentInstance = (instance2) => {
    const prev = currentInstance;
    internalSetCurrentInstance(instance2);
    instance2.scope.on();
    return () => {
      instance2.scope.off();
      internalSetCurrentInstance(prev);
    };
  };
  const unsetCurrentInstance = () => {
    currentInstance && currentInstance.scope.off();
    internalSetCurrentInstance(null);
  };
  function isStatefulComponent(instance2) {
    return instance2.vnode.shapeFlag & 4;
  }
  let isInSSRComponentSetup = false;
  function setupComponent(instance2, isSSR = false, optimized = false) {
    isSSR && setInSSRSetupState(isSSR);
    const { props, children } = instance2.vnode;
    const isStateful = isStatefulComponent(instance2);
    initProps(instance2, props, isStateful, isSSR);
    initSlots(instance2, children, optimized || isSSR);
    const setupResult = isStateful ? setupStatefulComponent(instance2, isSSR) : void 0;
    isSSR && setInSSRSetupState(false);
    return setupResult;
  }
  function setupStatefulComponent(instance2, isSSR) {
    const Component = instance2.type;
    instance2.accessCache = /* @__PURE__ */ Object.create(null);
    instance2.proxy = new Proxy(instance2.ctx, PublicInstanceProxyHandlers);
    const { setup } = Component;
    if (setup) {
      pauseTracking();
      const setupContext = instance2.setupContext = setup.length > 1 ? createSetupContext(instance2) : null;
      const reset = setCurrentInstance(instance2);
      const setupResult = callWithErrorHandling(
        setup,
        instance2,
        0,
        [
          instance2.props,
          setupContext
        ]
      );
      const isAsyncSetup = isPromise(setupResult);
      resetTracking();
      reset();
      if ((isAsyncSetup || instance2.sp) && !isAsyncWrapper(instance2)) {
        markAsyncBoundary(instance2);
      }
      if (isAsyncSetup) {
        setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
        if (isSSR) {
          return setupResult.then((resolvedResult) => {
            handleSetupResult(instance2, resolvedResult);
          }).catch((e) => {
            handleError(e, instance2, 0);
          });
        } else {
          instance2.asyncDep = setupResult;
        }
      } else {
        handleSetupResult(instance2, setupResult);
      }
    } else {
      finishComponentSetup(instance2);
    }
  }
  function handleSetupResult(instance2, setupResult, isSSR) {
    if (isFunction(setupResult)) {
      if (instance2.type.__ssrInlineRender) {
        instance2.ssrRender = setupResult;
      } else {
        instance2.render = setupResult;
      }
    } else if (isObject(setupResult)) {
      instance2.setupState = proxyRefs(setupResult);
    } else ;
    finishComponentSetup(instance2);
  }
  function finishComponentSetup(instance2, isSSR, skipOptions) {
    const Component = instance2.type;
    if (!instance2.render) {
      instance2.render = Component.render || NOOP;
    }
    {
      const reset = setCurrentInstance(instance2);
      pauseTracking();
      try {
        applyOptions(instance2);
      } finally {
        resetTracking();
        reset();
      }
    }
  }
  const attrsProxyHandlers = {
    get(target2, key) {
      track(target2, "get", "");
      return target2[key];
    }
  };
  function createSetupContext(instance2) {
    const expose = (exposed) => {
      instance2.exposed = exposed || {};
    };
    {
      return {
        attrs: new Proxy(instance2.attrs, attrsProxyHandlers),
        slots: instance2.slots,
        emit: instance2.emit,
        expose
      };
    }
  }
  function getComponentPublicInstance(instance2) {
    if (instance2.exposed) {
      return instance2.exposeProxy || (instance2.exposeProxy = new Proxy(proxyRefs(markRaw(instance2.exposed)), {
        get(target2, key) {
          if (key in target2) {
            return target2[key];
          } else if (key in publicPropertiesMap) {
            return publicPropertiesMap[key](instance2);
          }
        },
        has(target2, key) {
          return key in target2 || key in publicPropertiesMap;
        }
      }));
    } else {
      return instance2.proxy;
    }
  }
  const classifyRE = /(?:^|[-_])\w/g;
  const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
  function getComponentName(Component, includeInferred = true) {
    return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
  }
  function formatComponentName(instance2, Component, isRoot = false) {
    let name = getComponentName(Component);
    if (!name && Component.__file) {
      const match = Component.__file.match(/([^/\\]+)\.\w+$/);
      if (match) {
        name = match[1];
      }
    }
    if (!name && instance2) {
      const inferFromRegistry = (registry) => {
        for (const key in registry) {
          if (registry[key] === Component) {
            return key;
          }
        }
      };
      name = inferFromRegistry(instance2.components) || instance2.parent && inferFromRegistry(
        instance2.parent.type.components
      ) || inferFromRegistry(instance2.appContext.components);
    }
    return name ? classify(name) : isRoot ? `App` : `Anonymous`;
  }
  function isClassComponent(value) {
    return isFunction(value) && "__vccOpts" in value;
  }
  const computed = (getterOrOptions, debugOptions) => {
    const c = /* @__PURE__ */ computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
    return c;
  };
  function h(type, propsOrChildren, children) {
    try {
      setBlockTracking(-1);
      const l = arguments.length;
      if (l === 2) {
        if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
          if (isVNode(propsOrChildren)) {
            return createVNode(type, null, [propsOrChildren]);
          }
          return createVNode(type, propsOrChildren);
        } else {
          return createVNode(type, null, propsOrChildren);
        }
      } else {
        if (l > 3) {
          children = Array.prototype.slice.call(arguments, 2);
        } else if (l === 3 && isVNode(children)) {
          children = [children];
        }
        return createVNode(type, propsOrChildren, children);
      }
    } finally {
      setBlockTracking(1);
    }
  }
  const version$1 = "3.5.28";
  /**
  * @vue/runtime-dom v3.5.28
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  let policy = void 0;
  const tt = typeof window !== "undefined" && window.trustedTypes;
  if (tt) {
    try {
      policy = /* @__PURE__ */ tt.createPolicy("vue", {
        createHTML: (val) => val
      });
    } catch (e) {
    }
  }
  const unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
  const svgNS = "http://www.w3.org/2000/svg";
  const mathmlNS = "http://www.w3.org/1998/Math/MathML";
  const doc = typeof document !== "undefined" ? document : null;
  const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
  const nodeOps = {
    insert: (child, parent, anchor) => {
      parent.insertBefore(child, anchor || null);
    },
    remove: (child) => {
      const parent = child.parentNode;
      if (parent) {
        parent.removeChild(child);
      }
    },
    createElement: (tag, namespace, is, props) => {
      const el2 = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
      if (tag === "select" && props && props.multiple != null) {
        el2.setAttribute("multiple", props.multiple);
      }
      return el2;
    },
    createText: (text2) => doc.createTextNode(text2),
    createComment: (text2) => doc.createComment(text2),
    setText: (node, text2) => {
      node.nodeValue = text2;
    },
    setElementText: (el2, text2) => {
      el2.textContent = text2;
    },
    parentNode: (node) => node.parentNode,
    nextSibling: (node) => node.nextSibling,
    querySelector: (selector) => doc.querySelector(selector),
    setScopeId(el2, id) {
      el2.setAttribute(id, "");
    },
    // __UNSAFE__
    // Reason: innerHTML.
    // Static content here can only come from compiled templates.
    // As long as the user only uses trusted templates, this is safe.
    insertStaticContent(content, parent, anchor, namespace, start, end) {
      const before = anchor ? anchor.previousSibling : parent.lastChild;
      if (start && (start === end || start.nextSibling)) {
        while (true) {
          parent.insertBefore(start.cloneNode(true), anchor);
          if (start === end || !(start = start.nextSibling)) break;
        }
      } else {
        templateContainer.innerHTML = unsafeToTrustedHTML(
          namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content
        );
        const template = templateContainer.content;
        if (namespace === "svg" || namespace === "mathml") {
          const wrapper = template.firstChild;
          while (wrapper.firstChild) {
            template.appendChild(wrapper.firstChild);
          }
          template.removeChild(wrapper);
        }
        parent.insertBefore(template, anchor);
      }
      return [
        // first
        before ? before.nextSibling : parent.firstChild,
        // last
        anchor ? anchor.previousSibling : parent.lastChild
      ];
    }
  };
  const TRANSITION = "transition";
  const ANIMATION = "animation";
  const vtcKey = /* @__PURE__ */ Symbol("_vtc");
  const DOMTransitionPropsValidators = {
    name: String,
    type: String,
    css: {
      type: Boolean,
      default: true
    },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
  };
  const TransitionPropsValidators = /* @__PURE__ */ extend(
    {},
    BaseTransitionPropsValidators,
    DOMTransitionPropsValidators
  );
  const decorate$1 = (t2) => {
    t2.displayName = "Transition";
    t2.props = TransitionPropsValidators;
    return t2;
  };
  const Transition = /* @__PURE__ */ decorate$1(
    (props, { slots }) => h(BaseTransition, resolveTransitionProps(props), slots)
  );
  const callHook = (hook, args = []) => {
    if (isArray(hook)) {
      hook.forEach((h2) => h2(...args));
    } else if (hook) {
      hook(...args);
    }
  };
  const hasExplicitCallback = (hook) => {
    return hook ? isArray(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
  };
  function resolveTransitionProps(rawProps) {
    const baseProps = {};
    for (const key in rawProps) {
      if (!(key in DOMTransitionPropsValidators)) {
        baseProps[key] = rawProps[key];
      }
    }
    if (rawProps.css === false) {
      return baseProps;
    }
    const {
      name = "v",
      type,
      duration,
      enterFromClass = `${name}-enter-from`,
      enterActiveClass = `${name}-enter-active`,
      enterToClass = `${name}-enter-to`,
      appearFromClass = enterFromClass,
      appearActiveClass = enterActiveClass,
      appearToClass = enterToClass,
      leaveFromClass = `${name}-leave-from`,
      leaveActiveClass = `${name}-leave-active`,
      leaveToClass = `${name}-leave-to`
    } = rawProps;
    const durations = normalizeDuration(duration);
    const enterDuration = durations && durations[0];
    const leaveDuration = durations && durations[1];
    const {
      onBeforeEnter,
      onEnter,
      onEnterCancelled,
      onLeave,
      onLeaveCancelled,
      onBeforeAppear = onBeforeEnter,
      onAppear = onEnter,
      onAppearCancelled = onEnterCancelled
    } = baseProps;
    const finishEnter = (el2, isAppear, done, isCancelled) => {
      el2._enterCancelled = isCancelled;
      removeTransitionClass(el2, isAppear ? appearToClass : enterToClass);
      removeTransitionClass(el2, isAppear ? appearActiveClass : enterActiveClass);
      done && done();
    };
    const finishLeave = (el2, done) => {
      el2._isLeaving = false;
      removeTransitionClass(el2, leaveFromClass);
      removeTransitionClass(el2, leaveToClass);
      removeTransitionClass(el2, leaveActiveClass);
      done && done();
    };
    const makeEnterHook = (isAppear) => {
      return (el2, done) => {
        const hook = isAppear ? onAppear : onEnter;
        const resolve = () => finishEnter(el2, isAppear, done);
        callHook(hook, [el2, resolve]);
        nextFrame(() => {
          removeTransitionClass(el2, isAppear ? appearFromClass : enterFromClass);
          addTransitionClass(el2, isAppear ? appearToClass : enterToClass);
          if (!hasExplicitCallback(hook)) {
            whenTransitionEnds(el2, type, enterDuration, resolve);
          }
        });
      };
    };
    return extend(baseProps, {
      onBeforeEnter(el2) {
        callHook(onBeforeEnter, [el2]);
        addTransitionClass(el2, enterFromClass);
        addTransitionClass(el2, enterActiveClass);
      },
      onBeforeAppear(el2) {
        callHook(onBeforeAppear, [el2]);
        addTransitionClass(el2, appearFromClass);
        addTransitionClass(el2, appearActiveClass);
      },
      onEnter: makeEnterHook(false),
      onAppear: makeEnterHook(true),
      onLeave(el2, done) {
        el2._isLeaving = true;
        const resolve = () => finishLeave(el2, done);
        addTransitionClass(el2, leaveFromClass);
        if (!el2._enterCancelled) {
          forceReflow(el2);
          addTransitionClass(el2, leaveActiveClass);
        } else {
          addTransitionClass(el2, leaveActiveClass);
          forceReflow(el2);
        }
        nextFrame(() => {
          if (!el2._isLeaving) {
            return;
          }
          removeTransitionClass(el2, leaveFromClass);
          addTransitionClass(el2, leaveToClass);
          if (!hasExplicitCallback(onLeave)) {
            whenTransitionEnds(el2, type, leaveDuration, resolve);
          }
        });
        callHook(onLeave, [el2, resolve]);
      },
      onEnterCancelled(el2) {
        finishEnter(el2, false, void 0, true);
        callHook(onEnterCancelled, [el2]);
      },
      onAppearCancelled(el2) {
        finishEnter(el2, true, void 0, true);
        callHook(onAppearCancelled, [el2]);
      },
      onLeaveCancelled(el2) {
        finishLeave(el2);
        callHook(onLeaveCancelled, [el2]);
      }
    });
  }
  function normalizeDuration(duration) {
    if (duration == null) {
      return null;
    } else if (isObject(duration)) {
      return [NumberOf(duration.enter), NumberOf(duration.leave)];
    } else {
      const n = NumberOf(duration);
      return [n, n];
    }
  }
  function NumberOf(val) {
    const res = toNumber(val);
    return res;
  }
  function addTransitionClass(el2, cls) {
    cls.split(/\s+/).forEach((c) => c && el2.classList.add(c));
    (el2[vtcKey] || (el2[vtcKey] = /* @__PURE__ */ new Set())).add(cls);
  }
  function removeTransitionClass(el2, cls) {
    cls.split(/\s+/).forEach((c) => c && el2.classList.remove(c));
    const _vtc = el2[vtcKey];
    if (_vtc) {
      _vtc.delete(cls);
      if (!_vtc.size) {
        el2[vtcKey] = void 0;
      }
    }
  }
  function nextFrame(cb) {
    requestAnimationFrame(() => {
      requestAnimationFrame(cb);
    });
  }
  let endId = 0;
  function whenTransitionEnds(el2, expectedType, explicitTimeout, resolve) {
    const id = el2._endId = ++endId;
    const resolveIfNotStale = () => {
      if (id === el2._endId) {
        resolve();
      }
    };
    if (explicitTimeout != null) {
      return setTimeout(resolveIfNotStale, explicitTimeout);
    }
    const { type, timeout, propCount } = getTransitionInfo(el2, expectedType);
    if (!type) {
      return resolve();
    }
    const endEvent = type + "end";
    let ended = 0;
    const end = () => {
      el2.removeEventListener(endEvent, onEnd);
      resolveIfNotStale();
    };
    const onEnd = (e) => {
      if (e.target === el2 && ++ended >= propCount) {
        end();
      }
    };
    setTimeout(() => {
      if (ended < propCount) {
        end();
      }
    }, timeout + 1);
    el2.addEventListener(endEvent, onEnd);
  }
  function getTransitionInfo(el2, expectedType) {
    const styles = window.getComputedStyle(el2);
    const getStyleProperties = (key) => (styles[key] || "").split(", ");
    const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
    const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
    const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
    const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
    const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
    const animationTimeout = getTimeout(animationDelays, animationDurations);
    let type = null;
    let timeout = 0;
    let propCount = 0;
    if (expectedType === TRANSITION) {
      if (transitionTimeout > 0) {
        type = TRANSITION;
        timeout = transitionTimeout;
        propCount = transitionDurations.length;
      }
    } else if (expectedType === ANIMATION) {
      if (animationTimeout > 0) {
        type = ANIMATION;
        timeout = animationTimeout;
        propCount = animationDurations.length;
      }
    } else {
      timeout = Math.max(transitionTimeout, animationTimeout);
      type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
      propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
    }
    const hasTransform = type === TRANSITION && /\b(?:transform|all)(?:,|$)/.test(
      getStyleProperties(`${TRANSITION}Property`).toString()
    );
    return {
      type,
      timeout,
      propCount,
      hasTransform
    };
  }
  function getTimeout(delays, durations) {
    while (delays.length < durations.length) {
      delays = delays.concat(delays);
    }
    return Math.max(...durations.map((d, i2) => toMs(d) + toMs(delays[i2])));
  }
  function toMs(s) {
    if (s === "auto") return 0;
    return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
  }
  function forceReflow(el2) {
    const targetDocument = el2 ? el2.ownerDocument : document;
    return targetDocument.body.offsetHeight;
  }
  function patchClass(el2, value, isSVG) {
    const transitionClasses = el2[vtcKey];
    if (transitionClasses) {
      value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
    }
    if (value == null) {
      el2.removeAttribute("class");
    } else if (isSVG) {
      el2.setAttribute("class", value);
    } else {
      el2.className = value;
    }
  }
  const vShowOriginalDisplay = /* @__PURE__ */ Symbol("_vod");
  const vShowHidden = /* @__PURE__ */ Symbol("_vsh");
  const vShow = {
    // used for prop mismatch check during hydration
    name: "show",
    beforeMount(el2, { value }, { transition }) {
      el2[vShowOriginalDisplay] = el2.style.display === "none" ? "" : el2.style.display;
      if (transition && value) {
        transition.beforeEnter(el2);
      } else {
        setDisplay(el2, value);
      }
    },
    mounted(el2, { value }, { transition }) {
      if (transition && value) {
        transition.enter(el2);
      }
    },
    updated(el2, { value, oldValue }, { transition }) {
      if (!value === !oldValue) return;
      if (transition) {
        if (value) {
          transition.beforeEnter(el2);
          setDisplay(el2, true);
          transition.enter(el2);
        } else {
          transition.leave(el2, () => {
            setDisplay(el2, false);
          });
        }
      } else {
        setDisplay(el2, value);
      }
    },
    beforeUnmount(el2, { value }) {
      setDisplay(el2, value);
    }
  };
  function setDisplay(el2, value) {
    el2.style.display = value ? el2[vShowOriginalDisplay] : "none";
    el2[vShowHidden] = !value;
  }
  const CSS_VAR_TEXT = /* @__PURE__ */ Symbol("");
  function useCssVars(getter) {
    const instance2 = getCurrentInstance();
    if (!instance2) {
      return;
    }
    const updateTeleports = instance2.ut = (vars = getter(instance2.proxy)) => {
      Array.from(
        document.querySelectorAll(`[data-v-owner="${instance2.uid}"]`)
      ).forEach((node) => setVarsOnNode(node, vars));
    };
    const setVars = () => {
      const vars = getter(instance2.proxy);
      if (instance2.ce) {
        setVarsOnNode(instance2.ce, vars);
      } else {
        setVarsOnVNode(instance2.subTree, vars);
      }
      updateTeleports(vars);
    };
    onBeforeUpdate(() => {
      queuePostFlushCb(setVars);
    });
    onMounted(() => {
      watch(setVars, NOOP, { flush: "post" });
      const ob = new MutationObserver(setVars);
      ob.observe(instance2.subTree.el.parentNode, { childList: true });
      onUnmounted(() => ob.disconnect());
    });
  }
  function setVarsOnVNode(vnode, vars) {
    if (vnode.shapeFlag & 128) {
      const suspense = vnode.suspense;
      vnode = suspense.activeBranch;
      if (suspense.pendingBranch && !suspense.isHydrating) {
        suspense.effects.push(() => {
          setVarsOnVNode(suspense.activeBranch, vars);
        });
      }
    }
    while (vnode.component) {
      vnode = vnode.component.subTree;
    }
    if (vnode.shapeFlag & 1 && vnode.el) {
      setVarsOnNode(vnode.el, vars);
    } else if (vnode.type === Fragment) {
      vnode.children.forEach((c) => setVarsOnVNode(c, vars));
    } else if (vnode.type === Static) {
      let { el: el2, anchor } = vnode;
      while (el2) {
        setVarsOnNode(el2, vars);
        if (el2 === anchor) break;
        el2 = el2.nextSibling;
      }
    }
  }
  function setVarsOnNode(el2, vars) {
    if (el2.nodeType === 1) {
      const style = el2.style;
      let cssText = "";
      for (const key in vars) {
        const value = normalizeCssVarValue(vars[key]);
        style.setProperty(`--${key}`, value);
        cssText += `--${key}: ${value};`;
      }
      style[CSS_VAR_TEXT] = cssText;
    }
  }
  const displayRE = /(?:^|;)\s*display\s*:/;
  function patchStyle(el2, prev, next) {
    const style = el2.style;
    const isCssString = isString(next);
    let hasControlledDisplay = false;
    if (next && !isCssString) {
      if (prev) {
        if (!isString(prev)) {
          for (const key in prev) {
            if (next[key] == null) {
              setStyle(style, key, "");
            }
          }
        } else {
          for (const prevStyle of prev.split(";")) {
            const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
            if (next[key] == null) {
              setStyle(style, key, "");
            }
          }
        }
      }
      for (const key in next) {
        if (key === "display") {
          hasControlledDisplay = true;
        }
        setStyle(style, key, next[key]);
      }
    } else {
      if (isCssString) {
        if (prev !== next) {
          const cssVarText = style[CSS_VAR_TEXT];
          if (cssVarText) {
            next += ";" + cssVarText;
          }
          style.cssText = next;
          hasControlledDisplay = displayRE.test(next);
        }
      } else if (prev) {
        el2.removeAttribute("style");
      }
    }
    if (vShowOriginalDisplay in el2) {
      el2[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
      if (el2[vShowHidden]) {
        style.display = "none";
      }
    }
  }
  const importantRE = /\s*!important$/;
  function setStyle(style, name, val) {
    if (isArray(val)) {
      val.forEach((v) => setStyle(style, name, v));
    } else {
      if (val == null) val = "";
      if (name.startsWith("--")) {
        style.setProperty(name, val);
      } else {
        const prefixed = autoPrefix(style, name);
        if (importantRE.test(val)) {
          style.setProperty(
            hyphenate(prefixed),
            val.replace(importantRE, ""),
            "important"
          );
        } else {
          style[prefixed] = val;
        }
      }
    }
  }
  const prefixes = ["Webkit", "Moz", "ms"];
  const prefixCache = {};
  function autoPrefix(style, rawName) {
    const cached = prefixCache[rawName];
    if (cached) {
      return cached;
    }
    let name = camelize(rawName);
    if (name !== "filter" && name in style) {
      return prefixCache[rawName] = name;
    }
    name = capitalize(name);
    for (let i2 = 0; i2 < prefixes.length; i2++) {
      const prefixed = prefixes[i2] + name;
      if (prefixed in style) {
        return prefixCache[rawName] = prefixed;
      }
    }
    return rawName;
  }
  const xlinkNS = "http://www.w3.org/1999/xlink";
  function patchAttr(el2, key, value, isSVG, instance2, isBoolean = isSpecialBooleanAttr(key)) {
    if (isSVG && key.startsWith("xlink:")) {
      if (value == null) {
        el2.removeAttributeNS(xlinkNS, key.slice(6, key.length));
      } else {
        el2.setAttributeNS(xlinkNS, key, value);
      }
    } else {
      if (value == null || isBoolean && !includeBooleanAttr(value)) {
        el2.removeAttribute(key);
      } else {
        el2.setAttribute(
          key,
          isBoolean ? "" : isSymbol(value) ? String(value) : value
        );
      }
    }
  }
  function patchDOMProp(el2, key, value, parentComponent, attrName) {
    if (key === "innerHTML" || key === "textContent") {
      if (value != null) {
        el2[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
      }
      return;
    }
    const tag = el2.tagName;
    if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
    !tag.includes("-")) {
      const oldValue = tag === "OPTION" ? el2.getAttribute("value") || "" : el2.value;
      const newValue = value == null ? (
        // #11647: value should be set as empty string for null and undefined,
        // but <input type="checkbox"> should be set as 'on'.
        el2.type === "checkbox" ? "on" : ""
      ) : String(value);
      if (oldValue !== newValue || !("_value" in el2)) {
        el2.value = newValue;
      }
      if (value == null) {
        el2.removeAttribute(key);
      }
      el2._value = value;
      return;
    }
    let needRemove = false;
    if (value === "" || value == null) {
      const type = typeof el2[key];
      if (type === "boolean") {
        value = includeBooleanAttr(value);
      } else if (value == null && type === "string") {
        value = "";
        needRemove = true;
      } else if (type === "number") {
        value = 0;
        needRemove = true;
      }
    }
    try {
      el2[key] = value;
    } catch (e) {
    }
    needRemove && el2.removeAttribute(attrName || key);
  }
  function addEventListener(el2, event, handler, options) {
    el2.addEventListener(event, handler, options);
  }
  function removeEventListener(el2, event, handler, options) {
    el2.removeEventListener(event, handler, options);
  }
  const veiKey = /* @__PURE__ */ Symbol("_vei");
  function patchEvent(el2, rawName, prevValue, nextValue, instance2 = null) {
    const invokers = el2[veiKey] || (el2[veiKey] = {});
    const existingInvoker = invokers[rawName];
    if (nextValue && existingInvoker) {
      existingInvoker.value = nextValue;
    } else {
      const [name, options] = parseName(rawName);
      if (nextValue) {
        const invoker = invokers[rawName] = createInvoker(
          nextValue,
          instance2
        );
        addEventListener(el2, name, invoker, options);
      } else if (existingInvoker) {
        removeEventListener(el2, name, existingInvoker, options);
        invokers[rawName] = void 0;
      }
    }
  }
  const optionsModifierRE = /(?:Once|Passive|Capture)$/;
  function parseName(name) {
    let options;
    if (optionsModifierRE.test(name)) {
      options = {};
      let m;
      while (m = name.match(optionsModifierRE)) {
        name = name.slice(0, name.length - m[0].length);
        options[m[0].toLowerCase()] = true;
      }
    }
    const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
    return [event, options];
  }
  let cachedNow = 0;
  const p = /* @__PURE__ */ Promise.resolve();
  const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
  function createInvoker(initialValue, instance2) {
    const invoker = (e) => {
      if (!e._vts) {
        e._vts = Date.now();
      } else if (e._vts <= invoker.attached) {
        return;
      }
      callWithAsyncErrorHandling(
        patchStopImmediatePropagation(e, invoker.value),
        instance2,
        5,
        [e]
      );
    };
    invoker.value = initialValue;
    invoker.attached = getNow();
    return invoker;
  }
  function patchStopImmediatePropagation(e, value) {
    if (isArray(value)) {
      const originalStop = e.stopImmediatePropagation;
      e.stopImmediatePropagation = () => {
        originalStop.call(e);
        e._stopped = true;
      };
      return value.map(
        (fn) => (e2) => !e2._stopped && fn && fn(e2)
      );
    } else {
      return value;
    }
  }
  const isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // lowercase letter
  key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
  const patchProp = (el2, key, prevValue, nextValue, namespace, parentComponent) => {
    const isSVG = namespace === "svg";
    if (key === "class") {
      patchClass(el2, nextValue, isSVG);
    } else if (key === "style") {
      patchStyle(el2, prevValue, nextValue);
    } else if (isOn(key)) {
      if (!isModelListener(key)) {
        patchEvent(el2, key, prevValue, nextValue, parentComponent);
      }
    } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el2, key, nextValue, isSVG)) {
      patchDOMProp(el2, key, nextValue);
      if (!el2.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) {
        patchAttr(el2, key, nextValue, isSVG, parentComponent, key !== "value");
      }
    } else if (
      // #11081 force set props for possible async custom element
      el2._isVueCE && (/[A-Z]/.test(key) || !isString(nextValue))
    ) {
      patchDOMProp(el2, camelize(key), nextValue, parentComponent, key);
    } else {
      if (key === "true-value") {
        el2._trueValue = nextValue;
      } else if (key === "false-value") {
        el2._falseValue = nextValue;
      }
      patchAttr(el2, key, nextValue, isSVG);
    }
  };
  function shouldSetAsProp(el2, key, value, isSVG) {
    if (isSVG) {
      if (key === "innerHTML" || key === "textContent") {
        return true;
      }
      if (key in el2 && isNativeOn(key) && isFunction(value)) {
        return true;
      }
      return false;
    }
    if (key === "spellcheck" || key === "draggable" || key === "translate" || key === "autocorrect") {
      return false;
    }
    if (key === "sandbox" && el2.tagName === "IFRAME") {
      return false;
    }
    if (key === "form") {
      return false;
    }
    if (key === "list" && el2.tagName === "INPUT") {
      return false;
    }
    if (key === "type" && el2.tagName === "TEXTAREA") {
      return false;
    }
    if (key === "width" || key === "height") {
      const tag = el2.tagName;
      if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
        return false;
      }
    }
    if (isNativeOn(key) && isString(value)) {
      return false;
    }
    return key in el2;
  }
  const positionMap = /* @__PURE__ */ new WeakMap();
  const newPositionMap = /* @__PURE__ */ new WeakMap();
  const moveCbKey = /* @__PURE__ */ Symbol("_moveCb");
  const enterCbKey = /* @__PURE__ */ Symbol("_enterCb");
  const decorate = (t2) => {
    delete t2.props.mode;
    return t2;
  };
  const TransitionGroupImpl = /* @__PURE__ */ decorate({
    name: "TransitionGroup",
    props: /* @__PURE__ */ extend({}, TransitionPropsValidators, {
      tag: String,
      moveClass: String
    }),
    setup(props, { slots }) {
      const instance2 = getCurrentInstance();
      const state = useTransitionState();
      let prevChildren;
      let children;
      onUpdated(() => {
        if (!prevChildren.length) {
          return;
        }
        const moveClass = props.moveClass || `${props.name || "v"}-move`;
        if (!hasCSSTransform(
          prevChildren[0].el,
          instance2.vnode.el,
          moveClass
        )) {
          prevChildren = [];
          return;
        }
        prevChildren.forEach(callPendingCbs);
        prevChildren.forEach(recordPosition);
        const movedChildren = prevChildren.filter(applyTranslation);
        forceReflow(instance2.vnode.el);
        movedChildren.forEach((c) => {
          const el2 = c.el;
          const style = el2.style;
          addTransitionClass(el2, moveClass);
          style.transform = style.webkitTransform = style.transitionDuration = "";
          const cb = el2[moveCbKey] = (e) => {
            if (e && e.target !== el2) {
              return;
            }
            if (!e || e.propertyName.endsWith("transform")) {
              el2.removeEventListener("transitionend", cb);
              el2[moveCbKey] = null;
              removeTransitionClass(el2, moveClass);
            }
          };
          el2.addEventListener("transitionend", cb);
        });
        prevChildren = [];
      });
      return () => {
        const rawProps = /* @__PURE__ */ toRaw(props);
        const cssTransitionProps = resolveTransitionProps(rawProps);
        let tag = rawProps.tag || Fragment;
        prevChildren = [];
        if (children) {
          for (let i2 = 0; i2 < children.length; i2++) {
            const child = children[i2];
            if (child.el && child.el instanceof Element) {
              prevChildren.push(child);
              setTransitionHooks(
                child,
                resolveTransitionHooks(
                  child,
                  cssTransitionProps,
                  state,
                  instance2
                )
              );
              positionMap.set(child, getPosition(child.el));
            }
          }
        }
        children = slots.default ? getTransitionRawChildren(slots.default()) : [];
        for (let i2 = 0; i2 < children.length; i2++) {
          const child = children[i2];
          if (child.key != null) {
            setTransitionHooks(
              child,
              resolveTransitionHooks(child, cssTransitionProps, state, instance2)
            );
          }
        }
        return createVNode(tag, null, children);
      };
    }
  });
  const TransitionGroup = TransitionGroupImpl;
  function callPendingCbs(c) {
    const el2 = c.el;
    if (el2[moveCbKey]) {
      el2[moveCbKey]();
    }
    if (el2[enterCbKey]) {
      el2[enterCbKey]();
    }
  }
  function recordPosition(c) {
    newPositionMap.set(c, getPosition(c.el));
  }
  function applyTranslation(c) {
    const oldPos = positionMap.get(c);
    const newPos = newPositionMap.get(c);
    const dx = oldPos.left - newPos.left;
    const dy = oldPos.top - newPos.top;
    if (dx || dy) {
      const el2 = c.el;
      const s = el2.style;
      const rect2 = el2.getBoundingClientRect();
      let scaleX = 1;
      let scaleY = 1;
      if (el2.offsetWidth) scaleX = rect2.width / el2.offsetWidth;
      if (el2.offsetHeight) scaleY = rect2.height / el2.offsetHeight;
      if (!Number.isFinite(scaleX) || scaleX === 0) scaleX = 1;
      if (!Number.isFinite(scaleY) || scaleY === 0) scaleY = 1;
      if (Math.abs(scaleX - 1) < 0.01) scaleX = 1;
      if (Math.abs(scaleY - 1) < 0.01) scaleY = 1;
      s.transform = s.webkitTransform = `translate(${dx / scaleX}px,${dy / scaleY}px)`;
      s.transitionDuration = "0s";
      return c;
    }
  }
  function getPosition(el2) {
    const rect2 = el2.getBoundingClientRect();
    return {
      left: rect2.left,
      top: rect2.top
    };
  }
  function hasCSSTransform(el2, root, moveClass) {
    const clone = el2.cloneNode();
    const _vtc = el2[vtcKey];
    if (_vtc) {
      _vtc.forEach((cls) => {
        cls.split(/\s+/).forEach((c) => c && clone.classList.remove(c));
      });
    }
    moveClass.split(/\s+/).forEach((c) => c && clone.classList.add(c));
    clone.style.display = "none";
    const container = root.nodeType === 1 ? root : root.parentNode;
    container.appendChild(clone);
    const { hasTransform } = getTransitionInfo(clone);
    container.removeChild(clone);
    return hasTransform;
  }
  const getModelAssigner = (vnode) => {
    const fn = vnode.props["onUpdate:modelValue"] || false;
    return isArray(fn) ? (value) => invokeArrayFns(fn, value) : fn;
  };
  function onCompositionStart(e) {
    e.target.composing = true;
  }
  function onCompositionEnd(e) {
    const target2 = e.target;
    if (target2.composing) {
      target2.composing = false;
      target2.dispatchEvent(new Event("input"));
    }
  }
  const assignKey = /* @__PURE__ */ Symbol("_assign");
  function castValue(value, trim, number) {
    if (trim) value = value.trim();
    if (number) value = looseToNumber(value);
    return value;
  }
  const vModelText = {
    created(el2, { modifiers: { lazy, trim, number } }, vnode) {
      el2[assignKey] = getModelAssigner(vnode);
      const castToNumber = number || vnode.props && vnode.props.type === "number";
      addEventListener(el2, lazy ? "change" : "input", (e) => {
        if (e.target.composing) return;
        el2[assignKey](castValue(el2.value, trim, castToNumber));
      });
      if (trim || castToNumber) {
        addEventListener(el2, "change", () => {
          el2.value = castValue(el2.value, trim, castToNumber);
        });
      }
      if (!lazy) {
        addEventListener(el2, "compositionstart", onCompositionStart);
        addEventListener(el2, "compositionend", onCompositionEnd);
        addEventListener(el2, "change", onCompositionEnd);
      }
    },
    // set value on mounted so it's after min/max for type="range"
    mounted(el2, { value }) {
      el2.value = value == null ? "" : value;
    },
    beforeUpdate(el2, { value, oldValue, modifiers: { lazy, trim, number } }, vnode) {
      el2[assignKey] = getModelAssigner(vnode);
      if (el2.composing) return;
      const elValue = (number || el2.type === "number") && !/^0\d/.test(el2.value) ? looseToNumber(el2.value) : el2.value;
      const newValue = value == null ? "" : value;
      if (elValue === newValue) {
        return;
      }
      if (document.activeElement === el2 && el2.type !== "range") {
        if (lazy && value === oldValue) {
          return;
        }
        if (trim && el2.value.trim() === newValue) {
          return;
        }
      }
      el2.value = newValue;
    }
  };
  const systemModifiers = ["ctrl", "shift", "alt", "meta"];
  const modifierGuards = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => "button" in e && e.button !== 0,
    middle: (e) => "button" in e && e.button !== 1,
    right: (e) => "button" in e && e.button !== 2,
    exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
  };
  const withModifiers = (fn, modifiers) => {
    if (!fn) return fn;
    const cache = fn._withMods || (fn._withMods = {});
    const cacheKey = modifiers.join(".");
    return cache[cacheKey] || (cache[cacheKey] = ((event, ...args) => {
      for (let i2 = 0; i2 < modifiers.length; i2++) {
        const guard = modifierGuards[modifiers[i2]];
        if (guard && guard(event, modifiers)) return;
      }
      return fn(event, ...args);
    }));
  };
  const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
  let renderer$1;
  function ensureRenderer() {
    return renderer$1 || (renderer$1 = createRenderer(rendererOptions));
  }
  const createApp = ((...args) => {
    const app = ensureRenderer().createApp(...args);
    const { mount } = app;
    app.mount = (containerOrSelector) => {
      const container = normalizeContainer(containerOrSelector);
      if (!container) return;
      const component = app._component;
      if (!isFunction(component) && !component.render && !component.template) {
        component.template = container.innerHTML;
      }
      if (container.nodeType === 1) {
        container.textContent = "";
      }
      const proxy = mount(container, false, resolveRootNamespace(container));
      if (container instanceof Element) {
        container.removeAttribute("v-cloak");
        container.setAttribute("data-v-app", "");
      }
      return proxy;
    };
    return app;
  });
  function resolveRootNamespace(container) {
    if (container instanceof SVGElement) {
      return "svg";
    }
    if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
      return "mathml";
    }
  }
  function normalizeContainer(container) {
    if (isString(container)) {
      const res = document.querySelector(container);
      return res;
    }
    return container;
  }
  const i18nText = {
    lang: {
      cn: "CN",
      en: "EN",
      jp: "JP"
    },
    readingMode: {
      cn: "阅读模式",
      en: "Mode",
      jp: "モード"
    },
    readingModeTip: {
      cn: "设置阅读模式",
      en: "Change reading mode",
      jp: "読むモードを変更する"
    },
    scrollMode: {
      cn: "滚动",
      en: "Scroll",
      jp: "スクロール"
    },
    bookMode: {
      cn: "书页",
      en: "Book",
      jp: "ページ"
    },
    widthScale: {
      cn: "页面比例",
      en: "Page scale",
      jp: "ページの割合"
    },
    widthScaleTip: {
      cn: "设置页面比例",
      en: "Change page scale",
      jp: "ページの割合を設定"
    },
    custom: {
      cn: "自定义",
      en: "Custom",
      jp: "カスタム"
    },
    loadNum: {
      cn: "加载页数",
      en: "Loading quantity",
      jp: "積載量"
    },
    loadNumTip: {
      cn: "越大则对网络质量要求越高",
      en: "The greater quantity, the higher requirement of network quality",
      jp: "数字が大きいほど、ネットワーク品質の要件が高くなります"
    },
    volSize: {
      cn: "分卷页数",
      en: "Volume size",
      jp: "ボリュームサイズ"
    },
    volSizeTip: {
      cn: "设置过大会导致卡顿",
      en: "If too big, the page will be laggy",
      jp: "大きすぎると、プログラムは遅くなります"
    },
    thumbView: {
      cn: "缩略图栏",
      en: "Thumbnail",
      jp: "サムネイル"
    },
    thumbViewTip: {
      cn: "开启/关闭缩略图栏",
      en: "Show/hide the column of thumbnail",
      jp: "サムネイルの列を表示または非表示"
    },
    expandThumbs: {
      cn: "展开",
      en: "Expand",
      jp: "展開"
    },
    screenSize: {
      cn: "同屏页数",
      en: "Pages/screen",
      jp: "ページ/画面"
    },
    screenSizeTip: {
      cn: "一个屏幕下的页数",
      en: "The number of pages on the screen",
      jp: "画面上のページ数"
    },
    bookDirection: {
      cn: "阅读方向",
      en: "Direction",
      jp: "読み取り方向"
    },
    bookDirectionTip: {
      cn: "阅读方向",
      en: "Reading direction",
      jp: "読み取り方向"
    },
    rtl: {
      cn: "RTL (从右到左)",
      en: "RTL (Right To Left)",
      jp: "RTL (右から左に)"
    },
    rtlAbbr: {
      cn: "RTL",
      en: "RTL",
      jp: "RTL"
    },
    ltr: {
      cn: "LTR (从左到右)",
      en: "LTR (Left to Right)",
      jp: "LTR (左から右へ)"
    },
    ltrAbbr: {
      cn: "LTR",
      en: "LTR",
      jp: "LTR"
    },
    pagination: {
      cn: "页目录",
      en: "Pagination",
      jp: "ページネーション"
    },
    paginationTip: {
      cn: "显示/隐藏底部悬浮页目录",
      en: "Show/hide the bottom floating pagination",
      jp: "ボトムフローティングページネーションの表示/非表示"
    },
    bookAnimation: {
      cn: "换页动画",
      en: "Sliding animation",
      jp: "アニメーション"
    },
    bookAnimationTip: {
      cn: "开启/关闭换页时的滑动动画(测试中)",
      en: "show/hide the sliding animation when changing location(Beta)",
      jp: "場所を変更するときのスライドアニメーションの表示/非表示(测试中)"
    },
    pageTurnAnimation: {
      cn: "翻页动效",
      en: "Page turn animation",
      jp: "ページめくり効果"
    },
    pageTurnAnimationTip: {
      cn: "设置书页模式翻页动效",
      en: "Set page turn animation for book mode",
      jp: "ページモードのアニメーションを設定"
    },
    pageTurnAnimationPageFlip: {
      cn: "拟真翻书",
      en: "Page flip",
      jp: "ページめくり"
    },
    pageTurnAnimationRotate: {
      cn: "旋转翻页",
      en: "Rotate",
      jp: "回転"
    },
    pageTurnAnimationSlide: {
      cn: "垂直平移",
      en: "Vertical slide",
      jp: "垂直スライド"
    },
    pageTurnAnimationHorizontalSlide: {
      cn: "水平平移",
      en: "Horizontal slide",
      jp: "水平スライド"
    },
    pageTurnAnimationNone: {
      cn: "无动效",
      en: "None",
      jp: "なし"
    },
    animationSpeed: {
      cn: "动画速率",
      en: "Animation speed",
      jp: "アニメーション速度"
    },
    animationSpeedTip: {
      cn: "控制翻页动画的速度",
      en: "Control page turn animation speed",
      jp: "ページめくりアニメーションの速度を制御"
    },
    reverseFlip: {
      cn: "反转翻页",
      en: "Reverse flip",
      jp: "反転フリップ"
    },
    reverseFlipTip: {
      cn: "反转翻页方向",
      en: "Reverse page turning direction",
      jp: "ページめくり方向を逆にする"
    },
    autoFlip: {
      cn: "自动翻页",
      en: "Auto",
      jp: "自動ページめくり"
    },
    autoFlipTip: {
      cn: "自动翻页",
      en: "Automatic page turning",
      jp: "自動ページめくり"
    },
    autoFlipFrequency: {
      cn: "翻页频率",
      en: "Frequency",
      jp: "頻度"
    },
    autoFlipFrequencyTip: {
      cn: "自动翻页的频率",
      en: "Automatic page turning frequency",
      jp: "自動ページめくり頻度"
    },
    refresh: {
      cn: "刷新",
      en: "Refresh",
      jp: "リフレッシュ"
    },
    refreshTip: {
      cn: "再次获取普通图片",
      en: "Refresh to load normal image",
      jp: "リフレッシュ; 通常の画像を読み込みます"
    },
    originImg: {
      cn: "原图",
      en: "Original",
      jp: "元画像"
    },
    originImgTip: {
      cn: "加载原图",
      en: "Load original image",
      jp: "元画像を読み込む"
    },
    refreshByOtherSource: {
      cn: "换源刷新",
      en: "Other source",
      jp: "他のサーバー"
    },
    refreshByOtherSourceTip: {
      cn: "从其他服务器获取普通图片",
      en: "Load normal image from other server",
      jp: "他のサーバーから通常の画像を取得する"
    },
    loadingImg: {
      cn: "加载图片中...",
      en: "Loading image...",
      jp: "画像を読み込む.."
    },
    loadingImgUrl: {
      cn: "加载图片地址中...",
      en: "Loading image url..",
      jp: "画像URLを読み込む.."
    },
    reload: {
      cn: "重载",
      en: "Reload",
      jp: "リロード"
    },
    loadingImgFailed: {
      cn: "加载图片失败, 请刷新",
      en: "Loading failed, please refresh",
      jp: "読み込みに失敗しました。更新してください"
    },
    noOriginalImg: {
      cn: "无原图, 请刷新",
      en: "No original Image, please refresh",
      jp: "オリジナルイメージはありません。リフレッシュしてください"
    },
    loadingFailed: {
      cn: "加载错误",
      en: "Loading failed",
      jp: "読み込み失敗"
    },
    imgLoaded: {
      cn: "图片加载完成",
      en: "Image loaded",
      jp: "画像が読み込まれた"
    },
    waiting: {
      cn: "等待中..",
      en: "Waiting..",
      jp: "待っている.."
    },
    fullScreen: {
      cn: "全屏",
      en: "Full screen",
      jp: "全画面表示"
    },
    dockLeft: {
      cn: "停靠左侧",
      en: "Dock left",
      jp: "左にドック"
    },
    dockRight: {
      cn: "停靠右侧",
      en: "Dock right",
      jp: "右にドック"
    },
    dockBottom: {
      cn: "停靠底部",
      en: "Dock bottom",
      jp: "下にドック"
    },
    resizePanel: {
      cn: "调整面板尺寸",
      en: "Resize panel",
      jp: "パネルサイズ調整"
    },
    closeJMEHunter: {
      cn: "关闭JM-EHunter",
      en: "Close JM-EHunter",
      jp: "JM-EHunter閉じる"
    },
    toggleTopBar: {
      cn: "显示/隐藏顶栏",
      en: "Show/hide top bar",
      jp: "トップバーの表示/非表示"
    },
    toggleMoreSettings: {
      cn: "显示/隐藏更多设置 [Shift]",
      en: "Show/hide more settings [Shift]",
      jp: "他の設定を表示/隠す [Shift]"
    },
    openMoreSettingsModal: {
      cn: "更多设置",
      en: "More settings",
      jp: "詳細設定"
    },
    more: {
      cn: "更多",
      en: "More",
      jp: "もっと"
    },
    moreSettings: {
      cn: "更多设置",
      en: "More settings",
      jp: "詳細設定"
    },
    quickPreview: {
      cn: "快速预览",
      en: "Quick preview",
      jp: "クイックプレビュー"
    },
    download: {
      cn: "下载",
      en: "Download",
      jp: "ダウンロード"
    },
    downloadConfirmTitle: {
      cn: "下载确认",
      en: "Download confirmation",
      jp: "ダウンロード確認"
    },
    downloadConfirmMessage: {
      cn: "是否下载该画廊的所有图片？",
      en: "Download all images from this gallery?",
      jp: "このギャラリーのすべての画像をダウンロードしますか？"
    },
    downloadAuthorizeTip: {
      cn: "**提示：** 下载时可能会弹出授权提示，仅用于获取图片并打包下载，请放心授权。",
      en: "**Tip:** You may see an authorization prompt during download. It is only used to fetch images and create the zip package.",
      jp: "**ヒント：** ダウンロード中に権限確認が表示される場合があります。画像取得とzip作成のためのみ使用されます。"
    },
    settingsGeneral: {
      cn: "通用",
      en: "General",
      jp: "一般"
    },
    settingsScrollMode: {
      cn: "滚动模式",
      en: "Scroll mode",
      jp: "スクロールモード"
    },
    settingsBookMode: {
      cn: "书页模式",
      en: "Book mode",
      jp: "ページモード"
    },
    settingsQuick: {
      cn: "快捷设置",
      en: "Quick settings",
      jp: "クイック設定"
    },
    settingsShortcuts: {
      cn: "快捷键",
      en: "Shortcuts",
      jp: "ショートカット"
    },
    shortcutEditHint: {
      cn: "点击 + 从固定列表新增快捷键，点击快捷键上的 × 可删除。",
      en: "Click + to add from fixed options, click × on a shortcut to remove it.",
      jp: "＋で固定リストから追加し、ショートカットの×で削除します。"
    },
    shortcutAddPlaceholder: {
      cn: "选择快捷键",
      en: "Select key",
      jp: "キーを選択"
    },
    currentShortcut: {
      cn: "当前",
      en: "Current",
      jp: "現在"
    },
    shortcutResetLabel: {
      cn: "恢复默认快捷键",
      en: "Restore default shortcuts",
      jp: "デフォルトのショートカットを復元"
    },
    shortcutResetAction: {
      cn: "恢复默认",
      en: "Reset",
      jp: "リセット"
    },
    shortcutGoPrev: {
      cn: "上一页",
      en: "Previous page",
      jp: "前のページ"
    },
    shortcutGoPrevTip: {
      cn: "滚动模式前进/后退中的后退动作",
      en: "Move to previous page/segment",
      jp: "前のページ/セグメントへ移動"
    },
    shortcutGoNext: {
      cn: "下一页",
      en: "Next page",
      jp: "次のページ"
    },
    shortcutGoNextTip: {
      cn: "滚动模式前进/后退中的前进动作",
      en: "Move to next page/segment",
      jp: "次のページ/セグメントへ移動"
    },
    shortcutToggleMoreSettings: {
      cn: "更多设置开关",
      en: "Toggle more settings",
      jp: "詳細設定の表示切替"
    },
    shortcutToggleMoreSettingsTip: {
      cn: "显示或关闭更多设置弹窗",
      en: "Open/close more settings modal",
      jp: "詳細設定モーダルを開閉"
    },
    shortcutToggleTopBar: {
      cn: "顶栏开关",
      en: "Toggle top bar",
      jp: "トップバー表示切替"
    },
    shortcutToggleTopBarTip: {
      cn: "显示或隐藏顶部工具栏",
      en: "Show/hide top toolbar",
      jp: "上部ツールバーを表示/非表示"
    },
    shortcutToggleThumbView: {
      cn: "缩略图栏开关",
      en: "Toggle thumbnails",
      jp: "サムネイル表示切替"
    },
    shortcutToggleThumbViewTip: {
      cn: "滚动/书页模式下切换缩略图栏显示",
      en: "Show/hide thumbnail panel in current mode",
      jp: "現在モードのサムネイルパネル表示切替"
    },
    shortcutToggleQuickPreview: {
      cn: "快速预览开关",
      en: "Toggle quick preview",
      jp: "クイックプレビュー切替"
    },
    shortcutToggleQuickPreviewTip: {
      cn: "打开/关闭快速预览",
      en: "Open/close quick preview",
      jp: "クイックプレビューを開閉"
    },
    shortcutIncreaseWidthScale: {
      cn: "调大页面比例",
      en: "Increase page scale",
      jp: "ページ倍率を上げる"
    },
    shortcutIncreaseWidthScaleTip: {
      cn: "每次增加 5%",
      en: "Increase scale by 5%",
      jp: "倍率を5%増加"
    },
    shortcutDecreaseWidthScale: {
      cn: "调小页面比例",
      en: "Decrease page scale",
      jp: "ページ倍率を下げる"
    },
    shortcutDecreaseWidthScaleTip: {
      cn: "每次减少 5%",
      en: "Decrease scale by 5%",
      jp: "倍率を5%減少"
    },
    shortcutTogglePagination: {
      cn: "页目录开关",
      en: "Toggle pagination",
      jp: "ページネーション切替"
    },
    shortcutTogglePaginationTip: {
      cn: "书页模式下显示/隐藏页目录（默认未绑定）",
      en: "Show/hide pagination in book mode (unbound by default)",
      jp: "見開きモードでページネーションを表示/非表示（初期値未割当）"
    },
    shortcutToggleAutoFlip: {
      cn: "自动翻页开关",
      en: "Toggle auto flip",
      jp: "自動ページめくり切替"
    },
    shortcutToggleAutoFlipTip: {
      cn: "书页模式下开关自动翻页（默认未绑定）",
      en: "Toggle auto flip in book mode (unbound by default)",
      jp: "ページモードの自動めくり切替（初期未設定）"
    },
    shortcutToggleOddEven: {
      cn: "奇偶切换开关",
      en: "Toggle odd/even",
      jp: "奇偶切替"
    },
    shortcutToggleOddEvenTip: {
      cn: "书页模式下切换奇偶页拼接（默认未绑定）",
      en: "Toggle odd/even stitching in book mode (unbound by default)",
      jp: "ページモードの奇偶ページ結合切替（初期未設定）"
    },
    languageSetting: {
      cn: "语言",
      en: "Language",
      jp: "言語"
    },
    languageSettingTip: {
      cn: "语言/Language/言語",
      en: "语言/Language/言語",
      jp: "语言/Language/言語"
    },
    settingsOther: {
      cn: "其他",
      en: "Other",
      jp: "その他"
    },
    autoSourceRetry: {
      cn: "自动换源重试",
      en: "Auto source retry",
      jp: "自動ソース再試行"
    },
    autoSourceRetryTip: {
      cn: "加载失败时自动尝试换源",
      en: "Automatically retry with another source when loading fails",
      jp: "読み込み失敗時に別ソースで自動再試行"
    },
    downloadChunkSize: {
      cn: "下载分片大小",
      en: "Download chunk size",
      jp: "ダウンロード分割サイズ"
    },
    downloadChunkSizeTip: {
      cn: "单个压缩包最多包含的图片页数，异常值会回退到200",
      en: "Max images per zip; invalid values fallback to 200",
      jp: "1つのzipに含める最大画像数。無効値は200に戻す"
    },
    downloadQueued: {
      cn: "下载任务已开始",
      en: "Download queued",
      jp: "ダウンロード開始"
    },
    downloadNoPages: {
      cn: "无可下载页面",
      en: "No pages to download",
      jp: "ダウンロード対象ページなし"
    },
    downloadFetching: {
      cn: "正在处理第{{current}}/{{total}}张图片",
      en: "Processing image {{current}} / {{total}}",
      jp: "{{current}} / {{total}} 枚目を処理中"
    },
    downloadCompressing: {
      cn: "正在压缩第{{chunk}}/{{totalChunks}}个分片",
      en: "Compressing chunk {{chunk}} / {{totalChunks}}",
      jp: "{{chunk}} / {{totalChunks}} 分割を圧縮中"
    },
    downloadCompleted: {
      cn: "下载完成",
      en: "Download completed",
      jp: "ダウンロード完了"
    },
    downloadPartial: {
      cn: "下载完成，失败{{failed}}张",
      en: "Completed with {{failed}} failures",
      jp: "完了（失敗 {{failed}} 枚）"
    },
    downloadFailed: {
      cn: "下载失败",
      en: "Download failed",
      jp: "ダウンロード失敗"
    },
    downloadChunkFailed: {
      cn: "分片{{chunk}}压缩失败：{{reason}}",
      en: "Chunk {{chunk}} failed: {{reason}}",
      jp: "分割{{chunk}}失敗: {{reason}}"
    },
    downloadAborted: {
      cn: "下载已终止",
      en: "Download aborted",
      jp: "ダウンロードを停止しました"
    },
    terminate: {
      cn: "终止",
      en: "Terminate",
      jp: "停止"
    },
    resetAllConfirmTitle: {
      cn: "确认清空缓存并重置设置",
      en: "Confirm cache clear and reset",
      jp: "キャッシュ削除と設定リセットを確認"
    },
    resetAllConfirmDesc: {
      cn: "该操作会清空缓存并恢复所有设置为默认值，且不可撤销。",
      en: "This clears cache and restores all settings to default, and cannot be undone.",
      jp: "この操作はキャッシュを削除し、すべての設定を初期値に戻します。取り消しできません。"
    },
    versionLabel: {
      cn: "版本号",
      en: "Version",
      jp: "バージョン"
    },
    enabled: {
      cn: "已启用",
      en: "Enabled",
      jp: "有効"
    },
    hidden: {
      cn: "已隐藏",
      en: "Hidden",
      jp: "非表示"
    },
    quickDragHint: {
      cn: "拖拽设置项可调整顺序，并可在上下区域间移动来控制显示。",
      en: "Drag items to reorder, and move between sections to show or hide.",
      jp: "ドラッグで並び替え、上下の領域間移動で表示/非表示を切り替えます。"
    },
    quickEnabledHint: {
      cn: "这些会显示在顶部快捷栏",
      en: "Shown in top quick bar",
      jp: "上部クイックバーに表示"
    },
    quickHiddenHint: {
      cn: "这些不会显示在顶部快捷栏",
      en: "Hidden from top quick bar",
      jp: "上部クイックバーに非表示"
    },
    disabled: {
      cn: "已禁用",
      en: "Disabled",
      jp: "無効"
    },
    confirm: {
      cn: "确定",
      en: "CONFIRM",
      jp: "確認"
    },
    cancel: {
      cn: "取消",
      en: "CANCEL",
      jp: "取り消し"
    },
    infoTip: {
      cn: "查看说明和关于",
      en: "Look the Instructions and About",
      jp: "指示と情報を見てください"
    },
    resetTip: {
      cn: "重置缓存和数据",
      en: "Reset cache and data",
      jp: "Reset cache and data"
    },
    githubTip: {
      cn: "前往项目主页(Github)",
      en: "Go to the project home page(Github)",
      jp: "プロジェクトのホームページに行く(Github)"
    },
    instructionsAndAbouts: {
      cn: "说明和关于",
      en: "Instructions & About",
      jp: "説明と概要"
    },
    instructions: {
      cn: "说明",
      en: "Instructions",
      jp: "説明"
    },
    later: {
      cn: "以后再说",
      en: "LATER",
      jp: "後で"
    },
    changingToSmallFailed: {
      cn: '无缝切换至`"Normal"`模式失败，可能是网络错误，可刷新重试或者返回前一页将预览图的大小模式切换为`"Normal"`。',
      en: 'Changing to `"Normal"` mode failed, because of poor network. You can reload this page or go back to previous page and change the mode of thumbnails to `"Normal"`',
      jp: "ネットワークが不十分であるため、`「Normal」`モードに変更できませんでした。 このページをリロードするか、前のページに戻ってサムネイルのモードを`「Normal」`に変更することができます"
    },
    loadingTip: {
      cn: "在前页采用Normal模式查看缩略图可加速加载",
      en: 'You can use "Normal" mode of thumbnail in previous page to accelerate the load.',
      jp: "前のページでサムネイルの「Normal」モードを使用して、読み込みを高速化できます。"
    },
    versionUpdate: {
      cn: "版本更新说明",
      en: "The update of this version",
      jp: "このバージョンの更新"
    },
    loadingFailedAndRefresh: {
      cn: "加载错误, 刷新重试",
      en: "Loading failed, please refresh to retry",
      jp: "読み込みに失敗しました。もう一度試してください"
    },
    failedMsg: {
      cn: "错误信息",
      en: "Error message",
      jp: "エラーメッセージ"
    },
    version: {
      cn: "版本",
      en: "Version",
      jp: "Version"
    },
    ContractAuthor: {
      cn: "联系作者",
      en: "Contact author",
      jp: "作者に連絡する"
    },
    wheelSensitivity: {
      cn: "滚轮翻页",
      en: "Wheel flip",
      jp: "ホイール"
    },
    wheelSensitivityTip: {
      cn: "鼠标滚轮翻页灵敏度",
      en: "Wheel sensitivity",
      jp: "ホイール感度"
    },
    wheelDirection: {
      cn: "动画反向",
      en: "Reverse Animation",
      jp: "アニメーション反転"
    },
    wheelDirectionTip: {
      cn: "反转翻页动画方向（同时作用于滚轮和键盘）",
      en: "Reverse page turn animation direction (affects both wheel and keyboard)",
      jp: "ページめくりアニメーションの方向を反転（ホイールとキーボード両方に適用）"
    },
    tips: {
      cn: "提示",
      en: "TIPS",
      jp: "ヒント"
    },
    numberInputTip: {
      cn: "最小值为`{{min}}`, 最大值为`{{max}}`",
      en: "The minimum is `{{min}}` and the maximum is `{{max}}`",
      jp: "最小は`{{min}}`, 最大は`{{max}}`です"
    },
    pageMargin: {
      cn: "页间隔",
      en: "Page spacing",
      jp: "ページ間隔"
    },
    pageMarginTip: {
      cn: "页间隔",
      en: "Page spacing",
      jp: "ページ間隔"
    },
    oddEven: {
      cn: "奇偶切换",
      en: "Odd/Even",
      jp: "奇/偶"
    },
    oddEvenTip: {
      cn: "切换奇偶页拼接",
      en: "Switching odd or even page stitching",
      jp: "奇数または偶数ページステッチの切り替え"
    },
    openMagnifier: {
      cn: "打开放大镜",
      en: "Open magnifier",
      jp: "拡大鏡を開く"
    },
    closeMagnifier: {
      cn: "关闭放大镜",
      en: "Close magnifier",
      jp: "拡大鏡を閉じる"
    },
    zoomInMagnifier: {
      cn: "增大放大镜倍率",
      en: "Increase magnifier zoom",
      jp: "拡大率を上げる"
    },
    zoomOutMagnifier: {
      cn: "缩小放大镜倍率",
      en: "Decrease magnifier zoom",
      jp: "拡大率を下げる"
    },
    notSupportedInCurrentPlatform: {
      cn: "当前平台不支持",
      en: "Not supported on this platform",
      jp: "このプラットフォームでは非対応"
    },
    increaseMagnifierArea: {
      cn: "增大放大镜区域",
      en: "Increase magnifier area",
      jp: "拡大エリアを拡大"
    },
    decreaseMagnifierArea: {
      cn: "缩小放大镜区域",
      en: "Decrease magnifier area",
      jp: "拡大エリアを縮小"
    },
    magnifierZoom: {
      cn: "放大镜倍率",
      en: "Magnifier zoom",
      jp: "拡大倍率"
    },
    magnifierZoomTip: {
      cn: "设置放大镜倍率（2x-5x）",
      en: "Set magnifier zoom (2x-5x)",
      jp: "拡大倍率を設定 (2x-5x)"
    },
    magnifierAreaSize: {
      cn: "放大镜区域",
      en: "Magnifier area size",
      jp: "拡大エリアサイズ"
    },
    magnifierAreaSizeTip: {
      cn: "设置放大区域尺寸（20px-300px）",
      en: "Set focus area size (20px-300px)",
      jp: "フォーカス領域サイズを設定 (20px-300px)"
    }
  };
  const langMap = { cn: {}, en: {}, jp: {} };
  for (let key in i18nText) {
    for (let langKey in i18nText[key]) {
      langMap[langKey][key] = i18nText[key][langKey];
    }
  }
  const lang$1 = /* @__PURE__ */ ref("");
  let uaLang = navigator.language.toLowerCase();
  switch (true) {
    case uaLang.startsWith("en"):
      lang$1.value = "en";
      break;
    case uaLang.startsWith("zh"):
      lang$1.value = "cn";
      break;
    case (uaLang.endsWith("jp") || uaLang.startsWith("ja")):
      lang$1.value = "jp";
      break;
  }
  const i18n = computed(() => {
    return langMap[lang$1.value];
  });
  const NameAlbumService = "album_service";
  const config = {
    homePage: "https://github.com/hanFengSan/JM-EHunter",
    updateServer1: "https://jp.animesales.xyz/ehunter/update.json",
    updateServer2: "https://jp.animesales.xyz/ehunter/update.json"
  };
  const version = "2.0.0";
  const pkgJson = {
    version
  };
  const welcomeInstructionTemplate = {
    cn: `
1.Change language/切换语言/言語を変更
![image-language](https://raw.githubusercontent.com/hanFengSan/JM-EHunter/master/github_image/language.jpg)

1.显示/隐藏顶栏和关闭JM-EHunter
![image-topbar_close](https://raw.githubusercontent.com/hanFengSan/JM-EHunter/master/github_image/topbar_close.jpg)

2.在页面右上角点击打开JM-EHunter
![image-open_ehunter](https://raw.githubusercontent.com/hanFengSan/JM-EHunter/master/github_image/open_ehunter.jpg)

3.\`滚动\`模式下, 支持\`A\`. \`D\`, \`Left(左)\`和\`Right(右)\`键翻页.

4.\`书页\`模式下, 点击屏幕下方翻下一页，点击屏幕上方翻到上一页。支持\`A\`. \`D\`, \`Left(左)\`, \`Right(右)\`键翻页. 你也可以用鼠标滚轮翻页.

5.\`分卷页数\`对性能要求较高,请不要设置过高,可能会导致卡顿.

6.有更多想要的功能, 可以反馈给我, 如果该功能可以有的话, 我有空的时候会支持的.

### iPhone和iPad使用指引
说明链接：[链接](https://github.com/FPV-G/JM-EHunter/blob/master/misc/iphone_ipad_cn.md)

### JM-EHunter-local
JM-EHunter-local是JM-EHunter的本地版本, 支持Windows和MacOS. [项目主页](https://github.com/FPV-G/JM-EHunter_local)

[Github下载](https://github.com/FPV-G/JM-EHunter_local/releases)

### 反馈和建议
* 可在[Github]({{HOME_PAGE}})上开issue给我.
* 可发邮件到我邮箱: c360785655@gmail.com

### 关于
* 版本: {{VERSION}}
* 作者: Alex Chen (hanFeng)
* 项目开源地址: [Github]({{HOME_PAGE}})

如果你喜欢此插件的话,希望能在应用商店上给个好评 8-)
`,
    en: `
1.Change language/切换语言/言語を変更
![image-language](https://raw.githubusercontent.com/hanFengSan/JM-EHunter/master/github_image/language.jpg)

1.Show/hide top bar and close the JM-EHunter
![image-topbar_close](https://raw.githubusercontent.com/hanFengSan/JM-EHunter/master/github_image/topbar_close.jpg)

2.Click the button at the upper right corner of this page to open the JM-EHunter
![image-open_ehunter](https://raw.githubusercontent.com/hanFengSan/JM-EHunter/master/github_image/open_ehunter.jpg)

3.In \`Scroll\` mode, you can turn pages with \`A\`, \`D\`, \`Left\`, and \`Right\`.

4.In \`Book\` mode, click the lower part of the screen to go to the next page, and click the upper part to go to the previous page. You can also turn pages with \`A\`, \`D\`, \`Left\`, and \`Right\`, or use the mouse wheel.

5.\`Volume size\` has relatively high performance requirements. Avoid setting it too high, or the reader may lag.

6.If there are more features you would like, feel free to send feedback. If they are feasible, I will add them when time allows.

### iPhone and iPad Guide
Guide link: [Link](https://github.com/FPV-G/JM-EHunter/blob/master/misc/iphone_ipad_en.md)

### JM-EHunter-local
The JM-EHunter-local is local version of JM-EHunter, supporting Windows and MacOS. [Home Page](https://github.com/FPV-G/JM-EHunter_local)

[Github releases](https://github.com/FPV-G/JM-EHunter_local/releases)

### Feedback & Suggestions
* You can open an issue on [Github]({{HOME_PAGE}}).
* You can also email me at: c360785655@gmail.com

### About
* Version: {{VERSION}}
* Author: Alex Chen (hanFeng)
* Home page of this project: [Github]({{HOME_PAGE}})

If you enjoy this extension, I would really appreciate a five-star rating in the store. 8-)
`,
    jp: `
1.Change language/切换语言/言語を変更
![image-language](https://raw.githubusercontent.com/hanFengSan/JM-EHunter/master/github_image/language.jpg)

1.トップバーを表示/非表示にしてJM-EHunterを閉じる
![image-topbar_close](https://raw.githubusercontent.com/hanFengSan/JM-EHunter/master/github_image/topbar_close.jpg)

2.このページの右上隅にあるボタンをクリックしてJM-EHunterを開きます
![image-open_ehunter](https://raw.githubusercontent.com/hanFengSan/JM-EHunter/master/github_image/open_ehunter.jpg)

3.\`スクロール\`モードでは、\`A\`、\`D\`、\`Left\`、\`Right\`キーでページをめくれます。

4.\`ブック\`モードでは、画面下部をクリックすると次のページ、画面上部をクリックすると前のページに移動します。\`A\`、\`D\`、\`Left\`、\`Right\`キー、またはマウスホイールでもページをめくれます。

5.\`分巻ページ数\`はパフォーマンス負荷が高いため、上げすぎると動作が重くなる場合があります。

6.追加してほしい機能があれば、ぜひフィードバックしてください。実現可能であれば、時間のあるときに対応します。

### iPhone と iPad の利用ガイド
案内リンク: [Link](https://github.com/FPV-G/JM-EHunter/blob/master/misc/iphone_ipad_jp.md)

### JM-EHunter-local
JM-EHunter-localはJM-EHunterのローカル版で、WindowsとMacOSをサポートしています。[Home Page](https://github.com/FPV-G/JM-EHunter_local)

[Github releases](https://github.com/FPV-G/JM-EHunter_local/releases)

### フィードバックと提案
* [Github]({{HOME_PAGE}}) で issue を作成できます。
* メール: c360785655@gmail.com

### について
* バージョン: {{VERSION}}
* 著者: Alex Chen (hanFeng)
* このプロジェクトのホームページ: [Github]({{HOME_PAGE}})

この拡張機能を気に入っていただけたら、ストアで5つ星評価をいただけるとうれしいです。 8-)
`
  };
  function normalizeLang$1(inputLang) {
    if (inputLang === "cn" || inputLang === "jp" || inputLang === "en") {
      return inputLang;
    }
    return "en";
  }
  function fillTemplate(template, values) {
    return template.replace(/\{\{([A-Z_]+)\}\}/g, (_, key) => {
      const val = values[key];
      return typeof val === "string" ? val : "";
    });
  }
  function getWelcomeInstructionText(inputLang, homePage) {
    const lang2 = normalizeLang$1(inputLang);
    return fillTemplate(welcomeInstructionTemplate[lang2], {
      HOME_PAGE: homePage,
      VERSION: pkgJson.version
    });
  }
  const versionNotesTemplate = {
    cn: `
### v3.1.0 说明
* 新增放大镜功能（滚动模式：鼠标左键点击图片打开，书页模式：屏幕中间区域点击图片打开）
* 支持快捷键自定义（入口：更多设置）
* 修复”快捷设置“中的拖拽功能

### v3.0.0 说明
* 支持图片打包下载（触发入口：页面右上角的“更多”按钮）
* 支持iPhone使用，优化移动端使用体验
* 支持”快速预览“（入口：缩略图栏底部的悬浮按钮、页面右上角的“更多”按钮）
* 缩略图栏可拖拽改变位置（拖拽顶部的EHUNTER标识）
* 缩略图栏可改变宽度或高度
* 图片加载失败时，支持自动换源重试

### iPhone / iPad 支持
* 目前在 iOS 15/iPadOS 15 上可运行油猴脚本/userscript，因此 JM-EHunter 也可在 iPhone / iPad 使用
* 使用指南: [链接](https://github.com/FPV-G/JM-EHunter/blob/master/misc/iphone_ipad_cn.md)
`,
    en: `
### v3.1.0 Notes
* Added a magnifier feature (Scroll Mode: left-click an image to open; Book Mode: click an image in the center area of the screen to open)
* Added customizable keyboard shortcuts (entry: More Settings)
* Fixed drag behavior in "Quick Settings"

### v3.0.0 Notes
* Added image bundle download (entry: the "More" button in the top-right corner)
* Added iPhone support with improved mobile usability
* Added "Quick Preview" (entry: floating button at the bottom of the thumbnail bar, and the "More" button in the top-right corner)
* Thumbnail bar position can now be changed by drag-and-drop (drag the EHUNTER header)
* Thumbnail bar width/height is now resizable
* Automatically retries with an alternative source when image loading fails

### iPhone / iPad Support
* Userscripts can run on iOS 15 / iPadOS 15, so JM-EHunter is now available on iPhone and iPad
* Guide: [Link](https://github.com/FPV-G/JM-EHunter/blob/master/misc/iphone_ipad_en.md)
`,
    jp: `
### v3.1.0 リリースノート
* 拡大鏡機能を追加（スクロールモード: 画像を左クリックで起動、ブックモード: 画面中央エリアの画像をクリックで起動）
* ショートカットキーのカスタマイズに対応（入口: 「詳細設定」）
* 「クイック設定」のドラッグ機能を修正

### v3.0.0 リリースノート
* 画像の一括ダウンロードに対応（入口: 右上の「More」ボタン）
* iPhone での利用に対応し、モバイルでの操作性を改善
* 「クイックプレビュー」に対応（入口: サムネイルバー下部のフローティングボタン、または右上の「More」ボタン）
* サムネイルバーの位置をドラッグで変更可能（EHUNTER ヘッダーをドラッグ）
* サムネイルバーの幅・高さを調整可能
* 画像の読み込みに失敗した場合、別ソースで自動再試行

### iPhone / iPad 対応
* iOS 15 / iPadOS 15 では userscript が動作するため、JM-EHunter を iPhone / iPad でも利用できます
* ガイド: [リンク](https://github.com/FPV-G/JM-EHunter/blob/master/misc/iphone_ipad_jp.md)
`
  };
  function normalizeLang(inputLang) {
    if (inputLang === "cn" || inputLang === "jp" || inputLang === "en") {
      return inputLang;
    }
    return "en";
  }
  function getVersionNotesText(inputLang) {
    const lang2 = normalizeLang(inputLang);
    return versionNotesTemplate[lang2];
  }
  if (typeof chrome === "undefined") {
    var chrome = { extension: null };
  }
  const PlatformService = {
    storage: {
      get sync() {
        if (chrome && chrome.storage) {
          return chrome.storage.sync.QUOTA_BYTES ? chrome.storage.sync : chrome.storage.local;
        } else {
          return window.localStorage;
        }
      },
      local: window.localStorage
    },
    storageGet(key, defaultValue = null) {
      try {
        if (typeof GM_getValue === "function") {
          return GM_getValue(key, defaultValue);
        }
      } catch (e) {
      }
      try {
        let val = window.localStorage.getItem(key);
        return val === null ? defaultValue : val;
      } catch (e) {
        return defaultValue;
      }
    },
    storageSet(key, value) {
      try {
        if (typeof GM_setValue === "function") {
          GM_setValue(key, value);
          return true;
        }
      } catch (e) {
      }
      try {
        let val = value;
        if (typeof value !== "string") {
          val = JSON.stringify(value);
        }
        window.localStorage.setItem(key, val);
        return true;
      } catch (e) {
        return false;
      }
    },
    storageRemove(key) {
      try {
        if (typeof GM_deleteValue === "function") {
          GM_deleteValue(key);
          return true;
        }
      } catch (e) {
      }
      try {
        window.localStorage.removeItem(key);
        return true;
      } catch (e) {
        return false;
      }
    },
    storageClear() {
      try {
        if (typeof GM_listValues === "function" && typeof GM_deleteValue === "function") {
          const keys = GM_listValues();
          if (Array.isArray(keys)) {
            keys.forEach((key) => {
              try {
                GM_deleteValue(key);
              } catch (e) {
              }
            });
          }
        }
      } catch (e) {
      }
      try {
        window.localStorage.clear();
        return true;
      } catch (e) {
        return false;
      }
    },
    getExtension() {
      return chrome.extension;
    },
    fetch(url, option) {
      if (typeof GM_info !== "undefined" && GM_info.version) {
        return new Promise((resolve, reject) => {
          GM_xmlhttpRequest({
            method: option.method,
            url,
            onload: (x2) => {
              let responseText = x2.responseText;
              x2.text = function() {
                return __async(this, null, function* () {
                  return responseText;
                });
              };
              resolve(x2);
            },
            onerror: (e) => {
              reject(`GM_xhr error, ${e.status}`);
            }
          });
        });
      } else {
        return window.fetch(url, option);
      }
    }
  };
  class TextReq {
    constructor(url, noCache = false, rejectError = true) {
      __publicField(this, "url");
      __publicField(this, "method", "GET");
      __publicField(this, "credentials", "include");
      __publicField(this, "retryTimes", 3);
      __publicField(this, "timeoutTime", 15);
      // secs
      __publicField(this, "curRetryTimes", 0);
      __publicField(this, "retryInterval", 3);
      // secs
      __publicField(this, "enabledLog", true);
      __publicField(this, "fetchSetting", null);
      __publicField(this, "noCache", false);
      __publicField(this, "rejectError", true);
      this.url = url;
      this.noCache = noCache;
      this.rejectError = rejectError;
    }
    setMethod(method) {
      this.method = method;
      return this;
    }
    setCredentials(credential) {
      this.credentials = credential;
      return this;
    }
    setFetchSetting(setting) {
      this.fetchSetting = setting;
      return this;
    }
    setRetryTimes(times2) {
      this.retryTimes = times2;
    }
    setRetryInterval(secs) {
      this.retryInterval = secs;
    }
    setTimeOutTime(secs) {
      this.timeoutTime = secs;
    }
    request() {
      return new Promise((resolve, reject) => {
        this._request((res) => {
          res.text().then((text2) => resolve(text2));
        }, (err2) => {
          if (this.rejectError) {
            reject(err2);
          } else {
            console.error(err2);
          }
        });
      });
    }
    printErrorLog(err2) {
      console.error(`TextReq: request error in ${this.url}, retry:(${this.curRetryTimes}/${this.retryTimes}), error: ${err2}`);
    }
    _request(successCallback, failureCallback) {
      this.curRetryTimes++;
      let url = this.url.includes("http") ? this.url : `${window.location.protocol}//${window.location.host}${this.url}`;
      if (this.noCache) {
        url = `${url}?_t=${(/* @__PURE__ */ new Date()).getTime()}`;
      }
      let timeout = new Promise((resolve, reject) => {
        setTimeout(reject, this.timeoutTime * 1e3 * this.curRetryTimes, "request timed out");
      });
      let req = PlatformService.fetch(url, this.fetchSetting ? this.fetchSetting : {
        method: this.method,
        credentials: this.credentials
      });
      Promise.race([timeout, req]).then((res) => {
        if (res.status === 200) {
          successCallback(res);
        } else {
          throw new Error(`${url}: ${res.status}`);
        }
      }).catch((err2) => {
        this.printErrorLog(err2);
        if (this.curRetryTimes < this.retryTimes) {
          setTimeout(() => {
            this._request(successCallback, failureCallback);
          }, this.retryInterval * 1e3);
        } else {
          failureCallback(err2);
        }
      });
    }
  }
  function getEhunterElem() {
    return document.querySelector(".ehunter-container");
  }
  let resizeTimeoutId = 0;
  function updateViewportSize() {
    let elem = getEhunterElem();
    if (elem) {
      storeAction.setViewportWidth(elem.offsetWidth);
      storeAction.setViewportHeight(elem.offsetHeight);
    }
  }
  function initViewportSizeUpdater() {
    updateViewportSize();
    window.addEventListener("resize", () => {
      window.clearTimeout(resizeTimeoutId);
      resizeTimeoutId = window.setTimeout(() => {
        updateViewportSize();
      }, 50);
    });
  }
  function handleKeyboardEvent(e) {
    const keyboardUpdater = "keyboard";
    const rawKey = typeof e.key === "string" ? e.key : "";
    if (e.metaKey || e.ctrlKey && rawKey !== "Control") {
      return;
    }
    const target2 = e.target;
    if (target2) {
      const tagName = (target2.tagName || "").toLowerCase();
      if (tagName === "input" || tagName === "textarea" || tagName === "select" || target2.isContentEditable) {
        return;
      }
    }
    const key = rawKey.length === 1 ? rawKey.toLowerCase() : rawKey;
    const shortcutMap = buildShortcutLookup();
    const actionList = shortcutMap[key];
    if (!actionList || actionList.length === 0) {
      return;
    }
    for (const action of actionList) {
      switch (action) {
        case "goPrev":
          if (store.readingMode == 0) {
            storeAction.setCurViewIndex(store.curViewIndex - 1, keyboardUpdater);
          } else if (store.readingMode == 1) {
            const isReversed = store.IsReverseBookWheeFliplDirection;
            store.physicalFlipDirection = isReversed ? 0 : 1;
            const step = store.pagesPerScreen;
            const delta2 = store.bookDirection === 0 ? step : -step;
            storeAction.setCurViewIndex(store.curViewIndex + delta2, keyboardUpdater);
          }
          break;
        case "goNext":
          if (store.readingMode == 0) {
            storeAction.setCurViewIndex(store.curViewIndex + 1, keyboardUpdater);
          } else if (store.readingMode == 1 && store.curViewIndex + store.pagesPerScreen < store.pageCount) {
            const isReversed = store.IsReverseBookWheeFliplDirection;
            store.physicalFlipDirection = isReversed ? 1 : 0;
            const step = store.pagesPerScreen;
            const delta2 = store.bookDirection === 0 ? -step : step;
            storeAction.setCurViewIndex(store.curViewIndex + delta2, keyboardUpdater);
          }
          break;
        case "toggleMoreSettings":
          storeAction.toggleShowMoreSettingsDialog();
          break;
        case "toggleTopBar":
          storeAction.toggleShowTopBar();
          break;
        case "toggleThumbView":
          if (store.readingMode == 0) {
            storeAction.toggleShowThumbView();
          } else {
            storeAction.toggleShowBookThumbView();
          }
          break;
        case "toggleQuickPreview":
          if (store.showThumbExpandDialog) {
            storeAction.closeThumbExpandDialog();
          } else {
            storeAction.openThumbExpandDialog();
          }
          break;
        case "increaseWidthScale":
          storeAction.setWidthScale(Math.min(100, store.widthScale + 5));
          break;
        case "decreaseWidthScale":
          storeAction.setWidthScale(Math.max(30, store.widthScale - 5));
          break;
        case "togglePagination":
          if (store.readingMode == 1) {
            storeAction.toggleShowBookPagination();
          }
          break;
        case "toggleAutoFlip":
          storeAction.toggleIsAutoFlip();
          break;
        case "toggleOddEven":
          storeAction.toggleIsChangeOddEven();
          break;
      }
    }
  }
  function normalizeShortcutToken$1(token2) {
    const trimmed = token2.trim();
    if (trimmed.length === 1) {
      return trimmed.toLowerCase();
    }
    return trimmed;
  }
  function buildShortcutLookup() {
    const result = {};
    const shortcutBindings = store.shortcutBindings;
    for (const actionName of Object.keys(shortcutBindings)) {
      const keyList = shortcutBindings[actionName].split(",").map((item) => normalizeShortcutToken$1(item)).filter((item) => item.length > 0);
      for (const key of keyList) {
        if (!result[key]) {
          result[key] = [];
        }
        result[key].push(actionName);
      }
    }
    return result;
  }
  function initKeyboardListener() {
    document.addEventListener("keydown", handleKeyboardEvent);
  }
  let autoFlipTimerID = 0;
  function handleAutoFlipEvent() {
    if (store.curViewIndex < store.pageCount - 1) {
      let step = store.readingMode == 1 ? store.pagesPerScreen : 1;
      storeAction.setCurViewIndex(store.curViewIndex + step, "autoflip");
    }
  }
  function resetAutoFlipTimer() {
    if (autoFlipTimerID) {
      window.clearTimeout(autoFlipTimerID);
    }
    if (store.readingMode == 1 && store.isAutoFlip && store.autoFlipFrequency > 0) {
      autoFlipTimerID = window.setTimeout(handleAutoFlipEvent, store.autoFlipFrequency * 1e3);
    }
  }
  let wheelDelta = 0;
  let wheelDeltaTimer = 0;
  function handleWheelFlipEvent(e) {
    if (typeof e.deltaY === "undefined") {
      e.deltaY = e.wheelDeltaY;
    }
    if (e.metaKey || e.ctrlKey || e.deltaY === 0) {
      return;
    }
    wheelDelta += e.deltaY;
    if (wheelDeltaTimer > 0) {
      window.clearTimeout(wheelDeltaTimer);
    }
    wheelDeltaTimer = window.setTimeout(() => {
      wheelDelta = 0;
    }, 100);
    if (Math.abs(wheelDelta) < store.wheelSensitivity) {
      return;
    }
    let isToNext = false;
    if (wheelDelta > 0 && !store.IsReverseBookWheeFliplDirection || wheelDelta < 0 && store.IsReverseBookWheeFliplDirection) {
      isToNext = true;
    }
    if (isToNext) {
      store.physicalFlipDirection = store.bookDirection === 0 ? 0 : 1;
    } else {
      store.physicalFlipDirection = store.bookDirection === 0 ? 1 : 0;
    }
    if (isToNext && store.curViewIndex + store.pagesPerScreen < store.pageCount) {
      storeAction.setCurViewIndex(store.curViewIndex + store.pagesPerScreen, "wheel");
    }
    if (!isToNext) {
      storeAction.setCurViewIndex(store.curViewIndex - store.pagesPerScreen, "wheel");
    }
    wheelDelta = 0;
    window.clearTimeout(wheelDeltaTimer);
  }
  function checkInstructions() {
    if (store.showInstructionDialog) {
      return;
    }
    if (!store.hasShownWelcomeInstruction) {
      let uaLang2 = navigator.language.toLowerCase();
      if (uaLang2.startsWith("zh")) {
        storeAction.setLang("cn");
      } else if (uaLang2.startsWith("ja") || uaLang2.includes("jp")) {
        storeAction.setLang("jp");
      } else {
        storeAction.setLang("en");
      }
      storeAction.markWelcomeInstructionShown();
      openWelcomeInstructionDialog(true);
      return;
    }
  }
  function openWelcomeInstructionDialog(isCompulsive = false) {
    storeAction.openInstructionDialog({
      title: i18n.value.instructionsAndAbouts,
      mdText: getWelcomeInstructionText(lang$1.value, config.homePage),
      isCompulsive
    });
  }
  function normalizeUpdateMessage(data) {
    if (!data || typeof data !== "object") {
      return null;
    }
    const langKey = lang$1.value === "cn" || lang$1.value === "jp" ? lang$1.value : "en";
    const localized = data[langKey];
    if (!localized || typeof localized !== "object") {
      return null;
    }
    const operations = Array.isArray(localized.operations) ? localized.operations.filter((item) => item && typeof item.name === "string" && typeof item.url === "string").map((item) => ({ name: item.name, url: item.url })) : [];
    return {
      title: typeof localized.title === "string" ? localized.title : "",
      version: typeof localized.version === "string" ? localized.version : "",
      text: typeof localized.text === "string" ? localized.text : "",
      operations,
      time: Number(localized.time) || 0,
      duration: Number(localized.duration) || 0
    };
  }
  function fetchRemoteUpdateMessage() {
    return __async(this, null, function* () {
      const requestList = [config.updateServer1, config.updateServer2].filter((url) => typeof url === "string" && url.length > 0).map((url) => new TextReq(url, true, true).setCredentials("omit").request());
      if (requestList.length === 0) {
        return null;
      }
      try {
        const rawText = yield Promise.race(requestList);
        const parsed = JSON.parse(rawText);
        return normalizeUpdateMessage(parsed);
      } catch (e) {
        return null;
      }
    });
  }
  function checkNewVersionNotice() {
    const appVersion = pkgJson.version;
    if (store.lastSeenVersionNotice === appVersion) {
      return;
    }
    storeAction.openInstructionDialog({
      title: `${i18n.value.versionUpdate} v${appVersion}`,
      mdText: getVersionNotesText(lang$1.value),
      isCompulsive: true,
      operations: [{
        name: i18n.value.confirm,
        btnType: "plain",
        isCloseModal: true,
        onClick: () => storeAction.markVersionNoticeSeen(appVersion)
      }]
    });
  }
  function checkRemoteUpdateNotice() {
    return __async(this, null, function* () {
      const message = yield fetchRemoteUpdateMessage();
      if (!message) {
        return;
      }
      const appVersion = pkgJson.version;
      const now2 = Date.now();
      const isNewVersion = message.version !== appVersion;
      const isReleaseTime = now2 > message.time;
      const isOverDuration = now2 - store.lastRemoteUpdateNoticeAt > message.duration;
      if (!isNewVersion || !isReleaseTime || !isOverDuration) {
        return;
      }
      storeAction.markRemoteUpdateNoticeShown(now2);
      const operations = [{
        name: i18n.value.later,
        btnType: "plain",
        isCloseModal: true
      }, ...message.operations.map((item) => ({
        name: item.name,
        btnType: "plain",
        isCloseModal: true,
        onClick: () => window.open(item.url, "_blank")
      }))];
      storeAction.openInstructionDialog({
        title: message.title,
        mdText: message.text,
        isCompulsive: true,
        operations
      });
    });
  }
  let hasStartedVersionCheck = false;
  function checkVersion() {
    if (hasStartedVersionCheck) {
      return;
    }
    hasStartedVersionCheck = true;
    window.setTimeout(() => __async(null, null, function* () {
      yield checkRemoteUpdateNotice();
      checkNewVersionNotice();
    }), 5e3);
  }
  const readerLayoutPreferenceKey = "ehunter:reader:prefs:mode-layout";
  const readerLayoutPreferenceSchemaVersion = 1;
  const sideMinSizePx = 60;
  const sideMaxSizePx = 520;
  const bottomMinSizePx = 60;
  const bottomMaxSizePx = 420;
  const baseThumbItemWidth = 150;
  const baseThumbItemHeight = 160;
  const minThumbScale = 0.35;
  const bottomCompactRatio = 0.78;
  const thumbVerticalItemGap = 10;
  const thumbVerticalItemPaddingX = 10;
  const thumbBottomItemPaddingY = 10;
  const thumbBottomItemPaddingX = 2;
  const now = () => (/* @__PURE__ */ new Date()).toISOString();
  function clampThumbSize(slot, size) {
    if (!Number.isFinite(size)) {
      return slot === "bottom" ? 200 : 150;
    }
    if (slot === "bottom") {
      return Math.min(bottomMaxSizePx, Math.max(bottomMinSizePx, Math.round(size)));
    }
    return Math.min(sideMaxSizePx, Math.max(sideMinSizePx, Math.round(size)));
  }
  function normalizeDockSlot(slot) {
    if (slot === "left" || slot === "right" || slot === "bottom") {
      return slot;
    }
    return "left";
  }
  function computeThumbContainerScale(slot, thumbItemWidth, thumbItemHeight) {
    if (slot === "bottom") {
      return Math.max(minThumbScale, thumbItemHeight / baseThumbItemHeight);
    }
    return Math.max(minThumbScale, thumbItemWidth / baseThumbItemWidth);
  }
  function computeThumbStageBaseWidth(slot) {
    if (slot === "bottom") {
      return Math.round(baseThumbItemWidth * bottomCompactRatio);
    }
    return baseThumbItemWidth;
  }
  function computeSideHeaderFontSizePx(thumbItemWidth) {
    const size = Math.floor(thumbItemWidth * 0.12);
    return Math.max(10, Math.min(18, size));
  }
  function computeSideHeaderLetterSpacingEm(thumbItemWidth) {
    const spacing = thumbItemWidth * 9e-4;
    return Math.max(0.02, Math.min(0.08, spacing));
  }
  function computeBottomHeaderFontSizePx(thumbViewHeight) {
    const size = Math.floor(thumbViewHeight * 0.065);
    return Math.max(8, Math.min(13, size));
  }
  function computeBottomHeaderLetterSpacingEm(thumbViewHeight) {
    const spacing = thumbViewHeight * 18e-4;
    return Math.max(0.02, Math.min(0.2, spacing));
  }
  function createDefaultModeLayout(mode) {
    return {
      thumbSlot: "left",
      thumbSizePx: clampThumbSize("left", 150),
      updatedAt: now()
    };
  }
  function createDefaultLayoutPreference() {
    return {
      schemaVersion: readerLayoutPreferenceSchemaVersion,
      updatedAt: now(),
      layouts: {
        scroll: createDefaultModeLayout(),
        book: createDefaultModeLayout()
      }
    };
  }
  function getBookCoverPlaceholderHeightOfWidth() {
    return 1.45;
  }
  function normalizeConfig(config2) {
    return {
      pageCount: Math.max(0, Math.floor(config2.pageCount || 0)),
      pagesPerScreen: Math.max(1, Math.floor(config2.pagesPerScreen || 1)),
      isChangeOddEven: !!config2.isChangeOddEven
    };
  }
  function buildBookSpreadPageList(config2) {
    const normalized = normalizeConfig(config2);
    const pages = [];
    if (!normalized.isChangeOddEven) {
      pages.push(-1);
    }
    for (let i2 = 0; i2 < normalized.pageCount; i2++) {
      pages.push(i2);
    }
    pages.push(normalized.pageCount);
    return pages;
  }
  function buildBookSpreads(config2) {
    const normalized = normalizeConfig(config2);
    const pages = buildBookSpreadPageList(normalized);
    const spreads = [];
    for (let i2 = 0; i2 < pages.length; i2 += normalized.pagesPerScreen) {
      spreads.push(pages.slice(i2, i2 + normalized.pagesPerScreen));
    }
    if (spreads.length === 0) {
      spreads.push([normalized.pageCount]);
    }
    return spreads;
  }
  function findBookSpreadIndexByPage(spreads, pageIndex) {
    const target2 = Math.floor(pageIndex);
    const index = spreads.findIndex((spread) => spread.includes(target2));
    return index >= 0 ? index : 0;
  }
  function pickBookSpreadAnchorPage(spread, fallback) {
    if (!spread || spread.length === 0) {
      return fallback;
    }
    const realPages = spread.filter((page) => page >= 0);
    if (realPages.length === 0) {
      return fallback;
    }
    return realPages[0];
  }
  function getAdjacentBookPageIndex(config2, curPageIndex, spreadDelta) {
    const spreads = buildBookSpreads(config2);
    const currentSpreadIndex = findBookSpreadIndexByPage(spreads, curPageIndex);
    const targetSpreadIndex = Math.max(0, Math.min(spreads.length - 1, currentSpreadIndex + spreadDelta));
    if (targetSpreadIndex === currentSpreadIndex) {
      return Math.max(0, Math.min(config2.pageCount - 1, curPageIndex));
    }
    const targetSpread = spreads[targetSpreadIndex];
    return pickBookSpreadAnchorPage(targetSpread, curPageIndex);
  }
  const thumbExpandSegmentSize = 200;
  function clampThumbExpandSegmentIndex(segmentIndex, pageCount) {
    const max = getThumbExpandSegmentCount(pageCount) - 1;
    if (segmentIndex < 0) {
      return 0;
    }
    if (segmentIndex > max) {
      return max;
    }
    return segmentIndex;
  }
  function getThumbExpandSegmentCount(pageCount) {
    const normalized = Math.max(1, pageCount);
    return Math.max(1, Math.ceil(normalized / thumbExpandSegmentSize));
  }
  function getThumbExpandSegmentByPage(pageIndex) {
    if (pageIndex <= 0) {
      return 0;
    }
    return Math.floor(pageIndex / thumbExpandSegmentSize);
  }
  function getThumbExpandSegmentRange(segmentIndex, pageCount) {
    const normalizedSegmentIndex = clampThumbExpandSegmentIndex(segmentIndex, pageCount);
    const startIndex = normalizedSegmentIndex * thumbExpandSegmentSize;
    const endIndex = Math.min(pageCount - 1, startIndex + thumbExpandSegmentSize - 1);
    return {
      segmentIndex: normalizedSegmentIndex,
      startIndex: Math.max(0, startIndex),
      endIndex: Math.max(0, endIndex)
    };
  }
  function buildThumbExpandItems(thumbInfos, pageCount, segmentIndex) {
    if (pageCount <= 0) {
      return [];
    }
    const range2 = getThumbExpandSegmentRange(segmentIndex, pageCount);
    const result = [];
    for (let i2 = range2.startIndex; i2 <= range2.endIndex; i2++) {
      const thumbInfo = thumbInfos[i2] || null;
      result.push({
        pageNumber: i2 + 1,
        thumbInfo,
        renderState: thumbInfo ? "ready" : "error"
      });
    }
    return result;
  }
  function readRawPreference() {
    const gmGetValue = globalThis.GM_getValue;
    if (typeof gmGetValue === "function") {
      return gmGetValue(readerLayoutPreferenceKey, null);
    }
    try {
      return PlatformService.storageGet(readerLayoutPreferenceKey, null);
    } catch (e) {
      return null;
    }
  }
  function writeRawPreference(data) {
    const gmSetValue = globalThis.GM_setValue;
    if (typeof gmSetValue === "function") {
      gmSetValue(readerLayoutPreferenceKey, data);
      return;
    }
    try {
      PlatformService.storageSet(readerLayoutPreferenceKey, data);
    } catch (e) {
    }
  }
  function normalizeModeLayout(mode, raw) {
    const fallback = createDefaultModeLayout();
    if (!raw || typeof raw !== "object") {
      return fallback;
    }
    const slot = normalizeDockSlot(raw.thumbSlot);
    const size = clampThumbSize(slot, Number(raw.thumbSizePx));
    const updatedAt = typeof raw.updatedAt === "string" ? raw.updatedAt : fallback.updatedAt;
    return {
      thumbSlot: slot,
      thumbSizePx: size,
      updatedAt
    };
  }
  function sanitizeLayoutPreference(rawData) {
    const defaults = createDefaultLayoutPreference();
    if (!rawData) {
      return defaults;
    }
    if (typeof rawData === "string") {
      try {
        rawData = JSON.parse(rawData);
      } catch (e) {
        return defaults;
      }
    }
    if (typeof rawData !== "object") {
      return defaults;
    }
    const layouts = rawData.layouts && typeof rawData.layouts === "object" ? rawData.layouts : {};
    return {
      schemaVersion: Number(rawData.schemaVersion) || readerLayoutPreferenceSchemaVersion,
      updatedAt: typeof rawData.updatedAt === "string" ? rawData.updatedAt : (/* @__PURE__ */ new Date()).toISOString(),
      layouts: {
        scroll: normalizeModeLayout("scroll", layouts.scroll),
        book: normalizeModeLayout("book", layouts.book)
      }
    };
  }
  function readLayoutPreference() {
    return sanitizeLayoutPreference(readRawPreference());
  }
  function writeLayoutPreference(data) {
    const sanitized = sanitizeLayoutPreference(data);
    writeRawPreference(sanitized);
    return sanitized;
  }
  var u8 = Uint8Array, u16 = Uint16Array, i32 = Int32Array;
  var fleb = new u8([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    0,
    /* unused */
    0,
    0,
    /* impossible */
    0
  ]);
  var fdeb = new u8([
    0,
    0,
    0,
    0,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    5,
    5,
    6,
    6,
    7,
    7,
    8,
    8,
    9,
    9,
    10,
    10,
    11,
    11,
    12,
    12,
    13,
    13,
    /* unused */
    0,
    0
  ]);
  var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  var freb = function(eb, start) {
    var b = new u16(31);
    for (var i2 = 0; i2 < 31; ++i2) {
      b[i2] = start += 1 << eb[i2 - 1];
    }
    var r = new i32(b[30]);
    for (var i2 = 1; i2 < 30; ++i2) {
      for (var j = b[i2]; j < b[i2 + 1]; ++j) {
        r[j] = j - b[i2] << 5 | i2;
      }
    }
    return { b, r };
  };
  var _a = freb(fleb, 2), fl = _a.b, revfl = _a.r;
  fl[28] = 258, revfl[258] = 28;
  var _b = freb(fdeb, 0), revfd = _b.r;
  var rev = new u16(32768);
  for (var i = 0; i < 32768; ++i) {
    var x = (i & 43690) >> 1 | (i & 21845) << 1;
    x = (x & 52428) >> 2 | (x & 13107) << 2;
    x = (x & 61680) >> 4 | (x & 3855) << 4;
    rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
  }
  var hMap = (function(cd, mb, r) {
    var s = cd.length;
    var i2 = 0;
    var l = new u16(mb);
    for (; i2 < s; ++i2) {
      if (cd[i2])
        ++l[cd[i2] - 1];
    }
    var le2 = new u16(mb);
    for (i2 = 1; i2 < mb; ++i2) {
      le2[i2] = le2[i2 - 1] + l[i2 - 1] << 1;
    }
    var co;
    if (r) {
      co = new u16(1 << mb);
      var rvb = 15 - mb;
      for (i2 = 0; i2 < s; ++i2) {
        if (cd[i2]) {
          var sv = i2 << 4 | cd[i2];
          var r_1 = mb - cd[i2];
          var v = le2[cd[i2] - 1]++ << r_1;
          for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
            co[rev[v] >> rvb] = sv;
          }
        }
      }
    } else {
      co = new u16(s);
      for (i2 = 0; i2 < s; ++i2) {
        if (cd[i2]) {
          co[i2] = rev[le2[cd[i2] - 1]++] >> 15 - cd[i2];
        }
      }
    }
    return co;
  });
  var flt = new u8(288);
  for (var i = 0; i < 144; ++i)
    flt[i] = 8;
  for (var i = 144; i < 256; ++i)
    flt[i] = 9;
  for (var i = 256; i < 280; ++i)
    flt[i] = 7;
  for (var i = 280; i < 288; ++i)
    flt[i] = 8;
  var fdt = new u8(32);
  for (var i = 0; i < 32; ++i)
    fdt[i] = 5;
  var flm = /* @__PURE__ */ hMap(flt, 9, 0);
  var fdm = /* @__PURE__ */ hMap(fdt, 5, 0);
  var shft = function(p2) {
    return (p2 + 7) / 8 | 0;
  };
  var slc = function(v, s, e) {
    if (e == null || e > v.length)
      e = v.length;
    return new u8(v.subarray(s, e));
  };
  var ec = [
    "unexpected EOF",
    "invalid block type",
    "invalid length/literal",
    "invalid distance",
    "stream finished",
    "no stream handler",
    ,
    "no callback",
    "invalid UTF-8 data",
    "extra field too long",
    "date not in range 1980-2099",
    "filename too long",
    "stream finishing",
    "invalid zip data"
    // determined by unknown compression method
  ];
  var err = function(ind, msg, nt) {
    var e = new Error(msg || ec[ind]);
    e.code = ind;
    if (Error.captureStackTrace)
      Error.captureStackTrace(e, err);
    if (!nt)
      throw e;
    return e;
  };
  var wbits = function(d, p2, v) {
    v <<= p2 & 7;
    var o = p2 / 8 | 0;
    d[o] |= v;
    d[o + 1] |= v >> 8;
  };
  var wbits16 = function(d, p2, v) {
    v <<= p2 & 7;
    var o = p2 / 8 | 0;
    d[o] |= v;
    d[o + 1] |= v >> 8;
    d[o + 2] |= v >> 16;
  };
  var hTree = function(d, mb) {
    var t2 = [];
    for (var i2 = 0; i2 < d.length; ++i2) {
      if (d[i2])
        t2.push({ s: i2, f: d[i2] });
    }
    var s = t2.length;
    var t22 = t2.slice();
    if (!s)
      return { t: et, l: 0 };
    if (s == 1) {
      var v = new u8(t2[0].s + 1);
      v[t2[0].s] = 1;
      return { t: v, l: 1 };
    }
    t2.sort(function(a, b) {
      return a.f - b.f;
    });
    t2.push({ s: -1, f: 25001 });
    var l = t2[0], r = t2[1], i0 = 0, i1 = 1, i22 = 2;
    t2[0] = { s: -1, f: l.f + r.f, l, r };
    while (i1 != s - 1) {
      l = t2[t2[i0].f < t2[i22].f ? i0++ : i22++];
      r = t2[i0 != i1 && t2[i0].f < t2[i22].f ? i0++ : i22++];
      t2[i1++] = { s: -1, f: l.f + r.f, l, r };
    }
    var maxSym = t22[0].s;
    for (var i2 = 1; i2 < s; ++i2) {
      if (t22[i2].s > maxSym)
        maxSym = t22[i2].s;
    }
    var tr = new u16(maxSym + 1);
    var mbt = ln(t2[i1 - 1], tr, 0);
    if (mbt > mb) {
      var i2 = 0, dt = 0;
      var lft = mbt - mb, cst = 1 << lft;
      t22.sort(function(a, b) {
        return tr[b.s] - tr[a.s] || a.f - b.f;
      });
      for (; i2 < s; ++i2) {
        var i2_1 = t22[i2].s;
        if (tr[i2_1] > mb) {
          dt += cst - (1 << mbt - tr[i2_1]);
          tr[i2_1] = mb;
        } else
          break;
      }
      dt >>= lft;
      while (dt > 0) {
        var i2_2 = t22[i2].s;
        if (tr[i2_2] < mb)
          dt -= 1 << mb - tr[i2_2]++ - 1;
        else
          ++i2;
      }
      for (; i2 >= 0 && dt; --i2) {
        var i2_3 = t22[i2].s;
        if (tr[i2_3] == mb) {
          --tr[i2_3];
          ++dt;
        }
      }
      mbt = mb;
    }
    return { t: new u8(tr), l: mbt };
  };
  var ln = function(n, l, d) {
    return n.s == -1 ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1)) : l[n.s] = d;
  };
  var lc = function(c) {
    var s = c.length;
    while (s && !c[--s])
      ;
    var cl = new u16(++s);
    var cli = 0, cln = c[0], cls = 1;
    var w = function(v) {
      cl[cli++] = v;
    };
    for (var i2 = 1; i2 <= s; ++i2) {
      if (c[i2] == cln && i2 != s)
        ++cls;
      else {
        if (!cln && cls > 2) {
          for (; cls > 138; cls -= 138)
            w(32754);
          if (cls > 2) {
            w(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
            cls = 0;
          }
        } else if (cls > 3) {
          w(cln), --cls;
          for (; cls > 6; cls -= 6)
            w(8304);
          if (cls > 2)
            w(cls - 3 << 5 | 8208), cls = 0;
        }
        while (cls--)
          w(cln);
        cls = 1;
        cln = c[i2];
      }
    }
    return { c: cl.subarray(0, cli), n: s };
  };
  var clen = function(cf, cl) {
    var l = 0;
    for (var i2 = 0; i2 < cl.length; ++i2)
      l += cf[i2] * cl[i2];
    return l;
  };
  var wfblk = function(out, pos, dat) {
    var s = dat.length;
    var o = shft(pos + 2);
    out[o] = s & 255;
    out[o + 1] = s >> 8;
    out[o + 2] = out[o] ^ 255;
    out[o + 3] = out[o + 1] ^ 255;
    for (var i2 = 0; i2 < s; ++i2)
      out[o + i2 + 4] = dat[i2];
    return (o + 4 + s) * 8;
  };
  var wblk = function(dat, out, final, syms, lf, df, eb, li, bs, bl, p2) {
    wbits(out, p2++, final);
    ++lf[256];
    var _a2 = hTree(lf, 15), dlt = _a2.t, mlb = _a2.l;
    var _b2 = hTree(df, 15), ddt = _b2.t, mdb = _b2.l;
    var _c = lc(dlt), lclt = _c.c, nlc = _c.n;
    var _d = lc(ddt), lcdt = _d.c, ndc = _d.n;
    var lcfreq = new u16(19);
    for (var i2 = 0; i2 < lclt.length; ++i2)
      ++lcfreq[lclt[i2] & 31];
    for (var i2 = 0; i2 < lcdt.length; ++i2)
      ++lcfreq[lcdt[i2] & 31];
    var _e = hTree(lcfreq, 7), lct = _e.t, mlcb = _e.l;
    var nlcc = 19;
    for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
      ;
    var flen = bl + 5 << 3;
    var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
    var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + 2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18];
    if (bs >= 0 && flen <= ftlen && flen <= dtlen)
      return wfblk(out, p2, dat.subarray(bs, bs + bl));
    var lm, ll2, dm, dl;
    wbits(out, p2, 1 + (dtlen < ftlen)), p2 += 2;
    if (dtlen < ftlen) {
      lm = hMap(dlt, mlb, 0), ll2 = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
      var llm = hMap(lct, mlcb, 0);
      wbits(out, p2, nlc - 257);
      wbits(out, p2 + 5, ndc - 1);
      wbits(out, p2 + 10, nlcc - 4);
      p2 += 14;
      for (var i2 = 0; i2 < nlcc; ++i2)
        wbits(out, p2 + 3 * i2, lct[clim[i2]]);
      p2 += 3 * nlcc;
      var lcts = [lclt, lcdt];
      for (var it2 = 0; it2 < 2; ++it2) {
        var clct = lcts[it2];
        for (var i2 = 0; i2 < clct.length; ++i2) {
          var len = clct[i2] & 31;
          wbits(out, p2, llm[len]), p2 += lct[len];
          if (len > 15)
            wbits(out, p2, clct[i2] >> 5 & 127), p2 += clct[i2] >> 12;
        }
      }
    } else {
      lm = flm, ll2 = flt, dm = fdm, dl = fdt;
    }
    for (var i2 = 0; i2 < li; ++i2) {
      var sym = syms[i2];
      if (sym > 255) {
        var len = sym >> 18 & 31;
        wbits16(out, p2, lm[len + 257]), p2 += ll2[len + 257];
        if (len > 7)
          wbits(out, p2, sym >> 23 & 31), p2 += fleb[len];
        var dst = sym & 31;
        wbits16(out, p2, dm[dst]), p2 += dl[dst];
        if (dst > 3)
          wbits16(out, p2, sym >> 5 & 8191), p2 += fdeb[dst];
      } else {
        wbits16(out, p2, lm[sym]), p2 += ll2[sym];
      }
    }
    wbits16(out, p2, lm[256]);
    return p2 + ll2[256];
  };
  var deo = /* @__PURE__ */ new i32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
  var et = /* @__PURE__ */ new u8(0);
  var dflt = function(dat, lvl, plvl, pre2, post, st) {
    var s = st.z || dat.length;
    var o = new u8(pre2 + s + 5 * (1 + Math.ceil(s / 7e3)) + post);
    var w = o.subarray(pre2, o.length - post);
    var lst = st.l;
    var pos = (st.r || 0) & 7;
    if (lvl) {
      if (pos)
        w[0] = st.r >> 3;
      var opt = deo[lvl - 1];
      var n = opt >> 13, c = opt & 8191;
      var msk_1 = (1 << plvl) - 1;
      var prev = st.p || new u16(32768), head = st.h || new u16(msk_1 + 1);
      var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
      var hsh = function(i3) {
        return (dat[i3] ^ dat[i3 + 1] << bs1_1 ^ dat[i3 + 2] << bs2_1) & msk_1;
      };
      var syms = new i32(25e3);
      var lf = new u16(288), df = new u16(32);
      var lc_1 = 0, eb = 0, i2 = st.i || 0, li = 0, wi = st.w || 0, bs = 0;
      for (; i2 + 2 < s; ++i2) {
        var hv = hsh(i2);
        var imod = i2 & 32767, pimod = head[hv];
        prev[imod] = pimod;
        head[hv] = imod;
        if (wi <= i2) {
          var rem = s - i2;
          if ((lc_1 > 7e3 || li > 24576) && (rem > 423 || !lst)) {
            pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i2 - bs, pos);
            li = lc_1 = eb = 0, bs = i2;
            for (var j = 0; j < 286; ++j)
              lf[j] = 0;
            for (var j = 0; j < 30; ++j)
              df[j] = 0;
          }
          var l = 2, d = 0, ch_1 = c, dif = imod - pimod & 32767;
          if (rem > 2 && hv == hsh(i2 - dif)) {
            var maxn = Math.min(n, rem) - 1;
            var maxd = Math.min(32767, i2);
            var ml = Math.min(258, rem);
            while (dif <= maxd && --ch_1 && imod != pimod) {
              if (dat[i2 + l] == dat[i2 + l - dif]) {
                var nl = 0;
                for (; nl < ml && dat[i2 + nl] == dat[i2 + nl - dif]; ++nl)
                  ;
                if (nl > l) {
                  l = nl, d = dif;
                  if (nl > maxn)
                    break;
                  var mmd = Math.min(dif, nl - 2);
                  var md = 0;
                  for (var j = 0; j < mmd; ++j) {
                    var ti = i2 - dif + j & 32767;
                    var pti = prev[ti];
                    var cd = ti - pti & 32767;
                    if (cd > md)
                      md = cd, pimod = ti;
                  }
                }
              }
              imod = pimod, pimod = prev[imod];
              dif += imod - pimod & 32767;
            }
          }
          if (d) {
            syms[li++] = 268435456 | revfl[l] << 18 | revfd[d];
            var lin = revfl[l] & 31, din = revfd[d] & 31;
            eb += fleb[lin] + fdeb[din];
            ++lf[257 + lin];
            ++df[din];
            wi = i2 + l;
            ++lc_1;
          } else {
            syms[li++] = dat[i2];
            ++lf[dat[i2]];
          }
        }
      }
      for (i2 = Math.max(i2, wi); i2 < s; ++i2) {
        syms[li++] = dat[i2];
        ++lf[dat[i2]];
      }
      pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i2 - bs, pos);
      if (!lst) {
        st.r = pos & 7 | w[pos / 8 | 0] << 3;
        pos -= 7;
        st.h = head, st.p = prev, st.i = i2, st.w = wi;
      }
    } else {
      for (var i2 = st.w || 0; i2 < s + lst; i2 += 65535) {
        var e = i2 + 65535;
        if (e >= s) {
          w[pos / 8 | 0] = lst;
          e = s;
        }
        pos = wfblk(w, pos + 1, dat.subarray(i2, e));
      }
      st.i = s;
    }
    return slc(o, 0, pre2 + shft(pos) + post);
  };
  var crct = /* @__PURE__ */ (function() {
    var t2 = new Int32Array(256);
    for (var i2 = 0; i2 < 256; ++i2) {
      var c = i2, k = 9;
      while (--k)
        c = (c & 1 && -306674912) ^ c >>> 1;
      t2[i2] = c;
    }
    return t2;
  })();
  var crc = function() {
    var c = -1;
    return {
      p: function(d) {
        var cr = c;
        for (var i2 = 0; i2 < d.length; ++i2)
          cr = crct[cr & 255 ^ d[i2]] ^ cr >>> 8;
        c = cr;
      },
      d: function() {
        return ~c;
      }
    };
  };
  var dopt = function(dat, opt, pre2, post, st) {
    if (!st) {
      st = { l: 1 };
      if (opt.dictionary) {
        var dict = opt.dictionary.subarray(-32768);
        var newDat = new u8(dict.length + dat.length);
        newDat.set(dict);
        newDat.set(dat, dict.length);
        dat = newDat;
        st.w = dict.length;
      }
    }
    return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? st.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 20 : 12 + opt.mem, pre2, post, st);
  };
  var mrg = function(a, b) {
    var o = {};
    for (var k in a)
      o[k] = a[k];
    for (var k in b)
      o[k] = b[k];
    return o;
  };
  var wbytes = function(d, b, v) {
    for (; v; ++b)
      d[b] = v, v >>>= 8;
  };
  function deflateSync(data, opts) {
    return dopt(data, opts || {}, 0, 0);
  }
  var fltn = function(d, p2, t2, o) {
    for (var k in d) {
      var val = d[k], n = p2 + k, op = o;
      if (Array.isArray(val))
        op = mrg(o, val[1]), val = val[0];
      if (val instanceof u8)
        t2[n] = [val, op];
      else {
        t2[n += "/"] = [new u8(0), op];
        fltn(val, n, t2, o);
      }
    }
  };
  var te = typeof TextEncoder != "undefined" && /* @__PURE__ */ new TextEncoder();
  var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
  var tds = 0;
  try {
    td.decode(et, { stream: true });
    tds = 1;
  } catch (e) {
  }
  function strToU8(str, latin1) {
    var i2;
    if (te)
      return te.encode(str);
    var l = str.length;
    var ar = new u8(str.length + (str.length >> 1));
    var ai = 0;
    var w = function(v) {
      ar[ai++] = v;
    };
    for (var i2 = 0; i2 < l; ++i2) {
      if (ai + 5 > ar.length) {
        var n = new u8(ai + 8 + (l - i2 << 1));
        n.set(ar);
        ar = n;
      }
      var c = str.charCodeAt(i2);
      if (c < 128 || latin1)
        w(c);
      else if (c < 2048)
        w(192 | c >> 6), w(128 | c & 63);
      else if (c > 55295 && c < 57344)
        c = 65536 + (c & 1023 << 10) | str.charCodeAt(++i2) & 1023, w(240 | c >> 18), w(128 | c >> 12 & 63), w(128 | c >> 6 & 63), w(128 | c & 63);
      else
        w(224 | c >> 12), w(128 | c >> 6 & 63), w(128 | c & 63);
    }
    return slc(ar, 0, ai);
  }
  var exfl = function(ex) {
    var le2 = 0;
    if (ex) {
      for (var k in ex) {
        var l = ex[k].length;
        if (l > 65535)
          err(9);
        le2 += l + 4;
      }
    }
    return le2;
  };
  var wzh = function(d, b, f, fn, u, c, ce, co) {
    var fl2 = fn.length, ex = f.extra, col = co && co.length;
    var exl = exfl(ex);
    wbytes(d, b, ce != null ? 33639248 : 67324752), b += 4;
    if (ce != null)
      d[b++] = 20, d[b++] = f.os;
    d[b] = 20, b += 2;
    d[b++] = f.flag << 1 | (c < 0 && 8), d[b++] = u && 8;
    d[b++] = f.compression & 255, d[b++] = f.compression >> 8;
    var dt = new Date(f.mtime == null ? Date.now() : f.mtime), y = dt.getFullYear() - 1980;
    if (y < 0 || y > 119)
      err(10);
    wbytes(d, b, y << 25 | dt.getMonth() + 1 << 21 | dt.getDate() << 16 | dt.getHours() << 11 | dt.getMinutes() << 5 | dt.getSeconds() >> 1), b += 4;
    if (c != -1) {
      wbytes(d, b, f.crc);
      wbytes(d, b + 4, c < 0 ? -c - 2 : c);
      wbytes(d, b + 8, f.size);
    }
    wbytes(d, b + 12, fl2);
    wbytes(d, b + 14, exl), b += 16;
    if (ce != null) {
      wbytes(d, b, col);
      wbytes(d, b + 6, f.attrs);
      wbytes(d, b + 10, ce), b += 14;
    }
    d.set(fn, b);
    b += fl2;
    if (exl) {
      for (var k in ex) {
        var exf = ex[k], l = exf.length;
        wbytes(d, b, +k);
        wbytes(d, b + 2, l);
        d.set(exf, b + 4), b += 4 + l;
      }
    }
    if (col)
      d.set(co, b), b += col;
    return b;
  };
  var wzf = function(o, b, c, d, e) {
    wbytes(o, b, 101010256);
    wbytes(o, b + 8, c);
    wbytes(o, b + 10, c);
    wbytes(o, b + 12, d);
    wbytes(o, b + 16, e);
  };
  function zipSync(data, opts) {
    if (!opts)
      opts = {};
    var r = {};
    var files = [];
    fltn(data, "", r, opts);
    var o = 0;
    var tot = 0;
    for (var fn in r) {
      var _a2 = r[fn], file = _a2[0], p2 = _a2[1];
      var compression = p2.level == 0 ? 0 : 8;
      var f = strToU8(fn), s = f.length;
      var com = p2.comment, m = com && strToU8(com), ms = m && m.length;
      var exl = exfl(p2.extra);
      if (s > 65535)
        err(11);
      var d = compression ? deflateSync(file, p2) : file, l = d.length;
      var c = crc();
      c.p(file);
      files.push(mrg(p2, {
        size: file.length,
        crc: c.d(),
        c: d,
        f,
        m,
        u: s != fn.length || m && com.length != ms,
        o,
        compression
      }));
      o += 30 + s + exl + l;
      tot += 76 + 2 * (s + exl) + (ms || 0) + l;
    }
    var out = new u8(tot + 22), oe = o, cdl = tot - o;
    for (var i2 = 0; i2 < files.length; ++i2) {
      var f = files[i2];
      wzh(out, f.o, f, f.f, f.u, f.c.length);
      var badd = 30 + f.f.length + exfl(f.extra);
      out.set(f.c, f.o + badd);
      wzh(out, o, f, f.f, f.u, f.c.length, f.o, f.m), o += 16 + badd + (f.m ? f.m.length : 0);
    }
    wzf(out, o, files.length, cdl, oe);
    return out;
  }
  var ThumbMode = /* @__PURE__ */ ((ThumbMode2) => {
    ThumbMode2[ThumbMode2["SPIRIT"] = 0] = "SPIRIT";
    ThumbMode2[ThumbMode2["IMG"] = 1] = "IMG";
    return ThumbMode2;
  })(ThumbMode || {});
  var ImgSrcMode = /* @__PURE__ */ ((ImgSrcMode2) => {
    ImgSrcMode2[ImgSrcMode2["Default"] = 0] = "Default";
    ImgSrcMode2[ImgSrcMode2["Fast"] = 1] = "Fast";
    ImgSrcMode2[ImgSrcMode2["Origin"] = 2] = "Origin";
    ImgSrcMode2[ImgSrcMode2["ChangeSource"] = 3] = "ChangeSource";
    return ImgSrcMode2;
  })(ImgSrcMode || {});
  const defaultOnlyRetryStages = [
    { mode: ImgSrcMode.Default, attempts: 3 }
  ];
  const sourceFallbackRetryStages = [
    { mode: ImgSrcMode.Default, attempts: 2 },
    { mode: ImgSrcMode.ChangeSource, attempts: 2 },
    { mode: ImgSrcMode.Origin, attempts: 2 }
  ];
  function getImageRetryStages(options) {
    if (options.autoRetryByOtherSource && options.supportChangeSource) {
      return sourceFallbackRetryStages;
    }
    return defaultOnlyRetryStages;
  }
  function buildRetryQueueAfterFailure(failedMode, options) {
    const stages = getImageRetryStages(options);
    const failedStageIndex = stages.findIndex((stage) => stage.mode === failedMode);
    if (failedStageIndex < 0) {
      return [];
    }
    const queue2 = [];
    const failedStage = stages[failedStageIndex];
    const retriesForCurrentStage = Math.max(failedStage.attempts - 1, 0);
    for (let i2 = 0; i2 < retriesForCurrentStage; i2++) {
      queue2.push(failedStage.mode);
    }
    for (let stageIndex = failedStageIndex + 1; stageIndex < stages.length; stageIndex++) {
      const stage = stages[stageIndex];
      for (let i2 = 0; i2 < stage.attempts; i2++) {
        queue2.push(stage.mode);
      }
    }
    return queue2;
  }
  function normalizeHostToHostname(hostOrHostname) {
    const trimmed = hostOrHostname.trim();
    if (!trimmed) {
      return "";
    }
    if (trimmed.startsWith("[")) {
      const end = trimmed.indexOf("]");
      return end > 0 ? trimmed.slice(1, end) : trimmed;
    }
    const firstColon = trimmed.indexOf(":");
    if (firstColon > -1) {
      return trimmed.slice(0, firstColon);
    }
    return trimmed;
  }
  function isIPv4Host(hostOrHostname) {
    const hostname = normalizeHostToHostname(hostOrHostname);
    return /^\d{1,3}(?:\.\d{1,3}){3}$/.test(hostname);
  }
  function isTestEnvironmentHost(hostOrHostname) {
    const hostname = normalizeHostToHostname(hostOrHostname);
    return hostname === "localhost" || isIPv4Host(hostname);
  }
  function isTestEnvironment() {
    return isTestEnvironmentHost(window.location.host || "");
  }
  const defaultChunkSize = 200;
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  function normalizeChunkSize(raw) {
    if (!Number.isFinite(raw) || raw <= 0) {
      return defaultChunkSize;
    }
    return Math.floor(raw);
  }
  function getjmEHunterVersion() {
    {
      return "2.0.0";
    }
  }
  function t(key, vars) {
    const dict = i18n.value;
    let text2 = typeof dict[key] === "string" ? dict[key] : key;
    if (!vars) {
      return text2;
    }
    for (const varKey of Object.keys(vars)) {
      text2 = text2.replace(new RegExp(`{{${varKey}}}`, "g"), String(vars[varKey]));
    }
    return text2;
  }
  function sanitizeFileBaseName(raw) {
    const cleaned = raw.replace(/[<>:"/\\|?*\u0000-\u001F]/g, "_").replace(/[.\s]+$/g, "").trim();
    if (cleaned.length > 0) {
      return cleaned;
    }
    return "gallery";
  }
  function inferExtension(src, blobType) {
    const typeMap = {
      "image/jpeg": "jpg",
      "image/jpg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "image/gif": "gif",
      "image/bmp": "bmp",
      "image/avif": "avif"
    };
    if (blobType && typeMap[blobType]) {
      return typeMap[blobType];
    }
    const fromUrl = src.match(/\.([a-zA-Z0-9]{2,5})(?:$|\?)/);
    if (fromUrl && fromUrl[1]) {
      return fromUrl[1].toLowerCase();
    }
    return "jpg";
  }
  function isDevRuntimeForDownload() {
    return isTestEnvironment();
  }
  function fetchBlobByGMXhr(url, timeoutMs = 3e4) {
    return __async(this, null, function* () {
      const gmXhr = globalThis.GM_xmlhttpRequest;
      if (typeof gmXhr !== "function") {
        throw new Error("GM_XHR_NOT_AVAILABLE");
      }
      return yield new Promise((resolve, reject) => {
        gmXhr({
          method: "GET",
          url,
          responseType: "arraybuffer",
          timeout: timeoutMs,
          onload: (resp) => {
            if (!resp || resp.status < 200 || resp.status >= 300 || !resp.response) {
              reject(new Error(`GM_XHR_HTTP_${(resp == null ? void 0 : resp.status) || "UNKNOWN"}`));
              return;
            }
            resolve(new Blob([resp.response]));
          },
          onerror: () => reject(new Error("GM_XHR_ERROR")),
          ontimeout: () => reject(new Error("GM_XHR_TIMEOUT")),
          onabort: () => reject(new Error("GM_XHR_ABORT"))
        });
      });
    });
  }
  function resolveImageBlob(albumService, pageIndex, pageNumber, autoRetryByOtherSource) {
    return __async(this, null, function* () {
      const stages = getImageRetryStages({
        autoRetryByOtherSource,
        supportChangeSource: albumService.isSupportImgChangeSource()
      });
      let lastError = null;
      for (const stage of stages) {
        for (let attempt = 1; attempt <= stage.attempts; attempt++) {
          try {
            const imgInfo = yield albumService.getImgSrc(pageIndex, stage.mode);
            if (imgInfo instanceof Error) {
              throw imgInfo;
            }
            if (!imgInfo.src) {
              throw new Error("empty_image_src");
            }
            if (typeof imgInfo.src === "string" && imgInfo.src.startsWith("//")) {
              imgInfo.src = `${window.location.protocol}${imgInfo.src}`;
            }
            console.log("[GalleryDownloadService] image load begin", {
              pageIndex,
              pageNumber,
              mode: stage.mode,
              attempt,
              src: imgInfo.src
            });
            const beginAt = Date.now();
            const blob = yield fetchBlobByGMXhr(imgInfo.src, 3e4);
            const elapsed = Date.now() - beginAt;
            console.log("[GalleryDownloadService] image load done", {
              pageIndex,
              pageNumber,
              mode: stage.mode,
              attempt,
              src: imgInfo.src,
              blobSize: blob.size,
              blobType: blob.type,
              elapsedMs: elapsed
            });
            return {
              pageNumber,
              blob,
              extension: inferExtension(imgInfo.src, blob.type)
            };
          } catch (e) {
            const reason = e instanceof Error ? e.message : String(e);
            console.log("[GalleryDownloadService] image load failed", {
              pageIndex,
              pageNumber,
              mode: stage.mode,
              attempt,
              reason
            });
            lastError = e;
            if (attempt < stage.attempts) {
              yield delay(350);
            }
          }
        }
      }
      throw lastError instanceof Error ? lastError : new Error(String(lastError || "resolve_image_failed"));
    });
  }
  function downloadBlob(fileName, blob) {
    const url = URL.createObjectURL(blob);
    const gmDownload = globalThis.GM_download;
    console.log("[GalleryDownloadService] download trigger start", { fileName, size: blob.size });
    if (!isDevRuntimeForDownload() && typeof gmDownload === "function") {
      try {
        gmDownload({
          url,
          name: fileName,
          saveAs: false,
          onload: () => {
            console.log("[GalleryDownloadService] download trigger done (GM_download onload)", { fileName });
            URL.revokeObjectURL(url);
          },
          onerror: () => {
            console.log("[GalleryDownloadService] download trigger done (GM_download onerror)", { fileName });
            URL.revokeObjectURL(url);
          },
          ontimeout: () => {
            console.log("[GalleryDownloadService] download trigger done (GM_download ontimeout)", { fileName });
            URL.revokeObjectURL(url);
          },
          onabort: () => {
            console.log("[GalleryDownloadService] download trigger done (GM_download onabort)", { fileName });
            URL.revokeObjectURL(url);
          }
        });
        console.log("[GalleryDownloadService] download trigger done (GM_download submitted)", { fileName });
        return;
      } catch (e) {
        URL.revokeObjectURL(url);
      }
    }
    const link2 = document.createElement("a");
    link2.href = url;
    link2.download = fileName;
    link2.style.display = "none";
    document.body.appendChild(link2);
    link2.click();
    document.body.removeChild(link2);
    console.log("[GalleryDownloadService] download trigger done (anchor click)", { fileName });
    window.setTimeout(() => URL.revokeObjectURL(url), 500);
  }
  class GalleryDownloadService {
    constructor() {
      __publicField(this, "abortedTaskSet", /* @__PURE__ */ new Set());
    }
    abort(taskId) {
      this.abortedTaskSet.add(taskId);
    }
    assertNotAborted(taskId) {
      if (this.abortedTaskSet.has(taskId)) {
        throw new Error("DOWNLOAD_ABORTED");
      }
    }
    run(rawOptions) {
      return __async(this, null, function* () {
        const options = __spreadProps(__spreadValues({}, rawOptions), {
          chunkSize: normalizeChunkSize(rawOptions.chunkSize)
        });
        this.abortedTaskSet.delete(options.taskId);
        const totalPages = Math.max(0, options.pageCount);
        const totalChunks = Math.max(1, Math.ceil((totalPages || 1) / options.chunkSize));
        const failures = [];
        const chunkResults = [];
        const width = Math.max(4, String(totalPages).length);
        const fileBaseName = sanitizeFileBaseName(options.galleryTitle);
        const downloadTime = (/* @__PURE__ */ new Date()).toISOString();
        options.onStatus({
          phase: "queued",
          severity: "info",
          message: t("downloadQueued"),
          processedPages: 0,
          totalPages,
          failedPages: 0
        });
        if (totalPages <= 0) {
          options.onStatus({
            phase: "failed",
            severity: "error",
            message: t("downloadNoPages"),
            processedPages: 0,
            totalPages,
            failedPages: 0
          });
          return {
            status: "failed",
            totalPages,
            processedPages: 0,
            failedPages: 0,
            chunks: [],
            failures: [{ pageNumber: 0, reason: "no_pages" }]
          };
        }
        let currentChunkIndex = 1;
        let processedPages = 0;
        let currentChunkFailures = [];
        let currentChunkSuccessCount = 0;
        const finalizeChunk = (chunkImages) => __async(this, null, function* () {
          this.assertNotAborted(options.taskId);
          const chunkMeta = {
            introUrl: options.introUrl,
            galleryTitle: options.galleryTitle,
            totalPages,
            downloadTime,
            jmEHunterVersion: options.jmEHunterVersion || getjmEHunterVersion(),
            totalChunks,
            chunkIndex: currentChunkIndex
          };
          const zipFiles = {
            "metadata.json": strToU8(`${JSON.stringify(chunkMeta, null, 2)}
`)
          };
          const sortedChunkImages = [...chunkImages].sort((a, b) => a.pageNumber - b.pageNumber);
          for (const image2 of sortedChunkImages) {
            try {
              const stem = String(image2.pageNumber).padStart(width, "0");
              const fileName = `${stem}.${image2.extension}`;
              zipFiles[fileName] = new Uint8Array(yield image2.blob.arrayBuffer());
            } catch (e) {
              const reason = e instanceof Error ? e.message : String(e);
              failures.push({ pageNumber: image2.pageNumber, reason: `ZIP_PREP_FAILED:${reason}` });
              currentChunkFailures.push(image2.pageNumber);
              currentChunkSuccessCount = Math.max(0, currentChunkSuccessCount - 1);
            } finally {
              image2.blob = new Blob();
            }
          }
          options.onStatus({
            phase: "compressing",
            severity: "info",
            message: t("downloadCompressing", { chunk: currentChunkIndex, totalChunks }),
            processedPages,
            totalPages,
            failedPages: failures.length
          });
          console.log("[GalleryDownloadService] zip compress start", {
            chunkIndex: currentChunkIndex,
            totalChunks,
            fileCount: sortedChunkImages.length
          });
          const zipBytes = zipSync(zipFiles, { level: 0 });
          const zipBytesCopy = new Uint8Array(zipBytes.length);
          zipBytesCopy.set(zipBytes);
          const zipBlob = new Blob([zipBytesCopy], { type: "application/zip" });
          console.log("[GalleryDownloadService] zip compress done", {
            chunkIndex: currentChunkIndex,
            totalChunks,
            zipSize: zipBlob.size
          });
          this.assertNotAborted(options.taskId);
          const zipFileName = totalChunks > 1 ? `${fileBaseName}_part-${String(currentChunkIndex).padStart(2, "0")}-of-${String(totalChunks).padStart(2, "0")}.zip` : `${fileBaseName}.zip`;
          downloadBlob(zipFileName, zipBlob);
          chunkResults.push({
            chunkIndex: currentChunkIndex,
            totalChunks,
            zipFileName,
            successCount: currentChunkSuccessCount,
            failedCount: currentChunkFailures.length,
            failedPageNumbers: [...currentChunkFailures]
          });
          currentChunkIndex += 1;
          currentChunkFailures = [];
          currentChunkSuccessCount = 0;
        });
        for (let chunkStart = 1; chunkStart <= totalPages; chunkStart += options.chunkSize) {
          this.assertNotAborted(options.taskId);
          const chunkEnd = Math.min(totalPages, chunkStart + options.chunkSize - 1);
          const pageNumbers = [];
          for (let page = chunkStart; page <= chunkEnd; page++) {
            pageNumbers.push(page);
          }
          const chunkImages = [];
          const queue2 = [...pageNumbers];
          const runWorker = () => __async(this, null, function* () {
            while (queue2.length > 0) {
              this.assertNotAborted(options.taskId);
              const pageNumber = queue2.shift();
              if (!pageNumber) {
                return;
              }
              options.onStatus({
                phase: "fetching",
                severity: "info",
                message: t("downloadFetching", { current: pageNumber, total: totalPages }),
                processedPages,
                totalPages,
                failedPages: failures.length
              });
              const pageIndex = pageNumber - 1;
              try {
                const resolved = yield resolveImageBlob(
                  options.albumService,
                  pageIndex,
                  pageNumber,
                  options.autoRetryByOtherSource
                );
                this.assertNotAborted(options.taskId);
                chunkImages.push(resolved);
                currentChunkSuccessCount += 1;
              } catch (e) {
                const reason = e instanceof Error ? e.message : String(e);
                failures.push({ pageNumber, reason });
                currentChunkFailures.push(pageNumber);
              }
              processedPages += 1;
              options.onStatus({
                phase: "fetching",
                severity: "info",
                message: t("downloadFetching", { current: processedPages, total: totalPages }),
                processedPages,
                totalPages,
                failedPages: failures.length
              });
            }
          });
          yield Promise.all([runWorker(), runWorker(), runWorker()]);
          try {
            yield finalizeChunk(chunkImages);
          } catch (e) {
            const reason = e instanceof Error ? e.message : String(e);
            failures.push({ pageNumber: chunkStart, reason: `CHUNK_FINALIZE_FAILED:${reason}` });
            options.onStatus({
              phase: "partial",
              severity: "warning",
              message: t("downloadChunkFailed", { chunk: currentChunkIndex, reason }),
              processedPages,
              totalPages,
              failedPages: failures.length
            });
            currentChunkIndex += 1;
            currentChunkFailures = [];
            currentChunkSuccessCount = 0;
          }
        }
        this.assertNotAborted(options.taskId);
        const finalStatus = failures.length === 0 ? "completed" : failures.length === totalPages ? "failed" : "partial";
        options.onStatus({
          phase: finalStatus,
          severity: finalStatus === "completed" ? "success" : finalStatus === "partial" ? "warning" : "error",
          message: finalStatus === "completed" ? t("downloadCompleted") : finalStatus === "partial" ? t("downloadPartial", { failed: failures.length }) : t("downloadFailed"),
          processedPages,
          totalPages,
          failedPages: failures.length
        });
        return {
          status: finalStatus,
          totalPages,
          processedPages,
          failedPages: failures.length,
          chunks: chunkResults,
          failures
        };
      });
    }
  }
  function cloneInstructionDialogPayload(payload) {
    return {
      title: payload.title,
      mdText: payload.mdText,
      isCompulsive: payload.isCompulsive,
      operations: payload.operations ? [...payload.operations] : []
    };
  }
  let instructionDialogSeq = 0;
  function createInstructionDialogEntry(payload) {
    instructionDialogSeq += 1;
    const cloned = cloneInstructionDialogPayload(payload);
    return __spreadProps(__spreadValues({}, cloned), {
      id: `dialog-${Date.now()}-${instructionDialogSeq}`
    });
  }
  function syncInstructionDialogState() {
    const dialogs = store.instructionDialogStack;
    const topDialog = dialogs.length > 0 ? dialogs[dialogs.length - 1] : null;
    if (!topDialog) {
      store.showInstructionDialog = false;
      store.instructionDialogTitle = "";
      store.instructionDialogMdText = "";
      store.instructionDialogCompulsive = false;
      store.instructionDialogOperations = [];
      return;
    }
    store.showInstructionDialog = true;
    store.instructionDialogTitle = topDialog.title;
    store.instructionDialogMdText = topDialog.mdText;
    store.instructionDialogCompulsive = topDialog.isCompulsive !== false;
    store.instructionDialogOperations = topDialog.operations ? [...topDialog.operations] : [];
  }
  const pageTurnAnimationPreferenceKey = "ehunter:reader:prefs:page-turn-animation";
  const pageTurnAnimationPreferenceSchemaVersion = 1;
  const defaultPageTurnAnimationMode = "horizontal-slide";
  const unifiedSettingsPreferenceKey = "ehunter:reader:prefs:unified-settings";
  const unifiedSettingsPreferenceSchemaVersion = 3;
  let bookTurnSettleTimerID = 0;
  let isBookTurning = false;
  let pendingBookTurn = null;
  let readerLayoutPreference = createDefaultLayoutPreference();
  let runtimeAlbumService = null;
  const downloadRunnerMap = {};
  const quickSettingOptions = [
    { id: "readingMode", i18nKey: "readingMode", modeScope: "both", fixed: true },
    { id: "widthScale", i18nKey: "widthScale", modeScope: "scroll-only" },
    { id: "loadNum", i18nKey: "loadNum", modeScope: "both" },
    { id: "volumeSize", i18nKey: "volSize", modeScope: "scroll-only" },
    { id: "showThumbView", i18nKey: "thumbView", modeScope: "scroll-only" },
    { id: "scrollPageMargin", i18nKey: "pageMargin", modeScope: "scroll-only" },
    { id: "pagesPerScreen", i18nKey: "screenSize", modeScope: "book-only" },
    { id: "bookDirection", i18nKey: "bookDirection", modeScope: "book-only" },
    { id: "pageTurnAnimationMode", i18nKey: "pageTurnAnimation", modeScope: "book-only", fixed: true },
    { id: "animationSpeed", i18nKey: "animationSpeed", modeScope: "book-only", fixed: true },
    { id: "IsReverseBookWheeFliplDirection", i18nKey: "wheelDirection", modeScope: "book-only", fixed: true },
    { id: "showBookPagination", i18nKey: "pagination", modeScope: "book-only" },
    { id: "isChangeOddEven", i18nKey: "oddEven", modeScope: "book-only" },
    { id: "isAutoFlip", i18nKey: "autoFlip", modeScope: "book-only" },
    { id: "autoFlipFrequency", i18nKey: "autoFlipFrequency", modeScope: "book-only" },
    { id: "showBookThumbView", i18nKey: "thumbView", modeScope: "book-only" },
    { id: "wheelSensitivity", i18nKey: "wheelSensitivity", modeScope: "book-only" },
    { id: "lang", i18nKey: "languageSetting", modeScope: "both" },
    { id: "autoRetryByOtherSource", i18nKey: "autoSourceRetry", modeScope: "both" }
  ];
  const settingsCategories = [
    { id: "general", i18nKey: "settingsGeneral" },
    { id: "scroll", i18nKey: "settingsScrollMode" },
    { id: "book", i18nKey: "settingsBookMode" },
    { id: "quick", i18nKey: "settingsQuick" },
    { id: "shortcuts", i18nKey: "settingsShortcuts" },
    { id: "other", i18nKey: "settingsOther" }
  ];
  const shortcutActionDefinitions = [
    { id: "goPrev", labelI18nKey: "shortcutGoPrev", tipI18nKey: "shortcutGoPrevTip" },
    { id: "goNext", labelI18nKey: "shortcutGoNext", tipI18nKey: "shortcutGoNextTip" },
    { id: "toggleMoreSettings", labelI18nKey: "shortcutToggleMoreSettings", tipI18nKey: "shortcutToggleMoreSettingsTip" },
    { id: "toggleTopBar", labelI18nKey: "shortcutToggleTopBar", tipI18nKey: "shortcutToggleTopBarTip" },
    { id: "toggleThumbView", labelI18nKey: "shortcutToggleThumbView", tipI18nKey: "shortcutToggleThumbViewTip" },
    { id: "toggleQuickPreview", labelI18nKey: "shortcutToggleQuickPreview", tipI18nKey: "shortcutToggleQuickPreviewTip" },
    { id: "increaseWidthScale", labelI18nKey: "shortcutIncreaseWidthScale", tipI18nKey: "shortcutIncreaseWidthScaleTip" },
    { id: "decreaseWidthScale", labelI18nKey: "shortcutDecreaseWidthScale", tipI18nKey: "shortcutDecreaseWidthScaleTip" },
    { id: "togglePagination", labelI18nKey: "shortcutTogglePagination", tipI18nKey: "shortcutTogglePaginationTip" },
    { id: "toggleAutoFlip", labelI18nKey: "shortcutToggleAutoFlip", tipI18nKey: "shortcutToggleAutoFlipTip" },
    { id: "toggleOddEven", labelI18nKey: "shortcutToggleOddEven", tipI18nKey: "shortcutToggleOddEvenTip" }
  ];
  const defaultShortcutBindings = {
    goPrev: "ArrowLeft,ArrowUp,a",
    goNext: "ArrowRight,ArrowDown,d",
    toggleMoreSettings: "Shift",
    toggleTopBar: "q",
    toggleThumbView: "t",
    toggleQuickPreview: "f",
    increaseWidthScale: "]",
    decreaseWidthScale: "[",
    togglePagination: "",
    toggleAutoFlip: "",
    toggleOddEven: ""
  };
  const shortcutKeyCandidates = [
    { key: "ArrowUp", label: "↑" },
    { key: "ArrowDown", label: "↓" },
    { key: "ArrowLeft", label: "←" },
    { key: "ArrowRight", label: "→" },
    { key: "Escape", label: "Esc" },
    { key: "Tab", label: "Tab" },
    { key: "CapsLock", label: "Caps" },
    { key: "Control", label: "Ctrl" },
    { key: "Shift", label: "Shift" },
    { key: "F1", label: "F1" },
    { key: "F2", label: "F2" },
    { key: "F3", label: "F3" },
    { key: "F4", label: "F4" },
    { key: "F5", label: "F5" },
    { key: "F6", label: "F6" },
    { key: "F7", label: "F7" },
    { key: "F8", label: "F8" },
    { key: "F9", label: "F9" },
    { key: "F10", label: "F10" },
    { key: "F11", label: "F11" },
    { key: "F12", label: "F12" },
    { key: "1", label: "1" },
    { key: "2", label: "2" },
    { key: "3", label: "3" },
    { key: "4", label: "4" },
    { key: "5", label: "5" },
    { key: "6", label: "6" },
    { key: "7", label: "7" },
    { key: "8", label: "8" },
    { key: "9", label: "9" },
    { key: "-", label: "-" },
    { key: "=", label: "=" },
    { key: "[", label: "[" },
    { key: "]", label: "]" },
    { key: "a", label: "A" },
    { key: "b", label: "B" },
    { key: "c", label: "C" },
    { key: "d", label: "D" },
    { key: "e", label: "E" },
    { key: "f", label: "F" },
    { key: "g", label: "G" },
    { key: "h", label: "H" },
    { key: "i", label: "I" },
    { key: "j", label: "J" },
    { key: "k", label: "K" },
    { key: "l", label: "L" },
    { key: "m", label: "M" },
    { key: "n", label: "N" },
    { key: "o", label: "O" },
    { key: "p", label: "P" },
    { key: "q", label: "Q" },
    { key: "r", label: "R" },
    { key: "s", label: "S" },
    { key: "t", label: "T" },
    { key: "u", label: "U" },
    { key: "v", label: "V" },
    { key: "w", label: "W" },
    { key: "x", label: "X" },
    { key: "y", label: "Y" },
    { key: "z", label: "Z" }
  ];
  const settingFieldDefinitions = [
    {
      id: "readingMode",
      control: "drop",
      labelI18nKey: "readingMode",
      tipI18nKey: "readingModeTip",
      modeScope: "both",
      showInTopBar: true,
      showInDialog: false,
      dropKey: "readingModeList"
    },
    {
      id: "lang",
      control: "drop",
      labelI18nKey: "languageSetting",
      tipI18nKey: "languageSettingTip",
      modeScope: "both",
      showInTopBar: true,
      showInDialog: true,
      dialogCategory: "general",
      dropKey: "langList",
      useAbbrName: true
    },
    {
      id: "loadNum",
      control: "num",
      labelI18nKey: "loadNum",
      tipI18nKey: "loadNumTip",
      modeScope: "both",
      showInTopBar: true,
      showInDialog: true,
      dialogCategory: "general",
      numKey: "loadNum",
      min: 1,
      max: 100
    },
    {
      id: "downloadChunkSize",
      control: "num",
      labelI18nKey: "downloadChunkSize",
      tipI18nKey: "downloadChunkSizeTip",
      modeScope: "both",
      showInTopBar: false,
      showInDialog: true,
      dialogCategory: "general",
      numKey: "downloadChunkSize",
      min: 1,
      max: 1e3
    },
    {
      id: "autoRetryByOtherSource",
      control: "switch",
      labelI18nKey: "autoSourceRetry",
      tipI18nKey: "autoSourceRetryTip",
      modeScope: "both",
      showInTopBar: true,
      showInDialog: true,
      dialogCategory: "general"
    },
    {
      id: "magnifierZoom",
      control: "num",
      labelI18nKey: "magnifierZoom",
      tipI18nKey: "magnifierZoomTip",
      modeScope: "both",
      showInTopBar: false,
      showInDialog: true,
      dialogCategory: "general",
      numKey: "magnifierZoom",
      min: 2,
      max: 5
    },
    {
      id: "magnifierAreaSize",
      control: "num",
      labelI18nKey: "magnifierAreaSize",
      tipI18nKey: "magnifierAreaSizeTip",
      modeScope: "both",
      showInTopBar: false,
      showInDialog: true,
      dialogCategory: "general",
      numKey: "magnifierAreaSize",
      min: 20,
      max: 300
    },
    {
      id: "widthScale",
      control: "num",
      labelI18nKey: "widthScale",
      tipI18nKey: "widthScaleTip",
      modeScope: "scroll-only",
      showInTopBar: true,
      showInDialog: true,
      dialogCategory: "scroll",
      numKey: "widthScale",
      min: 30,
      max: 100,
      isFloat: true
    },
    {
      id: "volumeSize",
      control: "num",
      labelI18nKey: "volSize",
      tipI18nKey: "volSizeTip",
      modeScope: "scroll-only",
      showInTopBar: true,
      showInDialog: true,
      dialogCategory: "scroll",
      numKey: "volumeSize",
      min: 1,
      max: 200
    },
    {
      id: "showThumbView",
      control: "switch",
      labelI18nKey: "thumbView",
      tipI18nKey: "thumbViewTip",
      modeScope: "scroll-only",
      showInTopBar: true,
      showInDialog: true,
      dialogCategory: "scroll",
      requireThumbSupportInTopBar: true
    },
    {
      id: "scrollPageMargin",
      control: "num",
      labelI18nKey: "pageMargin",
      tipI18nKey: "pageMarginTip",
      modeScope: "scroll-only",
      showInTopBar: true,
      showInDialog: true,
      dialogCategory: "scroll",
      numKey: "scrollPageMargin",
      min: 0,
      max: 300
    },
    {
      id: "pagesPerScreen",
      control: "num",
      labelI18nKey: "screenSize",
      tipI18nKey: "screenSizeTip",
      modeScope: "book-only",
      showInTopBar: true,
      showInDialog: true,
      dialogCategory: "book",
      numKey: "pagesPerScreen",
      min: 1,
      max: 10
    },
    {
      id: "bookDirection",
      control: "drop",
      labelI18nKey: "bookDirection",
      tipI18nKey: "bookDirectionTip",
      modeScope: "book-only",
      showInTopBar: true,
      showInDialog: true,
      dialogCategory: "book",
      dropKey: "bookDirection",
      useAbbrName: true
    },
    {
      id: "pageTurnAnimationMode",
      control: "drop",
      labelI18nKey: "pageTurnAnimation",
      tipI18nKey: "pageTurnAnimationTip",
      modeScope: "book-only",
      showInTopBar: true,
      showInDialog: true,
      dialogCategory: "book",
      dropKey: "pageTurnAnimation"
    },
    {
      id: "animationSpeed",
      control: "num",
      labelI18nKey: "animationSpeed",
      tipI18nKey: "animationSpeedTip",
      modeScope: "book-only",
      showInTopBar: true,
      showInDialog: true,
      dialogCategory: "book",
      numKey: "animationSpeed",
      min: 0.5,
      max: 3,
      isFloat: true
    },
    {
      id: "showBookPagination",
      control: "switch",
      labelI18nKey: "pagination",
      tipI18nKey: "paginationTip",
      modeScope: "book-only",
      showInTopBar: true,
      showInDialog: true,
      dialogCategory: "book"
    },
    {
      id: "isChangeOddEven",
      control: "switch",
      labelI18nKey: "oddEven",
      tipI18nKey: "oddEvenTip",
      modeScope: "book-only",
      showInTopBar: true,
      showInDialog: true,
      dialogCategory: "book"
    },
    {
      id: "isAutoFlip",
      control: "switch",
      labelI18nKey: "autoFlip",
      tipI18nKey: "autoFlipTip",
      modeScope: "book-only",
      showInTopBar: true,
      showInDialog: true,
      dialogCategory: "book"
    },
    {
      id: "autoFlipFrequency",
      control: "num",
      labelI18nKey: "autoFlipFrequency",
      tipI18nKey: "autoFlipFrequencyTip",
      modeScope: "book-only",
      showInTopBar: true,
      showInDialog: true,
      dialogCategory: "book",
      numKey: "autoFlipFrequency",
      min: 1,
      max: 240
    },
    {
      id: "showBookThumbView",
      control: "switch",
      labelI18nKey: "thumbView",
      tipI18nKey: "thumbViewTip",
      modeScope: "book-only",
      showInTopBar: true,
      showInDialog: true,
      dialogCategory: "book"
    },
    {
      id: "IsReverseBookWheeFliplDirection",
      control: "switch",
      labelI18nKey: "wheelDirection",
      tipI18nKey: "wheelDirectionTip",
      modeScope: "book-only",
      showInTopBar: true,
      showInDialog: true,
      dialogCategory: "book"
    },
    {
      id: "wheelSensitivity",
      control: "num",
      labelI18nKey: "wheelSensitivity",
      tipI18nKey: "wheelSensitivityTip",
      modeScope: "book-only",
      showInTopBar: true,
      showInDialog: true,
      dialogCategory: "book",
      numKey: "wheelSensitivity",
      min: 1,
      max: 250
    }
  ];
  const settingFieldMap = settingFieldDefinitions.reduce((map2, item) => {
    map2[item.id] = item;
    return map2;
  }, {});
  const dialogSettingFieldIds = {
    general: settingFieldDefinitions.filter((item) => item.showInDialog && item.dialogCategory === "general").map((item) => item.id),
    scroll: settingFieldDefinitions.filter((item) => item.showInDialog && item.dialogCategory === "scroll").map((item) => item.id),
    book: settingFieldDefinitions.filter((item) => item.showInDialog && item.dialogCategory === "book").map((item) => item.id)
  };
  const pinnedQuickSettingId$1 = "readingMode";
  const defaultQuickSettingOrder = quickSettingOptions.map((item) => item.id);
  const defaultQuickSettingSelected = [
    "readingMode",
    "widthScale",
    "loadNum",
    "volumeSize",
    "showThumbView",
    "pagesPerScreen",
    "bookDirection",
    "isChangeOddEven",
    "showBookPagination",
    "showBookThumbView",
    "IsReverseBookWheeFliplDirection",
    "lang"
  ];
  function normalizeShortcutToken(raw) {
    if (typeof raw !== "string") {
      return "";
    }
    return raw.trim();
  }
  function normalizeShortcutBindings(raw) {
    const result = __spreadValues({}, defaultShortcutBindings);
    if (!raw || typeof raw !== "object") {
      return result;
    }
    for (const definition of shortcutActionDefinitions) {
      const key = definition.id;
      if (!Object.prototype.hasOwnProperty.call(raw, key)) {
        continue;
      }
      const val = normalizeShortcutToken(raw[key]);
      if (typeof val === "string") {
        result[key] = val;
      }
    }
    return result;
  }
  function normalizePageTurnAnimationMode(value) {
    if (value === "page-flip" || value === "rotate" || value === "slide" || value === "horizontal-slide" || value === "none") {
      return value;
    }
    if (value === "realistic") {
      return "page-flip";
    }
    return defaultPageTurnAnimationMode;
  }
  function getSystemPreferredPageTurnAnimationMode() {
    try {
      if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return "none";
      }
    } catch (e) {
    }
    return defaultPageTurnAnimationMode;
  }
  function readByUserscriptStorage() {
    const gmGetValue = globalThis.GM_getValue;
    if (typeof gmGetValue === "function") {
      return gmGetValue(pageTurnAnimationPreferenceKey, null);
    }
    return null;
  }
  function writeByUserscriptStorage(data) {
    const gmSetValue = globalThis.GM_setValue;
    if (typeof gmSetValue === "function") {
      gmSetValue(pageTurnAnimationPreferenceKey, data);
      return true;
    }
    return false;
  }
  function readByStorageService() {
    try {
      return PlatformService.storageGet(pageTurnAnimationPreferenceKey, null);
    } catch (e) {
      return null;
    }
  }
  function writeByStorageService(data) {
    try {
      return PlatformService.storageSet(pageTurnAnimationPreferenceKey, data);
    } catch (e) {
      return false;
    }
  }
  function parsePageTurnPreference(rawData) {
    if (!rawData) {
      return null;
    }
    if (typeof rawData === "string") {
      try {
        rawData = JSON.parse(rawData);
      } catch (e) {
        return null;
      }
    }
    if (typeof rawData !== "object") {
      return null;
    }
    return {
      schemaVersion: Number(rawData.schemaVersion) || pageTurnAnimationPreferenceSchemaVersion,
      updatedAt: typeof rawData.updatedAt === "string" ? rawData.updatedAt : (/* @__PURE__ */ new Date()).toISOString(),
      scope: "global",
      animationMode: normalizePageTurnAnimationMode(rawData.animationMode)
    };
  }
  function buildPageTurnPreference(mode) {
    return {
      schemaVersion: pageTurnAnimationPreferenceSchemaVersion,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      scope: "global",
      animationMode: mode
    };
  }
  function persistPageTurnAnimationMode(mode) {
    const preference = buildPageTurnPreference(mode);
    const usedUserscriptStorage = writeByUserscriptStorage(preference);
    if (!usedUserscriptStorage) {
      writeByStorageService(preference);
    }
  }
  function readPageTurnAnimationMode() {
    const userscriptStored = parsePageTurnPreference(readByUserscriptStorage());
    if (userscriptStored) {
      return userscriptStored.animationMode;
    }
    const localStored = parsePageTurnPreference(readByStorageService());
    if (localStored) {
      return localStored.animationMode;
    }
    return getSystemPreferredPageTurnAnimationMode();
  }
  function readUnifiedSettingsRaw() {
    const gmGetValue = globalThis.GM_getValue;
    if (typeof gmGetValue === "function") {
      return gmGetValue(unifiedSettingsPreferenceKey, null);
    }
    try {
      return PlatformService.storageGet(unifiedSettingsPreferenceKey, null);
    } catch (e) {
      return null;
    }
  }
  function writeUnifiedSettingsRaw(data) {
    const gmSetValue = globalThis.GM_setValue;
    if (typeof gmSetValue === "function") {
      gmSetValue(unifiedSettingsPreferenceKey, data);
      return;
    }
    try {
      PlatformService.storageSet(unifiedSettingsPreferenceKey, data);
    } catch (e) {
    }
  }
  function sanitizeQuickSettingSelection(rawSelection, rawOrder) {
    const validIds = new Set(quickSettingOptions.map((item) => item.id));
    const orderInput = Array.isArray(rawOrder) ? rawOrder : defaultQuickSettingOrder;
    const selectedInput = Array.isArray(rawSelection) ? rawSelection : defaultQuickSettingSelected;
    const order2 = [];
    for (const id of orderInput) {
      if (typeof id === "string" && validIds.has(id) && !order2.includes(id)) {
        order2.push(id);
      }
    }
    for (const id of defaultQuickSettingOrder) {
      if (!order2.includes(id)) {
        order2.push(id);
      }
    }
    const selected = [];
    for (const id of selectedInput) {
      if (typeof id === "string" && validIds.has(id) && !selected.includes(id)) {
        selected.push(id);
      }
    }
    if (!selected.includes(pinnedQuickSettingId$1)) {
      selected.unshift(pinnedQuickSettingId$1);
    }
    const orderWithoutPinned = order2.filter((id) => id !== pinnedQuickSettingId$1);
    return {
      selected,
      order: [pinnedQuickSettingId$1, ...orderWithoutPinned]
    };
  }
  function parseUnifiedSettingsPreference(rawData) {
    if (!rawData) {
      return null;
    }
    if (typeof rawData === "string") {
      try {
        rawData = JSON.parse(rawData);
      } catch (e) {
        return null;
      }
    }
    if (typeof rawData !== "object") {
      return null;
    }
    const quick = sanitizeQuickSettingSelection(rawData.quickSelection, rawData.quickOrder);
    const schemaVersion = Number(rawData.schemaVersion) || unifiedSettingsPreferenceSchemaVersion;
    const shortcuts = normalizeShortcutBindings(rawData.shortcuts);
    if (schemaVersion < 2 && (!shortcuts.toggleQuickPreview || !shortcuts.toggleQuickPreview.trim())) {
      shortcuts.toggleQuickPreview = defaultShortcutBindings.toggleQuickPreview;
    }
    if (schemaVersion < 3) {
      if (!shortcuts.toggleTopBar || shortcuts.toggleTopBar.trim() === "" || shortcuts.toggleTopBar === "Escape") {
        shortcuts.toggleTopBar = defaultShortcutBindings.toggleTopBar;
      }
      if (!shortcuts.toggleThumbView || shortcuts.toggleThumbView.trim() === "" || shortcuts.toggleThumbView === "~") {
        shortcuts.toggleThumbView = defaultShortcutBindings.toggleThumbView;
      }
    }
    return {
      schemaVersion,
      updatedAt: typeof rawData.updatedAt === "string" ? rawData.updatedAt : (/* @__PURE__ */ new Date()).toISOString(),
      settings: typeof rawData.settings === "object" && rawData.settings ? rawData.settings : {},
      quickSelection: quick.selected,
      quickOrder: quick.order,
      shortcuts
    };
  }
  function persistUnifiedSettingsState() {
    const payload = {
      schemaVersion: unifiedSettingsPreferenceSchemaVersion,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      settings: {
        readingMode: store.readingMode,
        widthScale: store.widthScale,
        loadNum: store.loadNum,
        downloadChunkSize: store.downloadChunkSize,
        volumeSize: store.volumeSize,
        showThumbView: store.showThumbView,
        scrollPageMargin: store.scrollPageMargin,
        pagesPerScreen: store.pagesPerScreen,
        bookDirection: store.bookDirection,
        pageTurnAnimationMode: store.pageTurnAnimationMode,
        showBookPagination: store.showBookPagination,
        isChangeOddEven: store.isChangeOddEven,
        isReverseFlip: store.isReverseFlip,
        isAutoFlip: store.isAutoFlip,
        autoFlipFrequency: store.autoFlipFrequency,
        showBookThumbView: store.showBookThumbView,
        IsReverseBookWheeFliplDirection: store.IsReverseBookWheeFliplDirection,
        wheelSensitivity: store.wheelSensitivity,
        magnifierZoom: store.magnifierZoom,
        magnifierAreaSize: store.magnifierAreaSize,
        lang: lang$1.value,
        autoRetryByOtherSource: store.autoRetryByOtherSource,
        hasShownWelcomeInstruction: store.hasShownWelcomeInstruction,
        hasShownBookInstruction: store.hasShownBookInstruction,
        lastSeenVersionNotice: store.lastSeenVersionNotice,
        lastRemoteUpdateNoticeAt: store.lastRemoteUpdateNoticeAt
      },
      quickSelection: [...store.quickSettingSelected],
      quickOrder: [...store.quickSettingOrder],
      shortcuts: __spreadValues({}, store.shortcutBindings)
    };
    writeUnifiedSettingsRaw(payload);
  }
  function applyUnifiedSettingsPreference() {
    const preference = parseUnifiedSettingsPreference(readUnifiedSettingsRaw());
    if (!preference) {
      store.quickSettingSelected = [...defaultQuickSettingSelected];
      store.quickSettingOrder = [...defaultQuickSettingOrder];
      return;
    }
    const setting = preference.settings || {};
    const numberFields = [
      ["readingMode", "readingMode"],
      ["widthScale", "widthScale"],
      ["loadNum", "loadNum"],
      ["downloadChunkSize", "downloadChunkSize"],
      ["volumeSize", "volumeSize"],
      ["scrollPageMargin", "scrollPageMargin"],
      ["pagesPerScreen", "pagesPerScreen"],
      ["bookDirection", "bookDirection"],
      ["autoFlipFrequency", "autoFlipFrequency"],
      ["wheelSensitivity", "wheelSensitivity"],
      ["magnifierZoom", "magnifierZoom"],
      ["magnifierAreaSize", "magnifierAreaSize"]
    ];
    for (const [sourceKey, targetKey] of numberFields) {
      if (typeof setting[sourceKey] === "number" && Number.isFinite(setting[sourceKey])) {
        store[targetKey] = setting[sourceKey];
      }
    }
    const boolFields = [
      ["showThumbView", "showThumbView"],
      ["showBookPagination", "showBookPagination"],
      ["isChangeOddEven", "isChangeOddEven"],
      ["isReverseFlip", "isReverseFlip"],
      ["isAutoFlip", "isAutoFlip"],
      ["showBookThumbView", "showBookThumbView"],
      ["IsReverseBookWheeFliplDirection", "IsReverseBookWheeFliplDirection"],
      ["autoRetryByOtherSource", "autoRetryByOtherSource"],
      ["hasShownWelcomeInstruction", "hasShownWelcomeInstruction"],
      ["hasShownBookInstruction", "hasShownBookInstruction"]
    ];
    for (const [sourceKey, targetKey] of boolFields) {
      if (typeof setting[sourceKey] === "boolean") {
        store[targetKey] = setting[sourceKey];
      }
    }
    store.pageTurnAnimationMode = normalizePageTurnAnimationMode(setting.pageTurnAnimationMode);
    if (typeof setting.lang === "string" && ["cn", "en", "jp"].includes(setting.lang)) {
      lang$1.value = setting.lang;
    }
    if (typeof setting.hasShownWelcomeInstruction === "boolean") {
      store.hasShownWelcomeInstruction = setting.hasShownWelcomeInstruction;
    } else {
      store.hasShownWelcomeInstruction = false;
    }
    if (typeof setting.hasShownBookInstruction === "boolean") {
      store.hasShownBookInstruction = setting.hasShownBookInstruction;
    } else {
      store.hasShownBookInstruction = false;
    }
    if (typeof setting.lastSeenVersionNotice === "string") {
      store.lastSeenVersionNotice = setting.lastSeenVersionNotice;
    } else {
      store.lastSeenVersionNotice = "";
    }
    if (typeof setting.lastRemoteUpdateNoticeAt === "number" && Number.isFinite(setting.lastRemoteUpdateNoticeAt)) {
      store.lastRemoteUpdateNoticeAt = setting.lastRemoteUpdateNoticeAt;
    } else {
      store.lastRemoteUpdateNoticeAt = 0;
    }
    const quick = sanitizeQuickSettingSelection(preference.quickSelection, preference.quickOrder);
    store.quickSettingSelected = quick.selected;
    store.quickSettingOrder = quick.order;
    store.shortcutBindings = normalizeShortcutBindings(preference.shortcuts);
    persistUnifiedSettingsState();
  }
  function getLayoutModeKey(readingMode) {
    return readingMode === 0 ? "scroll" : "book";
  }
  function syncThumbVisualMetrics(sizePx) {
    store.thumbItemWidth = Math.max(60, Math.round(sizePx));
    store.thumbImgWidth = Math.max(40, Math.round(store.thumbItemWidth * (100 / 150)));
    store.thumbItemHeight = Math.max(64, Math.round(store.thumbItemWidth * (160 / 150)));
  }
  function applyCurrentModeLayoutPreference() {
    const key = getLayoutModeKey(store.readingMode);
    const modeLayout = readerLayoutPreference.layouts[key];
    const slot = normalizeDockSlot(modeLayout.thumbSlot);
    store.thumbDockSlot = slot;
    const clampedSize = clampThumbSize(slot, modeLayout.thumbSizePx);
    store.thumbViewWidth = clampedSize;
    store.thumbViewHeight = clampThumbSize("bottom", modeLayout.thumbSizePx);
    syncThumbVisualMetrics(clampedSize);
  }
  function persistCurrentModeLayoutPreference() {
    const key = getLayoutModeKey(store.readingMode);
    const slot = normalizeDockSlot(store.thumbDockSlot);
    const size = slot === "bottom" ? store.thumbViewHeight : store.thumbViewWidth;
    readerLayoutPreference.layouts[key] = {
      thumbSlot: slot,
      thumbSizePx: clampThumbSize(slot, size),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    readerLayoutPreference.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    readerLayoutPreference = writeLayoutPreference(readerLayoutPreference);
  }
  const computedVisibleQuickSettingIds = computed(() => {
    const selected = new Set(store.quickSettingSelected);
    return store.quickSettingOrder.filter((id) => {
      const item = quickSettingOptions.find((option) => option.id === id);
      if (!item) {
        return false;
      }
      if (!selected.has(id) && !item.fixed) {
        return false;
      }
      if (item.modeScope === "both") {
        return true;
      }
      if (item.modeScope === "scroll-only") {
        return store.readingMode === 0;
      }
      return store.readingMode === 1;
    });
  });
  function getResponsiveDefaults() {
    const width = typeof window !== "undefined" ? window.innerWidth : 1024;
    const isMobile = width < 767;
    return {
      showThumbView: !isMobile,
      showBookThumbView: !isMobile,
      pagesPerScreen: isMobile ? 1 : 2,
      showBookPagination: !isMobile
    };
  }
  const responsiveDefaults = getResponsiveDefaults();
  const store = /* @__PURE__ */ reactive({
    // common
    viewportWidth: 0,
    viewportHeight: 0,
    // env variables
    isSupportThumbView: true,
    // top bar
    showTopBar: false,
    showMoreSettings: false,
    showMoreSettingsDialog: false,
    showThumbExpandDialog: false,
    showDownloadConfirmDialog: false,
    showInstructionDialog: false,
    instructionDialogTitle: "",
    instructionDialogMdText: "",
    instructionDialogCompulsive: false,
    instructionDialogOperations: [],
    instructionDialogStack: [],
    activeSettingsCategory: "general",
    topBarHeight: 40,
    // px, for calc
    readingMode: 0,
    // 0: scroll, 1: book
    widthScale: 80,
    // percent, the scale of img
    loadNum: 3,
    // the sum of pages per loading
    downloadChunkSize: 200,
    volumeSize: 100,
    // default 10, the page quantity per volume
    showThumbView: responsiveDefaults.showThumbView,
    bookDirection: 0,
    // 0: RTL, 1: LTR
    showBookPagination: responsiveDefaults.showBookPagination,
    // show/hide bottom floating pagination bar
    isChangeOddEven: false,
    isReverseFlip: false,
    // reverse the page flipping direction
    isAutoFlip: false,
    autoFlipFrequency: 10,
    // sec
    showBookThumbView: responsiveDefaults.showBookThumbView,
    IsReverseBookWheeFliplDirection: false,
    wheelSensitivity: 100,
    scrollPageMargin: 70,
    autoRetryByOtherSource: true,
    magnifierZoom: 3,
    magnifierAreaSize: 80,
    hasShownWelcomeInstruction: false,
    hasShownBookInstruction: false,
    lastSeenVersionNotice: "",
    lastRemoteUpdateNoticeAt: 0,
    quickSettingSelected: [...defaultQuickSettingSelected],
    quickSettingOrder: [...defaultQuickSettingOrder],
    shortcutBindings: __spreadValues({}, defaultShortcutBindings),
    isFactoryResetDialogVisible: false,
    factoryResetStatus: "idle",
    factoryResetErrorMessage: "",
    downloadNotifications: [],
    downloadTaskMap: {},
    // thumbView
    thumbDockSlot: "left",
    thumbViewWidth: 150,
    // px
    thumbViewHeight: 200,
    // px
    thumbItemWidth: 150,
    // px
    thumbItemHeight: 160,
    // px
    thumbImgWidth: 100,
    // px
    thumbExpandSegmentIndex: 0,
    // scroll view
    // volumePreloadCount: 2,
    // book view
    pagesPerScreen: responsiveDefaults.pagesPerScreen,
    // the page quantity per screen
    flipDirection: 0,
    // 0: next, 1: pre (logical direction based on page index)
    physicalFlipDirection: 0,
    // 0: right-to-left motion, 1: left-to-right motion (physical animation direction)
    pageTurnAnimationMode: defaultPageTurnAnimationMode,
    animationSpeed: 1,
    // animation speed multiplier (0.5 = 50% speed, 2.0 = 200% speed)
    // gallery info
    thumbInfos: [],
    imgPageInfos: [],
    pageCount: 0,
    curViewIndex: 0,
    curViewIndexUpdater: "",
    albumTitle: ""
  });
  const computedCurVolNo = computed(() => {
    return Math.ceil((store.curViewIndex + 1) / store.volumeSize);
  });
  const computedVolFirstIndex = computed(() => {
    return (computedCurVolNo.value - 1) * store.volumeSize;
  });
  const computedVolIndex = computed(() => {
    return store.curViewIndex - computedVolFirstIndex.value;
  });
  const computedVolumeSum = computed(() => {
    return Math.ceil(store.pageCount / store.volumeSize);
  });
  const computedVolPageIndexList = computed(() => {
    let result = [];
    const volLastExclusive = computedVolFirstIndex.value + store.volumeSize;
    for (let i2 = computedVolFirstIndex.value; i2 < volLastExclusive && i2 < store.pageCount; i2++) {
      result.push(i2);
    }
    return result;
  });
  const computedVolPreloadPageIndexList = computed(() => {
    let result = [];
    if (computedCurVolNo.value >= computedVolumeSum.value) {
      return result;
    }
    let preloadNum = store.curViewIndex + store.loadNum - (computedVolFirstIndex.value + store.volumeSize);
    if (preloadNum <= 0) {
      return result;
    }
    for (let i2 = 0; i2 < preloadNum; i2++) {
      let index = computedVolFirstIndex.value + store.volumeSize + i2;
      if (index <= store.pageCount - 1) {
        result.push(index);
      }
    }
    return result;
  });
  const computedAlbumViewportWidth = computed(() => {
    const showThumb = store.readingMode == 0 && store.showThumbView || store.readingMode == 1 && store.showBookThumbView;
    if (showThumb && store.thumbDockSlot !== "bottom") {
      return store.viewportWidth - store.thumbViewWidth;
    }
    return store.viewportWidth;
  });
  const computedAlbumViewportHeight = computed(() => {
    const showThumb = store.readingMode == 0 && store.showThumbView || store.readingMode == 1 && store.showBookThumbView;
    let height = store.viewportHeight;
    if (store.showTopBar) {
      height -= store.topBarHeight;
    }
    if (showThumb && store.thumbDockSlot === "bottom") {
      height -= store.thumbViewHeight;
    }
    return height;
  });
  const computedAlbumViewportRatio = computed(() => {
    return computedAlbumViewportHeight.value / computedAlbumViewportWidth.value;
  });
  const settingConf = {
    readingModeList: [
      { i18nKey: "scrollMode", val: 0 },
      { i18nKey: "bookMode", val: 1 }
    ],
    widthScale: {
      list: [40, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
      suffix: "%"
    },
    loadNum: {
      list: [1, 2, 3, 5, 10, 20, 30, 40, 50, 100],
      suffix: "P"
    },
    downloadChunkSize: {
      list: [50, 100, 150, 200, 300, 500],
      suffix: "P"
    },
    volumeSize: {
      list: [10, 20, 30, 50, 100],
      suffix: "P"
    },
    pagesPerScreen: {
      list: [1, 2, 3, 4, 5],
      suffix: "P"
    },
    bookDirection: {
      list: [
        { i18nKey: "rtl", abbrI18nKey: "rtlAbbr", val: 0 },
        { i18nKey: "ltr", abbrI18nKey: "ltrAbbr", val: 1 }
      ]
    },
    pageTurnAnimation: {
      list: [
        { i18nKey: "pageTurnAnimationHorizontalSlide", val: "horizontal-slide" },
        { i18nKey: "pageTurnAnimationPageFlip", val: "page-flip" },
        { i18nKey: "pageTurnAnimationRotate", val: "rotate" },
        { i18nKey: "pageTurnAnimationSlide", val: "slide" },
        { i18nKey: "pageTurnAnimationNone", val: "none" }
      ]
    },
    animationSpeed: {
      list: [0.5, 0.75, 1, 1.25, 1.5, 2],
      suffix: "x"
    },
    autoFlipFrequency: {
      list: [3, 5, 8, 10, 15, 20, 30, 45, 60],
      suffix: " sec"
    },
    wheelSensitivity: {
      list: [10, 30, 50, 80, 100, 120, 150, 170, 200, 220, 250]
    },
    magnifierZoom: {
      list: [2, 3, 4, 5],
      suffix: "x"
    },
    magnifierAreaSize: {
      list: [50, 80, 120, 150],
      suffix: "px"
    },
    scrollPageMargin: {
      list: [0, 30, 70, 100, 150],
      suffix: "px"
    },
    langList: [
      { name: "English", abbrName: "EN", val: "en" },
      { name: "简体中文", abbrName: "CN", val: "cn" },
      { name: "日本語", abbrName: "JP", val: "jp" }
    ]
  };
  const storeAction = {
    toggleShowMoreSettings: () => {
      storeAction.toggleShowMoreSettingsDialog();
    },
    toggleShowMoreSettingsDialog: () => {
      store.showMoreSettingsDialog = !store.showMoreSettingsDialog;
      if (store.showMoreSettingsDialog) {
        store.activeSettingsCategory = "general";
      }
    },
    openMoreSettingsDialog: () => {
      store.showMoreSettingsDialog = true;
      store.activeSettingsCategory = "general";
    },
    closeMoreSettingsDialog: () => {
      store.showMoreSettingsDialog = false;
    },
    openThumbExpandDialog: () => {
      store.thumbExpandSegmentIndex = getThumbExpandSegmentByPage(store.curViewIndex);
      store.showThumbExpandDialog = true;
    },
    closeThumbExpandDialog: () => {
      store.showThumbExpandDialog = false;
    },
    openDownloadConfirmDialog: () => {
      store.showDownloadConfirmDialog = true;
    },
    closeDownloadConfirmDialog: () => {
      store.showDownloadConfirmDialog = false;
    },
    openInstructionDialog: (payload) => {
      store.instructionDialogStack.push(createInstructionDialogEntry(payload));
      syncInstructionDialogState();
    },
    closeInstructionDialog: (dialogId) => {
      if (dialogId) {
        const index = store.instructionDialogStack.findIndex((dialog) => dialog.id === dialogId);
        if (index >= 0) {
          store.instructionDialogStack.splice(index, 1);
        }
      } else {
        store.instructionDialogStack.pop();
      }
      syncInstructionDialogState();
      if (!store.showInstructionDialog) {
        checkInstructions();
      }
    },
    openWelcomeInstructionDialog: () => {
      openWelcomeInstructionDialog(false);
    },
    markWelcomeInstructionShown: () => {
      store.hasShownWelcomeInstruction = true;
      persistUnifiedSettingsState();
    },
    markBookInstructionShown: () => {
      store.hasShownBookInstruction = true;
      persistUnifiedSettingsState();
    },
    markVersionNoticeSeen: (version2) => {
      store.lastSeenVersionNotice = version2;
      persistUnifiedSettingsState();
    },
    markRemoteUpdateNoticeShown: (timestamp) => {
      store.lastRemoteUpdateNoticeAt = timestamp;
      persistUnifiedSettingsState();
    },
    setThumbExpandSegmentIndex: (segmentIndex) => {
      store.thumbExpandSegmentIndex = clampThumbExpandSegmentIndex(segmentIndex, store.pageCount);
    },
    setActiveSettingsCategory: (val) => {
      store.activeSettingsCategory = val;
    },
    toggleShowTopBar: () => {
      store.showTopBar = !store.showTopBar;
    },
    setTopBar: (val) => {
      store.showTopBar = val;
    },
    setReadingMode: (val) => {
      store.readingMode = val;
      applyCurrentModeLayoutPreference();
      resetAutoFlipTimer();
      checkInstructions();
      persistUnifiedSettingsState();
    },
    setThumbDockSlot: (slot) => {
      const normalized = normalizeDockSlot(slot);
      const previous = store.thumbDockSlot;
      store.thumbDockSlot = normalized;
      if (normalized === "bottom") {
        store.thumbViewHeight = clampThumbSize("bottom", previous === "bottom" ? store.thumbViewHeight : store.thumbViewWidth);
        syncThumbVisualMetrics(store.thumbViewHeight);
      } else {
        store.thumbViewWidth = clampThumbSize(normalized, previous === "bottom" ? store.thumbViewHeight : store.thumbViewWidth);
        syncThumbVisualMetrics(store.thumbViewWidth);
      }
      persistCurrentModeLayoutPreference();
    },
    setThumbPanelSize: (val) => {
      if (store.thumbDockSlot === "bottom") {
        store.thumbViewHeight = clampThumbSize("bottom", val);
        syncThumbVisualMetrics(store.thumbViewHeight);
      } else {
        store.thumbViewWidth = clampThumbSize(store.thumbDockSlot, val);
        syncThumbVisualMetrics(store.thumbViewWidth);
      }
      persistCurrentModeLayoutPreference();
    },
    setWidthScale: (val) => {
      store.widthScale = val;
      persistUnifiedSettingsState();
    },
    setLoadNum: (val) => {
      store.loadNum = val;
      persistUnifiedSettingsState();
    },
    setDownloadChunkSize: (val) => {
      if (!Number.isFinite(val) || val <= 0) {
        store.downloadChunkSize = 200;
      } else {
        store.downloadChunkSize = Math.floor(val);
      }
      persistUnifiedSettingsState();
    },
    setVolumeSize: (val) => {
      store.volumeSize = val;
      persistUnifiedSettingsState();
    },
    toggleShowThumbView: () => {
      store.showThumbView = !store.showThumbView;
      persistUnifiedSettingsState();
    },
    setPagesPerScreen: (val) => {
      store.pagesPerScreen = val;
      persistUnifiedSettingsState();
    },
    setBookDirection: (val) => {
      store.bookDirection = val;
      persistUnifiedSettingsState();
    },
    setPageTurnAnimationMode: (val) => {
      let mode = normalizePageTurnAnimationMode(val);
      store.pageTurnAnimationMode = mode;
      persistPageTurnAnimationMode(mode);
      if (mode === "none") {
        if (bookTurnSettleTimerID) {
          window.clearTimeout(bookTurnSettleTimerID);
        }
        bookTurnSettleTimerID = 0;
        isBookTurning = false;
        pendingBookTurn = null;
      }
      persistUnifiedSettingsState();
    },
    setAnimationSpeed: (val) => {
      store.animationSpeed = val;
      persistUnifiedSettingsState();
    },
    toggleShowBookPagination: () => {
      store.showBookPagination = !store.showBookPagination;
      persistUnifiedSettingsState();
    },
    toggleIsChangeOddEven: () => {
      store.isChangeOddEven = !store.isChangeOddEven;
      persistUnifiedSettingsState();
    },
    toggleOddEvenFromPageMenu: () => {
      store.isChangeOddEven = !store.isChangeOddEven;
      persistUnifiedSettingsState();
    },
    toggleIsReverseFlip: () => {
      store.isReverseFlip = !store.isReverseFlip;
      persistUnifiedSettingsState();
    },
    toggleIsAutoFlip: () => {
      store.isAutoFlip = !store.isAutoFlip;
      resetAutoFlipTimer();
      persistUnifiedSettingsState();
    },
    setAutoFlipFrequency: (val) => {
      store.autoFlipFrequency = val;
      persistUnifiedSettingsState();
    },
    toggleShowBookThumbView: () => {
      store.showBookThumbView = !store.showBookThumbView;
      persistUnifiedSettingsState();
    },
    toggleIsReverseBookWheeFliplDirection: () => {
      store.IsReverseBookWheeFliplDirection = !store.IsReverseBookWheeFliplDirection;
      persistUnifiedSettingsState();
    },
    setWheelSensitivity: (val) => {
      store.wheelSensitivity = val;
      persistUnifiedSettingsState();
    },
    setScrollPageMargin: (val) => {
      store.scrollPageMargin = val;
      persistUnifiedSettingsState();
    },
    setMagnifierZoom: (val) => {
      store.magnifierZoom = Math.max(2, Math.min(5, Math.round(val)));
      persistUnifiedSettingsState();
    },
    setMagnifierAreaSize: (val) => {
      store.magnifierAreaSize = Math.max(20, Math.min(300, Math.round(val)));
      persistUnifiedSettingsState();
    },
    setLang: (val) => {
      lang$1.value = val;
      persistUnifiedSettingsState();
    },
    setAutoRetryByOtherSource: (val) => {
      store.autoRetryByOtherSource = val;
      persistUnifiedSettingsState();
    },
    setShortcutBinding: (id, val) => {
      store.shortcutBindings[id] = normalizeShortcutToken(val);
      persistUnifiedSettingsState();
    },
    resetShortcutBindings: () => {
      store.shortcutBindings = __spreadValues({}, defaultShortcutBindings);
      persistUnifiedSettingsState();
    },
    isQuickSettingSelected: (id) => {
      return store.quickSettingSelected.includes(id);
    },
    toggleQuickSettingSelection: (id) => {
      if (id === pinnedQuickSettingId$1) {
        return;
      }
      let index = store.quickSettingSelected.indexOf(id);
      if (index >= 0) {
        store.quickSettingSelected.splice(index, 1);
      } else {
        store.quickSettingSelected.push(id);
      }
      if (!store.quickSettingSelected.includes(pinnedQuickSettingId$1)) {
        store.quickSettingSelected.unshift(pinnedQuickSettingId$1);
      }
      persistUnifiedSettingsState();
    },
    moveQuickSettingItem: (id, targetIndex) => {
      if (id === pinnedQuickSettingId$1) {
        return;
      }
      let from = store.quickSettingOrder.indexOf(id);
      if (from < 0) {
        return;
      }
      const withoutPinned = store.quickSettingOrder.filter((item) => item !== pinnedQuickSettingId$1);
      const currentIndex = withoutPinned.indexOf(id);
      if (currentIndex < 0) {
        return;
      }
      const boundedTarget = Math.max(0, Math.min(targetIndex, withoutPinned.length - 1));
      if (boundedTarget === currentIndex) {
        return;
      }
      withoutPinned.splice(currentIndex, 1);
      withoutPinned.splice(boundedTarget, 0, id);
      store.quickSettingOrder = [pinnedQuickSettingId$1, ...withoutPinned];
      persistUnifiedSettingsState();
    },
    showFactoryResetDialog: () => {
      store.isFactoryResetDialogVisible = true;
      store.factoryResetStatus = "confirming";
      store.factoryResetErrorMessage = "";
    },
    hideFactoryResetDialog: () => {
      store.isFactoryResetDialogVisible = false;
      if (store.factoryResetStatus === "confirming") {
        store.factoryResetStatus = "idle";
      }
    },
    runFactoryReset: () => {
      try {
        store.factoryResetStatus = "running";
        store.factoryResetErrorMessage = "";
        localStorage.clear();
        window.location.reload();
      } catch (e) {
        store.factoryResetStatus = "failed";
        store.factoryResetErrorMessage = "Factory reset failed";
      }
    },
    setCurViewIndex: (val, updater2) => {
      const resolveBookTarget = (target2) => {
        if (store.readingMode !== 1) {
          return target2;
        }
        const step = Math.max(1, store.pagesPerScreen);
        const delta2 = target2 - store.curViewIndex;
        if (Math.abs(delta2) !== step) {
          return target2;
        }
        return getAdjacentBookPageIndex({
          pageCount: store.pageCount,
          pagesPerScreen: store.pagesPerScreen,
          isChangeOddEven: store.isChangeOddEven
        }, store.curViewIndex, delta2 > 0 ? 1 : -1);
      };
      const applyCurViewIndex = (target2, targetUpdater) => {
        if (target2 == store.curViewIndex) {
          return;
        }
        let result = store.curViewIndex;
        if (target2 < 0) {
          result = 0;
        } else if (target2 >= store.pageCount) {
          result = store.pageCount - 1;
        } else {
          result = target2;
        }
        if (result > store.curViewIndex) {
          store.flipDirection = 0;
        } else if (result < store.curViewIndex) {
          store.flipDirection = 1;
        }
        store.curViewIndex = result;
        if (targetUpdater) {
          store.curViewIndexUpdater = targetUpdater;
        }
        resetAutoFlipTimer();
      };
      const getBookTurnDuration = () => {
        let baseDuration = 0;
        switch (store.pageTurnAnimationMode) {
          case "none":
            return 0;
          case "slide":
          case "horizontal-slide":
          case "page-flip":
          case "rotate":
            baseDuration = 700;
            break;
          default:
            baseDuration = 700;
            break;
        }
        return Math.round(baseDuration / store.animationSpeed);
      };
      const settleBookTurn = () => {
        if (!pendingBookTurn) {
          isBookTurning = false;
          bookTurnSettleTimerID = 0;
          return;
        }
        let nextTurn = pendingBookTurn;
        pendingBookTurn = null;
        applyCurViewIndex(nextTurn.val, nextTurn.updater);
        let duration = getBookTurnDuration();
        if (duration <= 0) {
          settleBookTurn();
          return;
        }
        bookTurnSettleTimerID = window.setTimeout(settleBookTurn, duration);
      };
      if (store.readingMode == 1 && store.pageTurnAnimationMode !== "none") {
        if (isBookTurning) {
          if (bookTurnSettleTimerID) {
            window.clearTimeout(bookTurnSettleTimerID);
            bookTurnSettleTimerID = 0;
          }
          pendingBookTurn = null;
        }
        isBookTurning = true;
        applyCurViewIndex(resolveBookTarget(val), updater2);
        let duration = getBookTurnDuration();
        if (duration <= 0) {
          settleBookTurn();
        } else {
          bookTurnSettleTimerID = window.setTimeout(settleBookTurn, duration);
        }
        return;
      }
      if (bookTurnSettleTimerID) {
        window.clearTimeout(bookTurnSettleTimerID);
        bookTurnSettleTimerID = 0;
      }
      isBookTurning = false;
      pendingBookTurn = null;
      applyCurViewIndex(resolveBookTarget(val), updater2);
    },
    setThumbInfos: (val) => {
      store.thumbInfos = val;
    },
    setImgPageInfos: (val) => {
      store.imgPageInfos = val;
    },
    setImgPageInfoSrc: (index, val) => {
      if (index < store.imgPageInfos.length) {
        store.imgPageInfos[index].src = val;
      }
    },
    setThumbInfoDecodedSource: (index, src, ratio2) => {
      if (index >= store.thumbInfos.length) {
        return;
      }
      store.thumbInfos[index].src = src;
      if (ratio2 && Number.isFinite(ratio2) && ratio2 > 0) {
        const thumbnailHeight = 140;
        store.thumbInfos[index].height = thumbnailHeight;
        store.thumbInfos[index].width = Math.max(1, Math.round(thumbnailHeight / ratio2));
      }
    },
    setImgPageInfoPreciseHeightOfWidth: (index, val) => {
      if (index < store.imgPageInfos.length) {
        store.imgPageInfos[index].preciseHeightOfWidth = val;
      }
    },
    setViewportWidth: (val) => {
      store.viewportWidth = val;
    },
    setViewportHeight: (val) => {
      store.viewportHeight = val;
    },
    getAlbumService: () => {
      return runtimeAlbumService;
    },
    startDownloadTask: (taskId, albumTitle, totalPages) => {
      const now2 = (/* @__PURE__ */ new Date()).toISOString();
      const terminateAction = {
        id: `terminate-${taskId}`,
        label: i18n.value.terminate,
        variant: "danger",
        onClick: () => {
          const runner = downloadRunnerMap[taskId];
          if (runner) {
            runner.abort(taskId);
          }
        }
      };
      store.downloadTaskMap[taskId] = {
        taskId,
        albumTitle,
        totalPages,
        processedPages: 0,
        failedPages: 0,
        status: "queued",
        actions: [terminateAction],
        createdAt: now2,
        updatedAt: now2
      };
    },
    registerDownloadRunner: (taskId, runner) => {
      downloadRunnerMap[taskId] = runner;
    },
    clearDownloadRunner: (taskId) => {
      delete downloadRunnerMap[taskId];
    },
    applyDownloadStatusEvent: (taskId, albumTitle, event) => {
      const now2 = (/* @__PURE__ */ new Date()).toISOString();
      if (!store.downloadTaskMap[taskId]) {
        storeAction.startDownloadTask(taskId, albumTitle, event.totalPages);
      }
      const task = store.downloadTaskMap[taskId];
      task.status = event.phase;
      task.processedPages = event.processedPages;
      task.failedPages = event.failedPages;
      task.totalPages = event.totalPages;
      task.updatedAt = now2;
      const notificationId = `download:${taskId}`;
      const index = store.downloadNotifications.findIndex((item) => item.notificationId === notificationId);
      const payload = {
        notificationId,
        taskId,
        title: albumTitle,
        phase: event.phase,
        severity: event.severity,
        message: event.message,
        progressCurrent: event.processedPages,
        progressTotal: event.totalPages,
        actions: ["completed", "failed", "partial"].includes(event.phase) ? [] : task.actions,
        createdAt: index >= 0 ? store.downloadNotifications[index].createdAt : now2,
        updatedAt: now2
      };
      if (index >= 0) {
        store.downloadNotifications[index] = payload;
        return;
      }
      store.downloadNotifications.unshift(payload);
    },
    dismissDownloadNotification: (notificationId) => {
      const index = store.downloadNotifications.findIndex((item) => item.notificationId === notificationId);
      if (index >= 0) {
        store.downloadNotifications.splice(index, 1);
      }
    },
    triggerDownloadNotificationAction: (notificationId, actionId) => {
      const notification = store.downloadNotifications.find((item) => item.notificationId === notificationId);
      if (!notification || !notification.actions) {
        return;
      }
      const action = notification.actions.find((item) => item.id === actionId);
      if (action && action.onClick) {
        action.onClick(notification);
      }
    },
    getImgPageInfo: (val) => {
      return store.imgPageInfos[val];
    },
    getImgPageHeightOfWidth: (val) => {
      let info = storeAction.getImgPageInfo(val);
      if (info.preciseHeightOfWidth) {
        return info.preciseHeightOfWidth;
      }
      return info.heightOfWidth;
    }
  };
  let isInited = false;
  function init(albumService) {
    if (isInited) {
      return;
    }
    store.pageCount = albumService.getPageCount();
    runtimeAlbumService = albumService;
    let thumbInfos = albumService.getThumbInfos(false);
    store.thumbInfos = JSON.parse(JSON.stringify(thumbInfos));
    let imgPageInfos = albumService.getImgPageInfos();
    store.imgPageInfos = JSON.parse(JSON.stringify(imgPageInfos));
    store.albumTitle = albumService.getTitle();
    store.curViewIndex = albumService.getCurPageIndex();
    store.pageTurnAnimationMode = readPageTurnAnimationMode();
    applyUnifiedSettingsPreference();
    readerLayoutPreference = readLayoutPreference();
    applyCurrentModeLayoutPreference();
    initViewportSizeUpdater();
    initKeyboardListener();
    resetAutoFlipTimer();
    checkInstructions();
    checkVersion();
    isInited = true;
  }
  watch(() => lang$1.value, () => {
    persistUnifiedSettingsState();
  });
  const _hoisted_1$v = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  };
  function render$a(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$v, [..._cache[0] || (_cache[0] = [
      createBaseVNode("path", {
        fill: "none",
        d: "M0 0h24v24H0z"
      }, null, -1),
      createBaseVNode("path", { d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z" }, null, -1)
    ])]);
  }
  const MenuIcon = { render: render$a };
  const _hoisted_1$u = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  };
  function render$9(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$u, [..._cache[0] || (_cache[0] = [
      createBaseVNode("path", {
        fill: "none",
        d: "M0 0h24v24H0z"
      }, null, -1),
      createBaseVNode("path", { d: "M12 5.83 15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15z" }, null, -1)
    ])]);
  }
  const ExpandIcon = { render: render$9 };
  const _hoisted_1$t = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  };
  function render$8(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$t, [..._cache[0] || (_cache[0] = [
      createBaseVNode("path", { d: "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }, null, -1),
      createBaseVNode("path", {
        fill: "none",
        d: "M0 0h24v24H0z"
      }, null, -1)
    ])]);
  }
  const CloseIcon = { render: render$8 };
  const _hoisted_1$s = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  };
  function render$7(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$s, [..._cache[0] || (_cache[0] = [
      createBaseVNode("path", { d: "m15.41 16.09-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" }, null, -1),
      createBaseVNode("path", {
        fill: "none",
        d: "M0-.5h24v24H0z"
      }, null, -1)
    ])]);
  }
  const LeftArrowIcon = { render: render$7 };
  const _hoisted_1$r = {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24"
  };
  function render$6(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$r, [..._cache[0] || (_cache[0] = [
      createBaseVNode("path", { d: "M6 20q-.825 0-1.412-.587Q4 18.825 4 18t.588-1.413Q5.175 16 6 16t1.412.587Q8 17.175 8 18t-.588 1.413Q6.825 20 6 20m6 0q-.825 0-1.412-.587Q10 18.825 10 18t.588-1.413Q11.175 16 12 16t1.413.587Q14 17.175 14 18t-.587 1.413Q12.825 20 12 20m6 0q-.825 0-1.413-.587Q16 18.825 16 18t.587-1.413Q17.175 16 18 16t1.413.587Q20 17.175 20 18t-.587 1.413Q18.825 20 18 20M6 14q-.825 0-1.412-.588Q4 12.825 4 12t.588-1.413Q5.175 10 6 10t1.412.587Q8 11.175 8 12t-.588 1.412Q6.825 14 6 14m6 0q-.825 0-1.412-.588Q10 12.825 10 12t.588-1.413Q11.175 10 12 10t1.413.587T14 12q0 .825-.587 1.412Q12.825 14 12 14m6 0q-.825 0-1.413-.588Q16 12.825 16 12t.587-1.413Q17.175 10 18 10t1.413.587Q20 11.175 20 12t-.587 1.412Q18.825 14 18 14M6 8q-.825 0-1.412-.588Q4 6.825 4 6t.588-1.412Q5.175 4 6 4t1.412.588Q8 5.175 8 6t-.588 1.412Q6.825 8 6 8m6 0q-.825 0-1.412-.588Q10 6.825 10 6t.588-1.412Q11.175 4 12 4t1.413.588Q14 5.175 14 6t-.587 1.412Q12.825 8 12 8m6 0q-.825 0-1.413-.588Q16 6.825 16 6t.587-1.412Q17.175 4 18 4t1.413.588Q20 5.175 20 6t-.587 1.412Q18.825 8 18 8" }, null, -1)
    ])]);
  }
  const AppsIcon = { render: render$6 };
  const _hoisted_1$q = {
    xmlns: "http://www.w3.org/2000/svg",
    width: "48",
    height: "48"
  };
  function render$5(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$q, [..._cache[0] || (_cache[0] = [
      createBaseVNode("path", { d: "M24 40q-1 0-1.7-.7t-.7-1.7.7-1.7 1.7-.7 1.7.7.7 1.7-.7 1.7-1.7.7m0-13.6q-1 0-1.7-.7t-.7-1.7.7-1.7 1.7-.7 1.7.7.7 1.7-.7 1.7-1.7.7m0-13.6q-1 0-1.7-.7t-.7-1.7.7-1.7T24 8t1.7.7.7 1.7-.7 1.7-1.7.7" }, null, -1)
    ])]);
  }
  const MoreVertIcon = { render: render$5 };
  const _hoisted_1$p = {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: "#1f1f1f",
    viewBox: "0 -960 960 960"
  };
  function render$4(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$p, [..._cache[0] || (_cache[0] = [
      createBaseVNode("path", { d: "M480-160q-33 0-56.5-23.5T400-240t23.5-56.5T480-320t56.5 23.5T560-240t-23.5 56.5T480-160m0-240q-33 0-56.5-23.5T400-480t23.5-56.5T480-560t56.5 23.5T560-480t-23.5 56.5T480-400m0-240q-33 0-56.5-23.5T400-720t23.5-56.5T480-800t56.5 23.5T560-720t-23.5 56.5T480-640" }, null, -1)
    ])]);
  }
  const MoreIcon = { render: render$4 };
  const _hoisted_1$o = {
    xmlns: "http://www.w3.org/2000/svg",
    width: "48",
    height: "48",
    viewBox: "0 -960 960 960"
  };
  function render$3(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$o, [..._cache[0] || (_cache[0] = [
      createBaseVNode("path", { d: "M200-200v-60h560v60zm9-152 271-408 271 408zm110-60h322L480-650z" }, null, -1)
    ])]);
  }
  const EjectIcon = { render: render$3 };
  const _sfc_main$v = /* @__PURE__ */ defineComponent({
    __name: "CircleIconButton",
    props: {
      iconType: String,
      // menu/close/expand/up_arrow/apps/more_vert/more/eject
      size: String,
      // normal, big
      rotate: {
        type: Boolean,
        default: true
      }
    },
    emits: ["click"],
    setup(__props) {
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", {
          class: normalizeClass(["circle-icon-button", { "big": __props.size == "big" }]),
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click"))
        }, [
          __props.iconType == "menu" ? (openBlock(), createBlock(unref(MenuIcon), {
            key: 0,
            class: normalizeClass({ rotate: __props.rotate })
          }, null, 8, ["class"])) : createCommentVNode("", true),
          __props.iconType == "close" ? (openBlock(), createBlock(unref(CloseIcon), {
            key: 1,
            class: normalizeClass({ rotate: __props.rotate })
          }, null, 8, ["class"])) : createCommentVNode("", true),
          __props.iconType == "expand" ? (openBlock(), createBlock(unref(ExpandIcon), {
            key: 2,
            class: normalizeClass({ rotate: __props.rotate })
          }, null, 8, ["class"])) : createCommentVNode("", true),
          __props.iconType == "up_arrow" ? (openBlock(), createBlock(unref(LeftArrowIcon), {
            key: 3,
            class: "rotate90"
          })) : createCommentVNode("", true),
          __props.iconType == "apps" ? (openBlock(), createBlock(unref(AppsIcon), { key: 4 })) : createCommentVNode("", true),
          __props.iconType == "more_vert" ? (openBlock(), createBlock(unref(MoreVertIcon), { key: 5 })) : createCommentVNode("", true),
          __props.iconType == "more" ? (openBlock(), createBlock(unref(MoreIcon), { key: 6 })) : createCommentVNode("", true),
          __props.iconType == "eject" ? (openBlock(), createBlock(unref(EjectIcon), {
            key: 7,
            class: normalizeClass({ "rotate180": !__props.rotate })
          }, null, 8, ["class"])) : createCommentVNode("", true)
        ], 2);
      };
    }
  });
  const _export_sfc = (sfc, props) => {
    const target2 = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target2[key] = val;
    }
    return target2;
  };
  const CircleIconButton = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["__scopeId", "data-v-2a2205e2"]]);
  const _hoisted_1$n = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  };
  function render$2(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$n, [..._cache[0] || (_cache[0] = [
      createBaseVNode("path", { d: "m7 10 5 5 5-5z" }, null, -1),
      createBaseVNode("path", {
        fill: "none",
        d: "M0 0h24v24H0z"
      }, null, -1)
    ])]);
  }
  const DropDownIcon = { render: render$2 };
  const _sfc_main$u = /* @__PURE__ */ defineComponent({
    __name: "Popover",
    props: {
      active: Boolean,
      customStyle: Object,
      isCloseToRight: Boolean
    },
    emits: ["close"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit2 = __emit;
      const popoverRef = /* @__PURE__ */ ref(null);
      const offsetX = /* @__PURE__ */ ref(0);
      const offsetY = /* @__PURE__ */ ref(0);
      const mergedStyle = computed(() => {
        return __spreadProps(__spreadValues({}, props.customStyle || {}), {
          transform: `translate(${offsetX.value}px, ${offsetY.value}px)`
        });
      });
      function adjustToViewport() {
        const elem = popoverRef.value;
        if (!elem) {
          return;
        }
        const getBoundaryRect = () => {
          let current = elem.parentElement;
          while (current && current !== document.body) {
            const style = window.getComputedStyle(current);
            const hasClipX = style.overflowX !== "visible";
            const hasClipY = style.overflowY !== "visible";
            const hasClip = style.overflow !== "visible" || hasClipX || hasClipY;
            if (hasClip) {
              return current.getBoundingClientRect();
            }
            current = current.parentElement;
          }
          return new DOMRect(0, 0, window.innerWidth, window.innerHeight);
        };
        const rect2 = elem.getBoundingClientRect();
        const boundary = getBoundaryRect();
        const gap2 = 8;
        let dx = 0;
        let dy = 0;
        const maxRight = Math.min(window.innerWidth, boundary.right) - gap2;
        const minLeft = Math.max(0, boundary.left) + gap2;
        const maxBottom = Math.min(window.innerHeight, boundary.bottom) - gap2;
        const minTop = Math.max(0, boundary.top) + gap2;
        if (rect2.right > maxRight) {
          dx = maxRight - rect2.right;
        }
        if (rect2.left + dx < minLeft) {
          dx += minLeft - (rect2.left + dx);
        }
        if (rect2.bottom > maxBottom) {
          dy = maxBottom - rect2.bottom;
        }
        if (rect2.top + dy < minTop) {
          dy += minTop - (rect2.top + dy);
        }
        offsetX.value = dx;
        offsetY.value = dy;
      }
      function handleOuterClick(e) {
        if (popoverRef.value && e.target instanceof Node && popoverRef.value.contains(e.target)) {
          return;
        }
        emit2("close");
      }
      let timer;
      watch(() => props.active, (newVal, oldVal) => __async(null, null, function* () {
        if (newVal) {
          offsetX.value = 0;
          offsetY.value = 0;
          yield nextTick();
          adjustToViewport();
          timer = setTimeout(() => {
            document.addEventListener("click", handleOuterClick, true);
          }, 100);
        }
        if (oldVal) {
          document.removeEventListener("click", handleOuterClick, true);
          if (timer) {
            clearTimeout(timer);
          }
        }
      }));
      return (_ctx, _cache) => {
        return openBlock(), createBlock(Transition, { name: "slide-fade" }, {
          default: withCtx(() => [
            __props.active ? (openBlock(), createElementBlock("div", {
              key: 0,
              ref_key: "popoverRef",
              ref: popoverRef,
              class: "popover",
              style: normalizeStyle(mergedStyle.value),
              onClick: _cache[0] || (_cache[0] = withModifiers(() => {
              }, ["stop"]))
            }, [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ], 4)) : createCommentVNode("", true)
          ]),
          _: 3
        });
      };
    }
  });
  const Popover = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__scopeId", "data-v-e5801761"]]);
  const _hoisted_1$m = { class: "text clickable no-select" };
  const _hoisted_2$d = { class: "options no-select" };
  const _hoisted_3$a = ["onClick"];
  const _sfc_main$t = /* @__PURE__ */ defineComponent({
    __name: "DropOption",
    props: {
      list: {},
      curVal: {},
      formatCurValByList: { type: Boolean, default: false },
      useAbbrName: { type: Boolean, default: false }
    },
    emits: ["change"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit2 = __emit;
      let active = /* @__PURE__ */ ref(false);
      function onSelect() {
        active.value = !active.value;
      }
      function onClose() {
        active.value = false;
      }
      function onClick(index) {
        onSelect();
        emit2("change", props.list[index].val, index);
      }
      const curValName = computed(() => {
        if (props.formatCurValByList) {
          for (let item of props.list) {
            if (item.val == props.curVal) {
              if (props.useAbbrName && item.abbrI18nKey) {
                return i18n.value[item.abbrI18nKey];
              }
              if (item.i18nKey) {
                return i18n.value[item.i18nKey];
              }
              if (props.useAbbrName && item.abbrName) {
                return item.abbrName;
              }
              return item.name;
            }
          }
        }
        return String(props.curVal);
      });
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", {
          class: "drop-option",
          onClick: onSelect
        }, [
          createBaseVNode("div", _hoisted_1$m, toDisplayString(curValName.value), 1),
          createVNode(unref(DropDownIcon), { class: "icon-drop-down clickable no-select" }),
          createVNode(Popover, {
            active: unref(active),
            "custom-style": { "margin-left": "7px", "margin-top": "4px" },
            onClose
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_2$d, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(__props.list, (item, index) => {
                  return openBlock(), createElementBlock("div", {
                    class: "item",
                    key: item.name || item.i18nKey,
                    onClick: ($event) => onClick(index)
                  }, [
                    createBaseVNode("span", null, toDisplayString(item.i18nKey ? unref(i18n)[item.i18nKey] : item.name), 1)
                  ], 8, _hoisted_3$a);
                }), 128))
              ])
            ]),
            _: 1
          }, 8, ["active"])
        ]);
      };
    }
  });
  const DropOption = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__scopeId", "data-v-da60e7c5"]]);
  const _sfc_main$s = /* @__PURE__ */ defineComponent({
    __name: "FlatButton",
    props: {
      label: {
        type: String
      },
      mode: {
        // mode: [inline, default]
        type: String,
        default: "default"
      },
      type: {
        // mode: [plain, negative, positive, warning]
        type: String,
        default: "plain"
      }
    },
    emits: ["click"],
    setup(__props, { emit: __emit }) {
      const emit2 = __emit;
      function handleClick(e) {
        emit2("click", e);
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", {
          class: normalizeClass(["flat-button", __props.mode])
        }, [
          createBaseVNode("a", {
            class: normalizeClass([__props.mode, __props.type]),
            onClick: handleClick
          }, toDisplayString(__props.label), 3)
        ], 2);
      };
    }
  });
  const FlatButton = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__scopeId", "data-v-e69ed2a2"]]);
  const _hoisted_1$l = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  };
  function render$1(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$l, [..._cache[0] || (_cache[0] = [
      createBaseVNode("path", { d: "m8.59 16.34 4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" }, null, -1),
      createBaseVNode("path", {
        fill: "none",
        d: "M0-.25h24v24H0z"
      }, null, -1)
    ])]);
  }
  const RightArrowIcon = { render: render$1 };
  const _hoisted_1$k = ["onClick"];
  const _sfc_main$r = {
    __name: "Pagination",
    props: {
      curIndex: Number,
      pageSum: Number
    },
    emits: ["change"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit2 = __emit;
      const pageRange = /* @__PURE__ */ ref(3);
      const pages = computed(() => {
        let list2 = [];
        for (let i2 = 1; i2 <= pageRange.value; i2++) {
          if (props.curIndex - i2 > 0) {
            list2.push(props.curIndex - i2);
          }
        }
        for (let i2 = 1; i2 <= pageRange.value; i2++) {
          if (props.curIndex + i2 < props.pageSum - 1) {
            list2.push(props.curIndex + i2);
          }
        }
        list2.push(0);
        list2.push(props.curIndex);
        list2.push(props.pageSum - 1);
        list2 = [...new Set(list2)].sort((a, b) => {
          return a - b;
        });
        if (list2[1] - list2[0] > 1) {
          let centerNum1 = Math.floor((list2[1] - list2[0]) / 2 + list2[0]);
          list2.unshift(centerNum1);
        }
        if (list2[list2.length - 1] - list2[list2.length - 2] > 1) {
          let centerNum2 = Math.floor((list2[list2.length - 1] - list2[list2.length - 2]) / 2 + list2[list2.length - 2]);
          list2.push(centerNum2);
        }
        return [...new Set(list2)].sort((a, b) => {
          return a - b;
        });
      });
      function showNum(val) {
        if (Math.abs(val - props.curIndex) <= pageRange.value) {
          return val + 1;
        } else if (val === 0 || val === props.pageSum - 1) {
          return val + 1;
        } else {
          return "...";
        }
      }
      function selectPage(n) {
        emit2("change", n);
      }
      function prev() {
        if (props.curIndex !== 0) {
          emit2("change", props.curIndex - 1);
        }
      }
      function next() {
        if (props.curIndex !== props.pageSum - 1) {
          emit2("change", props.curIndex + 1);
        }
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("section", {
          class: "ehunter-pagination",
          onClick: _cache[2] || (_cache[2] = withModifiers(() => {
          }, ["stop"])),
          onTouchstart: _cache[3] || (_cache[3] = withModifiers(() => {
          }, ["stop"])),
          onTouchend: _cache[4] || (_cache[4] = withModifiers(() => {
          }, ["stop"]))
        }, [
          createBaseVNode("div", {
            class: normalizeClass(["item", { disable: __props.curIndex === 0 }]),
            onClick: _cache[0] || (_cache[0] = ($event) => prev())
          }, [
            createVNode(unref(LeftArrowIcon), { class: "icon" })
          ], 2),
          (openBlock(true), createElementBlock(Fragment, null, renderList(pages.value, (n) => {
            return openBlock(), createElementBlock("span", {
              class: normalizeClass(["item", { active: n === __props.curIndex }]),
              key: n,
              onClick: ($event) => selectPage(n)
            }, toDisplayString(showNum(n)), 11, _hoisted_1$k);
          }), 128)),
          createBaseVNode("div", {
            class: normalizeClass(["item", { disable: __props.curIndex === __props.pageSum - 1 }]),
            onClick: _cache[1] || (_cache[1] = ($event) => next())
          }, [
            createVNode(unref(RightArrowIcon), { class: "icon" })
          ], 2)
        ], 32);
      };
    }
  };
  const Pagination = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-c3d57ccd"]]);
  const _sfc_main$q = /* @__PURE__ */ defineComponent({
    __name: "Slider",
    props: {
      min: {},
      max: {},
      step: {},
      init: {}
    },
    emits: ["change"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit2 = __emit;
      const val = /* @__PURE__ */ ref(props.init);
      const isHolding = /* @__PURE__ */ ref(false);
      const oldMouseX = /* @__PURE__ */ ref(0);
      const oldVal = /* @__PURE__ */ ref(0);
      const widthRatio = /* @__PURE__ */ ref(0);
      const slider = /* @__PURE__ */ ref(null);
      const fillScale = computed(() => {
        return (val.value - props.min) / ((props.max - props.min) / 100);
      });
      watch(() => props.init, (newVal) => {
        val.value = newVal;
      });
      function getWidthRatio() {
        return slider.value.offsetWidth / (props.max - props.min);
      }
      function handleClick(e) {
        const x2 = props.min + e.offsetX / getWidthRatio();
        onChange(x2);
      }
      function getValByStep(x2) {
        for (let i2 = props.min; i2 <= props.max; i2 = i2 + props.step) {
          if (i2 > x2) {
            if (i2 === props.min) {
              return Number(i2.toFixed(0));
            } else {
              return Number((i2 - props.step).toFixed(0));
            }
          }
        }
        return props.max;
      }
      function onChange(x2) {
        if (x2 > props.max) {
          val.value = getValByStep(props.max);
        } else {
          val.value = getValByStep(x2 < props.min ? props.min : x2);
        }
        emit2("change", val.value);
      }
      function handleMouseUp(e) {
        isHolding.value = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        e.preventDefault();
      }
      function handleMouseMove(e) {
        if (isHolding.value) {
          const x2 = oldVal.value + (e.clientX - oldMouseX.value) / widthRatio.value;
          onChange(x2);
        }
        e.preventDefault();
      }
      function handleMouseDown(e) {
        isHolding.value = true;
        handleClick(e);
        oldMouseX.value = e.clientX;
        oldVal.value = val.value;
        widthRatio.value = getWidthRatio();
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        e.preventDefault();
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", {
          class: "slider",
          onMousedown: handleMouseDown,
          onClick: handleClick,
          ref_key: "slider",
          ref: slider
        }, [
          _cache[0] || (_cache[0] = createBaseVNode("div", { class: "track" }, null, -1)),
          createBaseVNode("div", {
            class: "fill",
            style: normalizeStyle({ "width": fillScale.value + "%" })
          }, null, 4),
          createBaseVNode("div", {
            class: "thumb",
            style: normalizeStyle({ "left": fillScale.value + "%", "width": isHolding.value ? "15px" : void 0, "height": isHolding.value ? "15px" : void 0 })
          }, null, 4)
        ], 544);
      };
    }
  });
  const Slider = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-5a202c7e"]]);
  function getDefaultExportFromCjs(x2) {
    return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
  }
  function getAugmentedNamespace(n) {
    if (Object.prototype.hasOwnProperty.call(n, "__esModule")) return n;
    var f = n.default;
    if (typeof f == "function") {
      var a = function a2() {
        if (this instanceof a2) {
          return Reflect.construct(f, arguments, this.constructor);
        }
        return f.apply(this, arguments);
      };
      a.prototype = f.prototype;
    } else a = {};
    Object.defineProperty(a, "__esModule", { value: true });
    Object.keys(n).forEach(function(k) {
      var d = Object.getOwnPropertyDescriptor(n, k);
      Object.defineProperty(a, k, d.get ? d : {
        enumerable: true,
        get: function() {
          return n[k];
        }
      });
    });
    return a;
  }
  var utils = {};
  const Aacute = "Á";
  const aacute = "á";
  const Abreve = "Ă";
  const abreve = "ă";
  const ac = "∾";
  const acd = "∿";
  const acE = "∾̳";
  const Acirc = "Â";
  const acirc = "â";
  const acute = "´";
  const Acy = "А";
  const acy = "а";
  const AElig = "Æ";
  const aelig = "æ";
  const af = "⁡";
  const Afr = "𝔄";
  const afr = "𝔞";
  const Agrave = "À";
  const agrave = "à";
  const alefsym = "ℵ";
  const aleph = "ℵ";
  const Alpha = "Α";
  const alpha = "α";
  const Amacr = "Ā";
  const amacr = "ā";
  const amalg = "⨿";
  const amp = "&";
  const AMP = "&";
  const andand = "⩕";
  const And = "⩓";
  const and = "∧";
  const andd = "⩜";
  const andslope = "⩘";
  const andv = "⩚";
  const ang = "∠";
  const ange = "⦤";
  const angle = "∠";
  const angmsdaa = "⦨";
  const angmsdab = "⦩";
  const angmsdac = "⦪";
  const angmsdad = "⦫";
  const angmsdae = "⦬";
  const angmsdaf = "⦭";
  const angmsdag = "⦮";
  const angmsdah = "⦯";
  const angmsd = "∡";
  const angrt = "∟";
  const angrtvb = "⊾";
  const angrtvbd = "⦝";
  const angsph = "∢";
  const angst = "Å";
  const angzarr = "⍼";
  const Aogon = "Ą";
  const aogon = "ą";
  const Aopf = "𝔸";
  const aopf = "𝕒";
  const apacir = "⩯";
  const ap = "≈";
  const apE = "⩰";
  const ape = "≊";
  const apid = "≋";
  const apos = "'";
  const ApplyFunction = "⁡";
  const approx = "≈";
  const approxeq = "≊";
  const Aring = "Å";
  const aring = "å";
  const Ascr = "𝒜";
  const ascr = "𝒶";
  const Assign = "≔";
  const ast = "*";
  const asymp = "≈";
  const asympeq = "≍";
  const Atilde = "Ã";
  const atilde = "ã";
  const Auml = "Ä";
  const auml = "ä";
  const awconint = "∳";
  const awint = "⨑";
  const backcong = "≌";
  const backepsilon = "϶";
  const backprime = "‵";
  const backsim = "∽";
  const backsimeq = "⋍";
  const Backslash = "∖";
  const Barv = "⫧";
  const barvee = "⊽";
  const barwed = "⌅";
  const Barwed = "⌆";
  const barwedge = "⌅";
  const bbrk = "⎵";
  const bbrktbrk = "⎶";
  const bcong = "≌";
  const Bcy = "Б";
  const bcy = "б";
  const bdquo = "„";
  const becaus = "∵";
  const because = "∵";
  const Because = "∵";
  const bemptyv = "⦰";
  const bepsi = "϶";
  const bernou = "ℬ";
  const Bernoullis = "ℬ";
  const Beta = "Β";
  const beta = "β";
  const beth = "ℶ";
  const between = "≬";
  const Bfr = "𝔅";
  const bfr = "𝔟";
  const bigcap = "⋂";
  const bigcirc = "◯";
  const bigcup = "⋃";
  const bigodot = "⨀";
  const bigoplus = "⨁";
  const bigotimes = "⨂";
  const bigsqcup = "⨆";
  const bigstar = "★";
  const bigtriangledown = "▽";
  const bigtriangleup = "△";
  const biguplus = "⨄";
  const bigvee = "⋁";
  const bigwedge = "⋀";
  const bkarow = "⤍";
  const blacklozenge = "⧫";
  const blacksquare = "▪";
  const blacktriangle = "▴";
  const blacktriangledown = "▾";
  const blacktriangleleft = "◂";
  const blacktriangleright = "▸";
  const blank = "␣";
  const blk12 = "▒";
  const blk14 = "░";
  const blk34 = "▓";
  const block$1 = "█";
  const bne = "=⃥";
  const bnequiv = "≡⃥";
  const bNot = "⫭";
  const bnot = "⌐";
  const Bopf = "𝔹";
  const bopf = "𝕓";
  const bot = "⊥";
  const bottom = "⊥";
  const bowtie = "⋈";
  const boxbox = "⧉";
  const boxdl = "┐";
  const boxdL = "╕";
  const boxDl = "╖";
  const boxDL = "╗";
  const boxdr = "┌";
  const boxdR = "╒";
  const boxDr = "╓";
  const boxDR = "╔";
  const boxh = "─";
  const boxH = "═";
  const boxhd = "┬";
  const boxHd = "╤";
  const boxhD = "╥";
  const boxHD = "╦";
  const boxhu = "┴";
  const boxHu = "╧";
  const boxhU = "╨";
  const boxHU = "╩";
  const boxminus = "⊟";
  const boxplus = "⊞";
  const boxtimes = "⊠";
  const boxul = "┘";
  const boxuL = "╛";
  const boxUl = "╜";
  const boxUL = "╝";
  const boxur = "└";
  const boxuR = "╘";
  const boxUr = "╙";
  const boxUR = "╚";
  const boxv = "│";
  const boxV = "║";
  const boxvh = "┼";
  const boxvH = "╪";
  const boxVh = "╫";
  const boxVH = "╬";
  const boxvl = "┤";
  const boxvL = "╡";
  const boxVl = "╢";
  const boxVL = "╣";
  const boxvr = "├";
  const boxvR = "╞";
  const boxVr = "╟";
  const boxVR = "╠";
  const bprime = "‵";
  const breve = "˘";
  const Breve = "˘";
  const brvbar = "¦";
  const bscr = "𝒷";
  const Bscr = "ℬ";
  const bsemi = "⁏";
  const bsim = "∽";
  const bsime = "⋍";
  const bsolb = "⧅";
  const bsol = "\\";
  const bsolhsub = "⟈";
  const bull = "•";
  const bullet = "•";
  const bump = "≎";
  const bumpE = "⪮";
  const bumpe = "≏";
  const Bumpeq = "≎";
  const bumpeq = "≏";
  const Cacute = "Ć";
  const cacute = "ć";
  const capand = "⩄";
  const capbrcup = "⩉";
  const capcap = "⩋";
  const cap = "∩";
  const Cap = "⋒";
  const capcup = "⩇";
  const capdot = "⩀";
  const CapitalDifferentialD = "ⅅ";
  const caps = "∩︀";
  const caret = "⁁";
  const caron = "ˇ";
  const Cayleys = "ℭ";
  const ccaps = "⩍";
  const Ccaron = "Č";
  const ccaron = "č";
  const Ccedil = "Ç";
  const ccedil = "ç";
  const Ccirc = "Ĉ";
  const ccirc = "ĉ";
  const Cconint = "∰";
  const ccups = "⩌";
  const ccupssm = "⩐";
  const Cdot = "Ċ";
  const cdot = "ċ";
  const cedil = "¸";
  const Cedilla = "¸";
  const cemptyv = "⦲";
  const cent = "¢";
  const centerdot = "·";
  const CenterDot = "·";
  const cfr = "𝔠";
  const Cfr = "ℭ";
  const CHcy = "Ч";
  const chcy = "ч";
  const check = "✓";
  const checkmark = "✓";
  const Chi = "Χ";
  const chi = "χ";
  const circ = "ˆ";
  const circeq = "≗";
  const circlearrowleft = "↺";
  const circlearrowright = "↻";
  const circledast = "⊛";
  const circledcirc = "⊚";
  const circleddash = "⊝";
  const CircleDot = "⊙";
  const circledR = "®";
  const circledS = "Ⓢ";
  const CircleMinus = "⊖";
  const CirclePlus = "⊕";
  const CircleTimes = "⊗";
  const cir = "○";
  const cirE = "⧃";
  const cire = "≗";
  const cirfnint = "⨐";
  const cirmid = "⫯";
  const cirscir = "⧂";
  const ClockwiseContourIntegral = "∲";
  const CloseCurlyDoubleQuote = "”";
  const CloseCurlyQuote = "’";
  const clubs = "♣";
  const clubsuit = "♣";
  const colon = ":";
  const Colon = "∷";
  const Colone = "⩴";
  const colone = "≔";
  const coloneq = "≔";
  const comma = ",";
  const commat = "@";
  const comp = "∁";
  const compfn = "∘";
  const complement = "∁";
  const complexes = "ℂ";
  const cong = "≅";
  const congdot = "⩭";
  const Congruent = "≡";
  const conint = "∮";
  const Conint = "∯";
  const ContourIntegral = "∮";
  const copf = "𝕔";
  const Copf = "ℂ";
  const coprod = "∐";
  const Coproduct = "∐";
  const copy = "©";
  const COPY = "©";
  const copysr = "℗";
  const CounterClockwiseContourIntegral = "∳";
  const crarr = "↵";
  const cross = "✗";
  const Cross = "⨯";
  const Cscr = "𝒞";
  const cscr = "𝒸";
  const csub = "⫏";
  const csube = "⫑";
  const csup = "⫐";
  const csupe = "⫒";
  const ctdot = "⋯";
  const cudarrl = "⤸";
  const cudarrr = "⤵";
  const cuepr = "⋞";
  const cuesc = "⋟";
  const cularr = "↶";
  const cularrp = "⤽";
  const cupbrcap = "⩈";
  const cupcap = "⩆";
  const CupCap = "≍";
  const cup = "∪";
  const Cup = "⋓";
  const cupcup = "⩊";
  const cupdot = "⊍";
  const cupor = "⩅";
  const cups = "∪︀";
  const curarr = "↷";
  const curarrm = "⤼";
  const curlyeqprec = "⋞";
  const curlyeqsucc = "⋟";
  const curlyvee = "⋎";
  const curlywedge = "⋏";
  const curren = "¤";
  const curvearrowleft = "↶";
  const curvearrowright = "↷";
  const cuvee = "⋎";
  const cuwed = "⋏";
  const cwconint = "∲";
  const cwint = "∱";
  const cylcty = "⌭";
  const dagger = "†";
  const Dagger = "‡";
  const daleth = "ℸ";
  const darr = "↓";
  const Darr = "↡";
  const dArr = "⇓";
  const dash = "‐";
  const Dashv = "⫤";
  const dashv = "⊣";
  const dbkarow = "⤏";
  const dblac = "˝";
  const Dcaron = "Ď";
  const dcaron = "ď";
  const Dcy = "Д";
  const dcy = "д";
  const ddagger = "‡";
  const ddarr = "⇊";
  const DD = "ⅅ";
  const dd = "ⅆ";
  const DDotrahd = "⤑";
  const ddotseq = "⩷";
  const deg = "°";
  const Del = "∇";
  const Delta = "Δ";
  const delta = "δ";
  const demptyv = "⦱";
  const dfisht = "⥿";
  const Dfr = "𝔇";
  const dfr = "𝔡";
  const dHar = "⥥";
  const dharl = "⇃";
  const dharr = "⇂";
  const DiacriticalAcute = "´";
  const DiacriticalDot = "˙";
  const DiacriticalDoubleAcute = "˝";
  const DiacriticalGrave = "`";
  const DiacriticalTilde = "˜";
  const diam = "⋄";
  const diamond = "⋄";
  const Diamond = "⋄";
  const diamondsuit = "♦";
  const diams = "♦";
  const die = "¨";
  const DifferentialD = "ⅆ";
  const digamma = "ϝ";
  const disin = "⋲";
  const div = "÷";
  const divide = "÷";
  const divideontimes = "⋇";
  const divonx = "⋇";
  const DJcy = "Ђ";
  const djcy = "ђ";
  const dlcorn = "⌞";
  const dlcrop = "⌍";
  const dollar = "$";
  const Dopf = "𝔻";
  const dopf = "𝕕";
  const Dot = "¨";
  const dot = "˙";
  const DotDot = "⃜";
  const doteq = "≐";
  const doteqdot = "≑";
  const DotEqual = "≐";
  const dotminus = "∸";
  const dotplus = "∔";
  const dotsquare = "⊡";
  const doublebarwedge = "⌆";
  const DoubleContourIntegral = "∯";
  const DoubleDot = "¨";
  const DoubleDownArrow = "⇓";
  const DoubleLeftArrow = "⇐";
  const DoubleLeftRightArrow = "⇔";
  const DoubleLeftTee = "⫤";
  const DoubleLongLeftArrow = "⟸";
  const DoubleLongLeftRightArrow = "⟺";
  const DoubleLongRightArrow = "⟹";
  const DoubleRightArrow = "⇒";
  const DoubleRightTee = "⊨";
  const DoubleUpArrow = "⇑";
  const DoubleUpDownArrow = "⇕";
  const DoubleVerticalBar = "∥";
  const DownArrowBar = "⤓";
  const downarrow = "↓";
  const DownArrow = "↓";
  const Downarrow = "⇓";
  const DownArrowUpArrow = "⇵";
  const DownBreve = "̑";
  const downdownarrows = "⇊";
  const downharpoonleft = "⇃";
  const downharpoonright = "⇂";
  const DownLeftRightVector = "⥐";
  const DownLeftTeeVector = "⥞";
  const DownLeftVectorBar = "⥖";
  const DownLeftVector = "↽";
  const DownRightTeeVector = "⥟";
  const DownRightVectorBar = "⥗";
  const DownRightVector = "⇁";
  const DownTeeArrow = "↧";
  const DownTee = "⊤";
  const drbkarow = "⤐";
  const drcorn = "⌟";
  const drcrop = "⌌";
  const Dscr = "𝒟";
  const dscr = "𝒹";
  const DScy = "Ѕ";
  const dscy = "ѕ";
  const dsol = "⧶";
  const Dstrok = "Đ";
  const dstrok = "đ";
  const dtdot = "⋱";
  const dtri = "▿";
  const dtrif = "▾";
  const duarr = "⇵";
  const duhar = "⥯";
  const dwangle = "⦦";
  const DZcy = "Џ";
  const dzcy = "џ";
  const dzigrarr = "⟿";
  const Eacute = "É";
  const eacute = "é";
  const easter = "⩮";
  const Ecaron = "Ě";
  const ecaron = "ě";
  const Ecirc = "Ê";
  const ecirc = "ê";
  const ecir = "≖";
  const ecolon = "≕";
  const Ecy = "Э";
  const ecy = "э";
  const eDDot = "⩷";
  const Edot = "Ė";
  const edot = "ė";
  const eDot = "≑";
  const ee = "ⅇ";
  const efDot = "≒";
  const Efr = "𝔈";
  const efr = "𝔢";
  const eg = "⪚";
  const Egrave = "È";
  const egrave = "è";
  const egs = "⪖";
  const egsdot = "⪘";
  const el = "⪙";
  const Element$1 = "∈";
  const elinters = "⏧";
  const ell = "ℓ";
  const els = "⪕";
  const elsdot = "⪗";
  const Emacr = "Ē";
  const emacr = "ē";
  const empty = "∅";
  const emptyset = "∅";
  const EmptySmallSquare = "◻";
  const emptyv = "∅";
  const EmptyVerySmallSquare = "▫";
  const emsp13 = " ";
  const emsp14 = " ";
  const emsp = " ";
  const ENG = "Ŋ";
  const eng = "ŋ";
  const ensp = " ";
  const Eogon = "Ę";
  const eogon = "ę";
  const Eopf = "𝔼";
  const eopf = "𝕖";
  const epar = "⋕";
  const eparsl = "⧣";
  const eplus = "⩱";
  const epsi = "ε";
  const Epsilon = "Ε";
  const epsilon = "ε";
  const epsiv = "ϵ";
  const eqcirc = "≖";
  const eqcolon = "≕";
  const eqsim = "≂";
  const eqslantgtr = "⪖";
  const eqslantless = "⪕";
  const Equal = "⩵";
  const equals = "=";
  const EqualTilde = "≂";
  const equest = "≟";
  const Equilibrium = "⇌";
  const equiv = "≡";
  const equivDD = "⩸";
  const eqvparsl = "⧥";
  const erarr = "⥱";
  const erDot = "≓";
  const escr = "ℯ";
  const Escr = "ℰ";
  const esdot = "≐";
  const Esim = "⩳";
  const esim = "≂";
  const Eta = "Η";
  const eta = "η";
  const ETH = "Ð";
  const eth = "ð";
  const Euml = "Ë";
  const euml = "ë";
  const euro = "€";
  const excl = "!";
  const exist = "∃";
  const Exists = "∃";
  const expectation = "ℰ";
  const exponentiale = "ⅇ";
  const ExponentialE = "ⅇ";
  const fallingdotseq = "≒";
  const Fcy = "Ф";
  const fcy = "ф";
  const female = "♀";
  const ffilig = "ﬃ";
  const fflig = "ﬀ";
  const ffllig = "ﬄ";
  const Ffr = "𝔉";
  const ffr = "𝔣";
  const filig = "ﬁ";
  const FilledSmallSquare = "◼";
  const FilledVerySmallSquare = "▪";
  const fjlig = "fj";
  const flat = "♭";
  const fllig = "ﬂ";
  const fltns = "▱";
  const fnof = "ƒ";
  const Fopf = "𝔽";
  const fopf = "𝕗";
  const forall = "∀";
  const ForAll = "∀";
  const fork = "⋔";
  const forkv = "⫙";
  const Fouriertrf = "ℱ";
  const fpartint = "⨍";
  const frac12 = "½";
  const frac13 = "⅓";
  const frac14 = "¼";
  const frac15 = "⅕";
  const frac16 = "⅙";
  const frac18 = "⅛";
  const frac23 = "⅔";
  const frac25 = "⅖";
  const frac34 = "¾";
  const frac35 = "⅗";
  const frac38 = "⅜";
  const frac45 = "⅘";
  const frac56 = "⅚";
  const frac58 = "⅝";
  const frac78 = "⅞";
  const frasl = "⁄";
  const frown = "⌢";
  const fscr = "𝒻";
  const Fscr = "ℱ";
  const gacute = "ǵ";
  const Gamma = "Γ";
  const gamma = "γ";
  const Gammad = "Ϝ";
  const gammad = "ϝ";
  const gap = "⪆";
  const Gbreve = "Ğ";
  const gbreve = "ğ";
  const Gcedil = "Ģ";
  const Gcirc = "Ĝ";
  const gcirc = "ĝ";
  const Gcy = "Г";
  const gcy = "г";
  const Gdot = "Ġ";
  const gdot = "ġ";
  const ge = "≥";
  const gE = "≧";
  const gEl = "⪌";
  const gel = "⋛";
  const geq = "≥";
  const geqq = "≧";
  const geqslant = "⩾";
  const gescc = "⪩";
  const ges = "⩾";
  const gesdot = "⪀";
  const gesdoto = "⪂";
  const gesdotol = "⪄";
  const gesl = "⋛︀";
  const gesles = "⪔";
  const Gfr = "𝔊";
  const gfr = "𝔤";
  const gg = "≫";
  const Gg = "⋙";
  const ggg = "⋙";
  const gimel = "ℷ";
  const GJcy = "Ѓ";
  const gjcy = "ѓ";
  const gla = "⪥";
  const gl = "≷";
  const glE = "⪒";
  const glj = "⪤";
  const gnap = "⪊";
  const gnapprox = "⪊";
  const gne = "⪈";
  const gnE = "≩";
  const gneq = "⪈";
  const gneqq = "≩";
  const gnsim = "⋧";
  const Gopf = "𝔾";
  const gopf = "𝕘";
  const grave = "`";
  const GreaterEqual = "≥";
  const GreaterEqualLess = "⋛";
  const GreaterFullEqual = "≧";
  const GreaterGreater = "⪢";
  const GreaterLess = "≷";
  const GreaterSlantEqual = "⩾";
  const GreaterTilde = "≳";
  const Gscr = "𝒢";
  const gscr = "ℊ";
  const gsim = "≳";
  const gsime = "⪎";
  const gsiml = "⪐";
  const gtcc = "⪧";
  const gtcir = "⩺";
  const gt = ">";
  const GT = ">";
  const Gt = "≫";
  const gtdot = "⋗";
  const gtlPar = "⦕";
  const gtquest = "⩼";
  const gtrapprox = "⪆";
  const gtrarr = "⥸";
  const gtrdot = "⋗";
  const gtreqless = "⋛";
  const gtreqqless = "⪌";
  const gtrless = "≷";
  const gtrsim = "≳";
  const gvertneqq = "≩︀";
  const gvnE = "≩︀";
  const Hacek = "ˇ";
  const hairsp = " ";
  const half = "½";
  const hamilt = "ℋ";
  const HARDcy = "Ъ";
  const hardcy = "ъ";
  const harrcir = "⥈";
  const harr = "↔";
  const hArr = "⇔";
  const harrw = "↭";
  const Hat = "^";
  const hbar = "ℏ";
  const Hcirc = "Ĥ";
  const hcirc = "ĥ";
  const hearts = "♥";
  const heartsuit = "♥";
  const hellip = "…";
  const hercon = "⊹";
  const hfr = "𝔥";
  const Hfr = "ℌ";
  const HilbertSpace = "ℋ";
  const hksearow = "⤥";
  const hkswarow = "⤦";
  const hoarr = "⇿";
  const homtht = "∻";
  const hookleftarrow = "↩";
  const hookrightarrow = "↪";
  const hopf = "𝕙";
  const Hopf = "ℍ";
  const horbar = "―";
  const HorizontalLine = "─";
  const hscr = "𝒽";
  const Hscr = "ℋ";
  const hslash = "ℏ";
  const Hstrok = "Ħ";
  const hstrok = "ħ";
  const HumpDownHump = "≎";
  const HumpEqual = "≏";
  const hybull = "⁃";
  const hyphen = "‐";
  const Iacute = "Í";
  const iacute = "í";
  const ic = "⁣";
  const Icirc = "Î";
  const icirc = "î";
  const Icy = "И";
  const icy = "и";
  const Idot = "İ";
  const IEcy = "Е";
  const iecy = "е";
  const iexcl = "¡";
  const iff = "⇔";
  const ifr = "𝔦";
  const Ifr = "ℑ";
  const Igrave = "Ì";
  const igrave = "ì";
  const ii = "ⅈ";
  const iiiint = "⨌";
  const iiint = "∭";
  const iinfin = "⧜";
  const iiota = "℩";
  const IJlig = "Ĳ";
  const ijlig = "ĳ";
  const Imacr = "Ī";
  const imacr = "ī";
  const image$1 = "ℑ";
  const ImaginaryI = "ⅈ";
  const imagline = "ℐ";
  const imagpart = "ℑ";
  const imath = "ı";
  const Im = "ℑ";
  const imof = "⊷";
  const imped = "Ƶ";
  const Implies = "⇒";
  const incare = "℅";
  const infin = "∞";
  const infintie = "⧝";
  const inodot = "ı";
  const intcal = "⊺";
  const int = "∫";
  const Int = "∬";
  const integers = "ℤ";
  const Integral = "∫";
  const intercal = "⊺";
  const Intersection = "⋂";
  const intlarhk = "⨗";
  const intprod = "⨼";
  const InvisibleComma = "⁣";
  const InvisibleTimes = "⁢";
  const IOcy = "Ё";
  const iocy = "ё";
  const Iogon = "Į";
  const iogon = "į";
  const Iopf = "𝕀";
  const iopf = "𝕚";
  const Iota = "Ι";
  const iota = "ι";
  const iprod = "⨼";
  const iquest = "¿";
  const iscr = "𝒾";
  const Iscr = "ℐ";
  const isin = "∈";
  const isindot = "⋵";
  const isinE = "⋹";
  const isins = "⋴";
  const isinsv = "⋳";
  const isinv = "∈";
  const it = "⁢";
  const Itilde = "Ĩ";
  const itilde = "ĩ";
  const Iukcy = "І";
  const iukcy = "і";
  const Iuml = "Ï";
  const iuml = "ï";
  const Jcirc = "Ĵ";
  const jcirc = "ĵ";
  const Jcy = "Й";
  const jcy = "й";
  const Jfr = "𝔍";
  const jfr = "𝔧";
  const jmath = "ȷ";
  const Jopf = "𝕁";
  const jopf = "𝕛";
  const Jscr = "𝒥";
  const jscr = "𝒿";
  const Jsercy = "Ј";
  const jsercy = "ј";
  const Jukcy = "Є";
  const jukcy = "є";
  const Kappa = "Κ";
  const kappa = "κ";
  const kappav = "ϰ";
  const Kcedil = "Ķ";
  const kcedil = "ķ";
  const Kcy = "К";
  const kcy = "к";
  const Kfr = "𝔎";
  const kfr = "𝔨";
  const kgreen = "ĸ";
  const KHcy = "Х";
  const khcy = "х";
  const KJcy = "Ќ";
  const kjcy = "ќ";
  const Kopf = "𝕂";
  const kopf = "𝕜";
  const Kscr = "𝒦";
  const kscr = "𝓀";
  const lAarr = "⇚";
  const Lacute = "Ĺ";
  const lacute = "ĺ";
  const laemptyv = "⦴";
  const lagran = "ℒ";
  const Lambda = "Λ";
  const lambda = "λ";
  const lang = "⟨";
  const Lang = "⟪";
  const langd = "⦑";
  const langle = "⟨";
  const lap = "⪅";
  const Laplacetrf = "ℒ";
  const laquo = "«";
  const larrb = "⇤";
  const larrbfs = "⤟";
  const larr = "←";
  const Larr = "↞";
  const lArr = "⇐";
  const larrfs = "⤝";
  const larrhk = "↩";
  const larrlp = "↫";
  const larrpl = "⤹";
  const larrsim = "⥳";
  const larrtl = "↢";
  const latail = "⤙";
  const lAtail = "⤛";
  const lat = "⪫";
  const late = "⪭";
  const lates = "⪭︀";
  const lbarr = "⤌";
  const lBarr = "⤎";
  const lbbrk = "❲";
  const lbrace = "{";
  const lbrack = "[";
  const lbrke = "⦋";
  const lbrksld = "⦏";
  const lbrkslu = "⦍";
  const Lcaron = "Ľ";
  const lcaron = "ľ";
  const Lcedil = "Ļ";
  const lcedil = "ļ";
  const lceil = "⌈";
  const lcub = "{";
  const Lcy = "Л";
  const lcy = "л";
  const ldca = "⤶";
  const ldquo = "“";
  const ldquor = "„";
  const ldrdhar = "⥧";
  const ldrushar = "⥋";
  const ldsh = "↲";
  const le = "≤";
  const lE = "≦";
  const LeftAngleBracket = "⟨";
  const LeftArrowBar = "⇤";
  const leftarrow = "←";
  const LeftArrow = "←";
  const Leftarrow = "⇐";
  const LeftArrowRightArrow = "⇆";
  const leftarrowtail = "↢";
  const LeftCeiling = "⌈";
  const LeftDoubleBracket = "⟦";
  const LeftDownTeeVector = "⥡";
  const LeftDownVectorBar = "⥙";
  const LeftDownVector = "⇃";
  const LeftFloor = "⌊";
  const leftharpoondown = "↽";
  const leftharpoonup = "↼";
  const leftleftarrows = "⇇";
  const leftrightarrow = "↔";
  const LeftRightArrow = "↔";
  const Leftrightarrow = "⇔";
  const leftrightarrows = "⇆";
  const leftrightharpoons = "⇋";
  const leftrightsquigarrow = "↭";
  const LeftRightVector = "⥎";
  const LeftTeeArrow = "↤";
  const LeftTee = "⊣";
  const LeftTeeVector = "⥚";
  const leftthreetimes = "⋋";
  const LeftTriangleBar = "⧏";
  const LeftTriangle = "⊲";
  const LeftTriangleEqual = "⊴";
  const LeftUpDownVector = "⥑";
  const LeftUpTeeVector = "⥠";
  const LeftUpVectorBar = "⥘";
  const LeftUpVector = "↿";
  const LeftVectorBar = "⥒";
  const LeftVector = "↼";
  const lEg = "⪋";
  const leg = "⋚";
  const leq = "≤";
  const leqq = "≦";
  const leqslant = "⩽";
  const lescc = "⪨";
  const les = "⩽";
  const lesdot = "⩿";
  const lesdoto = "⪁";
  const lesdotor = "⪃";
  const lesg = "⋚︀";
  const lesges = "⪓";
  const lessapprox = "⪅";
  const lessdot = "⋖";
  const lesseqgtr = "⋚";
  const lesseqqgtr = "⪋";
  const LessEqualGreater = "⋚";
  const LessFullEqual = "≦";
  const LessGreater = "≶";
  const lessgtr = "≶";
  const LessLess = "⪡";
  const lesssim = "≲";
  const LessSlantEqual = "⩽";
  const LessTilde = "≲";
  const lfisht = "⥼";
  const lfloor = "⌊";
  const Lfr = "𝔏";
  const lfr = "𝔩";
  const lg = "≶";
  const lgE = "⪑";
  const lHar = "⥢";
  const lhard = "↽";
  const lharu = "↼";
  const lharul = "⥪";
  const lhblk = "▄";
  const LJcy = "Љ";
  const ljcy = "љ";
  const llarr = "⇇";
  const ll = "≪";
  const Ll = "⋘";
  const llcorner = "⌞";
  const Lleftarrow = "⇚";
  const llhard = "⥫";
  const lltri = "◺";
  const Lmidot = "Ŀ";
  const lmidot = "ŀ";
  const lmoustache = "⎰";
  const lmoust = "⎰";
  const lnap = "⪉";
  const lnapprox = "⪉";
  const lne = "⪇";
  const lnE = "≨";
  const lneq = "⪇";
  const lneqq = "≨";
  const lnsim = "⋦";
  const loang = "⟬";
  const loarr = "⇽";
  const lobrk = "⟦";
  const longleftarrow = "⟵";
  const LongLeftArrow = "⟵";
  const Longleftarrow = "⟸";
  const longleftrightarrow = "⟷";
  const LongLeftRightArrow = "⟷";
  const Longleftrightarrow = "⟺";
  const longmapsto = "⟼";
  const longrightarrow = "⟶";
  const LongRightArrow = "⟶";
  const Longrightarrow = "⟹";
  const looparrowleft = "↫";
  const looparrowright = "↬";
  const lopar = "⦅";
  const Lopf = "𝕃";
  const lopf = "𝕝";
  const loplus = "⨭";
  const lotimes = "⨴";
  const lowast = "∗";
  const lowbar = "_";
  const LowerLeftArrow = "↙";
  const LowerRightArrow = "↘";
  const loz = "◊";
  const lozenge = "◊";
  const lozf = "⧫";
  const lpar = "(";
  const lparlt = "⦓";
  const lrarr = "⇆";
  const lrcorner = "⌟";
  const lrhar = "⇋";
  const lrhard = "⥭";
  const lrm = "‎";
  const lrtri = "⊿";
  const lsaquo = "‹";
  const lscr = "𝓁";
  const Lscr = "ℒ";
  const lsh = "↰";
  const Lsh = "↰";
  const lsim = "≲";
  const lsime = "⪍";
  const lsimg = "⪏";
  const lsqb = "[";
  const lsquo = "‘";
  const lsquor = "‚";
  const Lstrok = "Ł";
  const lstrok = "ł";
  const ltcc = "⪦";
  const ltcir = "⩹";
  const lt = "<";
  const LT = "<";
  const Lt = "≪";
  const ltdot = "⋖";
  const lthree = "⋋";
  const ltimes = "⋉";
  const ltlarr = "⥶";
  const ltquest = "⩻";
  const ltri = "◃";
  const ltrie = "⊴";
  const ltrif = "◂";
  const ltrPar = "⦖";
  const lurdshar = "⥊";
  const luruhar = "⥦";
  const lvertneqq = "≨︀";
  const lvnE = "≨︀";
  const macr = "¯";
  const male = "♂";
  const malt = "✠";
  const maltese = "✠";
  const map = "↦";
  const mapsto = "↦";
  const mapstodown = "↧";
  const mapstoleft = "↤";
  const mapstoup = "↥";
  const marker = "▮";
  const mcomma = "⨩";
  const Mcy = "М";
  const mcy = "м";
  const mdash = "—";
  const mDDot = "∺";
  const measuredangle = "∡";
  const MediumSpace = " ";
  const Mellintrf = "ℳ";
  const Mfr = "𝔐";
  const mfr = "𝔪";
  const mho = "℧";
  const micro = "µ";
  const midast = "*";
  const midcir = "⫰";
  const mid = "∣";
  const middot = "·";
  const minusb = "⊟";
  const minus = "−";
  const minusd = "∸";
  const minusdu = "⨪";
  const MinusPlus = "∓";
  const mlcp = "⫛";
  const mldr = "…";
  const mnplus = "∓";
  const models = "⊧";
  const Mopf = "𝕄";
  const mopf = "𝕞";
  const mp = "∓";
  const mscr = "𝓂";
  const Mscr = "ℳ";
  const mstpos = "∾";
  const Mu = "Μ";
  const mu = "μ";
  const multimap = "⊸";
  const mumap = "⊸";
  const nabla = "∇";
  const Nacute = "Ń";
  const nacute = "ń";
  const nang = "∠⃒";
  const nap = "≉";
  const napE = "⩰̸";
  const napid = "≋̸";
  const napos = "ŉ";
  const napprox = "≉";
  const natural = "♮";
  const naturals = "ℕ";
  const natur = "♮";
  const nbsp = " ";
  const nbump = "≎̸";
  const nbumpe = "≏̸";
  const ncap = "⩃";
  const Ncaron = "Ň";
  const ncaron = "ň";
  const Ncedil = "Ņ";
  const ncedil = "ņ";
  const ncong = "≇";
  const ncongdot = "⩭̸";
  const ncup = "⩂";
  const Ncy = "Н";
  const ncy = "н";
  const ndash = "–";
  const nearhk = "⤤";
  const nearr = "↗";
  const neArr = "⇗";
  const nearrow = "↗";
  const ne = "≠";
  const nedot = "≐̸";
  const NegativeMediumSpace = "​";
  const NegativeThickSpace = "​";
  const NegativeThinSpace = "​";
  const NegativeVeryThinSpace = "​";
  const nequiv = "≢";
  const nesear = "⤨";
  const nesim = "≂̸";
  const NestedGreaterGreater = "≫";
  const NestedLessLess = "≪";
  const NewLine = "\n";
  const nexist = "∄";
  const nexists = "∄";
  const Nfr = "𝔑";
  const nfr = "𝔫";
  const ngE = "≧̸";
  const nge = "≱";
  const ngeq = "≱";
  const ngeqq = "≧̸";
  const ngeqslant = "⩾̸";
  const nges = "⩾̸";
  const nGg = "⋙̸";
  const ngsim = "≵";
  const nGt = "≫⃒";
  const ngt = "≯";
  const ngtr = "≯";
  const nGtv = "≫̸";
  const nharr = "↮";
  const nhArr = "⇎";
  const nhpar = "⫲";
  const ni = "∋";
  const nis = "⋼";
  const nisd = "⋺";
  const niv = "∋";
  const NJcy = "Њ";
  const njcy = "њ";
  const nlarr = "↚";
  const nlArr = "⇍";
  const nldr = "‥";
  const nlE = "≦̸";
  const nle = "≰";
  const nleftarrow = "↚";
  const nLeftarrow = "⇍";
  const nleftrightarrow = "↮";
  const nLeftrightarrow = "⇎";
  const nleq = "≰";
  const nleqq = "≦̸";
  const nleqslant = "⩽̸";
  const nles = "⩽̸";
  const nless = "≮";
  const nLl = "⋘̸";
  const nlsim = "≴";
  const nLt = "≪⃒";
  const nlt = "≮";
  const nltri = "⋪";
  const nltrie = "⋬";
  const nLtv = "≪̸";
  const nmid = "∤";
  const NoBreak = "⁠";
  const NonBreakingSpace = " ";
  const nopf = "𝕟";
  const Nopf = "ℕ";
  const Not = "⫬";
  const not = "¬";
  const NotCongruent = "≢";
  const NotCupCap = "≭";
  const NotDoubleVerticalBar = "∦";
  const NotElement = "∉";
  const NotEqual = "≠";
  const NotEqualTilde = "≂̸";
  const NotExists = "∄";
  const NotGreater = "≯";
  const NotGreaterEqual = "≱";
  const NotGreaterFullEqual = "≧̸";
  const NotGreaterGreater = "≫̸";
  const NotGreaterLess = "≹";
  const NotGreaterSlantEqual = "⩾̸";
  const NotGreaterTilde = "≵";
  const NotHumpDownHump = "≎̸";
  const NotHumpEqual = "≏̸";
  const notin = "∉";
  const notindot = "⋵̸";
  const notinE = "⋹̸";
  const notinva = "∉";
  const notinvb = "⋷";
  const notinvc = "⋶";
  const NotLeftTriangleBar = "⧏̸";
  const NotLeftTriangle = "⋪";
  const NotLeftTriangleEqual = "⋬";
  const NotLess = "≮";
  const NotLessEqual = "≰";
  const NotLessGreater = "≸";
  const NotLessLess = "≪̸";
  const NotLessSlantEqual = "⩽̸";
  const NotLessTilde = "≴";
  const NotNestedGreaterGreater = "⪢̸";
  const NotNestedLessLess = "⪡̸";
  const notni = "∌";
  const notniva = "∌";
  const notnivb = "⋾";
  const notnivc = "⋽";
  const NotPrecedes = "⊀";
  const NotPrecedesEqual = "⪯̸";
  const NotPrecedesSlantEqual = "⋠";
  const NotReverseElement = "∌";
  const NotRightTriangleBar = "⧐̸";
  const NotRightTriangle = "⋫";
  const NotRightTriangleEqual = "⋭";
  const NotSquareSubset = "⊏̸";
  const NotSquareSubsetEqual = "⋢";
  const NotSquareSuperset = "⊐̸";
  const NotSquareSupersetEqual = "⋣";
  const NotSubset = "⊂⃒";
  const NotSubsetEqual = "⊈";
  const NotSucceeds = "⊁";
  const NotSucceedsEqual = "⪰̸";
  const NotSucceedsSlantEqual = "⋡";
  const NotSucceedsTilde = "≿̸";
  const NotSuperset = "⊃⃒";
  const NotSupersetEqual = "⊉";
  const NotTilde = "≁";
  const NotTildeEqual = "≄";
  const NotTildeFullEqual = "≇";
  const NotTildeTilde = "≉";
  const NotVerticalBar = "∤";
  const nparallel = "∦";
  const npar = "∦";
  const nparsl = "⫽⃥";
  const npart = "∂̸";
  const npolint = "⨔";
  const npr = "⊀";
  const nprcue = "⋠";
  const nprec = "⊀";
  const npreceq = "⪯̸";
  const npre = "⪯̸";
  const nrarrc = "⤳̸";
  const nrarr = "↛";
  const nrArr = "⇏";
  const nrarrw = "↝̸";
  const nrightarrow = "↛";
  const nRightarrow = "⇏";
  const nrtri = "⋫";
  const nrtrie = "⋭";
  const nsc = "⊁";
  const nsccue = "⋡";
  const nsce = "⪰̸";
  const Nscr = "𝒩";
  const nscr = "𝓃";
  const nshortmid = "∤";
  const nshortparallel = "∦";
  const nsim = "≁";
  const nsime = "≄";
  const nsimeq = "≄";
  const nsmid = "∤";
  const nspar = "∦";
  const nsqsube = "⋢";
  const nsqsupe = "⋣";
  const nsub = "⊄";
  const nsubE = "⫅̸";
  const nsube = "⊈";
  const nsubset = "⊂⃒";
  const nsubseteq = "⊈";
  const nsubseteqq = "⫅̸";
  const nsucc = "⊁";
  const nsucceq = "⪰̸";
  const nsup = "⊅";
  const nsupE = "⫆̸";
  const nsupe = "⊉";
  const nsupset = "⊃⃒";
  const nsupseteq = "⊉";
  const nsupseteqq = "⫆̸";
  const ntgl = "≹";
  const Ntilde = "Ñ";
  const ntilde = "ñ";
  const ntlg = "≸";
  const ntriangleleft = "⋪";
  const ntrianglelefteq = "⋬";
  const ntriangleright = "⋫";
  const ntrianglerighteq = "⋭";
  const Nu = "Ν";
  const nu = "ν";
  const num = "#";
  const numero = "№";
  const numsp = " ";
  const nvap = "≍⃒";
  const nvdash = "⊬";
  const nvDash = "⊭";
  const nVdash = "⊮";
  const nVDash = "⊯";
  const nvge = "≥⃒";
  const nvgt = ">⃒";
  const nvHarr = "⤄";
  const nvinfin = "⧞";
  const nvlArr = "⤂";
  const nvle = "≤⃒";
  const nvlt = "<⃒";
  const nvltrie = "⊴⃒";
  const nvrArr = "⤃";
  const nvrtrie = "⊵⃒";
  const nvsim = "∼⃒";
  const nwarhk = "⤣";
  const nwarr = "↖";
  const nwArr = "⇖";
  const nwarrow = "↖";
  const nwnear = "⤧";
  const Oacute = "Ó";
  const oacute = "ó";
  const oast = "⊛";
  const Ocirc = "Ô";
  const ocirc = "ô";
  const ocir = "⊚";
  const Ocy = "О";
  const ocy = "о";
  const odash = "⊝";
  const Odblac = "Ő";
  const odblac = "ő";
  const odiv = "⨸";
  const odot = "⊙";
  const odsold = "⦼";
  const OElig = "Œ";
  const oelig = "œ";
  const ofcir = "⦿";
  const Ofr = "𝔒";
  const ofr = "𝔬";
  const ogon = "˛";
  const Ograve = "Ò";
  const ograve = "ò";
  const ogt = "⧁";
  const ohbar = "⦵";
  const ohm = "Ω";
  const oint = "∮";
  const olarr = "↺";
  const olcir = "⦾";
  const olcross = "⦻";
  const oline = "‾";
  const olt = "⧀";
  const Omacr = "Ō";
  const omacr = "ō";
  const Omega = "Ω";
  const omega = "ω";
  const Omicron = "Ο";
  const omicron = "ο";
  const omid = "⦶";
  const ominus = "⊖";
  const Oopf = "𝕆";
  const oopf = "𝕠";
  const opar = "⦷";
  const OpenCurlyDoubleQuote = "“";
  const OpenCurlyQuote = "‘";
  const operp = "⦹";
  const oplus = "⊕";
  const orarr = "↻";
  const Or = "⩔";
  const or = "∨";
  const ord = "⩝";
  const order = "ℴ";
  const orderof = "ℴ";
  const ordf = "ª";
  const ordm = "º";
  const origof = "⊶";
  const oror = "⩖";
  const orslope = "⩗";
  const orv = "⩛";
  const oS = "Ⓢ";
  const Oscr = "𝒪";
  const oscr = "ℴ";
  const Oslash = "Ø";
  const oslash = "ø";
  const osol = "⊘";
  const Otilde = "Õ";
  const otilde = "õ";
  const otimesas = "⨶";
  const Otimes = "⨷";
  const otimes = "⊗";
  const Ouml = "Ö";
  const ouml = "ö";
  const ovbar = "⌽";
  const OverBar = "‾";
  const OverBrace = "⏞";
  const OverBracket = "⎴";
  const OverParenthesis = "⏜";
  const para = "¶";
  const parallel = "∥";
  const par = "∥";
  const parsim = "⫳";
  const parsl = "⫽";
  const part = "∂";
  const PartialD = "∂";
  const Pcy = "П";
  const pcy = "п";
  const percnt = "%";
  const period = ".";
  const permil = "‰";
  const perp = "⊥";
  const pertenk = "‱";
  const Pfr = "𝔓";
  const pfr = "𝔭";
  const Phi = "Φ";
  const phi = "φ";
  const phiv = "ϕ";
  const phmmat = "ℳ";
  const phone = "☎";
  const Pi = "Π";
  const pi = "π";
  const pitchfork = "⋔";
  const piv = "ϖ";
  const planck = "ℏ";
  const planckh = "ℎ";
  const plankv = "ℏ";
  const plusacir = "⨣";
  const plusb = "⊞";
  const pluscir = "⨢";
  const plus = "+";
  const plusdo = "∔";
  const plusdu = "⨥";
  const pluse = "⩲";
  const PlusMinus = "±";
  const plusmn = "±";
  const plussim = "⨦";
  const plustwo = "⨧";
  const pm = "±";
  const Poincareplane = "ℌ";
  const pointint = "⨕";
  const popf = "𝕡";
  const Popf = "ℙ";
  const pound = "£";
  const prap = "⪷";
  const Pr = "⪻";
  const pr = "≺";
  const prcue = "≼";
  const precapprox = "⪷";
  const prec = "≺";
  const preccurlyeq = "≼";
  const Precedes = "≺";
  const PrecedesEqual = "⪯";
  const PrecedesSlantEqual = "≼";
  const PrecedesTilde = "≾";
  const preceq = "⪯";
  const precnapprox = "⪹";
  const precneqq = "⪵";
  const precnsim = "⋨";
  const pre = "⪯";
  const prE = "⪳";
  const precsim = "≾";
  const prime = "′";
  const Prime = "″";
  const primes = "ℙ";
  const prnap = "⪹";
  const prnE = "⪵";
  const prnsim = "⋨";
  const prod = "∏";
  const Product = "∏";
  const profalar = "⌮";
  const profline = "⌒";
  const profsurf = "⌓";
  const prop = "∝";
  const Proportional = "∝";
  const Proportion = "∷";
  const propto = "∝";
  const prsim = "≾";
  const prurel = "⊰";
  const Pscr = "𝒫";
  const pscr = "𝓅";
  const Psi = "Ψ";
  const psi = "ψ";
  const puncsp = " ";
  const Qfr = "𝔔";
  const qfr = "𝔮";
  const qint = "⨌";
  const qopf = "𝕢";
  const Qopf = "ℚ";
  const qprime = "⁗";
  const Qscr = "𝒬";
  const qscr = "𝓆";
  const quaternions = "ℍ";
  const quatint = "⨖";
  const quest = "?";
  const questeq = "≟";
  const quot = '"';
  const QUOT = '"';
  const rAarr = "⇛";
  const race = "∽̱";
  const Racute = "Ŕ";
  const racute = "ŕ";
  const radic = "√";
  const raemptyv = "⦳";
  const rang = "⟩";
  const Rang = "⟫";
  const rangd = "⦒";
  const range = "⦥";
  const rangle = "⟩";
  const raquo = "»";
  const rarrap = "⥵";
  const rarrb = "⇥";
  const rarrbfs = "⤠";
  const rarrc = "⤳";
  const rarr = "→";
  const Rarr = "↠";
  const rArr = "⇒";
  const rarrfs = "⤞";
  const rarrhk = "↪";
  const rarrlp = "↬";
  const rarrpl = "⥅";
  const rarrsim = "⥴";
  const Rarrtl = "⤖";
  const rarrtl = "↣";
  const rarrw = "↝";
  const ratail = "⤚";
  const rAtail = "⤜";
  const ratio = "∶";
  const rationals = "ℚ";
  const rbarr = "⤍";
  const rBarr = "⤏";
  const RBarr = "⤐";
  const rbbrk = "❳";
  const rbrace = "}";
  const rbrack = "]";
  const rbrke = "⦌";
  const rbrksld = "⦎";
  const rbrkslu = "⦐";
  const Rcaron = "Ř";
  const rcaron = "ř";
  const Rcedil = "Ŗ";
  const rcedil = "ŗ";
  const rceil = "⌉";
  const rcub = "}";
  const Rcy = "Р";
  const rcy = "р";
  const rdca = "⤷";
  const rdldhar = "⥩";
  const rdquo = "”";
  const rdquor = "”";
  const rdsh = "↳";
  const real = "ℜ";
  const realine = "ℛ";
  const realpart = "ℜ";
  const reals = "ℝ";
  const Re = "ℜ";
  const rect = "▭";
  const reg = "®";
  const REG = "®";
  const ReverseElement = "∋";
  const ReverseEquilibrium = "⇋";
  const ReverseUpEquilibrium = "⥯";
  const rfisht = "⥽";
  const rfloor = "⌋";
  const rfr = "𝔯";
  const Rfr = "ℜ";
  const rHar = "⥤";
  const rhard = "⇁";
  const rharu = "⇀";
  const rharul = "⥬";
  const Rho = "Ρ";
  const rho = "ρ";
  const rhov = "ϱ";
  const RightAngleBracket = "⟩";
  const RightArrowBar = "⇥";
  const rightarrow = "→";
  const RightArrow = "→";
  const Rightarrow = "⇒";
  const RightArrowLeftArrow = "⇄";
  const rightarrowtail = "↣";
  const RightCeiling = "⌉";
  const RightDoubleBracket = "⟧";
  const RightDownTeeVector = "⥝";
  const RightDownVectorBar = "⥕";
  const RightDownVector = "⇂";
  const RightFloor = "⌋";
  const rightharpoondown = "⇁";
  const rightharpoonup = "⇀";
  const rightleftarrows = "⇄";
  const rightleftharpoons = "⇌";
  const rightrightarrows = "⇉";
  const rightsquigarrow = "↝";
  const RightTeeArrow = "↦";
  const RightTee = "⊢";
  const RightTeeVector = "⥛";
  const rightthreetimes = "⋌";
  const RightTriangleBar = "⧐";
  const RightTriangle = "⊳";
  const RightTriangleEqual = "⊵";
  const RightUpDownVector = "⥏";
  const RightUpTeeVector = "⥜";
  const RightUpVectorBar = "⥔";
  const RightUpVector = "↾";
  const RightVectorBar = "⥓";
  const RightVector = "⇀";
  const ring = "˚";
  const risingdotseq = "≓";
  const rlarr = "⇄";
  const rlhar = "⇌";
  const rlm = "‏";
  const rmoustache = "⎱";
  const rmoust = "⎱";
  const rnmid = "⫮";
  const roang = "⟭";
  const roarr = "⇾";
  const robrk = "⟧";
  const ropar = "⦆";
  const ropf = "𝕣";
  const Ropf = "ℝ";
  const roplus = "⨮";
  const rotimes = "⨵";
  const RoundImplies = "⥰";
  const rpar = ")";
  const rpargt = "⦔";
  const rppolint = "⨒";
  const rrarr = "⇉";
  const Rrightarrow = "⇛";
  const rsaquo = "›";
  const rscr = "𝓇";
  const Rscr = "ℛ";
  const rsh = "↱";
  const Rsh = "↱";
  const rsqb = "]";
  const rsquo = "’";
  const rsquor = "’";
  const rthree = "⋌";
  const rtimes = "⋊";
  const rtri = "▹";
  const rtrie = "⊵";
  const rtrif = "▸";
  const rtriltri = "⧎";
  const RuleDelayed = "⧴";
  const ruluhar = "⥨";
  const rx = "℞";
  const Sacute = "Ś";
  const sacute = "ś";
  const sbquo = "‚";
  const scap = "⪸";
  const Scaron = "Š";
  const scaron = "š";
  const Sc = "⪼";
  const sc = "≻";
  const sccue = "≽";
  const sce = "⪰";
  const scE = "⪴";
  const Scedil = "Ş";
  const scedil = "ş";
  const Scirc = "Ŝ";
  const scirc = "ŝ";
  const scnap = "⪺";
  const scnE = "⪶";
  const scnsim = "⋩";
  const scpolint = "⨓";
  const scsim = "≿";
  const Scy = "С";
  const scy = "с";
  const sdotb = "⊡";
  const sdot = "⋅";
  const sdote = "⩦";
  const searhk = "⤥";
  const searr = "↘";
  const seArr = "⇘";
  const searrow = "↘";
  const sect = "§";
  const semi = ";";
  const seswar = "⤩";
  const setminus = "∖";
  const setmn = "∖";
  const sext = "✶";
  const Sfr = "𝔖";
  const sfr = "𝔰";
  const sfrown = "⌢";
  const sharp = "♯";
  const SHCHcy = "Щ";
  const shchcy = "щ";
  const SHcy = "Ш";
  const shcy = "ш";
  const ShortDownArrow = "↓";
  const ShortLeftArrow = "←";
  const shortmid = "∣";
  const shortparallel = "∥";
  const ShortRightArrow = "→";
  const ShortUpArrow = "↑";
  const shy = "­";
  const Sigma = "Σ";
  const sigma = "σ";
  const sigmaf = "ς";
  const sigmav = "ς";
  const sim = "∼";
  const simdot = "⩪";
  const sime = "≃";
  const simeq = "≃";
  const simg = "⪞";
  const simgE = "⪠";
  const siml = "⪝";
  const simlE = "⪟";
  const simne = "≆";
  const simplus = "⨤";
  const simrarr = "⥲";
  const slarr = "←";
  const SmallCircle = "∘";
  const smallsetminus = "∖";
  const smashp = "⨳";
  const smeparsl = "⧤";
  const smid = "∣";
  const smile = "⌣";
  const smt = "⪪";
  const smte = "⪬";
  const smtes = "⪬︀";
  const SOFTcy = "Ь";
  const softcy = "ь";
  const solbar = "⌿";
  const solb = "⧄";
  const sol = "/";
  const Sopf = "𝕊";
  const sopf = "𝕤";
  const spades = "♠";
  const spadesuit = "♠";
  const spar = "∥";
  const sqcap = "⊓";
  const sqcaps = "⊓︀";
  const sqcup = "⊔";
  const sqcups = "⊔︀";
  const Sqrt = "√";
  const sqsub = "⊏";
  const sqsube = "⊑";
  const sqsubset = "⊏";
  const sqsubseteq = "⊑";
  const sqsup = "⊐";
  const sqsupe = "⊒";
  const sqsupset = "⊐";
  const sqsupseteq = "⊒";
  const square = "□";
  const Square = "□";
  const SquareIntersection = "⊓";
  const SquareSubset = "⊏";
  const SquareSubsetEqual = "⊑";
  const SquareSuperset = "⊐";
  const SquareSupersetEqual = "⊒";
  const SquareUnion = "⊔";
  const squarf = "▪";
  const squ = "□";
  const squf = "▪";
  const srarr = "→";
  const Sscr = "𝒮";
  const sscr = "𝓈";
  const ssetmn = "∖";
  const ssmile = "⌣";
  const sstarf = "⋆";
  const Star = "⋆";
  const star = "☆";
  const starf = "★";
  const straightepsilon = "ϵ";
  const straightphi = "ϕ";
  const strns = "¯";
  const sub = "⊂";
  const Sub = "⋐";
  const subdot = "⪽";
  const subE = "⫅";
  const sube = "⊆";
  const subedot = "⫃";
  const submult = "⫁";
  const subnE = "⫋";
  const subne = "⊊";
  const subplus = "⪿";
  const subrarr = "⥹";
  const subset = "⊂";
  const Subset = "⋐";
  const subseteq = "⊆";
  const subseteqq = "⫅";
  const SubsetEqual = "⊆";
  const subsetneq = "⊊";
  const subsetneqq = "⫋";
  const subsim = "⫇";
  const subsub = "⫕";
  const subsup = "⫓";
  const succapprox = "⪸";
  const succ = "≻";
  const succcurlyeq = "≽";
  const Succeeds = "≻";
  const SucceedsEqual = "⪰";
  const SucceedsSlantEqual = "≽";
  const SucceedsTilde = "≿";
  const succeq = "⪰";
  const succnapprox = "⪺";
  const succneqq = "⪶";
  const succnsim = "⋩";
  const succsim = "≿";
  const SuchThat = "∋";
  const sum = "∑";
  const Sum = "∑";
  const sung = "♪";
  const sup1 = "¹";
  const sup2 = "²";
  const sup3 = "³";
  const sup = "⊃";
  const Sup = "⋑";
  const supdot = "⪾";
  const supdsub = "⫘";
  const supE = "⫆";
  const supe = "⊇";
  const supedot = "⫄";
  const Superset = "⊃";
  const SupersetEqual = "⊇";
  const suphsol = "⟉";
  const suphsub = "⫗";
  const suplarr = "⥻";
  const supmult = "⫂";
  const supnE = "⫌";
  const supne = "⊋";
  const supplus = "⫀";
  const supset = "⊃";
  const Supset = "⋑";
  const supseteq = "⊇";
  const supseteqq = "⫆";
  const supsetneq = "⊋";
  const supsetneqq = "⫌";
  const supsim = "⫈";
  const supsub = "⫔";
  const supsup = "⫖";
  const swarhk = "⤦";
  const swarr = "↙";
  const swArr = "⇙";
  const swarrow = "↙";
  const swnwar = "⤪";
  const szlig = "ß";
  const Tab = "	";
  const target = "⌖";
  const Tau = "Τ";
  const tau = "τ";
  const tbrk = "⎴";
  const Tcaron = "Ť";
  const tcaron = "ť";
  const Tcedil = "Ţ";
  const tcedil = "ţ";
  const Tcy = "Т";
  const tcy = "т";
  const tdot = "⃛";
  const telrec = "⌕";
  const Tfr = "𝔗";
  const tfr = "𝔱";
  const there4 = "∴";
  const therefore = "∴";
  const Therefore = "∴";
  const Theta = "Θ";
  const theta = "θ";
  const thetasym = "ϑ";
  const thetav = "ϑ";
  const thickapprox = "≈";
  const thicksim = "∼";
  const ThickSpace = "  ";
  const ThinSpace = " ";
  const thinsp = " ";
  const thkap = "≈";
  const thksim = "∼";
  const THORN = "Þ";
  const thorn = "þ";
  const tilde = "˜";
  const Tilde = "∼";
  const TildeEqual = "≃";
  const TildeFullEqual = "≅";
  const TildeTilde = "≈";
  const timesbar = "⨱";
  const timesb = "⊠";
  const times = "×";
  const timesd = "⨰";
  const tint = "∭";
  const toea = "⤨";
  const topbot = "⌶";
  const topcir = "⫱";
  const top = "⊤";
  const Topf = "𝕋";
  const topf = "𝕥";
  const topfork = "⫚";
  const tosa = "⤩";
  const tprime = "‴";
  const trade = "™";
  const TRADE = "™";
  const triangle = "▵";
  const triangledown = "▿";
  const triangleleft = "◃";
  const trianglelefteq = "⊴";
  const triangleq = "≜";
  const triangleright = "▹";
  const trianglerighteq = "⊵";
  const tridot = "◬";
  const trie = "≜";
  const triminus = "⨺";
  const TripleDot = "⃛";
  const triplus = "⨹";
  const trisb = "⧍";
  const tritime = "⨻";
  const trpezium = "⏢";
  const Tscr = "𝒯";
  const tscr = "𝓉";
  const TScy = "Ц";
  const tscy = "ц";
  const TSHcy = "Ћ";
  const tshcy = "ћ";
  const Tstrok = "Ŧ";
  const tstrok = "ŧ";
  const twixt = "≬";
  const twoheadleftarrow = "↞";
  const twoheadrightarrow = "↠";
  const Uacute = "Ú";
  const uacute = "ú";
  const uarr = "↑";
  const Uarr = "↟";
  const uArr = "⇑";
  const Uarrocir = "⥉";
  const Ubrcy = "Ў";
  const ubrcy = "ў";
  const Ubreve = "Ŭ";
  const ubreve = "ŭ";
  const Ucirc = "Û";
  const ucirc = "û";
  const Ucy = "У";
  const ucy = "у";
  const udarr = "⇅";
  const Udblac = "Ű";
  const udblac = "ű";
  const udhar = "⥮";
  const ufisht = "⥾";
  const Ufr = "𝔘";
  const ufr = "𝔲";
  const Ugrave = "Ù";
  const ugrave = "ù";
  const uHar = "⥣";
  const uharl = "↿";
  const uharr = "↾";
  const uhblk = "▀";
  const ulcorn = "⌜";
  const ulcorner = "⌜";
  const ulcrop = "⌏";
  const ultri = "◸";
  const Umacr = "Ū";
  const umacr = "ū";
  const uml = "¨";
  const UnderBar = "_";
  const UnderBrace = "⏟";
  const UnderBracket = "⎵";
  const UnderParenthesis = "⏝";
  const Union = "⋃";
  const UnionPlus = "⊎";
  const Uogon = "Ų";
  const uogon = "ų";
  const Uopf = "𝕌";
  const uopf = "𝕦";
  const UpArrowBar = "⤒";
  const uparrow = "↑";
  const UpArrow = "↑";
  const Uparrow = "⇑";
  const UpArrowDownArrow = "⇅";
  const updownarrow = "↕";
  const UpDownArrow = "↕";
  const Updownarrow = "⇕";
  const UpEquilibrium = "⥮";
  const upharpoonleft = "↿";
  const upharpoonright = "↾";
  const uplus = "⊎";
  const UpperLeftArrow = "↖";
  const UpperRightArrow = "↗";
  const upsi = "υ";
  const Upsi = "ϒ";
  const upsih = "ϒ";
  const Upsilon = "Υ";
  const upsilon = "υ";
  const UpTeeArrow = "↥";
  const UpTee = "⊥";
  const upuparrows = "⇈";
  const urcorn = "⌝";
  const urcorner = "⌝";
  const urcrop = "⌎";
  const Uring = "Ů";
  const uring = "ů";
  const urtri = "◹";
  const Uscr = "𝒰";
  const uscr = "𝓊";
  const utdot = "⋰";
  const Utilde = "Ũ";
  const utilde = "ũ";
  const utri = "▵";
  const utrif = "▴";
  const uuarr = "⇈";
  const Uuml = "Ü";
  const uuml = "ü";
  const uwangle = "⦧";
  const vangrt = "⦜";
  const varepsilon = "ϵ";
  const varkappa = "ϰ";
  const varnothing = "∅";
  const varphi = "ϕ";
  const varpi = "ϖ";
  const varpropto = "∝";
  const varr = "↕";
  const vArr = "⇕";
  const varrho = "ϱ";
  const varsigma = "ς";
  const varsubsetneq = "⊊︀";
  const varsubsetneqq = "⫋︀";
  const varsupsetneq = "⊋︀";
  const varsupsetneqq = "⫌︀";
  const vartheta = "ϑ";
  const vartriangleleft = "⊲";
  const vartriangleright = "⊳";
  const vBar = "⫨";
  const Vbar = "⫫";
  const vBarv = "⫩";
  const Vcy = "В";
  const vcy = "в";
  const vdash = "⊢";
  const vDash = "⊨";
  const Vdash = "⊩";
  const VDash = "⊫";
  const Vdashl = "⫦";
  const veebar = "⊻";
  const vee = "∨";
  const Vee = "⋁";
  const veeeq = "≚";
  const vellip = "⋮";
  const verbar = "|";
  const Verbar = "‖";
  const vert = "|";
  const Vert = "‖";
  const VerticalBar = "∣";
  const VerticalLine = "|";
  const VerticalSeparator = "❘";
  const VerticalTilde = "≀";
  const VeryThinSpace = " ";
  const Vfr = "𝔙";
  const vfr = "𝔳";
  const vltri = "⊲";
  const vnsub = "⊂⃒";
  const vnsup = "⊃⃒";
  const Vopf = "𝕍";
  const vopf = "𝕧";
  const vprop = "∝";
  const vrtri = "⊳";
  const Vscr = "𝒱";
  const vscr = "𝓋";
  const vsubnE = "⫋︀";
  const vsubne = "⊊︀";
  const vsupnE = "⫌︀";
  const vsupne = "⊋︀";
  const Vvdash = "⊪";
  const vzigzag = "⦚";
  const Wcirc = "Ŵ";
  const wcirc = "ŵ";
  const wedbar = "⩟";
  const wedge = "∧";
  const Wedge = "⋀";
  const wedgeq = "≙";
  const weierp = "℘";
  const Wfr = "𝔚";
  const wfr = "𝔴";
  const Wopf = "𝕎";
  const wopf = "𝕨";
  const wp = "℘";
  const wr = "≀";
  const wreath = "≀";
  const Wscr = "𝒲";
  const wscr = "𝓌";
  const xcap = "⋂";
  const xcirc = "◯";
  const xcup = "⋃";
  const xdtri = "▽";
  const Xfr = "𝔛";
  const xfr = "𝔵";
  const xharr = "⟷";
  const xhArr = "⟺";
  const Xi = "Ξ";
  const xi = "ξ";
  const xlarr = "⟵";
  const xlArr = "⟸";
  const xmap = "⟼";
  const xnis = "⋻";
  const xodot = "⨀";
  const Xopf = "𝕏";
  const xopf = "𝕩";
  const xoplus = "⨁";
  const xotime = "⨂";
  const xrarr = "⟶";
  const xrArr = "⟹";
  const Xscr = "𝒳";
  const xscr = "𝓍";
  const xsqcup = "⨆";
  const xuplus = "⨄";
  const xutri = "△";
  const xvee = "⋁";
  const xwedge = "⋀";
  const Yacute = "Ý";
  const yacute = "ý";
  const YAcy = "Я";
  const yacy = "я";
  const Ycirc = "Ŷ";
  const ycirc = "ŷ";
  const Ycy = "Ы";
  const ycy = "ы";
  const yen = "¥";
  const Yfr = "𝔜";
  const yfr = "𝔶";
  const YIcy = "Ї";
  const yicy = "ї";
  const Yopf = "𝕐";
  const yopf = "𝕪";
  const Yscr = "𝒴";
  const yscr = "𝓎";
  const YUcy = "Ю";
  const yucy = "ю";
  const yuml = "ÿ";
  const Yuml = "Ÿ";
  const Zacute = "Ź";
  const zacute = "ź";
  const Zcaron = "Ž";
  const zcaron = "ž";
  const Zcy = "З";
  const zcy = "з";
  const Zdot = "Ż";
  const zdot = "ż";
  const zeetrf = "ℨ";
  const ZeroWidthSpace = "​";
  const Zeta = "Ζ";
  const zeta = "ζ";
  const zfr = "𝔷";
  const Zfr = "ℨ";
  const ZHcy = "Ж";
  const zhcy = "ж";
  const zigrarr = "⇝";
  const zopf = "𝕫";
  const Zopf = "ℤ";
  const Zscr = "𝒵";
  const zscr = "𝓏";
  const zwj = "‍";
  const zwnj = "‌";
  const require$$0 = {
    Aacute,
    aacute,
    Abreve,
    abreve,
    ac,
    acd,
    acE,
    Acirc,
    acirc,
    acute,
    Acy,
    acy,
    AElig,
    aelig,
    af,
    Afr,
    afr,
    Agrave,
    agrave,
    alefsym,
    aleph,
    Alpha,
    alpha,
    Amacr,
    amacr,
    amalg,
    amp,
    AMP,
    andand,
    And,
    and,
    andd,
    andslope,
    andv,
    ang,
    ange,
    angle,
    angmsdaa,
    angmsdab,
    angmsdac,
    angmsdad,
    angmsdae,
    angmsdaf,
    angmsdag,
    angmsdah,
    angmsd,
    angrt,
    angrtvb,
    angrtvbd,
    angsph,
    angst,
    angzarr,
    Aogon,
    aogon,
    Aopf,
    aopf,
    apacir,
    ap,
    apE,
    ape,
    apid,
    apos,
    ApplyFunction,
    approx,
    approxeq,
    Aring,
    aring,
    Ascr,
    ascr,
    Assign,
    ast,
    asymp,
    asympeq,
    Atilde,
    atilde,
    Auml,
    auml,
    awconint,
    awint,
    backcong,
    backepsilon,
    backprime,
    backsim,
    backsimeq,
    Backslash,
    Barv,
    barvee,
    barwed,
    Barwed,
    barwedge,
    bbrk,
    bbrktbrk,
    bcong,
    Bcy,
    bcy,
    bdquo,
    becaus,
    because,
    Because,
    bemptyv,
    bepsi,
    bernou,
    Bernoullis,
    Beta,
    beta,
    beth,
    between,
    Bfr,
    bfr,
    bigcap,
    bigcirc,
    bigcup,
    bigodot,
    bigoplus,
    bigotimes,
    bigsqcup,
    bigstar,
    bigtriangledown,
    bigtriangleup,
    biguplus,
    bigvee,
    bigwedge,
    bkarow,
    blacklozenge,
    blacksquare,
    blacktriangle,
    blacktriangledown,
    blacktriangleleft,
    blacktriangleright,
    blank,
    blk12,
    blk14,
    blk34,
    block: block$1,
    bne,
    bnequiv,
    bNot,
    bnot,
    Bopf,
    bopf,
    bot,
    bottom,
    bowtie,
    boxbox,
    boxdl,
    boxdL,
    boxDl,
    boxDL,
    boxdr,
    boxdR,
    boxDr,
    boxDR,
    boxh,
    boxH,
    boxhd,
    boxHd,
    boxhD,
    boxHD,
    boxhu,
    boxHu,
    boxhU,
    boxHU,
    boxminus,
    boxplus,
    boxtimes,
    boxul,
    boxuL,
    boxUl,
    boxUL,
    boxur,
    boxuR,
    boxUr,
    boxUR,
    boxv,
    boxV,
    boxvh,
    boxvH,
    boxVh,
    boxVH,
    boxvl,
    boxvL,
    boxVl,
    boxVL,
    boxvr,
    boxvR,
    boxVr,
    boxVR,
    bprime,
    breve,
    Breve,
    brvbar,
    bscr,
    Bscr,
    bsemi,
    bsim,
    bsime,
    bsolb,
    bsol,
    bsolhsub,
    bull,
    bullet,
    bump,
    bumpE,
    bumpe,
    Bumpeq,
    bumpeq,
    Cacute,
    cacute,
    capand,
    capbrcup,
    capcap,
    cap,
    Cap,
    capcup,
    capdot,
    CapitalDifferentialD,
    caps,
    caret,
    caron,
    Cayleys,
    ccaps,
    Ccaron,
    ccaron,
    Ccedil,
    ccedil,
    Ccirc,
    ccirc,
    Cconint,
    ccups,
    ccupssm,
    Cdot,
    cdot,
    cedil,
    Cedilla,
    cemptyv,
    cent,
    centerdot,
    CenterDot,
    cfr,
    Cfr,
    CHcy,
    chcy,
    check,
    checkmark,
    Chi,
    chi,
    circ,
    circeq,
    circlearrowleft,
    circlearrowright,
    circledast,
    circledcirc,
    circleddash,
    CircleDot,
    circledR,
    circledS,
    CircleMinus,
    CirclePlus,
    CircleTimes,
    cir,
    cirE,
    cire,
    cirfnint,
    cirmid,
    cirscir,
    ClockwiseContourIntegral,
    CloseCurlyDoubleQuote,
    CloseCurlyQuote,
    clubs,
    clubsuit,
    colon,
    Colon,
    Colone,
    colone,
    coloneq,
    comma,
    commat,
    comp,
    compfn,
    complement,
    complexes,
    cong,
    congdot,
    Congruent,
    conint,
    Conint,
    ContourIntegral,
    copf,
    Copf,
    coprod,
    Coproduct,
    copy,
    COPY,
    copysr,
    CounterClockwiseContourIntegral,
    crarr,
    cross,
    Cross,
    Cscr,
    cscr,
    csub,
    csube,
    csup,
    csupe,
    ctdot,
    cudarrl,
    cudarrr,
    cuepr,
    cuesc,
    cularr,
    cularrp,
    cupbrcap,
    cupcap,
    CupCap,
    cup,
    Cup,
    cupcup,
    cupdot,
    cupor,
    cups,
    curarr,
    curarrm,
    curlyeqprec,
    curlyeqsucc,
    curlyvee,
    curlywedge,
    curren,
    curvearrowleft,
    curvearrowright,
    cuvee,
    cuwed,
    cwconint,
    cwint,
    cylcty,
    dagger,
    Dagger,
    daleth,
    darr,
    Darr,
    dArr,
    dash,
    Dashv,
    dashv,
    dbkarow,
    dblac,
    Dcaron,
    dcaron,
    Dcy,
    dcy,
    ddagger,
    ddarr,
    DD,
    dd,
    DDotrahd,
    ddotseq,
    deg,
    Del,
    Delta,
    delta,
    demptyv,
    dfisht,
    Dfr,
    dfr,
    dHar,
    dharl,
    dharr,
    DiacriticalAcute,
    DiacriticalDot,
    DiacriticalDoubleAcute,
    DiacriticalGrave,
    DiacriticalTilde,
    diam,
    diamond,
    Diamond,
    diamondsuit,
    diams,
    die,
    DifferentialD,
    digamma,
    disin,
    div,
    divide,
    divideontimes,
    divonx,
    DJcy,
    djcy,
    dlcorn,
    dlcrop,
    dollar,
    Dopf,
    dopf,
    Dot,
    dot,
    DotDot,
    doteq,
    doteqdot,
    DotEqual,
    dotminus,
    dotplus,
    dotsquare,
    doublebarwedge,
    DoubleContourIntegral,
    DoubleDot,
    DoubleDownArrow,
    DoubleLeftArrow,
    DoubleLeftRightArrow,
    DoubleLeftTee,
    DoubleLongLeftArrow,
    DoubleLongLeftRightArrow,
    DoubleLongRightArrow,
    DoubleRightArrow,
    DoubleRightTee,
    DoubleUpArrow,
    DoubleUpDownArrow,
    DoubleVerticalBar,
    DownArrowBar,
    downarrow,
    DownArrow,
    Downarrow,
    DownArrowUpArrow,
    DownBreve,
    downdownarrows,
    downharpoonleft,
    downharpoonright,
    DownLeftRightVector,
    DownLeftTeeVector,
    DownLeftVectorBar,
    DownLeftVector,
    DownRightTeeVector,
    DownRightVectorBar,
    DownRightVector,
    DownTeeArrow,
    DownTee,
    drbkarow,
    drcorn,
    drcrop,
    Dscr,
    dscr,
    DScy,
    dscy,
    dsol,
    Dstrok,
    dstrok,
    dtdot,
    dtri,
    dtrif,
    duarr,
    duhar,
    dwangle,
    DZcy,
    dzcy,
    dzigrarr,
    Eacute,
    eacute,
    easter,
    Ecaron,
    ecaron,
    Ecirc,
    ecirc,
    ecir,
    ecolon,
    Ecy,
    ecy,
    eDDot,
    Edot,
    edot,
    eDot,
    ee,
    efDot,
    Efr,
    efr,
    eg,
    Egrave,
    egrave,
    egs,
    egsdot,
    el,
    Element: Element$1,
    elinters,
    ell,
    els,
    elsdot,
    Emacr,
    emacr,
    empty,
    emptyset,
    EmptySmallSquare,
    emptyv,
    EmptyVerySmallSquare,
    emsp13,
    emsp14,
    emsp,
    ENG,
    eng,
    ensp,
    Eogon,
    eogon,
    Eopf,
    eopf,
    epar,
    eparsl,
    eplus,
    epsi,
    Epsilon,
    epsilon,
    epsiv,
    eqcirc,
    eqcolon,
    eqsim,
    eqslantgtr,
    eqslantless,
    Equal,
    equals,
    EqualTilde,
    equest,
    Equilibrium,
    equiv,
    equivDD,
    eqvparsl,
    erarr,
    erDot,
    escr,
    Escr,
    esdot,
    Esim,
    esim,
    Eta,
    eta,
    ETH,
    eth,
    Euml,
    euml,
    euro,
    excl,
    exist,
    Exists,
    expectation,
    exponentiale,
    ExponentialE,
    fallingdotseq,
    Fcy,
    fcy,
    female,
    ffilig,
    fflig,
    ffllig,
    Ffr,
    ffr,
    filig,
    FilledSmallSquare,
    FilledVerySmallSquare,
    fjlig,
    flat,
    fllig,
    fltns,
    fnof,
    Fopf,
    fopf,
    forall,
    ForAll,
    fork,
    forkv,
    Fouriertrf,
    fpartint,
    frac12,
    frac13,
    frac14,
    frac15,
    frac16,
    frac18,
    frac23,
    frac25,
    frac34,
    frac35,
    frac38,
    frac45,
    frac56,
    frac58,
    frac78,
    frasl,
    frown,
    fscr,
    Fscr,
    gacute,
    Gamma,
    gamma,
    Gammad,
    gammad,
    gap,
    Gbreve,
    gbreve,
    Gcedil,
    Gcirc,
    gcirc,
    Gcy,
    gcy,
    Gdot,
    gdot,
    ge,
    gE,
    gEl,
    gel,
    geq,
    geqq,
    geqslant,
    gescc,
    ges,
    gesdot,
    gesdoto,
    gesdotol,
    gesl,
    gesles,
    Gfr,
    gfr,
    gg,
    Gg,
    ggg,
    gimel,
    GJcy,
    gjcy,
    gla,
    gl,
    glE,
    glj,
    gnap,
    gnapprox,
    gne,
    gnE,
    gneq,
    gneqq,
    gnsim,
    Gopf,
    gopf,
    grave,
    GreaterEqual,
    GreaterEqualLess,
    GreaterFullEqual,
    GreaterGreater,
    GreaterLess,
    GreaterSlantEqual,
    GreaterTilde,
    Gscr,
    gscr,
    gsim,
    gsime,
    gsiml,
    gtcc,
    gtcir,
    gt,
    GT,
    Gt,
    gtdot,
    gtlPar,
    gtquest,
    gtrapprox,
    gtrarr,
    gtrdot,
    gtreqless,
    gtreqqless,
    gtrless,
    gtrsim,
    gvertneqq,
    gvnE,
    Hacek,
    hairsp,
    half,
    hamilt,
    HARDcy,
    hardcy,
    harrcir,
    harr,
    hArr,
    harrw,
    Hat,
    hbar,
    Hcirc,
    hcirc,
    hearts,
    heartsuit,
    hellip,
    hercon,
    hfr,
    Hfr,
    HilbertSpace,
    hksearow,
    hkswarow,
    hoarr,
    homtht,
    hookleftarrow,
    hookrightarrow,
    hopf,
    Hopf,
    horbar,
    HorizontalLine,
    hscr,
    Hscr,
    hslash,
    Hstrok,
    hstrok,
    HumpDownHump,
    HumpEqual,
    hybull,
    hyphen,
    Iacute,
    iacute,
    ic,
    Icirc,
    icirc,
    Icy,
    icy,
    Idot,
    IEcy,
    iecy,
    iexcl,
    iff,
    ifr,
    Ifr,
    Igrave,
    igrave,
    ii,
    iiiint,
    iiint,
    iinfin,
    iiota,
    IJlig,
    ijlig,
    Imacr,
    imacr,
    image: image$1,
    ImaginaryI,
    imagline,
    imagpart,
    imath,
    Im,
    imof,
    imped,
    Implies,
    incare,
    "in": "∈",
    infin,
    infintie,
    inodot,
    intcal,
    int,
    Int,
    integers,
    Integral,
    intercal,
    Intersection,
    intlarhk,
    intprod,
    InvisibleComma,
    InvisibleTimes,
    IOcy,
    iocy,
    Iogon,
    iogon,
    Iopf,
    iopf,
    Iota,
    iota,
    iprod,
    iquest,
    iscr,
    Iscr,
    isin,
    isindot,
    isinE,
    isins,
    isinsv,
    isinv,
    it,
    Itilde,
    itilde,
    Iukcy,
    iukcy,
    Iuml,
    iuml,
    Jcirc,
    jcirc,
    Jcy,
    jcy,
    Jfr,
    jfr,
    jmath,
    Jopf,
    jopf,
    Jscr,
    jscr,
    Jsercy,
    jsercy,
    Jukcy,
    jukcy,
    Kappa,
    kappa,
    kappav,
    Kcedil,
    kcedil,
    Kcy,
    kcy,
    Kfr,
    kfr,
    kgreen,
    KHcy,
    khcy,
    KJcy,
    kjcy,
    Kopf,
    kopf,
    Kscr,
    kscr,
    lAarr,
    Lacute,
    lacute,
    laemptyv,
    lagran,
    Lambda,
    lambda,
    lang,
    Lang,
    langd,
    langle,
    lap,
    Laplacetrf,
    laquo,
    larrb,
    larrbfs,
    larr,
    Larr,
    lArr,
    larrfs,
    larrhk,
    larrlp,
    larrpl,
    larrsim,
    larrtl,
    latail,
    lAtail,
    lat,
    late,
    lates,
    lbarr,
    lBarr,
    lbbrk,
    lbrace,
    lbrack,
    lbrke,
    lbrksld,
    lbrkslu,
    Lcaron,
    lcaron,
    Lcedil,
    lcedil,
    lceil,
    lcub,
    Lcy,
    lcy,
    ldca,
    ldquo,
    ldquor,
    ldrdhar,
    ldrushar,
    ldsh,
    le,
    lE,
    LeftAngleBracket,
    LeftArrowBar,
    leftarrow,
    LeftArrow,
    Leftarrow,
    LeftArrowRightArrow,
    leftarrowtail,
    LeftCeiling,
    LeftDoubleBracket,
    LeftDownTeeVector,
    LeftDownVectorBar,
    LeftDownVector,
    LeftFloor,
    leftharpoondown,
    leftharpoonup,
    leftleftarrows,
    leftrightarrow,
    LeftRightArrow,
    Leftrightarrow,
    leftrightarrows,
    leftrightharpoons,
    leftrightsquigarrow,
    LeftRightVector,
    LeftTeeArrow,
    LeftTee,
    LeftTeeVector,
    leftthreetimes,
    LeftTriangleBar,
    LeftTriangle,
    LeftTriangleEqual,
    LeftUpDownVector,
    LeftUpTeeVector,
    LeftUpVectorBar,
    LeftUpVector,
    LeftVectorBar,
    LeftVector,
    lEg,
    leg,
    leq,
    leqq,
    leqslant,
    lescc,
    les,
    lesdot,
    lesdoto,
    lesdotor,
    lesg,
    lesges,
    lessapprox,
    lessdot,
    lesseqgtr,
    lesseqqgtr,
    LessEqualGreater,
    LessFullEqual,
    LessGreater,
    lessgtr,
    LessLess,
    lesssim,
    LessSlantEqual,
    LessTilde,
    lfisht,
    lfloor,
    Lfr,
    lfr,
    lg,
    lgE,
    lHar,
    lhard,
    lharu,
    lharul,
    lhblk,
    LJcy,
    ljcy,
    llarr,
    ll,
    Ll,
    llcorner,
    Lleftarrow,
    llhard,
    lltri,
    Lmidot,
    lmidot,
    lmoustache,
    lmoust,
    lnap,
    lnapprox,
    lne,
    lnE,
    lneq,
    lneqq,
    lnsim,
    loang,
    loarr,
    lobrk,
    longleftarrow,
    LongLeftArrow,
    Longleftarrow,
    longleftrightarrow,
    LongLeftRightArrow,
    Longleftrightarrow,
    longmapsto,
    longrightarrow,
    LongRightArrow,
    Longrightarrow,
    looparrowleft,
    looparrowright,
    lopar,
    Lopf,
    lopf,
    loplus,
    lotimes,
    lowast,
    lowbar,
    LowerLeftArrow,
    LowerRightArrow,
    loz,
    lozenge,
    lozf,
    lpar,
    lparlt,
    lrarr,
    lrcorner,
    lrhar,
    lrhard,
    lrm,
    lrtri,
    lsaquo,
    lscr,
    Lscr,
    lsh,
    Lsh,
    lsim,
    lsime,
    lsimg,
    lsqb,
    lsquo,
    lsquor,
    Lstrok,
    lstrok,
    ltcc,
    ltcir,
    lt,
    LT,
    Lt,
    ltdot,
    lthree,
    ltimes,
    ltlarr,
    ltquest,
    ltri,
    ltrie,
    ltrif,
    ltrPar,
    lurdshar,
    luruhar,
    lvertneqq,
    lvnE,
    macr,
    male,
    malt,
    maltese,
    "Map": "⤅",
    map,
    mapsto,
    mapstodown,
    mapstoleft,
    mapstoup,
    marker,
    mcomma,
    Mcy,
    mcy,
    mdash,
    mDDot,
    measuredangle,
    MediumSpace,
    Mellintrf,
    Mfr,
    mfr,
    mho,
    micro,
    midast,
    midcir,
    mid,
    middot,
    minusb,
    minus,
    minusd,
    minusdu,
    MinusPlus,
    mlcp,
    mldr,
    mnplus,
    models,
    Mopf,
    mopf,
    mp,
    mscr,
    Mscr,
    mstpos,
    Mu,
    mu,
    multimap,
    mumap,
    nabla,
    Nacute,
    nacute,
    nang,
    nap,
    napE,
    napid,
    napos,
    napprox,
    natural,
    naturals,
    natur,
    nbsp,
    nbump,
    nbumpe,
    ncap,
    Ncaron,
    ncaron,
    Ncedil,
    ncedil,
    ncong,
    ncongdot,
    ncup,
    Ncy,
    ncy,
    ndash,
    nearhk,
    nearr,
    neArr,
    nearrow,
    ne,
    nedot,
    NegativeMediumSpace,
    NegativeThickSpace,
    NegativeThinSpace,
    NegativeVeryThinSpace,
    nequiv,
    nesear,
    nesim,
    NestedGreaterGreater,
    NestedLessLess,
    NewLine,
    nexist,
    nexists,
    Nfr,
    nfr,
    ngE,
    nge,
    ngeq,
    ngeqq,
    ngeqslant,
    nges,
    nGg,
    ngsim,
    nGt,
    ngt,
    ngtr,
    nGtv,
    nharr,
    nhArr,
    nhpar,
    ni,
    nis,
    nisd,
    niv,
    NJcy,
    njcy,
    nlarr,
    nlArr,
    nldr,
    nlE,
    nle,
    nleftarrow,
    nLeftarrow,
    nleftrightarrow,
    nLeftrightarrow,
    nleq,
    nleqq,
    nleqslant,
    nles,
    nless,
    nLl,
    nlsim,
    nLt,
    nlt,
    nltri,
    nltrie,
    nLtv,
    nmid,
    NoBreak,
    NonBreakingSpace,
    nopf,
    Nopf,
    Not,
    not,
    NotCongruent,
    NotCupCap,
    NotDoubleVerticalBar,
    NotElement,
    NotEqual,
    NotEqualTilde,
    NotExists,
    NotGreater,
    NotGreaterEqual,
    NotGreaterFullEqual,
    NotGreaterGreater,
    NotGreaterLess,
    NotGreaterSlantEqual,
    NotGreaterTilde,
    NotHumpDownHump,
    NotHumpEqual,
    notin,
    notindot,
    notinE,
    notinva,
    notinvb,
    notinvc,
    NotLeftTriangleBar,
    NotLeftTriangle,
    NotLeftTriangleEqual,
    NotLess,
    NotLessEqual,
    NotLessGreater,
    NotLessLess,
    NotLessSlantEqual,
    NotLessTilde,
    NotNestedGreaterGreater,
    NotNestedLessLess,
    notni,
    notniva,
    notnivb,
    notnivc,
    NotPrecedes,
    NotPrecedesEqual,
    NotPrecedesSlantEqual,
    NotReverseElement,
    NotRightTriangleBar,
    NotRightTriangle,
    NotRightTriangleEqual,
    NotSquareSubset,
    NotSquareSubsetEqual,
    NotSquareSuperset,
    NotSquareSupersetEqual,
    NotSubset,
    NotSubsetEqual,
    NotSucceeds,
    NotSucceedsEqual,
    NotSucceedsSlantEqual,
    NotSucceedsTilde,
    NotSuperset,
    NotSupersetEqual,
    NotTilde,
    NotTildeEqual,
    NotTildeFullEqual,
    NotTildeTilde,
    NotVerticalBar,
    nparallel,
    npar,
    nparsl,
    npart,
    npolint,
    npr,
    nprcue,
    nprec,
    npreceq,
    npre,
    nrarrc,
    nrarr,
    nrArr,
    nrarrw,
    nrightarrow,
    nRightarrow,
    nrtri,
    nrtrie,
    nsc,
    nsccue,
    nsce,
    Nscr,
    nscr,
    nshortmid,
    nshortparallel,
    nsim,
    nsime,
    nsimeq,
    nsmid,
    nspar,
    nsqsube,
    nsqsupe,
    nsub,
    nsubE,
    nsube,
    nsubset,
    nsubseteq,
    nsubseteqq,
    nsucc,
    nsucceq,
    nsup,
    nsupE,
    nsupe,
    nsupset,
    nsupseteq,
    nsupseteqq,
    ntgl,
    Ntilde,
    ntilde,
    ntlg,
    ntriangleleft,
    ntrianglelefteq,
    ntriangleright,
    ntrianglerighteq,
    Nu,
    nu,
    num,
    numero,
    numsp,
    nvap,
    nvdash,
    nvDash,
    nVdash,
    nVDash,
    nvge,
    nvgt,
    nvHarr,
    nvinfin,
    nvlArr,
    nvle,
    nvlt,
    nvltrie,
    nvrArr,
    nvrtrie,
    nvsim,
    nwarhk,
    nwarr,
    nwArr,
    nwarrow,
    nwnear,
    Oacute,
    oacute,
    oast,
    Ocirc,
    ocirc,
    ocir,
    Ocy,
    ocy,
    odash,
    Odblac,
    odblac,
    odiv,
    odot,
    odsold,
    OElig,
    oelig,
    ofcir,
    Ofr,
    ofr,
    ogon,
    Ograve,
    ograve,
    ogt,
    ohbar,
    ohm,
    oint,
    olarr,
    olcir,
    olcross,
    oline,
    olt,
    Omacr,
    omacr,
    Omega,
    omega,
    Omicron,
    omicron,
    omid,
    ominus,
    Oopf,
    oopf,
    opar,
    OpenCurlyDoubleQuote,
    OpenCurlyQuote,
    operp,
    oplus,
    orarr,
    Or,
    or,
    ord,
    order,
    orderof,
    ordf,
    ordm,
    origof,
    oror,
    orslope,
    orv,
    oS,
    Oscr,
    oscr,
    Oslash,
    oslash,
    osol,
    Otilde,
    otilde,
    otimesas,
    Otimes,
    otimes,
    Ouml,
    ouml,
    ovbar,
    OverBar,
    OverBrace,
    OverBracket,
    OverParenthesis,
    para,
    parallel,
    par,
    parsim,
    parsl,
    part,
    PartialD,
    Pcy,
    pcy,
    percnt,
    period,
    permil,
    perp,
    pertenk,
    Pfr,
    pfr,
    Phi,
    phi,
    phiv,
    phmmat,
    phone,
    Pi,
    pi,
    pitchfork,
    piv,
    planck,
    planckh,
    plankv,
    plusacir,
    plusb,
    pluscir,
    plus,
    plusdo,
    plusdu,
    pluse,
    PlusMinus,
    plusmn,
    plussim,
    plustwo,
    pm,
    Poincareplane,
    pointint,
    popf,
    Popf,
    pound,
    prap,
    Pr,
    pr,
    prcue,
    precapprox,
    prec,
    preccurlyeq,
    Precedes,
    PrecedesEqual,
    PrecedesSlantEqual,
    PrecedesTilde,
    preceq,
    precnapprox,
    precneqq,
    precnsim,
    pre,
    prE,
    precsim,
    prime,
    Prime,
    primes,
    prnap,
    prnE,
    prnsim,
    prod,
    Product,
    profalar,
    profline,
    profsurf,
    prop,
    Proportional,
    Proportion,
    propto,
    prsim,
    prurel,
    Pscr,
    pscr,
    Psi,
    psi,
    puncsp,
    Qfr,
    qfr,
    qint,
    qopf,
    Qopf,
    qprime,
    Qscr,
    qscr,
    quaternions,
    quatint,
    quest,
    questeq,
    quot,
    QUOT,
    rAarr,
    race,
    Racute,
    racute,
    radic,
    raemptyv,
    rang,
    Rang,
    rangd,
    range,
    rangle,
    raquo,
    rarrap,
    rarrb,
    rarrbfs,
    rarrc,
    rarr,
    Rarr,
    rArr,
    rarrfs,
    rarrhk,
    rarrlp,
    rarrpl,
    rarrsim,
    Rarrtl,
    rarrtl,
    rarrw,
    ratail,
    rAtail,
    ratio,
    rationals,
    rbarr,
    rBarr,
    RBarr,
    rbbrk,
    rbrace,
    rbrack,
    rbrke,
    rbrksld,
    rbrkslu,
    Rcaron,
    rcaron,
    Rcedil,
    rcedil,
    rceil,
    rcub,
    Rcy,
    rcy,
    rdca,
    rdldhar,
    rdquo,
    rdquor,
    rdsh,
    real,
    realine,
    realpart,
    reals,
    Re,
    rect,
    reg,
    REG,
    ReverseElement,
    ReverseEquilibrium,
    ReverseUpEquilibrium,
    rfisht,
    rfloor,
    rfr,
    Rfr,
    rHar,
    rhard,
    rharu,
    rharul,
    Rho,
    rho,
    rhov,
    RightAngleBracket,
    RightArrowBar,
    rightarrow,
    RightArrow,
    Rightarrow,
    RightArrowLeftArrow,
    rightarrowtail,
    RightCeiling,
    RightDoubleBracket,
    RightDownTeeVector,
    RightDownVectorBar,
    RightDownVector,
    RightFloor,
    rightharpoondown,
    rightharpoonup,
    rightleftarrows,
    rightleftharpoons,
    rightrightarrows,
    rightsquigarrow,
    RightTeeArrow,
    RightTee,
    RightTeeVector,
    rightthreetimes,
    RightTriangleBar,
    RightTriangle,
    RightTriangleEqual,
    RightUpDownVector,
    RightUpTeeVector,
    RightUpVectorBar,
    RightUpVector,
    RightVectorBar,
    RightVector,
    ring,
    risingdotseq,
    rlarr,
    rlhar,
    rlm,
    rmoustache,
    rmoust,
    rnmid,
    roang,
    roarr,
    robrk,
    ropar,
    ropf,
    Ropf,
    roplus,
    rotimes,
    RoundImplies,
    rpar,
    rpargt,
    rppolint,
    rrarr,
    Rrightarrow,
    rsaquo,
    rscr,
    Rscr,
    rsh,
    Rsh,
    rsqb,
    rsquo,
    rsquor,
    rthree,
    rtimes,
    rtri,
    rtrie,
    rtrif,
    rtriltri,
    RuleDelayed,
    ruluhar,
    rx,
    Sacute,
    sacute,
    sbquo,
    scap,
    Scaron,
    scaron,
    Sc,
    sc,
    sccue,
    sce,
    scE,
    Scedil,
    scedil,
    Scirc,
    scirc,
    scnap,
    scnE,
    scnsim,
    scpolint,
    scsim,
    Scy,
    scy,
    sdotb,
    sdot,
    sdote,
    searhk,
    searr,
    seArr,
    searrow,
    sect,
    semi,
    seswar,
    setminus,
    setmn,
    sext,
    Sfr,
    sfr,
    sfrown,
    sharp,
    SHCHcy,
    shchcy,
    SHcy,
    shcy,
    ShortDownArrow,
    ShortLeftArrow,
    shortmid,
    shortparallel,
    ShortRightArrow,
    ShortUpArrow,
    shy,
    Sigma,
    sigma,
    sigmaf,
    sigmav,
    sim,
    simdot,
    sime,
    simeq,
    simg,
    simgE,
    siml,
    simlE,
    simne,
    simplus,
    simrarr,
    slarr,
    SmallCircle,
    smallsetminus,
    smashp,
    smeparsl,
    smid,
    smile,
    smt,
    smte,
    smtes,
    SOFTcy,
    softcy,
    solbar,
    solb,
    sol,
    Sopf,
    sopf,
    spades,
    spadesuit,
    spar,
    sqcap,
    sqcaps,
    sqcup,
    sqcups,
    Sqrt,
    sqsub,
    sqsube,
    sqsubset,
    sqsubseteq,
    sqsup,
    sqsupe,
    sqsupset,
    sqsupseteq,
    square,
    Square,
    SquareIntersection,
    SquareSubset,
    SquareSubsetEqual,
    SquareSuperset,
    SquareSupersetEqual,
    SquareUnion,
    squarf,
    squ,
    squf,
    srarr,
    Sscr,
    sscr,
    ssetmn,
    ssmile,
    sstarf,
    Star,
    star,
    starf,
    straightepsilon,
    straightphi,
    strns,
    sub,
    Sub,
    subdot,
    subE,
    sube,
    subedot,
    submult,
    subnE,
    subne,
    subplus,
    subrarr,
    subset,
    Subset,
    subseteq,
    subseteqq,
    SubsetEqual,
    subsetneq,
    subsetneqq,
    subsim,
    subsub,
    subsup,
    succapprox,
    succ,
    succcurlyeq,
    Succeeds,
    SucceedsEqual,
    SucceedsSlantEqual,
    SucceedsTilde,
    succeq,
    succnapprox,
    succneqq,
    succnsim,
    succsim,
    SuchThat,
    sum,
    Sum,
    sung,
    sup1,
    sup2,
    sup3,
    sup,
    Sup,
    supdot,
    supdsub,
    supE,
    supe,
    supedot,
    Superset,
    SupersetEqual,
    suphsol,
    suphsub,
    suplarr,
    supmult,
    supnE,
    supne,
    supplus,
    supset,
    Supset,
    supseteq,
    supseteqq,
    supsetneq,
    supsetneqq,
    supsim,
    supsub,
    supsup,
    swarhk,
    swarr,
    swArr,
    swarrow,
    swnwar,
    szlig,
    Tab,
    target,
    Tau,
    tau,
    tbrk,
    Tcaron,
    tcaron,
    Tcedil,
    tcedil,
    Tcy,
    tcy,
    tdot,
    telrec,
    Tfr,
    tfr,
    there4,
    therefore,
    Therefore,
    Theta,
    theta,
    thetasym,
    thetav,
    thickapprox,
    thicksim,
    ThickSpace,
    ThinSpace,
    thinsp,
    thkap,
    thksim,
    THORN,
    thorn,
    tilde,
    Tilde,
    TildeEqual,
    TildeFullEqual,
    TildeTilde,
    timesbar,
    timesb,
    times,
    timesd,
    tint,
    toea,
    topbot,
    topcir,
    top,
    Topf,
    topf,
    topfork,
    tosa,
    tprime,
    trade,
    TRADE,
    triangle,
    triangledown,
    triangleleft,
    trianglelefteq,
    triangleq,
    triangleright,
    trianglerighteq,
    tridot,
    trie,
    triminus,
    TripleDot,
    triplus,
    trisb,
    tritime,
    trpezium,
    Tscr,
    tscr,
    TScy,
    tscy,
    TSHcy,
    tshcy,
    Tstrok,
    tstrok,
    twixt,
    twoheadleftarrow,
    twoheadrightarrow,
    Uacute,
    uacute,
    uarr,
    Uarr,
    uArr,
    Uarrocir,
    Ubrcy,
    ubrcy,
    Ubreve,
    ubreve,
    Ucirc,
    ucirc,
    Ucy,
    ucy,
    udarr,
    Udblac,
    udblac,
    udhar,
    ufisht,
    Ufr,
    ufr,
    Ugrave,
    ugrave,
    uHar,
    uharl,
    uharr,
    uhblk,
    ulcorn,
    ulcorner,
    ulcrop,
    ultri,
    Umacr,
    umacr,
    uml,
    UnderBar,
    UnderBrace,
    UnderBracket,
    UnderParenthesis,
    Union,
    UnionPlus,
    Uogon,
    uogon,
    Uopf,
    uopf,
    UpArrowBar,
    uparrow,
    UpArrow,
    Uparrow,
    UpArrowDownArrow,
    updownarrow,
    UpDownArrow,
    Updownarrow,
    UpEquilibrium,
    upharpoonleft,
    upharpoonright,
    uplus,
    UpperLeftArrow,
    UpperRightArrow,
    upsi,
    Upsi,
    upsih,
    Upsilon,
    upsilon,
    UpTeeArrow,
    UpTee,
    upuparrows,
    urcorn,
    urcorner,
    urcrop,
    Uring,
    uring,
    urtri,
    Uscr,
    uscr,
    utdot,
    Utilde,
    utilde,
    utri,
    utrif,
    uuarr,
    Uuml,
    uuml,
    uwangle,
    vangrt,
    varepsilon,
    varkappa,
    varnothing,
    varphi,
    varpi,
    varpropto,
    varr,
    vArr,
    varrho,
    varsigma,
    varsubsetneq,
    varsubsetneqq,
    varsupsetneq,
    varsupsetneqq,
    vartheta,
    vartriangleleft,
    vartriangleright,
    vBar,
    Vbar,
    vBarv,
    Vcy,
    vcy,
    vdash,
    vDash,
    Vdash,
    VDash,
    Vdashl,
    veebar,
    vee,
    Vee,
    veeeq,
    vellip,
    verbar,
    Verbar,
    vert,
    Vert,
    VerticalBar,
    VerticalLine,
    VerticalSeparator,
    VerticalTilde,
    VeryThinSpace,
    Vfr,
    vfr,
    vltri,
    vnsub,
    vnsup,
    Vopf,
    vopf,
    vprop,
    vrtri,
    Vscr,
    vscr,
    vsubnE,
    vsubne,
    vsupnE,
    vsupne,
    Vvdash,
    vzigzag,
    Wcirc,
    wcirc,
    wedbar,
    wedge,
    Wedge,
    wedgeq,
    weierp,
    Wfr,
    wfr,
    Wopf,
    wopf,
    wp,
    wr,
    wreath,
    Wscr,
    wscr,
    xcap,
    xcirc,
    xcup,
    xdtri,
    Xfr,
    xfr,
    xharr,
    xhArr,
    Xi,
    xi,
    xlarr,
    xlArr,
    xmap,
    xnis,
    xodot,
    Xopf,
    xopf,
    xoplus,
    xotime,
    xrarr,
    xrArr,
    Xscr,
    xscr,
    xsqcup,
    xuplus,
    xutri,
    xvee,
    xwedge,
    Yacute,
    yacute,
    YAcy,
    yacy,
    Ycirc,
    ycirc,
    Ycy,
    ycy,
    yen,
    Yfr,
    yfr,
    YIcy,
    yicy,
    Yopf,
    yopf,
    Yscr,
    yscr,
    YUcy,
    yucy,
    yuml,
    Yuml,
    Zacute,
    zacute,
    Zcaron,
    zcaron,
    Zcy,
    zcy,
    Zdot,
    zdot,
    zeetrf,
    ZeroWidthSpace,
    Zeta,
    zeta,
    zfr,
    Zfr,
    ZHcy,
    zhcy,
    zigrarr,
    zopf,
    Zopf,
    Zscr,
    zscr,
    zwj,
    zwnj
  };
  var entities;
  var hasRequiredEntities;
  function requireEntities() {
    if (hasRequiredEntities) return entities;
    hasRequiredEntities = 1;
    entities = require$$0;
    return entities;
  }
  var regex$4;
  var hasRequiredRegex$4;
  function requireRegex$4() {
    if (hasRequiredRegex$4) return regex$4;
    hasRequiredRegex$4 = 1;
    regex$4 = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4E\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/;
    return regex$4;
  }
  var mdurl = {};
  var encode_1;
  var hasRequiredEncode;
  function requireEncode() {
    if (hasRequiredEncode) return encode_1;
    hasRequiredEncode = 1;
    var encodeCache = {};
    function getEncodeCache(exclude) {
      var i2, ch, cache = encodeCache[exclude];
      if (cache) {
        return cache;
      }
      cache = encodeCache[exclude] = [];
      for (i2 = 0; i2 < 128; i2++) {
        ch = String.fromCharCode(i2);
        if (/^[0-9a-z]$/i.test(ch)) {
          cache.push(ch);
        } else {
          cache.push("%" + ("0" + i2.toString(16).toUpperCase()).slice(-2));
        }
      }
      for (i2 = 0; i2 < exclude.length; i2++) {
        cache[exclude.charCodeAt(i2)] = exclude[i2];
      }
      return cache;
    }
    function encode(string, exclude, keepEscaped) {
      var i2, l, code2, nextCode, cache, result = "";
      if (typeof exclude !== "string") {
        keepEscaped = exclude;
        exclude = encode.defaultChars;
      }
      if (typeof keepEscaped === "undefined") {
        keepEscaped = true;
      }
      cache = getEncodeCache(exclude);
      for (i2 = 0, l = string.length; i2 < l; i2++) {
        code2 = string.charCodeAt(i2);
        if (keepEscaped && code2 === 37 && i2 + 2 < l) {
          if (/^[0-9a-f]{2}$/i.test(string.slice(i2 + 1, i2 + 3))) {
            result += string.slice(i2, i2 + 3);
            i2 += 2;
            continue;
          }
        }
        if (code2 < 128) {
          result += cache[code2];
          continue;
        }
        if (code2 >= 55296 && code2 <= 57343) {
          if (code2 >= 55296 && code2 <= 56319 && i2 + 1 < l) {
            nextCode = string.charCodeAt(i2 + 1);
            if (nextCode >= 56320 && nextCode <= 57343) {
              result += encodeURIComponent(string[i2] + string[i2 + 1]);
              i2++;
              continue;
            }
          }
          result += "%EF%BF%BD";
          continue;
        }
        result += encodeURIComponent(string[i2]);
      }
      return result;
    }
    encode.defaultChars = ";/?:@&=+$,-_.!~*'()#";
    encode.componentChars = "-_.!~*'()";
    encode_1 = encode;
    return encode_1;
  }
  var decode_1;
  var hasRequiredDecode;
  function requireDecode() {
    if (hasRequiredDecode) return decode_1;
    hasRequiredDecode = 1;
    var decodeCache = {};
    function getDecodeCache(exclude) {
      var i2, ch, cache = decodeCache[exclude];
      if (cache) {
        return cache;
      }
      cache = decodeCache[exclude] = [];
      for (i2 = 0; i2 < 128; i2++) {
        ch = String.fromCharCode(i2);
        cache.push(ch);
      }
      for (i2 = 0; i2 < exclude.length; i2++) {
        ch = exclude.charCodeAt(i2);
        cache[ch] = "%" + ("0" + ch.toString(16).toUpperCase()).slice(-2);
      }
      return cache;
    }
    function decode(string, exclude) {
      var cache;
      if (typeof exclude !== "string") {
        exclude = decode.defaultChars;
      }
      cache = getDecodeCache(exclude);
      return string.replace(/(%[a-f0-9]{2})+/gi, function(seq) {
        var i2, l, b1, b2, b3, b4, chr, result = "";
        for (i2 = 0, l = seq.length; i2 < l; i2 += 3) {
          b1 = parseInt(seq.slice(i2 + 1, i2 + 3), 16);
          if (b1 < 128) {
            result += cache[b1];
            continue;
          }
          if ((b1 & 224) === 192 && i2 + 3 < l) {
            b2 = parseInt(seq.slice(i2 + 4, i2 + 6), 16);
            if ((b2 & 192) === 128) {
              chr = b1 << 6 & 1984 | b2 & 63;
              if (chr < 128) {
                result += "��";
              } else {
                result += String.fromCharCode(chr);
              }
              i2 += 3;
              continue;
            }
          }
          if ((b1 & 240) === 224 && i2 + 6 < l) {
            b2 = parseInt(seq.slice(i2 + 4, i2 + 6), 16);
            b3 = parseInt(seq.slice(i2 + 7, i2 + 9), 16);
            if ((b2 & 192) === 128 && (b3 & 192) === 128) {
              chr = b1 << 12 & 61440 | b2 << 6 & 4032 | b3 & 63;
              if (chr < 2048 || chr >= 55296 && chr <= 57343) {
                result += "���";
              } else {
                result += String.fromCharCode(chr);
              }
              i2 += 6;
              continue;
            }
          }
          if ((b1 & 248) === 240 && i2 + 9 < l) {
            b2 = parseInt(seq.slice(i2 + 4, i2 + 6), 16);
            b3 = parseInt(seq.slice(i2 + 7, i2 + 9), 16);
            b4 = parseInt(seq.slice(i2 + 10, i2 + 12), 16);
            if ((b2 & 192) === 128 && (b3 & 192) === 128 && (b4 & 192) === 128) {
              chr = b1 << 18 & 1835008 | b2 << 12 & 258048 | b3 << 6 & 4032 | b4 & 63;
              if (chr < 65536 || chr > 1114111) {
                result += "����";
              } else {
                chr -= 65536;
                result += String.fromCharCode(55296 + (chr >> 10), 56320 + (chr & 1023));
              }
              i2 += 9;
              continue;
            }
          }
          result += "�";
        }
        return result;
      });
    }
    decode.defaultChars = ";/?:@&=+$,#";
    decode.componentChars = "";
    decode_1 = decode;
    return decode_1;
  }
  var format;
  var hasRequiredFormat;
  function requireFormat() {
    if (hasRequiredFormat) return format;
    hasRequiredFormat = 1;
    format = function format2(url) {
      var result = "";
      result += url.protocol || "";
      result += url.slashes ? "//" : "";
      result += url.auth ? url.auth + "@" : "";
      if (url.hostname && url.hostname.indexOf(":") !== -1) {
        result += "[" + url.hostname + "]";
      } else {
        result += url.hostname || "";
      }
      result += url.port ? ":" + url.port : "";
      result += url.pathname || "";
      result += url.search || "";
      result += url.hash || "";
      return result;
    };
    return format;
  }
  var parse;
  var hasRequiredParse;
  function requireParse() {
    if (hasRequiredParse) return parse;
    hasRequiredParse = 1;
    function Url() {
      this.protocol = null;
      this.slashes = null;
      this.auth = null;
      this.port = null;
      this.hostname = null;
      this.hash = null;
      this.search = null;
      this.pathname = null;
    }
    var protocolPattern = /^([a-z0-9.+-]+:)/i, portPattern = /:[0-9]*$/, simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, delims = ["<", ">", '"', "`", " ", "\r", "\n", "	"], unwise = ["{", "}", "|", "\\", "^", "`"].concat(delims), autoEscape = ["'"].concat(unwise), nonHostChars = ["%", "/", "?", ";", "#"].concat(autoEscape), hostEndingChars = ["/", "?", "#"], hostnameMaxLen = 255, hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/, hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, hostlessProtocol = {
      "javascript": true,
      "javascript:": true
    }, slashedProtocol = {
      "http": true,
      "https": true,
      "ftp": true,
      "gopher": true,
      "file": true,
      "http:": true,
      "https:": true,
      "ftp:": true,
      "gopher:": true,
      "file:": true
    };
    function urlParse(url, slashesDenoteHost) {
      if (url && url instanceof Url) {
        return url;
      }
      var u = new Url();
      u.parse(url, slashesDenoteHost);
      return u;
    }
    Url.prototype.parse = function(url, slashesDenoteHost) {
      var i2, l, lowerProto, hec, slashes, rest = url;
      rest = rest.trim();
      if (!slashesDenoteHost && url.split("#").length === 1) {
        var simplePath = simplePathPattern.exec(rest);
        if (simplePath) {
          this.pathname = simplePath[1];
          if (simplePath[2]) {
            this.search = simplePath[2];
          }
          return this;
        }
      }
      var proto = protocolPattern.exec(rest);
      if (proto) {
        proto = proto[0];
        lowerProto = proto.toLowerCase();
        this.protocol = proto;
        rest = rest.substr(proto.length);
      }
      if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
        slashes = rest.substr(0, 2) === "//";
        if (slashes && !(proto && hostlessProtocol[proto])) {
          rest = rest.substr(2);
          this.slashes = true;
        }
      }
      if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
        var hostEnd = -1;
        for (i2 = 0; i2 < hostEndingChars.length; i2++) {
          hec = rest.indexOf(hostEndingChars[i2]);
          if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
            hostEnd = hec;
          }
        }
        var auth, atSign;
        if (hostEnd === -1) {
          atSign = rest.lastIndexOf("@");
        } else {
          atSign = rest.lastIndexOf("@", hostEnd);
        }
        if (atSign !== -1) {
          auth = rest.slice(0, atSign);
          rest = rest.slice(atSign + 1);
          this.auth = auth;
        }
        hostEnd = -1;
        for (i2 = 0; i2 < nonHostChars.length; i2++) {
          hec = rest.indexOf(nonHostChars[i2]);
          if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
            hostEnd = hec;
          }
        }
        if (hostEnd === -1) {
          hostEnd = rest.length;
        }
        if (rest[hostEnd - 1] === ":") {
          hostEnd--;
        }
        var host = rest.slice(0, hostEnd);
        rest = rest.slice(hostEnd);
        this.parseHost(host);
        this.hostname = this.hostname || "";
        var ipv6Hostname = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
        if (!ipv6Hostname) {
          var hostparts = this.hostname.split(/\./);
          for (i2 = 0, l = hostparts.length; i2 < l; i2++) {
            var part2 = hostparts[i2];
            if (!part2) {
              continue;
            }
            if (!part2.match(hostnamePartPattern)) {
              var newpart = "";
              for (var j = 0, k = part2.length; j < k; j++) {
                if (part2.charCodeAt(j) > 127) {
                  newpart += "x";
                } else {
                  newpart += part2[j];
                }
              }
              if (!newpart.match(hostnamePartPattern)) {
                var validParts = hostparts.slice(0, i2);
                var notHost = hostparts.slice(i2 + 1);
                var bit = part2.match(hostnamePartStart);
                if (bit) {
                  validParts.push(bit[1]);
                  notHost.unshift(bit[2]);
                }
                if (notHost.length) {
                  rest = notHost.join(".") + rest;
                }
                this.hostname = validParts.join(".");
                break;
              }
            }
          }
        }
        if (this.hostname.length > hostnameMaxLen) {
          this.hostname = "";
        }
        if (ipv6Hostname) {
          this.hostname = this.hostname.substr(1, this.hostname.length - 2);
        }
      }
      var hash = rest.indexOf("#");
      if (hash !== -1) {
        this.hash = rest.substr(hash);
        rest = rest.slice(0, hash);
      }
      var qm = rest.indexOf("?");
      if (qm !== -1) {
        this.search = rest.substr(qm);
        rest = rest.slice(0, qm);
      }
      if (rest) {
        this.pathname = rest;
      }
      if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
        this.pathname = "";
      }
      return this;
    };
    Url.prototype.parseHost = function(host) {
      var port = portPattern.exec(host);
      if (port) {
        port = port[0];
        if (port !== ":") {
          this.port = port.substr(1);
        }
        host = host.substr(0, host.length - port.length);
      }
      if (host) {
        this.hostname = host;
      }
    };
    parse = urlParse;
    return parse;
  }
  var hasRequiredMdurl;
  function requireMdurl() {
    if (hasRequiredMdurl) return mdurl;
    hasRequiredMdurl = 1;
    mdurl.encode = requireEncode();
    mdurl.decode = requireDecode();
    mdurl.format = requireFormat();
    mdurl.parse = requireParse();
    return mdurl;
  }
  var uc_micro = {};
  var regex$3;
  var hasRequiredRegex$3;
  function requireRegex$3() {
    if (hasRequiredRegex$3) return regex$3;
    hasRequiredRegex$3 = 1;
    regex$3 = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
    return regex$3;
  }
  var regex$2;
  var hasRequiredRegex$2;
  function requireRegex$2() {
    if (hasRequiredRegex$2) return regex$2;
    hasRequiredRegex$2 = 1;
    regex$2 = /[\0-\x1F\x7F-\x9F]/;
    return regex$2;
  }
  var regex$1;
  var hasRequiredRegex$1;
  function requireRegex$1() {
    if (hasRequiredRegex$1) return regex$1;
    hasRequiredRegex$1 = 1;
    regex$1 = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/;
    return regex$1;
  }
  var regex;
  var hasRequiredRegex;
  function requireRegex() {
    if (hasRequiredRegex) return regex;
    hasRequiredRegex = 1;
    regex = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;
    return regex;
  }
  var hasRequiredUc_micro;
  function requireUc_micro() {
    if (hasRequiredUc_micro) return uc_micro;
    hasRequiredUc_micro = 1;
    uc_micro.Any = requireRegex$3();
    uc_micro.Cc = requireRegex$2();
    uc_micro.Cf = requireRegex$1();
    uc_micro.P = requireRegex$4();
    uc_micro.Z = requireRegex();
    return uc_micro;
  }
  var hasRequiredUtils;
  function requireUtils() {
    if (hasRequiredUtils) return utils;
    hasRequiredUtils = 1;
    (function(exports$1) {
      function _class(obj) {
        return Object.prototype.toString.call(obj);
      }
      function isString2(obj) {
        return _class(obj) === "[object String]";
      }
      var _hasOwnProperty = Object.prototype.hasOwnProperty;
      function has(object, key) {
        return _hasOwnProperty.call(object, key);
      }
      function assign(obj) {
        var sources = Array.prototype.slice.call(arguments, 1);
        sources.forEach(function(source) {
          if (!source) {
            return;
          }
          if (typeof source !== "object") {
            throw new TypeError(source + "must be object");
          }
          Object.keys(source).forEach(function(key) {
            obj[key] = source[key];
          });
        });
        return obj;
      }
      function arrayReplaceAt(src, pos, newElements) {
        return [].concat(src.slice(0, pos), newElements, src.slice(pos + 1));
      }
      function isValidEntityCode(c) {
        if (c >= 55296 && c <= 57343) {
          return false;
        }
        if (c >= 64976 && c <= 65007) {
          return false;
        }
        if ((c & 65535) === 65535 || (c & 65535) === 65534) {
          return false;
        }
        if (c >= 0 && c <= 8) {
          return false;
        }
        if (c === 11) {
          return false;
        }
        if (c >= 14 && c <= 31) {
          return false;
        }
        if (c >= 127 && c <= 159) {
          return false;
        }
        if (c > 1114111) {
          return false;
        }
        return true;
      }
      function fromCodePoint(c) {
        if (c > 65535) {
          c -= 65536;
          var surrogate1 = 55296 + (c >> 10), surrogate2 = 56320 + (c & 1023);
          return String.fromCharCode(surrogate1, surrogate2);
        }
        return String.fromCharCode(c);
      }
      var UNESCAPE_MD_RE = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g;
      var ENTITY_RE = /&([a-z#][a-z0-9]{1,31});/gi;
      var UNESCAPE_ALL_RE = new RegExp(UNESCAPE_MD_RE.source + "|" + ENTITY_RE.source, "gi");
      var DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i;
      var entities2 = requireEntities();
      function replaceEntityPattern(match, name) {
        var code2 = 0;
        if (has(entities2, name)) {
          return entities2[name];
        }
        if (name.charCodeAt(0) === 35 && DIGITAL_ENTITY_TEST_RE.test(name)) {
          code2 = name[1].toLowerCase() === "x" ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
          if (isValidEntityCode(code2)) {
            return fromCodePoint(code2);
          }
        }
        return match;
      }
      function unescapeMd(str) {
        if (str.indexOf("\\") < 0) {
          return str;
        }
        return str.replace(UNESCAPE_MD_RE, "$1");
      }
      function unescapeAll(str) {
        if (str.indexOf("\\") < 0 && str.indexOf("&") < 0) {
          return str;
        }
        return str.replace(UNESCAPE_ALL_RE, function(match, escaped, entity2) {
          if (escaped) {
            return escaped;
          }
          return replaceEntityPattern(match, entity2);
        });
      }
      var HTML_ESCAPE_TEST_RE = /[&<>"]/;
      var HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
      var HTML_REPLACEMENTS = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;"
      };
      function replaceUnsafeChar(ch) {
        return HTML_REPLACEMENTS[ch];
      }
      function escapeHtml(str) {
        if (HTML_ESCAPE_TEST_RE.test(str)) {
          return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
        }
        return str;
      }
      var REGEXP_ESCAPE_RE = /[.?*+^$[\]\\(){}|-]/g;
      function escapeRE(str) {
        return str.replace(REGEXP_ESCAPE_RE, "\\$&");
      }
      function isSpace(code2) {
        switch (code2) {
          case 9:
          case 32:
            return true;
        }
        return false;
      }
      function isWhiteSpace(code2) {
        if (code2 >= 8192 && code2 <= 8202) {
          return true;
        }
        switch (code2) {
          case 9:
          // \t
          case 10:
          // \n
          case 11:
          // \v
          case 12:
          // \f
          case 13:
          // \r
          case 32:
          case 160:
          case 5760:
          case 8239:
          case 8287:
          case 12288:
            return true;
        }
        return false;
      }
      var UNICODE_PUNCT_RE = requireRegex$4();
      function isPunctChar(ch) {
        return UNICODE_PUNCT_RE.test(ch);
      }
      function isMdAsciiPunct(ch) {
        switch (ch) {
          case 33:
          case 34:
          case 35:
          case 36:
          case 37:
          case 38:
          case 39:
          case 40:
          case 41:
          case 42:
          case 43:
          case 44:
          case 45:
          case 46:
          case 47:
          case 58:
          case 59:
          case 60:
          case 61:
          case 62:
          case 63:
          case 64:
          case 91:
          case 92:
          case 93:
          case 94:
          case 95:
          case 96:
          case 123:
          case 124:
          case 125:
          case 126:
            return true;
          default:
            return false;
        }
      }
      function normalizeReference(str) {
        return str.trim().replace(/\s+/g, " ").toUpperCase();
      }
      exports$1.lib = {};
      exports$1.lib.mdurl = requireMdurl();
      exports$1.lib.ucmicro = requireUc_micro();
      exports$1.assign = assign;
      exports$1.isString = isString2;
      exports$1.has = has;
      exports$1.unescapeMd = unescapeMd;
      exports$1.unescapeAll = unescapeAll;
      exports$1.isValidEntityCode = isValidEntityCode;
      exports$1.fromCodePoint = fromCodePoint;
      exports$1.escapeHtml = escapeHtml;
      exports$1.arrayReplaceAt = arrayReplaceAt;
      exports$1.isSpace = isSpace;
      exports$1.isWhiteSpace = isWhiteSpace;
      exports$1.isMdAsciiPunct = isMdAsciiPunct;
      exports$1.isPunctChar = isPunctChar;
      exports$1.escapeRE = escapeRE;
      exports$1.normalizeReference = normalizeReference;
    })(utils);
    return utils;
  }
  var helpers = {};
  var parse_link_label;
  var hasRequiredParse_link_label;
  function requireParse_link_label() {
    if (hasRequiredParse_link_label) return parse_link_label;
    hasRequiredParse_link_label = 1;
    parse_link_label = function parseLinkLabel(state, start, disableNested) {
      var level, found, marker2, prevPos, labelEnd = -1, max = state.posMax, oldPos = state.pos;
      state.pos = start + 1;
      level = 1;
      while (state.pos < max) {
        marker2 = state.src.charCodeAt(state.pos);
        if (marker2 === 93) {
          level--;
          if (level === 0) {
            found = true;
            break;
          }
        }
        prevPos = state.pos;
        state.md.inline.skipToken(state);
        if (marker2 === 91) {
          if (prevPos === state.pos - 1) {
            level++;
          } else if (disableNested) {
            state.pos = oldPos;
            return -1;
          }
        }
      }
      if (found) {
        labelEnd = state.pos;
      }
      state.pos = oldPos;
      return labelEnd;
    };
    return parse_link_label;
  }
  var parse_link_destination;
  var hasRequiredParse_link_destination;
  function requireParse_link_destination() {
    if (hasRequiredParse_link_destination) return parse_link_destination;
    hasRequiredParse_link_destination = 1;
    var isSpace = requireUtils().isSpace;
    var unescapeAll = requireUtils().unescapeAll;
    parse_link_destination = function parseLinkDestination(str, pos, max) {
      var code2, level, lines = 0, start = pos, result = {
        ok: false,
        pos: 0,
        lines: 0,
        str: ""
      };
      if (str.charCodeAt(pos) === 60) {
        pos++;
        while (pos < max) {
          code2 = str.charCodeAt(pos);
          if (code2 === 10 || isSpace(code2)) {
            return result;
          }
          if (code2 === 62) {
            result.pos = pos + 1;
            result.str = unescapeAll(str.slice(start + 1, pos));
            result.ok = true;
            return result;
          }
          if (code2 === 92 && pos + 1 < max) {
            pos += 2;
            continue;
          }
          pos++;
        }
        return result;
      }
      level = 0;
      while (pos < max) {
        code2 = str.charCodeAt(pos);
        if (code2 === 32) {
          break;
        }
        if (code2 < 32 || code2 === 127) {
          break;
        }
        if (code2 === 92 && pos + 1 < max) {
          pos += 2;
          continue;
        }
        if (code2 === 40) {
          level++;
        }
        if (code2 === 41) {
          if (level === 0) {
            break;
          }
          level--;
        }
        pos++;
      }
      if (start === pos) {
        return result;
      }
      if (level !== 0) {
        return result;
      }
      result.str = unescapeAll(str.slice(start, pos));
      result.lines = lines;
      result.pos = pos;
      result.ok = true;
      return result;
    };
    return parse_link_destination;
  }
  var parse_link_title;
  var hasRequiredParse_link_title;
  function requireParse_link_title() {
    if (hasRequiredParse_link_title) return parse_link_title;
    hasRequiredParse_link_title = 1;
    var unescapeAll = requireUtils().unescapeAll;
    parse_link_title = function parseLinkTitle(str, pos, max) {
      var code2, marker2, lines = 0, start = pos, result = {
        ok: false,
        pos: 0,
        lines: 0,
        str: ""
      };
      if (pos >= max) {
        return result;
      }
      marker2 = str.charCodeAt(pos);
      if (marker2 !== 34 && marker2 !== 39 && marker2 !== 40) {
        return result;
      }
      pos++;
      if (marker2 === 40) {
        marker2 = 41;
      }
      while (pos < max) {
        code2 = str.charCodeAt(pos);
        if (code2 === marker2) {
          result.pos = pos + 1;
          result.lines = lines;
          result.str = unescapeAll(str.slice(start + 1, pos));
          result.ok = true;
          return result;
        } else if (code2 === 10) {
          lines++;
        } else if (code2 === 92 && pos + 1 < max) {
          pos++;
          if (str.charCodeAt(pos) === 10) {
            lines++;
          }
        }
        pos++;
      }
      return result;
    };
    return parse_link_title;
  }
  var hasRequiredHelpers;
  function requireHelpers() {
    if (hasRequiredHelpers) return helpers;
    hasRequiredHelpers = 1;
    helpers.parseLinkLabel = requireParse_link_label();
    helpers.parseLinkDestination = requireParse_link_destination();
    helpers.parseLinkTitle = requireParse_link_title();
    return helpers;
  }
  var renderer;
  var hasRequiredRenderer;
  function requireRenderer() {
    if (hasRequiredRenderer) return renderer;
    hasRequiredRenderer = 1;
    var assign = requireUtils().assign;
    var unescapeAll = requireUtils().unescapeAll;
    var escapeHtml = requireUtils().escapeHtml;
    var default_rules = {};
    default_rules.code_inline = function(tokens, idx, options, env, slf) {
      var token2 = tokens[idx];
      return "<code" + slf.renderAttrs(token2) + ">" + escapeHtml(tokens[idx].content) + "</code>";
    };
    default_rules.code_block = function(tokens, idx, options, env, slf) {
      var token2 = tokens[idx];
      return "<pre" + slf.renderAttrs(token2) + "><code>" + escapeHtml(tokens[idx].content) + "</code></pre>\n";
    };
    default_rules.fence = function(tokens, idx, options, env, slf) {
      var token2 = tokens[idx], info = token2.info ? unescapeAll(token2.info).trim() : "", langName = "", highlighted, i2, tmpAttrs, tmpToken;
      if (info) {
        langName = info.split(/\s+/g)[0];
      }
      if (options.highlight) {
        highlighted = options.highlight(token2.content, langName) || escapeHtml(token2.content);
      } else {
        highlighted = escapeHtml(token2.content);
      }
      if (highlighted.indexOf("<pre") === 0) {
        return highlighted + "\n";
      }
      if (info) {
        i2 = token2.attrIndex("class");
        tmpAttrs = token2.attrs ? token2.attrs.slice() : [];
        if (i2 < 0) {
          tmpAttrs.push(["class", options.langPrefix + langName]);
        } else {
          tmpAttrs[i2][1] += " " + options.langPrefix + langName;
        }
        tmpToken = {
          attrs: tmpAttrs
        };
        return "<pre><code" + slf.renderAttrs(tmpToken) + ">" + highlighted + "</code></pre>\n";
      }
      return "<pre><code" + slf.renderAttrs(token2) + ">" + highlighted + "</code></pre>\n";
    };
    default_rules.image = function(tokens, idx, options, env, slf) {
      var token2 = tokens[idx];
      token2.attrs[token2.attrIndex("alt")][1] = slf.renderInlineAsText(token2.children, options, env);
      return slf.renderToken(tokens, idx, options);
    };
    default_rules.hardbreak = function(tokens, idx, options) {
      return options.xhtmlOut ? "<br />\n" : "<br>\n";
    };
    default_rules.softbreak = function(tokens, idx, options) {
      return options.breaks ? options.xhtmlOut ? "<br />\n" : "<br>\n" : "\n";
    };
    default_rules.text = function(tokens, idx) {
      return escapeHtml(tokens[idx].content);
    };
    default_rules.html_block = function(tokens, idx) {
      return tokens[idx].content;
    };
    default_rules.html_inline = function(tokens, idx) {
      return tokens[idx].content;
    };
    function Renderer() {
      this.rules = assign({}, default_rules);
    }
    Renderer.prototype.renderAttrs = function renderAttrs(token2) {
      var i2, l, result;
      if (!token2.attrs) {
        return "";
      }
      result = "";
      for (i2 = 0, l = token2.attrs.length; i2 < l; i2++) {
        result += " " + escapeHtml(token2.attrs[i2][0]) + '="' + escapeHtml(token2.attrs[i2][1]) + '"';
      }
      return result;
    };
    Renderer.prototype.renderToken = function renderToken(tokens, idx, options) {
      var nextToken, result = "", needLf = false, token2 = tokens[idx];
      if (token2.hidden) {
        return "";
      }
      if (token2.block && token2.nesting !== -1 && idx && tokens[idx - 1].hidden) {
        result += "\n";
      }
      result += (token2.nesting === -1 ? "</" : "<") + token2.tag;
      result += this.renderAttrs(token2);
      if (token2.nesting === 0 && options.xhtmlOut) {
        result += " /";
      }
      if (token2.block) {
        needLf = true;
        if (token2.nesting === 1) {
          if (idx + 1 < tokens.length) {
            nextToken = tokens[idx + 1];
            if (nextToken.type === "inline" || nextToken.hidden) {
              needLf = false;
            } else if (nextToken.nesting === -1 && nextToken.tag === token2.tag) {
              needLf = false;
            }
          }
        }
      }
      result += needLf ? ">\n" : ">";
      return result;
    };
    Renderer.prototype.renderInline = function(tokens, options, env) {
      var type, result = "", rules = this.rules;
      for (var i2 = 0, len = tokens.length; i2 < len; i2++) {
        type = tokens[i2].type;
        if (typeof rules[type] !== "undefined") {
          result += rules[type](tokens, i2, options, env, this);
        } else {
          result += this.renderToken(tokens, i2, options);
        }
      }
      return result;
    };
    Renderer.prototype.renderInlineAsText = function(tokens, options, env) {
      var result = "";
      for (var i2 = 0, len = tokens.length; i2 < len; i2++) {
        if (tokens[i2].type === "text") {
          result += tokens[i2].content;
        } else if (tokens[i2].type === "image") {
          result += this.renderInlineAsText(tokens[i2].children, options, env);
        }
      }
      return result;
    };
    Renderer.prototype.render = function(tokens, options, env) {
      var i2, len, type, result = "", rules = this.rules;
      for (i2 = 0, len = tokens.length; i2 < len; i2++) {
        type = tokens[i2].type;
        if (type === "inline") {
          result += this.renderInline(tokens[i2].children, options, env);
        } else if (typeof rules[type] !== "undefined") {
          result += rules[tokens[i2].type](tokens, i2, options, env, this);
        } else {
          result += this.renderToken(tokens, i2, options, env);
        }
      }
      return result;
    };
    renderer = Renderer;
    return renderer;
  }
  var ruler;
  var hasRequiredRuler;
  function requireRuler() {
    if (hasRequiredRuler) return ruler;
    hasRequiredRuler = 1;
    function Ruler() {
      this.__rules__ = [];
      this.__cache__ = null;
    }
    Ruler.prototype.__find__ = function(name) {
      for (var i2 = 0; i2 < this.__rules__.length; i2++) {
        if (this.__rules__[i2].name === name) {
          return i2;
        }
      }
      return -1;
    };
    Ruler.prototype.__compile__ = function() {
      var self2 = this;
      var chains = [""];
      self2.__rules__.forEach(function(rule) {
        if (!rule.enabled) {
          return;
        }
        rule.alt.forEach(function(altName) {
          if (chains.indexOf(altName) < 0) {
            chains.push(altName);
          }
        });
      });
      self2.__cache__ = {};
      chains.forEach(function(chain) {
        self2.__cache__[chain] = [];
        self2.__rules__.forEach(function(rule) {
          if (!rule.enabled) {
            return;
          }
          if (chain && rule.alt.indexOf(chain) < 0) {
            return;
          }
          self2.__cache__[chain].push(rule.fn);
        });
      });
    };
    Ruler.prototype.at = function(name, fn, options) {
      var index = this.__find__(name);
      var opt = options || {};
      if (index === -1) {
        throw new Error("Parser rule not found: " + name);
      }
      this.__rules__[index].fn = fn;
      this.__rules__[index].alt = opt.alt || [];
      this.__cache__ = null;
    };
    Ruler.prototype.before = function(beforeName, ruleName, fn, options) {
      var index = this.__find__(beforeName);
      var opt = options || {};
      if (index === -1) {
        throw new Error("Parser rule not found: " + beforeName);
      }
      this.__rules__.splice(index, 0, {
        name: ruleName,
        enabled: true,
        fn,
        alt: opt.alt || []
      });
      this.__cache__ = null;
    };
    Ruler.prototype.after = function(afterName, ruleName, fn, options) {
      var index = this.__find__(afterName);
      var opt = options || {};
      if (index === -1) {
        throw new Error("Parser rule not found: " + afterName);
      }
      this.__rules__.splice(index + 1, 0, {
        name: ruleName,
        enabled: true,
        fn,
        alt: opt.alt || []
      });
      this.__cache__ = null;
    };
    Ruler.prototype.push = function(ruleName, fn, options) {
      var opt = options || {};
      this.__rules__.push({
        name: ruleName,
        enabled: true,
        fn,
        alt: opt.alt || []
      });
      this.__cache__ = null;
    };
    Ruler.prototype.enable = function(list2, ignoreInvalid) {
      if (!Array.isArray(list2)) {
        list2 = [list2];
      }
      var result = [];
      list2.forEach(function(name) {
        var idx = this.__find__(name);
        if (idx < 0) {
          if (ignoreInvalid) {
            return;
          }
          throw new Error("Rules manager: invalid rule name " + name);
        }
        this.__rules__[idx].enabled = true;
        result.push(name);
      }, this);
      this.__cache__ = null;
      return result;
    };
    Ruler.prototype.enableOnly = function(list2, ignoreInvalid) {
      if (!Array.isArray(list2)) {
        list2 = [list2];
      }
      this.__rules__.forEach(function(rule) {
        rule.enabled = false;
      });
      this.enable(list2, ignoreInvalid);
    };
    Ruler.prototype.disable = function(list2, ignoreInvalid) {
      if (!Array.isArray(list2)) {
        list2 = [list2];
      }
      var result = [];
      list2.forEach(function(name) {
        var idx = this.__find__(name);
        if (idx < 0) {
          if (ignoreInvalid) {
            return;
          }
          throw new Error("Rules manager: invalid rule name " + name);
        }
        this.__rules__[idx].enabled = false;
        result.push(name);
      }, this);
      this.__cache__ = null;
      return result;
    };
    Ruler.prototype.getRules = function(chainName) {
      if (this.__cache__ === null) {
        this.__compile__();
      }
      return this.__cache__[chainName] || [];
    };
    ruler = Ruler;
    return ruler;
  }
  var normalize;
  var hasRequiredNormalize;
  function requireNormalize() {
    if (hasRequiredNormalize) return normalize;
    hasRequiredNormalize = 1;
    var NEWLINES_RE = /\r[\n\u0085]?|[\u2424\u2028\u0085]/g;
    var NULL_RE = /\u0000/g;
    normalize = function inline2(state) {
      var str;
      str = state.src.replace(NEWLINES_RE, "\n");
      str = str.replace(NULL_RE, "�");
      state.src = str;
    };
    return normalize;
  }
  var block;
  var hasRequiredBlock;
  function requireBlock() {
    if (hasRequiredBlock) return block;
    hasRequiredBlock = 1;
    block = function block2(state) {
      var token2;
      if (state.inlineMode) {
        token2 = new state.Token("inline", "", 0);
        token2.content = state.src;
        token2.map = [0, 1];
        token2.children = [];
        state.tokens.push(token2);
      } else {
        state.md.block.parse(state.src, state.md, state.env, state.tokens);
      }
    };
    return block;
  }
  var inline;
  var hasRequiredInline;
  function requireInline() {
    if (hasRequiredInline) return inline;
    hasRequiredInline = 1;
    inline = function inline2(state) {
      var tokens = state.tokens, tok, i2, l;
      for (i2 = 0, l = tokens.length; i2 < l; i2++) {
        tok = tokens[i2];
        if (tok.type === "inline") {
          state.md.inline.parse(tok.content, state.md, state.env, tok.children);
        }
      }
    };
    return inline;
  }
  var linkify;
  var hasRequiredLinkify;
  function requireLinkify() {
    if (hasRequiredLinkify) return linkify;
    hasRequiredLinkify = 1;
    var arrayReplaceAt = requireUtils().arrayReplaceAt;
    function isLinkOpen(str) {
      return /^<a[>\s]/i.test(str);
    }
    function isLinkClose(str) {
      return /^<\/a\s*>/i.test(str);
    }
    linkify = function linkify2(state) {
      var i2, j, l, tokens, token2, currentToken, nodes, ln2, text2, pos, lastPos, level, htmlLinkLevel, url, fullUrl, urlText, blockTokens = state.tokens, links;
      if (!state.md.options.linkify) {
        return;
      }
      for (j = 0, l = blockTokens.length; j < l; j++) {
        if (blockTokens[j].type !== "inline" || !state.md.linkify.pretest(blockTokens[j].content)) {
          continue;
        }
        tokens = blockTokens[j].children;
        htmlLinkLevel = 0;
        for (i2 = tokens.length - 1; i2 >= 0; i2--) {
          currentToken = tokens[i2];
          if (currentToken.type === "link_close") {
            i2--;
            while (tokens[i2].level !== currentToken.level && tokens[i2].type !== "link_open") {
              i2--;
            }
            continue;
          }
          if (currentToken.type === "html_inline") {
            if (isLinkOpen(currentToken.content) && htmlLinkLevel > 0) {
              htmlLinkLevel--;
            }
            if (isLinkClose(currentToken.content)) {
              htmlLinkLevel++;
            }
          }
          if (htmlLinkLevel > 0) {
            continue;
          }
          if (currentToken.type === "text" && state.md.linkify.test(currentToken.content)) {
            text2 = currentToken.content;
            links = state.md.linkify.match(text2);
            nodes = [];
            level = currentToken.level;
            lastPos = 0;
            for (ln2 = 0; ln2 < links.length; ln2++) {
              url = links[ln2].url;
              fullUrl = state.md.normalizeLink(url);
              if (!state.md.validateLink(fullUrl)) {
                continue;
              }
              urlText = links[ln2].text;
              if (!links[ln2].schema) {
                urlText = state.md.normalizeLinkText("http://" + urlText).replace(/^http:\/\//, "");
              } else if (links[ln2].schema === "mailto:" && !/^mailto:/i.test(urlText)) {
                urlText = state.md.normalizeLinkText("mailto:" + urlText).replace(/^mailto:/, "");
              } else {
                urlText = state.md.normalizeLinkText(urlText);
              }
              pos = links[ln2].index;
              if (pos > lastPos) {
                token2 = new state.Token("text", "", 0);
                token2.content = text2.slice(lastPos, pos);
                token2.level = level;
                nodes.push(token2);
              }
              token2 = new state.Token("link_open", "a", 1);
              token2.attrs = [["href", fullUrl]];
              token2.level = level++;
              token2.markup = "linkify";
              token2.info = "auto";
              nodes.push(token2);
              token2 = new state.Token("text", "", 0);
              token2.content = urlText;
              token2.level = level;
              nodes.push(token2);
              token2 = new state.Token("link_close", "a", -1);
              token2.level = --level;
              token2.markup = "linkify";
              token2.info = "auto";
              nodes.push(token2);
              lastPos = links[ln2].lastIndex;
            }
            if (lastPos < text2.length) {
              token2 = new state.Token("text", "", 0);
              token2.content = text2.slice(lastPos);
              token2.level = level;
              nodes.push(token2);
            }
            blockTokens[j].children = tokens = arrayReplaceAt(tokens, i2, nodes);
          }
        }
      }
    };
    return linkify;
  }
  var replacements;
  var hasRequiredReplacements;
  function requireReplacements() {
    if (hasRequiredReplacements) return replacements;
    hasRequiredReplacements = 1;
    var RARE_RE = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/;
    var SCOPED_ABBR_TEST_RE = /\((c|tm|r|p)\)/i;
    var SCOPED_ABBR_RE = /\((c|tm|r|p)\)/ig;
    var SCOPED_ABBR = {
      c: "©",
      r: "®",
      p: "§",
      tm: "™"
    };
    function replaceFn(match, name) {
      return SCOPED_ABBR[name.toLowerCase()];
    }
    function replace_scoped(inlineTokens) {
      var i2, token2, inside_autolink = 0;
      for (i2 = inlineTokens.length - 1; i2 >= 0; i2--) {
        token2 = inlineTokens[i2];
        if (token2.type === "text" && !inside_autolink) {
          token2.content = token2.content.replace(SCOPED_ABBR_RE, replaceFn);
        }
        if (token2.type === "link_open" && token2.info === "auto") {
          inside_autolink--;
        }
        if (token2.type === "link_close" && token2.info === "auto") {
          inside_autolink++;
        }
      }
    }
    function replace_rare(inlineTokens) {
      var i2, token2, inside_autolink = 0;
      for (i2 = inlineTokens.length - 1; i2 >= 0; i2--) {
        token2 = inlineTokens[i2];
        if (token2.type === "text" && !inside_autolink) {
          if (RARE_RE.test(token2.content)) {
            token2.content = token2.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---([^-]|$)/mg, "$1—$2").replace(/(^|\s)--(\s|$)/mg, "$1–$2").replace(/(^|[^-\s])--([^-\s]|$)/mg, "$1–$2");
          }
        }
        if (token2.type === "link_open" && token2.info === "auto") {
          inside_autolink--;
        }
        if (token2.type === "link_close" && token2.info === "auto") {
          inside_autolink++;
        }
      }
    }
    replacements = function replace(state) {
      var blkIdx;
      if (!state.md.options.typographer) {
        return;
      }
      for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
        if (state.tokens[blkIdx].type !== "inline") {
          continue;
        }
        if (SCOPED_ABBR_TEST_RE.test(state.tokens[blkIdx].content)) {
          replace_scoped(state.tokens[blkIdx].children);
        }
        if (RARE_RE.test(state.tokens[blkIdx].content)) {
          replace_rare(state.tokens[blkIdx].children);
        }
      }
    };
    return replacements;
  }
  var smartquotes;
  var hasRequiredSmartquotes;
  function requireSmartquotes() {
    if (hasRequiredSmartquotes) return smartquotes;
    hasRequiredSmartquotes = 1;
    var isWhiteSpace = requireUtils().isWhiteSpace;
    var isPunctChar = requireUtils().isPunctChar;
    var isMdAsciiPunct = requireUtils().isMdAsciiPunct;
    var QUOTE_TEST_RE = /['"]/;
    var QUOTE_RE = /['"]/g;
    var APOSTROPHE = "’";
    function replaceAt(str, index, ch) {
      return str.substr(0, index) + ch + str.substr(index + 1);
    }
    function process_inlines(tokens, state) {
      var i2, token2, text2, t2, pos, max, thisLevel, item, lastChar, nextChar, isLastPunctChar, isNextPunctChar, isLastWhiteSpace, isNextWhiteSpace, canOpen, canClose, j, isSingle, stack2, openQuote, closeQuote;
      stack2 = [];
      for (i2 = 0; i2 < tokens.length; i2++) {
        token2 = tokens[i2];
        thisLevel = tokens[i2].level;
        for (j = stack2.length - 1; j >= 0; j--) {
          if (stack2[j].level <= thisLevel) {
            break;
          }
        }
        stack2.length = j + 1;
        if (token2.type !== "text") {
          continue;
        }
        text2 = token2.content;
        pos = 0;
        max = text2.length;
        OUTER:
          while (pos < max) {
            QUOTE_RE.lastIndex = pos;
            t2 = QUOTE_RE.exec(text2);
            if (!t2) {
              break;
            }
            canOpen = canClose = true;
            pos = t2.index + 1;
            isSingle = t2[0] === "'";
            lastChar = 32;
            if (t2.index - 1 >= 0) {
              lastChar = text2.charCodeAt(t2.index - 1);
            } else {
              for (j = i2 - 1; j >= 0; j--) {
                if (tokens[j].type === "softbreak" || tokens[j].type === "hardbreak") break;
                if (tokens[j].type !== "text") continue;
                lastChar = tokens[j].content.charCodeAt(tokens[j].content.length - 1);
                break;
              }
            }
            nextChar = 32;
            if (pos < max) {
              nextChar = text2.charCodeAt(pos);
            } else {
              for (j = i2 + 1; j < tokens.length; j++) {
                if (tokens[j].type === "softbreak" || tokens[j].type === "hardbreak") break;
                if (tokens[j].type !== "text") continue;
                nextChar = tokens[j].content.charCodeAt(0);
                break;
              }
            }
            isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
            isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));
            isLastWhiteSpace = isWhiteSpace(lastChar);
            isNextWhiteSpace = isWhiteSpace(nextChar);
            if (isNextWhiteSpace) {
              canOpen = false;
            } else if (isNextPunctChar) {
              if (!(isLastWhiteSpace || isLastPunctChar)) {
                canOpen = false;
              }
            }
            if (isLastWhiteSpace) {
              canClose = false;
            } else if (isLastPunctChar) {
              if (!(isNextWhiteSpace || isNextPunctChar)) {
                canClose = false;
              }
            }
            if (nextChar === 34 && t2[0] === '"') {
              if (lastChar >= 48 && lastChar <= 57) {
                canClose = canOpen = false;
              }
            }
            if (canOpen && canClose) {
              canOpen = false;
              canClose = isNextPunctChar;
            }
            if (!canOpen && !canClose) {
              if (isSingle) {
                token2.content = replaceAt(token2.content, t2.index, APOSTROPHE);
              }
              continue;
            }
            if (canClose) {
              for (j = stack2.length - 1; j >= 0; j--) {
                item = stack2[j];
                if (stack2[j].level < thisLevel) {
                  break;
                }
                if (item.single === isSingle && stack2[j].level === thisLevel) {
                  item = stack2[j];
                  if (isSingle) {
                    openQuote = state.md.options.quotes[2];
                    closeQuote = state.md.options.quotes[3];
                  } else {
                    openQuote = state.md.options.quotes[0];
                    closeQuote = state.md.options.quotes[1];
                  }
                  token2.content = replaceAt(token2.content, t2.index, closeQuote);
                  tokens[item.token].content = replaceAt(
                    tokens[item.token].content,
                    item.pos,
                    openQuote
                  );
                  pos += closeQuote.length - 1;
                  if (item.token === i2) {
                    pos += openQuote.length - 1;
                  }
                  text2 = token2.content;
                  max = text2.length;
                  stack2.length = j;
                  continue OUTER;
                }
              }
            }
            if (canOpen) {
              stack2.push({
                token: i2,
                pos: t2.index,
                single: isSingle,
                level: thisLevel
              });
            } else if (canClose && isSingle) {
              token2.content = replaceAt(token2.content, t2.index, APOSTROPHE);
            }
          }
      }
    }
    smartquotes = function smartquotes2(state) {
      var blkIdx;
      if (!state.md.options.typographer) {
        return;
      }
      for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
        if (state.tokens[blkIdx].type !== "inline" || !QUOTE_TEST_RE.test(state.tokens[blkIdx].content)) {
          continue;
        }
        process_inlines(state.tokens[blkIdx].children, state);
      }
    };
    return smartquotes;
  }
  var token;
  var hasRequiredToken;
  function requireToken() {
    if (hasRequiredToken) return token;
    hasRequiredToken = 1;
    function Token(type, tag, nesting) {
      this.type = type;
      this.tag = tag;
      this.attrs = null;
      this.map = null;
      this.nesting = nesting;
      this.level = 0;
      this.children = null;
      this.content = "";
      this.markup = "";
      this.info = "";
      this.meta = null;
      this.block = false;
      this.hidden = false;
    }
    Token.prototype.attrIndex = function attrIndex(name) {
      var attrs, i2, len;
      if (!this.attrs) {
        return -1;
      }
      attrs = this.attrs;
      for (i2 = 0, len = attrs.length; i2 < len; i2++) {
        if (attrs[i2][0] === name) {
          return i2;
        }
      }
      return -1;
    };
    Token.prototype.attrPush = function attrPush(attrData) {
      if (this.attrs) {
        this.attrs.push(attrData);
      } else {
        this.attrs = [attrData];
      }
    };
    Token.prototype.attrSet = function attrSet(name, value) {
      var idx = this.attrIndex(name), attrData = [name, value];
      if (idx < 0) {
        this.attrPush(attrData);
      } else {
        this.attrs[idx] = attrData;
      }
    };
    Token.prototype.attrGet = function attrGet(name) {
      var idx = this.attrIndex(name), value = null;
      if (idx >= 0) {
        value = this.attrs[idx][1];
      }
      return value;
    };
    Token.prototype.attrJoin = function attrJoin(name, value) {
      var idx = this.attrIndex(name);
      if (idx < 0) {
        this.attrPush([name, value]);
      } else {
        this.attrs[idx][1] = this.attrs[idx][1] + " " + value;
      }
    };
    token = Token;
    return token;
  }
  var state_core;
  var hasRequiredState_core;
  function requireState_core() {
    if (hasRequiredState_core) return state_core;
    hasRequiredState_core = 1;
    var Token = requireToken();
    function StateCore(src, md, env) {
      this.src = src;
      this.env = env;
      this.tokens = [];
      this.inlineMode = false;
      this.md = md;
    }
    StateCore.prototype.Token = Token;
    state_core = StateCore;
    return state_core;
  }
  var parser_core;
  var hasRequiredParser_core;
  function requireParser_core() {
    if (hasRequiredParser_core) return parser_core;
    hasRequiredParser_core = 1;
    var Ruler = requireRuler();
    var _rules = [
      ["normalize", requireNormalize()],
      ["block", requireBlock()],
      ["inline", requireInline()],
      ["linkify", requireLinkify()],
      ["replacements", requireReplacements()],
      ["smartquotes", requireSmartquotes()]
    ];
    function Core() {
      this.ruler = new Ruler();
      for (var i2 = 0; i2 < _rules.length; i2++) {
        this.ruler.push(_rules[i2][0], _rules[i2][1]);
      }
    }
    Core.prototype.process = function(state) {
      var i2, l, rules;
      rules = this.ruler.getRules("");
      for (i2 = 0, l = rules.length; i2 < l; i2++) {
        rules[i2](state);
      }
    };
    Core.prototype.State = requireState_core();
    parser_core = Core;
    return parser_core;
  }
  var table;
  var hasRequiredTable;
  function requireTable() {
    if (hasRequiredTable) return table;
    hasRequiredTable = 1;
    var isSpace = requireUtils().isSpace;
    function getLine(state, line) {
      var pos = state.bMarks[line] + state.blkIndent, max = state.eMarks[line];
      return state.src.substr(pos, max - pos);
    }
    function escapedSplit(str) {
      var result = [], pos = 0, max = str.length, ch, escapes = 0, lastPos = 0, backTicked = false, lastBackTick = 0;
      ch = str.charCodeAt(pos);
      while (pos < max) {
        if (ch === 96) {
          if (backTicked) {
            backTicked = false;
            lastBackTick = pos;
          } else if (escapes % 2 === 0) {
            backTicked = true;
            lastBackTick = pos;
          }
        } else if (ch === 124 && escapes % 2 === 0 && !backTicked) {
          result.push(str.substring(lastPos, pos));
          lastPos = pos + 1;
        }
        if (ch === 92) {
          escapes++;
        } else {
          escapes = 0;
        }
        pos++;
        if (pos === max && backTicked) {
          backTicked = false;
          pos = lastBackTick + 1;
        }
        ch = str.charCodeAt(pos);
      }
      result.push(str.substring(lastPos));
      return result;
    }
    table = function table2(state, startLine, endLine, silent) {
      var ch, lineText, pos, i2, nextLine, columns, columnCount, token2, aligns, t2, tableLines, tbodyLines;
      if (startLine + 2 > endLine) {
        return false;
      }
      nextLine = startLine + 1;
      if (state.sCount[nextLine] < state.blkIndent) {
        return false;
      }
      if (state.sCount[nextLine] - state.blkIndent >= 4) {
        return false;
      }
      pos = state.bMarks[nextLine] + state.tShift[nextLine];
      if (pos >= state.eMarks[nextLine]) {
        return false;
      }
      ch = state.src.charCodeAt(pos++);
      if (ch !== 124 && ch !== 45 && ch !== 58) {
        return false;
      }
      while (pos < state.eMarks[nextLine]) {
        ch = state.src.charCodeAt(pos);
        if (ch !== 124 && ch !== 45 && ch !== 58 && !isSpace(ch)) {
          return false;
        }
        pos++;
      }
      lineText = getLine(state, startLine + 1);
      columns = lineText.split("|");
      aligns = [];
      for (i2 = 0; i2 < columns.length; i2++) {
        t2 = columns[i2].trim();
        if (!t2) {
          if (i2 === 0 || i2 === columns.length - 1) {
            continue;
          } else {
            return false;
          }
        }
        if (!/^:?-+:?$/.test(t2)) {
          return false;
        }
        if (t2.charCodeAt(t2.length - 1) === 58) {
          aligns.push(t2.charCodeAt(0) === 58 ? "center" : "right");
        } else if (t2.charCodeAt(0) === 58) {
          aligns.push("left");
        } else {
          aligns.push("");
        }
      }
      lineText = getLine(state, startLine).trim();
      if (lineText.indexOf("|") === -1) {
        return false;
      }
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      columns = escapedSplit(lineText.replace(/^\||\|$/g, ""));
      columnCount = columns.length;
      if (columnCount > aligns.length) {
        return false;
      }
      if (silent) {
        return true;
      }
      token2 = state.push("table_open", "table", 1);
      token2.map = tableLines = [startLine, 0];
      token2 = state.push("thead_open", "thead", 1);
      token2.map = [startLine, startLine + 1];
      token2 = state.push("tr_open", "tr", 1);
      token2.map = [startLine, startLine + 1];
      for (i2 = 0; i2 < columns.length; i2++) {
        token2 = state.push("th_open", "th", 1);
        token2.map = [startLine, startLine + 1];
        if (aligns[i2]) {
          token2.attrs = [["style", "text-align:" + aligns[i2]]];
        }
        token2 = state.push("inline", "", 0);
        token2.content = columns[i2].trim();
        token2.map = [startLine, startLine + 1];
        token2.children = [];
        token2 = state.push("th_close", "th", -1);
      }
      token2 = state.push("tr_close", "tr", -1);
      token2 = state.push("thead_close", "thead", -1);
      token2 = state.push("tbody_open", "tbody", 1);
      token2.map = tbodyLines = [startLine + 2, 0];
      for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
        if (state.sCount[nextLine] < state.blkIndent) {
          break;
        }
        lineText = getLine(state, nextLine).trim();
        if (lineText.indexOf("|") === -1) {
          break;
        }
        if (state.sCount[nextLine] - state.blkIndent >= 4) {
          break;
        }
        columns = escapedSplit(lineText.replace(/^\||\|$/g, ""));
        token2 = state.push("tr_open", "tr", 1);
        for (i2 = 0; i2 < columnCount; i2++) {
          token2 = state.push("td_open", "td", 1);
          if (aligns[i2]) {
            token2.attrs = [["style", "text-align:" + aligns[i2]]];
          }
          token2 = state.push("inline", "", 0);
          token2.content = columns[i2] ? columns[i2].trim() : "";
          token2.children = [];
          token2 = state.push("td_close", "td", -1);
        }
        token2 = state.push("tr_close", "tr", -1);
      }
      token2 = state.push("tbody_close", "tbody", -1);
      token2 = state.push("table_close", "table", -1);
      tableLines[1] = tbodyLines[1] = nextLine;
      state.line = nextLine;
      return true;
    };
    return table;
  }
  var code;
  var hasRequiredCode;
  function requireCode() {
    if (hasRequiredCode) return code;
    hasRequiredCode = 1;
    code = function code2(state, startLine, endLine) {
      var nextLine, last, token2;
      if (state.sCount[startLine] - state.blkIndent < 4) {
        return false;
      }
      last = nextLine = startLine + 1;
      while (nextLine < endLine) {
        if (state.isEmpty(nextLine)) {
          nextLine++;
          continue;
        }
        if (state.sCount[nextLine] - state.blkIndent >= 4) {
          nextLine++;
          last = nextLine;
          continue;
        }
        break;
      }
      state.line = last;
      token2 = state.push("code_block", "code", 0);
      token2.content = state.getLines(startLine, last, 4 + state.blkIndent, true);
      token2.map = [startLine, state.line];
      return true;
    };
    return code;
  }
  var fence;
  var hasRequiredFence;
  function requireFence() {
    if (hasRequiredFence) return fence;
    hasRequiredFence = 1;
    fence = function fence2(state, startLine, endLine, silent) {
      var marker2, len, params, nextLine, mem, token2, markup, haveEndMarker = false, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      if (pos + 3 > max) {
        return false;
      }
      marker2 = state.src.charCodeAt(pos);
      if (marker2 !== 126 && marker2 !== 96) {
        return false;
      }
      mem = pos;
      pos = state.skipChars(pos, marker2);
      len = pos - mem;
      if (len < 3) {
        return false;
      }
      markup = state.src.slice(mem, pos);
      params = state.src.slice(pos, max);
      if (params.indexOf(String.fromCharCode(marker2)) >= 0) {
        return false;
      }
      if (silent) {
        return true;
      }
      nextLine = startLine;
      for (; ; ) {
        nextLine++;
        if (nextLine >= endLine) {
          break;
        }
        pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
        max = state.eMarks[nextLine];
        if (pos < max && state.sCount[nextLine] < state.blkIndent) {
          break;
        }
        if (state.src.charCodeAt(pos) !== marker2) {
          continue;
        }
        if (state.sCount[nextLine] - state.blkIndent >= 4) {
          continue;
        }
        pos = state.skipChars(pos, marker2);
        if (pos - mem < len) {
          continue;
        }
        pos = state.skipSpaces(pos);
        if (pos < max) {
          continue;
        }
        haveEndMarker = true;
        break;
      }
      len = state.sCount[startLine];
      state.line = nextLine + (haveEndMarker ? 1 : 0);
      token2 = state.push("fence", "code", 0);
      token2.info = params;
      token2.content = state.getLines(startLine + 1, nextLine, len, true);
      token2.markup = markup;
      token2.map = [startLine, state.line];
      return true;
    };
    return fence;
  }
  var blockquote;
  var hasRequiredBlockquote;
  function requireBlockquote() {
    if (hasRequiredBlockquote) return blockquote;
    hasRequiredBlockquote = 1;
    var isSpace = requireUtils().isSpace;
    blockquote = function blockquote2(state, startLine, endLine, silent) {
      var adjustTab, ch, i2, initial, l, lastLineEmpty, lines, nextLine, offset, oldBMarks, oldBSCount, oldIndent, oldParentType, oldSCount, oldTShift, spaceAfterMarker, terminate, terminatorRules, token2, wasOutdented, oldLineMax = state.lineMax, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      if (state.src.charCodeAt(pos++) !== 62) {
        return false;
      }
      if (silent) {
        return true;
      }
      initial = offset = state.sCount[startLine] + pos - (state.bMarks[startLine] + state.tShift[startLine]);
      if (state.src.charCodeAt(pos) === 32) {
        pos++;
        initial++;
        offset++;
        adjustTab = false;
        spaceAfterMarker = true;
      } else if (state.src.charCodeAt(pos) === 9) {
        spaceAfterMarker = true;
        if ((state.bsCount[startLine] + offset) % 4 === 3) {
          pos++;
          initial++;
          offset++;
          adjustTab = false;
        } else {
          adjustTab = true;
        }
      } else {
        spaceAfterMarker = false;
      }
      oldBMarks = [state.bMarks[startLine]];
      state.bMarks[startLine] = pos;
      while (pos < max) {
        ch = state.src.charCodeAt(pos);
        if (isSpace(ch)) {
          if (ch === 9) {
            offset += 4 - (offset + state.bsCount[startLine] + (adjustTab ? 1 : 0)) % 4;
          } else {
            offset++;
          }
        } else {
          break;
        }
        pos++;
      }
      oldBSCount = [state.bsCount[startLine]];
      state.bsCount[startLine] = state.sCount[startLine] + 1 + (spaceAfterMarker ? 1 : 0);
      lastLineEmpty = pos >= max;
      oldSCount = [state.sCount[startLine]];
      state.sCount[startLine] = offset - initial;
      oldTShift = [state.tShift[startLine]];
      state.tShift[startLine] = pos - state.bMarks[startLine];
      terminatorRules = state.md.block.ruler.getRules("blockquote");
      oldParentType = state.parentType;
      state.parentType = "blockquote";
      wasOutdented = false;
      for (nextLine = startLine + 1; nextLine < endLine; nextLine++) {
        if (state.sCount[nextLine] < state.blkIndent) wasOutdented = true;
        pos = state.bMarks[nextLine] + state.tShift[nextLine];
        max = state.eMarks[nextLine];
        if (pos >= max) {
          break;
        }
        if (state.src.charCodeAt(pos++) === 62 && !wasOutdented) {
          initial = offset = state.sCount[nextLine] + pos - (state.bMarks[nextLine] + state.tShift[nextLine]);
          if (state.src.charCodeAt(pos) === 32) {
            pos++;
            initial++;
            offset++;
            adjustTab = false;
            spaceAfterMarker = true;
          } else if (state.src.charCodeAt(pos) === 9) {
            spaceAfterMarker = true;
            if ((state.bsCount[nextLine] + offset) % 4 === 3) {
              pos++;
              initial++;
              offset++;
              adjustTab = false;
            } else {
              adjustTab = true;
            }
          } else {
            spaceAfterMarker = false;
          }
          oldBMarks.push(state.bMarks[nextLine]);
          state.bMarks[nextLine] = pos;
          while (pos < max) {
            ch = state.src.charCodeAt(pos);
            if (isSpace(ch)) {
              if (ch === 9) {
                offset += 4 - (offset + state.bsCount[nextLine] + (adjustTab ? 1 : 0)) % 4;
              } else {
                offset++;
              }
            } else {
              break;
            }
            pos++;
          }
          lastLineEmpty = pos >= max;
          oldBSCount.push(state.bsCount[nextLine]);
          state.bsCount[nextLine] = state.sCount[nextLine] + 1 + (spaceAfterMarker ? 1 : 0);
          oldSCount.push(state.sCount[nextLine]);
          state.sCount[nextLine] = offset - initial;
          oldTShift.push(state.tShift[nextLine]);
          state.tShift[nextLine] = pos - state.bMarks[nextLine];
          continue;
        }
        if (lastLineEmpty) {
          break;
        }
        terminate = false;
        for (i2 = 0, l = terminatorRules.length; i2 < l; i2++) {
          if (terminatorRules[i2](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }
        if (terminate) {
          state.lineMax = nextLine;
          if (state.blkIndent !== 0) {
            oldBMarks.push(state.bMarks[nextLine]);
            oldBSCount.push(state.bsCount[nextLine]);
            oldTShift.push(state.tShift[nextLine]);
            oldSCount.push(state.sCount[nextLine]);
            state.sCount[nextLine] -= state.blkIndent;
          }
          break;
        }
        oldBMarks.push(state.bMarks[nextLine]);
        oldBSCount.push(state.bsCount[nextLine]);
        oldTShift.push(state.tShift[nextLine]);
        oldSCount.push(state.sCount[nextLine]);
        state.sCount[nextLine] = -1;
      }
      oldIndent = state.blkIndent;
      state.blkIndent = 0;
      token2 = state.push("blockquote_open", "blockquote", 1);
      token2.markup = ">";
      token2.map = lines = [startLine, 0];
      state.md.block.tokenize(state, startLine, nextLine);
      token2 = state.push("blockquote_close", "blockquote", -1);
      token2.markup = ">";
      state.lineMax = oldLineMax;
      state.parentType = oldParentType;
      lines[1] = state.line;
      for (i2 = 0; i2 < oldTShift.length; i2++) {
        state.bMarks[i2 + startLine] = oldBMarks[i2];
        state.tShift[i2 + startLine] = oldTShift[i2];
        state.sCount[i2 + startLine] = oldSCount[i2];
        state.bsCount[i2 + startLine] = oldBSCount[i2];
      }
      state.blkIndent = oldIndent;
      return true;
    };
    return blockquote;
  }
  var hr;
  var hasRequiredHr;
  function requireHr() {
    if (hasRequiredHr) return hr;
    hasRequiredHr = 1;
    var isSpace = requireUtils().isSpace;
    hr = function hr2(state, startLine, endLine, silent) {
      var marker2, cnt, ch, token2, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      marker2 = state.src.charCodeAt(pos++);
      if (marker2 !== 42 && marker2 !== 45 && marker2 !== 95) {
        return false;
      }
      cnt = 1;
      while (pos < max) {
        ch = state.src.charCodeAt(pos++);
        if (ch !== marker2 && !isSpace(ch)) {
          return false;
        }
        if (ch === marker2) {
          cnt++;
        }
      }
      if (cnt < 3) {
        return false;
      }
      if (silent) {
        return true;
      }
      state.line = startLine + 1;
      token2 = state.push("hr", "hr", 0);
      token2.map = [startLine, state.line];
      token2.markup = Array(cnt + 1).join(String.fromCharCode(marker2));
      return true;
    };
    return hr;
  }
  var list;
  var hasRequiredList;
  function requireList() {
    if (hasRequiredList) return list;
    hasRequiredList = 1;
    var isSpace = requireUtils().isSpace;
    function skipBulletListMarker(state, startLine) {
      var marker2, pos, max, ch;
      pos = state.bMarks[startLine] + state.tShift[startLine];
      max = state.eMarks[startLine];
      marker2 = state.src.charCodeAt(pos++);
      if (marker2 !== 42 && marker2 !== 45 && marker2 !== 43) {
        return -1;
      }
      if (pos < max) {
        ch = state.src.charCodeAt(pos);
        if (!isSpace(ch)) {
          return -1;
        }
      }
      return pos;
    }
    function skipOrderedListMarker(state, startLine) {
      var ch, start = state.bMarks[startLine] + state.tShift[startLine], pos = start, max = state.eMarks[startLine];
      if (pos + 1 >= max) {
        return -1;
      }
      ch = state.src.charCodeAt(pos++);
      if (ch < 48 || ch > 57) {
        return -1;
      }
      for (; ; ) {
        if (pos >= max) {
          return -1;
        }
        ch = state.src.charCodeAt(pos++);
        if (ch >= 48 && ch <= 57) {
          if (pos - start >= 10) {
            return -1;
          }
          continue;
        }
        if (ch === 41 || ch === 46) {
          break;
        }
        return -1;
      }
      if (pos < max) {
        ch = state.src.charCodeAt(pos);
        if (!isSpace(ch)) {
          return -1;
        }
      }
      return pos;
    }
    function markTightParagraphs(state, idx) {
      var i2, l, level = state.level + 2;
      for (i2 = idx + 2, l = state.tokens.length - 2; i2 < l; i2++) {
        if (state.tokens[i2].level === level && state.tokens[i2].type === "paragraph_open") {
          state.tokens[i2 + 2].hidden = true;
          state.tokens[i2].hidden = true;
          i2 += 2;
        }
      }
    }
    list = function list2(state, startLine, endLine, silent) {
      var ch, contentStart, i2, indent, indentAfterMarker, initial, isOrdered, itemLines, l, listLines, listTokIdx, markerCharCode, markerValue, max, nextLine, offset, oldIndent, oldLIndent, oldParentType, oldTShift, oldTight, pos, posAfterMarker, prevEmptyEnd, start, terminate, terminatorRules, token2, isTerminatingParagraph = false, tight = true;
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      if (silent && state.parentType === "paragraph") {
        if (state.tShift[startLine] >= state.blkIndent) {
          isTerminatingParagraph = true;
        }
      }
      if ((posAfterMarker = skipOrderedListMarker(state, startLine)) >= 0) {
        isOrdered = true;
        start = state.bMarks[startLine] + state.tShift[startLine];
        markerValue = Number(state.src.substr(start, posAfterMarker - start - 1));
        if (isTerminatingParagraph && markerValue !== 1) return false;
      } else if ((posAfterMarker = skipBulletListMarker(state, startLine)) >= 0) {
        isOrdered = false;
      } else {
        return false;
      }
      if (isTerminatingParagraph) {
        if (state.skipSpaces(posAfterMarker) >= state.eMarks[startLine]) return false;
      }
      markerCharCode = state.src.charCodeAt(posAfterMarker - 1);
      if (silent) {
        return true;
      }
      listTokIdx = state.tokens.length;
      if (isOrdered) {
        token2 = state.push("ordered_list_open", "ol", 1);
        if (markerValue !== 1) {
          token2.attrs = [["start", markerValue]];
        }
      } else {
        token2 = state.push("bullet_list_open", "ul", 1);
      }
      token2.map = listLines = [startLine, 0];
      token2.markup = String.fromCharCode(markerCharCode);
      nextLine = startLine;
      prevEmptyEnd = false;
      terminatorRules = state.md.block.ruler.getRules("list");
      oldParentType = state.parentType;
      state.parentType = "list";
      while (nextLine < endLine) {
        pos = posAfterMarker;
        max = state.eMarks[nextLine];
        initial = offset = state.sCount[nextLine] + posAfterMarker - (state.bMarks[startLine] + state.tShift[startLine]);
        while (pos < max) {
          ch = state.src.charCodeAt(pos);
          if (ch === 9) {
            offset += 4 - (offset + state.bsCount[nextLine]) % 4;
          } else if (ch === 32) {
            offset++;
          } else {
            break;
          }
          pos++;
        }
        contentStart = pos;
        if (contentStart >= max) {
          indentAfterMarker = 1;
        } else {
          indentAfterMarker = offset - initial;
        }
        if (indentAfterMarker > 4) {
          indentAfterMarker = 1;
        }
        indent = initial + indentAfterMarker;
        token2 = state.push("list_item_open", "li", 1);
        token2.markup = String.fromCharCode(markerCharCode);
        token2.map = itemLines = [startLine, 0];
        oldIndent = state.blkIndent;
        oldTight = state.tight;
        oldTShift = state.tShift[startLine];
        oldLIndent = state.sCount[startLine];
        state.blkIndent = indent;
        state.tight = true;
        state.tShift[startLine] = contentStart - state.bMarks[startLine];
        state.sCount[startLine] = offset;
        if (contentStart >= max && state.isEmpty(startLine + 1)) {
          state.line = Math.min(state.line + 2, endLine);
        } else {
          state.md.block.tokenize(state, startLine, endLine, true);
        }
        if (!state.tight || prevEmptyEnd) {
          tight = false;
        }
        prevEmptyEnd = state.line - startLine > 1 && state.isEmpty(state.line - 1);
        state.blkIndent = oldIndent;
        state.tShift[startLine] = oldTShift;
        state.sCount[startLine] = oldLIndent;
        state.tight = oldTight;
        token2 = state.push("list_item_close", "li", -1);
        token2.markup = String.fromCharCode(markerCharCode);
        nextLine = startLine = state.line;
        itemLines[1] = nextLine;
        contentStart = state.bMarks[startLine];
        if (nextLine >= endLine) {
          break;
        }
        if (state.sCount[nextLine] < state.blkIndent) {
          break;
        }
        terminate = false;
        for (i2 = 0, l = terminatorRules.length; i2 < l; i2++) {
          if (terminatorRules[i2](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }
        if (terminate) {
          break;
        }
        if (isOrdered) {
          posAfterMarker = skipOrderedListMarker(state, nextLine);
          if (posAfterMarker < 0) {
            break;
          }
        } else {
          posAfterMarker = skipBulletListMarker(state, nextLine);
          if (posAfterMarker < 0) {
            break;
          }
        }
        if (markerCharCode !== state.src.charCodeAt(posAfterMarker - 1)) {
          break;
        }
      }
      if (isOrdered) {
        token2 = state.push("ordered_list_close", "ol", -1);
      } else {
        token2 = state.push("bullet_list_close", "ul", -1);
      }
      token2.markup = String.fromCharCode(markerCharCode);
      listLines[1] = nextLine;
      state.line = nextLine;
      state.parentType = oldParentType;
      if (tight) {
        markTightParagraphs(state, listTokIdx);
      }
      return true;
    };
    return list;
  }
  var reference;
  var hasRequiredReference;
  function requireReference() {
    if (hasRequiredReference) return reference;
    hasRequiredReference = 1;
    var normalizeReference = requireUtils().normalizeReference;
    var isSpace = requireUtils().isSpace;
    reference = function reference2(state, startLine, _endLine, silent) {
      var ch, destEndPos, destEndLineNo, endLine, href, i2, l, label, labelEnd, oldParentType, res, start, str, terminate, terminatorRules, title, lines = 0, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine], nextLine = startLine + 1;
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      if (state.src.charCodeAt(pos) !== 91) {
        return false;
      }
      while (++pos < max) {
        if (state.src.charCodeAt(pos) === 93 && state.src.charCodeAt(pos - 1) !== 92) {
          if (pos + 1 === max) {
            return false;
          }
          if (state.src.charCodeAt(pos + 1) !== 58) {
            return false;
          }
          break;
        }
      }
      endLine = state.lineMax;
      terminatorRules = state.md.block.ruler.getRules("reference");
      oldParentType = state.parentType;
      state.parentType = "reference";
      for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
        if (state.sCount[nextLine] - state.blkIndent > 3) {
          continue;
        }
        if (state.sCount[nextLine] < 0) {
          continue;
        }
        terminate = false;
        for (i2 = 0, l = terminatorRules.length; i2 < l; i2++) {
          if (terminatorRules[i2](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }
        if (terminate) {
          break;
        }
      }
      str = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
      max = str.length;
      for (pos = 1; pos < max; pos++) {
        ch = str.charCodeAt(pos);
        if (ch === 91) {
          return false;
        } else if (ch === 93) {
          labelEnd = pos;
          break;
        } else if (ch === 10) {
          lines++;
        } else if (ch === 92) {
          pos++;
          if (pos < max && str.charCodeAt(pos) === 10) {
            lines++;
          }
        }
      }
      if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 58) {
        return false;
      }
      for (pos = labelEnd + 2; pos < max; pos++) {
        ch = str.charCodeAt(pos);
        if (ch === 10) {
          lines++;
        } else if (isSpace(ch)) ;
        else {
          break;
        }
      }
      res = state.md.helpers.parseLinkDestination(str, pos, max);
      if (!res.ok) {
        return false;
      }
      href = state.md.normalizeLink(res.str);
      if (!state.md.validateLink(href)) {
        return false;
      }
      pos = res.pos;
      lines += res.lines;
      destEndPos = pos;
      destEndLineNo = lines;
      start = pos;
      for (; pos < max; pos++) {
        ch = str.charCodeAt(pos);
        if (ch === 10) {
          lines++;
        } else if (isSpace(ch)) ;
        else {
          break;
        }
      }
      res = state.md.helpers.parseLinkTitle(str, pos, max);
      if (pos < max && start !== pos && res.ok) {
        title = res.str;
        pos = res.pos;
        lines += res.lines;
      } else {
        title = "";
        pos = destEndPos;
        lines = destEndLineNo;
      }
      while (pos < max) {
        ch = str.charCodeAt(pos);
        if (!isSpace(ch)) {
          break;
        }
        pos++;
      }
      if (pos < max && str.charCodeAt(pos) !== 10) {
        if (title) {
          title = "";
          pos = destEndPos;
          lines = destEndLineNo;
          while (pos < max) {
            ch = str.charCodeAt(pos);
            if (!isSpace(ch)) {
              break;
            }
            pos++;
          }
        }
      }
      if (pos < max && str.charCodeAt(pos) !== 10) {
        return false;
      }
      label = normalizeReference(str.slice(1, labelEnd));
      if (!label) {
        return false;
      }
      if (silent) {
        return true;
      }
      if (typeof state.env.references === "undefined") {
        state.env.references = {};
      }
      if (typeof state.env.references[label] === "undefined") {
        state.env.references[label] = { title, href };
      }
      state.parentType = oldParentType;
      state.line = startLine + lines + 1;
      return true;
    };
    return reference;
  }
  var heading;
  var hasRequiredHeading;
  function requireHeading() {
    if (hasRequiredHeading) return heading;
    hasRequiredHeading = 1;
    var isSpace = requireUtils().isSpace;
    heading = function heading2(state, startLine, endLine, silent) {
      var ch, level, tmp, token2, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      ch = state.src.charCodeAt(pos);
      if (ch !== 35 || pos >= max) {
        return false;
      }
      level = 1;
      ch = state.src.charCodeAt(++pos);
      while (ch === 35 && pos < max && level <= 6) {
        level++;
        ch = state.src.charCodeAt(++pos);
      }
      if (level > 6 || pos < max && !isSpace(ch)) {
        return false;
      }
      if (silent) {
        return true;
      }
      max = state.skipSpacesBack(max, pos);
      tmp = state.skipCharsBack(max, 35, pos);
      if (tmp > pos && isSpace(state.src.charCodeAt(tmp - 1))) {
        max = tmp;
      }
      state.line = startLine + 1;
      token2 = state.push("heading_open", "h" + String(level), 1);
      token2.markup = "########".slice(0, level);
      token2.map = [startLine, state.line];
      token2 = state.push("inline", "", 0);
      token2.content = state.src.slice(pos, max).trim();
      token2.map = [startLine, state.line];
      token2.children = [];
      token2 = state.push("heading_close", "h" + String(level), -1);
      token2.markup = "########".slice(0, level);
      return true;
    };
    return heading;
  }
  var lheading;
  var hasRequiredLheading;
  function requireLheading() {
    if (hasRequiredLheading) return lheading;
    hasRequiredLheading = 1;
    lheading = function lheading2(state, startLine, endLine) {
      var content, terminate, i2, l, token2, pos, max, level, marker2, nextLine = startLine + 1, oldParentType, terminatorRules = state.md.block.ruler.getRules("paragraph");
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      oldParentType = state.parentType;
      state.parentType = "paragraph";
      for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
        if (state.sCount[nextLine] - state.blkIndent > 3) {
          continue;
        }
        if (state.sCount[nextLine] >= state.blkIndent) {
          pos = state.bMarks[nextLine] + state.tShift[nextLine];
          max = state.eMarks[nextLine];
          if (pos < max) {
            marker2 = state.src.charCodeAt(pos);
            if (marker2 === 45 || marker2 === 61) {
              pos = state.skipChars(pos, marker2);
              pos = state.skipSpaces(pos);
              if (pos >= max) {
                level = marker2 === 61 ? 1 : 2;
                break;
              }
            }
          }
        }
        if (state.sCount[nextLine] < 0) {
          continue;
        }
        terminate = false;
        for (i2 = 0, l = terminatorRules.length; i2 < l; i2++) {
          if (terminatorRules[i2](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }
        if (terminate) {
          break;
        }
      }
      if (!level) {
        return false;
      }
      content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
      state.line = nextLine + 1;
      token2 = state.push("heading_open", "h" + String(level), 1);
      token2.markup = String.fromCharCode(marker2);
      token2.map = [startLine, state.line];
      token2 = state.push("inline", "", 0);
      token2.content = content;
      token2.map = [startLine, state.line - 1];
      token2.children = [];
      token2 = state.push("heading_close", "h" + String(level), -1);
      token2.markup = String.fromCharCode(marker2);
      state.parentType = oldParentType;
      return true;
    };
    return lheading;
  }
  var html_blocks;
  var hasRequiredHtml_blocks;
  function requireHtml_blocks() {
    if (hasRequiredHtml_blocks) return html_blocks;
    hasRequiredHtml_blocks = 1;
    html_blocks = [
      "address",
      "article",
      "aside",
      "base",
      "basefont",
      "blockquote",
      "body",
      "caption",
      "center",
      "col",
      "colgroup",
      "dd",
      "details",
      "dialog",
      "dir",
      "div",
      "dl",
      "dt",
      "fieldset",
      "figcaption",
      "figure",
      "footer",
      "form",
      "frame",
      "frameset",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "head",
      "header",
      "hr",
      "html",
      "iframe",
      "legend",
      "li",
      "link",
      "main",
      "menu",
      "menuitem",
      "meta",
      "nav",
      "noframes",
      "ol",
      "optgroup",
      "option",
      "p",
      "param",
      "section",
      "source",
      "summary",
      "table",
      "tbody",
      "td",
      "tfoot",
      "th",
      "thead",
      "title",
      "tr",
      "track",
      "ul"
    ];
    return html_blocks;
  }
  var html_re = {};
  var hasRequiredHtml_re;
  function requireHtml_re() {
    if (hasRequiredHtml_re) return html_re;
    hasRequiredHtml_re = 1;
    var attr_name = "[a-zA-Z_:][a-zA-Z0-9:._-]*";
    var unquoted = "[^\"'=<>`\\x00-\\x20]+";
    var single_quoted = "'[^']*'";
    var double_quoted = '"[^"]*"';
    var attr_value = "(?:" + unquoted + "|" + single_quoted + "|" + double_quoted + ")";
    var attribute = "(?:\\s+" + attr_name + "(?:\\s*=\\s*" + attr_value + ")?)";
    var open_tag = "<[A-Za-z][A-Za-z0-9\\-]*" + attribute + "*\\s*\\/?>";
    var close_tag = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>";
    var comment = "<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->";
    var processing = "<[?].*?[?]>";
    var declaration = "<![A-Z]+\\s+[^>]*>";
    var cdata = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>";
    var HTML_TAG_RE = new RegExp("^(?:" + open_tag + "|" + close_tag + "|" + comment + "|" + processing + "|" + declaration + "|" + cdata + ")");
    var HTML_OPEN_CLOSE_TAG_RE = new RegExp("^(?:" + open_tag + "|" + close_tag + ")");
    html_re.HTML_TAG_RE = HTML_TAG_RE;
    html_re.HTML_OPEN_CLOSE_TAG_RE = HTML_OPEN_CLOSE_TAG_RE;
    return html_re;
  }
  var html_block;
  var hasRequiredHtml_block;
  function requireHtml_block() {
    if (hasRequiredHtml_block) return html_block;
    hasRequiredHtml_block = 1;
    var block_names = requireHtml_blocks();
    var HTML_OPEN_CLOSE_TAG_RE = requireHtml_re().HTML_OPEN_CLOSE_TAG_RE;
    var HTML_SEQUENCES = [
      [/^<(script|pre|style)(?=(\s|>|$))/i, /<\/(script|pre|style)>/i, true],
      [/^<!--/, /-->/, true],
      [/^<\?/, /\?>/, true],
      [/^<![A-Z]/, />/, true],
      [/^<!\[CDATA\[/, /\]\]>/, true],
      [new RegExp("^</?(" + block_names.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, true],
      [new RegExp(HTML_OPEN_CLOSE_TAG_RE.source + "\\s*$"), /^$/, false]
    ];
    html_block = function html_block2(state, startLine, endLine, silent) {
      var i2, nextLine, token2, lineText, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      if (!state.md.options.html) {
        return false;
      }
      if (state.src.charCodeAt(pos) !== 60) {
        return false;
      }
      lineText = state.src.slice(pos, max);
      for (i2 = 0; i2 < HTML_SEQUENCES.length; i2++) {
        if (HTML_SEQUENCES[i2][0].test(lineText)) {
          break;
        }
      }
      if (i2 === HTML_SEQUENCES.length) {
        return false;
      }
      if (silent) {
        return HTML_SEQUENCES[i2][2];
      }
      nextLine = startLine + 1;
      if (!HTML_SEQUENCES[i2][1].test(lineText)) {
        for (; nextLine < endLine; nextLine++) {
          if (state.sCount[nextLine] < state.blkIndent) {
            break;
          }
          pos = state.bMarks[nextLine] + state.tShift[nextLine];
          max = state.eMarks[nextLine];
          lineText = state.src.slice(pos, max);
          if (HTML_SEQUENCES[i2][1].test(lineText)) {
            if (lineText.length !== 0) {
              nextLine++;
            }
            break;
          }
        }
      }
      state.line = nextLine;
      token2 = state.push("html_block", "", 0);
      token2.map = [startLine, nextLine];
      token2.content = state.getLines(startLine, nextLine, state.blkIndent, true);
      return true;
    };
    return html_block;
  }
  var paragraph;
  var hasRequiredParagraph;
  function requireParagraph() {
    if (hasRequiredParagraph) return paragraph;
    hasRequiredParagraph = 1;
    paragraph = function paragraph2(state, startLine) {
      var content, terminate, i2, l, token2, oldParentType, nextLine = startLine + 1, terminatorRules = state.md.block.ruler.getRules("paragraph"), endLine = state.lineMax;
      oldParentType = state.parentType;
      state.parentType = "paragraph";
      for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
        if (state.sCount[nextLine] - state.blkIndent > 3) {
          continue;
        }
        if (state.sCount[nextLine] < 0) {
          continue;
        }
        terminate = false;
        for (i2 = 0, l = terminatorRules.length; i2 < l; i2++) {
          if (terminatorRules[i2](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }
        if (terminate) {
          break;
        }
      }
      content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
      state.line = nextLine;
      token2 = state.push("paragraph_open", "p", 1);
      token2.map = [startLine, state.line];
      token2 = state.push("inline", "", 0);
      token2.content = content;
      token2.map = [startLine, state.line];
      token2.children = [];
      token2 = state.push("paragraph_close", "p", -1);
      state.parentType = oldParentType;
      return true;
    };
    return paragraph;
  }
  var state_block;
  var hasRequiredState_block;
  function requireState_block() {
    if (hasRequiredState_block) return state_block;
    hasRequiredState_block = 1;
    var Token = requireToken();
    var isSpace = requireUtils().isSpace;
    function StateBlock(src, md, env, tokens) {
      var ch, s, start, pos, len, indent, offset, indent_found;
      this.src = src;
      this.md = md;
      this.env = env;
      this.tokens = tokens;
      this.bMarks = [];
      this.eMarks = [];
      this.tShift = [];
      this.sCount = [];
      this.bsCount = [];
      this.blkIndent = 0;
      this.line = 0;
      this.lineMax = 0;
      this.tight = false;
      this.ddIndent = -1;
      this.parentType = "root";
      this.level = 0;
      this.result = "";
      s = this.src;
      indent_found = false;
      for (start = pos = indent = offset = 0, len = s.length; pos < len; pos++) {
        ch = s.charCodeAt(pos);
        if (!indent_found) {
          if (isSpace(ch)) {
            indent++;
            if (ch === 9) {
              offset += 4 - offset % 4;
            } else {
              offset++;
            }
            continue;
          } else {
            indent_found = true;
          }
        }
        if (ch === 10 || pos === len - 1) {
          if (ch !== 10) {
            pos++;
          }
          this.bMarks.push(start);
          this.eMarks.push(pos);
          this.tShift.push(indent);
          this.sCount.push(offset);
          this.bsCount.push(0);
          indent_found = false;
          indent = 0;
          offset = 0;
          start = pos + 1;
        }
      }
      this.bMarks.push(s.length);
      this.eMarks.push(s.length);
      this.tShift.push(0);
      this.sCount.push(0);
      this.bsCount.push(0);
      this.lineMax = this.bMarks.length - 1;
    }
    StateBlock.prototype.push = function(type, tag, nesting) {
      var token2 = new Token(type, tag, nesting);
      token2.block = true;
      if (nesting < 0) {
        this.level--;
      }
      token2.level = this.level;
      if (nesting > 0) {
        this.level++;
      }
      this.tokens.push(token2);
      return token2;
    };
    StateBlock.prototype.isEmpty = function isEmpty(line) {
      return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
    };
    StateBlock.prototype.skipEmptyLines = function skipEmptyLines(from) {
      for (var max = this.lineMax; from < max; from++) {
        if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) {
          break;
        }
      }
      return from;
    };
    StateBlock.prototype.skipSpaces = function skipSpaces(pos) {
      var ch;
      for (var max = this.src.length; pos < max; pos++) {
        ch = this.src.charCodeAt(pos);
        if (!isSpace(ch)) {
          break;
        }
      }
      return pos;
    };
    StateBlock.prototype.skipSpacesBack = function skipSpacesBack(pos, min) {
      if (pos <= min) {
        return pos;
      }
      while (pos > min) {
        if (!isSpace(this.src.charCodeAt(--pos))) {
          return pos + 1;
        }
      }
      return pos;
    };
    StateBlock.prototype.skipChars = function skipChars(pos, code2) {
      for (var max = this.src.length; pos < max; pos++) {
        if (this.src.charCodeAt(pos) !== code2) {
          break;
        }
      }
      return pos;
    };
    StateBlock.prototype.skipCharsBack = function skipCharsBack(pos, code2, min) {
      if (pos <= min) {
        return pos;
      }
      while (pos > min) {
        if (code2 !== this.src.charCodeAt(--pos)) {
          return pos + 1;
        }
      }
      return pos;
    };
    StateBlock.prototype.getLines = function getLines(begin, end, indent, keepLastLF) {
      var i2, lineIndent, ch, first, last, queue2, lineStart, line = begin;
      if (begin >= end) {
        return "";
      }
      queue2 = new Array(end - begin);
      for (i2 = 0; line < end; line++, i2++) {
        lineIndent = 0;
        lineStart = first = this.bMarks[line];
        if (line + 1 < end || keepLastLF) {
          last = this.eMarks[line] + 1;
        } else {
          last = this.eMarks[line];
        }
        while (first < last && lineIndent < indent) {
          ch = this.src.charCodeAt(first);
          if (isSpace(ch)) {
            if (ch === 9) {
              lineIndent += 4 - (lineIndent + this.bsCount[line]) % 4;
            } else {
              lineIndent++;
            }
          } else if (first - lineStart < this.tShift[line]) {
            lineIndent++;
          } else {
            break;
          }
          first++;
        }
        if (lineIndent > indent) {
          queue2[i2] = new Array(lineIndent - indent + 1).join(" ") + this.src.slice(first, last);
        } else {
          queue2[i2] = this.src.slice(first, last);
        }
      }
      return queue2.join("");
    };
    StateBlock.prototype.Token = Token;
    state_block = StateBlock;
    return state_block;
  }
  var parser_block;
  var hasRequiredParser_block;
  function requireParser_block() {
    if (hasRequiredParser_block) return parser_block;
    hasRequiredParser_block = 1;
    var Ruler = requireRuler();
    var _rules = [
      // First 2 params - rule name & source. Secondary array - list of rules,
      // which can be terminated by this one.
      ["table", requireTable(), ["paragraph", "reference"]],
      ["code", requireCode()],
      ["fence", requireFence(), ["paragraph", "reference", "blockquote", "list"]],
      ["blockquote", requireBlockquote(), ["paragraph", "reference", "blockquote", "list"]],
      ["hr", requireHr(), ["paragraph", "reference", "blockquote", "list"]],
      ["list", requireList(), ["paragraph", "reference", "blockquote"]],
      ["reference", requireReference()],
      ["heading", requireHeading(), ["paragraph", "reference", "blockquote"]],
      ["lheading", requireLheading()],
      ["html_block", requireHtml_block(), ["paragraph", "reference", "blockquote"]],
      ["paragraph", requireParagraph()]
    ];
    function ParserBlock() {
      this.ruler = new Ruler();
      for (var i2 = 0; i2 < _rules.length; i2++) {
        this.ruler.push(_rules[i2][0], _rules[i2][1], { alt: (_rules[i2][2] || []).slice() });
      }
    }
    ParserBlock.prototype.tokenize = function(state, startLine, endLine) {
      var ok, i2, rules = this.ruler.getRules(""), len = rules.length, line = startLine, hasEmptyLines = false, maxNesting = state.md.options.maxNesting;
      while (line < endLine) {
        state.line = line = state.skipEmptyLines(line);
        if (line >= endLine) {
          break;
        }
        if (state.sCount[line] < state.blkIndent) {
          break;
        }
        if (state.level >= maxNesting) {
          state.line = endLine;
          break;
        }
        for (i2 = 0; i2 < len; i2++) {
          ok = rules[i2](state, line, endLine, false);
          if (ok) {
            break;
          }
        }
        state.tight = !hasEmptyLines;
        if (state.isEmpty(state.line - 1)) {
          hasEmptyLines = true;
        }
        line = state.line;
        if (line < endLine && state.isEmpty(line)) {
          hasEmptyLines = true;
          line++;
          state.line = line;
        }
      }
    };
    ParserBlock.prototype.parse = function(src, md, env, outTokens) {
      var state;
      if (!src) {
        return;
      }
      state = new this.State(src, md, env, outTokens);
      this.tokenize(state, state.line, state.lineMax);
    };
    ParserBlock.prototype.State = requireState_block();
    parser_block = ParserBlock;
    return parser_block;
  }
  var text;
  var hasRequiredText;
  function requireText() {
    if (hasRequiredText) return text;
    hasRequiredText = 1;
    function isTerminatorChar(ch) {
      switch (ch) {
        case 10:
        case 33:
        case 35:
        case 36:
        case 37:
        case 38:
        case 42:
        case 43:
        case 45:
        case 58:
        case 60:
        case 61:
        case 62:
        case 64:
        case 91:
        case 92:
        case 93:
        case 94:
        case 95:
        case 96:
        case 123:
        case 125:
        case 126:
          return true;
        default:
          return false;
      }
    }
    text = function text2(state, silent) {
      var pos = state.pos;
      while (pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))) {
        pos++;
      }
      if (pos === state.pos) {
        return false;
      }
      if (!silent) {
        state.pending += state.src.slice(state.pos, pos);
      }
      state.pos = pos;
      return true;
    };
    return text;
  }
  var newline;
  var hasRequiredNewline;
  function requireNewline() {
    if (hasRequiredNewline) return newline;
    hasRequiredNewline = 1;
    var isSpace = requireUtils().isSpace;
    newline = function newline2(state, silent) {
      var pmax, max, pos = state.pos;
      if (state.src.charCodeAt(pos) !== 10) {
        return false;
      }
      pmax = state.pending.length - 1;
      max = state.posMax;
      if (!silent) {
        if (pmax >= 0 && state.pending.charCodeAt(pmax) === 32) {
          if (pmax >= 1 && state.pending.charCodeAt(pmax - 1) === 32) {
            state.pending = state.pending.replace(/ +$/, "");
            state.push("hardbreak", "br", 0);
          } else {
            state.pending = state.pending.slice(0, -1);
            state.push("softbreak", "br", 0);
          }
        } else {
          state.push("softbreak", "br", 0);
        }
      }
      pos++;
      while (pos < max && isSpace(state.src.charCodeAt(pos))) {
        pos++;
      }
      state.pos = pos;
      return true;
    };
    return newline;
  }
  var _escape;
  var hasRequired_escape;
  function require_escape() {
    if (hasRequired_escape) return _escape;
    hasRequired_escape = 1;
    var isSpace = requireUtils().isSpace;
    var ESCAPED = [];
    for (var i2 = 0; i2 < 256; i2++) {
      ESCAPED.push(0);
    }
    "\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(ch) {
      ESCAPED[ch.charCodeAt(0)] = 1;
    });
    _escape = function escape(state, silent) {
      var ch, pos = state.pos, max = state.posMax;
      if (state.src.charCodeAt(pos) !== 92) {
        return false;
      }
      pos++;
      if (pos < max) {
        ch = state.src.charCodeAt(pos);
        if (ch < 256 && ESCAPED[ch] !== 0) {
          if (!silent) {
            state.pending += state.src[pos];
          }
          state.pos += 2;
          return true;
        }
        if (ch === 10) {
          if (!silent) {
            state.push("hardbreak", "br", 0);
          }
          pos++;
          while (pos < max) {
            ch = state.src.charCodeAt(pos);
            if (!isSpace(ch)) {
              break;
            }
            pos++;
          }
          state.pos = pos;
          return true;
        }
      }
      if (!silent) {
        state.pending += "\\";
      }
      state.pos++;
      return true;
    };
    return _escape;
  }
  var backticks;
  var hasRequiredBackticks;
  function requireBackticks() {
    if (hasRequiredBackticks) return backticks;
    hasRequiredBackticks = 1;
    backticks = function backtick(state, silent) {
      var start, max, marker2, matchStart, matchEnd, token2, pos = state.pos, ch = state.src.charCodeAt(pos);
      if (ch !== 96) {
        return false;
      }
      start = pos;
      pos++;
      max = state.posMax;
      while (pos < max && state.src.charCodeAt(pos) === 96) {
        pos++;
      }
      marker2 = state.src.slice(start, pos);
      matchStart = matchEnd = pos;
      while ((matchStart = state.src.indexOf("`", matchEnd)) !== -1) {
        matchEnd = matchStart + 1;
        while (matchEnd < max && state.src.charCodeAt(matchEnd) === 96) {
          matchEnd++;
        }
        if (matchEnd - matchStart === marker2.length) {
          if (!silent) {
            token2 = state.push("code_inline", "code", 0);
            token2.markup = marker2;
            token2.content = state.src.slice(pos, matchStart).replace(/[ \n]+/g, " ").trim();
          }
          state.pos = matchEnd;
          return true;
        }
      }
      if (!silent) {
        state.pending += marker2;
      }
      state.pos += marker2.length;
      return true;
    };
    return backticks;
  }
  var strikethrough = {};
  var hasRequiredStrikethrough;
  function requireStrikethrough() {
    if (hasRequiredStrikethrough) return strikethrough;
    hasRequiredStrikethrough = 1;
    strikethrough.tokenize = function strikethrough2(state, silent) {
      var i2, scanned, token2, len, ch, start = state.pos, marker2 = state.src.charCodeAt(start);
      if (silent) {
        return false;
      }
      if (marker2 !== 126) {
        return false;
      }
      scanned = state.scanDelims(state.pos, true);
      len = scanned.length;
      ch = String.fromCharCode(marker2);
      if (len < 2) {
        return false;
      }
      if (len % 2) {
        token2 = state.push("text", "", 0);
        token2.content = ch;
        len--;
      }
      for (i2 = 0; i2 < len; i2 += 2) {
        token2 = state.push("text", "", 0);
        token2.content = ch + ch;
        state.delimiters.push({
          marker: marker2,
          jump: i2,
          token: state.tokens.length - 1,
          level: state.level,
          end: -1,
          open: scanned.can_open,
          close: scanned.can_close
        });
      }
      state.pos += scanned.length;
      return true;
    };
    strikethrough.postProcess = function strikethrough2(state) {
      var i2, j, startDelim, endDelim, token2, loneMarkers = [], delimiters = state.delimiters, max = state.delimiters.length;
      for (i2 = 0; i2 < max; i2++) {
        startDelim = delimiters[i2];
        if (startDelim.marker !== 126) {
          continue;
        }
        if (startDelim.end === -1) {
          continue;
        }
        endDelim = delimiters[startDelim.end];
        token2 = state.tokens[startDelim.token];
        token2.type = "s_open";
        token2.tag = "s";
        token2.nesting = 1;
        token2.markup = "~~";
        token2.content = "";
        token2 = state.tokens[endDelim.token];
        token2.type = "s_close";
        token2.tag = "s";
        token2.nesting = -1;
        token2.markup = "~~";
        token2.content = "";
        if (state.tokens[endDelim.token - 1].type === "text" && state.tokens[endDelim.token - 1].content === "~") {
          loneMarkers.push(endDelim.token - 1);
        }
      }
      while (loneMarkers.length) {
        i2 = loneMarkers.pop();
        j = i2 + 1;
        while (j < state.tokens.length && state.tokens[j].type === "s_close") {
          j++;
        }
        j--;
        if (i2 !== j) {
          token2 = state.tokens[j];
          state.tokens[j] = state.tokens[i2];
          state.tokens[i2] = token2;
        }
      }
    };
    return strikethrough;
  }
  var emphasis = {};
  var hasRequiredEmphasis;
  function requireEmphasis() {
    if (hasRequiredEmphasis) return emphasis;
    hasRequiredEmphasis = 1;
    emphasis.tokenize = function emphasis2(state, silent) {
      var i2, scanned, token2, start = state.pos, marker2 = state.src.charCodeAt(start);
      if (silent) {
        return false;
      }
      if (marker2 !== 95 && marker2 !== 42) {
        return false;
      }
      scanned = state.scanDelims(state.pos, marker2 === 42);
      for (i2 = 0; i2 < scanned.length; i2++) {
        token2 = state.push("text", "", 0);
        token2.content = String.fromCharCode(marker2);
        state.delimiters.push({
          // Char code of the starting marker (number).
          //
          marker: marker2,
          // Total length of these series of delimiters.
          //
          length: scanned.length,
          // An amount of characters before this one that's equivalent to
          // current one. In plain English: if this delimiter does not open
          // an emphasis, neither do previous `jump` characters.
          //
          // Used to skip sequences like "*****" in one step, for 1st asterisk
          // value will be 0, for 2nd it's 1 and so on.
          //
          jump: i2,
          // A position of the token this delimiter corresponds to.
          //
          token: state.tokens.length - 1,
          // Token level.
          //
          level: state.level,
          // If this delimiter is matched as a valid opener, `end` will be
          // equal to its position, otherwise it's `-1`.
          //
          end: -1,
          // Boolean flags that determine if this delimiter could open or close
          // an emphasis.
          //
          open: scanned.can_open,
          close: scanned.can_close
        });
      }
      state.pos += scanned.length;
      return true;
    };
    emphasis.postProcess = function emphasis2(state) {
      var i2, startDelim, endDelim, token2, ch, isStrong, delimiters = state.delimiters, max = state.delimiters.length;
      for (i2 = max - 1; i2 >= 0; i2--) {
        startDelim = delimiters[i2];
        if (startDelim.marker !== 95 && startDelim.marker !== 42) {
          continue;
        }
        if (startDelim.end === -1) {
          continue;
        }
        endDelim = delimiters[startDelim.end];
        isStrong = i2 > 0 && delimiters[i2 - 1].end === startDelim.end + 1 && delimiters[i2 - 1].token === startDelim.token - 1 && delimiters[startDelim.end + 1].token === endDelim.token + 1 && delimiters[i2 - 1].marker === startDelim.marker;
        ch = String.fromCharCode(startDelim.marker);
        token2 = state.tokens[startDelim.token];
        token2.type = isStrong ? "strong_open" : "em_open";
        token2.tag = isStrong ? "strong" : "em";
        token2.nesting = 1;
        token2.markup = isStrong ? ch + ch : ch;
        token2.content = "";
        token2 = state.tokens[endDelim.token];
        token2.type = isStrong ? "strong_close" : "em_close";
        token2.tag = isStrong ? "strong" : "em";
        token2.nesting = -1;
        token2.markup = isStrong ? ch + ch : ch;
        token2.content = "";
        if (isStrong) {
          state.tokens[delimiters[i2 - 1].token].content = "";
          state.tokens[delimiters[startDelim.end + 1].token].content = "";
          i2--;
        }
      }
    };
    return emphasis;
  }
  var link;
  var hasRequiredLink;
  function requireLink() {
    if (hasRequiredLink) return link;
    hasRequiredLink = 1;
    var normalizeReference = requireUtils().normalizeReference;
    var isSpace = requireUtils().isSpace;
    link = function link2(state, silent) {
      var attrs, code2, label, labelEnd, labelStart, pos, res, ref2, title, token2, href = "", oldPos = state.pos, max = state.posMax, start = state.pos, parseReference = true;
      if (state.src.charCodeAt(state.pos) !== 91) {
        return false;
      }
      labelStart = state.pos + 1;
      labelEnd = state.md.helpers.parseLinkLabel(state, state.pos, true);
      if (labelEnd < 0) {
        return false;
      }
      pos = labelEnd + 1;
      if (pos < max && state.src.charCodeAt(pos) === 40) {
        parseReference = false;
        pos++;
        for (; pos < max; pos++) {
          code2 = state.src.charCodeAt(pos);
          if (!isSpace(code2) && code2 !== 10) {
            break;
          }
        }
        if (pos >= max) {
          return false;
        }
        start = pos;
        res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
        if (res.ok) {
          href = state.md.normalizeLink(res.str);
          if (state.md.validateLink(href)) {
            pos = res.pos;
          } else {
            href = "";
          }
        }
        start = pos;
        for (; pos < max; pos++) {
          code2 = state.src.charCodeAt(pos);
          if (!isSpace(code2) && code2 !== 10) {
            break;
          }
        }
        res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
        if (pos < max && start !== pos && res.ok) {
          title = res.str;
          pos = res.pos;
          for (; pos < max; pos++) {
            code2 = state.src.charCodeAt(pos);
            if (!isSpace(code2) && code2 !== 10) {
              break;
            }
          }
        } else {
          title = "";
        }
        if (pos >= max || state.src.charCodeAt(pos) !== 41) {
          parseReference = true;
        }
        pos++;
      }
      if (parseReference) {
        if (typeof state.env.references === "undefined") {
          return false;
        }
        if (pos < max && state.src.charCodeAt(pos) === 91) {
          start = pos + 1;
          pos = state.md.helpers.parseLinkLabel(state, pos);
          if (pos >= 0) {
            label = state.src.slice(start, pos++);
          } else {
            pos = labelEnd + 1;
          }
        } else {
          pos = labelEnd + 1;
        }
        if (!label) {
          label = state.src.slice(labelStart, labelEnd);
        }
        ref2 = state.env.references[normalizeReference(label)];
        if (!ref2) {
          state.pos = oldPos;
          return false;
        }
        href = ref2.href;
        title = ref2.title;
      }
      if (!silent) {
        state.pos = labelStart;
        state.posMax = labelEnd;
        token2 = state.push("link_open", "a", 1);
        token2.attrs = attrs = [["href", href]];
        if (title) {
          attrs.push(["title", title]);
        }
        state.md.inline.tokenize(state);
        token2 = state.push("link_close", "a", -1);
      }
      state.pos = pos;
      state.posMax = max;
      return true;
    };
    return link;
  }
  var image;
  var hasRequiredImage;
  function requireImage() {
    if (hasRequiredImage) return image;
    hasRequiredImage = 1;
    var normalizeReference = requireUtils().normalizeReference;
    var isSpace = requireUtils().isSpace;
    image = function image2(state, silent) {
      var attrs, code2, content, label, labelEnd, labelStart, pos, ref2, res, title, token2, tokens, start, href = "", oldPos = state.pos, max = state.posMax;
      if (state.src.charCodeAt(state.pos) !== 33) {
        return false;
      }
      if (state.src.charCodeAt(state.pos + 1) !== 91) {
        return false;
      }
      labelStart = state.pos + 2;
      labelEnd = state.md.helpers.parseLinkLabel(state, state.pos + 1, false);
      if (labelEnd < 0) {
        return false;
      }
      pos = labelEnd + 1;
      if (pos < max && state.src.charCodeAt(pos) === 40) {
        pos++;
        for (; pos < max; pos++) {
          code2 = state.src.charCodeAt(pos);
          if (!isSpace(code2) && code2 !== 10) {
            break;
          }
        }
        if (pos >= max) {
          return false;
        }
        start = pos;
        res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
        if (res.ok) {
          href = state.md.normalizeLink(res.str);
          if (state.md.validateLink(href)) {
            pos = res.pos;
          } else {
            href = "";
          }
        }
        start = pos;
        for (; pos < max; pos++) {
          code2 = state.src.charCodeAt(pos);
          if (!isSpace(code2) && code2 !== 10) {
            break;
          }
        }
        res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
        if (pos < max && start !== pos && res.ok) {
          title = res.str;
          pos = res.pos;
          for (; pos < max; pos++) {
            code2 = state.src.charCodeAt(pos);
            if (!isSpace(code2) && code2 !== 10) {
              break;
            }
          }
        } else {
          title = "";
        }
        if (pos >= max || state.src.charCodeAt(pos) !== 41) {
          state.pos = oldPos;
          return false;
        }
        pos++;
      } else {
        if (typeof state.env.references === "undefined") {
          return false;
        }
        if (pos < max && state.src.charCodeAt(pos) === 91) {
          start = pos + 1;
          pos = state.md.helpers.parseLinkLabel(state, pos);
          if (pos >= 0) {
            label = state.src.slice(start, pos++);
          } else {
            pos = labelEnd + 1;
          }
        } else {
          pos = labelEnd + 1;
        }
        if (!label) {
          label = state.src.slice(labelStart, labelEnd);
        }
        ref2 = state.env.references[normalizeReference(label)];
        if (!ref2) {
          state.pos = oldPos;
          return false;
        }
        href = ref2.href;
        title = ref2.title;
      }
      if (!silent) {
        content = state.src.slice(labelStart, labelEnd);
        state.md.inline.parse(
          content,
          state.md,
          state.env,
          tokens = []
        );
        token2 = state.push("image", "img", 0);
        token2.attrs = attrs = [["src", href], ["alt", ""]];
        token2.children = tokens;
        token2.content = content;
        if (title) {
          attrs.push(["title", title]);
        }
      }
      state.pos = pos;
      state.posMax = max;
      return true;
    };
    return image;
  }
  var autolink;
  var hasRequiredAutolink;
  function requireAutolink() {
    if (hasRequiredAutolink) return autolink;
    hasRequiredAutolink = 1;
    var EMAIL_RE = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/;
    var AUTOLINK_RE = /^<([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)>/;
    autolink = function autolink2(state, silent) {
      var tail, linkMatch, emailMatch, url, fullUrl, token2, pos = state.pos;
      if (state.src.charCodeAt(pos) !== 60) {
        return false;
      }
      tail = state.src.slice(pos);
      if (tail.indexOf(">") < 0) {
        return false;
      }
      if (AUTOLINK_RE.test(tail)) {
        linkMatch = tail.match(AUTOLINK_RE);
        url = linkMatch[0].slice(1, -1);
        fullUrl = state.md.normalizeLink(url);
        if (!state.md.validateLink(fullUrl)) {
          return false;
        }
        if (!silent) {
          token2 = state.push("link_open", "a", 1);
          token2.attrs = [["href", fullUrl]];
          token2.markup = "autolink";
          token2.info = "auto";
          token2 = state.push("text", "", 0);
          token2.content = state.md.normalizeLinkText(url);
          token2 = state.push("link_close", "a", -1);
          token2.markup = "autolink";
          token2.info = "auto";
        }
        state.pos += linkMatch[0].length;
        return true;
      }
      if (EMAIL_RE.test(tail)) {
        emailMatch = tail.match(EMAIL_RE);
        url = emailMatch[0].slice(1, -1);
        fullUrl = state.md.normalizeLink("mailto:" + url);
        if (!state.md.validateLink(fullUrl)) {
          return false;
        }
        if (!silent) {
          token2 = state.push("link_open", "a", 1);
          token2.attrs = [["href", fullUrl]];
          token2.markup = "autolink";
          token2.info = "auto";
          token2 = state.push("text", "", 0);
          token2.content = state.md.normalizeLinkText(url);
          token2 = state.push("link_close", "a", -1);
          token2.markup = "autolink";
          token2.info = "auto";
        }
        state.pos += emailMatch[0].length;
        return true;
      }
      return false;
    };
    return autolink;
  }
  var html_inline;
  var hasRequiredHtml_inline;
  function requireHtml_inline() {
    if (hasRequiredHtml_inline) return html_inline;
    hasRequiredHtml_inline = 1;
    var HTML_TAG_RE = requireHtml_re().HTML_TAG_RE;
    function isLetter(ch) {
      var lc2 = ch | 32;
      return lc2 >= 97 && lc2 <= 122;
    }
    html_inline = function html_inline2(state, silent) {
      var ch, match, max, token2, pos = state.pos;
      if (!state.md.options.html) {
        return false;
      }
      max = state.posMax;
      if (state.src.charCodeAt(pos) !== 60 || pos + 2 >= max) {
        return false;
      }
      ch = state.src.charCodeAt(pos + 1);
      if (ch !== 33 && ch !== 63 && ch !== 47 && !isLetter(ch)) {
        return false;
      }
      match = state.src.slice(pos).match(HTML_TAG_RE);
      if (!match) {
        return false;
      }
      if (!silent) {
        token2 = state.push("html_inline", "", 0);
        token2.content = state.src.slice(pos, pos + match[0].length);
      }
      state.pos += match[0].length;
      return true;
    };
    return html_inline;
  }
  var entity;
  var hasRequiredEntity;
  function requireEntity() {
    if (hasRequiredEntity) return entity;
    hasRequiredEntity = 1;
    var entities2 = requireEntities();
    var has = requireUtils().has;
    var isValidEntityCode = requireUtils().isValidEntityCode;
    var fromCodePoint = requireUtils().fromCodePoint;
    var DIGITAL_RE = /^&#((?:x[a-f0-9]{1,8}|[0-9]{1,8}));/i;
    var NAMED_RE = /^&([a-z][a-z0-9]{1,31});/i;
    entity = function entity2(state, silent) {
      var ch, code2, match, pos = state.pos, max = state.posMax;
      if (state.src.charCodeAt(pos) !== 38) {
        return false;
      }
      if (pos + 1 < max) {
        ch = state.src.charCodeAt(pos + 1);
        if (ch === 35) {
          match = state.src.slice(pos).match(DIGITAL_RE);
          if (match) {
            if (!silent) {
              code2 = match[1][0].toLowerCase() === "x" ? parseInt(match[1].slice(1), 16) : parseInt(match[1], 10);
              state.pending += isValidEntityCode(code2) ? fromCodePoint(code2) : fromCodePoint(65533);
            }
            state.pos += match[0].length;
            return true;
          }
        } else {
          match = state.src.slice(pos).match(NAMED_RE);
          if (match) {
            if (has(entities2, match[1])) {
              if (!silent) {
                state.pending += entities2[match[1]];
              }
              state.pos += match[0].length;
              return true;
            }
          }
        }
      }
      if (!silent) {
        state.pending += "&";
      }
      state.pos++;
      return true;
    };
    return entity;
  }
  var balance_pairs;
  var hasRequiredBalance_pairs;
  function requireBalance_pairs() {
    if (hasRequiredBalance_pairs) return balance_pairs;
    hasRequiredBalance_pairs = 1;
    balance_pairs = function link_pairs(state) {
      var i2, j, lastDelim, currDelim, delimiters = state.delimiters, max = state.delimiters.length;
      for (i2 = 0; i2 < max; i2++) {
        lastDelim = delimiters[i2];
        if (!lastDelim.close) {
          continue;
        }
        j = i2 - lastDelim.jump - 1;
        while (j >= 0) {
          currDelim = delimiters[j];
          if (currDelim.open && currDelim.marker === lastDelim.marker && currDelim.end < 0 && currDelim.level === lastDelim.level) {
            var odd_match = (currDelim.close || lastDelim.open) && typeof currDelim.length !== "undefined" && typeof lastDelim.length !== "undefined" && (currDelim.length + lastDelim.length) % 3 === 0;
            if (!odd_match) {
              lastDelim.jump = i2 - j;
              lastDelim.open = false;
              currDelim.end = i2;
              currDelim.jump = 0;
              break;
            }
          }
          j -= currDelim.jump + 1;
        }
      }
    };
    return balance_pairs;
  }
  var text_collapse;
  var hasRequiredText_collapse;
  function requireText_collapse() {
    if (hasRequiredText_collapse) return text_collapse;
    hasRequiredText_collapse = 1;
    text_collapse = function text_collapse2(state) {
      var curr, last, level = 0, tokens = state.tokens, max = state.tokens.length;
      for (curr = last = 0; curr < max; curr++) {
        level += tokens[curr].nesting;
        tokens[curr].level = level;
        if (tokens[curr].type === "text" && curr + 1 < max && tokens[curr + 1].type === "text") {
          tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
        } else {
          if (curr !== last) {
            tokens[last] = tokens[curr];
          }
          last++;
        }
      }
      if (curr !== last) {
        tokens.length = last;
      }
    };
    return text_collapse;
  }
  var state_inline;
  var hasRequiredState_inline;
  function requireState_inline() {
    if (hasRequiredState_inline) return state_inline;
    hasRequiredState_inline = 1;
    var Token = requireToken();
    var isWhiteSpace = requireUtils().isWhiteSpace;
    var isPunctChar = requireUtils().isPunctChar;
    var isMdAsciiPunct = requireUtils().isMdAsciiPunct;
    function StateInline(src, md, env, outTokens) {
      this.src = src;
      this.env = env;
      this.md = md;
      this.tokens = outTokens;
      this.pos = 0;
      this.posMax = this.src.length;
      this.level = 0;
      this.pending = "";
      this.pendingLevel = 0;
      this.cache = {};
      this.delimiters = [];
    }
    StateInline.prototype.pushPending = function() {
      var token2 = new Token("text", "", 0);
      token2.content = this.pending;
      token2.level = this.pendingLevel;
      this.tokens.push(token2);
      this.pending = "";
      return token2;
    };
    StateInline.prototype.push = function(type, tag, nesting) {
      if (this.pending) {
        this.pushPending();
      }
      var token2 = new Token(type, tag, nesting);
      if (nesting < 0) {
        this.level--;
      }
      token2.level = this.level;
      if (nesting > 0) {
        this.level++;
      }
      this.pendingLevel = this.level;
      this.tokens.push(token2);
      return token2;
    };
    StateInline.prototype.scanDelims = function(start, canSplitWord) {
      var pos = start, lastChar, nextChar, count, can_open, can_close, isLastWhiteSpace, isLastPunctChar, isNextWhiteSpace, isNextPunctChar, left_flanking = true, right_flanking = true, max = this.posMax, marker2 = this.src.charCodeAt(start);
      lastChar = start > 0 ? this.src.charCodeAt(start - 1) : 32;
      while (pos < max && this.src.charCodeAt(pos) === marker2) {
        pos++;
      }
      count = pos - start;
      nextChar = pos < max ? this.src.charCodeAt(pos) : 32;
      isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
      isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));
      isLastWhiteSpace = isWhiteSpace(lastChar);
      isNextWhiteSpace = isWhiteSpace(nextChar);
      if (isNextWhiteSpace) {
        left_flanking = false;
      } else if (isNextPunctChar) {
        if (!(isLastWhiteSpace || isLastPunctChar)) {
          left_flanking = false;
        }
      }
      if (isLastWhiteSpace) {
        right_flanking = false;
      } else if (isLastPunctChar) {
        if (!(isNextWhiteSpace || isNextPunctChar)) {
          right_flanking = false;
        }
      }
      if (!canSplitWord) {
        can_open = left_flanking && (!right_flanking || isLastPunctChar);
        can_close = right_flanking && (!left_flanking || isNextPunctChar);
      } else {
        can_open = left_flanking;
        can_close = right_flanking;
      }
      return {
        can_open,
        can_close,
        length: count
      };
    };
    StateInline.prototype.Token = Token;
    state_inline = StateInline;
    return state_inline;
  }
  var parser_inline;
  var hasRequiredParser_inline;
  function requireParser_inline() {
    if (hasRequiredParser_inline) return parser_inline;
    hasRequiredParser_inline = 1;
    var Ruler = requireRuler();
    var _rules = [
      ["text", requireText()],
      ["newline", requireNewline()],
      ["escape", require_escape()],
      ["backticks", requireBackticks()],
      ["strikethrough", requireStrikethrough().tokenize],
      ["emphasis", requireEmphasis().tokenize],
      ["link", requireLink()],
      ["image", requireImage()],
      ["autolink", requireAutolink()],
      ["html_inline", requireHtml_inline()],
      ["entity", requireEntity()]
    ];
    var _rules2 = [
      ["balance_pairs", requireBalance_pairs()],
      ["strikethrough", requireStrikethrough().postProcess],
      ["emphasis", requireEmphasis().postProcess],
      ["text_collapse", requireText_collapse()]
    ];
    function ParserInline() {
      var i2;
      this.ruler = new Ruler();
      for (i2 = 0; i2 < _rules.length; i2++) {
        this.ruler.push(_rules[i2][0], _rules[i2][1]);
      }
      this.ruler2 = new Ruler();
      for (i2 = 0; i2 < _rules2.length; i2++) {
        this.ruler2.push(_rules2[i2][0], _rules2[i2][1]);
      }
    }
    ParserInline.prototype.skipToken = function(state) {
      var ok, i2, pos = state.pos, rules = this.ruler.getRules(""), len = rules.length, maxNesting = state.md.options.maxNesting, cache = state.cache;
      if (typeof cache[pos] !== "undefined") {
        state.pos = cache[pos];
        return;
      }
      if (state.level < maxNesting) {
        for (i2 = 0; i2 < len; i2++) {
          state.level++;
          ok = rules[i2](state, true);
          state.level--;
          if (ok) {
            break;
          }
        }
      } else {
        state.pos = state.posMax;
      }
      if (!ok) {
        state.pos++;
      }
      cache[pos] = state.pos;
    };
    ParserInline.prototype.tokenize = function(state) {
      var ok, i2, rules = this.ruler.getRules(""), len = rules.length, end = state.posMax, maxNesting = state.md.options.maxNesting;
      while (state.pos < end) {
        if (state.level < maxNesting) {
          for (i2 = 0; i2 < len; i2++) {
            ok = rules[i2](state, false);
            if (ok) {
              break;
            }
          }
        }
        if (ok) {
          if (state.pos >= end) {
            break;
          }
          continue;
        }
        state.pending += state.src[state.pos++];
      }
      if (state.pending) {
        state.pushPending();
      }
    };
    ParserInline.prototype.parse = function(str, md, env, outTokens) {
      var i2, rules, len;
      var state = new this.State(str, md, env, outTokens);
      this.tokenize(state);
      rules = this.ruler2.getRules("");
      len = rules.length;
      for (i2 = 0; i2 < len; i2++) {
        rules[i2](state);
      }
    };
    ParserInline.prototype.State = requireState_inline();
    parser_inline = ParserInline;
    return parser_inline;
  }
  var re;
  var hasRequiredRe;
  function requireRe() {
    if (hasRequiredRe) return re;
    hasRequiredRe = 1;
    re = function(opts) {
      var re2 = {};
      re2.src_Any = requireRegex$3().source;
      re2.src_Cc = requireRegex$2().source;
      re2.src_Z = requireRegex().source;
      re2.src_P = requireRegex$4().source;
      re2.src_ZPCc = [re2.src_Z, re2.src_P, re2.src_Cc].join("|");
      re2.src_ZCc = [re2.src_Z, re2.src_Cc].join("|");
      var text_separators = "[><｜]";
      re2.src_pseudo_letter = "(?:(?!" + text_separators + "|" + re2.src_ZPCc + ")" + re2.src_Any + ")";
      re2.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
      re2.src_auth = "(?:(?:(?!" + re2.src_ZCc + "|[@/\\[\\]()]).)+@)?";
      re2.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?";
      re2.src_host_terminator = "(?=$|" + text_separators + "|" + re2.src_ZPCc + ")(?!-|_|:\\d|\\.-|\\.(?!$|" + re2.src_ZPCc + "))";
      re2.src_path = "(?:[/?#](?:(?!" + re2.src_ZCc + "|" + text_separators + `|[()[\\]{}.,"'?!\\-]).|\\[(?:(?!` + re2.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + re2.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + re2.src_ZCc + '|[}]).)*\\}|\\"(?:(?!' + re2.src_ZCc + `|["]).)+\\"|\\'(?:(?!` + re2.src_ZCc + "|[']).)+\\'|\\'(?=" + re2.src_pseudo_letter + "|[-]).|\\.{2,4}[a-zA-Z0-9%/]|\\.(?!" + re2.src_ZCc + "|[.]).|" + (opts && opts["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + "\\,(?!" + re2.src_ZCc + ").|\\!(?!" + re2.src_ZCc + "|[!]).|\\?(?!" + re2.src_ZCc + "|[?]).)+|\\/)?";
      re2.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*';
      re2.src_xn = "xn--[a-z0-9\\-]{1,59}";
      re2.src_domain_root = // Allow letters & digits (http://test1)
      "(?:" + re2.src_xn + "|" + re2.src_pseudo_letter + "{1,63})";
      re2.src_domain = "(?:" + re2.src_xn + "|(?:" + re2.src_pseudo_letter + ")|(?:" + re2.src_pseudo_letter + "(?:-|" + re2.src_pseudo_letter + "){0,61}" + re2.src_pseudo_letter + "))";
      re2.src_host = "(?:(?:(?:(?:" + re2.src_domain + ")\\.)*" + re2.src_domain + "))";
      re2.tpl_host_fuzzy = "(?:" + re2.src_ip4 + "|(?:(?:(?:" + re2.src_domain + ")\\.)+(?:%TLDS%)))";
      re2.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + re2.src_domain + ")\\.)+(?:%TLDS%))";
      re2.src_host_strict = re2.src_host + re2.src_host_terminator;
      re2.tpl_host_fuzzy_strict = re2.tpl_host_fuzzy + re2.src_host_terminator;
      re2.src_host_port_strict = re2.src_host + re2.src_port + re2.src_host_terminator;
      re2.tpl_host_port_fuzzy_strict = re2.tpl_host_fuzzy + re2.src_port + re2.src_host_terminator;
      re2.tpl_host_port_no_ip_fuzzy_strict = re2.tpl_host_no_ip_fuzzy + re2.src_port + re2.src_host_terminator;
      re2.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + re2.src_ZPCc + "|>|$))";
      re2.tpl_email_fuzzy = "(^|" + text_separators + '|"|\\(|' + re2.src_ZCc + ")(" + re2.src_email_name + "@" + re2.tpl_host_fuzzy_strict + ")";
      re2.tpl_link_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
      // but can start with > (markdown blockquote)
      "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + re2.src_ZPCc + "))((?![$+<=>^`|｜])" + re2.tpl_host_port_fuzzy_strict + re2.src_path + ")";
      re2.tpl_link_no_ip_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
      // but can start with > (markdown blockquote)
      "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + re2.src_ZPCc + "))((?![$+<=>^`|｜])" + re2.tpl_host_port_no_ip_fuzzy_strict + re2.src_path + ")";
      return re2;
    };
    return re;
  }
  var linkifyIt;
  var hasRequiredLinkifyIt;
  function requireLinkifyIt() {
    if (hasRequiredLinkifyIt) return linkifyIt;
    hasRequiredLinkifyIt = 1;
    function assign(obj) {
      var sources = Array.prototype.slice.call(arguments, 1);
      sources.forEach(function(source) {
        if (!source) {
          return;
        }
        Object.keys(source).forEach(function(key) {
          obj[key] = source[key];
        });
      });
      return obj;
    }
    function _class(obj) {
      return Object.prototype.toString.call(obj);
    }
    function isString2(obj) {
      return _class(obj) === "[object String]";
    }
    function isObject2(obj) {
      return _class(obj) === "[object Object]";
    }
    function isRegExp(obj) {
      return _class(obj) === "[object RegExp]";
    }
    function isFunction2(obj) {
      return _class(obj) === "[object Function]";
    }
    function escapeRE(str) {
      return str.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
    }
    var defaultOptions = {
      fuzzyLink: true,
      fuzzyEmail: true,
      fuzzyIP: false
    };
    function isOptionsObj(obj) {
      return Object.keys(obj || {}).reduce(function(acc, k) {
        return acc || defaultOptions.hasOwnProperty(k);
      }, false);
    }
    var defaultSchemas = {
      "http:": {
        validate: function(text2, pos, self2) {
          var tail = text2.slice(pos);
          if (!self2.re.http) {
            self2.re.http = new RegExp(
              "^\\/\\/" + self2.re.src_auth + self2.re.src_host_port_strict + self2.re.src_path,
              "i"
            );
          }
          if (self2.re.http.test(tail)) {
            return tail.match(self2.re.http)[0].length;
          }
          return 0;
        }
      },
      "https:": "http:",
      "ftp:": "http:",
      "//": {
        validate: function(text2, pos, self2) {
          var tail = text2.slice(pos);
          if (!self2.re.no_http) {
            self2.re.no_http = new RegExp(
              "^" + self2.re.src_auth + // Don't allow single-level domains, because of false positives like '//test'
              // with code comments
              "(?:localhost|(?:(?:" + self2.re.src_domain + ")\\.)+" + self2.re.src_domain_root + ")" + self2.re.src_port + self2.re.src_host_terminator + self2.re.src_path,
              "i"
            );
          }
          if (self2.re.no_http.test(tail)) {
            if (pos >= 3 && text2[pos - 3] === ":") {
              return 0;
            }
            if (pos >= 3 && text2[pos - 3] === "/") {
              return 0;
            }
            return tail.match(self2.re.no_http)[0].length;
          }
          return 0;
        }
      },
      "mailto:": {
        validate: function(text2, pos, self2) {
          var tail = text2.slice(pos);
          if (!self2.re.mailto) {
            self2.re.mailto = new RegExp(
              "^" + self2.re.src_email_name + "@" + self2.re.src_host_strict,
              "i"
            );
          }
          if (self2.re.mailto.test(tail)) {
            return tail.match(self2.re.mailto)[0].length;
          }
          return 0;
        }
      }
    };
    var tlds_2ch_src_re = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]";
    var tlds_default = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
    function resetScanCache(self2) {
      self2.__index__ = -1;
      self2.__text_cache__ = "";
    }
    function createValidator(re2) {
      return function(text2, pos) {
        var tail = text2.slice(pos);
        if (re2.test(tail)) {
          return tail.match(re2)[0].length;
        }
        return 0;
      };
    }
    function createNormalizer() {
      return function(match, self2) {
        self2.normalize(match);
      };
    }
    function compile(self2) {
      var re2 = self2.re = requireRe()(self2.__opts__);
      var tlds = self2.__tlds__.slice();
      self2.onCompile();
      if (!self2.__tlds_replaced__) {
        tlds.push(tlds_2ch_src_re);
      }
      tlds.push(re2.src_xn);
      re2.src_tlds = tlds.join("|");
      function untpl(tpl) {
        return tpl.replace("%TLDS%", re2.src_tlds);
      }
      re2.email_fuzzy = RegExp(untpl(re2.tpl_email_fuzzy), "i");
      re2.link_fuzzy = RegExp(untpl(re2.tpl_link_fuzzy), "i");
      re2.link_no_ip_fuzzy = RegExp(untpl(re2.tpl_link_no_ip_fuzzy), "i");
      re2.host_fuzzy_test = RegExp(untpl(re2.tpl_host_fuzzy_test), "i");
      var aliases = [];
      self2.__compiled__ = {};
      function schemaError(name, val) {
        throw new Error('(LinkifyIt) Invalid schema "' + name + '": ' + val);
      }
      Object.keys(self2.__schemas__).forEach(function(name) {
        var val = self2.__schemas__[name];
        if (val === null) {
          return;
        }
        var compiled = { validate: null, link: null };
        self2.__compiled__[name] = compiled;
        if (isObject2(val)) {
          if (isRegExp(val.validate)) {
            compiled.validate = createValidator(val.validate);
          } else if (isFunction2(val.validate)) {
            compiled.validate = val.validate;
          } else {
            schemaError(name, val);
          }
          if (isFunction2(val.normalize)) {
            compiled.normalize = val.normalize;
          } else if (!val.normalize) {
            compiled.normalize = createNormalizer();
          } else {
            schemaError(name, val);
          }
          return;
        }
        if (isString2(val)) {
          aliases.push(name);
          return;
        }
        schemaError(name, val);
      });
      aliases.forEach(function(alias) {
        if (!self2.__compiled__[self2.__schemas__[alias]]) {
          return;
        }
        self2.__compiled__[alias].validate = self2.__compiled__[self2.__schemas__[alias]].validate;
        self2.__compiled__[alias].normalize = self2.__compiled__[self2.__schemas__[alias]].normalize;
      });
      self2.__compiled__[""] = { validate: null, normalize: createNormalizer() };
      var slist = Object.keys(self2.__compiled__).filter(function(name) {
        return name.length > 0 && self2.__compiled__[name];
      }).map(escapeRE).join("|");
      self2.re.schema_test = RegExp("(^|(?!_)(?:[><｜]|" + re2.src_ZPCc + "))(" + slist + ")", "i");
      self2.re.schema_search = RegExp("(^|(?!_)(?:[><｜]|" + re2.src_ZPCc + "))(" + slist + ")", "ig");
      self2.re.pretest = RegExp(
        "(" + self2.re.schema_test.source + ")|(" + self2.re.host_fuzzy_test.source + ")|@",
        "i"
      );
      resetScanCache(self2);
    }
    function Match(self2, shift) {
      var start = self2.__index__, end = self2.__last_index__, text2 = self2.__text_cache__.slice(start, end);
      this.schema = self2.__schema__.toLowerCase();
      this.index = start + shift;
      this.lastIndex = end + shift;
      this.raw = text2;
      this.text = text2;
      this.url = text2;
    }
    function createMatch(self2, shift) {
      var match = new Match(self2, shift);
      self2.__compiled__[match.schema].normalize(match, self2);
      return match;
    }
    function LinkifyIt(schemas, options) {
      if (!(this instanceof LinkifyIt)) {
        return new LinkifyIt(schemas, options);
      }
      if (!options) {
        if (isOptionsObj(schemas)) {
          options = schemas;
          schemas = {};
        }
      }
      this.__opts__ = assign({}, defaultOptions, options);
      this.__index__ = -1;
      this.__last_index__ = -1;
      this.__schema__ = "";
      this.__text_cache__ = "";
      this.__schemas__ = assign({}, defaultSchemas, schemas);
      this.__compiled__ = {};
      this.__tlds__ = tlds_default;
      this.__tlds_replaced__ = false;
      this.re = {};
      compile(this);
    }
    LinkifyIt.prototype.add = function add(schema, definition) {
      this.__schemas__[schema] = definition;
      compile(this);
      return this;
    };
    LinkifyIt.prototype.set = function set(options) {
      this.__opts__ = assign(this.__opts__, options);
      return this;
    };
    LinkifyIt.prototype.test = function test(text2) {
      this.__text_cache__ = text2;
      this.__index__ = -1;
      if (!text2.length) {
        return false;
      }
      var m, ml, me, len, shift, next, re2, tld_pos, at_pos;
      if (this.re.schema_test.test(text2)) {
        re2 = this.re.schema_search;
        re2.lastIndex = 0;
        while ((m = re2.exec(text2)) !== null) {
          len = this.testSchemaAt(text2, m[2], re2.lastIndex);
          if (len) {
            this.__schema__ = m[2];
            this.__index__ = m.index + m[1].length;
            this.__last_index__ = m.index + m[0].length + len;
            break;
          }
        }
      }
      if (this.__opts__.fuzzyLink && this.__compiled__["http:"]) {
        tld_pos = text2.search(this.re.host_fuzzy_test);
        if (tld_pos >= 0) {
          if (this.__index__ < 0 || tld_pos < this.__index__) {
            if ((ml = text2.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null) {
              shift = ml.index + ml[1].length;
              if (this.__index__ < 0 || shift < this.__index__) {
                this.__schema__ = "";
                this.__index__ = shift;
                this.__last_index__ = ml.index + ml[0].length;
              }
            }
          }
        }
      }
      if (this.__opts__.fuzzyEmail && this.__compiled__["mailto:"]) {
        at_pos = text2.indexOf("@");
        if (at_pos >= 0) {
          if ((me = text2.match(this.re.email_fuzzy)) !== null) {
            shift = me.index + me[1].length;
            next = me.index + me[0].length;
            if (this.__index__ < 0 || shift < this.__index__ || shift === this.__index__ && next > this.__last_index__) {
              this.__schema__ = "mailto:";
              this.__index__ = shift;
              this.__last_index__ = next;
            }
          }
        }
      }
      return this.__index__ >= 0;
    };
    LinkifyIt.prototype.pretest = function pretest(text2) {
      return this.re.pretest.test(text2);
    };
    LinkifyIt.prototype.testSchemaAt = function testSchemaAt(text2, schema, pos) {
      if (!this.__compiled__[schema.toLowerCase()]) {
        return 0;
      }
      return this.__compiled__[schema.toLowerCase()].validate(text2, pos, this);
    };
    LinkifyIt.prototype.match = function match(text2) {
      var shift = 0, result = [];
      if (this.__index__ >= 0 && this.__text_cache__ === text2) {
        result.push(createMatch(this, shift));
        shift = this.__last_index__;
      }
      var tail = shift ? text2.slice(shift) : text2;
      while (this.test(tail)) {
        result.push(createMatch(this, shift));
        tail = tail.slice(this.__last_index__);
        shift += this.__last_index__;
      }
      if (result.length) {
        return result;
      }
      return null;
    };
    LinkifyIt.prototype.tlds = function tlds(list2, keepOld) {
      list2 = Array.isArray(list2) ? list2 : [list2];
      if (!keepOld) {
        this.__tlds__ = list2.slice();
        this.__tlds_replaced__ = true;
        compile(this);
        return this;
      }
      this.__tlds__ = this.__tlds__.concat(list2).sort().filter(function(el2, idx, arr) {
        return el2 !== arr[idx - 1];
      }).reverse();
      compile(this);
      return this;
    };
    LinkifyIt.prototype.normalize = function normalize2(match) {
      if (!match.schema) {
        match.url = "http://" + match.url;
      }
      if (match.schema === "mailto:" && !/^mailto:/i.test(match.url)) {
        match.url = "mailto:" + match.url;
      }
    };
    LinkifyIt.prototype.onCompile = function onCompile() {
    };
    linkifyIt = LinkifyIt;
    return linkifyIt;
  }
  const __viteBrowserExternal = {};
  const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: __viteBrowserExternal
  }, Symbol.toStringTag, { value: "Module" }));
  const require$$8 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
  var _default;
  var hasRequired_default;
  function require_default() {
    if (hasRequired_default) return _default;
    hasRequired_default = 1;
    _default = {
      options: {
        html: false,
        // Enable HTML tags in source
        xhtmlOut: false,
        // Use '/' to close single tags (<br />)
        breaks: false,
        // Convert '\n' in paragraphs into <br>
        langPrefix: "language-",
        // CSS language prefix for fenced blocks
        linkify: false,
        // autoconvert URL-like texts to links
        // Enable some language-neutral replacements + quotes beautification
        typographer: false,
        // Double + single quotes replacement pairs, when typographer enabled,
        // and smartquotes on. Could be either a String or an Array.
        //
        // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
        // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
        quotes: "“”‘’",
        /* “”‘’ */
        // Highlighter function. Should return escaped HTML,
        // or '' if the source string is not changed and should be escaped externaly.
        // If result starts with <pre... internal wrapper is skipped.
        //
        // function (/*str, lang*/) { return ''; }
        //
        highlight: null,
        maxNesting: 100
        // Internal protection, recursion limit
      },
      components: {
        core: {},
        block: {},
        inline: {}
      }
    };
    return _default;
  }
  var zero;
  var hasRequiredZero;
  function requireZero() {
    if (hasRequiredZero) return zero;
    hasRequiredZero = 1;
    zero = {
      options: {
        html: false,
        // Enable HTML tags in source
        xhtmlOut: false,
        // Use '/' to close single tags (<br />)
        breaks: false,
        // Convert '\n' in paragraphs into <br>
        langPrefix: "language-",
        // CSS language prefix for fenced blocks
        linkify: false,
        // autoconvert URL-like texts to links
        // Enable some language-neutral replacements + quotes beautification
        typographer: false,
        // Double + single quotes replacement pairs, when typographer enabled,
        // and smartquotes on. Could be either a String or an Array.
        //
        // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
        // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
        quotes: "“”‘’",
        /* “”‘’ */
        // Highlighter function. Should return escaped HTML,
        // or '' if the source string is not changed and should be escaped externaly.
        // If result starts with <pre... internal wrapper is skipped.
        //
        // function (/*str, lang*/) { return ''; }
        //
        highlight: null,
        maxNesting: 20
        // Internal protection, recursion limit
      },
      components: {
        core: {
          rules: [
            "normalize",
            "block",
            "inline"
          ]
        },
        block: {
          rules: [
            "paragraph"
          ]
        },
        inline: {
          rules: [
            "text"
          ],
          rules2: [
            "balance_pairs",
            "text_collapse"
          ]
        }
      }
    };
    return zero;
  }
  var commonmark;
  var hasRequiredCommonmark;
  function requireCommonmark() {
    if (hasRequiredCommonmark) return commonmark;
    hasRequiredCommonmark = 1;
    commonmark = {
      options: {
        html: true,
        // Enable HTML tags in source
        xhtmlOut: true,
        // Use '/' to close single tags (<br />)
        breaks: false,
        // Convert '\n' in paragraphs into <br>
        langPrefix: "language-",
        // CSS language prefix for fenced blocks
        linkify: false,
        // autoconvert URL-like texts to links
        // Enable some language-neutral replacements + quotes beautification
        typographer: false,
        // Double + single quotes replacement pairs, when typographer enabled,
        // and smartquotes on. Could be either a String or an Array.
        //
        // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
        // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
        quotes: "“”‘’",
        /* “”‘’ */
        // Highlighter function. Should return escaped HTML,
        // or '' if the source string is not changed and should be escaped externaly.
        // If result starts with <pre... internal wrapper is skipped.
        //
        // function (/*str, lang*/) { return ''; }
        //
        highlight: null,
        maxNesting: 20
        // Internal protection, recursion limit
      },
      components: {
        core: {
          rules: [
            "normalize",
            "block",
            "inline"
          ]
        },
        block: {
          rules: [
            "blockquote",
            "code",
            "fence",
            "heading",
            "hr",
            "html_block",
            "lheading",
            "list",
            "reference",
            "paragraph"
          ]
        },
        inline: {
          rules: [
            "autolink",
            "backticks",
            "emphasis",
            "entity",
            "escape",
            "html_inline",
            "image",
            "link",
            "newline",
            "text"
          ],
          rules2: [
            "balance_pairs",
            "emphasis",
            "text_collapse"
          ]
        }
      }
    };
    return commonmark;
  }
  var lib;
  var hasRequiredLib;
  function requireLib() {
    if (hasRequiredLib) return lib;
    hasRequiredLib = 1;
    var utils2 = requireUtils();
    var helpers2 = requireHelpers();
    var Renderer = requireRenderer();
    var ParserCore = requireParser_core();
    var ParserBlock = requireParser_block();
    var ParserInline = requireParser_inline();
    var LinkifyIt = requireLinkifyIt();
    var mdurl2 = requireMdurl();
    var punycode = require$$8;
    var config2 = {
      "default": require_default(),
      zero: requireZero(),
      commonmark: requireCommonmark()
    };
    var BAD_PROTO_RE = /^(vbscript|javascript|file|data):/;
    var GOOD_DATA_RE = /^data:image\/(gif|png|jpeg|webp);/;
    function validateLink(url) {
      var str = url.trim().toLowerCase();
      return BAD_PROTO_RE.test(str) ? GOOD_DATA_RE.test(str) ? true : false : true;
    }
    var RECODE_HOSTNAME_FOR = ["http:", "https:", "mailto:"];
    function normalizeLink(url) {
      var parsed = mdurl2.parse(url, true);
      if (parsed.hostname) {
        if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
          try {
            parsed.hostname = punycode.toASCII(parsed.hostname);
          } catch (er) {
          }
        }
      }
      return mdurl2.encode(mdurl2.format(parsed));
    }
    function normalizeLinkText(url) {
      var parsed = mdurl2.parse(url, true);
      if (parsed.hostname) {
        if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
          try {
            parsed.hostname = punycode.toUnicode(parsed.hostname);
          } catch (er) {
          }
        }
      }
      return mdurl2.decode(mdurl2.format(parsed));
    }
    function MarkdownIt2(presetName, options) {
      if (!(this instanceof MarkdownIt2)) {
        return new MarkdownIt2(presetName, options);
      }
      if (!options) {
        if (!utils2.isString(presetName)) {
          options = presetName || {};
          presetName = "default";
        }
      }
      this.inline = new ParserInline();
      this.block = new ParserBlock();
      this.core = new ParserCore();
      this.renderer = new Renderer();
      this.linkify = new LinkifyIt();
      this.validateLink = validateLink;
      this.normalizeLink = normalizeLink;
      this.normalizeLinkText = normalizeLinkText;
      this.utils = utils2;
      this.helpers = utils2.assign({}, helpers2);
      this.options = {};
      this.configure(presetName);
      if (options) {
        this.set(options);
      }
    }
    MarkdownIt2.prototype.set = function(options) {
      utils2.assign(this.options, options);
      return this;
    };
    MarkdownIt2.prototype.configure = function(presets) {
      var self2 = this, presetName;
      if (utils2.isString(presets)) {
        presetName = presets;
        presets = config2[presetName];
        if (!presets) {
          throw new Error('Wrong `markdown-it` preset "' + presetName + '", check name');
        }
      }
      if (!presets) {
        throw new Error("Wrong `markdown-it` preset, can't be empty");
      }
      if (presets.options) {
        self2.set(presets.options);
      }
      if (presets.components) {
        Object.keys(presets.components).forEach(function(name) {
          if (presets.components[name].rules) {
            self2[name].ruler.enableOnly(presets.components[name].rules);
          }
          if (presets.components[name].rules2) {
            self2[name].ruler2.enableOnly(presets.components[name].rules2);
          }
        });
      }
      return this;
    };
    MarkdownIt2.prototype.enable = function(list2, ignoreInvalid) {
      var result = [];
      if (!Array.isArray(list2)) {
        list2 = [list2];
      }
      ["core", "block", "inline"].forEach(function(chain) {
        result = result.concat(this[chain].ruler.enable(list2, true));
      }, this);
      result = result.concat(this.inline.ruler2.enable(list2, true));
      var missed = list2.filter(function(name) {
        return result.indexOf(name) < 0;
      });
      if (missed.length && !ignoreInvalid) {
        throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + missed);
      }
      return this;
    };
    MarkdownIt2.prototype.disable = function(list2, ignoreInvalid) {
      var result = [];
      if (!Array.isArray(list2)) {
        list2 = [list2];
      }
      ["core", "block", "inline"].forEach(function(chain) {
        result = result.concat(this[chain].ruler.disable(list2, true));
      }, this);
      result = result.concat(this.inline.ruler2.disable(list2, true));
      var missed = list2.filter(function(name) {
        return result.indexOf(name) < 0;
      });
      if (missed.length && !ignoreInvalid) {
        throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + missed);
      }
      return this;
    };
    MarkdownIt2.prototype.use = function(plugin) {
      var args = [this].concat(Array.prototype.slice.call(arguments, 1));
      plugin.apply(plugin, args);
      return this;
    };
    MarkdownIt2.prototype.parse = function(src, env) {
      if (typeof src !== "string") {
        throw new Error("Input data should be a String");
      }
      var state = new this.core.State(src, this, env);
      this.core.process(state);
      return state.tokens;
    };
    MarkdownIt2.prototype.render = function(src, env) {
      env = env || {};
      return this.renderer.render(this.parse(src, env), this.options, env);
    };
    MarkdownIt2.prototype.parseInline = function(src, env) {
      var state = new this.core.State(src, this, env);
      state.inlineMode = true;
      this.core.process(state);
      return state.tokens;
    };
    MarkdownIt2.prototype.renderInline = function(src, env) {
      env = env || {};
      return this.renderer.render(this.parseInline(src, env), this.options, env);
    };
    lib = MarkdownIt2;
    return lib;
  }
  var markdownIt;
  var hasRequiredMarkdownIt;
  function requireMarkdownIt() {
    if (hasRequiredMarkdownIt) return markdownIt;
    hasRequiredMarkdownIt = 1;
    markdownIt = requireLib();
    return markdownIt;
  }
  var markdownItExports = requireMarkdownIt();
  const MarkdownIt = /* @__PURE__ */ getDefaultExportFromCjs(markdownItExports);
  class MdRenderer {
    constructor() {
      this.md = new MarkdownIt();
      let defaultRender = this.md.renderer.rules.link_open || function(tokens, idx, options, env, self2) {
        return self2.renderToken(tokens, idx, options);
      };
      this.md.renderer.rules.link_open = (tokens, idx, options, env, self2) => {
        var aIndex = tokens[idx].attrIndex("target");
        if (aIndex < 0) {
          tokens[idx].attrPush(["target", "_blank"]);
        } else {
          tokens[idx].attrs[aIndex][1] = "_blank";
        }
        return defaultRender(tokens, idx, options, env, self2);
      };
    }
    render(text2) {
      return this.md.render(text2);
    }
  }
  let instance$1 = new MdRenderer();
  const _hoisted_1$j = ["innerHTML"];
  const _hoisted_2$c = { class: "operation-bar" };
  const _sfc_main$p = /* @__PURE__ */ defineComponent({
    __name: "SimpleDialog",
    props: {
      active: { type: Boolean },
      title: {},
      isCompulsive: { type: Boolean, default: false },
      mdText: {},
      operations: {}
    },
    emits: ["close"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit2 = __emit;
      const modal = /* @__PURE__ */ ref(null);
      const actualOperations = computed(() => {
        if (props.operations != void 0 && props.operations.length > 0) {
          return props.operations;
        }
        return [{
          name: "CONFIRM",
          btnType: "plain",
          isCloseModal: true
        }];
      });
      function onClickBackground() {
        if (!props.isCompulsive) {
          emit2("close");
        }
      }
      function onClick(operation) {
        if (operation.onClick) {
          operation.onClick();
        }
        if (operation.isCloseModal) {
          emit2("close");
        }
      }
      function enter(e) {
        if (e.key === "Enter" && actualOperations.value.length === 1) {
          let modals = document.querySelectorAll(".simple-modal");
          if (modals.length <= 1 || modals[modals.length - 1] === modal.value) {
            onClick(actualOperations.value[0]);
          }
        }
        e.stopPropagation();
        return true;
      }
      watch(() => props.active, (newVal) => {
        if (newVal) {
          setTimeout(() => {
            document.addEventListener("keydown", enter);
          }, 200);
        } else {
          document.removeEventListener("keydown", enter);
        }
      });
      return (_ctx, _cache) => {
        return openBlock(), createBlock(Teleport, { to: "#ehunter-app" }, [
          createVNode(Transition, {
            name: "slow-opacity-fade",
            appear: ""
          }, {
            default: withCtx(() => [
              __props.active ? (openBlock(), createElementBlock("div", {
                key: 0,
                ref_key: "modal",
                ref: modal,
                class: "simple-modal"
              }, [
                createBaseVNode("div", {
                  class: "simple-dialog",
                  onClick: _cache[0] || (_cache[0] = withModifiers(() => {
                  }, ["stop"])),
                  onWheel: _cache[1] || (_cache[1] = withModifiers(() => {
                  }, ["stop"]))
                }, [
                  createBaseVNode("div", {
                    class: "background",
                    onClick: onClickBackground
                  }),
                  createBaseVNode("article", null, [
                    createBaseVNode("h4", null, toDisplayString(__props.title), 1),
                    __props.mdText != void 0 ? (openBlock(), createElementBlock("p", {
                      key: 0,
                      class: "markdown",
                      innerHTML: unref(instance$1).render(__props.mdText)
                    }, null, 8, _hoisted_1$j)) : createCommentVNode("", true),
                    createBaseVNode("div", _hoisted_2$c, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(actualOperations.value, (operation) => {
                        return openBlock(), createBlock(FlatButton, {
                          class: "operation",
                          key: operation.name,
                          label: operation.name,
                          type: operation.btnType,
                          mode: "inline",
                          onClick: ($event) => onClick(operation)
                        }, null, 8, ["label", "type", "onClick"]);
                      }), 128))
                    ])
                  ])
                ], 32)
              ], 512)) : createCommentVNode("", true)
            ]),
            _: 1
          })
        ]);
      };
    }
  });
  const SimpleDialog = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-ea2849fc"]]);
  const _sfc_main$o = /* @__PURE__ */ defineComponent({
    __name: "PopSlider",
    props: {
      active: { type: Boolean },
      min: {},
      max: {},
      step: { default: 1 },
      init: {},
      isFloat: { type: Boolean, default: false }
    },
    emits: ["close", "change"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit2 = __emit;
      const value = /* @__PURE__ */ ref(props.init);
      const inputElem = /* @__PURE__ */ ref(null);
      const showErrDialog = /* @__PURE__ */ ref(false);
      const errText = computed(() => {
        return i18n.value.numberInputTip.replace("{{min}}", props.min).replace("{{max}}", props.max);
      });
      watch(() => props.init, (newVal) => {
        value.value = newVal;
      });
      function handleClick() {
        handleInput();
        emit2("close");
      }
      function emitChange(val) {
        emit2("change", val);
      }
      function handleInput() {
        inputElem.value.blur();
        if (!props.isFloat) {
          value.value = Math.floor(value.value);
        }
        if (value.value < props.min || value.value > props.max) {
          value.value = props.init;
          showErrDialog.value = true;
        } else {
          emitChange(value.value);
        }
      }
      function watchKeyboard(e) {
        if (e.key === "Enter") {
          handleInput();
        }
      }
      function stopArrowEvent(e) {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          e.stopPropagation();
        }
      }
      return (_ctx, _cache) => {
        return openBlock(), createBlock(Popover, {
          class: "PopSlider",
          active: __props.active,
          "custom-style": { maxWidth: "min(92vw, 360px)" },
          onClose: _cache[2] || (_cache[2] = ($event) => emit2("close"))
        }, {
          default: withCtx(() => [
            createBaseVNode("div", {
              class: "content",
              onKeydown: stopArrowEvent
            }, [
              withDirectives(createBaseVNode("input", {
                ref_key: "inputElem",
                ref: inputElem,
                class: "value",
                type: "number",
                onKeydown: watchKeyboard,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => value.value = $event)
              }, null, 544), [
                [vModelText, value.value]
              ]),
              createVNode(Slider, {
                class: "slider",
                min: __props.min,
                max: __props.max,
                step: __props.step,
                init: __props.init,
                onChange: emitChange
              }, null, 8, ["min", "max", "step", "init"]),
              createVNode(FlatButton, {
                class: "button",
                label: unref(i18n).confirm,
                type: "positive",
                onClick: handleClick
              }, null, 8, ["label"])
            ], 32),
            createVNode(SimpleDialog, {
              title: unref(i18n).tips,
              active: showErrDialog.value,
              "md-text": errText.value,
              onClose: _cache[1] || (_cache[1] = () => showErrDialog.value = false)
            }, null, 8, ["title", "active", "md-text"])
          ]),
          _: 1
        }, 8, ["active"]);
      };
    }
  });
  const PopSlider = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-ffc66e8a"]]);
  const _hoisted_1$i = { class: "num-drop-option" };
  const _sfc_main$n = /* @__PURE__ */ defineComponent({
    __name: "NumDropOption",
    props: {
      min: {},
      max: {},
      curVal: {},
      quickOptions: {},
      formatFn: {},
      suffix: {},
      isFloat: { type: Boolean, default: false }
    },
    emits: ["change"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      function formatName(val) {
        let name = String(val);
        if (props.suffix) {
          return name += props.suffix;
        }
        if (props.formatFn) {
          return props.formatFn(val);
        }
        return name;
      }
      const dropOptions = computed(() => {
        let arr = props.quickOptions.map((i2) => ({
          name: formatName(i2),
          val: i2
        }));
        arr.push({
          i18nKey: "custom",
          val: -1
        });
        return arr;
      });
      const emit2 = __emit;
      const popSliderActive = /* @__PURE__ */ ref(false);
      function onDropOptionChange(val, index) {
        if (index == props.quickOptions.length) {
          popSliderActive.value = true;
        } else {
          emit2("change", props.quickOptions[index]);
        }
      }
      function onPopSliderChange(val) {
        emit2("change", val);
      }
      function onClosePopSlider() {
        popSliderActive.value = false;
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1$i, [
          createVNode(DropOption, {
            list: dropOptions.value,
            "has-custom-option": true,
            "cur-val": formatName(props.curVal),
            onChange: onDropOptionChange,
            "format-fn": props.formatFn
          }, null, 8, ["list", "cur-val", "format-fn"]),
          createVNode(PopSlider, {
            active: popSliderActive.value,
            init: props.curVal,
            "is-float": props.isFloat,
            max: props.max,
            min: props.min,
            step: 1,
            onChange: onPopSliderChange,
            onClose: onClosePopSlider
          }, null, 8, ["active", "init", "is-float", "max", "min"])
        ]);
      };
    }
  });
  const NumDropOption = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-c7457182"]]);
  const _sfc_main$m = /* @__PURE__ */ defineComponent({
    __name: "SimpleSwitch",
    props: {
      active: { type: Boolean }
    },
    emits: ["change"],
    setup(__props, { emit: __emit }) {
      const emit2 = __emit;
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", {
          class: "switch",
          onClick: _cache[0] || (_cache[0] = ($event) => emit2("change", !__props.active))
        }, [
          createBaseVNode("div", {
            class: normalizeClass({ "track": true, active: __props.active })
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass({ "thumb": true, active: __props.active })
          }, null, 2)
        ]);
      };
    }
  });
  const SimpleSwitch = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-7622434e"]]);
  const _hoisted_1$h = { class: "options no-select" };
  const _sfc_main$l = /* @__PURE__ */ defineComponent({
    __name: "MoreMenuPopover",
    props: {
      active: Boolean
    },
    emits: ["close", "more-settings", "quick-preview", "download"],
    setup(__props, { emit: __emit }) {
      const emit2 = __emit;
      function handleMoreSettings() {
        emit2("more-settings");
        emit2("close");
      }
      function handleQuickPreview() {
        emit2("quick-preview");
        emit2("close");
      }
      function handleDownload() {
        emit2("download");
        emit2("close");
      }
      return (_ctx, _cache) => {
        return openBlock(), createBlock(Popover, {
          active: __props.active,
          "custom-style": { "margin-left": "7px", "margin-top": "4px" },
          onClose: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close"))
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_1$h, [
              createBaseVNode("div", {
                class: "item",
                onClick: handleMoreSettings
              }, [
                createBaseVNode("span", null, toDisplayString(unref(i18n).moreSettings), 1)
              ]),
              createBaseVNode("div", {
                class: "item",
                onClick: handleQuickPreview
              }, [
                createBaseVNode("span", null, toDisplayString(unref(i18n).quickPreview), 1)
              ]),
              createBaseVNode("div", {
                class: "item",
                onClick: handleDownload
              }, [
                createBaseVNode("span", null, toDisplayString(unref(i18n).download), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["active"]);
      };
    }
  });
  const MoreMenuPopover = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-f51bd597"]]);
  function getFieldValue(id) {
    switch (id) {
      case "readingMode":
        return store.readingMode;
      case "widthScale":
        return store.widthScale;
      case "loadNum":
        return store.loadNum;
      case "downloadChunkSize":
        return store.downloadChunkSize;
      case "volumeSize":
        return store.volumeSize;
      case "showThumbView":
        return store.showThumbView;
      case "scrollPageMargin":
        return store.scrollPageMargin;
      case "pagesPerScreen":
        return store.pagesPerScreen;
      case "bookDirection":
        return store.bookDirection;
      case "pageTurnAnimationMode":
        return store.pageTurnAnimationMode;
      case "animationSpeed":
        return store.animationSpeed;
      case "showBookPagination":
        return store.showBookPagination;
      case "isChangeOddEven":
        return store.isChangeOddEven;
      case "isReverseFlip":
        return store.isReverseFlip;
      case "isAutoFlip":
        return store.isAutoFlip;
      case "autoFlipFrequency":
        return store.autoFlipFrequency;
      case "showBookThumbView":
        return store.showBookThumbView;
      case "IsReverseBookWheeFliplDirection":
        return store.IsReverseBookWheeFliplDirection;
      case "wheelSensitivity":
        return store.wheelSensitivity;
      case "magnifierZoom":
        return store.magnifierZoom;
      case "magnifierAreaSize":
        return store.magnifierAreaSize;
      case "lang":
        return i18n.value.lang;
      case "autoRetryByOtherSource":
        return store.autoRetryByOtherSource;
      default:
        return null;
    }
  }
  function setFieldValue(id, val) {
    switch (id) {
      case "readingMode":
        storeAction.setReadingMode(val);
        break;
      case "widthScale":
        storeAction.setWidthScale(val);
        break;
      case "loadNum":
        storeAction.setLoadNum(val);
        break;
      case "downloadChunkSize":
        storeAction.setDownloadChunkSize(val);
        break;
      case "volumeSize":
        storeAction.setVolumeSize(val);
        break;
      case "showThumbView":
        if (store.showThumbView !== val) storeAction.toggleShowThumbView();
        break;
      case "scrollPageMargin":
        storeAction.setScrollPageMargin(val);
        break;
      case "pagesPerScreen":
        storeAction.setPagesPerScreen(val);
        break;
      case "bookDirection":
        storeAction.setBookDirection(val);
        break;
      case "pageTurnAnimationMode":
        storeAction.setPageTurnAnimationMode(val);
        break;
      case "animationSpeed":
        storeAction.setAnimationSpeed(val);
        break;
      case "showBookPagination":
        if (store.showBookPagination !== val) storeAction.toggleShowBookPagination();
        break;
      case "isChangeOddEven":
        if (store.isChangeOddEven !== val) storeAction.toggleIsChangeOddEven();
        break;
      case "isReverseFlip":
        if (store.isReverseFlip !== val) storeAction.toggleIsReverseFlip();
        break;
      case "isAutoFlip":
        if (store.isAutoFlip !== val) storeAction.toggleIsAutoFlip();
        break;
      case "autoFlipFrequency":
        storeAction.setAutoFlipFrequency(val);
        break;
      case "showBookThumbView":
        if (store.showBookThumbView !== val) storeAction.toggleShowBookThumbView();
        break;
      case "IsReverseBookWheeFliplDirection":
        if (store.IsReverseBookWheeFliplDirection !== val) storeAction.toggleIsReverseBookWheeFliplDirection();
        break;
      case "wheelSensitivity":
        storeAction.setWheelSensitivity(val);
        break;
      case "magnifierZoom":
        storeAction.setMagnifierZoom(val);
        break;
      case "magnifierAreaSize":
        storeAction.setMagnifierAreaSize(val);
        break;
      case "lang":
        storeAction.setLang(val);
        break;
      case "autoRetryByOtherSource":
        storeAction.setAutoRetryByOtherSource(val);
        break;
    }
  }
  function getDropList(id) {
    const field = settingFieldMap[id];
    if (!field || !field.dropKey) {
      return [];
    }
    const conf = settingConf[field.dropKey];
    if (Array.isArray(conf)) {
      return conf;
    }
    return (conf == null ? void 0 : conf.list) || [];
  }
  function getNumList(id) {
    const field = settingFieldMap[id];
    if (!field || !field.numKey) {
      return [];
    }
    return settingConf[field.numKey].list;
  }
  function getNumSuffix(id) {
    const field = settingFieldMap[id];
    if (!field || !field.numKey) {
      return "";
    }
    return settingConf[field.numKey].suffix || "";
  }
  function getDialogFieldIds(category) {
    return dialogSettingFieldIds[category];
  }
  const _hoisted_1$g = { class: "ehunter-panel-header" };
  const _hoisted_2$b = ["aria-label"];
  const _hoisted_3$9 = { class: "ehunter-panel-body" };
  const _hoisted_4$6 = { class: "ehunter-left-nav" };
  const _hoisted_5$4 = ["onClick"];
  const _hoisted_6$2 = { class: "ehunter-label-block" };
  const _hoisted_7$2 = { class: "ehunter-label" };
  const _hoisted_8$2 = {
    key: 0,
    class: "ehunter-tip"
  };
  const _hoisted_9$2 = { class: "ehunter-label-block" };
  const _hoisted_10$1 = { class: "ehunter-label" };
  const _hoisted_11$1 = {
    key: 0,
    class: "ehunter-tip"
  };
  const _hoisted_12$1 = { class: "ehunter-label-block" };
  const _hoisted_13$1 = { class: "ehunter-label" };
  const _hoisted_14$1 = {
    key: 0,
    class: "ehunter-tip"
  };
  const _hoisted_15$1 = { class: "ehunter-quick-lanes" };
  const _hoisted_16$1 = { class: "ehunter-lane-intro" };
  const _hoisted_17 = { class: "ehunter-lane-header" };
  const _hoisted_18 = { class: "ehunter-lane-desc" };
  const _hoisted_19 = ["data-id", "onDragstart", "onDrop"];
  const _hoisted_20 = { class: "ehunter-label" };
  const _hoisted_21 = {
    key: 0,
    class: "ehunter-mode-tag"
  };
  const _hoisted_22 = { class: "ehunter-lane-header" };
  const _hoisted_23 = { class: "ehunter-lane-desc" };
  const _hoisted_24 = ["data-id", "onDragstart", "onDrop"];
  const _hoisted_25 = { class: "ehunter-label" };
  const _hoisted_26 = {
    key: 0,
    class: "ehunter-mode-tag"
  };
  const _hoisted_27 = { class: "ehunter-shortcut-intro" };
  const _hoisted_28 = { class: "ehunter-label-block" };
  const _hoisted_29 = { class: "ehunter-label" };
  const _hoisted_30 = {
    key: 0,
    class: "ehunter-tip"
  };
  const _hoisted_31 = { class: "ehunter-shortcut-editor" };
  const _hoisted_32 = ["onClick"];
  const _hoisted_33 = { class: "ehunter-chip-key" };
  const _hoisted_34 = { class: "ehunter-shortcut-add" };
  const _hoisted_35 = ["onClick"];
  const _hoisted_36 = ["onChange"];
  const _hoisted_37 = {
    value: "",
    disabled: "",
    selected: ""
  };
  const _hoisted_38 = ["value"];
  const _hoisted_39 = { class: "ehunter-row" };
  const _hoisted_40 = { class: "ehunter-label" };
  const _hoisted_41 = { class: "ehunter-row" };
  const _hoisted_42 = { class: "ehunter-label" };
  const _hoisted_43 = { class: "ehunter-value" };
  const _hoisted_44 = { class: "ehunter-row" };
  const _hoisted_45 = { class: "ehunter-label" };
  const _hoisted_46 = { class: "ehunter-row" };
  const _hoisted_47 = { class: "ehunter-label" };
  const pinnedQuickSettingId = "readingMode";
  const _sfc_main$k = /* @__PURE__ */ defineComponent({
    __name: "MoreSettingsDialog",
    setup(__props) {
      const contentRef = /* @__PURE__ */ ref(null);
      const generalRef = /* @__PURE__ */ ref(null);
      const scrollRef = /* @__PURE__ */ ref(null);
      const bookRef = /* @__PURE__ */ ref(null);
      const quickRef = /* @__PURE__ */ ref(null);
      const shortcutsRef = /* @__PURE__ */ ref(null);
      const otherRef = /* @__PURE__ */ ref(null);
      const dragSourceId = /* @__PURE__ */ ref("");
      const openedShortcutDropdown = /* @__PURE__ */ ref("");
      const versionText = computed(() => pkgJson.version);
      function handleContentDragOver(e) {
        if (dragSourceId.value) {
          e.preventDefault();
        }
      }
      const quickSettingOrderList = computed(() => {
        return store.quickSettingOrder.map((id) => quickSettingOptions.find((item) => item.id === id)).filter((item) => !!item);
      });
      const quickSettingManageList = computed(() => {
        return quickSettingOrderList.value.filter((item) => !item.fixed);
      });
      const enabledQuickSettingList = computed(() => {
        return quickSettingManageList.value.filter((item) => storeAction.isQuickSettingSelected(item.id));
      });
      const hiddenQuickSettingList = computed(() => {
        return quickSettingManageList.value.filter((item) => !storeAction.isQuickSettingSelected(item.id));
      });
      const dialogGeneralFieldIds = getDialogFieldIds("general");
      const dialogScrollFieldIds = getDialogFieldIds("scroll");
      const dialogBookFieldIds = getDialogFieldIds("book");
      const resetOperations = computed(() => {
        return [
          {
            name: i18n.value.cancel,
            btnType: "plain",
            isCloseModal: true,
            onClick: () => storeAction.hideFactoryResetDialog()
          },
          {
            name: i18n.value.confirm,
            btnType: "positive",
            isCloseModal: true,
            onClick: () => storeAction.runFactoryReset()
          }
        ];
      });
      function modeScopeText(scope) {
        if (scope === "scroll-only") {
          return i18n.value.scrollMode;
        }
        if (scope === "book-only") {
          return i18n.value.bookMode;
        }
        return "";
      }
      function quickItemLabel(id, i18nKey) {
        if (id === "lang") {
          return i18n.value.languageSetting;
        }
        return i18n.value[i18nKey];
      }
      function fieldLabel(id) {
        const field = settingFieldMap[id];
        if (!field) {
          return id;
        }
        return i18n.value[field.labelI18nKey];
      }
      function fieldTip(id) {
        const field = settingFieldMap[id];
        if (!field || !field.tipI18nKey) {
          return "";
        }
        const tip = i18n.value[field.tipI18nKey] || "";
        const label = i18n.value[field.labelI18nKey] || "";
        if (!tip || tip === label) {
          return "";
        }
        return tip;
      }
      function onFieldChange(id, val) {
        setFieldValue(id, val);
      }
      function getCategoryRef(category) {
        switch (category) {
          case "general":
            return generalRef.value;
          case "scroll":
            return scrollRef.value;
          case "book":
            return bookRef.value;
          case "quick":
            return quickRef.value;
          case "shortcuts":
            return shortcutsRef.value;
          case "other":
            return otherRef.value;
          default:
            return null;
        }
      }
      function scrollToCategory(category) {
        storeAction.setActiveSettingsCategory(category);
        const target2 = getCategoryRef(category);
        if (!target2 || !contentRef.value) {
          return;
        }
        const containerRect = contentRef.value.getBoundingClientRect();
        const targetRect = target2.getBoundingClientRect();
        const nextTop = contentRef.value.scrollTop + (targetRect.top - containerRect.top);
        contentRef.value.scrollTo({
          top: Math.max(0, nextTop),
          behavior: "smooth"
        });
      }
      function onContentScroll() {
        if (!contentRef.value) {
          return;
        }
        const top2 = contentRef.value.scrollTop;
        const mapping = [
          { id: "general", elem: generalRef.value },
          { id: "scroll", elem: scrollRef.value },
          { id: "book", elem: bookRef.value },
          { id: "quick", elem: quickRef.value },
          { id: "shortcuts", elem: shortcutsRef.value },
          { id: "other", elem: otherRef.value }
        ];
        let active = "general";
        for (const item of mapping) {
          if (item.elem && top2 + 20 >= item.elem.offsetTop) {
            active = item.id;
          }
        }
        if (active !== store.activeSettingsCategory) {
          storeAction.setActiveSettingsCategory(active);
        }
      }
      function onDragStart(e, id) {
        if (!quickSettingManageList.value.find((item) => item.id === id)) {
          return;
        }
        dragSourceId.value = id;
        if (e.dataTransfer) {
          e.dataTransfer.effectAllowed = "move";
          e.dataTransfer.setData("text/plain", id);
        }
      }
      function onDragEnd() {
        dragSourceId.value = "";
      }
      function moveQuickToTarget(sourceId, targetId) {
        if (sourceId === targetId) {
          return;
        }
        const ids = quickSettingManageList.value.map((item) => item.id);
        const sourceIndex = ids.indexOf(sourceId);
        const target2 = ids.includes(targetId) ? targetId : "";
        if (!target2 || sourceIndex < 0) {
          return;
        }
        const targetIndex = ids.indexOf(target2);
        if (targetIndex < 0) {
          return;
        }
        const insertBeforeTargetIndex = sourceIndex < targetIndex ? targetIndex - 1 : targetIndex;
        storeAction.moveQuickSettingItem(sourceId, insertBeforeTargetIndex);
      }
      function ensureQuickSelection(id, selected) {
        const isSelected = storeAction.isQuickSettingSelected(id);
        if (isSelected !== selected) {
          storeAction.toggleQuickSettingSelection(id);
        }
      }
      function onDropToItem(_, targetId, selected) {
        if (!dragSourceId.value) {
          return;
        }
        if (targetId === pinnedQuickSettingId && dragSourceId.value !== pinnedQuickSettingId) {
          const firstMovable = quickSettingManageList.value.find((item) => storeAction.isQuickSettingSelected(item.id));
          if (firstMovable) {
            targetId = firstMovable.id;
          }
        }
        ensureQuickSelection(dragSourceId.value, selected);
        moveQuickToTarget(dragSourceId.value, targetId);
        dragSourceId.value = "";
      }
      function onDropToLane(_, selected) {
        if (!dragSourceId.value) {
          return;
        }
        ensureQuickSelection(dragSourceId.value, selected);
        const laneList = (selected ? enabledQuickSettingList.value : hiddenQuickSettingList.value).filter((item) => item.id !== pinnedQuickSettingId);
        if (laneList.length > 0) {
          const anchor = laneList[laneList.length - 1];
          if (anchor) {
            moveQuickToTarget(dragSourceId.value, anchor.id);
          }
        } else if (selected) {
          const firstMovable = quickSettingManageList.value.find((item) => storeAction.isQuickSettingSelected(item.id));
          if (firstMovable) {
            moveQuickToTarget(dragSourceId.value, firstMovable.id);
          }
        }
        dragSourceId.value = "";
      }
      function shortcutTip(actionId, tipI18nKey) {
        const tip = tipI18nKey ? i18n.value[tipI18nKey] || "" : "";
        const list2 = shortcutBindingList(actionId);
        if (list2.length > 0) {
          return `${tip ? `${tip} · ` : ""}${i18n.value.currentShortcut}: ${list2.map(shortcutKeyLabel).join(" / ")}`;
        }
        return tip;
      }
      function shortcutKeyLabel(key) {
        const found = shortcutKeyCandidates.find((item) => item.key.toLowerCase() === key.toLowerCase());
        return found ? found.label : key;
      }
      function shortcutBindingList(actionId) {
        const binding = store.shortcutBindings[actionId];
        if (!binding) {
          return [];
        }
        return binding.split(",").map((item) => item.trim()).filter((item) => item.length > 0);
      }
      function availableShortcutCandidates(actionId) {
        const selected = new Set(shortcutBindingList(actionId).map((item) => item.toLowerCase()));
        return shortcutKeyCandidates.map((item) => item.key).filter((item) => !selected.has(item.toLowerCase()));
      }
      function updateShortcutBindingList(actionId, list2) {
        storeAction.setShortcutBinding(actionId, list2.join(","));
      }
      function removeShortcutBinding(actionId, key) {
        const next = shortcutBindingList(actionId).filter((item) => item.toLowerCase() !== key.toLowerCase());
        updateShortcutBindingList(actionId, next);
      }
      function toggleShortcutDropdown(actionId) {
        if (openedShortcutDropdown.value === actionId) {
          openedShortcutDropdown.value = "";
        } else {
          openedShortcutDropdown.value = actionId;
        }
      }
      function onPanelClick(event) {
        if (!openedShortcutDropdown.value) {
          return;
        }
        const target2 = event.target;
        if (target2 && target2.closest(".ehunter-shortcut-add")) {
          return;
        }
        openedShortcutDropdown.value = "";
      }
      function addShortcutBinding(actionId, key) {
        const normalized = key.trim();
        if (!normalized) {
          return;
        }
        const current = shortcutBindingList(actionId);
        if (current.some((item) => item.toLowerCase() === normalized.toLowerCase())) {
          openedShortcutDropdown.value = "";
          return;
        }
        current.push(normalized);
        updateShortcutBindingList(actionId, current);
        openedShortcutDropdown.value = "";
      }
      onMounted(() => {
        onContentScroll();
        if (contentRef.value) {
          contentRef.value.addEventListener("dragover", handleContentDragOver);
        }
      });
      onUnmounted(() => {
        if (contentRef.value) {
          contentRef.value.removeEventListener("dragover", handleContentDragOver);
        }
      });
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(Fragment, null, [
          (openBlock(), createBlock(Teleport, { to: ".ehunter-app" }, [
            createVNode(Transition, {
              name: "slow-opacity-fade",
              appear: ""
            }, {
              default: withCtx(() => [
                unref(store).showMoreSettingsDialog ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "ehunter-more-settings-modal",
                  onClick: _cache[14] || (_cache[14] = withModifiers(
                    //@ts-ignore
                    (...args) => unref(storeAction).closeMoreSettingsDialog && unref(storeAction).closeMoreSettingsDialog(...args),
                    ["self"]
                  ))
                }, [
                  createBaseVNode("div", {
                    class: "ehunter-panel",
                    onClick: withModifiers(onPanelClick, ["stop"])
                  }, [
                    createBaseVNode("header", _hoisted_1$g, [
                      createBaseVNode("h3", null, toDisplayString(unref(i18n).openMoreSettingsModal), 1),
                      createBaseVNode("button", {
                        class: "ehunter-close-btn",
                        type: "button",
                        "aria-label": unref(i18n).cancel,
                        onClick: _cache[0] || (_cache[0] = //@ts-ignore
                        (...args) => unref(storeAction).closeMoreSettingsDialog && unref(storeAction).closeMoreSettingsDialog(...args))
                      }, "×", 8, _hoisted_2$b)
                    ]),
                    createBaseVNode("div", _hoisted_3$9, [
                      createBaseVNode("nav", _hoisted_4$6, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(settingsCategories), (category) => {
                          return openBlock(), createElementBlock("button", {
                            key: category.id,
                            class: normalizeClass(["ehunter-category", { "ehunter-active": unref(store).activeSettingsCategory === category.id }]),
                            onClick: ($event) => scrollToCategory(category.id)
                          }, toDisplayString(unref(i18n)[category.i18nKey]), 11, _hoisted_5$4);
                        }), 128))
                      ]),
                      createBaseVNode("section", {
                        ref_key: "contentRef",
                        ref: contentRef,
                        class: "ehunter-content",
                        onScroll: onContentScroll
                      }, [
                        createBaseVNode("article", {
                          ref_key: "generalRef",
                          ref: generalRef,
                          class: "ehunter-group",
                          "data-category": "general"
                        }, [
                          createBaseVNode("h4", null, toDisplayString(unref(i18n).settingsGeneral), 1),
                          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(dialogGeneralFieldIds), (fieldId) => {
                            var _a2, _b2, _c, _d, _e, _f, _g;
                            return openBlock(), createElementBlock("div", {
                              class: "ehunter-row",
                              key: fieldId
                            }, [
                              createBaseVNode("div", _hoisted_6$2, [
                                createBaseVNode("span", _hoisted_7$2, toDisplayString(fieldLabel(fieldId)), 1),
                                fieldTip(fieldId) ? (openBlock(), createElementBlock("p", _hoisted_8$2, toDisplayString(fieldTip(fieldId)), 1)) : createCommentVNode("", true)
                              ]),
                              ((_a2 = unref(settingFieldMap)[fieldId]) == null ? void 0 : _a2.control) === "drop" ? (openBlock(), createBlock(DropOption, {
                                key: 0,
                                list: unref(getDropList)(fieldId),
                                "cur-val": unref(getFieldValue)(fieldId),
                                "format-cur-val-by-list": true,
                                "use-abbr-name": !!((_b2 = unref(settingFieldMap)[fieldId]) == null ? void 0 : _b2.useAbbrName),
                                onChange: (val) => onFieldChange(fieldId, val)
                              }, null, 8, ["list", "cur-val", "use-abbr-name", "onChange"])) : ((_c = unref(settingFieldMap)[fieldId]) == null ? void 0 : _c.control) === "num" ? (openBlock(), createBlock(NumDropOption, {
                                key: 1,
                                "quick-options": unref(getNumList)(fieldId),
                                "cur-val": unref(getFieldValue)(fieldId),
                                suffix: unref(getNumSuffix)(fieldId),
                                min: ((_d = unref(settingFieldMap)[fieldId]) == null ? void 0 : _d.min) || 0,
                                max: ((_e = unref(settingFieldMap)[fieldId]) == null ? void 0 : _e.max) || 999,
                                "is-float": !!((_f = unref(settingFieldMap)[fieldId]) == null ? void 0 : _f.isFloat),
                                onChange: (val) => onFieldChange(fieldId, val)
                              }, null, 8, ["quick-options", "cur-val", "suffix", "min", "max", "is-float", "onChange"])) : ((_g = unref(settingFieldMap)[fieldId]) == null ? void 0 : _g.control) === "switch" ? (openBlock(), createBlock(SimpleSwitch, {
                                key: 2,
                                active: !!unref(getFieldValue)(fieldId),
                                onChange: (val) => onFieldChange(fieldId, val)
                              }, null, 8, ["active", "onChange"])) : createCommentVNode("", true)
                            ]);
                          }), 128))
                        ], 512),
                        createBaseVNode("article", {
                          ref_key: "scrollRef",
                          ref: scrollRef,
                          class: "ehunter-group",
                          "data-category": "scroll"
                        }, [
                          createBaseVNode("h4", null, toDisplayString(unref(i18n).settingsScrollMode), 1),
                          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(dialogScrollFieldIds), (fieldId) => {
                            var _a2, _b2, _c, _d, _e, _f, _g;
                            return openBlock(), createElementBlock("div", {
                              class: "ehunter-row",
                              key: fieldId
                            }, [
                              createBaseVNode("div", _hoisted_9$2, [
                                createBaseVNode("span", _hoisted_10$1, toDisplayString(fieldLabel(fieldId)), 1),
                                fieldTip(fieldId) ? (openBlock(), createElementBlock("p", _hoisted_11$1, toDisplayString(fieldTip(fieldId)), 1)) : createCommentVNode("", true)
                              ]),
                              ((_a2 = unref(settingFieldMap)[fieldId]) == null ? void 0 : _a2.control) === "drop" ? (openBlock(), createBlock(DropOption, {
                                key: 0,
                                list: unref(getDropList)(fieldId),
                                "cur-val": unref(getFieldValue)(fieldId),
                                "format-cur-val-by-list": true,
                                "use-abbr-name": !!((_b2 = unref(settingFieldMap)[fieldId]) == null ? void 0 : _b2.useAbbrName),
                                onChange: (val) => onFieldChange(fieldId, val)
                              }, null, 8, ["list", "cur-val", "use-abbr-name", "onChange"])) : ((_c = unref(settingFieldMap)[fieldId]) == null ? void 0 : _c.control) === "num" ? (openBlock(), createBlock(NumDropOption, {
                                key: 1,
                                "quick-options": unref(getNumList)(fieldId),
                                "cur-val": unref(getFieldValue)(fieldId),
                                suffix: unref(getNumSuffix)(fieldId),
                                min: ((_d = unref(settingFieldMap)[fieldId]) == null ? void 0 : _d.min) || 0,
                                max: ((_e = unref(settingFieldMap)[fieldId]) == null ? void 0 : _e.max) || 999,
                                "is-float": !!((_f = unref(settingFieldMap)[fieldId]) == null ? void 0 : _f.isFloat),
                                onChange: (val) => onFieldChange(fieldId, val)
                              }, null, 8, ["quick-options", "cur-val", "suffix", "min", "max", "is-float", "onChange"])) : ((_g = unref(settingFieldMap)[fieldId]) == null ? void 0 : _g.control) === "switch" ? (openBlock(), createBlock(SimpleSwitch, {
                                key: 2,
                                active: !!unref(getFieldValue)(fieldId),
                                onChange: (val) => onFieldChange(fieldId, val)
                              }, null, 8, ["active", "onChange"])) : createCommentVNode("", true)
                            ]);
                          }), 128))
                        ], 512),
                        createBaseVNode("article", {
                          ref_key: "bookRef",
                          ref: bookRef,
                          class: "ehunter-group",
                          "data-category": "book"
                        }, [
                          createBaseVNode("h4", null, toDisplayString(unref(i18n).settingsBookMode), 1),
                          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(dialogBookFieldIds), (fieldId) => {
                            var _a2, _b2, _c, _d, _e, _f, _g;
                            return openBlock(), createElementBlock("div", {
                              class: "ehunter-row",
                              key: fieldId
                            }, [
                              createBaseVNode("div", _hoisted_12$1, [
                                createBaseVNode("span", _hoisted_13$1, toDisplayString(fieldLabel(fieldId)), 1),
                                fieldTip(fieldId) ? (openBlock(), createElementBlock("p", _hoisted_14$1, toDisplayString(fieldTip(fieldId)), 1)) : createCommentVNode("", true)
                              ]),
                              ((_a2 = unref(settingFieldMap)[fieldId]) == null ? void 0 : _a2.control) === "drop" ? (openBlock(), createBlock(DropOption, {
                                key: 0,
                                list: unref(getDropList)(fieldId),
                                "cur-val": unref(getFieldValue)(fieldId),
                                "format-cur-val-by-list": true,
                                "use-abbr-name": !!((_b2 = unref(settingFieldMap)[fieldId]) == null ? void 0 : _b2.useAbbrName),
                                onChange: (val) => onFieldChange(fieldId, val)
                              }, null, 8, ["list", "cur-val", "use-abbr-name", "onChange"])) : ((_c = unref(settingFieldMap)[fieldId]) == null ? void 0 : _c.control) === "num" ? (openBlock(), createBlock(NumDropOption, {
                                key: 1,
                                "quick-options": unref(getNumList)(fieldId),
                                "cur-val": unref(getFieldValue)(fieldId),
                                suffix: unref(getNumSuffix)(fieldId),
                                min: ((_d = unref(settingFieldMap)[fieldId]) == null ? void 0 : _d.min) || 0,
                                max: ((_e = unref(settingFieldMap)[fieldId]) == null ? void 0 : _e.max) || 999,
                                "is-float": !!((_f = unref(settingFieldMap)[fieldId]) == null ? void 0 : _f.isFloat),
                                onChange: (val) => onFieldChange(fieldId, val)
                              }, null, 8, ["quick-options", "cur-val", "suffix", "min", "max", "is-float", "onChange"])) : ((_g = unref(settingFieldMap)[fieldId]) == null ? void 0 : _g.control) === "switch" ? (openBlock(), createBlock(SimpleSwitch, {
                                key: 2,
                                active: !!unref(getFieldValue)(fieldId),
                                onChange: (val) => onFieldChange(fieldId, val)
                              }, null, 8, ["active", "onChange"])) : createCommentVNode("", true)
                            ]);
                          }), 128))
                        ], 512),
                        createBaseVNode("article", {
                          ref_key: "quickRef",
                          ref: quickRef,
                          class: "ehunter-group",
                          "data-category": "quick"
                        }, [
                          createBaseVNode("h4", null, toDisplayString(unref(i18n).settingsQuick), 1),
                          createBaseVNode("div", _hoisted_15$1, [
                            createBaseVNode("p", _hoisted_16$1, toDisplayString(unref(i18n).quickDragHint), 1),
                            createBaseVNode("div", {
                              class: "ehunter-quick-lane",
                              onDragover: _cache[4] || (_cache[4] = withModifiers(() => {
                              }, ["prevent"])),
                              onDrop: _cache[5] || (_cache[5] = withModifiers(($event) => onDropToLane($event, true), ["stop"]))
                            }, [
                              createBaseVNode("header", _hoisted_17, toDisplayString(unref(i18n).enabled), 1),
                              createBaseVNode("p", _hoisted_18, toDisplayString(unref(i18n).quickEnabledHint), 1),
                              (openBlock(true), createElementBlock(Fragment, null, renderList(enabledQuickSettingList.value, (item) => {
                                return openBlock(), createElementBlock("div", {
                                  key: `enabled-${item.id}`,
                                  class: "ehunter-quick-item",
                                  draggable: "true",
                                  "data-id": item.id,
                                  onContextmenu: _cache[1] || (_cache[1] = withModifiers(() => {
                                  }, ["prevent"])),
                                  onSelectstart: _cache[2] || (_cache[2] = withModifiers(() => {
                                  }, ["prevent"])),
                                  onDragstart: ($event) => onDragStart($event, item.id),
                                  onDragend: onDragEnd,
                                  onDragover: _cache[3] || (_cache[3] = withModifiers(() => {
                                  }, ["prevent"])),
                                  onDrop: withModifiers(($event) => onDropToItem($event, item.id, true), ["stop"])
                                }, [
                                  _cache[15] || (_cache[15] = createBaseVNode("span", {
                                    class: "ehunter-drag-handle",
                                    "aria-hidden": "true"
                                  }, null, -1)),
                                  createBaseVNode("span", _hoisted_20, toDisplayString(quickItemLabel(item.id, item.i18nKey)), 1),
                                  modeScopeText(item.modeScope) ? (openBlock(), createElementBlock("span", _hoisted_21, toDisplayString(modeScopeText(item.modeScope)), 1)) : createCommentVNode("", true)
                                ], 40, _hoisted_19);
                              }), 128))
                            ], 32),
                            _cache[17] || (_cache[17] = createBaseVNode("div", { class: "ehunter-lane-divider" }, null, -1)),
                            createBaseVNode("div", {
                              class: "ehunter-quick-lane ehunter-hidden",
                              onDragover: _cache[9] || (_cache[9] = withModifiers(() => {
                              }, ["prevent"])),
                              onDrop: _cache[10] || (_cache[10] = withModifiers(($event) => onDropToLane($event, false), ["stop"]))
                            }, [
                              createBaseVNode("header", _hoisted_22, toDisplayString(unref(i18n).hidden), 1),
                              createBaseVNode("p", _hoisted_23, toDisplayString(unref(i18n).quickHiddenHint), 1),
                              (openBlock(true), createElementBlock(Fragment, null, renderList(hiddenQuickSettingList.value, (item) => {
                                return openBlock(), createElementBlock("div", {
                                  key: `hidden-${item.id}`,
                                  class: "ehunter-quick-item",
                                  draggable: "true",
                                  "data-id": item.id,
                                  onContextmenu: _cache[6] || (_cache[6] = withModifiers(() => {
                                  }, ["prevent"])),
                                  onSelectstart: _cache[7] || (_cache[7] = withModifiers(() => {
                                  }, ["prevent"])),
                                  onDragstart: ($event) => onDragStart($event, item.id),
                                  onDragend: onDragEnd,
                                  onDragover: _cache[8] || (_cache[8] = withModifiers(() => {
                                  }, ["prevent"])),
                                  onDrop: withModifiers(($event) => onDropToItem($event, item.id, false), ["stop"])
                                }, [
                                  _cache[16] || (_cache[16] = createBaseVNode("span", {
                                    class: "ehunter-drag-handle",
                                    "aria-hidden": "true"
                                  }, null, -1)),
                                  createBaseVNode("span", _hoisted_25, toDisplayString(quickItemLabel(item.id, item.i18nKey)), 1),
                                  modeScopeText(item.modeScope) ? (openBlock(), createElementBlock("span", _hoisted_26, toDisplayString(modeScopeText(item.modeScope)), 1)) : createCommentVNode("", true)
                                ], 40, _hoisted_24);
                              }), 128))
                            ], 32)
                          ])
                        ], 512),
                        createBaseVNode("article", {
                          ref_key: "shortcutsRef",
                          ref: shortcutsRef,
                          class: "ehunter-group",
                          "data-category": "shortcuts"
                        }, [
                          createBaseVNode("h4", null, toDisplayString(unref(i18n).settingsShortcuts), 1),
                          createBaseVNode("p", _hoisted_27, toDisplayString(unref(i18n).shortcutEditHint), 1),
                          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(shortcutActionDefinitions), (action) => {
                            return openBlock(), createElementBlock("div", {
                              class: "ehunter-row",
                              key: action.id
                            }, [
                              createBaseVNode("div", _hoisted_28, [
                                createBaseVNode("span", _hoisted_29, toDisplayString(unref(i18n)[action.labelI18nKey]), 1),
                                shortcutTip(action.id, action.tipI18nKey) ? (openBlock(), createElementBlock("p", _hoisted_30, toDisplayString(shortcutTip(action.id, action.tipI18nKey)), 1)) : createCommentVNode("", true)
                              ]),
                              createBaseVNode("div", _hoisted_31, [
                                createVNode(TransitionGroup, {
                                  name: "ehunter-shortcut-chip-list",
                                  tag: "div",
                                  class: "ehunter-shortcut-chips"
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createElementBlock(Fragment, null, renderList(shortcutBindingList(action.id), (key) => {
                                      return openBlock(), createElementBlock("button", {
                                        key: `${action.id}-${key}`,
                                        class: "ehunter-shortcut-chip",
                                        onClick: ($event) => removeShortcutBinding(action.id, key)
                                      }, [
                                        createBaseVNode("span", _hoisted_33, toDisplayString(shortcutKeyLabel(key)), 1),
                                        _cache[18] || (_cache[18] = createBaseVNode("span", { class: "ehunter-chip-remove" }, "×", -1))
                                      ], 8, _hoisted_32);
                                    }), 128))
                                  ]),
                                  _: 2
                                }, 1024),
                                createBaseVNode("div", _hoisted_34, [
                                  createBaseVNode("button", {
                                    class: "ehunter-shortcut-add-btn",
                                    onClick: ($event) => toggleShortcutDropdown(action.id)
                                  }, [..._cache[19] || (_cache[19] = [
                                    createBaseVNode("span", { class: "ehunter-shortcut-add-icon" }, "+", -1)
                                  ])], 8, _hoisted_35),
                                  openedShortcutDropdown.value === action.id ? (openBlock(), createElementBlock("select", {
                                    key: 0,
                                    class: "ehunter-shortcut-select",
                                    value: "",
                                    onChange: ($event) => addShortcutBinding(action.id, $event.target.value)
                                  }, [
                                    createBaseVNode("option", _hoisted_37, toDisplayString(unref(i18n).shortcutAddPlaceholder), 1),
                                    (openBlock(true), createElementBlock(Fragment, null, renderList(availableShortcutCandidates(action.id), (candidate) => {
                                      return openBlock(), createElementBlock("option", {
                                        key: `${action.id}-candidate-${candidate}`,
                                        value: candidate
                                      }, toDisplayString(shortcutKeyLabel(candidate)), 9, _hoisted_38);
                                    }), 128))
                                  ], 40, _hoisted_36)) : createCommentVNode("", true)
                                ])
                              ])
                            ]);
                          }), 128)),
                          createBaseVNode("div", _hoisted_39, [
                            createBaseVNode("span", _hoisted_40, toDisplayString(unref(i18n).shortcutResetLabel), 1),
                            createBaseVNode("button", {
                              class: "ehunter-action",
                              onClick: _cache[11] || (_cache[11] = //@ts-ignore
                              (...args) => unref(storeAction).resetShortcutBindings && unref(storeAction).resetShortcutBindings(...args))
                            }, toDisplayString(unref(i18n).shortcutResetAction), 1)
                          ])
                        ], 512),
                        createBaseVNode("article", {
                          ref_key: "otherRef",
                          ref: otherRef,
                          class: "ehunter-group",
                          "data-category": "other"
                        }, [
                          createBaseVNode("h4", null, toDisplayString(unref(i18n).settingsOther), 1),
                          createBaseVNode("div", _hoisted_41, [
                            createBaseVNode("span", _hoisted_42, toDisplayString(unref(i18n).versionLabel), 1),
                            createBaseVNode("span", _hoisted_43, toDisplayString(versionText.value), 1)
                          ]),
                          createBaseVNode("div", _hoisted_44, [
                            createBaseVNode("span", _hoisted_45, toDisplayString(unref(i18n).infoTip), 1),
                            createBaseVNode("button", {
                              class: "ehunter-action",
                              onClick: _cache[12] || (_cache[12] = //@ts-ignore
                              (...args) => unref(storeAction).openWelcomeInstructionDialog && unref(storeAction).openWelcomeInstructionDialog(...args))
                            }, toDisplayString(unref(i18n).infoTip), 1)
                          ]),
                          _cache[20] || (_cache[20] = createBaseVNode("div", { class: "ehunter-row" }, [
                            createBaseVNode("span", { class: "ehunter-label" }, "Github"),
                            createBaseVNode("a", {
                              target: "_blank",
                              href: "https://github.com/FPV-G/JM-EHunter",
                              class: "ehunter-link"
                            }, "https://github.com/FPV-G/JM-EHunter")
                          ], -1)),
                          createBaseVNode("div", _hoisted_46, [
                            createBaseVNode("span", _hoisted_47, toDisplayString(unref(i18n).resetTip), 1),
                            createBaseVNode("button", {
                              class: "ehunter-danger",
                              onClick: _cache[13] || (_cache[13] = //@ts-ignore
                              (...args) => unref(storeAction).showFactoryResetDialog && unref(storeAction).showFactoryResetDialog(...args))
                            }, toDisplayString(unref(i18n).resetTip), 1)
                          ])
                        ], 512)
                      ], 544)
                    ])
                  ])
                ])) : createCommentVNode("", true)
              ]),
              _: 1
            })
          ])),
          createVNode(SimpleDialog, {
            active: unref(store).isFactoryResetDialogVisible,
            title: unref(i18n).resetAllConfirmTitle,
            "md-text": unref(i18n).resetAllConfirmDesc,
            operations: resetOperations.value,
            onClose: unref(storeAction).hideFactoryResetDialog
          }, null, 8, ["active", "title", "md-text", "operations", "onClose"])
        ], 64);
      };
    }
  });
  const MoreSettingsDialog = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-b3713ec5"]]);
  const _sfc_main$j = /* @__PURE__ */ defineComponent({
    __name: "DownloadConfirmDialog",
    setup(__props) {
      const operations = [
        {
          name: i18n.value.cancel,
          btnType: "plain",
          isCloseModal: true
        },
        {
          name: i18n.value.confirm,
          btnType: "positive",
          isCloseModal: true,
          onClick: () => __async(null, null, function* () {
            const albumService = storeAction.getAlbumService();
            if (!albumService) {
              return;
            }
            const downloadService = new GalleryDownloadService();
            const taskId = `download-${Date.now()}-${Math.round(Math.random() * 1e3)}`;
            const pageCount = store.pageCount;
            storeAction.registerDownloadRunner(taskId, downloadService);
            storeAction.startDownloadTask(taskId, store.albumTitle, pageCount);
            try {
              yield downloadService.run({
                taskId,
                albumService,
                galleryTitle: store.albumTitle,
                introUrl: albumService.getIntroUrl(),
                pageCount,
                chunkSize: store.downloadChunkSize,
                autoRetryByOtherSource: store.autoRetryByOtherSource,
                jmEHunterVersion: "",
                onStatus: (event) => {
                  storeAction.applyDownloadStatusEvent(taskId, store.albumTitle, event);
                }
              });
            } catch (e) {
              const isAborted = e instanceof Error && e.message === "DOWNLOAD_ABORTED";
              storeAction.applyDownloadStatusEvent(taskId, store.albumTitle, {
                phase: isAborted ? "partial" : "failed",
                severity: isAborted ? "warning" : "error",
                message: isAborted ? i18n.value.downloadAborted : i18n.value.downloadFailed,
                processedPages: 0,
                totalPages: pageCount,
                failedPages: pageCount
              });
            } finally {
              storeAction.clearDownloadRunner(taskId);
            }
          })
        }
      ];
      function onClose() {
        storeAction.closeDownloadConfirmDialog();
      }
      return (_ctx, _cache) => {
        return openBlock(), createBlock(SimpleDialog, {
          active: unref(store).showDownloadConfirmDialog,
          title: unref(i18n).downloadConfirmTitle,
          "md-text": `${unref(i18n).downloadConfirmMessage}

${unref(i18n).downloadAuthorizeTip}`,
          operations,
          onClose
        }, null, 8, ["active", "title", "md-text"]);
      };
    }
  });
  const _hoisted_1$f = { class: "top-bar" };
  const _hoisted_2$a = { class: "more-button-wrapper" };
  const _hoisted_3$8 = ["title-content"];
  const _sfc_main$i = /* @__PURE__ */ defineComponent({
    __name: "TopBar",
    emits: ["closeJMEHunter"],
    setup(__props, { emit: __emit }) {
      useCssVars((_ctx) => ({
        "v0daa2faa": unref(store).topBarHeight + "px"
      }));
      const emit2 = __emit;
      const showMoreMenu = /* @__PURE__ */ ref(false);
      const innerContentRef = /* @__PURE__ */ ref(null);
      const floatContentRef = /* @__PURE__ */ ref(null);
      const itemVisibility = /* @__PURE__ */ ref([]);
      const isMeasuring = /* @__PURE__ */ ref(false);
      let checkOverlapTimer = null;
      function getItemStyle(index) {
        if (isMeasuring.value) {
          return { visibility: "hidden" };
        }
        if (itemVisibility.value[index] === false) {
          return { display: "none" };
        }
        return {};
      }
      const topBarFields = computed(() => {
        return computedVisibleQuickSettingIds.value.map((id) => settingFieldMap[id]).filter((field) => !!field).filter((field) => {
          if (!field.showInTopBar) {
            return false;
          }
          if (field.modeScope === "scroll-only" && store.readingMode !== 0) {
            return false;
          }
          if (field.modeScope === "book-only" && store.readingMode !== 1) {
            return false;
          }
          if (field.requireThumbSupportInTopBar && !store.isSupportThumbView) {
            return false;
          }
          return true;
        });
      });
      function handleFieldChange(id, val) {
        setFieldValue(id, val);
      }
      function toggleMoreMenu() {
        showMoreMenu.value = !showMoreMenu.value;
      }
      function closeJMEHunter() {
        emit2("closeJMEHunter");
      }
      function checkOverlap() {
        if (!innerContentRef.value || !floatContentRef.value) {
          return;
        }
        if (!store.showTopBar) {
          return;
        }
        isMeasuring.value = true;
        itemVisibility.value = new Array(topBarFields.value.length).fill(true);
        nextTick(() => {
          var _a2, _b2;
          const items = (_a2 = innerContentRef.value) == null ? void 0 : _a2.querySelectorAll(".item");
          if (!items || items.length === 0) {
            isMeasuring.value = false;
            return;
          }
          const floatRect = (_b2 = floatContentRef.value) == null ? void 0 : _b2.getBoundingClientRect();
          if (!floatRect) {
            isMeasuring.value = false;
            return;
          }
          const floatLeft = floatRect.left;
          const visibility = [];
          for (let i2 = 0; i2 < items.length; i2++) {
            const itemRect = items[i2].getBoundingClientRect();
            const itemRight = itemRect.right;
            visibility[i2] = itemRight + 10 <= floatLeft;
          }
          isMeasuring.value = false;
          itemVisibility.value = visibility;
        });
      }
      let resizeObserver = null;
      function debouncedCheckOverlap(immediate = false) {
        if (checkOverlapTimer) {
          clearTimeout(checkOverlapTimer);
        }
        if (immediate) {
          checkOverlap();
        } else {
          checkOverlapTimer = window.setTimeout(() => {
            checkOverlap();
            checkOverlapTimer = null;
          }, 100);
        }
      }
      const handleResize = () => debouncedCheckOverlap();
      onMounted(() => {
        nextTick(() => {
          checkOverlap();
        });
        window.addEventListener("resize", handleResize);
        if (innerContentRef.value) {
          resizeObserver = new ResizeObserver(() => {
            debouncedCheckOverlap();
          });
          resizeObserver.observe(innerContentRef.value);
        }
      });
      onUnmounted(() => {
        window.removeEventListener("resize", handleResize);
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
        if (checkOverlapTimer) {
          clearTimeout(checkOverlapTimer);
        }
      });
      watch(topBarFields, () => {
        nextTick(() => {
          checkOverlap();
        });
      }, { deep: true });
      watch(() => store.showTopBar, (newVal) => {
        if (newVal) {
          setTimeout(() => {
            checkOverlap();
          }, 350);
        }
      });
      watch(() => store.readingMode, () => {
        setTimeout(() => {
          checkOverlap();
        }, 500);
      });
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("nav", _hoisted_1$f, [
          createBaseVNode("div", {
            class: "float-content",
            ref_key: "floatContentRef",
            ref: floatContentRef
          }, [
            createBaseVNode("div", _hoisted_2$a, [
              createVNode(CircleIconButton, {
                class: "button tips tips-left tips-down",
                "icon-type": "more",
                "title-content": unref(i18n).more,
                onClick: toggleMoreMenu,
                size: "normal"
              }, null, 8, ["title-content"]),
              createVNode(MoreMenuPopover, {
                active: showMoreMenu.value,
                onClose: _cache[0] || (_cache[0] = ($event) => showMoreMenu.value = false),
                onMoreSettings: _cache[1] || (_cache[1] = ($event) => unref(storeAction).openMoreSettingsDialog()),
                onQuickPreview: _cache[2] || (_cache[2] = ($event) => unref(storeAction).openThumbExpandDialog()),
                onDownload: _cache[3] || (_cache[3] = ($event) => unref(storeAction).openDownloadConfirmDialog())
              }, null, 8, ["active"])
            ]),
            createVNode(CircleIconButton, {
              class: "button tips tips-left tips-down",
              "icon-type": "menu",
              "title-content": unref(i18n).toggleTopBar,
              rotate: unref(store).showTopBar,
              onClick: _cache[4] || (_cache[4] = ($event) => unref(storeAction).toggleShowTopBar()),
              size: "normal"
            }, null, 8, ["title-content", "rotate"]),
            createVNode(CircleIconButton, {
              class: "button tips tips-left tips-down",
              "icon-type": "close",
              "title-content": unref(i18n).closeJMEHunter,
              onClick: closeJMEHunter,
              size: "normal"
            }, null, 8, ["title-content"])
          ], 512),
          createBaseVNode("div", {
            class: normalizeClass(["inner-content", { hide: !unref(store).showTopBar }]),
            ref_key: "innerContentRef",
            ref: innerContentRef
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(topBarFields.value, (field, index) => {
              return openBlock(), createElementBlock("div", {
                class: normalizeClass(["item", { "less-margin": field.id === "lang" }]),
                key: field.id,
                style: normalizeStyle(getItemStyle(index))
              }, [
                createBaseVNode("span", {
                  class: "label tips tips-down tips-right",
                  "title-content": field.tipI18nKey ? unref(i18n)[field.tipI18nKey] : ""
                }, toDisplayString(unref(i18n)[field.labelI18nKey]) + ": ", 9, _hoisted_3$8),
                field.control === "drop" ? (openBlock(), createBlock(DropOption, {
                  key: 0,
                  list: unref(getDropList)(field.id),
                  "cur-val": unref(getFieldValue)(field.id),
                  "format-cur-val-by-list": true,
                  "use-abbr-name": !!field.useAbbrName,
                  onChange: (val) => handleFieldChange(field.id, val)
                }, null, 8, ["list", "cur-val", "use-abbr-name", "onChange"])) : field.control === "num" ? (openBlock(), createBlock(NumDropOption, {
                  key: 1,
                  "quick-options": unref(getNumList)(field.id),
                  "cur-val": unref(getFieldValue)(field.id),
                  suffix: unref(getNumSuffix)(field.id),
                  min: field.min || 0,
                  max: field.max || 999,
                  "is-float": !!field.isFloat,
                  onChange: (val) => handleFieldChange(field.id, val)
                }, null, 8, ["quick-options", "cur-val", "suffix", "min", "max", "is-float", "onChange"])) : field.control === "switch" ? (openBlock(), createBlock(SimpleSwitch, {
                  key: 2,
                  active: !!unref(getFieldValue)(field.id),
                  onChange: (val) => handleFieldChange(field.id, val)
                }, null, 8, ["active", "onChange"])) : createCommentVNode("", true)
              ], 6);
            }), 128))
          ], 2),
          createVNode(MoreSettingsDialog),
          createVNode(_sfc_main$j)
        ]);
      };
    }
  });
  const TopBar = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-f31c6980"]]);
  var NEWTON_ITERATIONS = 4;
  var NEWTON_MIN_SLOPE = 1e-3;
  var SUBDIVISION_PRECISION = 1e-7;
  var SUBDIVISION_MAX_ITERATIONS = 10;
  var kSplineTableSize = 11;
  var kSampleStepSize = 1 / (kSplineTableSize - 1);
  var float32ArraySupported = typeof Float32Array === "function";
  function A(aA1, aA2) {
    return 1 - 3 * aA2 + 3 * aA1;
  }
  function B(aA1, aA2) {
    return 3 * aA2 - 6 * aA1;
  }
  function C(aA1) {
    return 3 * aA1;
  }
  function calcBezier(aT, aA1, aA2) {
    return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
  }
  function getSlope(aT, aA1, aA2) {
    return 3 * A(aA1, aA2) * aT * aT + 2 * B(aA1, aA2) * aT + C(aA1);
  }
  function binarySubdivide(aX, aA, aB, mX1, mX2) {
    var currentX, currentT, i2 = 0;
    do {
      currentT = aA + (aB - aA) / 2;
      currentX = calcBezier(currentT, mX1, mX2) - aX;
      if (currentX > 0) {
        aB = currentT;
      } else {
        aA = currentT;
      }
    } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i2 < SUBDIVISION_MAX_ITERATIONS);
    return currentT;
  }
  function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
    for (var i2 = 0; i2 < NEWTON_ITERATIONS; ++i2) {
      var currentSlope = getSlope(aGuessT, mX1, mX2);
      if (currentSlope === 0) {
        return aGuessT;
      }
      var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  }
  function bezier(mX1, mY1, mX2, mY2) {
    var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
    {
      for (var i2 = 0; i2 < kSplineTableSize; ++i2) {
        sampleValues[i2] = calcBezier(i2 * kSampleStepSize, mX1, mX2);
      }
    }
    function getTForX(aX) {
      var intervalStart = 0;
      var currentSample = 1;
      var lastSample = kSplineTableSize - 1;
      for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
        intervalStart += kSampleStepSize;
      }
      --currentSample;
      var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
      var guessForT = intervalStart + dist * kSampleStepSize;
      var initialSlope = getSlope(guessForT, mX1, mX2);
      if (initialSlope >= NEWTON_MIN_SLOPE) {
        return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
      } else if (initialSlope === 0) {
        return guessForT;
      } else {
        return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
      }
    }
    return function BezierEasing(x2) {
      if (x2 === 0) {
        return 0;
      }
      if (x2 === 1) {
        return 1;
      }
      return calcBezier(getTForX(x2), mY1, mY2);
    };
  }
  const _sfc_main$h = /* @__PURE__ */ defineComponent({
    __name: "AwesomeScrollView",
    props: {
      color: { default: "rgba(0,0,0,0.4)" },
      isHidden: { type: Boolean, default: false },
      offsetInterval: { default: 150 },
      onScrollStopped: { type: Function, default: (pos) => {
      } },
      listenScroll: { type: Boolean, default: false },
      axis: { default: "y" }
    },
    emits: ["topIn", "topLeave"],
    setup(__props, { expose: __expose, emit: __emit }) {
      const emit2 = __emit;
      const props = __props;
      const asv = /* @__PURE__ */ ref(null);
      let lastPosition;
      let isScrollingV2 = false;
      let isAtTop = true;
      let scrollRAFId = 0;
      function updateTopState(position) {
        const nextIsAtTop = position <= 0;
        if (nextIsAtTop === isAtTop) {
          return;
        }
        isAtTop = nextIsAtTop;
        if (nextIsAtTop) {
          emit2("topIn");
          return;
        }
        emit2("topLeave");
      }
      function watchPosition() {
        if (!asv.value) {
          return;
        }
        const position = props.axis === "y" ? asv.value.scrollTop : asv.value.scrollLeft;
        if (props.axis === "y") {
          updateTopState(position);
        }
        if (!isScrollingV2 && position === lastPosition) {
          return;
        }
        if (!isScrollingV2 && position !== lastPosition) {
          lastPosition = position;
          isScrollingV2 = true;
          return;
        }
        if (isScrollingV2 && position !== lastPosition) {
          lastPosition = position;
          return;
        }
        isScrollingV2 = false;
        props.onScrollStopped(position);
      }
      let timer;
      onMounted(() => {
        if (props.listenScroll && asv.value) {
          lastPosition = props.axis === "y" ? asv.value.scrollTop : asv.value.scrollLeft;
          if (props.axis === "y") {
            isAtTop = lastPosition <= 0;
            if (isAtTop) {
              emit2("topIn");
            }
          }
          timer = window.setInterval(watchPosition, 50);
        }
      });
      onUnmounted(() => {
        if (scrollRAFId) {
          window.cancelAnimationFrame(scrollRAFId);
          scrollRAFId = 0;
        }
        if (timer) {
          clearInterval(timer);
        }
      });
      function scrollTo(offset, duration, axis = "y") {
        const effectiveAxis = axis || props.axis;
        if (!asv.value) {
          return;
        }
        if (scrollRAFId) {
          window.cancelAnimationFrame(scrollRAFId);
          scrollRAFId = 0;
        }
        if (duration <= 0) {
          if (effectiveAxis === "y") {
            asv.value.scrollTop = offset;
          } else {
            asv.value.scrollLeft = offset;
          }
          return;
        }
        const startValue = effectiveAxis === "y" ? asv.value.scrollTop : asv.value.scrollLeft;
        const diff = offset - startValue;
        if (Math.abs(diff) < 0.5) {
          return;
        }
        let start = 0;
        const easing = bezier(0.61, 0.29, 0.3, 0.97);
        scrollRAFId = window.requestAnimationFrame(function step(timestamp) {
          if (!asv.value) {
            scrollRAFId = 0;
            return;
          }
          if (!start) start = timestamp;
          const time = timestamp - start;
          const percent = Math.min(time / duration, 1);
          const next = startValue + diff * easing(percent);
          if (effectiveAxis === "y") {
            asv.value.scrollTop = next;
          } else {
            asv.value.scrollLeft = next;
          }
          if (time < duration) {
            scrollRAFId = window.requestAnimationFrame(step);
            return;
          }
          scrollRAFId = 0;
        });
      }
      __expose({
        scrollTo
      });
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", {
          ref_key: "asv",
          ref: asv,
          class: normalizeClass(["awesome-scroll-view", "scrollbar", `axis-${__props.axis}`, { isHidden: __props.isHidden }])
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0)
        ], 2);
      };
    }
  });
  const AwesomeScrollView = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-4f224e6d"]]);
  function createGestureActivator(options) {
    var _a2;
    let timer = 0;
    let startX = 0;
    let startY = 0;
    let active = false;
    const moveTolerance = (_a2 = options.moveTolerance) != null ? _a2 : 8;
    const clearTimer = () => {
      if (timer) {
        window.clearTimeout(timer);
        timer = 0;
      }
    };
    const cancel = () => {
      clearTimer();
      active = false;
    };
    const activate = (clientX, clientY, pointerType, sourceEvent) => {
      active = true;
      options.onActivate({ clientX, clientY, pointerType, sourceEvent });
    };
    const onPointerDown = (event) => {
      const pointerType = event.pointerType || "mouse";
      startX = event.clientX;
      startY = event.clientY;
      if (pointerType === "mouse") {
        activate(event.clientX, event.clientY, "mouse", event);
        return;
      }
      clearTimer();
      timer = window.setTimeout(() => {
        activate(event.clientX, event.clientY, pointerType, event);
      }, options.longPressMs);
    };
    const onPointerMove = (event) => {
      if (active || !timer) {
        return;
      }
      const moved = Math.abs(event.clientX - startX) > moveTolerance || Math.abs(event.clientY - startY) > moveTolerance;
      if (moved) {
        cancel();
      }
    };
    const onPointerEnd = () => {
      if (!active) {
        cancel();
      }
    };
    return {
      onPointerDown,
      onPointerMove,
      onPointerUp: onPointerEnd,
      onPointerCancel: onPointerEnd,
      cancel
    };
  }
  const _hoisted_1$e = ["aria-label"];
  const _sfc_main$g = /* @__PURE__ */ defineComponent({
    __name: "DockHandle",
    props: {
      label: { default: "JM-EHUNTER" },
      ariaLabel: { default: "Dock handle" },
      longPressMs: { default: 500 }
    },
    emits: ["drag-start"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit2 = __emit;
      const armed = /* @__PURE__ */ ref(false);
      const activator = createGestureActivator({
        longPressMs: props.longPressMs,
        onActivate: (payload) => {
          armed.value = true;
          emit2("drag-start", payload);
        }
      });
      function onPointerDown(event) {
        armed.value = false;
        activator.onPointerDown(event);
      }
      function onPointerMove(event) {
        activator.onPointerMove(event);
      }
      function onPointerUp() {
        armed.value = false;
        activator.onPointerUp();
      }
      function onPointerCancel() {
        armed.value = false;
        activator.onPointerCancel();
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("button", {
          type: "button",
          class: normalizeClass(["dock-handle", { armed: armed.value }]),
          "aria-label": __props.ariaLabel,
          onPointerdown: onPointerDown,
          onPointermove: onPointerMove,
          onPointerup: onPointerUp,
          onPointercancel: onPointerCancel
        }, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(__props.label), 1)
          ])
        ], 42, _hoisted_1$e);
      };
    }
  });
  const DockHandle = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-5a311fbe"]]);
  const _hoisted_1$d = ["src"];
  const _hoisted_2$9 = {
    key: 1,
    class: "thumb-fallback"
  };
  const defaultThumbWidth = 100;
  const defaultThumbHeight = 144;
  const _sfc_main$f = /* @__PURE__ */ defineComponent({
    __name: "ThumbView",
    props: {
      thumbInfo: {},
      fallbackText: {}
    },
    setup(__props) {
      const props = __props;
      const root = /* @__PURE__ */ ref(null);
      const containerWidth = /* @__PURE__ */ ref(0);
      const containerHeight = /* @__PURE__ */ ref(0);
      let resizeObserver = null;
      const thumbWidth = computed(() => {
        var _a2;
        const width = ((_a2 = props.thumbInfo) == null ? void 0 : _a2.width) || 0;
        return width > 0 ? width : defaultThumbWidth;
      });
      const thumbHeight = computed(() => {
        var _a2;
        const height = ((_a2 = props.thumbInfo) == null ? void 0 : _a2.height) || 0;
        return height > 0 ? height : defaultThumbHeight;
      });
      const stageScale = computed(() => {
        if (containerWidth.value <= 0 || containerHeight.value <= 0) {
          return 1;
        }
        const widthScale = containerWidth.value / thumbWidth.value;
        const heightScale = containerHeight.value / thumbHeight.value;
        const scale = Math.min(widthScale, heightScale);
        return Number.isFinite(scale) && scale > 0 ? scale : 1;
      });
      const stageStyle = computed(() => {
        return {
          width: `${thumbWidth.value}px`,
          height: `${thumbHeight.value}px`,
          transform: `scale(${stageScale.value})`
        };
      });
      const spriteStyle = computed(() => {
        var _a2, _b2;
        const offset = ((_a2 = props.thumbInfo) == null ? void 0 : _a2.offset) || 0;
        const src = ((_b2 = props.thumbInfo) == null ? void 0 : _b2.src) || "";
        return {
          background: `transparent url(${src}) -${offset}px 0 no-repeat`
        };
      });
      function updateContainerSize() {
        if (!root.value) {
          return;
        }
        containerWidth.value = root.value.clientWidth;
        containerHeight.value = root.value.clientHeight;
      }
      onMounted(() => {
        updateContainerSize();
        if (!root.value || typeof ResizeObserver === "undefined") {
          return;
        }
        resizeObserver = new ResizeObserver(() => {
          updateContainerSize();
        });
        resizeObserver.observe(root.value);
      });
      onBeforeUnmount(() => {
        if (resizeObserver) {
          resizeObserver.disconnect();
          resizeObserver = null;
        }
      });
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", {
          ref_key: "root",
          ref: root,
          class: "thumb-view"
        }, [
          __props.thumbInfo ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "thumb-stage",
            style: normalizeStyle(stageStyle.value)
          }, [
            __props.thumbInfo.mode === unref(ThumbMode).SPIRIT ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "thumb-sprite",
              style: normalizeStyle(spriteStyle.value)
            }, null, 4)) : (openBlock(), createElementBlock("img", {
              key: 1,
              class: "thumb-image",
              src: __props.thumbInfo.src,
              alt: "",
              draggable: "false"
            }, null, 8, _hoisted_1$d))
          ], 4)) : __props.fallbackText ? (openBlock(), createElementBlock("div", _hoisted_2$9, toDisplayString(__props.fallbackText), 1)) : createCommentVNode("", true)
        ], 512);
      };
    }
  });
  const ThumbView = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-88a65bb0"]]);
  const _hoisted_1$c = { class: "header" };
  const _hoisted_2$8 = ["onClick"];
  const _hoisted_3$7 = { class: "thumb-stage" };
  const _hoisted_4$5 = { class: "index" };
  const _hoisted_5$3 = ["aria-label"];
  const updaterName = "thumb";
  const _sfc_main$e = /* @__PURE__ */ defineComponent({
    __name: "ThumbScrollView",
    emits: ["dock-drag-start", "open-thumb-expand"],
    setup(__props, { emit: __emit }) {
      useCssVars((_ctx) => ({
        "v5a8223be": sideHeaderFontSize.value,
        "v6df6e1a2": sideHeaderLetterSpacing.value,
        "v3276ebb2": thumbContainerHeight.value + "px",
        "v44d27a72": thumbContainerWidth.value + "px",
        "v928be0aa": indexFontSize.value + "px",
        "v6297f873": hoverIndexFontSize.value + "px",
        "v4f06c231": unref(thumbVerticalItemPaddingX) + "px",
        "v595b4c6c": unref(thumbVerticalItemGap) + "px",
        "v3d2994ea": indicatorOffset.value + "px",
        "v15069c5b": bottomHeaderLetterSpacing.value,
        "v3b1f8b12": bottomHeaderFontSize.value,
        "v0891a98a": unref(thumbBottomItemPaddingY) + "px",
        "d8540348": unref(thumbBottomItemPaddingX) + "px"
      }));
      const isDockBottom = computed(() => store.thumbDockSlot === "bottom");
      const computedVolFirstIndexNum = computed(() => Number(computedVolFirstIndex.value));
      const activeThumbIndex = computed(() => {
        return Math.max(0, store.curViewIndex - computedVolFirstIndexNum.value);
      });
      const sideHeaderFontSize = computed(() => {
        return `${computeSideHeaderFontSizePx(store.thumbItemWidth)}px`;
      });
      const sideHeaderLetterSpacing = computed(() => {
        return `${computeSideHeaderLetterSpacingEm(store.thumbItemWidth).toFixed(3)}em`;
      });
      const bottomHeaderFontSize = computed(() => {
        return `${computeBottomHeaderFontSizePx(store.thumbViewHeight)}px`;
      });
      const bottomHeaderLetterSpacing = computed(() => {
        return `${computeBottomHeaderLetterSpacingEm(store.thumbViewHeight).toFixed(3)}em`;
      });
      const emit2 = __emit;
      const scrollView = /* @__PURE__ */ ref(null);
      const thumbContainers = /* @__PURE__ */ ref(null);
      const indicatorOffset = computed(() => {
        if (isDockBottom.value) {
          return thumbContainerWidth.value * activeThumbIndex.value;
        }
        return (thumbContainerHeight.value + thumbVerticalItemGap) * activeThumbIndex.value;
      });
      const volThumbs = computed(() => {
        return store.thumbInfos.slice(computedVolFirstIndex.value, computedVolFirstIndex.value + store.volumeSize);
      });
      const thumbContainerScale = computed(() => computeThumbContainerScale(store.thumbDockSlot, store.thumbItemWidth, store.thumbItemHeight));
      const thumbStageBaseWidth = computed(() => {
        return computeThumbStageBaseWidth(store.thumbDockSlot);
      });
      const thumbContainerWidth = computed(() => Math.round(thumbStageBaseWidth.value * thumbContainerScale.value));
      const thumbContainerHeight = computed(() => Math.round(baseThumbItemHeight * thumbContainerScale.value));
      const indexFontSize = computed(() => {
        const minSide = Math.min(thumbContainerWidth.value, thumbContainerHeight.value);
        return Math.max(14, Math.min(40, Math.round(minSide * 0.4)));
      });
      const hoverIndexFontSize = computed(() => {
        const minSide = Math.min(thumbContainerWidth.value, thumbContainerHeight.value);
        const hoverSize = Math.max(20, Math.min(60, Math.round(minSide * 0.6)));
        return Math.max(hoverSize, indexFontSize.value + 4);
      });
      function select(index) {
        const normalizedIndex = Number(index);
        storeAction.setCurViewIndex(computedVolFirstIndexNum.value + normalizedIndex, updaterName);
      }
      function onDockDragStart(payload) {
        emit2("dock-drag-start", payload);
      }
      function onClickExpand() {
        emit2("open-thumb-expand");
      }
      function scrollToActiveThumb(targetIndex) {
        if (!scrollView.value || !thumbContainers.value || targetIndex < 0) {
          return;
        }
        const scrollDuration = store.readingMode === 1 ? 260 : 1e3;
        if (isDockBottom.value) {
          const sorted2 = [...thumbContainers.value].sort((a, b) => a.offsetLeft - b.offsetLeft);
          const target22 = sorted2[targetIndex];
          if (target22) {
            scrollView.value.scrollTo(target22.offsetLeft, scrollDuration, "x");
            return;
          }
          scrollView.value.scrollTo(0, scrollDuration, "x");
          return;
        }
        const sorted = [...thumbContainers.value].sort((a, b) => a.offsetTop - b.offsetTop);
        const target2 = sorted[targetIndex];
        if (target2) {
          scrollView.value.scrollTo(target2.offsetTop, scrollDuration, "y");
          return;
        }
        scrollView.value.scrollTo(0, scrollDuration, "y");
      }
      watch(() => store.curViewIndex, (newVal) => {
        if (store.curViewIndexUpdater !== updaterName) {
          if (newVal === computedVolFirstIndex.value) {
            scrollToActiveThumb(0);
            return;
          }
          scrollToActiveThumb(newVal - computedVolFirstIndex.value);
        }
      });
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("aside", {
          class: normalizeClass(["thumb-content", { "dock-bottom": unref(store).thumbDockSlot === "bottom" }])
        }, [
          createVNode(AwesomeScrollView, {
            ref_key: "scrollView",
            ref: scrollView,
            class: normalizeClass(["thumb-scroll-view", { "dock-bottom": unref(store).thumbDockSlot === "bottom" }]),
            axis: unref(store).thumbDockSlot === "bottom" ? "x" : "y"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1$c, [
                createVNode(DockHandle, {
                  class: "app-name",
                  label: "JM-EHUNTER",
                  "aria-label": "JM-EHUNTER Dock Handle",
                  onDragStart: onDockDragStart
                })
              ]),
              _cache[1] || (_cache[1] = createBaseVNode("div", { class: "indicator" }, null, -1)),
              (openBlock(true), createElementBlock(Fragment, null, renderList(volThumbs.value, (item, i2) => {
                return openBlock(), createElementBlock("div", {
                  class: "thumb-container",
                  onClick: ($event) => select(i2),
                  key: item.id,
                  ref_for: true,
                  ref_key: "thumbContainers",
                  ref: thumbContainers
                }, [
                  createBaseVNode("div", _hoisted_3$7, [
                    createVNode(ThumbView, {
                      class: "thumb",
                      "thumb-info": item
                    }, null, 8, ["thumb-info"]),
                    _cache[0] || (_cache[0] = createBaseVNode("div", { class: "hover-mask" }, null, -1)),
                    createBaseVNode("div", _hoisted_4$5, toDisplayString(computedVolFirstIndexNum.value + Number(i2) + 1), 1)
                  ])
                ], 8, _hoisted_2$8);
              }), 128))
            ]),
            _: 1
          }, 8, ["class", "axis"]),
          createBaseVNode("button", {
            type: "button",
            class: normalizeClass(["thumb-expand-trigger", { "dock-bottom": unref(store).thumbDockSlot === "bottom" }]),
            "aria-label": unref(i18n).expandThumbs,
            onClick: onClickExpand
          }, [
            createVNode(unref(ExpandIcon), { class: "expand-icon" })
          ], 10, _hoisted_5$3)
        ], 2);
      };
    }
  });
  const ThumbScrollView = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-2665bf4a"]]);
  const _hoisted_1$b = {
    key: 0,
    class: "ehunter-loading"
  };
  const _hoisted_2$7 = {
    key: 1,
    class: "ehunter-error"
  };
  const _hoisted_3$6 = { class: "error-message" };
  const _hoisted_4$4 = {
    key: 0,
    class: "init-steps"
  };
  const _hoisted_5$2 = { class: "step-label" };
  const _hoisted_6$1 = {
    key: 0,
    class: "step-detail"
  };
  const _hoisted_7$1 = {
    class: "error-details",
    open: ""
  };
  const _hoisted_8$1 = { class: "error-info" };
  const _hoisted_9$1 = {
    key: 0,
    class: "error-stack"
  };
  const _sfc_main$d = /* @__PURE__ */ defineComponent({
    __name: "LoadingView",
    props: {
      isLoading: { type: Boolean, default: false },
      error: { default: null }
    },
    emits: ["close"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit2 = __emit;
      const onClose = () => {
        emit2("close");
      };
      function getDeviceName() {
        var _a2, _b2, _c;
        const nav = navigator;
        const model = (_a2 = nav.userAgentData) == null ? void 0 : _a2.model;
        if (typeof model === "string" && model.trim()) {
          return model;
        }
        const platform = ((_b2 = nav.userAgentData) == null ? void 0 : _b2.platform) || navigator.platform || "Unknown Device";
        const mobileTag = ((_c = nav.userAgentData) == null ? void 0 : _c.mobile) ? " Mobile" : "";
        return `${platform}${mobileTag}`.trim();
      }
      function getOperatingSystem() {
        var _a2;
        const nav = navigator;
        if ((_a2 = nav.userAgentData) == null ? void 0 : _a2.platform) {
          return nav.userAgentData.platform;
        }
        const ua = navigator.userAgent;
        if (/Windows NT/i.test(ua)) {
          return "Windows";
        }
        if (/Mac OS X|Macintosh/i.test(ua)) {
          return "macOS";
        }
        if (/Android/i.test(ua)) {
          return "Android";
        }
        if (/iPhone|iPad|iPod/i.test(ua)) {
          return "iOS";
        }
        if (/Linux/i.test(ua)) {
          return "Linux";
        }
        return "Unknown OS";
      }
      const appVersion = pkgJson.version;
      const deviceName = getDeviceName();
      const operatingSystem = getOperatingSystem();
      const copied = /* @__PURE__ */ ref(false);
      const copyButtonText = computed(() => copied.value ? "Copied" : "Copy");
      const initializationSteps = computed(() => {
        const currentError = props.error;
        if (!(currentError == null ? void 0 : currentError.steps) || !Array.isArray(currentError.steps)) {
          return [];
        }
        return currentError.steps.slice().sort((a, b) => {
          var _a2, _b2;
          const orderA = (_a2 = a.order) != null ? _a2 : Number.MAX_SAFE_INTEGER;
          const orderB = (_b2 = b.order) != null ? _b2 : Number.MAX_SAFE_INTEGER;
          return orderA - orderB;
        });
      });
      function formatStepStatus(status) {
        if (status === "success") {
          return "Done";
        }
        if (status === "failed") {
          return "Failed";
        }
        return "Pending";
      }
      const errorDetailText = computed(() => {
        const currentError = props.error;
        if (!currentError) {
          return "";
        }
        const lines = [
          "Initialization Steps:"
        ];
        if (initializationSteps.value.length) {
          initializationSteps.value.forEach((step) => {
            const detail = step.detail ? ` (${step.detail})` : "";
            lines.push(`- [${formatStepStatus(step.status)}] ${step.label}${detail}`);
          });
        } else {
          lines.push("- (No step data)");
        }
        lines.push("");
        lines.push("Technical Details:");
        lines.push(...[
          `Error: ${currentError.message}`,
          `Platform: ${currentError.platform}`,
          `JM-EHunter Version: ${appVersion}`,
          `Device: ${deviceName}`,
          `OS: ${operatingSystem}`,
          `URL: ${currentError.url}`,
          `Timestamp: ${currentError.timestamp}`
        ]);
        if (currentError.stack) {
          lines.push("");
          lines.push(`Stack:
${currentError.stack}`);
        }
        return lines.join("\n");
      });
      const copyErrorDetails = () => __async(null, null, function* () {
        if (!errorDetailText.value) {
          return;
        }
        try {
          yield navigator.clipboard.writeText(errorDetailText.value);
          copied.value = true;
          window.setTimeout(() => {
            copied.value = false;
          }, 1500);
        } catch (e) {
          copied.value = false;
        }
      });
      return (_ctx, _cache) => {
        return __props.isLoading ? (openBlock(), createElementBlock("div", _hoisted_1$b, [..._cache[0] || (_cache[0] = [
          createStaticVNode('<div class="ehunter-loading-view" data-v-5a40b588><div class="loading-animation" data-v-5a40b588><div class="book" data-v-5a40b588><div class="book__page" data-v-5a40b588></div><div class="book__page" data-v-5a40b588></div><div class="book__page" data-v-5a40b588></div></div><h4 data-v-5a40b588>Reading</h4></div></div>', 1)
        ])])) : __props.error ? (openBlock(), createElementBlock("div", _hoisted_2$7, [
          createBaseVNode("div", { class: "error-header" }, [
            _cache[1] || (_cache[1] = createBaseVNode("h3", null, "Initialization Error", -1)),
            createBaseVNode("button", {
              onClick: onClose,
              class: "close-button",
              "aria-label": "Close"
            }, "x")
          ]),
          _cache[11] || (_cache[11] = createBaseVNode("p", { class: "feedback-link" }, [
            createBaseVNode("strong", null, "Feedback / Bug Report:"),
            createBaseVNode("a", {
              href: "https://github.com/FPV-G/JM-EHunter/issues",
              target: "_blank",
              rel: "noopener noreferrer"
            }, "Open GitHub Issues")
          ], -1)),
          createBaseVNode("p", _hoisted_3$6, toDisplayString(__props.error.message), 1),
          initializationSteps.value.length ? (openBlock(), createElementBlock("div", _hoisted_4$4, [
            _cache[2] || (_cache[2] = createBaseVNode("h4", null, "Initialization Steps", -1)),
            createBaseVNode("ul", null, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(initializationSteps.value, (step) => {
                return openBlock(), createElementBlock("li", {
                  key: step.id
                }, [
                  createBaseVNode("span", {
                    class: normalizeClass(["step-status", `step-status--${step.status}`])
                  }, toDisplayString(formatStepStatus(step.status)), 3),
                  createBaseVNode("span", _hoisted_5$2, toDisplayString(step.label), 1),
                  step.detail ? (openBlock(), createElementBlock("span", _hoisted_6$1, "- " + toDisplayString(step.detail), 1)) : createCommentVNode("", true)
                ]);
              }), 128))
            ])
          ])) : createCommentVNode("", true),
          createBaseVNode("details", _hoisted_7$1, [
            createBaseVNode("summary", null, [
              _cache[3] || (_cache[3] = createBaseVNode("span", null, "Technical Details (for bug reports)", -1)),
              createBaseVNode("button", {
                class: "copy-button",
                onClick: withModifiers(copyErrorDetails, ["stop"])
              }, toDisplayString(copyButtonText.value), 1)
            ]),
            createBaseVNode("div", _hoisted_8$1, [
              createBaseVNode("p", null, [
                _cache[4] || (_cache[4] = createBaseVNode("strong", null, "Error:", -1)),
                createTextVNode(" " + toDisplayString(__props.error.message), 1)
              ]),
              createBaseVNode("p", null, [
                _cache[5] || (_cache[5] = createBaseVNode("strong", null, "Platform:", -1)),
                createTextVNode(" " + toDisplayString(__props.error.platform), 1)
              ]),
              createBaseVNode("p", null, [
                _cache[6] || (_cache[6] = createBaseVNode("strong", null, "JM-EHunter Version:", -1)),
                createTextVNode(" " + toDisplayString(unref(appVersion)), 1)
              ]),
              createBaseVNode("p", null, [
                _cache[7] || (_cache[7] = createBaseVNode("strong", null, "Device:", -1)),
                createTextVNode(" " + toDisplayString(unref(deviceName)), 1)
              ]),
              createBaseVNode("p", null, [
                _cache[8] || (_cache[8] = createBaseVNode("strong", null, "OS:", -1)),
                createTextVNode(" " + toDisplayString(unref(operatingSystem)), 1)
              ]),
              createBaseVNode("p", null, [
                _cache[9] || (_cache[9] = createBaseVNode("strong", null, "URL:", -1)),
                createTextVNode(" " + toDisplayString(__props.error.url), 1)
              ]),
              createBaseVNode("p", null, [
                _cache[10] || (_cache[10] = createBaseVNode("strong", null, "Timestamp:", -1)),
                createTextVNode(" " + toDisplayString(__props.error.timestamp), 1)
              ]),
              __props.error.stack ? (openBlock(), createElementBlock("pre", _hoisted_9$1, toDisplayString(__props.error.stack), 1)) : createCommentVNode("", true)
            ])
          ])
        ])) : renderSlot(_ctx.$slots, "default", { key: 2 }, void 0);
      };
    }
  });
  const LoadingView = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-5a40b588"]]);
  function clamp$1(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }
  function usePageMenu(options) {
    const { pageViewRef, menuOwnerId } = options;
    const menuOpen = /* @__PURE__ */ ref(false);
    const menuAnchorX = /* @__PURE__ */ ref(12);
    const menuAnchorY = /* @__PURE__ */ ref(12);
    const menuAnchorStyle = computed(() => ({
      left: `${menuAnchorX.value}px`,
      top: `${menuAnchorY.value}px`
    }));
    function getPageRect() {
      var _a2;
      return ((_a2 = pageViewRef.value) == null ? void 0 : _a2.getBoundingClientRect()) || null;
    }
    function positionMenu(clientX, clientY) {
      const rect2 = getPageRect();
      if (!rect2) {
        menuAnchorX.value = 12;
        menuAnchorY.value = 12;
        return;
      }
      menuAnchorX.value = clamp$1(clientX - rect2.left, 8, Math.max(8, rect2.width - 8));
      menuAnchorY.value = clamp$1(clientY - rect2.top, 8, Math.max(8, rect2.height - 8));
    }
    function openMenuAt(clientX, clientY) {
      document.dispatchEvent(new CustomEvent("ehunter:page-menu-open", {
        detail: { owner: menuOwnerId }
      }));
      positionMenu(clientX, clientY);
      menuOpen.value = true;
    }
    function closeMenu() {
      menuOpen.value = false;
    }
    function onOtherPageMenuOpen(e) {
      var _a2;
      if (((_a2 = e.detail) == null ? void 0 : _a2.owner) !== menuOwnerId && menuOpen.value) {
        closeMenu();
      }
    }
    function onDocumentClick(e) {
      if (!menuOpen.value) {
        return;
      }
      const root = pageViewRef.value;
      const target2 = e.target;
      if (!root || !target2) {
        closeMenu();
        return;
      }
      const menuAnchor = root.querySelector(".menu-anchor");
      if (menuAnchor && menuAnchor.contains(target2)) {
        return;
      }
      closeMenu();
    }
    onMounted(() => {
      document.addEventListener("ehunter:page-menu-open", onOtherPageMenuOpen);
      document.addEventListener("click", onDocumentClick, true);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("ehunter:page-menu-open", onOtherPageMenuOpen);
      document.removeEventListener("click", onDocumentClick, true);
    });
    return {
      menuOpen,
      menuAnchorStyle,
      openMenuAt,
      closeMenu
    };
  }
  class Logger {
    /**
     * 在页面侧执行 console.log
     * @param {string} code - 要执行的代码字符串
     */
    executeInPage(code2) {
      const script = document.createElement("script");
      script.textContent = code2;
      (document.head || document.documentElement).appendChild(script);
      script.remove();
    }
    /**
     * 序列化对象为字符串，用于在页面侧打印
     * @param {any} obj - 要序列化的对象
     * @returns {string}
     */
    serializeForPage(obj) {
      if (obj === null) return "null";
      if (obj === void 0) return "undefined";
      if (typeof obj === "string") return JSON.stringify(obj);
      if (typeof obj === "number" || typeof obj === "boolean") return String(obj);
      if (typeof obj === "function") return obj.toString();
      try {
        return JSON.stringify(obj, null, 2);
      } catch (e) {
        return String(obj);
      }
    }
    logText(tag, text2) {
      const tagStr = JSON.stringify(`[${tag}]`);
      const textStr = JSON.stringify(String(text2));
      const code2 = `console.log('%c' + ${tagStr} + ' %c' + ${textStr}, 'color:red', 'color:black');`;
      this.executeInPage(code2);
    }
    logObj(tag, obj, str = false) {
      this.logText(tag, ":");
      const serialized = this.serializeForPage(obj);
      const code2 = str ? `console.log(JSON.parse(${JSON.stringify(serialized)}));` : `console.log(${serialized});`;
      this.executeInPage(code2);
      this.logText(tag, "----------");
    }
  }
  let instance = new Logger();
  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }
  function useMagnifier(options) {
    const {
      pageViewRef,
      imgRef,
      magnifierCanvasRef,
      imgSrc,
      isDesktopPointer,
      magnifierZoom,
      magnifierAreaSize,
      pendingRevealDelayMs: pendingRevealDelayMs2,
      lensGap: lensGap2,
      onSyncEnabled
    } = options;
    const magnifierEnabled = /* @__PURE__ */ ref(false);
    const pointerX = /* @__PURE__ */ ref(0);
    const pointerY = /* @__PURE__ */ ref(0);
    const hasPointerInView = /* @__PURE__ */ ref(false);
    const lensSide = /* @__PURE__ */ ref("right");
    const lensX = /* @__PURE__ */ ref(0);
    const lensY = /* @__PURE__ */ ref(0);
    const lensWarmState = /* @__PURE__ */ ref("pending");
    const magnifierReady = /* @__PURE__ */ ref(false);
    const showPendingIndicator = /* @__PURE__ */ ref(false);
    const pendingRevealTimerId = /* @__PURE__ */ ref(null);
    const magnifierWarmToken = /* @__PURE__ */ ref(0);
    const focusBoxSize = computed(() => magnifierAreaSize.value);
    const lensSize = computed(() => magnifierAreaSize.value * magnifierZoom.value);
    const showFocusIndicator = computed(() => {
      return isDesktopPointer.value && magnifierEnabled.value && hasPointerInView.value && lensWarmState.value === "ready";
    });
    const showMagnifierLens = computed(() => {
      return isDesktopPointer.value && magnifierEnabled.value && hasPointerInView.value;
    });
    const showMagnifierPending = computed(() => {
      return showMagnifierLens.value && lensWarmState.value === "pending" && showPendingIndicator.value;
    });
    function getPageRect() {
      var _a2;
      return ((_a2 = pageViewRef.value) == null ? void 0 : _a2.getBoundingClientRect()) || null;
    }
    const focusIndicatorStyle = computed(() => {
      const rect2 = getPageRect();
      if (!rect2) {
        return {};
      }
      const half2 = focusBoxSize.value / 2;
      const x2 = clamp(pointerX.value - rect2.left - half2, 0, rect2.width - focusBoxSize.value);
      const y = clamp(pointerY.value - rect2.top - half2, 0, rect2.height - focusBoxSize.value);
      return {
        width: `${focusBoxSize.value}px`,
        height: `${focusBoxSize.value}px`,
        transform: `translate(${x2}px, ${y}px)`
      };
    });
    const magnifierLensStyle = computed(() => {
      const rect2 = getPageRect();
      if (!rect2) {
        return {};
      }
      return {
        width: `${lensSize.value}px`,
        height: `${lensSize.value}px`,
        transform: `translate(${lensX.value}px, ${lensY.value}px)`
      };
    });
    function clearPendingRevealTimer() {
      if (pendingRevealTimerId.value !== null) {
        window.clearTimeout(pendingRevealTimerId.value);
        pendingRevealTimerId.value = null;
      }
    }
    function waitForImageLoad(imgEl) {
      if (imgEl.complete && imgEl.naturalWidth > 0) {
        return Promise.resolve();
      }
      return new Promise((resolve, reject) => {
        const onLoad = () => {
          cleanup();
          resolve();
        };
        const onError = () => {
          cleanup();
          reject(new Error("IMG_LOAD_FAILED"));
        };
        const cleanup = () => {
          imgEl.removeEventListener("load", onLoad);
          imgEl.removeEventListener("error", onError);
        };
        imgEl.addEventListener("load", onLoad, { once: true });
        imgEl.addEventListener("error", onError, { once: true });
      });
    }
    function warmMagnifierSource(expectedSrc) {
      return __async(this, null, function* () {
        const warmToken = ++magnifierWarmToken.value;
        magnifierReady.value = false;
        lensWarmState.value = "pending";
        yield nextTick();
        const imgEl = imgRef.value;
        if (!imgEl || imgSrc.value !== expectedSrc) {
          return;
        }
        try {
          yield waitForImageLoad(imgEl);
          if (typeof imgEl.decode === "function") {
            try {
              yield imgEl.decode();
            } catch (decodeError) {
              instance.logText("MAGNIFIER", `image decode failed: ${String(decodeError)}`);
            }
          }
          if (warmToken !== magnifierWarmToken.value || imgSrc.value !== expectedSrc) {
            return;
          }
          magnifierReady.value = true;
          lensWarmState.value = "ready";
          if (showMagnifierLens.value) {
            renderMagnifierCanvas();
          }
        } catch (warmError) {
          instance.logText("MAGNIFIER", `warm magnifier source failed: ${String(warmError)}`);
          if (warmToken !== magnifierWarmToken.value) {
            return;
          }
          magnifierReady.value = false;
          lensWarmState.value = "pending";
        }
      });
    }
    function renderMagnifierCanvas() {
      const canvas = magnifierCanvasRef.value;
      const imgEl = imgRef.value;
      const rect2 = getPageRect();
      if (!canvas || !imgEl || !rect2 || !magnifierReady.value) {
        return;
      }
      const zoom = magnifierZoom.value;
      const areaSize = magnifierAreaSize.value;
      const outputSize = areaSize * zoom;
      const dpr = window.devicePixelRatio || 1;
      const targetWidth = Math.max(1, Math.round(outputSize * dpr));
      const targetHeight = Math.max(1, Math.round(outputSize * dpr));
      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, outputSize, outputSize);
      ctx.imageSmoothingEnabled = true;
      const localX = clamp(pointerX.value - rect2.left, 0, rect2.width);
      const localY = clamp(pointerY.value - rect2.top, 0, rect2.height);
      const sourceWidthCss = Math.min(areaSize, rect2.width);
      const sourceHeightCss = Math.min(areaSize, rect2.height);
      const sourceLeftCss = clamp(localX - sourceWidthCss / 2, 0, Math.max(0, rect2.width - sourceWidthCss));
      const sourceTopCss = clamp(localY - sourceHeightCss / 2, 0, Math.max(0, rect2.height - sourceHeightCss));
      const scaleX = imgEl.naturalWidth / Math.max(1, rect2.width);
      const scaleY = imgEl.naturalHeight / Math.max(1, rect2.height);
      const sourceX = sourceLeftCss * scaleX;
      const sourceY = sourceTopCss * scaleY;
      const sourceWidth = sourceWidthCss * scaleX;
      const sourceHeight = sourceHeightCss * scaleY;
      ctx.drawImage(imgEl, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, outputSize, outputSize);
    }
    function updateLensPosition() {
      const rect2 = getPageRect();
      if (!rect2) {
        return;
      }
      const viewportPadding = 8;
      const localPointerX = clamp(pointerX.value - rect2.left, 0, rect2.width);
      const localPointerY = clamp(pointerY.value - rect2.top, 0, rect2.height);
      const focusHalf = focusBoxSize.value / 2;
      const rightCandidate = localPointerX + focusHalf + lensGap2;
      const leftCandidate = localPointerX - focusHalf - lensGap2 - lensSize.value;
      const rightOverflowViewport = rect2.left + rightCandidate + lensSize.value > window.innerWidth - viewportPadding;
      const leftOverflowViewport = rect2.left + leftCandidate < viewportPadding;
      if (rightOverflowViewport && !leftOverflowViewport) {
        lensSide.value = "left";
      } else {
        lensSide.value = "right";
      }
      lensX.value = lensSide.value === "right" ? rightCandidate : leftCandidate;
      const topCandidate = localPointerY - lensSize.value / 2;
      const minLensY = viewportPadding - rect2.top;
      const maxLensY = window.innerHeight - viewportPadding - rect2.top - lensSize.value;
      lensY.value = clamp(topCandidate, Math.min(minLensY, maxLensY), Math.max(minLensY, maxLensY));
      if (lensWarmState.value === "ready") {
        renderMagnifierCanvas();
      }
    }
    function hideMagnifierPointerArtifacts() {
      hasPointerInView.value = false;
    }
    function onMouseMove(e) {
      if (!isDesktopPointer.value || !magnifierEnabled.value) {
        return;
      }
      pointerX.value = e.clientX;
      pointerY.value = e.clientY;
      hasPointerInView.value = true;
      updateLensPosition();
    }
    function onMouseLeave() {
      hideMagnifierPointerArtifacts();
    }
    function applyEnabled(enabled) {
      magnifierEnabled.value = enabled;
      onSyncEnabled == null ? void 0 : onSyncEnabled(enabled);
      if (enabled && imgSrc.value && lensWarmState.value !== "ready") {
        void warmMagnifierSource(imgSrc.value);
      }
      if (!enabled) {
        hideMagnifierPointerArtifacts();
      }
    }
    function onMagnifierToggleSync(e) {
      var _a2;
      applyEnabled(!!((_a2 = e.detail) == null ? void 0 : _a2.enabled));
    }
    function broadcastEnabled(enabled) {
      document.dispatchEvent(new CustomEvent("ehunter:magnifier-toggle", {
        detail: { enabled }
      }));
    }
    function toggleMagnifier() {
      const nextEnabled = !magnifierEnabled.value;
      broadcastEnabled(nextEnabled);
      applyEnabled(nextEnabled);
    }
    function setEnabledFromSession(enabled) {
      applyEnabled(enabled);
    }
    watch([showMagnifierLens, lensWarmState], ([showLens, warmState]) => {
      clearPendingRevealTimer();
      showPendingIndicator.value = false;
      if (showLens && warmState === "pending") {
        pendingRevealTimerId.value = window.setTimeout(() => {
          if (showMagnifierLens.value && lensWarmState.value === "pending") {
            showPendingIndicator.value = true;
          }
        }, pendingRevealDelayMs2);
      }
    });
    watch([magnifierZoom, magnifierAreaSize, showMagnifierLens], () => {
      if (showMagnifierLens.value && lensWarmState.value === "ready") {
        renderMagnifierCanvas();
      }
    });
    watch(imgSrc, (newSrc, oldSrc) => {
      if (newSrc === oldSrc) {
        return;
      }
      magnifierReady.value = false;
      lensWarmState.value = "pending";
      if (!newSrc) {
        return;
      }
      void warmMagnifierSource(newSrc);
    });
    onMounted(() => {
      document.addEventListener("ehunter:magnifier-toggle", onMagnifierToggleSync);
    });
    onBeforeUnmount(() => {
      clearPendingRevealTimer();
      document.removeEventListener("ehunter:magnifier-toggle", onMagnifierToggleSync);
    });
    return {
      magnifierEnabled,
      lensWarmState,
      showFocusIndicator,
      showMagnifierLens,
      showMagnifierPending,
      focusIndicatorStyle,
      magnifierLensStyle,
      warmMagnifierSource,
      updateLensPosition,
      hideMagnifierPointerArtifacts,
      onMouseMove,
      onMouseLeave,
      toggleMagnifier,
      setEnabledFromSession
    };
  }
  const Utils = {
    timeout(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  };
  var ImgLoadStatus = /* @__PURE__ */ ((ImgLoadStatus2) => {
    ImgLoadStatus2[ImgLoadStatus2["Waiting"] = 0] = "Waiting";
    ImgLoadStatus2[ImgLoadStatus2["Loading"] = 1] = "Loading";
    ImgLoadStatus2[ImgLoadStatus2["Error"] = 2] = "Error";
    ImgLoadStatus2[ImgLoadStatus2["Loaded"] = 3] = "Loaded";
    return ImgLoadStatus2;
  })(ImgLoadStatus || {});
  function usePageImageLoader(options) {
    const { index, albumService, imgPageInfo, warmMagnifierSource } = options;
    const reloadTimes = /* @__PURE__ */ ref(0);
    const message = /* @__PURE__ */ ref("");
    const curLoadStatus = /* @__PURE__ */ ref(
      0
      /* Waiting */
    );
    const lastLoadMode = /* @__PURE__ */ ref(ImgSrcMode.Default);
    const autoRetryQueue = /* @__PURE__ */ ref([]);
    const isAutoRetryRunning = /* @__PURE__ */ ref(false);
    const isAutoRetryExhausted = /* @__PURE__ */ ref(false);
    const loadingInfo = computed(() => {
      const reloadInfo = reloadTimes.value ? `[${i18n.value.reload}-${reloadTimes.value}] ` : "";
      if (message.value) {
        return reloadInfo + message.value;
      }
      switch (curLoadStatus.value) {
        case 2:
          return reloadInfo + i18n.value.loadingImgFailed;
        case 3:
          return reloadInfo + i18n.value.imgLoaded;
        case 0:
          return reloadInfo + i18n.value.waiting;
        default:
          return reloadInfo + i18n.value.loadingImg;
      }
    });
    function getRetryPolicyOptions() {
      return {
        autoRetryByOtherSource: store.autoRetryByOtherSource,
        supportChangeSource: albumService.isSupportImgChangeSource()
      };
    }
    function buildRetryQueueAfterFailure$1(failedMode) {
      return buildRetryQueueAfterFailure(failedMode, getRetryPolicyOptions());
    }
    function loadImgSrc(mode) {
      return __async(this, null, function* () {
        lastLoadMode.value = mode;
        isAutoRetryExhausted.value = false;
        const resp = yield albumService.getImgSrc(index, mode);
        if (resp instanceof Error) {
          if (mode === ImgSrcMode.Default) {
            autoRetryQueue.value = buildRetryQueueAfterFailure$1(mode);
            yield runAutoRetryQueue();
          }
          return;
        }
        if (imgPageInfo.value.src !== resp.src) {
          storeAction.setImgPageInfoSrc(index, resp.src);
        }
        if (resp.preciseHeightOfWidth && imgPageInfo.value.preciseHeightOfWidth !== resp.preciseHeightOfWidth) {
          storeAction.setImgPageInfoPreciseHeightOfWidth(index, resp.preciseHeightOfWidth);
        }
        if (resp.src) {
          storeAction.setThumbInfoDecodedSource(index, resp.src, resp.preciseHeightOfWidth);
        }
      });
    }
    function runAutoRetryQueue() {
      return __async(this, null, function* () {
        if (isAutoRetryRunning.value) {
          return;
        }
        isAutoRetryRunning.value = true;
        try {
          while (autoRetryQueue.value.length > 0) {
            const mode = autoRetryQueue.value.shift();
            if (mode === void 0) {
              break;
            }
            const loaded2 = yield getNewImgSrc(mode, true);
            if (loaded2) {
              return;
            }
          }
          isAutoRetryExhausted.value = true;
        } finally {
          isAutoRetryRunning.value = false;
        }
      });
    }
    function getNewImgSrc(mode, isAutoRetry = false) {
      return __async(this, null, function* () {
        if (!isAutoRetry) {
          autoRetryQueue.value = [];
        }
        isAutoRetryExhausted.value = false;
        reloadTimes.value++;
        message.value = "";
        storeAction.setImgPageInfoSrc(index, "");
        curLoadStatus.value = 1;
        lastLoadMode.value = mode;
        const resp = yield albumService.getImgSrc(index, mode);
        if (resp instanceof Error) {
          switch (resp.message) {
            case "ERROR_NO_ORIGIN":
              message.value = i18n.value.noOriginalImg;
              break;
            default:
              message.value = i18n.value.loadingFailed;
          }
          if (isAutoRetry) {
            return false;
          }
          autoRetryQueue.value = buildRetryQueueAfterFailure$1(mode);
          yield runAutoRetryQueue();
          return false;
        }
        yield nextTick();
        yield Utils.timeout(300);
        if (imgPageInfo.value.src !== resp.src) {
          storeAction.setImgPageInfoSrc(index, resp.src);
        }
        if (resp.preciseHeightOfWidth && imgPageInfo.value.preciseHeightOfWidth !== resp.preciseHeightOfWidth) {
          storeAction.setImgPageInfoPreciseHeightOfWidth(index, resp.preciseHeightOfWidth);
        }
        if (resp.src) {
          storeAction.setThumbInfoDecodedSource(index, resp.src, resp.preciseHeightOfWidth);
        }
        return true;
      });
    }
    function failLoad(e) {
      e.preventDefault();
      if (imgPageInfo.value.src) {
        curLoadStatus.value = 2;
        instance.logText("LOADING", "loading image failed");
        if (!isAutoRetryExhausted.value && autoRetryQueue.value.length === 0) {
          autoRetryQueue.value = buildRetryQueueAfterFailure$1(lastLoadMode.value);
        }
        if (autoRetryQueue.value.length > 0) {
          instance.logText("LOADING", "reloading image");
          void runAutoRetryQueue();
        }
      }
    }
    function loaded() {
      curLoadStatus.value = 3;
      autoRetryQueue.value = [];
      isAutoRetryExhausted.value = false;
      if (imgPageInfo.value.src) {
        void warmMagnifierSource(imgPageInfo.value.src);
      }
    }
    return {
      curLoadStatus,
      loadingInfo,
      loadImgSrc,
      getNewImgSrc,
      failLoad,
      loaded
    };
  }
  function useTouchLongPress(options) {
    const { touchLongPressMs: touchLongPressMs2, touchMoveTolerance: touchMoveTolerance2, shouldHandle, onLongPress } = options;
    const touchLongPressTimerId = /* @__PURE__ */ ref(null);
    const touchStartX = /* @__PURE__ */ ref(0);
    const touchStartY = /* @__PURE__ */ ref(0);
    const touchMoved = /* @__PURE__ */ ref(false);
    function clearTouchLongPressTimer() {
      if (touchLongPressTimerId.value !== null) {
        window.clearTimeout(touchLongPressTimerId.value);
        touchLongPressTimerId.value = null;
      }
    }
    function onTouchStart(e) {
      if (!shouldHandle()) {
        return;
      }
      if (!e.touches || e.touches.length !== 1) {
        clearTouchLongPressTimer();
        return;
      }
      const t2 = e.touches[0];
      touchStartX.value = t2.clientX;
      touchStartY.value = t2.clientY;
      touchMoved.value = false;
      clearTouchLongPressTimer();
      touchLongPressTimerId.value = window.setTimeout(() => {
        if (!touchMoved.value) {
          onLongPress(t2.clientX, t2.clientY);
        }
        clearTouchLongPressTimer();
      }, touchLongPressMs2);
    }
    function onTouchMove(e) {
      if (touchLongPressTimerId.value === null || !e.touches || e.touches.length !== 1) {
        return;
      }
      const t2 = e.touches[0];
      const dx = Math.abs(t2.clientX - touchStartX.value);
      const dy = Math.abs(t2.clientY - touchStartY.value);
      if (dx > touchMoveTolerance2 || dy > touchMoveTolerance2) {
        touchMoved.value = true;
        clearTouchLongPressTimer();
      }
    }
    function onTouchEnd() {
      clearTouchLongPressTimer();
    }
    function onTouchCancel() {
      clearTouchLongPressTimer();
    }
    onBeforeUnmount(() => {
      clearTouchLongPressTimer();
    });
    return {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onTouchCancel,
      clearTouchLongPressTimer
    };
  }
  const _hoisted_1$a = { class: "layer preview-layer" };
  const _hoisted_2$6 = { class: "layer loading-layer" };
  const _hoisted_3$5 = { class: "index" };
  const _hoisted_4$3 = {
    key: 0,
    class: "loading-info-panel"
  };
  const _hoisted_5$1 = { class: "text" };
  const _hoisted_6 = { class: "operation" };
  const _hoisted_7 = { class: "layer img-layer" };
  const _hoisted_8 = ["src"];
  const _hoisted_9 = { class: "page-menu-options no-select" };
  const _hoisted_10 = ["title"];
  const _hoisted_11 = { key: 0 };
  const _hoisted_12 = ["disabled"];
  const _hoisted_13 = ["disabled"];
  const _hoisted_14 = ["disabled"];
  const _hoisted_15 = ["disabled"];
  const _hoisted_16 = {
    key: 0,
    class: "magnifier-pending"
  };
  const MAGNIFIER_SESSION_KEY = "__ehunterMagnifierSessionState__";
  const touchLongPressMs = 500;
  const touchMoveTolerance = 10;
  const pendingRevealDelayMs = 120;
  const lensGap = 6;
  const _sfc_main$c = /* @__PURE__ */ defineComponent({
    __name: "PageView",
    props: {
      index: {},
      active: { type: Boolean },
      activeLoad: { type: Boolean }
    },
    emits: ["clickBackground", "toggleOddEven"],
    setup(__props, { emit: __emit }) {
      const sharedMagnifierSessionHost = globalThis;
      if (!sharedMagnifierSessionHost[MAGNIFIER_SESSION_KEY]) {
        sharedMagnifierSessionHost[MAGNIFIER_SESSION_KEY] = {
          enabled: false
        };
      }
      const magnifierSessionState = sharedMagnifierSessionHost[MAGNIFIER_SESSION_KEY];
      const props = __props;
      const emit2 = __emit;
      const albumService = inject(NameAlbumService);
      const pageViewRef = /* @__PURE__ */ ref(null);
      const imgRef = /* @__PURE__ */ ref(null);
      const magnifierCanvasRef = /* @__PURE__ */ ref(null);
      const menuOwnerId = `pageview-menu-${props.index}`;
      const menuAreaSizeOptions = [50, 80, 120, 150];
      const imgPageInfo = computed(() => storeAction.getImgPageInfo(props.index));
      const isBookMode = computed(() => store.readingMode === 1);
      const isDesktopPointer = computed(() => {
        if (typeof window === "undefined" || !window.matchMedia) {
          return true;
        }
        return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      });
      const showMagnifierToggleAction = computed(() => isDesktopPointer.value);
      const showOddEvenAction = computed(() => isBookMode.value);
      const magnifierZoom = computed(() => Math.max(2, Math.min(5, Math.round(store.magnifierZoom || 3))));
      const magnifierAreaSize = computed(() => Math.max(20, Math.min(300, Math.round(store.magnifierAreaSize || 80))));
      const loadOriginalEnabled = computed(() => albumService.isSupportImgChangeSource());
      const loadOriginalDisabledReason = computed(() => i18n.value.notSupportedInCurrentPlatform || i18n.value.disabled);
      const {
        menuOpen,
        menuAnchorStyle,
        openMenuAt,
        closeMenu
      } = usePageMenu({
        pageViewRef,
        menuOwnerId
      });
      const {
        magnifierEnabled,
        lensWarmState,
        showFocusIndicator,
        showMagnifierLens,
        showMagnifierPending,
        focusIndicatorStyle,
        magnifierLensStyle,
        warmMagnifierSource,
        updateLensPosition,
        hideMagnifierPointerArtifacts,
        onMouseMove,
        onMouseLeave,
        toggleMagnifier,
        setEnabledFromSession
      } = useMagnifier({
        pageViewRef,
        imgRef,
        magnifierCanvasRef,
        imgSrc: computed(() => {
          var _a2;
          return ((_a2 = imgPageInfo.value) == null ? void 0 : _a2.src) || "";
        }),
        isDesktopPointer,
        magnifierZoom,
        magnifierAreaSize,
        pendingRevealDelayMs,
        lensGap,
        onSyncEnabled: (enabled) => {
          magnifierSessionState.enabled = enabled;
        }
      });
      const showMagnifierZoomActions = computed(() => isDesktopPointer.value && magnifierEnabled.value);
      const {
        curLoadStatus,
        loadingInfo,
        loadImgSrc,
        getNewImgSrc,
        failLoad,
        loaded
      } = usePageImageLoader({
        index: props.index,
        albumService,
        imgPageInfo,
        warmMagnifierSource
      });
      const {
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        onTouchCancel
      } = useTouchLongPress({
        touchLongPressMs,
        touchMoveTolerance,
        shouldHandle: () => !isBookMode.value && !isDesktopPointer.value,
        onLongPress: (x2, y) => openMenuAt(x2, y)
      });
      onMounted(() => {
        if (props.active && !imgPageInfo.value.src) {
          void loadImgSrc(ImgSrcMode.Default);
        } else if (imgPageInfo.value.src) {
          void warmMagnifierSource(imgPageInfo.value.src);
        }
        setEnabledFromSession(magnifierSessionState.enabled);
      });
      watch(() => props.active, (newVal) => {
        if (newVal && !imgPageInfo.value.src) {
          void loadImgSrc(ImgSrcMode.Default);
          return;
        }
        if (newVal && imgPageInfo.value.src) {
          void warmMagnifierSource(imgPageInfo.value.src);
        }
      });
      watch(() => props.index, () => {
        setEnabledFromSession(magnifierSessionState.enabled);
        hideMagnifierPointerArtifacts();
      });
      function clamp2(val, min, max) {
        return Math.max(min, Math.min(max, val));
      }
      function isInBookCenterRegion(clientY) {
        return clientY >= store.viewportHeight * 0.3 && clientY <= store.viewportHeight * 0.7;
      }
      function toggleMagnifierFromMenu() {
        if (!isDesktopPointer.value) {
          return;
        }
        toggleMagnifier();
        closeMenu();
      }
      function toggleOddEvenFromMenu() {
        emit2("toggleOddEven");
        closeMenu();
      }
      function changeMagnifierZoom(step) {
        const next = clamp2(magnifierZoom.value + step, 2, 5);
        storeAction.setMagnifierZoom(next);
        updateLensPosition();
        closeMenu();
      }
      function changeMagnifierAreaSize(step) {
        const current = magnifierAreaSize.value;
        const sorted = menuAreaSizeOptions.slice().sort((a, b) => a - b);
        if (step > 0) {
          const next = sorted.find((item) => item > current);
          if (next !== void 0) {
            storeAction.setMagnifierAreaSize(next);
          }
        } else {
          const prev = sorted.slice().reverse().find((item) => item < current);
          if (prev !== void 0) {
            storeAction.setMagnifierAreaSize(prev);
          }
        }
        updateLensPosition();
        closeMenu();
      }
      function loadOriginalFromMenu() {
        if (!loadOriginalEnabled.value) {
          return;
        }
        void getNewImgSrc(ImgSrcMode.Origin);
        closeMenu();
      }
      function onClickBg(e) {
        if (menuOpen.value) {
          closeMenu();
          return;
        }
        if (isBookMode.value) {
          if (isInBookCenterRegion(e.clientY)) {
            e.stopPropagation();
            openMenuAt(e.clientX, e.clientY);
            return;
          }
          emit2("clickBackground");
          return;
        }
        if (isDesktopPointer.value) {
          e.stopPropagation();
          openMenuAt(e.clientX, e.clientY);
          return;
        }
        emit2("clickBackground");
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("section", {
          ref_key: "pageViewRef",
          ref: pageViewRef,
          class: "page-view",
          onClick: onClickBg,
          onMousemove: _cache[10] || (_cache[10] = //@ts-ignore
          (...args) => unref(onMouseMove) && unref(onMouseMove)(...args)),
          onMouseleave: _cache[11] || (_cache[11] = //@ts-ignore
          (...args) => unref(onMouseLeave) && unref(onMouseLeave)(...args)),
          onTouchstart: _cache[12] || (_cache[12] = //@ts-ignore
          (...args) => unref(onTouchStart) && unref(onTouchStart)(...args)),
          onTouchmove: _cache[13] || (_cache[13] = //@ts-ignore
          (...args) => unref(onTouchMove) && unref(onTouchMove)(...args)),
          onTouchend: _cache[14] || (_cache[14] = //@ts-ignore
          (...args) => unref(onTouchEnd) && unref(onTouchEnd)(...args)),
          onTouchcancel: _cache[15] || (_cache[15] = //@ts-ignore
          (...args) => unref(onTouchCancel) && unref(onTouchCancel)(...args))
        }, [
          createBaseVNode("div", _hoisted_1$a, [
            createVNode(ThumbView, {
              class: "preview-thumb",
              "thumb-info": unref(store).thumbInfos[__props.index]
            }, null, 8, ["thumb-info"])
          ]),
          createBaseVNode("div", _hoisted_2$6, [
            createBaseVNode("h6", _hoisted_3$5, toDisplayString(__props.index + 1), 1),
            __props.active ? (openBlock(), createElementBlock("article", _hoisted_4$3, [
              createVNode(Transition, { name: "slide-fade" }, {
                default: withCtx(() => [
                  unref(curLoadStatus) != unref(ImgLoadStatus).Loaded ? (openBlock(), createElementBlock("p", {
                    key: 0,
                    class: "loading-info",
                    onClick: withModifiers(() => {
                    }, ["stop"])
                  }, [
                    createBaseVNode("span", _hoisted_5$1, toDisplayString(unref(loadingInfo)), 1),
                    createBaseVNode("span", _hoisted_6, [
                      unref(albumService).isSupportOriginImg() ? (openBlock(), createBlock(FlatButton, {
                        key: 0,
                        class: "tips tips-down no-margin",
                        "title-content": unref(i18n).originImgTip,
                        label: unref(i18n).originImg,
                        mode: "inline",
                        type: "positive",
                        onClick: _cache[0] || (_cache[0] = ($event) => unref(getNewImgSrc)(unref(ImgSrcMode).Origin))
                      }, null, 8, ["title-content", "label"])) : createCommentVNode("", true),
                      createVNode(FlatButton, {
                        class: "tips tips-down",
                        "title-content": unref(i18n).refreshTip,
                        label: unref(i18n).refresh,
                        mode: "inline",
                        type: "positive",
                        onClick: _cache[1] || (_cache[1] = ($event) => unref(getNewImgSrc)(unref(ImgSrcMode).Default))
                      }, null, 8, ["title-content", "label"]),
                      unref(albumService).isSupportImgChangeSource() ? (openBlock(), createBlock(FlatButton, {
                        key: 1,
                        class: "tips tips-down",
                        "title-content": unref(i18n).refreshByOtherSourceTip,
                        label: unref(i18n).refreshByOtherSource,
                        mode: "inline",
                        type: "positive",
                        onClick: _cache[2] || (_cache[2] = ($event) => unref(getNewImgSrc)(unref(ImgSrcMode).ChangeSource))
                      }, null, 8, ["title-content", "label"])) : createCommentVNode("", true)
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ])) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_7, [
            __props.active && imgPageInfo.value && imgPageInfo.value.src ? (openBlock(), createElementBlock("img", {
              key: 0,
              ref_key: "imgRef",
              ref: imgRef,
              class: "album-item",
              src: imgPageInfo.value.src,
              onLoad: _cache[3] || (_cache[3] = ($event) => unref(loaded)()),
              onError: _cache[4] || (_cache[4] = ($event) => unref(failLoad)($event))
            }, null, 40, _hoisted_8)) : createCommentVNode("", true)
          ]),
          unref(menuOpen) ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "layer menu-layer",
            onClick: _cache[9] || (_cache[9] = withModifiers(() => {
            }, ["stop"]))
          }, [
            createBaseVNode("div", {
              class: "menu-anchor",
              style: normalizeStyle(unref(menuAnchorStyle))
            }, [
              createVNode(Popover, {
                active: unref(menuOpen),
                "custom-style": { "margin-left": "0px", "margin-top": "0px" },
                onClose: unref(closeMenu)
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_9, [
                    showMagnifierToggleAction.value ? (openBlock(), createElementBlock("button", {
                      key: 0,
                      type: "button",
                      class: "item",
                      onClick: toggleMagnifierFromMenu
                    }, [
                      createBaseVNode("span", null, toDisplayString(unref(magnifierEnabled) ? unref(i18n).closeMagnifier : unref(i18n).openMagnifier), 1)
                    ])) : createCommentVNode("", true),
                    createBaseVNode("button", {
                      type: "button",
                      class: normalizeClass(["item", { disabled: !loadOriginalEnabled.value }]),
                      title: loadOriginalDisabledReason.value,
                      onClick: loadOriginalFromMenu
                    }, [
                      createBaseVNode("span", null, toDisplayString(unref(i18n).originImg), 1),
                      !loadOriginalEnabled.value ? (openBlock(), createElementBlock("small", _hoisted_11, toDisplayString(loadOriginalDisabledReason.value), 1)) : createCommentVNode("", true)
                    ], 10, _hoisted_10),
                    showOddEvenAction.value ? (openBlock(), createElementBlock("button", {
                      key: 1,
                      type: "button",
                      class: "item",
                      onClick: toggleOddEvenFromMenu
                    }, [
                      createBaseVNode("span", null, toDisplayString(unref(i18n).oddEven), 1)
                    ])) : createCommentVNode("", true),
                    showMagnifierZoomActions.value ? (openBlock(), createElementBlock("button", {
                      key: 2,
                      type: "button",
                      class: "item",
                      disabled: magnifierZoom.value >= 5,
                      onClick: _cache[5] || (_cache[5] = ($event) => changeMagnifierZoom(1))
                    }, [
                      createBaseVNode("span", null, toDisplayString(unref(i18n).zoomInMagnifier), 1)
                    ], 8, _hoisted_12)) : createCommentVNode("", true),
                    showMagnifierZoomActions.value ? (openBlock(), createElementBlock("button", {
                      key: 3,
                      type: "button",
                      class: "item",
                      disabled: magnifierZoom.value <= 2,
                      onClick: _cache[6] || (_cache[6] = ($event) => changeMagnifierZoom(-1))
                    }, [
                      createBaseVNode("span", null, toDisplayString(unref(i18n).zoomOutMagnifier), 1)
                    ], 8, _hoisted_13)) : createCommentVNode("", true),
                    showMagnifierZoomActions.value ? (openBlock(), createElementBlock("button", {
                      key: 4,
                      type: "button",
                      class: "item",
                      disabled: magnifierAreaSize.value >= 150,
                      onClick: _cache[7] || (_cache[7] = ($event) => changeMagnifierAreaSize(1))
                    }, [
                      createBaseVNode("span", null, toDisplayString(unref(i18n).increaseMagnifierArea), 1)
                    ], 8, _hoisted_14)) : createCommentVNode("", true),
                    showMagnifierZoomActions.value ? (openBlock(), createElementBlock("button", {
                      key: 5,
                      type: "button",
                      class: "item",
                      disabled: magnifierAreaSize.value <= 50,
                      onClick: _cache[8] || (_cache[8] = ($event) => changeMagnifierAreaSize(-1))
                    }, [
                      createBaseVNode("span", null, toDisplayString(unref(i18n).decreaseMagnifierArea), 1)
                    ], 8, _hoisted_15)) : createCommentVNode("", true)
                  ])
                ]),
                _: 1
              }, 8, ["active", "onClose"])
            ], 4)
          ])) : createCommentVNode("", true),
          unref(showFocusIndicator) ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: "focus-indicator",
            style: normalizeStyle(unref(focusIndicatorStyle))
          }, null, 4)) : createCommentVNode("", true),
          unref(showMagnifierLens) ? (openBlock(), createElementBlock("div", {
            key: 2,
            class: "magnifier-lens",
            style: normalizeStyle(unref(magnifierLensStyle))
          }, [
            withDirectives(createBaseVNode("canvas", {
              ref_key: "magnifierCanvasRef",
              ref: magnifierCanvasRef,
              class: "magnifier-canvas"
            }, null, 512), [
              [vShow, unref(lensWarmState) === "ready"]
            ]),
            unref(showMagnifierPending) ? (openBlock(), createElementBlock("div", _hoisted_16, [
              _cache[16] || (_cache[16] = createBaseVNode("span", { class: "spinner" }, null, -1)),
              createBaseVNode("span", null, toDisplayString(unref(i18n).loadingImg), 1)
            ])) : createCommentVNode("", true)
          ], 4)) : createCommentVNode("", true)
        ], 544);
      };
    }
  });
  const PageView = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-34f09df5"]]);
  const _hoisted_1$9 = { class: "album-scroll-view" };
  const _hoisted_2$5 = { class: "preload" };
  const _hoisted_3$4 = { class: "preload-item" };
  const updater = "album_scroll_view";
  const animationTime = 800;
  const _sfc_main$b = /* @__PURE__ */ defineComponent({
    __name: "AlbumScrollView",
    setup(__props) {
      const scrollPosition = /* @__PURE__ */ ref(0);
      const scrollView = /* @__PURE__ */ ref(null);
      const pageContainers = /* @__PURE__ */ ref(null);
      function onScrollStopped(position) {
        scrollPosition.value = position;
      }
      watch(scrollPosition, () => {
        if (!pageContainers.value) {
          return;
        }
        let cons = pageContainers.value.sort((a, b) => a.offsetTop - b.offsetTop);
        let index;
        if (cons) {
          if (scrollPosition.value !== 0) {
            const _cons = cons.concat().reverse();
            let result = cons.indexOf(
              _cons.find((item) => item.offsetTop <= scrollPosition.value + window.innerHeight)
            );
            const volIndex = result === -1 ? pageContainers.value.length - 1 : result;
            index = volIndex + computedVolFirstIndex.value;
          } else {
            index = computedVolFirstIndex.value;
          }
          if (index !== store.curViewIndex) {
            storeAction.setCurViewIndex(index, updater);
          }
        }
      });
      function scrollToCurIndex() {
        return __async(this, null, function* () {
          yield nextTick();
          if (!pageContainers.value) {
            return;
          }
          if (computedVolIndex.value == 0) {
            scrollView.value.scrollTo(0, animationTime);
            return;
          }
          const target2 = pageContainers.value[computedVolIndex.value];
          if (!target2) {
            scrollView.value.scrollTo(0, animationTime);
            return;
          }
          scrollView.value.scrollTo(
            target2.offsetTop - 100,
            animationTime
          );
        });
      }
      onMounted(() => {
        setTimeout(() => {
          scrollToCurIndex();
        }, 200);
      });
      const nearbyIndexList = computed(() => {
        let start = store.curViewIndex - store.loadNum;
        if (start < 0) {
          start = 0;
        }
        let end = store.curViewIndex + store.loadNum;
        if (end > store.pageCount - 1) {
          end = store.pageCount - 1;
        }
        let result = [];
        for (let i2 = start; i2 <= end; i2++) {
          result.push(i2);
        }
        return result;
      });
      watch(() => store.curViewIndex, (newVal, oldVal) => {
        if (store.curViewIndexUpdater !== updater) {
          scrollToCurIndex();
        }
      });
      function selectVol(volIndex) {
        storeAction.setCurViewIndex(volIndex * store.volumeSize, "scroll_view_vol");
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1$9, [
          createBaseVNode("div", _hoisted_2$5, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(computedVolPreloadPageIndexList), (i2) => {
              return openBlock(), createElementBlock("div", _hoisted_3$4, [
                createVNode(PageView, {
                  active: true,
                  index: i2
                }, null, 8, ["index"])
              ]);
            }), 256))
          ]),
          unref(store).imgPageInfos && unref(store).imgPageInfos.length > 0 ? (openBlock(), createBlock(AwesomeScrollView, {
            key: 0,
            ref_key: "scrollView",
            ref: scrollView,
            class: "scroll-view",
            "on-scroll-stopped": onScrollStopped,
            onTopIn: _cache[0] || (_cache[0] = ($event) => unref(storeAction).setTopBar(true)),
            "listen-scroll": true,
            onTopLeave: _cache[1] || (_cache[1] = ($event) => unref(storeAction).setTopBar(false))
          }, {
            default: withCtx(() => [
              createBaseVNode("h1", null, toDisplayString(unref(store).albumTitle), 1),
              unref(computedVolumeSum) > 1 ? (openBlock(), createBlock(Pagination, {
                key: 0,
                class: "top-pagination",
                "cur-index": unref(computedCurVolNo) - 1,
                "page-sum": unref(computedVolumeSum),
                onChange: selectVol
              }, null, 8, ["cur-index", "page-sum"])) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(computedVolPageIndexList), (i2) => {
                return openBlock(), createElementBlock("div", {
                  class: "page-container",
                  ref_for: true,
                  ref_key: "pageContainers",
                  ref: pageContainers,
                  key: i2,
                  style: normalizeStyle({ "width": `${unref(store).widthScale}%`, "padding-bottom": `${unref(store).widthScale * unref(storeAction).getImgPageHeightOfWidth(i2)}%`, "margin": `${unref(store).scrollPageMargin}px auto` })
                }, [
                  createVNode(PageView, {
                    index: i2,
                    active: nearbyIndexList.value.indexOf(i2) > -1
                  }, null, 8, ["index", "active"])
                ], 4);
              }), 128)),
              unref(computedVolumeSum) > 1 ? (openBlock(), createBlock(Pagination, {
                key: 1,
                class: "bottom-pagination",
                "cur-index": unref(computedCurVolNo) - 1,
                "page-sum": unref(computedVolumeSum),
                onChange: selectVol
              }, null, 8, ["cur-index", "page-sum"])) : createCommentVNode("", true)
            ]),
            _: 1
          }, 512)) : createCommentVNode("", true)
        ]);
      };
    }
  });
  const AlbumScrollView = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-c08983c3"]]);
  const _hoisted_1$8 = { class: "book-page-view" };
  const _hoisted_2$4 = {
    key: 1,
    class: "page start-page"
  };
  const _hoisted_3$3 = {
    key: 2,
    class: "page end-page"
  };
  const _sfc_main$a = /* @__PURE__ */ defineComponent({
    __name: "BookPageView",
    props: {
      index: {},
      active: { type: Boolean },
      activeLoad: { type: Boolean }
    },
    setup(__props) {
      function onToggleOddEven() {
        storeAction.toggleOddEvenFromPageMenu();
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1$8, [
          __props.index >= 0 && __props.index < unref(store).pageCount ? (openBlock(), createBlock(PageView, {
            key: 0,
            index: __props.index,
            active: __props.active,
            "active-load": __props.activeLoad,
            onToggleOddEven
          }, null, 8, ["index", "active", "active-load"])) : createCommentVNode("", true),
          __props.index == -1 ? (openBlock(), createElementBlock("div", _hoisted_2$4, [
            createBaseVNode("div", {
              class: normalizeClass(["ehunter-tag", { "left": unref(store).bookDirection === 1 }])
            }, "JM-EHUNTER", 2),
            createBaseVNode("h1", null, toDisplayString(unref(store).albumTitle), 1)
          ])) : createCommentVNode("", true),
          __props.index == unref(store).pageCount ? (openBlock(), createElementBlock("div", _hoisted_3$3, [
            createBaseVNode("div", {
              class: normalizeClass(["ehunter-tag", { "left": unref(store).bookDirection === 0 }])
            }, "JM-EHUNTER", 2),
            _cache[0] || (_cache[0] = createBaseVNode("h1", null, "END", -1))
          ])) : createCommentVNode("", true)
        ]);
      };
    }
  });
  const BookPageView = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-26accc38"]]);
  const _sfc_main$9 = /* @__PURE__ */ defineComponent({
    __name: "AlbumBookView",
    setup(__props) {
      useCssVars((_ctx) => ({
        "v78c0c054": animationDurations.value.unified
      }));
      function pageContainerStyle(page) {
        return {
          width: page.width + "px",
          height: page.height + "px",
          top: page.top + "px",
          right: page.right + "px",
          zIndex: store.pageCount - page.pageIndex
        };
      }
      function spreadStyle(spreadIndex) {
        return {
          zIndex: spreadIndex === curSpreadIndex.value ? 2 : 1,
          pointerEvents: spreadIndex === curSpreadIndex.value ? "auto" : "none"
        };
      }
      function getPagePositionRight(pageWidth, pageScreenIndex) {
        let rightPadding = (computedAlbumViewportWidth.value - pageWidth * store.pagesPerScreen) / 2;
        let nums = pageScreenIndex;
        if (store.bookDirection == 1) {
          nums = store.pagesPerScreen - nums - 1;
        }
        return rightPadding + nums * pageWidth;
      }
      function calcScreenPageSize(screen) {
        let result = [];
        if (screen.length === 0) {
          return result;
        }
        let maxPageRatio = screen.reduce((max, index) => {
          let val = index >= 0 && index < store.pageCount ? storeAction.getImgPageHeightOfWidth(index) : getBookCoverPlaceholderHeightOfWidth();
          if (val > max) {
            return val;
          }
          return max;
        }, 0);
        let pagesRatio = maxPageRatio / screen.length;
        let width = 0;
        if (pagesRatio >= computedAlbumViewportRatio.value) {
          width = computedAlbumViewportHeight.value / maxPageRatio;
        } else {
          width = computedAlbumViewportWidth.value / screen.length;
        }
        for (let i2 = 0; i2 < screen.length; i2++) {
          let pageIndex = screen[i2];
          let heightOfWidth = pageIndex >= 0 && pageIndex < store.pageCount ? storeAction.getImgPageHeightOfWidth(pageIndex) : getBookCoverPlaceholderHeightOfWidth();
          let height = width * heightOfWidth;
          let top2 = computedAlbumViewportHeight.value / 2 - height / 2;
          if (store.showTopBar) {
            top2 += store.topBarHeight;
          }
          result.push({
            pageIndex,
            height,
            width,
            top: top2,
            right: getPagePositionRight(width, i2)
          });
        }
        return result;
      }
      const cachedBookSpreadList = computed(() => {
        const spreads = buildBookSpreads({
          pageCount: store.pageCount,
          pagesPerScreen: store.pagesPerScreen,
          isChangeOddEven: store.isChangeOddEven
        });
        const currentSpreadIndex = findBookSpreadIndexByPage(spreads, store.curViewIndex);
        const preloadSpreadNum = Math.max(1, Math.ceil(store.loadNum / Math.max(1, store.pagesPerScreen)));
        const minSpreadIndex = Math.max(0, currentSpreadIndex - preloadSpreadNum);
        const maxSpreadIndex = Math.min(spreads.length - 1, currentSpreadIndex + preloadSpreadNum);
        const result = [];
        for (let spreadIndex = minSpreadIndex; spreadIndex <= maxSpreadIndex; spreadIndex++) {
          const spread = spreads[spreadIndex];
          result.push({
            spreadIndex,
            pageList: calcScreenPageSize(spread)
          });
        }
        if (!result.some((item) => item.spreadIndex === currentSpreadIndex)) {
          const activeSpread = spreads[currentSpreadIndex] || [];
          result.unshift({
            spreadIndex: currentSpreadIndex,
            pageList: calcScreenPageSize(activeSpread)
          });
        }
        return result;
      });
      const bookSpreads = computed(() => {
        return buildBookSpreads({
          pageCount: store.pageCount,
          pagesPerScreen: store.pagesPerScreen,
          isChangeOddEven: store.isChangeOddEven
        });
      });
      const curSpreadIndex = computed(() => {
        return findBookSpreadIndexByPage(bookSpreads.value, store.curViewIndex);
      });
      const spreadPageSum = computed(() => {
        return bookSpreads.value.length;
      });
      function selectSpreadIndex(spreadIndex) {
        const targetSpread = bookSpreads.value[spreadIndex];
        const targetPageIndex = pickBookSpreadAnchorPage(targetSpread, store.curViewIndex);
        storeAction.setCurViewIndex(targetPageIndex, "book-pagination");
      }
      const bookTransitionName = computed(() => {
        if (store.pageTurnAnimationMode === "none") {
          return "screen-none";
        }
        const isLogicalNextTurn = store.flipDirection === 0;
        const isRightToLeftMotion = store.physicalFlipDirection === 0;
        if (store.pageTurnAnimationMode === "slide") {
          return isLogicalNextTurn ? "screen-slide-next" : "screen-slide-prev";
        }
        if (store.pageTurnAnimationMode === "horizontal-slide") {
          const isRTL = store.bookDirection === 0;
          const isKeyboard = store.curViewIndexUpdater === "keyboard";
          if (isKeyboard && !isRTL) {
            return isRightToLeftMotion ? "screen-horizontal-ltr" : "screen-horizontal-rtl";
          }
          return isRightToLeftMotion ? "screen-horizontal-rtl" : "screen-horizontal-ltr";
        }
        if (store.pageTurnAnimationMode === "page-flip") {
          return isRightToLeftMotion ? "screen-page-flip" : "screen-page-flip-reverse";
        }
        return isRightToLeftMotion ? "screen-flip" : "screen-flip-reverse";
      });
      const animationDurations = computed(() => {
        const speed = store.animationSpeed;
        const baseDuration = 0.7;
        return {
          unified: (baseDuration / speed).toFixed(2) + "s"
        };
      });
      function onClickBg(e) {
        let y = e.clientY;
        switch (true) {
          case (y >= 0 && y < store.viewportHeight * 0.3):
            store.physicalFlipDirection = store.bookDirection === 0 ? 0 : 1;
            storeAction.setCurViewIndex(store.curViewIndex - store.pagesPerScreen, "click");
            break;
          case (y >= store.viewportHeight * 0.3 && y <= store.viewportHeight * 0.7):
            break;
          case (y >= store.viewportHeight * 0.7 && y <= store.viewportHeight):
            store.physicalFlipDirection = store.bookDirection === 0 ? 1 : 0;
            storeAction.setCurViewIndex(store.curViewIndex + store.pagesPerScreen, "click");
            break;
        }
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("section", {
          class: normalizeClass(["album-book-view", `mode-${unref(store).pageTurnAnimationMode}`]),
          onWheel: _cache[0] || (_cache[0] = //@ts-ignore
          (...args) => unref(handleWheelFlipEvent) && unref(handleWheelFlipEvent)(...args)),
          onClick: onClickBg
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(cachedBookSpreadList.value, (spread) => {
            return openBlock(), createBlock(Transition, {
              key: spread.spreadIndex,
              name: bookTransitionName.value
            }, {
              default: withCtx(() => [
                withDirectives(createBaseVNode("div", {
                  class: "book-spread",
                  style: normalizeStyle(spreadStyle(spread.spreadIndex))
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(spread.pageList, (i2) => {
                    return openBlock(), createElementBlock("div", {
                      class: "book-page-container",
                      key: `${spread.spreadIndex}-${i2.pageIndex}`,
                      style: normalizeStyle(pageContainerStyle(i2))
                    }, [
                      createVNode(BookPageView, {
                        index: i2.pageIndex,
                        active: true,
                        "active-load": true
                      }, null, 8, ["index"])
                    ], 4);
                  }), 128))
                ], 4), [
                  [vShow, spread.spreadIndex === curSpreadIndex.value]
                ])
              ]),
              _: 2
            }, 1032, ["name"]);
          }), 128)),
          createVNode(Transition, { name: "center-horizontal-fade" }, {
            default: withCtx(() => [
              unref(store).showBookPagination && spreadPageSum.value > 1 ? (openBlock(), createBlock(Pagination, {
                key: 0,
                class: "bottom-pagination",
                "cur-index": curSpreadIndex.value,
                "page-sum": spreadPageSum.value,
                onChange: selectSpreadIndex
              }, null, 8, ["cur-index", "page-sum"])) : createCommentVNode("", true)
            ]),
            _: 1
          }),
          _cache[1] || (_cache[1] = createBaseVNode("div", { class: "action-panel" }, [
            createBaseVNode("div", { class: "next" }),
            createBaseVNode("div", { class: "setting" }),
            createBaseVNode("div", { class: "pre" })
          ], -1))
        ], 34);
      };
    }
  });
  const AlbumBookView = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-c146cde5"]]);
  const _hoisted_1$7 = ["aria-label"];
  const _hoisted_2$3 = ["onClick"];
  const _hoisted_3$2 = { class: "page-label" };
  const _hoisted_4$2 = { class: "pager-row" };
  const _sfc_main$8 = /* @__PURE__ */ defineComponent({
    __name: "ThumbExpandDialog",
    emits: ["select-page"],
    setup(__props, { emit: __emit }) {
      const segmentCount = computed(() => {
        return getThumbExpandSegmentCount(store.pageCount);
      });
      const segmentIndex = computed(() => {
        return clampThumbExpandSegmentIndex(store.thumbExpandSegmentIndex, store.pageCount);
      });
      const segmentItems = computed(() => {
        return buildThumbExpandItems(store.thumbInfos, store.pageCount, segmentIndex.value);
      });
      const gridWrapRef = /* @__PURE__ */ ref(null);
      const gridColumns = /* @__PURE__ */ ref(1);
      const shouldDistributeItems = computed(() => {
        return segmentItems.value.length > Math.max(1, gridColumns.value);
      });
      const emit2 = __emit;
      watch(() => store.showThumbExpandDialog, (open) => __async(null, null, function* () {
        if (open) {
          storeAction.setThumbExpandSegmentIndex(getThumbExpandSegmentByPage(store.curViewIndex));
          yield nextTick();
          updateGridColumns();
          scrollToCurrentPage();
        }
      }));
      watch(segmentItems, () => __async(null, null, function* () {
        if (!store.showThumbExpandDialog) {
          return;
        }
        yield nextTick();
        updateGridColumns();
      }));
      onMounted(() => {
        window.addEventListener("resize", updateGridColumns);
      });
      onBeforeUnmount(() => {
        window.removeEventListener("resize", updateGridColumns);
      });
      function updateGridColumns() {
        const grid = gridWrapRef.value;
        if (!grid) {
          gridColumns.value = 1;
          return;
        }
        const columns = getComputedStyle(grid).gridTemplateColumns;
        const count = columns.split(" ").map((i2) => i2.trim()).filter(Boolean).length;
        gridColumns.value = Math.max(1, count);
      }
      function scrollToCurrentPage() {
        const grid = gridWrapRef.value;
        if (!grid) {
          return;
        }
        const activeItem = grid.querySelector(".thumb-item.active");
        if (!activeItem) {
          return;
        }
        activeItem.scrollIntoView({
          behavior: "auto",
          block: "center",
          inline: "center"
        });
      }
      function onClose() {
        storeAction.closeThumbExpandDialog();
      }
      function onSegmentChange(next) {
        storeAction.setThumbExpandSegmentIndex(Number(next));
      }
      function onSelectPage(pageNumber) {
        emit2("select-page", pageNumber);
      }
      return (_ctx, _cache) => {
        return openBlock(), createBlock(Teleport, { to: "#ehunter-app" }, [
          createVNode(Transition, {
            name: "slow-opacity-fade",
            appear: ""
          }, {
            default: withCtx(() => [
              unref(store).showThumbExpandDialog ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "thumb-expand-modal",
                onClick: withModifiers(onClose, ["self"])
              }, [
                createBaseVNode("section", {
                  class: "panel",
                  onClick: _cache[0] || (_cache[0] = withModifiers(() => {
                  }, ["stop"]))
                }, [
                  createBaseVNode("button", {
                    class: "close-btn",
                    type: "button",
                    "aria-label": unref(i18n).cancel,
                    onClick: onClose
                  }, "×", 8, _hoisted_1$7),
                  createBaseVNode("div", {
                    ref_key: "gridWrapRef",
                    ref: gridWrapRef,
                    class: normalizeClass(["grid-wrap", { distributed: shouldDistributeItems.value }])
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(segmentItems.value, (item) => {
                      return openBlock(), createElementBlock("button", {
                        key: item.pageNumber,
                        type: "button",
                        class: normalizeClass(["thumb-item", { active: item.pageNumber - 1 === unref(store).curViewIndex }]),
                        onClick: ($event) => onSelectPage(item.pageNumber)
                      }, [
                        createBaseVNode("div", {
                          class: normalizeClass(["thumb-frame", { error: item.renderState === "error" }])
                        }, [
                          createVNode(ThumbView, {
                            "thumb-info": item.thumbInfo,
                            "fallback-text": unref(i18n).loadingFailed
                          }, null, 8, ["thumb-info", "fallback-text"])
                        ], 2),
                        createBaseVNode("div", _hoisted_3$2, toDisplayString(item.pageNumber), 1)
                      ], 10, _hoisted_2$3);
                    }), 128))
                  ], 2),
                  createBaseVNode("footer", _hoisted_4$2, [
                    createVNode(Pagination, {
                      "cur-index": segmentIndex.value,
                      "page-sum": segmentCount.value,
                      onChange: onSegmentChange
                    }, null, 8, ["cur-index", "page-sum"])
                  ])
                ])
              ])) : createCommentVNode("", true)
            ]),
            _: 1
          })
        ]);
      };
    }
  });
  const ThumbExpandDialog = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-a86570b6"]]);
  const _sfc_main$7 = /* @__PURE__ */ defineComponent({
    __name: "InstructionDialog",
    setup(__props) {
      function getDialogOperations(dialogId, operations) {
        if (operations && operations.length > 0) {
          return operations;
        }
        return [{
          name: i18n.value.confirm,
          btnType: "plain",
          isCloseModal: true,
          onClick: () => {
            storeAction.closeInstructionDialog(dialogId);
          }
        }];
      }
      return (_ctx, _cache) => {
        return openBlock(true), createElementBlock(Fragment, null, renderList(unref(store).instructionDialogStack, (dialog, index) => {
          return openBlock(), createBlock(SimpleDialog, {
            key: dialog.id,
            active: true,
            title: dialog.title || unref(i18n).instructionsAndAbouts,
            "is-compulsive": dialog.isCompulsive !== false,
            "md-text": dialog.mdText,
            operations: getDialogOperations(dialog.id, dialog.operations),
            style: normalizeStyle({ zIndex: 10030 + index }),
            onClose: ($event) => unref(storeAction).closeInstructionDialog(dialog.id)
          }, null, 8, ["title", "is-compulsive", "md-text", "operations", "style", "onClose"]);
        }), 128);
      };
    }
  });
  const _sfc_main$6 = /* @__PURE__ */ defineComponent({
    __name: "SplitHandle",
    props: {
      orientation: {},
      longPressMs: { default: 500 }
    },
    emits: ["resize-start", "hover-change"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit2 = __emit;
      const active = /* @__PURE__ */ ref(false);
      function resetActiveState() {
        active.value = false;
      }
      const activator = createGestureActivator({
        longPressMs: props.longPressMs,
        onActivate: (payload) => {
          active.value = true;
          emit2("resize-start", payload);
        }
      });
      function onPointerDown(event) {
        active.value = false;
        const target2 = event.currentTarget;
        if (target2 && typeof target2.setPointerCapture === "function") {
          target2.setPointerCapture(event.pointerId);
        }
        activator.onPointerDown(event);
      }
      function onPointerMove(event) {
        activator.onPointerMove(event);
      }
      function onPointerUp() {
        resetActiveState();
        activator.onPointerUp();
      }
      function onPointerCancel() {
        resetActiveState();
        activator.onPointerCancel();
      }
      window.addEventListener("pointerup", resetActiveState);
      window.addEventListener("pointercancel", resetActiveState);
      window.addEventListener("blur", resetActiveState);
      onUnmounted(() => {
        window.removeEventListener("pointerup", resetActiveState);
        window.removeEventListener("pointercancel", resetActiveState);
        window.removeEventListener("blur", resetActiveState);
      });
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", {
          class: normalizeClass(["split-handle", [__props.orientation, { active: active.value }]]),
          onPointerdown: onPointerDown,
          onPointermove: onPointerMove,
          onPointerup: onPointerUp,
          onPointercancel: onPointerCancel,
          onMouseenter: _cache[0] || (_cache[0] = ($event) => emit2("hover-change", true)),
          onMouseleave: _cache[1] || (_cache[1] = ($event) => emit2("hover-change", false))
        }, [..._cache[2] || (_cache[2] = [
          createBaseVNode("div", { class: "grip" }, null, -1)
        ])], 34);
      };
    }
  });
  const SplitHandle = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-100ef373"]]);
  const _hoisted_1$6 = {
    key: 0,
    class: "drop-overlay"
  };
  const dragCommitThreshold = 8;
  const _sfc_main$5 = /* @__PURE__ */ defineComponent({
    __name: "DockWorkspace",
    props: {
      thumbSlot: {},
      thumbSizePx: {},
      showThumb: { type: Boolean },
      longPressMs: { default: 500 }
    },
    emits: ["request-dock", "request-resize"],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props;
      const emit2 = __emit;
      const rootRef = /* @__PURE__ */ ref(null);
      const isDragging = /* @__PURE__ */ ref(false);
      const isResizing = /* @__PURE__ */ ref(false);
      const isResizeHover = /* @__PURE__ */ ref(false);
      const previewSlot = /* @__PURE__ */ ref("left");
      const sideThumbStyle = computed(() => {
        const width = props.showThumb && (props.thumbSlot === "left" || props.thumbSlot === "right") ? `${props.thumbSizePx}px` : "0px";
        return { width };
      });
      const bottomThumbStyle = computed(() => {
        const height = props.showThumb && props.thumbSlot === "bottom" ? `${props.thumbSizePx}px` : "0px";
        return { height };
      });
      let dragStartX = 0;
      let dragStartY = 0;
      let hasDragMoved = false;
      function detectPreviewSlot(clientX, clientY) {
        if (!rootRef.value) {
          return props.thumbSlot;
        }
        const rect2 = rootRef.value.getBoundingClientRect();
        const leftDistance = clientX - rect2.left;
        const rightDistance = rect2.right - clientX;
        const bottomDistance = rect2.bottom - clientY;
        const horizontalThreshold = Math.max(120, rect2.width * 0.24);
        const bottomThreshold = Math.max(120, rect2.height * 0.24);
        const candidates = [];
        if (leftDistance <= horizontalThreshold) {
          candidates.push({ slot: "left", score: leftDistance / horizontalThreshold });
        }
        if (rightDistance <= horizontalThreshold) {
          candidates.push({ slot: "right", score: rightDistance / horizontalThreshold });
        }
        if (bottomDistance <= bottomThreshold) {
          candidates.push({ slot: "bottom", score: bottomDistance / bottomThreshold });
        }
        if (candidates.length > 0) {
          const deltaX = Math.abs(clientX - dragStartX);
          const deltaY = Math.abs(clientY - dragStartY);
          const hasBottom = candidates.some((item) => item.slot === "bottom");
          const hasSide = candidates.some((item) => item.slot === "left" || item.slot === "right");
          if (hasBottom && hasSide) {
            if (deltaX > deltaY * 1.15) {
              return leftDistance <= rightDistance ? "left" : "right";
            }
            if (deltaY > deltaX * 1.15) {
              return "bottom";
            }
          }
          candidates.sort((a, b) => a.score - b.score);
          return candidates[0].slot;
        }
        return props.thumbSlot;
      }
      function startDockDrag(payload) {
        isDragging.value = true;
        hasDragMoved = false;
        dragStartX = payload.clientX;
        dragStartY = payload.clientY;
        previewSlot.value = detectPreviewSlot(payload.clientX, payload.clientY);
        const source = payload.sourceEvent;
        Number.isFinite(source.pointerId) ? source.pointerId : -1;
        window.addEventListener("pointermove", onDragMove);
        window.addEventListener("pointerup", onDragEnd);
        window.addEventListener("pointercancel", onDragCancel);
      }
      function onDragMove(event) {
        if (!isDragging.value) {
          return;
        }
        const movedX = Math.abs(event.clientX - dragStartX);
        const movedY = Math.abs(event.clientY - dragStartY);
        if (movedX >= dragCommitThreshold || movedY >= dragCommitThreshold) {
          hasDragMoved = true;
        }
        previewSlot.value = detectPreviewSlot(event.clientX, event.clientY);
      }
      function cleanupDrag() {
        isDragging.value = false;
        window.removeEventListener("pointermove", onDragMove);
        window.removeEventListener("pointerup", onDragEnd);
        window.removeEventListener("pointercancel", onDragCancel);
      }
      function onDragEnd(event) {
        if (!isDragging.value) {
          return;
        }
        if (!hasDragMoved) {
          cleanupDrag();
          return;
        }
        const nextSlot = detectPreviewSlot(event.clientX, event.clientY);
        emit2("request-dock", nextSlot);
        cleanupDrag();
      }
      function onDragCancel() {
        cleanupDrag();
      }
      function forceStopDrag() {
        cleanupDrag();
      }
      function startResize(payload) {
        isResizing.value = true;
        document.body.style.userSelect = "none";
        const source = payload.sourceEvent;
        Number.isFinite(source.pointerId) ? source.pointerId : -1;
        window.addEventListener("pointermove", onResizeMove);
        window.addEventListener("pointerup", onResizeEnd);
        window.addEventListener("pointercancel", onResizeEnd);
      }
      function onResizeMove(event) {
        if (!isResizing.value || !rootRef.value) {
          return;
        }
        const rect2 = rootRef.value.getBoundingClientRect();
        let next = props.thumbSizePx;
        if (props.thumbSlot === "left") {
          next = event.clientX - rect2.left;
        } else if (props.thumbSlot === "right") {
          next = rect2.right - event.clientX;
        } else {
          next = rect2.bottom - event.clientY;
        }
        emit2("request-resize", next);
      }
      function onResizeEnd() {
        isResizing.value = false;
        document.body.style.userSelect = "";
        window.removeEventListener("pointermove", onResizeMove);
        window.removeEventListener("pointerup", onResizeEnd);
        window.removeEventListener("pointercancel", onResizeEnd);
      }
      function onWindowBlur() {
        forceStopDrag();
        onResizeEnd();
      }
      window.addEventListener("blur", onWindowBlur);
      onUnmounted(() => {
        document.body.style.userSelect = "";
        window.removeEventListener("blur", onWindowBlur);
        forceStopDrag();
        onResizeEnd();
      });
      __expose({
        startDockDrag
      });
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", {
          ref_key: "rootRef",
          ref: rootRef,
          class: normalizeClass(["dock-workspace", `slot-${__props.thumbSlot}`])
        }, [
          withDirectives(createBaseVNode("div", {
            class: normalizeClass(["thumb-panel side", { collapsed: !__props.showThumb }]),
            style: normalizeStyle(sideThumbStyle.value)
          }, [
            renderSlot(_ctx.$slots, "thumb", {}, void 0)
          ], 6), [
            [vShow, __props.thumbSlot === "left" || __props.thumbSlot === "right"]
          ]),
          withDirectives(createVNode(SplitHandle, {
            orientation: "vertical",
            "long-press-ms": __props.longPressMs,
            onResizeStart: startResize,
            onHoverChange: _cache[0] || (_cache[0] = (val) => isResizeHover.value = val)
          }, null, 8, ["long-press-ms"]), [
            [vShow, __props.showThumb && (__props.thumbSlot === "left" || __props.thumbSlot === "right")]
          ]),
          createBaseVNode("div", {
            class: normalizeClass(["main-panel", { resizing: isResizeHover.value || isResizing.value }])
          }, [
            renderSlot(_ctx.$slots, "main", {}, void 0)
          ], 2),
          withDirectives(createVNode(SplitHandle, {
            orientation: "horizontal",
            "long-press-ms": __props.longPressMs,
            onResizeStart: startResize,
            onHoverChange: _cache[1] || (_cache[1] = (val) => isResizeHover.value = val)
          }, null, 8, ["long-press-ms"]), [
            [vShow, __props.showThumb && __props.thumbSlot === "bottom"]
          ]),
          withDirectives(createBaseVNode("div", {
            class: normalizeClass(["thumb-panel bottom", { collapsed: !__props.showThumb }]),
            style: normalizeStyle(bottomThumbStyle.value)
          }, [
            renderSlot(_ctx.$slots, "thumb", {}, void 0)
          ], 6), [
            [vShow, __props.thumbSlot === "bottom"]
          ]),
          isDragging.value ? (openBlock(), createElementBlock("div", _hoisted_1$6, [
            createBaseVNode("div", {
              class: normalizeClass(["drop-zone left", { active: previewSlot.value === "left" }])
            }, toDisplayString(unref(i18n).dockLeft), 3),
            createBaseVNode("div", {
              class: normalizeClass(["drop-zone right", { active: previewSlot.value === "right" }])
            }, toDisplayString(unref(i18n).dockRight), 3),
            createBaseVNode("div", {
              class: normalizeClass(["drop-zone bottom", { active: previewSlot.value === "bottom" }])
            }, toDisplayString(unref(i18n).dockBottom), 3)
          ])) : createCommentVNode("", true)
        ], 2);
      };
    }
  });
  const DockWorkspace = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-fa3343db"]]);
  const _hoisted_1$5 = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  };
  function render(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$5, [..._cache[0] || (_cache[0] = [
      createBaseVNode("path", {
        fill: "none",
        d: "M0 0h24v24H0z"
      }, null, -1),
      createBaseVNode("path", { d: "M7 14H5v5h5v-2H7zm-2-4h2V7h3V5H5zm12 7h-3v2h5v-5h-2zM14 5v2h3v3h2V5z" }, null, -1)
    ])]);
  }
  const FullScreenIcon = { render };
  const _hoisted_1$4 = { class: "reader-view" };
  const _hoisted_2$2 = { class: "main-content" };
  const _hoisted_3$1 = { class: "status-pannel" };
  const _hoisted_4$1 = ["aria-label"];
  const _hoisted_5 = { class: "progress" };
  const _sfc_main$4 = /* @__PURE__ */ defineComponent({
    __name: "ReaderView",
    setup(__props) {
      const isFullscreen = /* @__PURE__ */ ref(false);
      const dockWorkspaceRef = /* @__PURE__ */ ref(null);
      const showThumb = computed(() => {
        if (store.readingMode === 0) {
          return store.showThumbView;
        }
        return store.showBookThumbView;
      });
      function syncFullscreenState() {
        const doc2 = document;
        isFullscreen.value = !!(doc2.fullscreenElement || doc2.webkitFullscreenElement || doc2.mozFullScreenElement);
      }
      function closeReader() {
        const win = window;
        if (win.__EHUNTER_UI__) {
          win.__EHUNTER_UI__.close();
          return;
        }
        const container = document.querySelector("#ehunter-app .ehunter-container");
        if (container) {
          container.style.top = "-100%";
          document.body.style.overflow = "";
        }
      }
      function toggleFullscreen() {
        const doc2 = document;
        const isFullScreen = !!(doc2.fullscreenElement || doc2.webkitFullscreenElement || doc2.mozFullScreenElement);
        if (isFullScreen) {
          if (doc2.exitFullscreen) {
            doc2.exitFullscreen();
            return;
          }
          if (doc2.webkitExitFullscreen) {
            doc2.webkitExitFullscreen();
            return;
          }
          if (doc2.mozCancelFullScreen) {
            doc2.mozCancelFullScreen();
          }
          return;
        }
        const elem = document.querySelector(".ehunter-container");
        const target2 = elem || document.documentElement;
        if (target2.requestFullscreen) {
          target2.requestFullscreen();
          return;
        }
        if (target2.webkitRequestFullscreen) {
          target2.webkitRequestFullscreen();
          return;
        }
        if (target2.webkitRequestFullScreen) {
          target2.webkitRequestFullScreen();
          return;
        }
        if (target2.mozRequestFullScreen) {
          target2.mozRequestFullScreen();
        }
      }
      function onThumbDockDragStart(payload) {
        var _a2;
        (_a2 = dockWorkspaceRef.value) == null ? void 0 : _a2.startDockDrag(payload);
      }
      function onOpenThumbExpand() {
        storeAction.openThumbExpandDialog();
      }
      function onThumbExpandSelectPage(pageNumber) {
        storeAction.closeThumbExpandDialog();
        storeAction.setCurViewIndex(pageNumber - 1, "thumb-expand");
      }
      onMounted(() => {
        syncFullscreenState();
        document.addEventListener("fullscreenchange", syncFullscreenState);
        document.addEventListener("webkitfullscreenchange", syncFullscreenState);
        document.addEventListener("mozfullscreenchange", syncFullscreenState);
      });
      onUnmounted(() => {
        document.removeEventListener("fullscreenchange", syncFullscreenState);
        document.removeEventListener("webkitfullscreenchange", syncFullscreenState);
        document.removeEventListener("mozfullscreenchange", syncFullscreenState);
      });
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1$4, [
          createVNode(DockWorkspace, {
            ref_key: "dockWorkspaceRef",
            ref: dockWorkspaceRef,
            "thumb-slot": unref(store).thumbDockSlot,
            "thumb-size-px": unref(store).thumbDockSlot === "bottom" ? unref(store).thumbViewHeight : unref(store).thumbViewWidth,
            "show-thumb": showThumb.value,
            "long-press-ms": 500,
            onRequestDock: _cache[0] || (_cache[0] = (slot) => unref(storeAction).setThumbDockSlot(slot)),
            onRequestResize: _cache[1] || (_cache[1] = (size) => unref(storeAction).setThumbPanelSize(size))
          }, {
            thumb: withCtx(() => [
              createVNode(ThumbScrollView, {
                onDockDragStart: onThumbDockDragStart,
                onOpenThumbExpand
              })
            ]),
            main: withCtx(() => [
              createBaseVNode("div", _hoisted_2$2, [
                createVNode(TopBar, {
                  class: "top-bar",
                  onCloseJMEHunter: closeReader
                }),
                createVNode(Transition, { name: "slow-horizontal-fade" }, {
                  default: withCtx(() => [
                    unref(store).readingMode === 0 ? (openBlock(), createBlock(AlbumScrollView, {
                      key: 0,
                      class: "content scroll-mode"
                    })) : createCommentVNode("", true)
                  ]),
                  _: 1
                }),
                createVNode(Transition, { name: "slow-vertical-fade" }, {
                  default: withCtx(() => [
                    unref(store).readingMode === 1 ? (openBlock(), createBlock(AlbumBookView, {
                      key: 0,
                      class: "content book-mode"
                    })) : createCommentVNode("", true)
                  ]),
                  _: 1
                })
              ])
            ]),
            _: 1
          }, 8, ["thumb-slot", "thumb-size-px", "show-thumb"]),
          createBaseVNode("div", _hoisted_3$1, [
            createBaseVNode("button", {
              class: "full-screen",
              "aria-label": unref(i18n).fullScreen,
              onClick: toggleFullscreen,
              type: "button"
            }, [
              createVNode(unref(FullScreenIcon))
            ], 8, _hoisted_4$1),
            createBaseVNode("div", _hoisted_5, toDisplayString(`${unref(store).curViewIndex + 1} / ${unref(store).pageCount}`), 1)
          ]),
          createVNode(ThumbExpandDialog, { onSelectPage: onThumbExpandSelectPage }),
          createVNode(_sfc_main$7)
        ]);
      };
    }
  });
  const ReaderView = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-bd0ec685"]]);
  const _hoisted_1$3 = { key: 0 };
  const _hoisted_2$1 = { class: "bar" };
  const _hoisted_3 = {
    key: 1,
    class: "actions"
  };
  const _hoisted_4 = ["onClick"];
  const _sfc_main$3 = /* @__PURE__ */ defineComponent({
    __name: "StatusNotificationItem",
    props: {
      item: {}
    },
    emits: ["dismiss", "action"],
    setup(__props) {
      const props = __props;
      const progressPercent = computed(() => {
        if (typeof props.item.progressCurrent !== "number" || typeof props.item.progressTotal !== "number" || props.item.progressTotal <= 0) {
          return 0;
        }
        return Math.max(0, Math.min(100, Math.round(props.item.progressCurrent / props.item.progressTotal * 100)));
      });
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("article", {
          class: normalizeClass(["status-notification-item", `phase-${__props.item.phase}`, `severity-${__props.item.severity}`])
        }, [
          createBaseVNode("header", null, [
            createBaseVNode("strong", null, toDisplayString(__props.item.title), 1),
            createBaseVNode("button", {
              type: "button",
              class: "close",
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("dismiss", __props.item.notificationId))
            }, "×")
          ]),
          createBaseVNode("p", null, toDisplayString(__props.item.message), 1),
          typeof __props.item.progressCurrent === "number" && typeof __props.item.progressTotal === "number" ? (openBlock(), createElementBlock("footer", _hoisted_1$3, [
            createBaseVNode("span", null, toDisplayString(`${__props.item.progressCurrent} / ${__props.item.progressTotal}`), 1),
            createBaseVNode("div", _hoisted_2$1, [
              createBaseVNode("i", {
                style: normalizeStyle({ width: `${progressPercent.value}%` })
              }, null, 4)
            ])
          ])) : createCommentVNode("", true),
          __props.item.actions && __props.item.actions.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_3, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.item.actions, (action) => {
              return openBlock(), createElementBlock("button", {
                key: action.id,
                type: "button",
                class: normalizeClass(["action-btn", action.variant || "plain"]),
                onClick: ($event) => _ctx.$emit("action", __props.item.notificationId, action.id)
              }, toDisplayString(action.label), 11, _hoisted_4);
            }), 128))
          ])) : createCommentVNode("", true)
        ], 2);
      };
    }
  });
  const StatusNotificationItem = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-19f1746c"]]);
  const _hoisted_1$2 = {
    key: 0,
    class: "status-notification-stack"
  };
  const _sfc_main$2 = /* @__PURE__ */ defineComponent({
    __name: "StatusNotificationStack",
    setup(__props) {
      function dismiss(notificationId) {
        storeAction.dismissDownloadNotification(notificationId);
      }
      function onAction(notificationId, actionId) {
        storeAction.triggerDownloadNotificationAction(notificationId, actionId);
      }
      return (_ctx, _cache) => {
        return unref(store).downloadNotifications.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
          createVNode(TransitionGroup, {
            name: "vertical-list",
            tag: "div",
            class: "list"
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(store).downloadNotifications, (item) => {
                return openBlock(), createBlock(StatusNotificationItem, {
                  key: item.notificationId,
                  item,
                  onDismiss: dismiss,
                  onAction
                }, null, 8, ["item"]);
              }), 128))
            ]),
            _: 1
          })
        ])) : createCommentVNode("", true);
      };
    }
  });
  const StatusNotificationStack = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-cded4c82"]]);
  const _hoisted_1$1 = { class: "ehunter-app normalize" };
  const _hoisted_2 = {
    key: 0,
    style: { "display": "flex", "flex-direction": "row", "width": "100%", "height": "100%" }
  };
  const _sfc_main$1 = /* @__PURE__ */ defineComponent({
    __name: "App",
    setup(__props) {
      const isInited2 = /* @__PURE__ */ ref(false);
      const albumService = inject(NameAlbumService);
      onMounted(() => {
        init(albumService);
        isInited2.value = true;
      });
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1$1, [
          isInited2.value ? (openBlock(), createElementBlock("div", _hoisted_2, [
            createVNode(ReaderView),
            createVNode(StatusNotificationStack)
          ])) : createCommentVNode("", true)
        ]);
      };
    }
  });
  const _hoisted_1 = { class: "ehunter-container vue-container" };
  const _sfc_main = /* @__PURE__ */ defineComponent({
    __name: "TestApp",
    setup(__props) {
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1, [
          createVNode(_sfc_main$1)
        ]);
      };
    }
  });
  var Platform = /* @__PURE__ */ ((Platform2) => {
    Platform2["EH"] = "EH";
    Platform2["NH"] = "NH";
    Platform2["C18"] = "C18";
    Platform2["TEST"] = "TEST";
    return Platform2;
  })(Platform || {});
  class InitializationError extends Error {
    constructor(message, platform, url, steps = []) {
      super(message);
      __publicField(this, "platform");
      __publicField(this, "url");
      __publicField(this, "timestamp");
      __publicField(this, "steps");
      this.name = "InitializationError";
      this.platform = platform;
      this.url = url;
      this.timestamp = /* @__PURE__ */ new Date();
      this.steps = steps;
    }
  }
  function detectPlatform() {
    const host = window.location.host;
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    const isEhHost = hostname === "e-hentai.org" || hostname === "exhentai.org";
    const isEhReaderPage = /^\/s\/[^/]+\/\d+-\d+\/?$/.test(pathname);
    if (isEhHost && isEhReaderPage) {
      return { platform: Platform.EH, host, pathname, isAlbumPage: true };
    }
    const isNhReaderPage = /^\/g\/\d+\/\d+\/$/.test(pathname);
    if (hostname === "nhentai.net" && isNhReaderPage) {
      return { platform: Platform.NH, host, pathname, isAlbumPage: true };
    }
    const isC18Host = hostname === "18comic.vip";
    const isC18ReaderPage = /^\/photo\/\d+/.test(pathname);
    if (isC18Host && isC18ReaderPage) {
      return { platform: Platform.C18, host, pathname, isAlbumPage: true };
    }
    if (isTestEnvironmentHost(host)) {
      return { platform: Platform.TEST, host, pathname, isAlbumPage: true };
    }
    return { platform: null, host, pathname, isAlbumPage: false };
  }
  let ImgHtmlParser$1 = class ImgHtmlParser {
    constructor(html) {
      __publicField(this, "htmlText");
      __publicField(this, "html");
      __publicField(this, "document");
      __publicField(this, "i2");
      __publicField(this, "imgSizeInfo");
      this.htmlText = html.replace(/src=/g, "x-src=");
      this.html = document.createElement("html");
      this.html.innerHTML = this.htmlText;
      this.document = this.html.ownerDocument;
      this._initI2Element();
      this._initImgSizeInfo();
      return this;
    }
    _initI2Element() {
      this.i2 = this.html.querySelector("#i2");
      if (!this.i2) {
        throw new Error("ImgHtmlParser: i2 is undefined");
      }
    }
    _initImgSizeInfo() {
      this.imgSizeInfo = this.i2.children[1].textContent.split("::")[1].split("x");
    }
    getTitle() {
      let elem = this.html.querySelector("h1");
      return elem ? elem.textContent || "" : "";
    }
    getCurPageNum() {
      return Number(this.i2.getElementsByTagName("span")[0].textContent);
    }
    getPageCount() {
      return Number(this.i2.getElementsByTagName("span")[1].textContent);
    }
    getImgHeight() {
      return Number(this.imgSizeInfo[1].trim());
    }
    getImgWidth() {
      return Number(this.imgSizeInfo[0].trim());
    }
    getPreciseHeightOfWidth() {
      return Number(this.getImgHeight() / this.getImgWidth());
    }
    getIntroUrl() {
      let url = this.html.querySelectorAll(".sb")[0].children[0].getAttribute("href").replace(/^.*?org/g, "").replace(/\?p=.*?$/g, "");
      return url;
    }
    getAlbumId() {
      return this.getIntroUrl().match(/g\/\d+(?=\/)/)[0].replace("g/", "");
    }
    getImgId() {
      return window.location.pathname.split("/")[2];
    }
    getNextImgId() {
      return this.document.getElementById("i3").children[0].getAttribute("href").split("/")[4];
    }
    getImgUrl() {
      this.htmlText.match('id="img" x-src="(.*?)"');
      return RegExp.$1;
    }
    getOriginalImgUrl() {
      let items = this.html.querySelector("#i6").children;
      return items[items.length - 1].children[1].getAttribute("href");
    }
    getSourceId() {
      this.html.querySelector("#loadfail").attributes["onclick"].value.match(/nl\('(.*?)'\)/g);
      return RegExp.$1;
    }
  };
  let IntroHtmlParser$1 = class IntroHtmlParser {
    constructor(html, reqUrl) {
      __publicField(this, "html");
      __publicField(this, "reqUrl");
      this.html = document.createElement("html");
      this.reqUrl = reqUrl;
      this.html.innerHTML = html.replace(/src=/g, "x-src=");
    }
    getImgUrls() {
      if (this._isValidIntroPage()) {
        let isNew = this.html.querySelectorAll("#gdt>.gdtm").length == 0;
        if (isNew) {
          return Array.prototype.slice.call(this.html.querySelector("#gdt").children).map((item) => {
            item.innerHTML.match(/width:(.*?)px;height:(.*?)px;/g);
            const thumbHeight = Number(RegExp.$2);
            const thumbWidth = Number(RegExp.$1);
            let pageUrl = item.getAttribute("href").match(/\/s.*$/) + "";
            const thumbStyleRegex = /background:transparent\s+url\(([^)]+)\)\s*([-0-9px\s]+)no-repeat/;
            const match = item.innerHTML.match(thumbStyleRegex);
            const thumbStyle = `background:transparent url(${match[1]}) ${match[2]} no-repeat`;
            return {
              id: pageUrl,
              index: 0,
              pageUrl,
              src: "",
              thumbHeight,
              thumbWidth,
              heightOfWidth: thumbHeight / thumbWidth,
              thumbStyle
            };
          });
        } else {
          return Array.prototype.slice.call(this.html.getElementsByClassName("gdtm"), 0).map((item) => {
            item.children[0].getAttribute("style").match(/width:(.*?)px; height:(.*?)px;/g);
            const thumbHeight = Number(RegExp.$2);
            const thumbWidth = Number(RegExp.$1);
            let pageUrl = item.getElementsByTagName("a")[0].getAttribute("href").match(/\/s.*$/) + "";
            return {
              id: pageUrl,
              index: 0,
              pageUrl,
              src: "",
              thumbHeight,
              thumbWidth,
              heightOfWidth: thumbHeight / thumbWidth,
              thumbStyle: ""
            };
          });
        }
      } else {
        return [];
      }
    }
    getThumbObjList(sumOfPage, albumId) {
      return this._computeThumbList(this._getThumbImgList(albumId, sumOfPage), sumOfPage);
    }
    _getThumbKeyId() {
      let url = this.html.querySelector("#gdt").children[0].innerHTML.match(/url\(https.*?\)/g)[0].replace("url(", "").replace(")", "");
      let key = url.replace(url.match(/[0-9-]{3,20}\./)[0], "__PLACE_HOLDER__");
      return key;
    }
    _getThumbPageCount(sumOfPage) {
      if (sumOfPage < 20) {
        return 1;
      }
      let reminder = sumOfPage % 20;
      if (reminder > 1) {
        return (sumOfPage - reminder) / 20 + 1;
      } else {
        return sumOfPage / 20;
      }
    }
    _getThumbImgList(albumId, sumOfPage) {
      let thumbKeyId = this._getThumbKeyId();
      let imgList = [];
      for (let i2 = 0; i2 < this._getThumbPageCount(sumOfPage); i2++) {
        if (thumbKeyId.includes("__PLACE_HOLDER__")) {
          let url = thumbKeyId.replace("__PLACE_HOLDER__", `${albumId}-${i2 < 10 ? "0" + i2 : i2}.`);
          imgList.push(url);
        } else {
          imgList.push(`${thumbKeyId}/${albumId}-${i2 < 10 ? "0" + i2 : i2}.jpg`);
        }
      }
      return imgList;
    }
    _getTruePageIndex() {
      return Number(this.html.getElementsByClassName("ptds")[0].textContent) - 1;
    }
    _isValidIntroPage() {
      if (this.reqUrl && this.reqUrl.includes("?p=")) {
        let reqIndex = Number(this.reqUrl.match(/\?p=[0-9]+/g)[0].replace("?p=", ""));
        if (this._getTruePageIndex() !== reqIndex) {
          return false;
        }
      }
      return true;
    }
    _computeThumbList(imgList, sumOfPage) {
      let thumbObjList = [];
      for (let i2 = 0; i2 < imgList.length; i2++) {
        for (let t2 = 0; t2 < 20; t2++) {
          if (i2 !== imgList.length - 1 || t2 < (sumOfPage % 20 || 20)) {
            thumbObjList.push({
              id: imgList[i2] + t2,
              src: imgList[i2],
              mode: ThumbMode.SPIRIT,
              offset: t2 * 100,
              style: "",
              height: 0,
              width: 0
            });
          }
        }
      }
      return thumbObjList;
    }
    getMaxPageNumber() {
      const pageElements = this.html.querySelectorAll("body>.gtb .ptb td a");
      let maxPageNumber = 0;
      pageElements.forEach((element) => {
        const pageNumber = parseInt(element.textContent, 10);
        if (!isNaN(pageNumber) && pageNumber > maxPageNumber) {
          maxPageNumber = pageNumber;
        }
      });
      return maxPageNumber;
    }
  };
  class MultiAsyncReq {
    constructor(urls) {
      __publicField(this, "urls", []);
      __publicField(this, "resultMap", /* @__PURE__ */ new Map());
      __publicField(this, "fetchSetting", null);
      __publicField(this, "gen");
      this.urls = urls;
      this.fetchSetting = null;
    }
    request() {
      return new Promise((resolve, reject) => {
        this._initGenerator(resolve, reject);
        this._request();
      });
    }
    setFetchSetting(setting) {
      this.fetchSetting = setting;
      return this;
    }
    _initGenerator(resolve, reject) {
      let self2 = this;
      this.gen = (function* () {
        try {
          for (let url of self2.urls) {
            let item = yield url;
            self2.resultMap.set(item.url, item.html);
          }
          resolve(self2.resultMap);
        } catch (err2) {
          reject(err2);
        }
      })();
      this.gen.next();
    }
    _request() {
      for (let url of this.urls) {
        new TextReq(url).setFetchSetting(this.fetchSetting).request().then((html) => this.gen.next(
          { url, html },
          (err2) => this.gen.throw(err2)
        ));
      }
    }
  }
  class ReqQueue {
    constructor(urls) {
      __publicField(this, "urls", []);
      __publicField(this, "maxConcurrentedNum", 5);
      __publicField(this, "resultMap", /* @__PURE__ */ new Map());
      __publicField(this, "fetchSetting", null);
      this.urls = urls;
    }
    setNumOfConcurrented(num2) {
      this.maxConcurrentedNum = num2;
      return this;
    }
    setFetchSetting(setting) {
      this.fetchSetting = setting;
      return this;
    }
    request() {
      return new Promise((resolve, reject) => {
        let reqList = this._splitReqs();
        this._request(reqList, resolve, reject);
      });
    }
    _splitReqs() {
      if (this.urls.length < this.maxConcurrentedNum) {
        return [this.urls];
      }
      let results = [];
      let urls = JSON.parse(JSON.stringify(this.urls));
      while (true) {
        let list2 = urls.splice(0, this.maxConcurrentedNum);
        if (list2.length > 0) {
          results.push(list2);
        } else {
          return results;
        }
      }
    }
    _addMap(destMap, srcMap2) {
      srcMap2.forEach((val, key) => {
        destMap.set(key, val);
      });
      return destMap;
    }
    _request(reqList, resolve, reject) {
      if (reqList.length > 0) {
        new MultiAsyncReq(reqList[0]).setFetchSetting(this.fetchSetting).request().then((map2) => {
          this._addMap(this.resultMap, map2);
          reqList.splice(0, 1);
          this._request(reqList, resolve, reject);
        }, (err2) => {
          reject(err2);
        });
      } else {
        resolve(this.resultMap);
      }
    }
  }
  class ImgUrlListParser {
    constructor(introUrl, sumOfImgPage) {
      __publicField(this, "introUrl");
      __publicField(this, "sumOfIntroPage");
      __publicField(this, "introPageUrls");
      this.introUrl = introUrl;
      this.sumOfIntroPage = 0;
      this.introPageUrls = [];
    }
    request() {
      return __async(this, null, function* () {
        let introResultMap = yield new ReqQueue([this.introUrl]).request();
        this.sumOfIntroPage = new IntroHtmlParser$1(introResultMap.get(this.introUrl), this.introUrl).getMaxPageNumber();
        this.introPageUrls = this._getIntroPageUrls();
        let result = yield this._request();
        return result;
      });
    }
    _getIntroPageUrls() {
      let urls = [];
      for (let i2 = 0; i2 < this.sumOfIntroPage; i2++) {
        urls.push(`${this.introUrl}?p=${i2}`);
      }
      return urls;
    }
    _request() {
      return __async(this, null, function* () {
        let resultMap = yield new ReqQueue(this.introPageUrls).request();
        let result = this.introPageUrls.reduce((imgUrls, introUrl) => {
          imgUrls = imgUrls.concat(new IntroHtmlParser$1(resultMap.get(introUrl), introUrl).getImgUrls());
          return imgUrls;
        }, []);
        let index = 0;
        result.forEach((i2) => {
          i2.index = index++;
        });
        return result;
      });
    }
  }
  const EH_INITIALIZATION_STEPS = [
    { id: "parseImagePageMetadata", label: "Parse image page metadata", order: 1 },
    { id: "fetchIntroPages", label: "Fetch intro pages", order: 2 },
    { id: "extractImagePagesAndThumbnails", label: "Extract image pages and thumbnails", order: 3 }
  ];
  const NH_INITIALIZATION_STEPS = [
    { id: "parseImagePageMetadata", label: "Parse image page metadata", order: 1 },
    { id: "fetchIntroPage", label: "Fetch intro page", order: 2 },
    { id: "extractTitle", label: "Extract title", order: 3 },
    { id: "extractImagePagesAndThumbnails", label: "Extract image pages and thumbnails", order: 4 }
  ];
  const C18_INITIALIZATION_STEPS = [
    { id: "parseReadingPageMetadata", label: "Parse reading page metadata", order: 1 },
    { id: "extractImagePages", label: "Extract image pages from DOM", order: 2 },
    { id: "buildThumbnails", label: "Build thumbnails", order: 3 }
  ];
  function createStepMap(stepDefinitions) {
    return stepDefinitions.reduce((map2, step) => {
      map2[step.id] = step;
      return map2;
    }, {});
  }
  function createStepUpdate(step, status, detail) {
    return { id: step.id, label: step.label, order: step.order, status, detail };
  }
  function markCurrentPendingStepFailed(stepOrder, stepStatus, stepMap, reason, reportStep) {
    const currentStepId = stepOrder.find((stepId) => stepStatus[stepId] === "pending");
    if (!currentStepId) return;
    const step = stepMap[currentStepId];
    if (!step) return;
    reportStep(createStepUpdate(step, "failed", reason));
  }
  const MOCK_THUMB_PARSE_ERROR_QUERY_KEY = "ehunterMockThumbParseError";
  function shouldMockThumbParseError() {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get(MOCK_THUMB_PARSE_ERROR_QUERY_KEY) === "1";
    } catch (e) {
      return false;
    }
  }
  class EHAlbumServiceImpl {
    constructor() {
      __publicField(this, "imgHtmlParser");
      __publicField(this, "thumbInfos", []);
      __publicField(this, "imgPageInfos", []);
      __publicField(this, "pageCount", 0);
      __publicField(this, "introUrl", "");
      __publicField(this, "albumId", "");
      __publicField(this, "curPageIndex", 0);
      __publicField(this, "title", "");
      __publicField(this, "isInitialized", false);
      __publicField(this, "reportInitializationStep", () => {
      });
      __publicField(this, "initializationStepStatus", {});
      __publicField(this, "initializationStepOrder", EH_INITIALIZATION_STEPS.map((step) => step.id));
      __publicField(this, "initializationStepMap", createStepMap(EH_INITIALIZATION_STEPS));
      const htmlText = document.documentElement.outerHTML;
      this.imgHtmlParser = new ImgHtmlParser$1(htmlText);
    }
    isSupportOriginImg() {
      return true;
    }
    isSupportImgChangeSource() {
      return true;
    }
    isSupportThumbView() {
      return true;
    }
    getTitle() {
      return this.title;
    }
    getAlbumId() {
      return this.albumId;
    }
    getPageCount() {
      return this.pageCount;
    }
    getCurPageIndex() {
      return this.curPageIndex;
    }
    setInitializationStepReporter(reporter) {
      this.reportInitializationStep = reporter;
    }
    updateInitializationStep(step) {
      this.initializationStepStatus[step.id] = step.status;
      this.reportInitializationStep(step);
    }
    failCurrentInitializationStep(reason) {
      markCurrentPendingStepFailed(
        this.initializationStepOrder,
        this.initializationStepStatus,
        this.initializationStepMap,
        reason,
        (step) => this.updateInitializationStep(step)
      );
    }
    init() {
      return __async(this, null, function* () {
        this.initializationStepStatus = {};
        EH_INITIALIZATION_STEPS.forEach((step) => {
          this.updateInitializationStep(createStepUpdate(step, "pending"));
        });
        try {
          this.title = this.imgHtmlParser.getTitle();
          this.pageCount = this.imgHtmlParser.getPageCount();
          this.albumId = this.imgHtmlParser.getAlbumId();
          this.introUrl = this.imgHtmlParser.getIntroUrl();
          this.curPageIndex = this.imgHtmlParser.getCurPageNum() - 1;
          this.updateInitializationStep(
            createStepUpdate(
              this.initializationStepMap.parseImagePageMetadata,
              "success",
              `Parsed title and ${this.pageCount} pages`
            )
          );
          const imgUrlListParser = new ImgUrlListParser(this.introUrl, this.pageCount);
          if (shouldMockThumbParseError()) {
            return new Error("MOCK_THUMB_PARSE_ERROR: failed to parse thumbnail list");
          }
          this.imgPageInfos = yield imgUrlListParser.request();
          this.updateInitializationStep(
            createStepUpdate(
              this.initializationStepMap.fetchIntroPages,
              "success",
              "Intro pages fetched successfully"
            )
          );
          this.thumbInfos = this.imgPageInfos.map((imgPageInfo, index) => {
            if (imgPageInfo.thumbStyle) {
              const urlMatch = imgPageInfo.thumbStyle.match(/url\(([^)]+)\)/);
              const offsetMatch = imgPageInfo.thumbStyle.match(/-(\d+)px/);
              const src = urlMatch ? urlMatch[1] : "";
              const offset = offsetMatch ? parseInt(offsetMatch[1], 10) : 0;
              return {
                id: imgPageInfo.id,
                src,
                mode: ThumbMode.SPIRIT,
                style: imgPageInfo.thumbStyle,
                height: imgPageInfo.thumbHeight || 0,
                width: imgPageInfo.thumbWidth || 0,
                offset
              };
            } else {
              return {
                id: imgPageInfo.id,
                src: "",
                mode: ThumbMode.IMG,
                height: imgPageInfo.thumbHeight || 0,
                width: imgPageInfo.thumbWidth || 0
              };
            }
          });
          this.updateInitializationStep(
            createStepUpdate(
              this.initializationStepMap.extractImagePagesAndThumbnails,
              "success",
              `${this.imgPageInfos.length} image pages and ${this.thumbInfos.length} thumbnails extracted`
            )
          );
          this.isInitialized = true;
          console.log("EH Platform initialized successfully", {
            title: this.title,
            pageCount: this.pageCount,
            albumId: this.albumId,
            curPageIndex: this.curPageIndex,
            thumbCount: this.thumbInfos.length,
            imgPageCount: this.imgPageInfos.length
          });
        } catch (error) {
          const reason = error instanceof Error ? error.message : String(error);
          this.failCurrentInitializationStep(reason);
          console.error("EH Platform initialization failed:", error);
          return error instanceof Error ? error : new Error(String(error));
        }
      });
    }
    getThumbInfos(isDisableCache) {
      return this.thumbInfos;
    }
    getImgPageInfos() {
      return this.imgPageInfos;
    }
    getImgSrc(index, mode) {
      return __async(this, null, function* () {
        try {
          const imgPageInfo = this.imgPageInfos[index];
          if (!imgPageInfo) {
            return new Error(`Image page info not found for index ${index}`);
          }
          if (imgPageInfo.src && mode !== ImgSrcMode.ChangeSource && mode !== ImgSrcMode.Origin) {
            return imgPageInfo;
          }
          const req = new TextReq(imgPageInfo.pageUrl);
          const htmlText = yield req.request();
          const parser = new ImgHtmlParser$1(htmlText);
          switch (mode) {
            case ImgSrcMode.Origin:
              try {
                imgPageInfo.src = parser.getOriginalImgUrl();
              } catch (e) {
                return new Error("ERROR_NO_ORIGIN");
              }
              break;
            case ImgSrcMode.ChangeSource:
              try {
                const sourceId = parser.getSourceId();
                if (!sourceId) {
                  return new Error("ERROR_CHANGE_SOURCE");
                }
                const sourceReq = new TextReq(`${imgPageInfo.pageUrl}?nl=${sourceId}`);
                const sourceHtml = yield sourceReq.request();
                const sourceParser = new ImgHtmlParser$1(sourceHtml);
                imgPageInfo.src = sourceParser.getImgUrl();
                imgPageInfo.preciseHeightOfWidth = sourceParser.getPreciseHeightOfWidth();
                return imgPageInfo;
              } catch (e) {
                return new Error("ERROR_CHANGE_SOURCE");
              }
            default:
              imgPageInfo.src = parser.getImgUrl();
          }
          imgPageInfo.preciseHeightOfWidth = parser.getPreciseHeightOfWidth();
          return imgPageInfo;
        } catch (error) {
          return error instanceof Error ? error : new Error(String(error));
        }
      });
    }
    getPreviewThumbnailStyle(index) {
      const thumbInfo = this.thumbInfos[index];
      if (!thumbInfo || !thumbInfo.style) {
        return {
          "background-image": "",
          "background-position": "",
          "background-size": ""
        };
      }
      const styleObj = {
        "background-image": "",
        "background-position": "",
        "background-size": ""
      };
      const bgMatch = thumbInfo.style.match(/url\(([^)]+)\)\s*([-0-9px\s]+)/);
      if (bgMatch) {
        styleObj["background-image"] = `url(${bgMatch[1]})`;
        styleObj["background-position"] = bgMatch[2].trim();
      }
      return styleObj;
    }
    // Helper methods
    getIntroUrl() {
      return this.introUrl;
    }
    setIntroUrl(url) {
      this.introUrl = url;
    }
  }
  class ImgHtmlParser {
    constructor(html) {
      __publicField(this, "htmlText");
      __publicField(this, "html");
      this.htmlText = html.replace(/src=/g, "x-src=");
      this.html = document.createElement("html");
      this.html.innerHTML = this.htmlText;
      return this;
    }
    getCurPageNum() {
      return Number(this.html.querySelector(".current").textContent);
    }
    getPageCount() {
      return Number(this.html.querySelector(".num-pages").textContent);
    }
    getImgHeight() {
      return Number(this.html.querySelector("#image-container").children[0].children[0].getAttribute("height"));
    }
    getImgWidth() {
      return Number(this.html.querySelector("#image-container").children[0].children[0].getAttribute("width"));
    }
    getIntroUrl() {
      return this.html.querySelector(".go-back").getAttribute("href");
    }
    getAlbumId() {
      return this.getIntroUrl().replace(/(\/|g)/g, "");
    }
    getImgUrl() {
      return this.html.querySelector("#image-container").children[0].children[0].getAttribute("x-src");
    }
  }
  class IntroHtmlParser {
    constructor(html) {
      __publicField(this, "html");
      __publicField(this, "imgPageInfos", []);
      __publicField(this, "thumbInfos", []);
      this.html = document.createElement("html");
      this.html.innerHTML = html.replace(/src=/g, "x-src=");
      this.parseData();
    }
    getTitle() {
      return this.html.querySelector("h1").textContent;
    }
    parseData() {
      Array.prototype.slice.call(this.html.querySelectorAll(".gallerythumb"), 0).forEach((i2) => {
        const thumbSrc = i2.children[0].getAttribute("data-x-src");
        const thumbHeight = i2.children[0].getAttribute("height") * 1;
        const thumbWidth = i2.children[0].getAttribute("width") * 1;
        const pageUrl = i2.getAttribute("href");
        this.imgPageInfos.push({
          id: pageUrl,
          index: this.imgPageInfos.length,
          // set id to index
          pageUrl,
          thumbHeight,
          thumbWidth,
          thumbStyle: "",
          src: "",
          heightOfWidth: thumbHeight / thumbWidth
        });
        this.thumbInfos.push({
          id: pageUrl,
          mode: ThumbMode.IMG,
          src: thumbSrc,
          style: "",
          height: 0,
          width: 0
        });
      });
    }
    getImgPageInfos() {
      return this.imgPageInfos;
    }
    getThumbInfos() {
      return this.thumbInfos;
    }
  }
  class NHAlbumServiceImpl {
    constructor() {
      __publicField(this, "imgHtmlParser");
      __publicField(this, "thumbInfos", []);
      __publicField(this, "imgPageInfos", []);
      __publicField(this, "pageCount", 0);
      __publicField(this, "introUrl", "");
      __publicField(this, "albumId", "");
      __publicField(this, "curPageIndex", 0);
      __publicField(this, "title", "");
      __publicField(this, "reportInitializationStep", () => {
      });
      __publicField(this, "initializationStepStatus", {});
      __publicField(this, "initializationStepOrder", NH_INITIALIZATION_STEPS.map((step) => step.id));
      __publicField(this, "initializationStepMap", createStepMap(NH_INITIALIZATION_STEPS));
      const htmlText = document.documentElement.outerHTML;
      this.imgHtmlParser = new ImgHtmlParser(htmlText);
    }
    isSupportOriginImg() {
      return false;
    }
    isSupportImgChangeSource() {
      return false;
    }
    isSupportThumbView() {
      return true;
    }
    getTitle() {
      return this.title;
    }
    getAlbumId() {
      return this.albumId;
    }
    getIntroUrl() {
      return this.introUrl;
    }
    getPageCount() {
      return this.pageCount;
    }
    getCurPageIndex() {
      return this.curPageIndex;
    }
    setInitializationStepReporter(reporter) {
      this.reportInitializationStep = reporter;
    }
    updateInitializationStep(step) {
      this.initializationStepStatus[step.id] = step.status;
      this.reportInitializationStep(step);
    }
    failCurrentInitializationStep(reason) {
      markCurrentPendingStepFailed(
        this.initializationStepOrder,
        this.initializationStepStatus,
        this.initializationStepMap,
        reason,
        (step) => this.updateInitializationStep(step)
      );
    }
    init() {
      return __async(this, null, function* () {
        this.initializationStepStatus = {};
        NH_INITIALIZATION_STEPS.forEach((step) => {
          this.updateInitializationStep(createStepUpdate(step, "pending"));
        });
        try {
          this.pageCount = this.imgHtmlParser.getPageCount();
          this.albumId = this.imgHtmlParser.getAlbumId();
          this.introUrl = this.imgHtmlParser.getIntroUrl();
          this.curPageIndex = this.imgHtmlParser.getCurPageNum() - 1;
          this.updateInitializationStep(
            createStepUpdate(
              this.initializationStepMap.parseImagePageMetadata,
              "success",
              `${this.pageCount} pages detected`
            )
          );
          const introHtml = yield new TextReq(this.introUrl).request();
          this.updateInitializationStep(
            createStepUpdate(
              this.initializationStepMap.fetchIntroPage,
              "success",
              "Intro page loaded"
            )
          );
          const introParser = new IntroHtmlParser(introHtml);
          this.title = introParser.getTitle();
          if (!this.title || !this.title.trim()) {
            throw new Error("Title is empty");
          }
          this.updateInitializationStep(
            createStepUpdate(
              this.initializationStepMap.extractTitle,
              "success",
              "Title extracted successfully"
            )
          );
          this.imgPageInfos = introParser.getImgPageInfos();
          this.thumbInfos = introParser.getThumbInfos();
          this.updateInitializationStep(
            createStepUpdate(
              this.initializationStepMap.extractImagePagesAndThumbnails,
              "success",
              `${this.imgPageInfos.length} image pages and ${this.thumbInfos.length} thumbnails extracted`
            )
          );
        } catch (error) {
          const reason = error instanceof Error ? error.message : String(error);
          this.failCurrentInitializationStep(reason);
          return error instanceof Error ? error : new Error(String(error));
        }
      });
    }
    getThumbInfos(isDisableCache) {
      return this.thumbInfos;
    }
    getImgPageInfos() {
      return this.imgPageInfos;
    }
    getImgSrc(index, mode) {
      return __async(this, null, function* () {
        try {
          const imgPageInfo = this.imgPageInfos[index];
          if (!imgPageInfo) {
            return new Error(`Image page info not found for index ${index}`);
          }
          if (imgPageInfo.src) {
            return __spreadValues({}, imgPageInfo);
          }
          const req = new TextReq(imgPageInfo.pageUrl);
          req.setTimeOutTime(5);
          const htmlText = yield req.request();
          const parser = new ImgHtmlParser(htmlText);
          const imgUrl = parser.getImgUrl();
          const imgHeight = parser.getImgHeight();
          const imgWidth = parser.getImgWidth();
          this.imgPageInfos[index].src = imgUrl;
          if (imgHeight > 0 && imgWidth > 0) {
            this.imgPageInfos[index].preciseHeightOfWidth = imgHeight / imgWidth;
          }
          return __spreadValues({}, this.imgPageInfos[index]);
        } catch (error) {
          return error instanceof Error ? error : new Error(String(error));
        }
      });
    }
    getPreviewThumbnailStyle(index) {
      const thumbInfo = this.thumbInfos[index];
      return {
        "background-image": (thumbInfo == null ? void 0 : thumbInfo.src) ? `url(${thumbInfo.src})` : "",
        "background-position": "0% 0%",
        "background-size": "cover"
      };
    }
  }
  const FALLBACK_CDN = "https://cdn-msp.18comic.vip";
  const FALLBACK_RATIO = 1.42;
  function parsePageArr(html) {
    const m = html.match(/page_arr\s*=\s*(\[[^\]]*?\])/);
    if (!m) return [];
    try {
      return JSON.parse(m[1]);
    } catch (e) {
      return [];
    }
  }
  function parseCdnHost(html) {
    const m = html.match(/cdnImgHost\s*:\s*'([^']+)'/);
    if (m) return m[1];
    const m2 = html.match(/cdnImgHost\s*:\s*"([^"]+)"/);
    return m2 ? m2[1] : FALLBACK_CDN;
  }
  function parseAlbumId(html) {
    const m = html.match(/currentAid\s*:\s*'(\d+)'/);
    if (m) return m[1];
    const m2 = html.match(/currentAid\s*:\s*"(\d+)"/);
    return m2 ? m2[1] : "";
  }
  function parseScrambleId(html) {
    const match = html.match(/scramble_id\s*=\s*(\d+)/);
    return match ? Number(match[1]) : 220980;
  }
  function parseAllData(html) {
    const files = parsePageArr(html);
    if (!files.length) return null;
    const valid = files.filter((f) => !f.includes("blank") && f.endsWith(".webp"));
    if (!valid.length) return null;
    const cdn = parseCdnHost(html);
    const aid = parseAlbumId(html) || "";
    return { cdn, aid, files: valid, scrambleId: parseScrambleId(html) };
  }
  class ImgPageParser {
    constructor(html) {
      __publicField(this, "albumId", "");
      __publicField(this, "title", "");
      this.albumId = this.fromUrl();
      this.title = this.fromTitle();
    }
    fromUrl() {
      const m = window.location.pathname.match(/\/photo\/(\d+)/);
      return m ? m[1] : "";
    }
    fromTitle() {
      const h1 = document.querySelector("h1");
      if (h1 && h1.textContent) {
        const t2 = h1.textContent.split("|")[0].trim();
        if (t2) return t2;
      }
      return document.title.split("|")[0].trim();
    }
    getAlbumId() {
      return this.albumId;
    }
    getTitle() {
      return this.title;
    }
    getCurPageIndex() {
      return 0;
    }
    getPageCount() {
      const data = this.readData();
      if (data) return data.files.length;
      return document.querySelectorAll('img[id*="album_photo"]:not([src*="blank"])').length;
    }
    readData() {
      const scripts = document.querySelectorAll("script:not([src])");
      for (const s of scripts) {
        if (!s.textContent || !s.textContent.includes("page_arr")) continue;
        const d = parseAllData(s.textContent);
        if (d) return d;
      }
      const html = document.documentElement.outerHTML;
      if (html.includes("page_arr")) return parseAllData(html);
      return null;
    }
    getScrambleId() {
      var _a2, _b2;
      return (_b2 = (_a2 = this.readData()) == null ? void 0 : _a2.scrambleId) != null ? _b2 : 220980;
    }
    getFileName(index) {
      var _a2, _b2;
      return (_b2 = (_a2 = this.readData()) == null ? void 0 : _a2.files[index]) != null ? _b2 : `${String(index + 1).padStart(5, "0")}.webp`;
    }
    getPageNumber(index) {
      return this.getFileName(index).replace(/\.[^.]+(?:\?.*)?$/, "");
    }
    getImgPageInfos() {
      const data = this.readData();
      const list2 = [];
      if (data) {
        data.files.forEach((f, i2) => {
          const sourceUrl = data.cdn + "/media/photos/" + (data.aid || this.albumId) + "/" + f;
          list2.push({
            id: i2 + 1,
            index: i2,
            // JM-EHunter skips getImgSrc() when src is already populated.
            // Keep the scrambled CDN source in pageUrl and leave src empty
            // so every displayed page must pass through the decoder.
            pageUrl: sourceUrl,
            src: "",
            heightOfWidth: FALLBACK_RATIO
          });
        });
        return list2;
      }
      const imgs = document.querySelectorAll('img[id*="album_photo"]');
      let lastR = FALLBACK_RATIO;
      let cdn = FALLBACK_CDN;
      imgs.forEach((img) => {
        const el2 = img;
        const s = el2.src || "";
        if (s.includes("blank.jpg")) return;
        if (cdn === FALLBACK_CDN && s.startsWith("http")) {
          const m = s.match(/^(https?:\/\/[^\/]+)/);
          if (m) cdn = m[1];
        }
        let w = el2.naturalWidth || el2.width || 0;
        let h2 = el2.naturalHeight || el2.height || 0;
        const r = w > 0 && h2 > 0 ? h2 / w : lastR;
        if (r > 0.01) lastR = r;
        const sourceUrl = s || cdn + "/media/photos/" + this.albumId + "/" + String(list2.length + 1).padStart(5, "0") + ".webp";
        list2.push({
          id: list2.length + 1,
          index: list2.length,
          pageUrl: sourceUrl,
          src: "",
          heightOfWidth: r
        });
      });
      return list2;
    }
    getThumbInfos(pages) {
      return pages.map((p2) => {
        const ar = p2.heightOfWidth || FALLBACK_RATIO;
        const th = 140;
        return { id: p2.id, src: "", mode: ThumbMode.IMG, height: th, width: Math.round(th / ar) };
      });
    }
  }
  class C18AlbumServiceImpl {
    constructor() {
      __publicField(this, "parser", new ImgPageParser());
      __publicField(this, "thumbInfos", []);
      __publicField(this, "imgPageInfos", []);
      __publicField(this, "reportStep", () => {
      });
      __publicField(this, "stepStatus", {});
      __publicField(this, "stepOrder", C18_INITIALIZATION_STEPS.map((s) => s.id));
      __publicField(this, "stepMap", createStepMap(C18_INITIALIZATION_STEPS));
      __publicField(this, "decodedImages", /* @__PURE__ */ new Map());
      __publicField(this, "decodePromises", /* @__PURE__ */ new Map());
    }
    isSupportOriginImg() {
      return false;
    }
    isSupportImgChangeSource() {
      return false;
    }
    // Decoded page URLs are shared with the thumbnail store after each page
    // finishes loading, so previews never expose the scrambled CDN source.
    isSupportThumbView() {
      return true;
    }
    getTitle() {
      return this.parser.getTitle();
    }
    getAlbumId() {
      return this.parser.getAlbumId();
    }
    getIntroUrl() {
      return window.location.href;
    }
    getPageCount() {
      return this.imgPageInfos.length;
    }
    getCurPageIndex() {
      return 0;
    }
    setInitializationStepReporter(fn) {
      this.reportStep = fn;
    }
    step(s) {
      this.stepStatus[s.id] = s.status;
      this.reportStep(s);
    }
    fail(s) {
      markCurrentPendingStepFailed(this.stepOrder, this.stepStatus, this.stepMap, s, (c) => this.step(c));
    }
    init() {
      return __async(this, null, function* () {
        this.stepStatus = {};
        C18_INITIALIZATION_STEPS.forEach((c) => this.step(createStepUpdate(c, "pending")));
        const title = this.parser.getTitle();
        try {
          for (let retry = 0; retry < 50; retry++) {
            this.imgPageInfos = this.parser.getImgPageInfos();
            if (this.imgPageInfos.length > 0) break;
            yield new Promise((r) => setTimeout(r, 200));
          }
          if (!this.imgPageInfos.length) throw new Error("Timed out waiting for images");
          this.step(createStepUpdate(this.stepMap.parseReadingPageMetadata, "success", title + " (" + this.imgPageInfos.length + "p)"));
          this.step(createStepUpdate(this.stepMap.extractImagePages, "success", String(this.imgPageInfos.length)));
          this.thumbInfos = this.parser.getThumbInfos(this.imgPageInfos);
          this.step(createStepUpdate(this.stepMap.buildThumbnails, "success", "done"));
          console.log("JM-EHunter 18comic:", this.imgPageInfos.length, "pages");
        } catch (e) {
          this.fail(e instanceof Error ? e.message : String(e));
          return e instanceof Error ? e : new Error(String(e));
        }
      });
    }
    getThumbInfos(_) {
      return this.thumbInfos;
    }
    getImgPageInfos() {
      return this.imgPageInfos;
    }
    getSegmentCount(index) {
      const albumId = Number(this.parser.getAlbumId());
      const scrambleId = this.parser.getScrambleId();
      if (albumId < scrambleId) {
        return 0;
      }
      if (albumId < 268850) {
        return 10;
      }
      const pageWindow = typeof unsafeWindow !== "undefined" ? unsafeWindow : window;
      const md5Function = pageWindow.md5;
      if (typeof md5Function !== "function") {
        throw new Error("18comic MD5 function is not available yet");
      }
      const pageNumber = this.parser.getPageNumber(index);
      const digest = md5Function(`${albumId}${pageNumber}`);
      const moduloBase = albumId < 421926 ? 10 : 8;
      const hashedCharacterCode = digest.slice(-1).charCodeAt(0);
      const remainder = hashedCharacterCode % moduloBase;
      return remainder < 10 ? 2 + 2 * remainder : 10;
    }
    requestImageBlob(url) {
      return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
          method: "GET",
          url,
          responseType: "blob",
          onload: (response) => {
            if (response.status >= 200 && response.status < 300 && response.response instanceof Blob) {
              resolve(response.response);
              return;
            }
            reject(new Error(`Image request failed: ${response.status} ${url}`));
          },
          onerror: (response) => reject(new Error(`Image request error: ${response.status} ${url}`)),
          ontimeout: () => reject(new Error(`Image request timed out: ${url}`))
        });
      });
    }
    getCdnCandidates(url) {
      const candidates = [url];
      for (const suffix of ["", "2", "3"]) {
        const candidate = url.replace(/\/\/cdn-msp\d?\./, `//cdn-msp${suffix}.`);
        if (!candidates.includes(candidate)) {
          candidates.push(candidate);
        }
      }
      return candidates;
    }
    requestImageBlobWithRetry(url) {
      return __async(this, null, function* () {
        let lastError = new Error(`No CDN candidates for ${url}`);
        for (const candidateUrl of this.getCdnCandidates(url)) {
          try {
            return yield this.requestImageBlob(candidateUrl);
          } catch (error) {
            lastError = error;
          }
        }
        throw lastError;
      });
    }
    decodeImage(url, index) {
      return __async(this, null, function* () {
        const sourceBlob = yield this.requestImageBlobWithRetry(url);
        const sourceBitmap = yield createImageBitmap(sourceBlob);
        const segmentCount = this.getSegmentCount(index);
        const ratio2 = sourceBitmap.height / sourceBitmap.width;
        if (segmentCount === 0) {
          sourceBitmap.close();
          return { url: URL.createObjectURL(sourceBlob), ratio: ratio2 };
        }
        const canvas = document.createElement("canvas");
        canvas.width = sourceBitmap.width;
        canvas.height = sourceBitmap.height;
        const context = canvas.getContext("2d");
        if (!context) {
          sourceBitmap.close();
          throw new Error("Could not create a 2D canvas context");
        }
        const stripHeight = Math.floor(sourceBitmap.height / segmentCount);
        const remainderHeight = sourceBitmap.height % segmentCount;
        for (let segmentIndex = 0; segmentIndex < segmentCount; segmentIndex++) {
          const sourceY = sourceBitmap.height - stripHeight * (segmentIndex + 1) - remainderHeight;
          const destinationY = stripHeight * segmentIndex + (segmentIndex === 0 ? 0 : remainderHeight);
          const currentStripHeight = stripHeight + (segmentIndex === 0 ? remainderHeight : 0);
          context.drawImage(
            sourceBitmap,
            0,
            sourceY,
            sourceBitmap.width,
            currentStripHeight,
            0,
            destinationY,
            sourceBitmap.width,
            currentStripHeight
          );
        }
        sourceBitmap.close();
        const decodedBlob = yield new Promise((resolve, reject) => {
          canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Canvas export failed")), "image/webp", 0.95);
        });
        return { url: URL.createObjectURL(decodedBlob), ratio: ratio2 };
      });
    }
    getImgSrc(index, _mode) {
      return __async(this, null, function* () {
        const imagePageInfo = this.imgPageInfos[index];
        if (!imagePageInfo) {
          return new Error(`Image not found: ${index}`);
        }
        try {
          const cachedImage = this.decodedImages.get(index);
          if (cachedImage) {
            return __spreadProps(__spreadValues({}, imagePageInfo), {
              src: cachedImage.url,
              preciseHeightOfWidth: cachedImage.ratio
            });
          }
          let decodePromise = this.decodePromises.get(index);
          if (!decodePromise) {
            decodePromise = this.decodeImage(imagePageInfo.pageUrl, index);
            this.decodePromises.set(index, decodePromise);
          }
          const decodedImage = yield decodePromise;
          this.decodePromises.delete(index);
          this.decodedImages.set(index, decodedImage);
          imagePageInfo.preciseHeightOfWidth = decodedImage.ratio;
          return __spreadProps(__spreadValues({}, imagePageInfo), {
            src: decodedImage.url,
            preciseHeightOfWidth: decodedImage.ratio
          });
        } catch (error) {
          return error instanceof Error ? error : new Error(String(error));
        }
      });
    }
    getPreviewThumbnailStyle(index) {
      const t2 = this.thumbInfos[index];
      return { "background-image": t2 && t2.src ? "url(" + t2.src + ")" : "", "background-position": "center", "background-size": "contain" };
    }
  }
  let mockThumbInfos = [];
  let srcMap = { 0: "/2195608-00.jpg", 1: "/2195608-01.jpg", 2: "/2195608-02.jpg", 3: "/2195608-03.jpg" };
  for (let i2 = 0; i2 < 64; i2++) {
    mockThumbInfos.push({
      id: String(i2),
      src: srcMap[Math.floor(i2 / 20)],
      mode: 0,
      offset: i2 % 20 * 100
    });
  }
  let mockImgPageInfos = [];
  for (let i2 = 0; i2 < 64; i2++) {
    mockImgPageInfos.push({
      id: i2,
      index: i2,
      pageUrl: "/" + (i2 + 1 + "").padStart(2, "0") + ".jpg",
      src: "",
      // src: '/' + (i+1 + "").padStart(2, "0") + ".jpg",
      heightOfWidth: 1.4
    });
  }
  class TestAlbumService {
    constructor(imgHtml) {
      __publicField(this, "pageCount");
      __publicField(this, "thumbInfos");
      __publicField(this, "imgPageInfos");
      const params = new URLSearchParams(window.location.search);
      const requestedPageTotal = Number.parseInt(params.get("pageTotal") || "", 10);
      const hasValidPageTotal = Number.isFinite(requestedPageTotal) && requestedPageTotal > 0;
      const defaultPageCount = mockImgPageInfos.length;
      this.pageCount = isTestEnvironment() && hasValidPageTotal ? requestedPageTotal : defaultPageCount;
      this.thumbInfos = buildMockThumbInfos(this.pageCount);
      this.imgPageInfos = buildMockImgPageInfos(this.pageCount);
    }
    isSupportOriginImg() {
      return true;
    }
    isSupportImgChangeSource() {
      return true;
    }
    isSupportThumbView() {
      return true;
    }
    getTitle() {
      return "title";
    }
    getAlbumId() {
      return "id";
    }
    getIntroUrl() {
      return "/g/id/test/";
    }
    getPageCount() {
      return this.pageCount;
    }
    getCurPageIndex() {
      return 0;
    }
    init() {
      return __async(this, null, function* () {
        return;
      });
    }
    getThumbInfos(isDisableCache) {
      return this.thumbInfos;
    }
    getImgPageInfos() {
      return this.imgPageInfos;
    }
    getImgSrc(index, mode) {
      return __async(this, null, function* () {
        this.imgPageInfos[index].src = this.imgPageInfos[index].pageUrl;
        return this.imgPageInfos[index];
      });
    }
    getPreviewThumbnailStyle(index) {
      let imgPageInfo = this.getImgPageInfos()[index];
      let thumbInfo = this.getThumbInfos(false)[index];
      const indexInThumbSprite = index % 20;
      const sumOfThumbInSprite = this.getPageCount() - (index + 1) >= this.getPageCount() % 20 ? 20 : this.getPageCount() % 20;
      let percentage;
      if (imgPageInfo.heightOfWidth >= 1.43) {
        percentage = 1 / (sumOfThumbInSprite * (1 - 1 / imgPageInfo.heightOfWidth * (imgPageInfo.thumbHeight / (sumOfThumbInSprite * 100))));
      } else {
        percentage = 1 / (sumOfThumbInSprite - 1);
      }
      let offsetPercentage = indexInThumbSprite * percentage;
      return {
        "background-image": `url(${thumbInfo.src})`,
        "background-position": `${offsetPercentage * 100}% 0`,
        "background-size": imgPageInfo.heightOfWidth >= 1.43 ? "cover" : `${sumOfThumbInSprite * 100}%`
      };
    }
  }
  function buildMockThumbInfos(pageCount) {
    const result = [];
    const baseCount = mockThumbInfos.length;
    for (let i2 = 0; i2 < pageCount; i2++) {
      const source = mockThumbInfos[i2 % baseCount];
      result.push(__spreadProps(__spreadValues({}, source), {
        id: String(i2)
      }));
    }
    return result;
  }
  function buildMockImgPageInfos(pageCount) {
    const result = [];
    const baseCount = mockImgPageInfos.length;
    for (let i2 = 0; i2 < pageCount; i2++) {
      const source = mockImgPageInfos[i2 % baseCount];
      result.push(__spreadProps(__spreadValues({}, source), {
        id: i2,
        index: i2,
        src: ""
      }));
    }
    return result;
  }
  function createPlatformService(platform) {
    switch (platform) {
      case Platform.EH:
        return new EHAlbumServiceImpl();
      case Platform.NH:
        return new NHAlbumServiceImpl();
      case Platform.C18:
        return new C18AlbumServiceImpl(document.documentElement.innerHTML);
      case Platform.TEST:
        return new TestAlbumService("");
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }
  function initializeWithTimeout(albumService, platform) {
    return __async(this, null, function* () {
      var _a2;
      const TIMEOUT_MS = 12e4;
      const steps = [];
      const upsertStep = (update) => {
        const index = steps.findIndex((step) => step.id === update.id);
        if (index >= 0) {
          steps[index] = __spreadValues(__spreadValues({}, steps[index]), update);
          return;
        }
        steps.push(__spreadValues({}, update));
      };
      const getStepOrder = () => {
        return steps.slice().sort((a, b) => {
          var _a3, _b2;
          const orderA = (_a3 = a.order) != null ? _a3 : Number.MAX_SAFE_INTEGER;
          const orderB = (_b2 = b.order) != null ? _b2 : Number.MAX_SAFE_INTEGER;
          return orderA - orderB;
        }).map((step) => step.id);
      };
      const getStepStatusMap = () => {
        return steps.reduce((map2, step) => {
          map2[step.id] = step.status;
          return map2;
        }, {});
      };
      const getStepMap = () => {
        return steps.reduce((map2, step) => {
          map2[step.id] = { id: step.id, label: step.label, order: step.order };
          return map2;
        }, {});
      };
      const failCurrentStep = (reason) => {
        markCurrentPendingStepFailed(
          getStepOrder(),
          getStepStatusMap(),
          getStepMap(),
          reason,
          upsertStep
        );
      };
      const albumServiceWithStepReporter = albumService;
      (_a2 = albumServiceWithStepReporter.setInitializationStepReporter) == null ? void 0 : _a2.call(albumServiceWithStepReporter, upsertStep);
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          if (!steps.some((step) => step.status === "failed")) {
            failCurrentStep(`Timed out after ${TIMEOUT_MS / 1e3} seconds`);
          }
          reject(new InitializationError(
            "Platform initialization timed out after 120 seconds",
            platform,
            window.location.href,
            steps
          ));
        }, TIMEOUT_MS);
      });
      try {
        const result = yield Promise.race([
          albumService.init(),
          timeoutPromise
        ]);
        if (result instanceof Error) {
          if (!steps.some((step) => step.status === "failed")) {
            failCurrentStep(result.message);
          }
          throw new InitializationError(
            `Platform initialization failed: ${result.message}`,
            platform,
            window.location.href,
            steps
          );
        }
      } catch (error) {
        if (error instanceof InitializationError) {
          throw error;
        }
        throw new InitializationError(
          error instanceof Error ? error.message : "Unknown initialization error",
          platform,
          window.location.href,
          steps
        );
      }
    });
  }
  const NH_STYLE_ID = "ehunter-host-block-style-nh";
  const EH_SCRIPT_ID = "ehunter-host-block-script-eh";
  const NH_SCRIPT_ID = "ehunter-host-block-script-nh";
  function appendStyleOnce(id, cssText) {
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = cssText;
    (document.head || document.documentElement).appendChild(style);
  }
  function appendScriptOnce(id, scriptText) {
    if (document.getElementById(id)) return;
    const script = document.createElement("script");
    script.id = id;
    script.textContent = scriptText;
    (document.head || document.documentElement).appendChild(script);
  }
  function blockEHHostActions() {
    appendScriptOnce(EH_SCRIPT_ID, `
      if (typeof timerId === 'undefined') {
        const timerId = window.setInterval(() => {
          if (document.onkeyup) {
            window.onpopstate = null;
            window.clearInterval(timerId);
            load_image_dispatch = () => {};
            api_response = () => {};
            _load_image = () => {};
            nl = () => {};
            hookEvent = () => {};
            scroll_space = () => {};
            document.onkeydown = () => {};
            document.onkeyup = () => {};
          }
        }, 1000);
      }
    `);
  }
  function blockNHHostActions() {
    appendScriptOnce(NH_SCRIPT_ID, "console._clear = console.clear; console.clear = function () {};");
    appendStyleOnce(NH_STYLE_ID, ".ts-im-container { display: none !important; }");
  }
  function blockC18HostActions() {
    console.log("JM-EHunter: 18comic host actions initialized");
  }
  function applyPlatformHostActions(platform) {
    if (platform === Platform.EH) {
      blockEHHostActions();
      return;
    }
    if (platform === Platform.NH) {
      blockNHHostActions();
      return;
    }
    if (platform === Platform.C18) {
      blockC18HostActions();
      return;
    }
  }
  const detectionResult = detectPlatform();
  const JMEHUNTER_STATUS_KEY = "jmehunter:reader:open";
  const JMEHUNTER_SWITCH_ID = "jmehunter-switch";
  const JMEHUNTER_CONTAINER_ID = "jmehunter-app";
  const JMEHUNTER_OPEN_DURATION_MS = 720;
  const JMEHUNTER_CLOSE_DURATION_MS = 580;
  const JMEHUNTER_OPEN_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
  const JMEHUNTER_CLOSE_EASING = "cubic-bezier(0.55, 0.08, 0.68, 0.53)";
  function readJMEHunterStatus() {
    const value = PlatformService.storageGet(JMEHUNTER_STATUS_KEY, true);
    if (typeof value === "boolean") {
      return value;
    }
    if (value === "true") {
      return true;
    }
    if (value === "false") {
      return false;
    }
    return true;
  }
  function writeJMEHunterStatus(open) {
    PlatformService.storageSet(JMEHUNTER_STATUS_KEY, open);
  }
  function createEhunterSwitch(onOpen, themeColor) {
    const existing = document.getElementById(JMEHUNTER_SWITCH_ID);
    if (existing) {
      existing.remove();
    }
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    container.style.position = "fixed";
    container.style.right = "100px";
    container.style.top = "-150px";
    container.style.zIndex = "2147483646";
    container.style.cursor = "pointer";
    container.style.transition = "all 0.2s cubic-bezier(.46,-0.23,.37,2.38)";
    container.setAttribute("title", "open JM-EHunter");
    container.setAttribute("id", JMEHUNTER_SWITCH_ID);
    container.addEventListener("click", () => {
      container.style.top = "-50px";
      window.setTimeout(() => {
        container.style.top = "-150px";
      }, 2e3);
      onOpen();
    });
    const line = document.createElement("span");
    line.style.width = "2px";
    line.style.height = "200px";
    line.style.background = themeColor;
    line.style.boxShadow = "0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647)";
    container.appendChild(line);
    const ring2 = document.createElement("span");
    ring2.style.border = `2px solid ${themeColor}`;
    ring2.style.borderRadius = "50%";
    ring2.style.width = "15px";
    ring2.style.height = "15px";
    ring2.style.boxShadow = "0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647)";
    container.appendChild(ring2);
    document.body.appendChild(container);
  }
  if (!detectionResult.platform) {
    console.log("JM-EHunter: No platform detected (non-album page), skipping initialization");
  } else {
    console.log(`JM-EHunter: Platform detected: ${detectionResult.platform}`);
    let isMounted = false;
    let hostActionsApplied = false;
    let hideTimerId = null;
    let originalViewportContent = null;
    let hadViewportMeta = false;
    let viewportAdjusted = false;
    const isMobileLike = () => {
      return window.matchMedia("(pointer: coarse)").matches || /iphone|ipad|ipod|android|mobile/i.test(navigator.userAgent);
    };
    const ensureEHViewportForOpen = () => {
      if (detectionResult.platform !== Platform.EH || !isMobileLike()) {
        return;
      }
      let viewportMeta = document.querySelector('meta[name="viewport"]');
      const desiredContent = "width=device-width, initial-scale=1, viewport-fit=cover";
      if (!viewportAdjusted) {
        hadViewportMeta = Boolean(viewportMeta);
        originalViewportContent = viewportMeta ? viewportMeta.getAttribute("content") : null;
        viewportAdjusted = true;
      }
      if (!viewportMeta) {
        viewportMeta = document.createElement("meta");
        viewportMeta.name = "viewport";
        viewportMeta.setAttribute("data-ehunter-managed", "1");
        (document.head || document.documentElement).appendChild(viewportMeta);
      }
      viewportMeta.setAttribute("content", desiredContent);
    };
    const restoreEHViewportOnClose = () => {
      if (!viewportAdjusted) {
        return;
      }
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (!hadViewportMeta) {
        if ((viewportMeta == null ? void 0 : viewportMeta.getAttribute("data-ehunter-managed")) === "1") {
          viewportMeta.remove();
        }
      } else if (viewportMeta) {
        if (originalViewportContent === null) {
          viewportMeta.removeAttribute("content");
        } else {
          viewportMeta.setAttribute("content", originalViewportContent);
        }
      }
      originalViewportContent = null;
      hadViewportMeta = false;
      viewportAdjusted = false;
    };
    const clearHideTimer = () => {
      if (hideTimerId !== null) {
        window.clearTimeout(hideTimerId);
        hideTimerId = null;
      }
    };
    const scheduleHideContainer = (container, delayMs) => {
      clearHideTimer();
      hideTimerId = window.setTimeout(() => {
        container.style.visibility = "hidden";
        container.style.pointerEvents = "none";
        hideTimerId = null;
      }, delayMs);
    };
    const ensureMounted = () => {
      let container = document.getElementById(JMEHUNTER_CONTAINER_ID);
      if (!container) {
        container = document.createElement("div");
        container.id = JMEHUNTER_CONTAINER_ID;
        container.classList.add("normalize");
        container.style.position = "fixed";
        container.style.height = "100%";
        container.style.width = "100%";
        container.style.transitionProperty = "top";
        container.style.transitionDuration = `${JMEHUNTER_OPEN_DURATION_MS}ms`;
        container.style.transitionTimingFunction = JMEHUNTER_OPEN_EASING;
        container.style.background = "#333333";
        container.style.zIndex = "2147483647";
        container.style.top = "-100%";
        container.style.left = "0";
        container.style.visibility = "hidden";
        container.style.pointerEvents = "none";
        document.body.appendChild(container);
      }
      container.dataset.ehunterPlatform = detectionResult.platform;
      if (!isMounted) {
        const app = createApp({
          setup() {
            const isLoading = /* @__PURE__ */ ref(true);
            const error = /* @__PURE__ */ ref(null);
            const init2 = () => __async(null, null, function* () {
              try {
                if (!hostActionsApplied) {
                  applyPlatformHostActions(detectionResult.platform);
                  hostActionsApplied = true;
                }
                const albumService = createPlatformService(detectionResult.platform);
                app.provide(NameAlbumService, albumService);
                yield initializeWithTimeout(albumService, detectionResult.platform);
                isLoading.value = false;
              } catch (err2) {
                isLoading.value = false;
                error.value = err2;
                console.error("JM-EHunter initialization failed:", {
                  message: error.value.message,
                  stack: error.value.stack,
                  platform: error.value.platform,
                  url: error.value.url,
                  timestamp: error.value.timestamp
                });
              }
            });
            init2();
            const handleClose = () => {
              writeJMEHunterStatus(false);
              restoreEHViewportOnClose();
              document.body.style.overflow = "";
              const root = document.getElementById(JMEHUNTER_CONTAINER_ID);
              if (root) {
                root.style.top = "-100%";
                scheduleHideContainer(root, JMEHUNTER_CLOSE_DURATION_MS);
              }
            };
            return {
              isLoading,
              error,
              handleClose
            };
          },
          render() {
            return h(LoadingView, {
              isLoading: this.isLoading,
              error: this.error,
              onClose: this.handleClose
            }, {
              default: () => h(_sfc_main)
            });
          }
        });
        app.mount(`#${JMEHUNTER_CONTAINER_ID}`);
        isMounted = true;
      }
      return container;
    };
    const toggleJMEHunterView = (show) => {
      const container = ensureMounted();
      clearHideTimer();
      container.style.transitionProperty = "top";
      container.style.transitionDuration = show ? `${JMEHUNTER_OPEN_DURATION_MS}ms` : `${JMEHUNTER_CLOSE_DURATION_MS}ms`;
      container.style.transitionTimingFunction = show ? JMEHUNTER_OPEN_EASING : JMEHUNTER_CLOSE_EASING;
      document.body.style.overflow = show ? "hidden" : "";
      if (show) {
        ensureEHViewportForOpen();
        container.style.visibility = "visible";
        container.style.pointerEvents = "auto";
        requestAnimationFrame(() => {
          container.style.top = "0";
        });
        return;
      }
      restoreEHViewportOnClose();
      container.style.top = "-100%";
      scheduleHideContainer(container, JMEHUNTER_CLOSE_DURATION_MS);
    };
    const openJMEHunter = () => {
      writeJMEHunterStatus(true);
      toggleJMEHunterView(true);
    };
    const closeJMEHunter = () => {
      writeJMEHunterStatus(false);
      toggleJMEHunterView(false);
    };
    window.__JMEHUNTER_UI__ = {
      open: openJMEHunter,
      close: closeJMEHunter,
      toggle: toggleJMEHunterView
    };
    const platformThemeColor = detectionResult.platform === Platform.C18 ? "#FF7A00" : "#2ecc71";
    createEhunterSwitch(openJMEHunter, platformThemeColor);
    if (readJMEHunterStatus()) {
      openJMEHunter();
    }
  }
})();
