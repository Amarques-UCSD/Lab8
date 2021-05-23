/**
 * @jest-environment jsdom
 */

import * as router from '../scripts/router.js';

describe('Router Tests', () => {
    describe('Length of history stack', () => {
        it('None', async () => {
            expect(history.length).toBe(1);
        })
        it('1 and 2 additions', () => {
            router.pushToHistory('settings',-1)
            expect(history.length).toBe(2);

            router.pushToHistory('entry',2)
            expect(history.length).toBe(3);
        })
    })

    describe('Current state of object', () => {
        it('Default', async () => {
            expect(router.state).toBeUndefined();            
        })
        it('Settings', async () => {
            expect(router.pushToHistory('settings',-1).state.page).toBe('settings');
        })
        it('Entry', async () => {
            expect(router.pushToHistory('entry',2).state.page).toBe('entry2');
        })
        it('Undefined', async () => {
            expect(router.pushToHistory('not real',3).state.page).toBeUndefined();
        })
    })
})
