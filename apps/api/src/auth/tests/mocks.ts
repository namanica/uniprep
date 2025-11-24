export const mockSignUpBody = {
  email: 'test@test.com',
  password: '123',
};

export const mockSignInBody = {
  email: 'test@test.com',
  password: '123',
};

export const mockTokens = {
  access_token: 'access_token',
  refresh_token: 'refresh_token',
};

export const mockRequestBody = { user: { sub: 'user-id' } };

export const mockRequestBodyWithToken = {
  user: { sub: 'user-id', refreshToken: 'refresh-token' },
};

export const mockUser = {
  id: 'user-id',
  email: 'test@test.com',
  password: 'hashed',
  created_at: new Date(),
  refresh_token: null,
  xata_createdat: new Date(),
  xata_updatedat: new Date(),
  xata_id: 'xata-id',
  xata_version: 1,
};
