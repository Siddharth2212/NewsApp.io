import {baseUrl} from "../shared/baseUrl";

export class DataCall {
    // Just simulating incremental loading, don't infer anything from here
    static async get(count, category = 0, size=9) {
        var catStr = '';
        if(category!==0){
            catStr = '&category='+category;
        }
        const responseHusky = await fetch(baseUrl+'mobilefeed/data?size='+size+'&page='+count+catStr);

        const responseJsonHusky = await responseHusky.json();

        return responseJsonHusky.feeds;
    }
}
