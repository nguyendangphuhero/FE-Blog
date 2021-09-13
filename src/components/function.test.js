import {sum} from './function'

describe('Test function', () => {
    it('Sum', () => {
        expect(sum(1, 2)).toBe(3);
    })
})