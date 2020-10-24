import {greet} from './greet';

describe('greet', () => {
    it('should contain name', () => {
        expect(greet('name')).toContain('name');
    });
});