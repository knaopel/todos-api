require 'rails_helper'

RSpec.describe 'V1::Authentication', type: :request do
  # authentication test suite
  describe 'POST /auth/login' do
    # create test user
    let!(:user) { create(:user) }

    # set headers for authorization
    let(:headers) { valid_headers.except('Authorization') }

    # set test valis and invalid credentials
    let(:valid_credentials) do
      { email: user.email, password: user.password }.to_json
    end
    let(:invalid_credentials) do
      {
        email: Faker::Internet.email,
        password: Faker::Internet.password,
      }.to_json
    end

    # returns auth token when request is valid
    context 'when request is valid' do
      before { post '/auth/login', params: valid_credentials, headers: headers }

      it 'returns an authentication token' do
        expect(json['auth_token']).not_to be_nil
      end
    end

    # returns failure message when request is invalid
    context 'when request is invalid' do
      before do
        post '/auth/login', params: invalid_credentials, headers: headers
      end

      it 'returns a failure message' do
        expect(json['message']).to match(/Invalid credentials/)
      end
    end
  end
end
