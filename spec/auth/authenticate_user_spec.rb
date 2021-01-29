require 'rails_helper'

RSpec.describe AuthenticateUser do
  # create test user
  let(:user) { create(:user) }
  # Valid request subject
  subject(:valid_auth_obj) { described_class.new(user.email, user.password) }
  # Invalid subject request
  subject(:invalid_auth_obj) { described_class.new('foo', 'bar') }

  # test suite for AuthenticateUser#call
  describe '#call' do
    # return token when vaslid request
    context 'when valid credentials' do
      it 'returns an auth token' do
        token = valid_auth_obj.call
      end
    end

    # raise Authentication error when invalid request
    context 'when invalid credentails' do
      it 'raises an authentication error' do
        expect { invalid_auth_obj.call }
        .to raise_error(
          ExceptionHandler::AuthenticationError,
          /Invalid credentials/
        )
      end
    end
  end
  
end