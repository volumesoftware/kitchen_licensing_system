export type StaffGroupType = "ADMIN" | "STAFF" | "SUPERUSER"

export interface Staff {
    email?: string;
    enabled?: boolean;
    groups?: StaffGroupType[]
}