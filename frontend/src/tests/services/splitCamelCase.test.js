import { splitCamelCase } from '../../services/splitCamelCase';

describe('splitCamelCase', () => {
  it('split sample text', () => {
    const splitted = splitCamelCase('toBeOrNotToBe');
    expect(splitted).toBe('to Be Or Not To Be');
  });

  it("don't split lowercase", () => {
    const splitted = splitCamelCase('houstonwehaveaproblem');
    expect(splitted).toBe('houstonwehaveaproblem');
  });
});
