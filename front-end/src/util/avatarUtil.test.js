import { buildAvatarUrl } from './avatarUrl';

describe('AvatarUtil Test Suite', () => {
  it('should return correct url when a valid email', () => {
    // arrange
    const email = 'kurt@kurtopel.com';
    const expectedUrl =
      '//www.gravatar.com/avatar/d8443718323a601891110e45285cd8b0.jpg';
    // act
    const actualUrl = buildAvatarUrl(email);
    // assert
    expect(actualUrl).toEqual(expectedUrl);
  });
});
