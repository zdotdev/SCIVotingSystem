import { writable } from 'svelte/store';

export const globalData = writable({
    val: 'Dashboard'
});
