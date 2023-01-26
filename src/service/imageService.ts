export class ImageService {
    public async getImageData(): Promise<any> {
        const tokenResonse = await fetch("/api/token");
        const token = await tokenResonse.text();
        const nasaReponse = await fetch("https://api.nasa.gov/planetary/apod?api_key=" + token);
        return await nasaReponse.json();
    }
}