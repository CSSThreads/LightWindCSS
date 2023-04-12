// dynamic

{
    // Init style tag where data = lightwindcss
    let styleLightWind = document.createElement('style');
    styleLightWind.setAttribute('data', 'data-lightwindcss');
    styleLightWind.textContent = ''
    document.head.appendChild(styleLightWind);

    let allClasses = [];

    async function resolveClass(className, res) {
        let classSubParams = className.split(':'), screenBreakPointOpen = false, dark = '';
        if (className.startsWith('dark')) {
            dark = 'html[dark] ';
            classSubParams.shift();
        }

        console.log(classSubParams)

        for (i in classSubParams) {
            if (i == classSubParams.length - 1) {
                if (i == 0)
                    styleLightWind.textContent += `${dark}.${className.replaceAll(/\#/g, '\\#').replaceAll(/\:/g, '\\:').replaceAll(/\[/g, '\\[').replaceAll(/\]/g, '\\]').replaceAll(/\>/g, '\\>').replaceAll(/\//g, '\\/').replaceAll(/\(/g, '\\(').replaceAll(/\)/g, '\\)').replaceAll(/\%/g, '\\%').replaceAll(/\-/g, '\\-').replaceAll(/\+/g, '\\+').replaceAll(/\*/g, '\\*').replaceAll(/\,/g, '\\,').replaceAll(/\|/g, '\\|').replaceAll(/\'/g, '\\\'')}`
                // value
                let name = classSubParams[i].split('>')[0], value = classSubParams[i].split('>')[1]
                
                if (value)
                    value = value.replaceAll('_', ' ');

                styleLightWind.textContent += `{`
                if (!value) {
                    // value only
                    styleLightWind.textContent += `${res.proprieties.valueOnly[name].css}}`
                }
                else {
                    if (name in res.proprieties.valueKey) {
                        res.proprieties.valueKey[name].propriety.forEach(prop => {
                            if (res.values[res.proprieties.valueKey[name].valuesDefault])
                                styleLightWind.textContent += `${prop}:${!(value in res.values[res.proprieties.valueKey[name].valuesDefault]) ? value : res.values[res.proprieties.valueKey[name].valuesDefault][value]};`
                            else 
                                styleLightWind.textContent += `${prop}:${value};`
                        });

                        styleLightWind.textContent += `}`
                    } 
                    else {
                        styleLightWind.textContent += `${name}:${value};}`
                    }
                }

                if (screenBreakPointOpen)
                    styleLightWind.textContent += '}'
            }
            else if (i == 0) {
                // screen + selector
                if (classSubParams[i] in res.screens) {
                    // screen
                    if (res.screens[classSubParams[i]].min != null && res.screens[classSubParams[i]].max != null)
                        styleLightWind.textContent += `@media screen and (min-width: ${res.screens[classSubParams[i]].min}) and (max-width: ${res.screens[classSubParams[i]].max}) {`
                    else if (res.screens[classSubParams[i]].min != null)
                        styleLightWind.textContent += `@media screen and (min-width: ${res.screens[classSubParams[i]].min}) {`
                    else if (res.screens[classSubParams[i]].max != null)
                        styleLightWind.textContent += `@media screen and (max-width: ${res.screens[classSubParams[i]].max}) {`

                    styleLightWind.textContent += `${dark}.${className.replaceAll(/\#/g, '\\#').replaceAll(/\:/g, '\\:').replaceAll(/\[/g, '\\[').replaceAll(/\]/g, '\\]').replaceAll(/\>/g, '\\>').replaceAll(/\//g, '\\/').replaceAll(/\(/g, '\\(').replaceAll(/\)/g, '\\)').replaceAll(/\%/g, '\\%').replaceAll(/\-/g, '\\-').replaceAll(/\+/g, '\\+').replaceAll(/\*/g, '\\*').replaceAll(/\,/g, '\\,').replaceAll(/\|/g, '\\|').replaceAll(/\'/g, '\\\'')}`
                    screenBreakPointOpen = true
                }
                else {
                    // selector
                    styleLightWind.textContent += `${dark}.${className.replaceAll(/\#/g, '\\#').replaceAll(/\:/g, '\\:').replaceAll(/\[/g, '\\[').replaceAll(/\]/g, '\\]').replaceAll(/\>/g, '\\>').replaceAll(/\//g, '\\/').replaceAll(/\(/g, '\\(').replaceAll(/\)/g, '\\)').replaceAll(/\%/g, '\\%').replaceAll(/\-/g, '\\-').replaceAll(/\+/g, '\\+').replaceAll(/\*/g, '\\*').replaceAll(/\,/g, '\\,').replaceAll(/\|/g, '\\|').replaceAll(/\'/g, '\\\'')}`
                    try {
                        styleLightWind.textContent += `${res.selectors[classSubParams[i]].selector}`
                    } catch { }
                }
            }
            else {
                // selector
                try {
                    styleLightWind.textContent += `${res.selectors[classSubParams[i]].selector}`
                } catch { }
            }
        }
    }

    // mutations
    (async () => {
        let styleHttpReq = new XMLHttpRequest();
        styleHttpReq.open("GET", document.querySelector('[data-lightwindsrc]').getAttribute('data-lightwindsrc'), false);
        styleHttpReq.send(null);
        let res = JSON.parse(styleHttpReq.responseText)

        new MutationObserver(function(mutations) {
            mutations.forEach(mutation => {
                try {
                    mutation.addedNodes.forEach(node => {
                        if (typeof (node.classList) != 'undefined') {
                            node.classList.forEach(elClass => {
                                if (allClasses.indexOf(elClass) == -1) {
                                    resolveClass(elClass, res)
                                    allClasses.push(elClass)
                                }
                            })
                        }
                    })
                } catch { }
            })
        }).observe(document, { subtree: true, childList: true });

        new MutationObserver(function(mutations) {
            try {
                mutations.forEach(mutation => {
                    mutation.target.classList.forEach(elClass => {
                        if (allClasses.indexOf(elClass) == -1) {
                            resolveClass(elClass, res)
                            allClasses.push(elClass)
                        }
                    })
                })
            } catch { }
        }).observe(document, { attributes: true, attributeFilter: ["class"], subtree: true });
    })()
}
