/* Copyright (c) 2017, Jérémie Lussiez, All rights reserved.

 This library is free software; you can redistribute it and/or
 modify it under the terms of the GNU Lesser General Public
 License as published by the Free Software Foundation; either
 version 3.0 of the License, or (at your option) any later version.

 This library is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 Lesser General Public License for more details.

 You should have received a copy of the GNU Lesser General Public
 License along with this library.*/

/**
 * <p>
 *     Labels for all available languages
 *     {
 *      en: {
 *          language: "English",
 *          code: "en",
 *          labels: {
 *              "animal.cat": "Cat",
 *              "animal.cat.praise": "__myCatName__ is an awesome cat !"
 *          }
 *      }
 *      fr: {
 *          language: "Français",
 *          code: "fr",
 *          labels: {
 *              "animal.cat": "Chat"
 *              "animal.cat.praise": "__myCatName__ est un super chat !"
 *          }
 *      }
 *     }
 * </p>
 * @private
 * @type {{}}
 */
let labels = {};

/**
 * <p>
 *     Use browser set language as current language, by default.
 * </p>
 * @private
 * @type {string}
 */
let currentLanguageCode = "en" || window.navigator.userLanguage || window.navigator.language;

let instance = null;

/**
 * <p>
 *     This utility class allows you to provide your users with translated labels
 * </p>
 * @constructor
 */
export default class Translator {

    constructor() {

        if (instance === null) {
            /**
             * <p>
             *     Fallback language
             * </p>
             * @private
             * @type {string}
             */
            this.defaultLanguage = "en"; //TGM

            instance = this;

        }

        return instance;

    }

    /**
     * <p>
     *     Add translations for given language
     * </p>
     * @public
     * @params languages as objects containing language code, name in corresponding language and labels.
     */
    addLanguageLabels(...languages) {
        if (languages) {
            languages.forEach(function (language) {

                if (language.labels && language.code && language.name) {
                    let code = language.code;
                    if (!labels[code]) {
                        labels[language.code] = {
                            code: language.code,
                            name: language.name,
                            labels: {}
                        };
                    }
                    let languageLabels = labels[code].labels;
                    for (let label in language.labels) {
                        if (language.labels.hasOwnProperty(label)) {

                            let labelValue = language.labels[label];
                            if (labelValue.indexOf("__") >= 0) {
                                let bindings = [];
                                let remaining = labelValue;
                                let bindingRegex = /__([a-zA-Z0-9.]*?)__/ig;
                                while (remaining.length > 0) {
                                    let result = bindingRegex.exec(remaining);
                                    if (result) {
                                        if (result.index > 0) {
                                            bindings.push({
                                                isBinding: false,
                                                value: remaining.substring(0, result.index)
                                            });
                                        }
                                        bindings.push({
                                            isBinding: true,
                                            key: result[1]
                                        });
                                    } else {
                                        break;
                                    }
                                    remaining = remaining.substring(result.index + result[0].length, remaining.length);
                                }

                                if (remaining.length > 0) {
                                    bindings.push({
                                        isBinding: false,
                                        value: remaining
                                    });
                                }

                                languageLabels[label] = {
                                    compiled: true,
                                    bindings: bindings
                                };

                            } else {
                                languageLabels[label] = {
                                    compiled: false,
                                    value: labelValue
                                }
                            }

                        }
                    }

                }
            });
        }
    }

    /**
     * <p>
     *     Set the current language
     * </p>
     * @public
     * @param languageCode as corresponding ISO code and conveniently used by browsers.
     */
    setCurrentLanguage(languageCode) {
        currentLanguageCode = languageCode;
    }

    /**
     * <p>
     *     Return the current language
     * </p>
     * @public
     * @returns {String} the currentLanguageCode
     */
    getCurrentLanguage() {
        return currentLanguageCode;
    }

    /**
     * <p>
     *     Performs a translation
     * </p>
     * @param languageCode language to use for translation
     * @param label to translate
     * @param bindings to build label template (if relevant)
     * @returns {String} translated label
     * @private
     */
    _runTranslation(languageCode, label, bindings) {
        if (labels.hasOwnProperty(languageCode)) {
            let currentLabels = labels[languageCode].labels;
            if (currentLabels.hasOwnProperty(label)) {
                if (currentLabels[label]) {
                    if (!currentLabels[label].compiled) {
                        return currentLabels[label].value;
                    } else {
                        let translated = "";
                        for (let binding of currentLabels[label].bindings) {
                            if (!binding.isBinding) {
                                translated += binding.value;
                            } else {
                                if (bindings) {
                                    translated += bindings[binding.key] || binding.key;
                                } else {
                                    translated += binding.key;
                                }
                            }
                        }
                        return translated;
                    }
                } else {
                    return label;
                }

            }
        }
        return null;
    }

    /**
     * <p>
     *     Get current language label translation
     * </p>
     * @public
     * @param label to translate
     * @param bindings to use if label has template
     * @returns {*} translated label
     */
    getTranslatedLabel(label, bindings) {

        translated = this._runTranslation(currentLanguageCode, label, bindings);
        if (translated) {
            return translated
        }

        let translated = this._runTranslation(this.defaultLanguage, label, bindings);
        if (translated) {
            return translated
        }

        return label;
    }

    /**
     * <p>
     *     Get all Available languages
     * </p>
     * @public
     * @returns {Array} All Available languages
     */
    getLanguages() {
        let languages = [];
        for (let language in labels) {
            if (labels.hasOwnProperty(language)) {
                languages.push({
                    code: labels[language].code,
                    name: labels[language].name
                });
            }
        }
        return languages;
    }
}
