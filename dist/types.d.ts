export type Import = string;
export type ImportData = {
    raw: string;
    path: string;
};
export type ImportGroup = 'libraries' | 'aliases' | 'relatives' | 'directRelatives';
export type ImportGroups = Record<ImportGroup, ImportData[]>;
export declare enum LIBRARY_RULE {
    'EXACT' = "exact",
    'STARTS' = "starts",
    'INCLUDES' = "includes"
}
