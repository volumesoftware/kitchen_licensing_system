import { Time } from "@angular/common";
import { an } from "@fullcalendar/core/internal-common";

interface KV {
    value: string;
    label: string;
}

export interface Duration {
    hour?: number;
    minute?: number;
}

export interface License {
    id?: string;
    status?: 'active' | 'expired' | 'revoked' | 'pending' | 'grace_period' | 'trial' | 'canceled';
    email?: string ;
    licenseId?: string;
    premiseAddress?: string;
    computerSerialNo?: string;
    expiryDate?: Date | any;
    dailyTimeout?: Duration;
}
