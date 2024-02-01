export let colorMode = "auto", localStorageAvailable = false;

export function updateColorMode(useLocalStorage, colorModePreference) {
    /*useLocalStorage = true | false;
    colorModePreference = null | "auto" | "light" | "dark";*/

    //Check if localStorage is available:
    function checkLocalStorage() {
        try {
            localStorage.setItem("test", "test");
            localStorage.removeItem("test");
            return true;
        } catch (error) {
            return false;
        }
    };

    if (useLocalStorage === true && checkLocalStorage()) {
        localStorageAvailable = true;
        //Check if localStorage item exist:
        if (!localStorage.getItem("colorMode")) {
            localStorage.setItem("colorMode", "auto");
        };
    } else {
        localStorageAvailable = false;
    }

    //Update colorMode to localStorage item or custom value: 
    if (colorModePreference === "auto" || colorModePreference === "light" || colorModePreference === "dark") {
        localStorageAvailable === true ? localStorage.setItem("colorMode", colorModePreference) : null;
        colorMode = colorModePreference;
    } else {
        localStorageAvailable === true ? colorMode = localStorage.getItem("colorMode") : null;
    };

    switch (colorMode) {
        case "auto":            
            window.matchMedia("(prefers-color-scheme: dark)").matches ?
                document.documentElement.setAttribute("data-theme", "dark")
                :
                document.documentElement.setAttribute("data-theme", "light");

            //AddEventListeners to window so that it also updates when browser's color mode is altered:
            const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");
            const lightModePreference = window.matchMedia("(prefers-color-scheme: light)");

            darkModePreference.addEventListener("change", function darkModeListener(e){e.matches && colorMode === "auto" ? updateColorMode(false, "auto") : null});
            lightModePreference.addEventListener("change", function lightModeListener(e){e.matches && colorMode === "auto" ? updateColorMode(false, "auto") : null});
            break;
        case "light":
            document.documentElement.setAttribute("data-theme", "light");
            break;
        case "dark":
            document.documentElement.setAttribute("data-theme", "dark");
            break;
        default:
            break;
    };

}