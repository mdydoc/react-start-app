import translation from '../translations';
import {DEFAULT_LANG} from "../../constants";

const lang = localStorage.getItem('lang') || DEFAULT_LANG;

export default function trans(key) {
    return resolve(key, translation[lang]);
}

function resolve(path, obj) {
    return path.split('.').reduce(function (prev, curr) {
        return prev ? typeof prev[curr] !== 'undefined' ? prev[curr] : path : path;
    }, obj || self);
}