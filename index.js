/**
 * MIT License
 *
 * Copyright (c) 2017 WeirdPattern
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict';

const BACKGROUND = '#222436';
const FOREGROUND = '#c8d3f5';

const RED = '#ff757f';
const GREEN = '#c3e88d';
const YELLOW = '#ffc777';
const CYAN = '#86e1fc';
const BLUE = '#82aaff';
const MAGENTA = '#c099ff';
const GRAY = '#444a73';
const WHITE = '#FFFFFF';
const GRAYSCALE = '#7f85a3';

const CURSOR_COLOR = YELLOW;
const BORDER_COLOR = BACKGROUND;

const TAB_BORDER_COLOR = '#444a73';
const TAB_TEXT_COLOR = FOREGROUND;

const colors = {
    black: BACKGROUND,
    red: RED,
    green: GREEN,
    yellow: YELLOW,
    blue: BLUE,
    magenta: MAGENTA,
    cyan: CYAN,
    white: GRAY,
    lightBlack: GRAY,
    lightRed: RED,
    lightGreen: GREEN,
    lightYellow: YELLOW,
    lightBlue: BLUE,
    lightMagenta: MAGENTA,
    lightCyan: CYAN,
    colorCubes: WHITE,
    grayscale: GRAYSCALE
};

exports.decorateConfig = (config) => {
    let windowControlsCSS = '';
    if (config.showWindowControls) {
        windowControlsCSS = '.list_2902 { margin-left: 0 !important; }';
    }

    const moonlight = config.moonlight || {};
    const isWin = /^win/.test(process.platform);

    // tab border customization
    let tabBorder = '';
    let tabNoFirstChild = '';
    let headerBorderColor = moonlight.noBorder === true || moonlight.showHeaderBorder === false ? BACKGROUND : TAB_BORDER_COLOR;
    let tabBorderColor = moonlight.noBorder === true || moonlight.showTabBorder === false ? BACKGROUND : TAB_BORDER_COLOR;

    // environment specifics
    if (isWin) {
        tabBorder = `border-top: 1px solid ${tabBorderColor} !important;`;
        tabNoFirstChild = ':not(:first-child)';
    } else {
        headerBorderColor = tabBorderColor;
    }

    // header customization (windows only)
    let headerForegroundColor = WHITE;
    let headerBackgroundColor = BACKGROUND;
    if (isWin) {
        headerBackgroundColor = moonlight.headerBackgroundColor || headerBackgroundColor;
        headerForegroundColor = moonlight.headerForegroundColor || headerForegroundColor;
    }

    return Object.assign({}, config, {
        foregroundColor: FOREGROUND,
        backgroundColor: BACKGROUND,
        selectionColor: '#C8D3F54C',
        borderColor: BORDER_COLOR,
        cursorColor: CURSOR_COLOR,
        colors,
        css: `
          ${config.css || ''}
          .hyper_main {
            border: none !important;
          }
          .splitpane_divider {
            background-color: ${tabBorderColor} !important;
          }
          .header_header {
            background: transparent !important;
            border-bottom: none !important;
          }
          .header_header, .header_windowHeader {
            top: 0;
            left: 0;
            right: 0;
            color: ${headerForegroundColor} !important;
          }
          .tabs_list {
            position: relative;
          }
          .tabs_list:before {
            content: '';
            position: absolute;
            top: 0;
            left: -77px;
            width: 77px;
            height: 100%;
            background-color: rgba(0,0,0,0.1);
          }
          .header_shape {
            color: ${headerForegroundColor} !important;
          }
          .tabs_title {
            color: ${TAB_TEXT_COLOR};
            font-weight: 600;
          }
          .tab_tab {
            border: 0;
            ${tabBorder}
            background-color: rgba(0,0,0,0.1) !important;
          }
          .tab_tab${tabNoFirstChild} {
            border-left: 1px solid ${tabBorderColor} !important;
          }
          .tab_text {
            color: ${TAB_TEXT_COLOR};
            font-weight: normal;
          }
          .tab_tab.tab_active {
            background-color: transparent !important;
          }
          .tab_textActive {
            color: ${TAB_TEXT_COLOR};
            font-weight: 600;
          }
          .tab_icon {
            color: ${TAB_TEXT_COLOR};
            font-weight: 600;
          }
          .tab_icon:hover {
            color: ${TAB_TEXT_COLOR};
            font-weight: 600;
          }
          ${windowControlsCSS}
        `
    });
};
