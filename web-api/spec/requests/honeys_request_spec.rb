require 'rails_helper'

RSpec.describe "Honeys", type: :request do
  let!(:user) { create(:user) }
  let(:honeys_count) { user.honeys_count }
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
      it 'returns array of honeys with user2' do
        expect(json.count).to eq(1)
        expect(json[0]["email"]).to eq(user2.email)
      end
    end
    context 'when user is not found' do
      before do
        # log in user
        post '/auth/login', params: valid_credentials, headers: headers
        headers["Authorization"] = json["auth_token"]
        honey_params = { email: Faker::Internet.email }.to_json
        # attempt to add fake user as honey
        post '/honeys', params: honey_params, headers: headers        
      end
      it 'returns a "unprocessable entity" status' do
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context 'when user is same user' do
      before do
        # log in user
        post '/auth/login', params: valid_credentials, headers: headers
        headers["Authorization"] = json["auth_token"]
        honey_params = { email: user.email }.to_json
        # attempt to add same user as honey
        post '/honeys', params: honey_params, headers: headers        
      end
      it 'returns a "unprocessable entity" status' do
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
