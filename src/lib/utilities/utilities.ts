export const copyObject = (obj: any) => {
    return JSON.parse(JSON.stringify(obj));
}

export const isJsonString = (str: string): boolean => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
