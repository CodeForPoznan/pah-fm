import {
  splitCamelCase,
  renderErrorMessage,
} from '../../services/errorMessages';

describe('splitCamelCase', () => {
  it('split sample text', () => {
    const splitted = splitCamelCase('toBeOrNotToBe');
    expect(splitted).toBe('to Be Or Not To Be');
  });

  it("don't split lowercase", () => {
    const splitted = splitCamelCase('houstonwehaveaproblem');
    expect(splitted).toBe('houstonwehaveaproblem');
  });

  it("don't split single capital", () => {
    const example = 'This Is my Great Example';
    const splitted = splitCamelCase(example);
    expect(splitted).toBe(example);
  });
});

describe('renderErrorMessage', () => {
  it('Renders error message', () => {
    const errorMessage = renderErrorMessage('field');
    expect(errorMessage).toBe('field is required');
  });

  it('Splits camel case', () => {
    const errorMessage = renderErrorMessage('longField');
    expect(errorMessage).toBe('long Field is required');
  });
});
