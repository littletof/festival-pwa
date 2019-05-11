import { DatetimeChangeEventDetail } from '@ionic/core';

export class NewsItem {
    id?: string;
    title?: string;
    content?: string;
    priority?: string;
    published?: Date;
    placeTags?: string; // string[] json
    programTags?: string; // string[] json
    dateTags?: string; // Date[] json
}
