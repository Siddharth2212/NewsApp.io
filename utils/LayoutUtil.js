import { LayoutProvider } from 'recyclerlistview';
import { Dimensions } from 'react-native';

export class LayoutUtil {
    static getWindowWidth() {
        // To deal with precision issues on android
        return Math.round(Dimensions.get('window').width * 1000) / 1000 - 6; //Adjustment for margin given to RLV;
    }
    static getLayoutProvider(type) {
        switch (type) {
            default:
                return new LayoutProvider(
                    () => {
                        return 'VSEL';
                    },
                    (type, dim) => {
                        switch (type) {
                            case 'VSEL':
                                dim.width = LayoutUtil.getWindowWidth();
                                dim.height = 300;
                                break;
                            default:
                                dim.width = 0;
                                dim.heigh = 0;
                        }
                    }
                );
        }
    }
}
