export const isExisted = (str?: string | number) => {
    // Boolean(0) va donner false donc on fait une condition spéciale
    if (str === 0) return true;
        return Boolean(str);
};

export const isAlphaNumeric = (str?: string) => {
    if (str === (undefined || null)) return false;
        return /^[a-zA-Z0-9_]+$/.test(String(str));
};

export const isNumeric = (str?: string | number) => {
    if (str === (undefined || null)) return false;
        return /^[0-9]+$/.test(String(str));
};

export const isPostalCode = (str?: string) => {
    if (str === (undefined || null)) return false;
        return /^\d{5}$/.test(String(str));
};

export const isPrice = (price?: number | string) => {
    if (price === (undefined || null)) return false;
        return /^\d+([.,]\d{1,2})?$/.test(String(price));
};

export const isBirthday = (date?: string) => {
    if (date === (undefined || null)) return false;
        return /^\d{4}([-])\d{2}\1\d{2}$/.test(String(date));
};

export const isEmail = (str?: string) => {
    if (str === (undefined || null)) return false;
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            String(str)
    )   ;
};

// vérifie si la châine de caractères est un numéro de téléphone comportant 10 chiffres et commençant par 0
export const isPhoneNumber = (str?: string) => {
    if (str === (undefined || null)) return false;
        return /^0[0-9]{9}$/.test(String(str));
};

export const isCity = (str?: string) => {
    if (str === (undefined || null)) return false;
        return /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/.test(str);
};

export const isAddress = (str?: string) => {
    if (str === (undefined || null)) return false;
        return /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/.test(str);
};

/**
 * 8 caractères minimum, 255 caractères maximum (dans les erreurs du middleware auth.middleware pour la taille max)
 * 1 majuscule minimum
 * 1 minuscule minimum
 * 1 nombre minimum
 * 1 caractère spécial minimum
 */
export const isPassword = (str?: string) => {
    if (str === (undefined || null)) return false;
        return /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,})/.test(String(str));
};

export const isCardNumber = (str?: string) => {
    if (str === (undefined || null)) return false;
        return /^[0-9]{16}$/.test(String(str));
};

export const isExp = (str?: string) => {
    if (str === (undefined || null)) return false;
        return /^(0[1-9]|1[0-2])\/[0-9]{4}$/.test(String(str));
};

export const isCVC = (str?: string) => {
    if (str === (undefined || null)) return false;
        return /^[0-9]{3}$/.test(String(str));
};
