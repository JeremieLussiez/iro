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
 License along with this library. */

/**
 * <p>
 *     Labels for all available languages
 *     {
 *      en: {
 *          language: 'English',
 *          code: 'en',
 *          labels: {
 *              'animal.cat': 'Cat',
 *              'animal.cat.praise': '__myCatName__ is an awesome cat !'
 *          }
 *      }
 *      fr: {
 *          language: 'Français',
 *          code: 'fr',
 *          labels: {
 *              'animal.cat': 'Chat'
 *              'animal.cat.praise': '__myCatName__ est un super chat !'
 *          }
 *      }
 *     }
 * </p>
 * @private
 * @type {{}}
 */
const labels = {};

/**
 * <p>
 *     Use browser set language as current language, by default.
 * </p>
 * @private
 * @type {string}
 */
let currentLanguageCode = 'en' || window.navigator.userLanguage || window.navigator.language;

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
      this.defaultLanguage = 'en'; // TGM

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
      languages.forEach((language) => {
        if (language.labels && language.code && language.name) {
          const {
            code,
          } = language;
          if (!labels[code]) {
            labels[language.code] = {
              code: language.code,
              name: language.name,
              labels: {},
            };
          }
          const languageLabels = labels[code].labels;
          for (const label in language.labels) {
            if (language.labels.hasOwnProperty(label)) {
              const labelValue = language.labels[label];
              if (labelValue.indexOf('__') >= 0) {
                const bindings = [];
                let remaining = labelValue;
                const bindingRegex = /__([a-zA-Z0-9.]*?)__/ig;
                while (remaining.length > 0) {
                  const result = bindingRegex.exec(remaining);
                  if (result) {
                    if (result.index > 0) {
                      bindings.push({
                        isBinding: false,
                        value: remaining.substring(0, result.index),
                      });
                    }
                    bindings.push({
                      isBinding: true,
                      key: result[1],
                    });
                  } else {
                    break;
                  }
                  remaining = remaining.substring(result.index + result[0].length, remaining.length);
                }

                if (remaining.length > 0) {
                  bindings.push({
                    isBinding: false,
                    value: remaining,
                  });
                }

                languageLabels[label] = {
                  compiled: true,
                  bindings,
                };
              } else {
                languageLabels[label] = {
                  compiled: false,
                  value: labelValue,
                };
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
      const currentLabels = labels[languageCode].labels;
      if (currentLabels.hasOwnProperty(label)) {
        if (currentLabels[label]) {
          if (!currentLabels[label].compiled) {
            return currentLabels[label].value;
          }
          let translated = '';
          for (const binding of currentLabels[label].bindings) {
            if (!binding.isBinding) {
              translated += binding.value;
            } else if (bindings) {
              translated += bindings[binding.key] || binding.key;
            } else {
              translated += binding.key;
            }
          }
          return translated;
        }
        return label;
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
    let translated = this._runTranslation(currentLanguageCode, label, bindings);
    if (translated) {
      return translated;
    }

    translated = this._runTranslation(this.defaultLanguage, label, bindings);
    if (translated) {
      return translated;
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
    const languages = [];
    for (const language in labels) {
      if (labels.hasOwnProperty(language)) {
        languages.push({
          code: labels[language].code,
          name: labels[language].name,
        });
      }
    }
    return languages;
  }
}
