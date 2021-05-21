require 'rails_helper'

RSpec.describe "Honeys", type: :request do
  let!(:user) { create(:user) }
  let(:headers) { valid_headers.except('Authorization') }
  let!(:user2) { create(:user) }
  let(:valid_credentials) do
    {
      email: user.email,
      password: user.password
    }.to_json
  end

  # Honey add test suite
  describe 'POST /honeys' do
    context 'when user is found' do
      before do
        # log in first user
        post '/auth/login', params: valid_credentials, headers: headers
        headers["Authorization"] = json["auth_token"]
        honey_params = { email: user2.email }.to_json
        # add second user as honey
        post '/honeys', params: honey_params, headers: headers
      end
      it 'returns success status' do
        expect(response).to have_http_status(:ok)
      end
    end
  end
end
