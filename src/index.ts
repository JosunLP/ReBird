import Assets from "./classes/assets";

/**
 * App
 */
class App {

    constructor() {
        this.main();
    }
    
    private async main() {
        while (true) {

            this.replaceTwitterLogo();
            this.replaceName();
            await this.sleep(5000);
        }
    }

    private replaceTwitterLogo() {
        var link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        if (!link) {
            link = document.createElement('link') as HTMLLinkElement;
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.type = 'image/png';

        if (link.href !== Assets.twitterLogo) {
            link.href = Assets.twitterLogo;   
        }

        var svgs = document.getElementsByTagName('svg');

        // Durchsuche die <svg>-Elemente, um das Twitter-Logo zu finden und ändere die Quelle
        for (var i = 0; i < svgs.length; i++) {
            var svg = svgs[i];
            var viewBox = svg.getAttribute('viewBox');
            
            // Überprüfe, ob das <svg>-Element das Twitter-Logo ist (durch Abgleich der viewBox)
            if (viewBox && viewBox.indexOf('0 0 24 24') !== -1) {
                // Ändere die Eigenschaften des <svg>-Elements, um das Logo zu ersetzen
                svg.setAttribute('width', '250');
                svg.setAttribute('height', '250');

                // Ersetze den Inhalt des <svg>-Elements durch das neue Logo
                svg.innerHTML = '<image xlink:href="' + Assets.twitterLogo + '" width="250" height="250"/>';
                
                // Hör auf, weitere <svg>-Elemente zu durchsuchen, da wir das Logo bereits gefunden haben
                break;
            }
        }
    }

    private replaceName() {
        document.title.replaceAll("X", "Twitter").replaceAll("x", "Twitter");
    }

    
    private async sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

new App();