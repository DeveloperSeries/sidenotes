/**
 * Dev Series
 * promises
 * Copyright (C) 2021 Thorsten Suckow-Homberg https://github.com/DeveloperSeries
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
 * USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


/**
 * Simple Loader wrapping XMLHttpRequests.
 *
 * @example
 * const loader = new Loader("./foobar.txt");
 *
 * let txt = await loader.load();
 * console.log(txt);
 *
 * // or using the thenable API
 * let txt;
 * loader.load().then((fileContents) => txt = fileContents);
 *
 *
 */
export default class Loader {

    /**
     * Loads the file represented by "url"
     *
     * @param {String} url The url to load the file from
     *
     * @returns {Promise}
     *
     * @throws Error, if any error during related to the XmlHttpRequest occurs, or TypeError
     * if the url is missing.
     */
    async load (url) {

        if (typeof url !== "string") {
            throw TypeError("\"url\" must be a string representing the location of the file to load.");
        }

        let ret = await new Promise(function (resolve, reject) {

            const request = new XMLHttpRequest();
            request.open("GET", url);

            request.onload = function () {
                if (request.status === 200) {
                    resolve(request.responseText);
                } else {
                    reject(Error(request.status + " " + request.statusText));
                }
            };
            request.onerror = function () {
                reject(Error("An unexpected error occured."));
            };

            request.send();
        });

        return ret;
    }


}
