export class DataCall {
    // Just simulating incremental loading, don't infer anything from here
    static async get(count, category = 0) {
        var catStr = '';
        if(category!==0){
            catStr = '&category='+category;
        }
        const responseHusky = await fetch('https://www.newsapp.io/mobilefeed/data?size=9&page='+count+catStr);

        const responseJsonHusky = await responseHusky.json();

        return responseJsonHusky.feeds;
    }
}
